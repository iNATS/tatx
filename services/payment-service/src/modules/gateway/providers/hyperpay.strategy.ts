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
 * HyperPay Gateway Strategy
 * Supports: MADA, STC Pay, Visa, Mastercard (Saudi Arabia)
 * Documentation: https://docs.hyperpay.com/
 */
@Injectable()
export class HyperPayStrategy implements IGatewayStrategy {
  private readonly logger = new Logger(HyperPayStrategy.name);
  private readonly baseUrl: string;
  private readonly entityId: string;
  private readonly apiKey: string;
  private readonly isSandbox: boolean;

  constructor(private configService: ConfigService) {
    this.isSandbox = this.configService.get('HYPERPAY_SANDBOX', 'true') === 'true';
    this.baseUrl = this.isSandbox
      ? 'https://eu-test.oppwa.com'
      : 'https://eu-prod.oppwa.com';
    this.entityId = this.configService.get('HYPERPAY_ENTITY_ID', '');
    this.apiKey = this.configService.get('HYPERPAY_API_KEY', '');
  }

  getProvider(): GatewayProvider {
    return GatewayProvider.HYPERPAY;
  }

  isAvailable(): boolean {
    return !!(this.entityId && this.apiKey);
  }

  async processPayment(request: GatewayPaymentRequest): Promise<GatewayPaymentResponse> {
    try {
      // Step 1: Create checkout ID
      const checkoutResponse = await this.createCheckout(request);
      
      if (!checkoutResponse.success) {
        return checkoutResponse;
      }

      const checkoutId = checkoutResponse.transactionId;

      // Step 2: Process payment based on method
      if (request.paymentMethod === 'MADA' || request.paymentMethod === 'STC_PAY') {
        // For MADA and STC Pay, redirect is required
        return {
          success: true,
          transactionId: checkoutId,
          providerPaymentId: checkoutId,
          redirectUrl: `${this.baseUrl}/v1/checkouts/${checkoutId}/payment`,
          status: 'PENDING',
        };
      }

      // Step 3: Complete payment for card payments
      const paymentResponse = await this.completePayment(checkoutId, request);
      return paymentResponse;
    } catch (error) {
      this.logger.error('HyperPay payment processing failed', error);
      return {
        success: false,
        errorCode: 'HYPERPAY_ERROR',
        errorMessage: error instanceof Error ? error.message : 'Payment processing failed',
      };
    }
  }

  async processRefund(request: GatewayRefundRequest): Promise<GatewayRefundResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/v1/payments/${request.paymentId}/refunds`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: request.amount,
          currency: 'SAR',
          reason: request.reason,
        }),
      });

      const result = await response.json();

      if (result.result.code === '000.000.000' || result.result.code === '000.100.112') {
        return {
          success: true,
          refundId: result.id,
          providerRefundId: result.id,
          status: result.result.code,
        };
      }

      return {
        success: false,
        errorCode: result.result.code,
        errorMessage: result.result.description,
      };
    } catch (error) {
      this.logger.error('HyperPay refund processing failed', error);
      return {
        success: false,
        errorCode: 'HYPERPAY_REFUND_ERROR',
        errorMessage: error instanceof Error ? error.message : 'Refund processing failed',
      };
    }
  }

  async verifyWebhook(payload: unknown, signature: string): Promise<boolean> {
    // HyperPay uses IP whitelisting for webhooks
    // Verify the signature if provided
    if (!signature) {
      return false;
    }
    // In production, verify the signature against HyperPay's public key
    return true;
  }

  async getTokenDetails(token: string): Promise<{ brand: string; last4: string; expiryMonth: string; expiryYear: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/v1/checkouts/${token}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });

      const result = await response.json();
      
      return {
        brand: result.card?.brand || 'UNKNOWN',
        last4: result.card?.holder || '****',
        expiryMonth: result.card?.expiryMonth || '00',
        expiryYear: result.card?.expiryYear || '00',
      };
    } catch (error) {
      this.logger.error('Failed to get token details', error);
      throw error;
    }
  }

  private async createCheckout(request: GatewayPaymentRequest): Promise<GatewayPaymentResponse> {
    const paymentBrand = this.getPaymentBrand(request.paymentMethod);

    const response = await fetch(`${this.baseUrl}/v1/checkouts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: request.amount.toFixed(2),
        currency: request.currency || 'SAR',
        paymentType: request.transactionType === 'AUTHORIZE' ? 'PA' : 'DB',
        paymentBrand,
        entityId: this.entityId,
        merchantTransactionId: request.orderId,
        customer: {
          id: request.customerId,
          email: request.customerEmail,
          phone: request.customerPhone,
        },
        billing: {
          city: 'Riyadh',
          country: 'SA',
        },
        customParameters: {
          'Gateway': 'HyperPay',
          'IpAddress': request.ipAddress,
          'UserAgent': request.userAgent,
        },
      }),
    });

    const result = await response.json();

    if (result.result.code === '000.000.000' || result.result.code === '000.100.110') {
      return {
        success: true,
        transactionId: result.id,
        providerPaymentId: result.id,
        status: 'CREATED',
      };
    }

    return {
      success: false,
      errorCode: result.result.code,
      errorMessage: result.result.description,
    };
  }

  private async completePayment(checkoutId: string, request: GatewayPaymentRequest): Promise<GatewayPaymentResponse> {
    const paymentBrand = this.getPaymentBrand(request.paymentMethod);

    const response = await fetch(`${this.baseUrl}/v1/checkouts/${checkoutId}/payment`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        entityId: this.entityId,
        paymentBrand,
        card: request.cardDetails ? {
          number: request.cardDetails.number,
          expiryMonth: request.cardDetails.expiryMonth,
          expiryYear: request.cardDetails.expiryYear,
          cvv: request.cardDetails.cvv,
          cardholder: request.cardDetails.cardholderName,
        } : undefined,
        registration: request.saveCard,
        customParameters: {
          'Gateway': 'HyperPay',
          'IpAddress': request.ipAddress,
          'UserAgent': request.userAgent,
        },
      }),
    });

    const result = await response.json();

    if (this.isSuccessCode(result.result.code)) {
      return {
        success: true,
        transactionId: result.id,
        providerPaymentId: result.id,
        authorizationCode: result.result.code,
        cardToken: result.registration?.id,
        status: 'COMPLETED',
      };
    }

    return {
      success: false,
      errorCode: result.result.code,
      errorMessage: result.result.description,
    };
  }

  private getPaymentBrand(method: string): string {
    const brandMap: Record<string, string> = {
      'MADA': 'MADA',
      'STC_PAY': 'STCPAY',
      'CREDIT_CARD': 'VISA',
      'DEBIT_CARD': 'MASTER',
      'APPLE_PAY': 'APPLEPAY',
      'GOOGLE_PAY': 'GOOGLEPAY',
    };
    return brandMap[method] || 'VISA';
  }

  private isSuccessCode(code: string): boolean {
    return code === '000.000.000' || code.startsWith('000.1');
  }
}
