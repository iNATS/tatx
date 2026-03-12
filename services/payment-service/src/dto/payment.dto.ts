import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsEnum,
  IsBoolean,
  IsObject,
  ValidateNested,
  IsArray,
  Min,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum PaymentMethod {
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  MADA = 'MADA',
  STC_PAY = 'STC_PAY',
  APPLE_PAY = 'APPLE_PAY',
  GOOGLE_PAY = 'GOOGLE_PAY',
  TABBY = 'TABBY',
  TAMARA = 'TAMARA',
  WALLET = 'WALLET',
  CASH_ON_DELIVERY = 'CASH_ON_DELIVERY',
}

export enum PaymentType {
  RIDE = 'RIDE',
  ORDER = 'ORDER',
  WALLET_TOPUP = 'WALLET_TOPUP',
  TRANSFER = 'TRANSFER',
}

export enum InstallmentPlan {
  PAY_IN_4 = 'PAY_IN_4',
  PAY_IN_3 = 'PAY_IN_3',
  PAY_IN_6 = 'PAY_IN_6',
  PAY_IN_12 = 'PAY_IN_12',
}

export class SplitPaymentDto {
  @ApiProperty({ description: 'Payment method for split payment' })
  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  method: PaymentMethod;

  @ApiProperty({ description: 'Amount to pay with this method' })
  @IsNumber()
  @Min(0.01)
  @IsNotEmpty()
  amount: number;

  @ApiPropertyOptional({ description: 'Saved card ID if using saved card' })
  @IsString()
  @IsOptional()
  savedCardId?: string;
}

export class ProcessPaymentDto {
  @ApiProperty({ description: 'Payment type (RIDE, ORDER, WALLET_TOPUP)' })
  @IsEnum(PaymentType)
  @IsNotEmpty()
  type: PaymentType;

  @ApiProperty({ description: 'Total amount to pay' })
  @IsNumber()
  @Min(0.01)
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ description: 'Currency code (SAR, USD, etc.)' })
  @IsString()
  @IsOptional()
  currency?: string;

  @ApiProperty({ description: 'Primary payment method' })
  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  method: PaymentMethod;

  @ApiPropertyOptional({ description: 'Reference ID (ride ID or order ID)' })
  @IsString()
  @IsOptional()
  referenceId?: string;

  @ApiPropertyOptional({ description: 'Use split payment' })
  @IsBoolean()
  @IsOptional()
  useSplitPayment?: boolean;

  @ApiPropertyOptional({ description: 'Split payment details', type: [SplitPaymentDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SplitPaymentDto)
  @IsOptional()
  splitPayments?: SplitPaymentDto[];

  @ApiPropertyOptional({ description: 'Wallet amount to use in split payment' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  walletAmount?: number;

  @ApiPropertyOptional({ description: 'Saved card ID' })
  @IsString()
  @IsOptional()
  savedCardId?: string;

  @ApiPropertyOptional({ description: 'Card token (from gateway)' })
  @IsString()
  @IsOptional()
  cardToken?: string;

  @ApiPropertyOptional({ description: 'Card details for new card' })
  @IsObject()
  @IsOptional()
  cardDetails?: {
    number: string;
    expiryMonth: string;
    expiryYear: string;
    cvv: string;
    cardholderName: string;
  };

  @ApiPropertyOptional({ description: 'Installment plan for BNPL' })
  @IsEnum(InstallmentPlan)
  @IsOptional()
  installmentPlan?: InstallmentPlan;

  @ApiPropertyOptional({ description: 'Save card for future use' })
  @IsBoolean()
  @IsOptional()
  saveCard?: boolean;

  @ApiPropertyOptional({ description: 'Card nickname for saved card' })
  @IsString()
  @IsOptional()
  cardNickname?: string;

  @ApiPropertyOptional({ description: 'IP address of the client' })
  @IsString()
  @IsOptional()
  ipAddress?: string;

  @ApiPropertyOptional({ description: 'User agent string' })
  @IsString()
  @IsOptional()
  userAgent?: string;

  @ApiPropertyOptional({ description: 'Additional metadata' })
  @IsObject()
  @IsOptional()
  metadata?: Record<string, unknown>;
}

export class RefundPaymentDto {
  @ApiProperty({ description: 'Payment ID to refund' })
  @IsString()
  @IsNotEmpty()
  paymentId: string;

  @ApiPropertyOptional({ description: 'Refund amount (for partial refunds)' })
  @IsNumber()
  @Min(0.01)
  @IsOptional()
  amount?: number;

  @ApiProperty({ description: 'Reason for refund' })
  @IsString()
  @IsNotEmpty()
  reason: string;

  @ApiPropertyOptional({ description: 'Reason code' })
  @IsString()
  @IsOptional()
  reasonCode?: string;
}

export class SaveCardDto {
  @ApiProperty({ description: 'Card token from gateway' })
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty({ description: 'Card nickname' })
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @ApiPropertyOptional({ description: 'Card brand (VISA, MASTERCARD, etc.)' })
  @IsString()
  @IsOptional()
  brand?: string;

  @ApiPropertyOptional({ description: 'Last 4 digits of card' })
  @IsString()
  @IsOptional()
  last4?: string;

  @ApiPropertyOptional({ description: 'Expiry month' })
  @IsString()
  @IsOptional()
  expiryMonth?: string;

  @ApiPropertyOptional({ description: 'Expiry year' })
  @IsString()
  @IsOptional()
  expiryYear?: string;

  @ApiPropertyOptional({ description: 'Is this the default card' })
  @IsBoolean()
  @IsOptional()
  isDefault?: boolean;
}

export class DeleteCardDto {
  @ApiProperty({ description: 'Saved card ID to delete' })
  @IsString()
  @IsNotEmpty()
  cardId: string;
}

export class SetDefaultCardDto {
  @ApiProperty({ description: 'Saved card ID to set as default' })
  @IsString()
  @IsNotEmpty()
  cardId: string;
}

export class PaymentResponse {
  id: string;
  paymentNumber: string;
  amount: number;
  currency: string;
  status: string;
  method: PaymentMethod;
  provider: string;
  providerPaymentId: string;
  referenceId: string;
  transactions: TransactionResponse[];
  installments?: InstallmentPlanResponse;
  metadata: Record<string, unknown>;
  createdAt: Date;
}

export class TransactionResponse {
  id: string;
  type: string;
  amount: number;
  status: string;
  provider: string;
  providerTransactionId: string;
  errorMessage?: string;
  createdAt: Date;
}

export class InstallmentPlanResponse {
  provider: string;
  planId: string;
  installments: number;
  installmentAmount: number;
  frequency: string;
  firstPaymentDate: Date;
  lastPaymentDate: Date;
  status: string;
}

export class SavedCardResponse {
  id: string;
  nickname: string;
  brand: string;
  last4: string;
  expiryMonth: string;
  expiryYear: string;
  isDefault: boolean;
  createdAt: Date;
}

export class PaymentMethodsResponse {
  available: PaymentMethod[];
  recommended?: PaymentMethod;
  walletBalance?: number;
  savedCards?: SavedCardResponse[];
}
