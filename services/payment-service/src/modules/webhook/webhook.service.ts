import { Injectable, Logger, BadRequestException, NotFoundException } from '@nestjs/common';
import { prisma } from '@tatx/database';
import { GatewayService } from '../gateway/gateway.service';
import { GatewayProvider } from '../../dto/gateway.dto';

/**
 * Webhook Service
 * Handles incoming webhooks from payment gateways
 */
@Injectable()
export class WebhookService {
  private readonly logger = new Logger(WebhookService.name);

  constructor(private gatewayService: GatewayService) {}

  /**
   * Process HyperPay webhook
   */
  async processHyperPay(payload: any, signature: string): Promise<{ success: boolean; message: string }> {
    try {
      // Verify webhook signature
      const strategy = this.gatewayService.getStrategy(GatewayProvider.HYPERPAY);
      if (!strategy) {
        throw new BadRequestException('HyperPay gateway not configured');
      }

      const isValid = await strategy.verifyWebhook(payload, signature);
      if (!isValid) {
        throw new BadRequestException('Invalid webhook signature');
      }

      const { id, resourceId, transactionType, entity, amount, currency } = payload;

      // Find payment by provider payment ID
      const payment = await prisma.payment.findFirst({
        where: { providerPaymentId: resourceId },
      });

      if (!payment) {
        this.logger.warn(`Payment not found for HyperPay webhook: ${resourceId}`);
        return { success: true, message: 'Payment not found, but webhook accepted' };
      }

      // Update payment status based on entity status
      const statusMap: Record<string, string> = {
        '000.000.000': 'COMPLETED',
        '000.100.110': 'COMPLETED',
        '000.100.111': 'COMPLETED',
        '000.100.112': 'REFUNDED',
        '100.100.600': 'FAILED',
        '200.100.100': 'FAILED',
      };

      const newStatus = statusMap[entity.code] || 'PENDING';

      await prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: newStatus,
          processedAt: newStatus === 'COMPLETED' ? new Date() : undefined,
          metadata: {
            ...payment.metadata,
            webhookReceived: new Date(),
            webhookPayload: payload,
          },
        },
      });

      // Create transaction record
      if (newStatus === 'COMPLETED') {
        await prisma.transaction.create({
          data: {
            paymentId: payment.id,
            type: 'CHARGE',
            amount,
            status: 'COMPLETED',
            provider: 'HYPERPAY',
            providerTransactionId: id,
            gatewayResponse: entity,
          },
        });
      }

      this.logger.log(`Processed HyperPay webhook for payment ${payment.id}: ${newStatus}`);
      return { success: true, message: 'Webhook processed successfully' };
    } catch (error) {
      this.logger.error('Failed to process HyperPay webhook', error);
      throw error;
    }
  }

  /**
   * Process Stripe webhook
   */
  async processStripe(payload: any, signature: string): Promise<{ success: boolean; message: string }> {
    try {
      // Verify webhook signature
      const strategy = this.gatewayService.getStrategy(GatewayProvider.STRIPE);
      if (!strategy) {
        throw new BadRequestException('Stripe gateway not configured');
      }

      const isValid = await strategy.verifyWebhook(payload, signature);
      if (!isValid) {
        throw new BadRequestException('Invalid webhook signature');
      }

      const { type, data } = payload;
      const eventObject = data.object as any;

      this.logger.log(`Processing Stripe webhook: ${type}`);

      switch (type) {
        case 'payment_intent.succeeded':
          await this.handleStripePaymentSuccess(eventObject);
          break;
        case 'payment_intent.payment_failed':
          await this.handleStripePaymentFailed(eventObject);
          break;
        case 'charge.refunded':
          await this.handleStripeRefund(eventObject);
          break;
        case 'charge.dispute.created':
          await this.handleStripeDispute(eventObject);
          break;
      }

      return { success: true, message: 'Webhook processed successfully' };
    } catch (error) {
      this.logger.error('Failed to process Stripe webhook', error);
      throw error;
    }
  }

  /**
   * Process Tabby webhook
   */
  async processTabby(payload: any, signature: string): Promise<{ success: boolean; message: string }> {
    try {
      const strategy = this.gatewayService.getStrategy(GatewayProvider.TABBY);
      if (!strategy) {
        throw new BadRequestException('Tabby gateway not configured');
      }

      const isValid = await strategy.verifyWebhook(payload, signature);
      if (!isValid) {
        throw new BadRequestException('Invalid webhook signature');
      }

      const { event, payment_id, order_id, status } = payload;

      this.logger.log(`Processing Tabby webhook: ${event} for payment ${payment_id}`);

      // Find payment
      const payment = await prisma.payment.findFirst({
        where: { providerPaymentId: payment_id },
      });

      if (!payment) {
        this.logger.warn(`Payment not found for Tabby webhook: ${payment_id}`);
        return { success: true, message: 'Payment not found, but webhook accepted' };
      }

      const statusMap: Record<string, string> = {
        'APPROVED': 'COMPLETED',
        'REJECTED': 'FAILED',
        'CANCELLED': 'CANCELLED',
        'REFUNDED': 'REFUNDED',
      };

      const newStatus = statusMap[status] || 'PENDING';

      await prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: newStatus,
          processedAt: newStatus === 'COMPLETED' ? new Date() : undefined,
        },
      });

      return { success: true, message: 'Webhook processed successfully' };
    } catch (error) {
      this.logger.error('Failed to process Tabby webhook', error);
      throw error;
    }
  }

  /**
   * Process Tamara webhook
   */
  async processTamara(payload: any, signature: string): Promise<{ success: boolean; message: string }> {
    try {
      const strategy = this.gatewayService.getStrategy(GatewayProvider.TAMARA);
      if (!strategy) {
        throw new BadRequestException('Tamara gateway not configured');
      }

      const isValid = await strategy.verifyWebhook(payload, signature);
      if (!isValid) {
        throw new BadRequestException('Invalid webhook signature');
      }

      const { event_type, payment_id, order_id, status } = payload;

      this.logger.log(`Processing Tamara webhook: ${event_type} for payment ${payment_id}`);

      // Find payment
      const payment = await prisma.payment.findFirst({
        where: { providerPaymentId: payment_id },
      });

      if (!payment) {
        this.logger.warn(`Payment not found for Tamara webhook: ${payment_id}`);
        return { success: true, message: 'Payment not found, but webhook accepted' };
      }

      const statusMap: Record<string, string> = {
        'APPROVED': 'COMPLETED',
        'REJECTED': 'FAILED',
        'CANCELLED': 'CANCELLED',
        'REFUNDED': 'REFUNDED',
        'CAPTURED': 'COMPLETED',
      };

      const newStatus = statusMap[status] || 'PENDING';

      await prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: newStatus,
          processedAt: newStatus === 'COMPLETED' ? new Date() : undefined,
        },
      });

      return { success: true, message: 'Webhook processed successfully' };
    } catch (error) {
      this.logger.error('Failed to process Tamara webhook', error);
      throw error;
    }
  }

  // Private helper methods

  private async handleStripePaymentSuccess(eventObject: any): Promise<void> {
    const payment = await prisma.payment.findFirst({
      where: { providerPaymentId: eventObject.id },
    });

    if (payment) {
      await prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: 'COMPLETED',
          processedAt: new Date(),
        },
      });

      await prisma.transaction.create({
        data: {
          paymentId: payment.id,
          type: 'CHARGE',
          amount: eventObject.amount / 100, // Convert from cents
          status: 'COMPLETED',
          provider: 'STRIPE',
          providerTransactionId: eventObject.id,
        },
      });
    }
  }

  private async handleStripePaymentFailed(eventObject: any): Promise<void> {
    const payment = await prisma.payment.findFirst({
      where: { providerPaymentId: eventObject.id },
    });

    if (payment) {
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: 'FAILED' },
      });
    }
  }

  private async handleStripeRefund(eventObject: any): Promise<void> {
    const payment = await prisma.payment.findFirst({
      where: { providerPaymentId: eventObject.payment_intent },
    });

    if (payment) {
      await prisma.refund.create({
        data: {
          paymentId: payment.id,
          amount: eventObject.amount / 100,
          reason: 'Refunded via Stripe',
          status: 'COMPLETED',
          providerRefundId: eventObject.id,
          processedAt: new Date(),
        },
      });

      const totalRefunded = await prisma.refund.aggregate({
        where: { paymentId: payment.id },
        _sum: { amount: true },
      });

      const newStatus = Number(totalRefunded._sum.amount) >= Number(payment.amount) ? 'REFUNDED' : 'PARTIALLY_REFUNDED';

      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: newStatus },
      });
    }
  }

  private async handleStripeDispute(eventObject: any): Promise<void> {
    const payment = await prisma.payment.findFirst({
      where: { providerPaymentId: eventObject.payment_intent },
    });

    if (payment) {
      await prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: 'CHARGEBACK',
          metadata: {
            ...payment.metadata,
            dispute: eventObject,
          },
        },
      });
    }
  }
}
