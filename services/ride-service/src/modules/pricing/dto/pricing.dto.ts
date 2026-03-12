import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  IsNotEmpty,
  Min,
  Max,
  MaxLength,
  IsBoolean,
} from 'class-validator';
import { VehicleType } from '../../ride/enums/ride.enums';

export class PricingConfigDto {
  @ApiProperty({ description: 'Vehicle type this config applies to', enum: VehicleType })
  @IsEnum(VehicleType)
  @IsNotEmpty()
  vehicleType: VehicleType;

  @ApiProperty({ description: 'Base fare amount' })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  baseFare: number;

  @ApiProperty({ description: 'Rate per kilometer' })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  perKmRate: number;

  @ApiProperty({ description: 'Rate per minute' })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  perMinuteRate: number;

  @ApiProperty({ description: 'Minimum fare amount' })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  minimumFare: number;

  @ApiPropertyOptional({ description: 'Booking fee' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  bookingFee?: number;

  @ApiPropertyOptional({ description: 'Service fee percentage' })
  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  serviceFeePercent?: number;

  @ApiPropertyOptional({ description: 'Tax/VAT percentage' })
  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  taxPercent?: number;

  @ApiPropertyOptional({ description: 'Cancellation fee' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  cancellationFee?: number;

  @ApiPropertyOptional({ description: 'Waiting time rate per minute (after free waiting time)' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  waitingTimeRate?: number;

  @ApiPropertyOptional({ description: 'Free waiting time in minutes' })
  @IsInt()
  @Min(0)
  @IsOptional()
  freeWaitingTime?: number;

  @ApiPropertyOptional({ description: 'Night surcharge percentage (e.g., 0.1 for 10%)' })
  @IsNumber()
  @Min(0)
  @Max(1)
  @IsOptional()
  nightSurcharge?: number;

  @ApiPropertyOptional({ description: 'Night surcharge start hour (24h format)' })
  @IsInt()
  @Min(0)
  @Max(23)
  @IsOptional()
  nightSurchargeStartHour?: number;

  @ApiPropertyOptional({ description: 'Night surcharge end hour (24h format)' })
  @IsInt()
  @Min(0)
  @Max(23)
  @IsOptional()
  nightSurchargeEndHour?: number;
}

export class UpdatePricingConfigDto {
  @ApiPropertyOptional({ description: 'Base fare amount' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  baseFare?: number;

  @ApiPropertyOptional({ description: 'Rate per kilometer' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  perKmRate?: number;

  @ApiPropertyOptional({ description: 'Rate per minute' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  perMinuteRate?: number;

  @ApiPropertyOptional({ description: 'Minimum fare amount' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  minimumFare?: number;

  @ApiPropertyOptional({ description: 'Booking fee' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  bookingFee?: number;

  @ApiPropertyOptional({ description: 'Service fee percentage' })
  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  serviceFeePercent?: number;

  @ApiPropertyOptional({ description: 'Tax/VAT percentage' })
  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  taxPercent?: number;

  @ApiPropertyOptional({ description: 'Cancellation fee' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  cancellationFee?: number;
}

export class PromoCodeDto {
  @ApiProperty({ description: 'Promo code' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  code: string;

  @ApiProperty({ description: 'Discount type', enum: ['PERCENTAGE', 'FIXED'] })
  @IsString()
  @IsNotEmpty()
  discountType: 'PERCENTAGE' | 'FIXED';

  @ApiProperty({ description: 'Discount value (percentage or fixed amount)' })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  discountValue: number;

  @ApiPropertyOptional({ description: 'Maximum discount amount (for percentage discounts)' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  maxDiscount?: number;

  @ApiPropertyOptional({ description: 'Minimum ride fare required' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  minRideFare?: number;

  @ApiPropertyOptional({ description: 'Valid from date' })
  @IsString()
  @IsOptional()
  validFrom?: string;

  @ApiPropertyOptional({ description: 'Valid until date' })
  @IsString()
  @IsOptional()
  validUntil?: string;

  @ApiPropertyOptional({ description: 'Maximum usage count' })
  @IsInt()
  @Min(1)
  @IsOptional()
  maxUsage?: number;

  @ApiPropertyOptional({ description: 'Usage count per user' })
  @IsInt()
  @Min(1)
  @IsOptional()
  maxUsagePerUser?: number;

  @ApiPropertyOptional({ description: 'Applicable vehicle types' })
  @IsString({ each: true })
  @IsOptional()
  applicableVehicleTypes?: VehicleType[];

  @ApiPropertyOptional({ description: 'New users only' })
  @IsBoolean()
  @IsOptional()
  newUsersOnly?: boolean;

  @ApiPropertyOptional({ description: 'Is active' })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class ApplyPromoCodeDto {
  @ApiProperty({ description: 'Promo code to apply' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  code: string;

  @ApiProperty({ description: 'User ID applying the code' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'Ride fare before discount' })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  rideFare: number;

  @ApiPropertyOptional({ description: 'Vehicle type' })
  @IsEnum(VehicleType)
  @IsOptional()
  vehicleType?: VehicleType;
}

export class PromoCodeResponseDto {
  @ApiProperty({ description: 'Whether the promo code is valid' })
  valid: boolean;

  @ApiPropertyOptional({ description: 'Error message if invalid' })
  error?: string;

  @ApiPropertyOptional({ description: 'Discount amount' })
  discountAmount?: number;

  @ApiPropertyOptional({ description: 'Final fare after discount' })
  finalFare?: number;

  @ApiPropertyOptional({ description: 'Promo code details' })
  promoCode?: {
    code: string;
    discountType: string;
    discountValue: number;
    description: string;
  };
}
