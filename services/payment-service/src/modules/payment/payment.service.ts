import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { prisma } from '@tatx/database';
import { PaymentMethod as PrismaPaymentMethod } from '@prisma/client';
import {
  ProcessPaymentDto,
  RefundPaymentDto,
  PaymentMethod,
  PaymentType,
  PaymentResponse,
  TransactionResponse,
  SavedCardResponse,
  PaymentMethodsResponse,
} from '../../dto/payment.dto';
import {
  GatewayService,
  GatewayProvider,
  GatewayPaymentRequest,
  GatewayTransactionType,
} from '../../modules/gateway/gateway.service';
import { WalletService } from '../wallet/wallet.service';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);

  constructor(
    private gatewayService: GatewayService,
    private walletService: WalletService,
  ) {}

  /**
   * Process a payment with support for split payments, wallet, and multiple gateways
   */
  async processPayment(userId: string, dto: ProcessPaymentDto): Promise<PaymentResponse> {
    const paymentNumber = await this.generatePaymentNumber();
    const currency = dto.currency || 'SAR';

    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        paymentNumber,
        userId,
        amount: dto.amount,
        currency,
        status: 'PENDING',
        method: this.mapPaymentMethod(dto.method),
        provider: this.getProviderForMethod(dto.method),
        referenceId: dto.referenceId,
        metadata: dto.metadata || {},
        ipAddress: dto.ipAddress,
        userAgent: dto.userAgent,
      },
    });

    try {
      let paymentResult: { success: boolean; transactionId?: string; providerPaymentId?: string };

      // Handle split payments
      if (dto.useSplitPayment && dto.splitPayments && dto.splitPayments.length > 0) {
        paymentResult = await this.processSplitPayment(userId, payment.id, dto);
      }
      // Handle wallet + card split
      else if (dto.walletAmount && dto.walletAmount > 0) {
        paymentResult = await this.processWalletSplitPayment(userId, payment.id, dto);
      }
      // Handle wallet-only payment
      else if (dto.method === PaymentMethod.WALLET) {
        paymentResult = await this.processWalletPayment(userId, payment.id, dto);
      }
      // Handle cash on delivery
      else if (dto.method === PaymentMethod.CASH_ON_DELIVERY) {
        paymentResult = await this.processCashOnDelivery(payment.id);
      }
      // Handle BNPL (Tabby/Tamara)
      else if (dto.method === PaymentMethod.TABBY || dto.method === PaymentMethod.TAMARA) {
        paymentResult = await this.processBNPLPayment(userId, payment, dto);
      }
      // Handle regular card payments
      else {
        paymentResult = await this.processCardPayment(userId, payment, dto);
      }

      if (!paymentResult.success) {
        await prisma.payment.update({
          where: { id: payment.id },
          data: { status: 'FAILED' },
        });
        throw new BadRequestException('Payment processing failed');
      }

      // Update payment status
      const updatedPayment = await prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: 'COMPLETED',
          providerPaymentId: paymentResult.providerPaymentId || paymentResult.transactionId,
          processedAt: new Date(),
        },
        include: {
          transactions: true,
          installments: true,
        },
      });

      // Create transaction record
      await prisma.transaction.create({
        data: {
          paymentId: payment.id,
          type: 'CHARGE',
          amount: dto.amount,
          status: 'COMPLETED',
          provider: this.getProviderForMethod(dto.method),
          providerTransactionId: paymentResult.transactionId,
        },
      });

      return this.mapPaymentResponse(updatedPayment);
    } catch (error) {
      this.logger.error(`Payment processing failed for payment ${payment.id}`, error);
      throw error;
    }
  }

  /**
   * Process a refund
   */
  async processRefund(userId: string, dto: RefundPaymentDto): Promise<PaymentResponse> {
    const payment = await prisma.payment.findUnique({
      where: { id: dto.paymentId },
      include: { transactions: true, refunds: true },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    if (payment.userId !== userId) {
      throw new BadRequestException('Unauthorized to refund this payment');
    }

    if (payment.status !== 'COMPLETED') {
      throw new BadRequestException('Can only refund completed payments');
    }

    const refundAmount = dto.amount || Number(payment.amount);
    const totalRefunded = payment.refunds.reduce((sum, r) => sum + Number(r.amount), 0);

    if (totalRefunded + refundAmount > Number(payment.amount)) {
      throw new BadRequestException('Refund amount exceeds payment amount');
    }

    // Process refund through gateway
    const provider = payment.provider as GatewayProvider;
    const gatewayStrategy = this.gatewayService.getStrategy(provider);

    if (!gatewayStrategy) {
      throw new BadRequestException('Payment provider not supported for refunds');
    }

    const refundResult = await gatewayStrategy.processRefund({
      paymentId: payment.providerPaymentId!,
      amount: refundAmount,
      reason: dto.reason,
    });

    if (!refundResult.success) {
      throw new BadRequestException(refundResult.errorMessage || 'Refund failed');
    }

    // Create refund record
    const refund = await prisma.refund.create({
      data: {
        paymentId: payment.id,
        amount: refundAmount,
        reason: dto.reason,
        reasonCode: dto.reasonCode,
        status: 'COMPLETED',
        providerRefundId: refundResult.refundId || refundResult.providerRefundId,
        processedAt: new Date(),
      },
    });

    // Update payment status
    const totalRefundedAfter = totalRefunded + refundAmount;
    const newStatus = totalRefundedAfter >= Number(payment.amount) ? 'REFUNDED' : 'PARTIALLY_REFUNDED';

    await prisma.payment.update({
      where: { id: payment.id },
      data: { status: newStatus },
    });

    // Create refund transaction
    await prisma.transaction.create({
      data: {
        paymentId: payment.id,
        type: 'REFUND',
        amount: refundAmount,
        status: 'COMPLETED',
        provider: provider,
        providerTransactionId: refundResult.refundId,
      },
    });

    // If wallet was used, credit back to wallet
    if (payment.method === PrismaPaymentMethod.WALLET) {
      const wallet = await prisma.wallet.findUnique({ where: { customerId: userId } });
      if (wallet) {
        await this.walletService.addFunds(wallet.id, refundAmount, `Refund for payment ${payment.paymentNumber}`);
      }
    }

    return this.mapPaymentResponse(
      await prisma.payment.findUnique({
        where: { id: payment.id },
        include: { transactions: true, refunds: true },
      })!,
    );
  }

  /**
   * Get available payment methods for a user
   */
  async getAvailableMethods(userId: string): Promise<PaymentMethodsResponse> {
    const wallet = await prisma.wallet.findUnique({ where: { customerId: userId } });
    const savedCards = await prisma.savedCard.findMany({
      where: { userId },
      orderBy: { isDefault: 'desc' },
    });

    const availableMethods: PaymentMethod[] = [
      PaymentMethod.MADA,
      PaymentMethod.STC_PAY,
      PaymentMethod.CREDIT_CARD,
      PaymentMethod.DEBIT_CARD,
      PaymentMethod.APPLE_PAY,
      PaymentMethod.GOOGLE_PAY,
      PaymentMethod.TABBY,
      PaymentMethod.TAMARA,
      PaymentMethod.WALLET,
      PaymentMethod.CASH_ON_DELIVERY,
    ];

    return {
      available: availableMethods,
      recommended: PaymentMethod.MADA, // Recommended for Saudi Arabia
      walletBalance: wallet ? Number(wallet.balance) : 0,
      savedCards: savedCards.map((card) => ({
        id: card.id,
        nickname: card.nickname,
        brand: card.brand,
        last4: card.last4,
        expiryMonth: card.expiryMonth,
        expiryYear: card.expiryYear,
        isDefault: card.isDefault,
        createdAt: card.createdAt,
      })),
    };
  }

  /**
   * Save a card for future use
   */
  async saveCard(userId: string, token: string, nickname: string, isDefault = false): Promise<SavedCardResponse> {
    // Get card details from gateway
    let cardDetails: { brand: string; last4: string; expiryMonth: string; expiryYear: string };

    try {
      // Try to get details from each gateway
      const strategies = this.gatewayService.getAllStrategies();
      for (const strategy of strategies) {
        try {
          cardDetails = await strategy.getTokenDetails(token);
          break;
        } catch {
          continue;
        }
      }

      if (!cardDetails!) {
        throw new BadRequestException('Unable to retrieve card details');
      }
    } catch (error) {
      this.logger.error('Failed to get card details', error);
      throw new BadRequestException('Invalid card token');
    }

    // If setting as default, unset other defaults
    if (isDefault) {
      await prisma.savedCard.updateMany({
        where: { userId, isDefault: true },
        data: { isDefault: false },
      });
    }

    // Check if card already exists
    const existingCard = await prisma.savedCard.findFirst({
      where: {
        userId,
        token,
      },
    });

    if (existingCard) {
      throw new ConflictException('Card already saved');
    }

    const savedCard = await prisma.savedCard.create({
      data: {
        userId,
        token,
        nickname,
        brand: cardDetails!.brand,
        last4: cardDetails!.last4,
        expiryMonth: cardDetails!.expiryMonth,
        expiryYear: cardDetails!.expiryYear,
        isDefault,
      },
    });

    return {
      id: savedCard.id,
      nickname: savedCard.nickname,
      brand: savedCard.brand,
      last4: savedCard.last4,
      expiryMonth: savedCard.expiryMonth,
      expiryYear: savedCard.expiryYear,
      isDefault: savedCard.isDefault,
      createdAt: savedCard.createdAt,
    };
  }

  /**
   * Delete a saved card
   */
  async deleteCard(userId: string, cardId: string): Promise<void> {
    const card = await prisma.savedCard.findFirst({
      where: { id: cardId, userId },
    });

    if (!card) {
      throw new NotFoundException('Saved card not found');
    }

    await prisma.savedCard.delete({
      where: { id: cardId },
    });
  }

  /**
   * Set a card as default
   */
  async setDefaultCard(userId: string, cardId: string): Promise<SavedCardResponse> {
    const card = await prisma.savedCard.findFirst({
      where: { id: cardId, userId },
    });

    if (!card) {
      throw new NotFoundException('Saved card not found');
    }

    await prisma.savedCard.updateMany({
      where: { userId, isDefault: true },
      data: { isDefault: false },
    });

    const updatedCard = await prisma.savedCard.update({
      where: { id: cardId },
      data: { isDefault: true },
    });

    return {
      id: updatedCard.id,
      nickname: updatedCard.nickname,
      brand: updatedCard.brand,
      last4: updatedCard.last4,
      expiryMonth: updatedCard.expiryMonth,
      expiryYear: updatedCard.expiryYear,
      isDefault: updatedCard.isDefault,
      createdAt: updatedCard.createdAt,
    };
  }

  /**
   * Get saved cards for a user
   */
  async getSavedCards(userId: string): Promise<SavedCardResponse[]> {
    const cards = await prisma.savedCard.findMany({
      where: { userId },
      orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }],
    });

    return cards.map((card) => ({
      id: card.id,
      nickname: card.nickname,
      brand: card.brand,
      last4: card.last4,
      expiryMonth: card.expiryMonth,
      expiryYear: card.expiryYear,
      isDefault: card.isDefault,
      createdAt: card.createdAt,
    }));
  }

  /**
   * Get payment by ID
   */
  async findById(id: string): Promise<PaymentResponse> {
    const payment = await prisma.payment.findUnique({
      where: { id },
      include: { transactions: true, refunds: true, installments: true },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    return this.mapPaymentResponse(payment);
  }

  /**
   * Get payments by user
   */
  async findByUserId(userId: string, limit = 20, offset = 0): Promise<PaymentResponse[]> {
    const payments = await prisma.payment.findMany({
      where: { userId },
      include: { transactions: true, refunds: true },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });

    return payments.map((p) => this.mapPaymentResponse(p));
  }

  // Private helper methods

  private async processSplitPayment(
    userId: string,
    paymentId: string,
    dto: ProcessPaymentDto,
  ): Promise<{ success: boolean; transactionId?: string }> {
    const totalSplitAmount = dto.splitPayments!.reduce((sum, sp) => sum + sp.amount, 0);

    if (Math.abs(totalSplitAmount - dto.amount) > 0.01) {
      throw new BadRequestException('Split payment amounts must equal total amount');
    }

    let allSuccess = true;
    let lastTransactionId: string | undefined;

    for (const splitPayment of dto.splitPayments!) {
      try {
        const result = await this.processCardPayment(userId, null as any, {
          ...dto,
          amount: splitPayment.amount,
          method: splitPayment.method,
          savedCardId: splitPayment.savedCardId,
        });
        lastTransactionId = result.id;
      } catch (error) {
        allSuccess = false;
        this.logger.error(`Split payment failed for method ${splitPayment.method}`, error);
        break;
      }
    }

    return { success: allSuccess, transactionId: lastTransactionId };
  }

  private async processWalletSplitPayment(
    userId: string,
    paymentId: string,
    dto: ProcessPaymentDto,
  ): Promise<{ success: boolean; transactionId?: string }> {
    const wallet = await prisma.wallet.findUnique({ where: { customerId: userId } });

    if (!wallet) {
      throw new BadRequestException('Wallet not found');
    }

    const walletAmount = Math.min(dto.walletAmount!, Number(wallet.balance));
    const remainingAmount = dto.amount - walletAmount;

    // Deduct from wallet
    await this.walletService.deductFunds(
      wallet.id,
      walletAmount,
      `Payment for ${dto.type} - ${paymentId}`,
    );

    if (remainingAmount <= 0) {
      return { success: true };
    }

    // Process remaining amount with card
    const result = await this.processCardPayment(userId, null as any, {
      ...dto,
      amount: remainingAmount,
    });

    return { success: true, transactionId: result.id };
  }

  private async processWalletPayment(
    userId: string,
    paymentId: string,
    dto: ProcessPaymentDto,
  ): Promise<{ success: boolean }> {
    const wallet = await prisma.wallet.findUnique({ where: { customerId: userId } });

    if (!wallet) {
      throw new BadRequestException('Wallet not found');
    }

    if (Number(wallet.balance) < dto.amount) {
      throw new BadRequestException('Insufficient wallet balance');
    }

    await this.walletService.deductFunds(
      wallet.id,
      dto.amount,
      `Payment for ${dto.type} - ${paymentId}`,
    );

    return { success: true };
  }

  private async processCashOnDelivery(paymentId: string): Promise<{ success: boolean }> {
    await prisma.payment.update({
      where: { id: paymentId },
      data: { status: 'PENDING' },
    });

    return { success: true };
  }

  private async processBNPLPayment(
    userId: string,
    payment: any,
    dto: ProcessPaymentDto,
  ): Promise<{ success: boolean; transactionId?: string; providerPaymentId?: string }> {
    const provider = this.getProviderForMethod(dto.method);
    const gatewayStrategy = this.gatewayService.getStrategy(provider);

    if (!gatewayStrategy) {
      throw new BadRequestException('Payment provider not available');
    }

    const gatewayRequest: GatewayPaymentRequest = {
      amount: dto.amount,
      currency: dto.currency || 'SAR',
      transactionType: GatewayTransactionType.CHARGE,
      paymentMethod: dto.method,
      customerId: userId,
      orderId: dto.referenceId,
      installmentPlan: dto.installmentPlan ? {
        planId: dto.installmentPlan,
        installments: this.getInstallmentsCount(dto.installmentPlan),
      } : undefined,
      metadata: dto.metadata,
    };

    const result = await gatewayStrategy.processPayment(gatewayRequest);

    if (!result.success) {
      return { success: false };
    }

    // Create installment plan record
    if (result.installments) {
      await prisma.installmentPlan.create({
        data: {
          paymentId: payment.id,
          provider: provider,
          planId: result.installments.planId,
          installments: result.installments.installments,
          installmentAmount: result.installments.installmentAmount,
          frequency: result.installments.frequency,
          firstPaymentDate: result.installments.firstPaymentDate,
          lastPaymentDate: result.installments.lastPaymentDate,
          status: 'ACTIVE',
          metadata: result.rawResponse,
        },
      });
    }

    return {
      success: true,
      transactionId: result.transactionId,
      providerPaymentId: result.providerPaymentId,
    };
  }

  private async processCardPayment(
    userId: string,
    payment: any,
    dto: ProcessPaymentDto,
  ): Promise<{ success: boolean; transactionId?: string; providerPaymentId?: string }> {
    const provider = this.getProviderForMethod(dto.method);
    const gatewayStrategy = this.gatewayService.getStrategy(provider);

    if (!gatewayStrategy) {
      throw new BadRequestException('Payment provider not available');
    }

    // Get saved card if specified
    let cardToken = dto.cardToken;
    if (!cardToken && dto.savedCardId) {
      const savedCard = await prisma.savedCard.findFirst({
        where: { id: dto.savedCardId, userId },
      });
      if (savedCard) {
        cardToken = savedCard.token;
      }
    }

    const gatewayRequest: GatewayPaymentRequest = {
      amount: dto.amount,
      currency: dto.currency || 'SAR',
      transactionType: GatewayTransactionType.CHARGE,
      paymentMethod: dto.method,
      cardToken,
      cardDetails: dto.cardDetails,
      customerId: userId,
      orderId: payment?.referenceId || dto.referenceId,
      description: `Payment for ${dto.type}`,
      saveCard: dto.saveCard,
      ipAddress: dto.ipAddress,
      userAgent: dto.userAgent,
      metadata: dto.metadata,
    };

    const result = await gatewayStrategy.processPayment(gatewayRequest);

    if (!result.success) {
      return { success: false };
    }

    // Save card if requested
    if (dto.saveCard && result.cardToken && dto.method !== PaymentMethod.WALLET) {
      try {
        await this.saveCard(userId, result.cardToken, dto.cardNickname || 'Saved Card', true);
      } catch (error) {
        this.logger.warn('Failed to save card', error);
      }
    }

    return {
      success: true,
      transactionId: result.transactionId,
      providerPaymentId: result.providerPaymentId,
    };
  }

  private async generatePaymentNumber(): Promise<string> {
    const prefix = 'PAY';
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `${prefix}-${timestamp}-${random}`;
  }

  private mapPaymentMethod(method: PaymentMethod): PrismaPaymentMethod {
    const map: Record<PaymentMethod, PrismaPaymentMethod> = {
      [PaymentMethod.CREDIT_CARD]: PrismaPaymentMethod.CREDIT_CARD,
      [PaymentMethod.DEBIT_CARD]: PrismaPaymentMethod.DEBIT_CARD,
      [PaymentMethod.MADA]: PrismaPaymentMethod.MADA,
      [PaymentMethod.STC_PAY]: PrismaPaymentMethod.STC_PAY,
      [PaymentMethod.APPLE_PAY]: PrismaPaymentMethod.APPLE_PAY,
      [PaymentMethod.GOOGLE_PAY]: PrismaPaymentMethod.GOOGLE_PAY,
      [PaymentMethod.TABBY]: PrismaPaymentMethod.TABBY,
      [PaymentMethod.TAMARA]: PrismaPaymentMethod.TAMARA,
      [PaymentMethod.WALLET]: PrismaPaymentMethod.WALLET,
      [PaymentMethod.CASH_ON_DELIVERY]: PrismaPaymentMethod.CASH,
    };
    return map[method] || PrismaPaymentMethod.CREDIT_CARD;
  }

  private getProviderForMethod(method: PaymentMethod): string {
    const map: Record<PaymentMethod, string> = {
      [PaymentMethod.MADA]: 'HYPERPAY',
      [PaymentMethod.STC_PAY]: 'HYPERPAY',
      [PaymentMethod.CREDIT_CARD]: 'STRIPE',
      [PaymentMethod.DEBIT_CARD]: 'STRIPE',
      [PaymentMethod.APPLE_PAY]: 'STRIPE',
      [PaymentMethod.GOOGLE_PAY]: 'STRIPE',
      [PaymentMethod.TABBY]: 'TABBY',
      [PaymentMethod.TAMARA]: 'TAMARA',
      [PaymentMethod.WALLET]: 'INTERNAL',
      [PaymentMethod.CASH_ON_DELIVERY]: 'CASH',
    };
    return map[method] || 'STRIPE';
  }

  private getInstallmentsCount(plan: string): number {
    const map: Record<string, number> = {
      'PAY_IN_3': 3,
      'PAY_IN_4': 4,
      'PAY_IN_6': 6,
      'PAY_IN_12': 12,
    };
    return map[plan] || 4;
  }

  private mapPaymentResponse(payment: any): PaymentResponse {
    return {
      id: payment.id,
      paymentNumber: payment.paymentNumber,
      amount: Number(payment.amount),
      currency: payment.currency,
      status: payment.status,
      method: payment.method as PaymentMethod,
      provider: payment.provider,
      providerPaymentId: payment.providerPaymentId,
      referenceId: payment.referenceId,
      transactions: payment.transactions?.map((t: any) => ({
        id: t.id,
        type: t.type,
        amount: Number(t.amount),
        status: t.status,
        provider: t.provider,
        providerTransactionId: t.providerTransactionId,
        errorMessage: t.errorMessage,
        createdAt: t.createdAt,
      })),
      installments: payment.installments ? {
        provider: payment.installments.provider,
        planId: payment.installments.planId,
        installments: payment.installments.installments,
        installmentAmount: Number(payment.installments.installmentAmount),
        frequency: payment.installments.frequency,
        firstPaymentDate: payment.installments.firstPaymentDate,
        lastPaymentDate: payment.installments.lastPaymentDate,
        status: payment.installments.status,
      } : undefined,
      metadata: payment.metadata,
      createdAt: payment.createdAt,
    };
  }
}
