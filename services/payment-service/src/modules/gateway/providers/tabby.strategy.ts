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
 * Tabby Gateway Strategy
 * Supports: Buy Now Pay Later (BNPL) - Pay in 4 installments
 * Documentation: https://docs.tabby.ai/
 */
@Injectable()
export class TabbyStrategy implements IGatewayStrategy {
  private readonly logger = new Logger(TabbyStrategy.name);
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly isSandbox: boolean;

  constructor(private configService: ConfigService) {
    this.isSandbox = this.configService.get('TABBY_SANDBOX', 'true') === 'true';
    this.baseUrl = this.isSandbox
      ? 'https://api.sandbox.tabby.ai'
      : 'https://api.tabby.ai';
    this.apiKey = this.configService.get('TABBY_API_KEY', '');
  }

  getProvider(): GatewayProvider {
    return GatewayProvider.TABBY;
  }

  isAvailable(): boolean {
    return !!this.apiKey;
  }

  async processPayment(request: GatewayPaymentRequest): Promise<GatewayPaymentResponse> {
    try {
      // Step 1: Create order
      const orderResponse = await this.createOrder(request);
      
      if (!orderResponse.success) {
        return orderResponse;
      }

      // Step 2: Create payment
      const paymentResponse = await this.createPayment(orderResponse.transactionId!, request);
      
      if (!paymentResponse.success) {
        return paymentResponse;
      }

      // Tabby requires redirect for authentication
      return {
        success: true,
        transactionId: paymentResponse.transactionId,
        providerPaymentId: paymentResponse.providerPaymentId,
        redirectUrl: paymentResponse.redirectUrl,
        status: 'PENDING',
        installments: paymentResponse.installments,
      };
    } catch (error) {
      this.logger.error('Tabby payment processing failed', error);
      return {
        success: false,
        errorCode: 'TABBY_ERROR',
        errorMessage: error instanceof Error ? error.message : 'Payment processing failed',
      };
    }
  }

  async processRefund(request: GatewayRefundRequest): Promise<GatewayRefundResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/v2/payments/${request.paymentId}/refund`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(request.amount * 100), // Tabby uses fils
          reason: request.reason,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        return {
          success: true,
          refundId: result.id,
          providerRefundId: result.id,
          status: result.status,
        };
      }

      return {
        success: false,
        errorCode: result.error?.code,
        errorMessage: result.error?.message,
      };
    } catch (error) {
      this.logger.error('Tabby refund processing failed', error);
      return {
        success: false,
        errorCode: 'TABBY_REFUND_ERROR',
        errorMessage: error instanceof Error ? error.message : 'Refund processing failed',
      };
    }
  }

  async verifyWebhook(payload: unknown, signature: string): Promise<boolean> {
    if (!signature || !this.apiKey) {
      return false;
    }

    try {
      // Verify Tabby webhook signature
      // In production, use HMAC verification
      return !!signature;
    } catch {
      return false;
    }
  }

  async getTokenDetails(token: string): Promise<{ brand: string; last4: string; expiryMonth: string; expiryYear: string }> {
    // Tabby doesn't use traditional card tokens
    // Return placeholder values
    return {
      brand: 'TABBY',
      last4: '****',
      expiryMonth: '00',
      expiryYear: '00',
    };
  }

  private async createOrder(request: GatewayPaymentRequest): Promise<GatewayPaymentResponse> {
    const installments = request.installmentPlan?.installments || 4;

    const response = await fetch(`${this.baseUrl}/api/v2/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        external_id: request.orderId,
        total_amount: Math.round(request.amount * 100), // Convert to fils
        currency: request.currency || 'SAR',
        items: this.buildOrderItems(request),
        customer: {
          external_id: request.customerId,
          email: request.customerEmail,
          phone: request.customerPhone,
          name: request.cardDetails?.cardholderName,
        },
        shipping_address: {
          city: 'Riyadh',
          country: 'SA',
        },
        description: request.description || `Order ${request.orderId}`,
        metadata: {
          gateway: 'Tabby',
          ipAddress: request.ipAddress,
        },
      }),
    });

    const result = await response.json();

    if (response.ok) {
      return {
        success: true,
        transactionId: result.id,
        status: 'CREATED',
      };
    }

    return {
      success: false,
      errorCode: result.error?.code,
      errorMessage: result.error?.message,
    };
  }

  private async createPayment(orderId: string, request: GatewayPaymentRequest): Promise<GatewayPaymentResponse> {
    const installments = request.installmentPlan?.installments || 4;

    const response = await fetch(`${this.baseUrl}/api/v2/payments`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        order_id: orderId,
        payment_option: {
          type: 'PAY_IN_INSTALLMENTS',
          installments_count: installments,
        },
        callbacks: {
          success: request.metadata?.callbackUrl || 'https://your-app.com/payment/success',
          cancel: request.metadata?.callbackUrl || 'https://your-app.com/payment/cancel',
          error: request.metadata?.callbackUrl || 'https://your-app.com/payment/error',
        },
      }),
    });

    const result = await response.json();

    if (response.ok) {
      // Calculate installment details
      const installmentAmount = request.amount / installments;
      const firstPaymentDate = new Date();
      const lastPaymentDate = new Date();
      lastPaymentDate.setMonth(lastPaymentDate.getMonth() + (installments - 1) * 2);

      return {
        success: true,
        transactionId: result.id,
        providerPaymentId: result.id,
        redirectUrl: result.redirect_url,
        status: result.status,
        installments: {
          planId: result.payment_option?.id,
          installments,
          installmentAmount,
          frequency: 'BIWEEKLY',
          firstPaymentDate,
          lastPaymentDate,
        },
      };
    }

    return {
      success: false,
      errorCode: result.error?.code,
      errorMessage: result.error?.message,
    };
  }

  private buildOrderItems(request: GatewayPaymentRequest): Array<{
    external_id: string;
    name: string;
    quantity: number;
    unit_price: number;
    total_amount: number;
  }> {
    // Default to single item if no specific items provided
    return [{
      external_id: request.orderId || 'item-1',
      name: request.description || 'Product',
      quantity: 1,
      unit_price: Math.round(request.amount * 100),
      total_amount: Math.round(request.amount * 100),
    }];
  }
}
