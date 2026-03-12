import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { prisma } from '@tatx/database';
import {
  TopupWalletDto,
  AutoTopupConfigDto,
  TransferFundsDto,
  WalletTransactionFilterDto,
  WalletBalanceResponse,
  WalletTransactionResponse,
  WalletTransferResponse,
  WalletTransactionType,
  WalletTransactionCategory,
} from '../../dto/wallet.dto';
import { GatewayService, GatewayProvider, GatewayTransactionType, GatewayPaymentRequest } from '../gateway/gateway.service';

@Injectable()
export class WalletService {
  private readonly logger = new Logger(WalletService.name);

  constructor(private gatewayService: GatewayService) {}

  /**
   * Get or create wallet for a customer
   */
  async getWallet(customerId: string): Promise<WalletBalanceResponse> {
    let wallet = await prisma.wallet.findUnique({
      where: { customerId },
    });

    if (!wallet) {
      wallet = await prisma.wallet.create({
        data: {
          customerId,
          balance: 0,
          currency: 'SAR',
          pendingBalance: 0,
        },
      });
    }

    return this.mapWalletResponse(wallet);
  }

  /**
   * Top-up wallet via payment gateway
   */
  async topup(userId: string, dto: TopupWalletDto): Promise<WalletBalanceResponse> {
    // Get or create wallet
    let wallet = await prisma.wallet.findUnique({
      where: { customerId: userId },
    });

    if (!wallet) {
      wallet = await prisma.wallet.create({
        data: {
          customerId: userId,
          balance: 0,
          currency: dto.currency || 'SAR',
        },
      });
    }

    // Process payment through gateway
    const gatewayStrategy = this.gatewayService.getStrategy(dto.paymentMethod as GatewayProvider);

    if (!gatewayStrategy) {
      throw new BadRequestException('Payment method not supported');
    }

    const gatewayRequest: GatewayPaymentRequest = {
      amount: dto.amount,
      currency: dto.currency || 'SAR',
      transactionType: GatewayTransactionType.CHARGE,
      paymentMethod: dto.paymentMethod,
      cardToken: dto.cardToken,
      cardDetails: dto.cardDetails,
      customerId: userId,
      description: `Wallet top-up - ${dto.description || ''}`,
      saveCard: dto.saveCard,
      ipAddress: dto.ipAddress,
      metadata: {
        type: 'WALLET_TOPUP',
        walletId: wallet.id,
      },
    };

    const paymentResult = await gatewayStrategy.processPayment(gatewayRequest);

    if (!paymentResult.success) {
      throw new BadRequestException(paymentResult.errorMessage || 'Payment failed');
    }

    // Add funds to wallet
    const newBalance = Number(wallet.balance) + dto.amount;

    await prisma.wallet.update({
      where: { id: wallet.id },
      data: { balance: newBalance },
    });

    // Create transaction record
    await prisma.walletTransaction.create({
      data: {
        walletId: wallet.id,
        type: 'CREDIT',
        category: 'TOPUP',
        amount: dto.amount,
        balance: newBalance,
        description: dto.description || `Wallet top-up via ${dto.paymentMethod}`,
        referenceId: paymentResult.transactionId,
        referenceType: 'PAYMENT',
        metadata: {
          paymentMethod: dto.paymentMethod,
          providerTransactionId: paymentResult.transactionId,
        },
      },
    });

    // Check if auto top-up should be configured
    if (dto.saveCard && paymentResult.cardToken) {
      // Card will be saved by payment service
    }

    // Return updated wallet
    const updatedWallet = await prisma.wallet.findUnique({
      where: { id: wallet.id },
    });

    return this.mapWalletResponse(updatedWallet!);
  }

  /**
   * Add funds to wallet (internal operation)
   */
  async addFunds(walletId: string, amount: number, description: string, category: WalletTransactionCategory = WalletTransactionCategory.TOPUP): Promise<any> {
    const wallet = await prisma.wallet.findUnique({ where: { id: walletId } });
    if (!wallet) throw new NotFoundException('Wallet not found');

    const newBalance = Number(wallet.balance) + amount;

    await prisma.walletTransaction.create({
      data: {
        walletId,
        type: 'CREDIT',
        category,
        amount,
        balance: newBalance,
        description,
      },
    });

    return prisma.wallet.update({
      where: { id: walletId },
      data: { balance: newBalance },
    });
  }

