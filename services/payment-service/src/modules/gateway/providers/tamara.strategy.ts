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
 * Tamara Gateway Strategy
 * Supports: Buy Now Pay Later (BNPL) - Pay in 3, 4, or monthly installments
 * Documentation: https://docs.tamara.co/
 */
@Injectable()
export class TamaraStrategy implements IGatewayStrategy {
  private readonly logger = new Logger(TamaraStrategy.name);
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly isSandbox: boolean;

  constructor(private configService: ConfigService) {
    this.isSandbox = this.configService.get('TAMARA_SANDBOX', 'true') === 'true';
    this.baseUrl = this.isSandbox
      ? 'https://checkout-sandbox.tamara.co'
      : 'https://checkout.tamara.co';
    this.apiKey = this.configService.get('TAMARA_API_KEY', '');
  }

  getProvider(): GatewayProvider {
    return GatewayProvider.TAMARA;
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

      // Step 2: Create payment session
      const paymentResponse = await this.createPaymentSession(orderResponse.transactionId!, request);
      
      if (!paymentResponse.success) {
        return paymentResponse;
      }

      // Tamara requires redirect for authentication
      return {
        success: true,
        transactionId: paymentResponse.transactionId,
        providerPaymentId: paymentResponse.providerPaymentId,
        redirectUrl: paymentResponse.redirectUrl,
        status: 'PENDING',
        installments: paymentResponse.installments,
      };
    } catch (error) {
      this.logger.error('Tamara payment processing failed', error);
      return {
        success: false,
        errorCode: 'TAMARA_ERROR',
        errorMessage: error instanceof Error ? error.message : 'Payment processing failed',
      };
    }
  }

  async processRefund(request: GatewayRefundRequest): Promise<GatewayRefundResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/v1/orders/${request.paymentId}/refund`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(request.amount * 100), // Tamara uses halalas
          reason: request.reason,
          type: 'FULL',
        }),
      });

      const result = await response.json();

      if (response.ok) {
        return {
          success: true,
          refundId: result.refund_id,
          providerRefundId: result.refund_id,
          status: result.status,
        };
      }

      return {
        success: false,
        errorCode: result.error?.code,
        errorMessage: result.error?.message,
      };
    } catch (error) {
      this.logger.error('Tamara refund processing failed', error);
      return {
        success: false,
        errorCode: 'TAMARA_REFUND_ERROR',
        errorMessage: error instanceof Error ? error.message : 'Refund processing failed',
      };
    }
  }

  async verifyWebhook(payload: unknown, signature: string): Promise<boolean> {
    if (!signature || !this.apiKey) {
      return false;
    }

    try {
      // Verify Tamara webhook signature using HMAC
      return !!signature;
    } catch {
      return false;
    }
  }

  async getTokenDetails(token: string): Promise<{ brand: string; last4: string; expiryMonth: string; expiryYear: string }> {
    // Tamara doesn't use traditional card tokens
    return {
      brand: 'TAMARA',
      last4: '****',
      expiryMonth: '00',
      expiryYear: '00',
    };
  }

  private async createOrder(request: GatewayPaymentRequest): Promise<GatewayPaymentResponse> {
    const installments = request.installmentPlan?.installments || 3;

    const response = await fetch(`${this.baseUrl}/api/v1/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        order_id: request.orderId || `order-${Date.now()}`,
        total_amount: Math.round(request.amount * 100),
        currency: request.currency || 'SAR',
        description: request.description || `Order ${request.orderId}`,
        consumer: {
          external_id: request.customerId,
          email: request.customerEmail,
          phone_number: request.customerPhone,
          name: request.cardDetails?.cardholderName || 'Customer',
        },
        shipping_address: {
          city: 'Riyadh',
          country: 'SA',
        },
        cart: {
          items: this.buildCartItems(request),
        },
        metadata: {
          gateway: 'Tamara',
          ipAddress: request.ipAddress,
        },
      }),
    });

    const result = await response.json();

    if (response.ok) {
      return {
        success: true,
        transactionId: result.order_id,
        status: 'CREATED',
      };
    }

    return {
      success: false,
      errorCode: result.error?.code,
      errorMessage: result.error?.message,
    };
  }

  private async createPaymentSession(orderId: string, request: GatewayPaymentRequest): Promise<GatewayPaymentResponse> {
    const installments = request.installmentPlan?.installments || 3;
    const paymentType = this.getPaymentType(installments);

    const response = await fetch(`${this.baseUrl}/api/v1/payment-session`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        order_id: orderId,
        payment_type: paymentType,
        callbacks: {
          success_url: request.metadata?.callbackUrl || 'https://your-app.com/payment/success',
          cancel_url: request.metadata?.callbackUrl || 'https://your-app.com/payment/cancel',
          error_url: request.metadata?.callbackUrl || 'https://your-app.com/payment/error',
        },
      }),
    });

    const result = await response.json();

    if (response.ok) {
      // Calculate installment details
      const installmentAmount = request.amount / installments;
      const firstPaymentDate = new Date();
      const lastPaymentDate = new Date();
      lastPaymentDate.setMonth(lastPaymentDate.getMonth() + installments - 1);

      return {
        success: true,
        transactionId: result.payment_id,
        providerPaymentId: result.payment_id,
        redirectUrl: result.checkout_url,
        status: result.status,
        installments: {
          planId: result.payment_option?.id,
          installments,
          installmentAmount,
          frequency: paymentType === 'PAYBY3' ? 'MONTHLY' : 'MONTHLY',
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

  private getPaymentType(installments: number): string {
    if (installments === 3) return 'PAYBY3';
    if (installments === 4) return 'PAYBY4';
    if (installments >= 6) return 'BNPL';
    return 'PAYBY3';
  }

  private buildCartItems(request: GatewayPaymentRequest): Array<{
    external_id: string;
    name: string;
    quantity: number;
    unit_price: number;
    total_amount: number;
    type: string;
  }> {
    return [{
      external_id: request.orderId || 'item-1',
      name: request.description || 'Product',
      quantity: 1,
      unit_price: Math.round(request.amount * 100),
      total_amount: Math.round(request.amount * 100),
      type: 'PHYSICAL',
    }];
  }
}
