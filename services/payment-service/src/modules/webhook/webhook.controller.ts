import {
  Controller,
  Post,
  Body,
  Headers,
  Param,
  Logger,
  RawBodyRequest,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiHeader,
  ApiBody,
} from '@nestjs/swagger';
import { WebhookService } from './webhook.service';

/**
 * Webhook Controller
 * Receives webhooks from payment gateways
 * Note: These endpoints should be secured via IP whitelisting in production
 */
@ApiTags('Webhooks')
@Controller('webhooks')
export class WebhookController {
  private readonly logger = new Logger(WebhookController.name);

  constructor(private webhookService: WebhookService) {}

  @Post('hyperpay')
  @ApiOperation({ summary: 'HyperPay webhook endpoint' })
  @ApiHeader({ name: 'X-Signature', description: 'Webhook signature' })
  async handleHyperPay(
    @Body() payload: any,
    @Headers('X-Signature') signature: string,
  ): Promise<{ success: boolean; message: string }> {
    this.logger.log('Received HyperPay webhook');
    return this.webhookService.processHyperPay(payload, signature);
  }

  @Post('stripe')
  @ApiOperation({ summary: 'Stripe webhook endpoint' })
  @ApiHeader({ name: 'Stripe-Signature', description: 'Stripe webhook signature' })
  async handleStripe(
    @Body() payload: any,
    @Headers('Stripe-Signature') signature: string,
  ): Promise<{ success: boolean; message: string }> {
    this.logger.log('Received Stripe webhook');
    return this.webhookService.processStripe(payload, signature);
  }

  @Post('tabby')
  @ApiOperation({ summary: 'Tabby webhook endpoint' })
  @ApiHeader({ name: 'X-Tabby-Signature', description: 'Tabby webhook signature' })
  async handleTabby(
    @Body() payload: any,
    @Headers('X-Tabby-Signature') signature: string,
  ): Promise<{ success: boolean; message: string }> {
    this.logger.log('Received Tabby webhook');
    return this.webhookService.processTabby(payload, signature);
  }

  @Post('tamara')
  @ApiOperation({ summary: 'Tamara webhook endpoint' })
  @ApiHeader({ name: 'X-Tamara-Signature', description: 'Tamara webhook signature' })
  async handleTamara(
    @Body() payload: any,
    @Headers('X-Tamara-Signature') signature: string,
  ): Promise<{ success: boolean; message: string }> {
    this.logger.log('Received Tamara webhook');
    return this.webhookService.processTamara(payload, signature);
  }

  @Post(':provider')
  @ApiOperation({ summary: 'Generic webhook endpoint for any provider' })
  @ApiParam({ name: 'provider', description: 'Payment provider name' })
  async handleGeneric(
    @Param('provider') provider: string,
    @Body() payload: any,
    @Headers() headers: Record<string, string>,
  ): Promise<{ success: boolean; message: string }> {
    this.logger.log(`Received webhook from ${provider}`);

    const providerMap: Record<string, string> = {
      'hyperpay': 'HYPERPAY',
      'stripe': 'STRIPE',
      'tabby': 'TABBY',
      'tamara': 'TAMARA',
      'paypal': 'PAYPAL',
      'moyasar': 'MOYASAR',
    };

    const normalizedProvider = providerMap[provider.toLowerCase()];

    if (!normalizedProvider) {
      return { success: false, message: `Unknown provider: ${provider}` };
    }

    // Get signature from common header names
    const signature =
      headers['x-signature'] ||
      headers['stripe-signature'] ||
      headers['x-tabby-signature'] ||
      headers['x-tamara-signature'] ||
      headers['x-paypal-signature'] ||
      '';

    switch (normalizedProvider) {
      case 'HYPERPAY':
        return this.webhookService.processHyperPay(payload, signature);
      case 'STRIPE':
        return this.webhookService.processStripe(payload, signature);
      case 'TABBY':
        return this.webhookService.processTabby(payload, signature);
      case 'TAMARA':
        return this.webhookService.processTamara(payload, signature);
      default:
        return { success: true, message: 'Webhook received but not processed' };
    }
  }
}
