import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsEnum,
  IsObject,
  IsBoolean,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum GatewayProvider {
  HYPERPAY = 'HYPERPAY',
  STRIPE = 'STRIPE',
  TABBY = 'TABBY',
  TAMARA = 'TAMARA',
  APPLE_PAY = 'APPLE_PAY',
  GOOGLE_PAY = 'GOOGLE_PAY',
  MOYASAR = 'MOYASAR',
  PAYPAL = 'PAYPAL',
}

export enum GatewayTransactionType {
  CHARGE = 'CHARGE',
  REFUND = 'REFUND',
  AUTHORIZE = 'AUTHORIZE',
  CAPTURE = 'CAPTURE',
  VOID = 'VOID',
}

export class GatewayConfigDto {
  @ApiProperty({ description: 'Gateway provider' })
  @IsEnum(GatewayProvider)
  @IsNotEmpty()
  provider: GatewayProvider;

  @ApiProperty({ description: 'Configuration key' })
  @IsString()
  @IsNotEmpty()
  key: string;

  @ApiProperty({ description: 'Configuration value' })
  @IsString()
  @IsNotEmpty()
  value: string;
}

export class HyperPayWebhookDto {
  @ApiProperty({ description: 'Payment ID' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: 'Resource ID' })
  @IsString()
  @IsNotEmpty()
  resourceId: string;

  @ApiProperty({ description: 'Transaction type' })
  @IsString()
  @IsNotEmpty()
  transactionType: string;

  @ApiProperty({ description: 'Entity' })
  @IsObject()
  @IsNotEmpty()
  entity: {
    code: string;
    description: string;
    status: string;
  };

  @ApiProperty({ description: 'Amount' })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ description: 'Currency' })
  @IsString()
  @IsNotEmpty()
  currency: string;

  @ApiPropertyOptional({ description: 'Custom parameters' })
  @IsObject()
  @IsOptional()
  customParameters?: Record<string, string>;
}

export class StripeWebhookDto {
  @ApiProperty({ description: 'Event ID' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: 'Event type' })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({ description: 'API version' })
  @IsString()
  @IsNotEmpty()
  apiVersion: string;

  @ApiProperty({ description: 'Data object' })
  @IsObject()
  @IsNotEmpty()
  data: {
    object: Record<string, unknown>;
  };
}

export class TabbyWebhookDto {
  @ApiProperty({ description: 'Event type' })
  @IsString()
  @IsNotEmpty()
  event: string;

  @ApiProperty({ description: 'Payment ID' })
  @IsString()
  @IsNotEmpty()
  payment_id: string;

  @ApiProperty({ description: 'Order ID' })
  @IsString()
  @IsNotEmpty()
  order_id: string;

  @ApiProperty({ description: 'Status' })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiPropertyOptional({ description: 'Data' })
  @IsObject()
  @IsOptional()
  data?: Record<string, unknown>;
}

export class TamaraWebhookDto {
  @ApiProperty({ description: 'Event type' })
  @IsString()
  @IsNotEmpty()
  event_type: string;

  @ApiProperty({ description: 'Order ID' })
  @IsString()
  @IsNotEmpty()
  order_id: string;

  @ApiProperty({ description: 'Payment ID' })
  @IsString()
  @IsNotEmpty()
  payment_id: string;

  @ApiProperty({ description: 'Status' })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiPropertyOptional({ description: 'Data' })
  @IsObject()
  @IsOptional()
  data?: Record<string, unknown>;
}

export class GatewayPaymentRequest {
  @ApiProperty({ description: 'Amount' })
  amount: number;

  @ApiProperty({ description: 'Currency' })
  currency: string;

  @ApiProperty({ description: 'Transaction type' })
  transactionType: GatewayTransactionType;

  @ApiProperty({ description: 'Payment method' })
  paymentMethod: string;

  @ApiPropertyOptional({ description: 'Card token' })
  cardToken?: string;

  @ApiPropertyOptional({ description: 'Card details' })
  cardDetails?: {
    number: string;
    expiryMonth: string;
    expiryYear: string;
    cvv: string;
    cardholderName: string;
  };

  @ApiPropertyOptional({ description: 'Customer ID' })
  customerId?: string;

  @ApiPropertyOptional({ description: 'Customer email' })
  customerEmail?: string;

  @ApiPropertyOptional({ description: 'Customer phone' })
  customerPhone?: string;

  @ApiPropertyOptional({ description: 'Order ID' })
  orderId?: string;

  @ApiPropertyOptional({ description: 'Description' })
  description?: string;

  @ApiPropertyOptional({ description: 'Metadata' })
  metadata?: Record<string, unknown>;

  @ApiPropertyOptional({ description: 'IP address' })
  ipAddress?: string;

  @ApiPropertyOptional({ description: 'User agent' })
  userAgent?: string;

  @ApiPropertyOptional({ description: 'Save card token' })
  saveCard?: boolean;

  @ApiPropertyOptional({ description: 'Installment plan' })
  installmentPlan?: {
    planId: string;
    installments: number;
  };
}

export class GatewayPaymentResponse {
  @ApiProperty({ description: 'Success status' })
  success: boolean;

  @ApiPropertyOptional({ description: 'Transaction ID' })
  transactionId?: string;

  @ApiPropertyOptional({ description: 'Payment ID from provider' })
  providerPaymentId?: string;

  @ApiPropertyOptional({ description: 'Authorization code' })
  authorizationCode?: string;

  @ApiPropertyOptional({ description: 'Card token for future use' })
  cardToken?: string;

  @ApiPropertyOptional({ description: 'Redirect URL for 3DS' })
  redirectUrl?: string;

  @ApiPropertyOptional({ description: 'Payment status' })
  status?: string;

  @ApiPropertyOptional({ description: 'Error code' })
  errorCode?: string;

  @ApiPropertyOptional({ description: 'Error message' })
  errorMessage?: string;

  @ApiPropertyOptional({ description: 'Raw response from gateway' })
  rawResponse?: Record<string, unknown>;

  @ApiPropertyOptional({ description: 'Installment details' })
  installments?: {
    planId: string;
    installments: number;
    installmentAmount: number;
    frequency: string;
    firstPaymentDate: Date;
  };
}

export class GatewayRefundRequest {
  @ApiProperty({ description: 'Original payment ID' })
  paymentId: string;

  @ApiProperty({ description: 'Refund amount' })
  amount: number;

  @ApiProperty({ description: 'Refund reason' })
  reason: string;

  @ApiPropertyOptional({ description: 'Provider payment ID' })
  providerPaymentId?: string;
}

export class GatewayRefundResponse {
  @ApiProperty({ description: 'Success status' })
  success: boolean;

  @ApiPropertyOptional({ description: 'Refund ID' })
  refundId?: string;

  @ApiPropertyOptional({ description: 'Provider refund ID' })
  providerRefundId?: string;

  @ApiPropertyOptional({ description: 'Refund status' })
  status?: string;

  @ApiPropertyOptional({ description: 'Error code' })
  errorCode?: string;

  @ApiPropertyOptional({ description: 'Error message' })
  errorMessage?: string;
}

export class GatewayStatusResponse {
  @ApiProperty({ description: 'Gateway name' })
  name: GatewayProvider;

  @ApiProperty({ description: 'Is enabled' })
  enabled: boolean;

  @ApiProperty({ description: 'Is healthy' })
  healthy: boolean;

  @ApiPropertyOptional({ description: 'Last check time' })
  lastCheck?: Date;

  @ApiPropertyOptional({ description: 'Error message' })
  error?: string;
}
