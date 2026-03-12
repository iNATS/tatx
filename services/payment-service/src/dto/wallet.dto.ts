import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsEnum,
  IsBoolean,
  IsObject,
  Min,
  Matches,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum WalletTransactionType {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
}

export enum WalletTransactionCategory {
  RIDE = 'RIDE',
  ORDER = 'ORDER',
  TOPUP = 'TOPUP',
  REFUND = 'REFUND',
  PROMO = 'PROMO',
  CASHBACK = 'CASHBACK',
  TRANSFER_IN = 'TRANSFER_IN',
  TRANSFER_OUT = 'TRANSFER_OUT',
  FEE = 'FEE',
}

export class TopupWalletDto {
  @ApiProperty({ description: 'Amount to top-up' })
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  amount: number;

  @ApiPropertyOptional({ description: 'Currency code (default: SAR)' })
  @IsString()
  @IsOptional()
  currency?: string;

  @ApiProperty({ description: 'Payment method for top-up' })
  @IsString()
  @IsNotEmpty()
  paymentMethod: string;

  @ApiPropertyOptional({ description: 'Saved card ID' })
  @IsString()
  @IsOptional()
  savedCardId?: string;

  @ApiPropertyOptional({ description: 'Card token from gateway' })
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

  @ApiPropertyOptional({ description: 'Save card for future use' })
  @IsBoolean()
  @IsOptional()
  saveCard?: boolean;

  @ApiPropertyOptional({ description: 'Card nickname for saved card' })
  @IsString()
  @IsOptional()
  cardNickname?: string;

  @ApiPropertyOptional({ description: 'Additional notes' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'IP address' })
  @IsString()
  @IsOptional()
  ipAddress?: string;
}

export class AutoTopupConfigDto {
  @ApiProperty({ description: 'Enable or disable auto top-up' })
  @IsBoolean()
  @IsNotEmpty()
  enabled: boolean;

  @ApiPropertyOptional({ description: 'Threshold balance to trigger auto top-up' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  threshold?: number;

  @ApiPropertyOptional({ description: 'Amount to top-up when threshold is reached' })
  @IsNumber()
  @Min(1)
  @IsOptional()
  amount?: number;

  @ApiPropertyOptional({ description: 'Payment method for auto top-up' })
  @IsString()
  @IsOptional()
  paymentMethod?: string;

  @ApiPropertyOptional({ description: 'Saved card ID for auto top-up' })
  @IsString()
  @IsOptional()
  savedCardId?: string;
}

export class TransferFundsDto {
  @ApiProperty({ description: 'Recipient user ID or phone number' })
  @IsString()
  @IsNotEmpty()
  recipientId: string;

  @ApiProperty({ description: 'Recipient identifier type (USER_ID or PHONE)' })
  @IsString()
  @IsNotEmpty()
  recipientType: 'USER_ID' | 'PHONE';

  @ApiProperty({ description: 'Amount to transfer' })
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  amount: number;

  @ApiPropertyOptional({ description: 'Transfer description' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'Transfer description in Arabic' })
  @IsString()
  @IsOptional()
  descriptionAr?: string;
}

export class WalletTransactionFilterDto {
  @ApiPropertyOptional({ description: 'Transaction type filter' })
  @IsEnum(WalletTransactionType)
  @IsOptional()
  type?: WalletTransactionType;

  @ApiPropertyOptional({ description: 'Transaction category filter' })
  @IsEnum(WalletTransactionCategory)
  @IsOptional()
  category?: WalletTransactionCategory;

  @ApiPropertyOptional({ description: 'Start date filter' })
  @IsString()
  @IsOptional()
  startDate?: string;

  @ApiPropertyOptional({ description: 'End date filter' })
  @IsString()
  @IsOptional()
  endDate?: string;

  @ApiPropertyOptional({ description: 'Page number (default: 1)' })
  @IsNumber()
  @Min(1)
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({ description: 'Page size (default: 20)' })
  @IsNumber()
  @Min(1)
  @Max(100)
  @IsOptional()
  limit?: number;
}

// Add missing Max decorator import
import { Max } from 'class-validator';

export class WalletBalanceResponse {
  @ApiProperty({ description: 'Wallet ID' })
  id: string;

  @ApiProperty({ description: 'Customer ID' })
  customerId: string;

  @ApiProperty({ description: 'Current balance' })
  balance: number;

  @ApiProperty({ description: 'Pending balance' })
  pendingBalance: number;

  @ApiProperty({ description: 'Available balance' })
  availableBalance: number;

  @ApiProperty({ description: 'Currency' })
  currency: string;

  @ApiProperty({ description: 'Auto top-up enabled' })
  autoTopupEnabled: boolean;

  @ApiPropertyOptional({ description: 'Auto top-up threshold' })
  autoTopupThreshold?: number;

  @ApiPropertyOptional({ description: 'Auto top-up amount' })
  autoTopupAmount?: number;

  @ApiProperty({ description: 'Last updated' })
  updatedAt: Date;
}

export class WalletTransactionResponse {
  @ApiProperty({ description: 'Transaction ID' })
  id: string;

  @ApiProperty({ description: 'Transaction type' })
  type: WalletTransactionType;

  @ApiProperty({ description: 'Transaction category' })
  category: WalletTransactionCategory;

  @ApiProperty({ description: 'Transaction amount' })
  amount: number;

  @ApiProperty({ description: 'Balance after transaction' })
  balance: number;

  @ApiProperty({ description: 'Transaction description' })
  description: string;

  @ApiPropertyOptional({ description: 'Description in Arabic' })
  descriptionAr?: string;

  @ApiPropertyOptional({ description: 'Reference ID (order, ride, etc.)' })
  referenceId?: string;

  @ApiPropertyOptional({ description: 'Reference type' })
  referenceType?: string;

  @ApiPropertyOptional({ description: 'Additional metadata' })
  metadata?: Record<string, unknown>;

  @ApiProperty({ description: 'Transaction date' })
  createdAt: Date;
}

export class WalletTransferResponse {
  @ApiProperty({ description: 'Transfer ID' })
  id: string;

  @ApiProperty({ description: 'Sender wallet ID' })
  senderWalletId: string;

  @ApiProperty({ description: 'Recipient wallet ID' })
  recipientWalletId: string;

  @ApiProperty({ description: 'Transfer amount' })
  amount: number;

  @ApiProperty({ description: 'Transfer description' })
  description: string;

  @ApiProperty({ description: 'Transfer status' })
  status: string;

  @ApiProperty({ description: 'Created at' })
  createdAt: Date;
}