  /**
   * Deduct funds from wallet (internal operation)
   */
  async deductFunds(walletId: string, amount: number, description: string, category: WalletTransactionCategory = WalletTransactionCategory.RIDE): Promise<any> {
    const wallet = await prisma.wallet.findUnique({ where: { id: walletId } });
    if (!wallet) throw new NotFoundException('Wallet not found');
    if (Number(wallet.balance) < amount) throw new BadRequestException('Insufficient balance');

    const newBalance = Number(wallet.balance) - amount;

    await prisma.walletTransaction.create({
      data: {
        walletId,
        type: 'DEBIT',
        category,
        amount,
        balance: newBalance,
        description,
      },
    });

    return prisma.wallet.update({
      where: { id: walletId },
      data: { balance: newBalance },
    });
  }

  /**
   * Configure auto top-up
   */
  async configureAutoTopup(userId: string, dto: AutoTopupConfigDto): Promise<WalletBalanceResponse> {
    const wallet = await prisma.wallet.findUnique({
      where: { customerId: userId },
    });

    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }

    const updateData: any = {
      autoTopup: dto.enabled,
    };

    if (dto.enabled) {
      if (!dto.threshold || !dto.amount) {
        throw new BadRequestException('Threshold and amount are required when enabling auto top-up');
      }
      updateData.autoTopupThreshold = dto.threshold;
      updateData.autoTopupAmount = dto.amount;
    } else {
      updateData.autoTopupThreshold = null;
      updateData.autoTopupAmount = null;
    }

    const updatedWallet = await prisma.wallet.update({
      where: { id: wallet.id },
      data: updateData,
    });

