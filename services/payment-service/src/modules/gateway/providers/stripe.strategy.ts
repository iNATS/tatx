import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  IGatewayStrategy,
  GatewayPaymentRequest,
  GatewayPaymentResponse,
  GatewayRefundRequest,
  GatewayRefundResponse,
  GatewayProvider,
} from '../dto/gateway.dto';

/**
 * Stripe Gateway Strategy
 * Supports: International credit/debit cards, Apple Pay, Google Pay
 * Documentation: https://stripe.com/docs/api
 */
@Injectable()
export class StripeStrategy implements IGatewayStrategy {
  private readonly logger = new Logger(StripeStrategy.name);
  private readonly apiKey: string;
  private readonly webhookSecret: string;
  private readonly baseUrl = 'https://api.stripe.com/v1';

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get('STRIPE_SECRET_KEY', '');
    this.webhookSecret = this.configService.get('STRIPE_WEBHOOK_SECRET', '');
  }

  getProvider(): GatewayProvider {
    return GatewayProvider.STRIPE;
  }

  isAvailable(): boolean {
    return !!this.apiKey;
  }

  async processPayment(request: GatewayPaymentRequest): Promise<GatewayPaymentResponse> {
    try {
      // Create payment intent
      const paymentIntentData = new URLSearchParams({
        amount: Math.round(request.amount * 100).toString(), // Stripe uses smallest currency unit
        currency: (request.currency || 'USD').toLowerCase(),
        payment_method_types: this.getPaymentMethodTypes(request.paymentMethod),
        description: request.description || `Payment for order ${request.orderId}`,
        metadata: {
          orderId: request.orderId || '',
          customerId: request.customerId || '',
          gateway: 'Stripe',
          ipAddress: request.ipAddress || '',
        },
        capture_method: request.transactionType === 'AUTHORIZE' ? 'manual' : 'automatic',
        setup_future_usage: request.saveCard ? 'off_session' : undefined,
      });

      // Add customer if provided
      if (request.customerId) {
        paymentIntentData.append('customer', request.customerId);
      }

      // Add card token if provided
      if (request.cardToken) {
        paymentIntentData.append('payment_method', request.cardToken);
      }

      const response = await fetch(`${this.baseUrl}/payment_intents`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: paymentIntentData,
      });

      const result = await response.json();

      if (result.error) {
        return {
          success: false,
          errorCode: result.error.code,
          errorMessage: result.error.message,
        };
      }

      // Handle 3DS redirect if required
      if (result.status === 'requires_action' && result.next_action?.type === 'use_stripe_sdk') {
        return {
          success: true,
          transactionId: result.id,
          providerPaymentId: result.id,
          redirectUrl: result.next_action?.use_stripe_sdk?.stripe_js || '',
          status: 'REQUIRES_ACTION',
        };
      }

      return {
        success: true,
        transactionId: result.id,
        providerPaymentId: result.id,
        authorizationCode: result.client_secret,
        cardToken: result.payment_method,
        status: result.status.toUpperCase(),
      };
    } catch (error) {
      this.logger.error('Stripe payment processing failed', error);
      return {
        success: false,
        errorCode: 'STRIPE_ERROR',
        errorMessage: error instanceof Error ? error.message : 'Payment processing failed',
      };
    }
  }

  async processRefund(request: GatewayRefundRequest): Promise<GatewayRefundResponse> {
    try {
      const refundData = new URLSearchParams({
        payment_intent: request.paymentId,
        amount: Math.round(request.amount * 100).toString(),
        reason: this.getRefundReason(request.reason),
        metadata: {
          refundReason: request.reason,
        },
      });

      const response = await fetch(`${this.baseUrl}/refunds`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: refundData,
      });

      const result = await response.json();

      if (result.error) {
        return {
          success: false,
          errorCode: result.error.code,
          errorMessage: result.error.message,
        };
      }

      return {
        success: true,
        refundId: result.id,
        providerRefundId: result.id,
        status: result.status.toUpperCase(),
      };
    } catch (error) {
      this.logger.error('Stripe refund processing failed', error);
      return {
        success: false,
        errorCode: 'STRIPE_REFUND_ERROR',
        errorMessage: error instanceof Error ? error.message : 'Refund processing failed',
      };
    }
  }

  async verifyWebhook(payload: unknown, signature: string): Promise<boolean> {
    if (!signature || !this.webhookSecret) {
      return false;
    }

    try {
      // In production, use Stripe's webhook signature verification
      // This is a simplified version
      return !!signature;
    } catch {
      return false;
    }
  }

  async getTokenDetails(token: string): Promise<{ brand: string; last4: string; expiryMonth: string; expiryYear: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/payment_methods/${token}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });

      const result = await response.json();

      if (result.card) {
        return {
          brand: result.card.brand.toUpperCase(),
          last4: result.card.last4,
          expiryMonth: result.card.exp_month.toString().padStart(2, '0'),
          expiryYear: result.card.exp_year.toString(),
        };
      }

      throw new Error('Invalid payment method');
    } catch (error) {
      this.logger.error('Failed to get token details', error);
      throw error;
    }
  }

  private getPaymentMethodTypes(method: string): string[] {
    const methodMap: Record<string, string[]> = {
      'CREDIT_CARD': ['card'],
      'DEBIT_CARD': ['card'],
      'APPLE_PAY': ['card', 'link'],
      'GOOGLE_PAY': ['card', 'link'],
    };
    return methodMap[method] || ['card'];
  }

  private getRefundReason(reason: string): string {
    const reasonMap: Record<string, string> = {
      'duplicate': 'duplicate',
      'fraudulent': 'fraudulent',
      'requested_by_customer': 'requested_by_customer',
    };
    return reasonMap[reason.toLowerCase()] || '';
  }
}
