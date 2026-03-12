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
 * Google Pay Gateway Strategy
 * Supports: Google Pay payments via Stripe or HyperPay
 * Documentation: https://developers.google.com/pay/api
 */
@Injectable()
export class GooglePayStrategy implements IGatewayStrategy {
  private readonly logger = new Logger(GooglePayStrategy.name);
  private readonly merchantId: string;
  private readonly gatewayMerchantId: string;
  private readonly processingStrategy: 'STRIPE' | 'HYPERPAY';

  constructor(private configService: ConfigService) {
    this.merchantId = this.configService.get('GOOGLE_PAY_MERCHANT_ID', '');
    this.gatewayMerchantId = this.configService.get('GOOGLE_PAY_GATEWAY_MERCHANT_ID', '');
    this.processingStrategy = (this.configService.get('GOOGLE_PAY_PROCESSOR', 'STRIPE') as 'STRIPE' | 'HYPERPAY') || 'STRIPE';
  }

  getProvider(): GatewayProvider {
    return GatewayProvider.GOOGLE_PAY;
  }

  isAvailable(): boolean {
    return !!this.merchantId;
  }

  async processPayment(request: GatewayPaymentRequest): Promise<GatewayPaymentResponse> {
    try {
      // Google Pay token is passed in cardToken
      const googlePayToken = request.cardToken;

      if (!googlePayToken) {
        return {
          success: false,
          errorCode: 'GOOGLE_PAY_MISSING_TOKEN',
          errorMessage: 'Google Pay token is required',
        };
      }

      // Process via configured strategy
      if (this.processingStrategy === 'STRIPE') {
        return this.processViaStripe(googlePayToken, request);
      } else {
        return this.processViaHyperPay(googlePayToken, request);
      }
    } catch (error) {
      this.logger.error('Google Pay payment processing failed', error);
      return {
        success: false,
        errorCode: 'GOOGLE_PAY_ERROR',
        errorMessage: error instanceof Error ? error.message : 'Payment processing failed',
      };
    }
  }

  async processRefund(request: GatewayRefundRequest): Promise<GatewayRefundResponse> {
    // Google Pay refunds are processed through the underlying payment processor
    return {
      success: false,
      errorCode: 'NOT_IMPLEMENTED',
      errorMessage: 'Refunds must be processed through the underlying payment processor',
    };
  }

  async verifyWebhook(payload: unknown, signature: string): Promise<boolean> {
    // Google Pay doesn't send webhooks directly
    return true;
  }

  async getTokenDetails(token: string): Promise<{ brand: string; last4: string; expiryMonth: string; expiryYear: string }> {
    return {
      brand: 'GOOGLE_PAY',
      last4: '****',
      expiryMonth: '00',
      expiryYear: '00',
    };
  }

  /**
   * Get Google Pay configuration for client-side integration
   */
  getConfiguration(): {
    gateway: string;
    merchantId: string;
    merchantName: string;
    allowedCardNetworks: string[];
    allowedAuthMethods: string[];
  } {
    return {
      gateway: 'stripe',
      merchantId: this.gatewayMerchantId,
      merchantName: 'Tatx',
      allowedCardNetworks: ['VISA', 'MASTERCARD', 'AMEX'],
      allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
    };
  }

  private async processViaStripe(token: string, request: GatewayPaymentRequest): Promise<GatewayPaymentResponse> {
    const apiKey = this.configService.get('STRIPE_SECRET_KEY', '');
    
    // Create payment method from Google Pay token
    const paymentMethodResponse = await fetch('https://api.stripe.com/v1/payment_methods', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        type: 'card',
        card: JSON.stringify({ token }),
      }),
    });

    const paymentMethod = await paymentMethodResponse.json();

    if (paymentMethod.error) {
      return {
        success: false,
        errorCode: paymentMethod.error.code,
        errorMessage: paymentMethod.error.message,
      };
    }

    // Create payment intent
    const paymentIntentResponse = await fetch('https://api.stripe.com/v1/payment_intents', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        amount: Math.round(request.amount * 100).toString(),
        currency: (request.currency || 'SAR').toLowerCase(),
        payment_method: paymentMethod.id,
        confirm: 'true',
        description: request.description || `Google Pay payment for ${request.orderId}`,
        metadata: JSON.stringify({
          orderId: request.orderId || '',
          customerId: request.customerId || '',
          paymentType: 'GOOGLE_PAY',
        }),
      }),
    });

    const result = await paymentIntentResponse.json();

    if (result.error) {
      return {
        success: false,
        errorCode: result.error.code,
        errorMessage: result.error.message,
      };
    }

    return {
      success: true,
      transactionId: result.id,
      providerPaymentId: result.id,
      cardToken: paymentMethod.id,
      status: result.status.toUpperCase(),
    };
  }

  private async processViaHyperPay(token: string, request: GatewayPaymentRequest): Promise<GatewayPaymentResponse> {
    const apiKey = this.configService.get('HYPERPAY_API_KEY', '');
    const entityId = this.configService.get('HYPERPAY_ENTITY_ID', '');
    const baseUrl = this.configService.get('HYPERPAY_SANDBOX', 'true') === 'true'
      ? 'https://eu-test.oppwa.com'
      : 'https://eu-prod.oppwa.com';

    // Create checkout
    const checkoutResponse = await fetch(`${baseUrl}/v1/checkouts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: request.amount.toFixed(2),
        currency: request.currency || 'SAR',
        paymentType: 'DB',
        paymentBrand: 'GOOGLEPAY',
        entityId,
      }),
    });

    const checkout = await checkoutResponse.json();

    if (!checkout.id) {
      return {
        success: false,
        errorCode: 'HYPERPAY_ERROR',
        errorMessage: 'Failed to create checkout',
      };
    }

    // Complete payment with Google Pay token
    const paymentResponse = await fetch(`${baseUrl}/v1/checkouts/${checkout.id}/payment`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        entityId,
        paymentBrand: 'GOOGLEPAY',
        'GooglePayData': token,
      }),
    });

    const result = await paymentResponse.json();

    if (result.result.code === '000.000.000') {
      return {
        success: true,
        transactionId: result.id,
        providerPaymentId: result.id,
        status: 'COMPLETED',
      };
    }

    return {
      success: false,
      errorCode: result.result.code,
      errorMessage: result.result.description,
    };
  }
}