    return this.mapWalletResponse(updatedWallet);
  }

  /**
   * Transfer funds to another user
   */
  async transferFunds(userId: string, dto: TransferFundsDto): Promise<WalletTransferResponse> {
    // Get sender wallet
    const senderWallet = await prisma.wallet.findUnique({
      where: { customerId: userId },
    });

    if (!senderWallet) {
      throw new NotFoundException('Sender wallet not found');
    }

    if (Number(senderWallet.balance) < dto.amount) {
      throw new BadRequestException('Insufficient balance');
    }

    // Get recipient
    let recipientCustomerId: string;
    if (dto.recipientType === 'PHONE') {
      const recipient = await prisma.customer.findFirst({
        where: {
          user: {
            phone: dto.recipientId,
          },
        },
        include: { wallet: true },
      });
      if (!recipient) {
        throw new NotFoundException('Recipient not found');
      }
      recipientCustomerId = recipient.id;
    } else {
      const recipient = await prisma.customer.findFirst({
        where: { id: dto.recipientId },
        include: { wallet: true },
      });
      if (!recipient) {
        throw new NotFoundException('Recipient not found');
      }
      recipientCustomerId = recipient.id;
    }

    // Get or create recipient wallet
    let recipientWallet = await prisma.wallet.findUnique({
      where: { customerId: recipientCustomerId },
    });

    if (!recipientWallet) {
      recipientWallet = await prisma.wallet.create({
        data: {
          customerId: recipientCustomerId,
          balance: 0,
          currency: 'SAR',
        },
      });
    }

    // Perform transfer atomically
    const transfer = await prisma.$transaction(async (tx) => {
      // Deduct from sender
      const senderNewBalance = Number(senderWallet.balance) - dto.amount;
      await tx.wallet.update({
        where: { id: senderWallet.id },
        data: { balance: senderNewBalance },
      });

      await tx.walletTransaction.create({
        data: {
          walletId: senderWallet.id,
          type: 'DEBIT',
          category: 'TRANSFER_OUT',
          amount: dto.amount,
          balance: senderNewBalance,
          description: dto.description || `Transfer to ${dto.recipientId}`,
          referenceId: recipientWallet.id,
          referenceType: 'WALLET',
        },
      });

      // Add to recipient
      const recipientNewBalance = Number(recipientWallet.balance) + dto.amount;
      await tx.wallet.update({
        where: { id: recipientWallet.id },
        data: { balance: recipientNewBalance },
      });

      await tx.walletTransaction.create({
        data: {
          walletId: recipientWallet.id,
          type: 'CREDIT',
          category: 'TRANSFER_IN',
          amount: dto.amount,
          balance: recipientNewBalance,
          description: dto.description || `Transfer from ${userId}`,
          descriptionAr: dto.descriptionAr,
          referenceId: senderWallet.id,
          referenceType: 'WALLET',
        },
      });

      return {
        senderWalletId: senderWallet.id,
        recipientWalletId: recipientWallet.id,
        amount: dto.amount,
      };
    });

    return {
      id: `TRF-${Date.now()}`,
      senderWalletId: transfer.senderWalletId,
      recipientWalletId: transfer.recipientWalletId,
      amount: transfer.amount,
      description: dto.description || 'Transfer',
      status: 'COMPLETED',
      createdAt: new Date(),
    };
  }

  /**
   * Get wallet transactions
   */
  async getTransactions(
    walletId: string,
    filter?: WalletTransactionFilterDto,
  ): Promise<{ transactions: WalletTransactionResponse[]; total: number }> {
    const where: any = { walletId };

    if (filter) {
      if (filter.type) {
        where.type = filter.type;
      }
      if (filter.category) {
        where.category = filter.category;
      }
      if (filter.startDate || filter.endDate) {
        where.createdAt = {};
        if (filter.startDate) {
          where.createdAt.gte = new Date(filter.startDate);
        }
        if (filter.endDate) {
          where.createdAt.lte = new Date(filter.endDate);
        }
      }
    }

    const page = filter?.page || 1;
    const limit = filter?.limit || 20;

    const [transactions, total] = await Promise.all([
      prisma.walletTransaction.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.walletTransaction.count({ where }),
    ]);

    return {
      transactions: transactions.map((t) => this.mapTransactionResponse(t)),
      total,
    };
  }

  /**
   * Get user transactions by customer ID
   */
  async getUserTransactions(
    customerId: string,
    filter?: WalletTransactionFilterDto,
  ): Promise<{ transactions: WalletTransactionResponse[]; total: number }> {
    const wallet = await prisma.wallet.findUnique({
      where: { customerId },
    });

    if (!wallet) {
      return { transactions: [], total: 0 };
    }

    return this.getTransactions(wallet.id, filter);
  }

  /**
   * Check and trigger auto top-up if needed
   */
  async checkAndTriggerAutoTopup(customerId: string): Promise<void> {
    const wallet = await prisma.wallet.findUnique({
      where: { customerId },
    });

    if (!wallet || !wallet.autoTopup) {
      return;
    }

    const threshold = Number(wallet.autoTopupThreshold || 0);
    const currentBalance = Number(wallet.balance);

    if (currentBalance <= threshold) {
      const topupAmount = Number(wallet.autoTopupAmount || 0);
      if (topupAmount > 0) {
        // In production, this would trigger an actual payment
        this.logger.log(`Auto top-up triggered for wallet ${wallet.id}: ${topupAmount} SAR`);
        
        await this.addFunds(
          wallet.id,
          topupAmount,
          `Auto top-up (threshold: ${threshold} SAR)`,
          WalletTransactionCategory.TOPUP,
        );
      }
    }
  }

  /**
   * Get wallet by customer ID
   */
  async getWalletByCustomerId(customerId: string): Promise<any> {
    return prisma.wallet.findUnique({
      where: { customerId },
      include: {
        transactions: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });
  }

  // Private helper methods

  private mapWalletResponse(wallet: any): WalletBalanceResponse {
    return {
      id: wallet.id,
      customerId: wallet.customerId,
      balance: Number(wallet.balance),
      pendingBalance: Number(wallet.pendingBalance || 0),
      availableBalance: Number(wallet.balance) - Number(wallet.pendingBalance || 0),
      currency: wallet.currency,
      autoTopupEnabled: wallet.autoTopup,
      autoTopupThreshold: wallet.autoTopupThreshold ? Number(wallet.autoTopupThreshold) : undefined,
      autoTopupAmount: wallet.autoTopupAmount ? Number(wallet.autoTopupAmount) : undefined,
      updatedAt: wallet.updatedAt,
    };
  }

  private mapTransactionResponse(transaction: any): WalletTransactionResponse {
    return {
      id: transaction.id,
      type: transaction.type as WalletTransactionType,
      category: transaction.category as WalletTransactionCategory,
      amount: Number(transaction.amount),
      balance: Number(transaction.balance),
      description: transaction.description,
      descriptionAr: transaction.descriptionAr,
      referenceId: transaction.referenceId,
      referenceType: transaction.referenceType,
      metadata: transaction.metadata,
      createdAt: transaction.createdAt,
    };
  }
}
