import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  GatewayPaymentRequest,
  GatewayPaymentResponse,
  GatewayRefundRequest,
  GatewayRefundResponse,
  GatewayProvider,
} from '../dto/gateway.dto';

export interface IGatewayStrategy {
  getProvider(): GatewayProvider;
  processPayment(request: GatewayPaymentRequest): Promise<GatewayPaymentResponse>;
  processRefund(request: GatewayRefundRequest): Promise<GatewayRefundResponse>;
  verifyWebhook(payload: unknown, signature: string): Promise<boolean>;
  getTokenDetails(token: string): Promise<{ brand: string; last4: string; expiryMonth: string; expiryYear: string }>;
  isAvailable(): boolean;
}

@Injectable()
export class GatewayService {
  private readonly logger = new Logger(GatewayService.name);
  private strategies: Map<GatewayProvider, IGatewayStrategy> = new Map();

  constructor(private configService: ConfigService) {}

  registerStrategy(strategy: IGatewayStrategy): void {
    this.strategies.set(strategy.getProvider(), strategy);
    this.logger.log(`Registered gateway strategy: ${strategy.getProvider()}`);
  }

  getStrategy(provider: GatewayProvider): IGatewayStrategy | undefined {
    return this.strategies.get(provider);
  }

  getAllStrategies(): IGatewayStrategy[] {
    return Array.from(this.strategies.values());
  }

  getAvailableProviders(): GatewayProvider[] {
    const available: GatewayProvider[] = [];
    for (const strategy of this.strategies.values()) {
      if (strategy.isAvailable()) {
        available.push(strategy.getProvider());
      }
    }
    return available;
  }

  async processPayment(
    provider: GatewayProvider,
    request: GatewayPaymentRequest,
  ): Promise<GatewayPaymentResponse> {
    const strategy = this.strategies.get(provider);
    if (!strategy) {
      throw new Error(`Gateway provider ${provider} is not configured`);
    }
    if (!strategy.isAvailable()) {
      throw new Error(`Gateway provider ${provider} is not available`);
    }
    return strategy.processPayment(request);
  }

  async processRefund(
    provider: GatewayProvider,
    request: GatewayRefundRequest,
  ): Promise<GatewayRefundResponse> {
    const strategy = this.strategies.get(provider);
    if (!strategy) {
      throw new Error(`Gateway provider ${provider} is not configured`);
    }
    return strategy.processRefund(request);
  }

  async verifyWebhook(
    provider: GatewayProvider,
    payload: unknown,
    signature: string,
  ): Promise<boolean> {
    const strategy = this.strategies.get(provider);
    if (!strategy) {
      throw new Error(`Gateway provider ${provider} is not configured`);
    }
    return strategy.verifyWebhook(payload, signature);
  }
}
