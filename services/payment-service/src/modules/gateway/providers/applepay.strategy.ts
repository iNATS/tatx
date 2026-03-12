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
 * Apple Pay Gateway Strategy
 * Supports: Apple Pay payments via Stripe or HyperPay
 * Documentation: https://developer.apple.com/apple-pay/
 */
@Injectable()
export class ApplePayStrategy implements IGatewayStrategy {
  private readonly logger = new Logger(ApplePayStrategy.name);
  private readonly merchantId: string;
  private readonly merchantCertificate: string;
  private readonly processingStrategy: 'STRIPE' | 'HYPERPAY';

  constructor(private configService: ConfigService) {
    this.merchantId = this.configService.get('APPLE_PAY_MERCHANT_ID', '');
    this.merchantCertificate = this.configService.get('APPLE_PAY_MERCHANT_CERTIFICATE', '');
    this.processingStrategy = (this.configService.get('APPLE_PAY_PROCESSOR', 'STRIPE') as 'STRIPE' | 'HYPERPAY') || 'STRIPE';
  }

  getProvider(): GatewayProvider {
    return GatewayProvider.APPLE_PAY;
  }

  isAvailable(): boolean {
    return !!this.merchantId && !!this.merchantCertificate;
  }

  async processPayment(request: GatewayPaymentRequest): Promise<GatewayPaymentResponse> {
    try {
      // Apple Pay token is passed in cardToken
      const applePayToken = request.cardToken;

      if (!applePayToken) {
        return {
          success: false,
          errorCode: 'APPLE_PAY_MISSING_TOKEN',
          errorMessage: 'Apple Pay token is required',
        };
      }

      // Process via configured strategy
      if (this.processingStrategy === 'STRIPE') {
        return this.processViaStripe(applePayToken, request);
      } else {
        return this.processViaHyperPay(applePayToken, request);
      }
    } catch (error) {
      this.logger.error('Apple Pay payment processing failed', error);
      return {
        success: false,
        errorCode: 'APPLE_PAY_ERROR',
        errorMessage: error instanceof Error ? error.message : 'Payment processing failed',
      };
    }
  }

  async processRefund(request: GatewayRefundRequest): Promise<GatewayRefundResponse> {
    // Apple Pay refunds are processed through the underlying payment processor
    // This is a placeholder - in production, route to the correct processor
    return {
      success: false,
      errorCode: 'NOT_IMPLEMENTED',
      errorMessage: 'Refunds must be processed through the underlying payment processor',
    };
  }

  async verifyWebhook(payload: unknown, signature: string): Promise<boolean> {
    // Apple Pay doesn't send webhooks directly
    // Webhooks come from the payment processor
    return true;
  }

  async getTokenDetails(token: string): Promise<{ brand: string; last4: string; expiryMonth: string; expiryYear: string }> {
    // Apple Pay tokens are processed through the payment processor
    // Return placeholder values
    return {
      brand: 'APPLE_PAY',
      last4: '****',
      expiryMonth: '00',
      expiryYear: '00',
    };
  }

  /**
   * Generate Apple Pay session for payment authorization
   */
  async createSession(domainName: string, displayName: string): Promise<{
    merchantId: string;
    displayName: string;
    initiative: string;
    initiativeContext: string;
  }> {
    return {
      merchantId: this.merchantId,
      displayName,
      initiative: 'web',
      initiativeContext: domainName,
    };
  }

  private async processViaStripe(token: string, request: GatewayPaymentRequest): Promise<GatewayPaymentResponse> {
    const apiKey = this.configService.get('STRIPE_SECRET_KEY', '');
    
    // Create payment method from Apple Pay token
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
        description: request.description || `Apple Pay payment for ${request.orderId}`,
        metadata: JSON.stringify({
          orderId: request.orderId || '',
          customerId: request.customerId || '',
          paymentType: 'APPLE_PAY',
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
        paymentBrand: 'APPLEPAY',
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

    // Complete payment with Apple Pay token
    const paymentResponse = await fetch(`${baseUrl}/v1/checkouts/${checkout.id}/payment`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        entityId,
        paymentBrand: 'APPLEPAY',
        'ApplePayData': token,
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
