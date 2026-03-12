import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  IsNotEmpty,
  Min,
  MaxLength,
} from 'class-validator';
import { VehicleType } from '../enums/ride.enums';

export class FareEstimateDto {
  @ApiProperty({ description: 'Pickup latitude', example: 24.7136 })
  @IsNumber()
  @IsNotEmpty()
  pickupLatitude: number;

  @ApiProperty({ description: 'Pickup longitude', example: 46.6753 })
  @IsNumber()
  @IsNotEmpty()
  pickupLongitude: number;

  @ApiProperty({ description: 'Dropoff latitude', example: 24.7642 })
  @IsNumber()
  @IsNotEmpty()
  dropoffLatitude: number;

  @ApiProperty({ description: 'Dropoff longitude', example: 46.6386 })
  @IsNumber()
  @IsNotEmpty()
  dropoffLongitude: number;

  @ApiPropertyOptional({
    description: 'Vehicle type',
    enum: VehicleType,
    default: VehicleType.ECONOMY,
  })
  @IsEnum(VehicleType)
  @IsOptional()
  vehicleType?: VehicleType;

  @ApiPropertyOptional({ description: 'Promo code to apply' })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  promoCode?: string;
}

export class FareEstimateResponseDto {
  @ApiProperty({ description: 'Base fare amount' })
  baseFare: number;

  @ApiProperty({ description: 'Fare based on distance' })
  distanceFare: number;

  @ApiProperty({ description: 'Fare based on estimated time' })
  timeFare: number;

  @ApiProperty({ description: 'Surge multiplier applied' })
  surgeMultiplier: number;

  @ApiPropertyOptional({ description: 'Surge reason if applicable' })
  surgeReason?: string;

  @ApiProperty({ description: 'Subtotal before discounts and taxes' })
  subtotal: number;

  @ApiPropertyOptional({ description: 'Discount amount applied' })
  discount?: number;

  @ApiPropertyOptional({ description: 'Promo code applied' })
  promoCode?: string;

  @ApiProperty({ description: 'Tax amount (VAT)' })
  tax: number;

  @ApiProperty({ description: 'Service fee' })
  serviceFee: number;

  @ApiProperty({ description: 'Total fare amount' })
  total: number;

  @ApiProperty({ description: 'Estimated distance in km' })
  distance: number;

  @ApiProperty({ description: 'Estimated duration in minutes' })
  duration: number;

  @ApiProperty({ description: 'Currency code', example: 'SAR' })
  currency: string;

  @ApiProperty({ description: 'Vehicle type for this estimate', enum: VehicleType })
  vehicleType: VehicleType;

  @ApiProperty({ description: 'Fare breakdown by vehicle type' })
  vehicleOptions: VehicleFareOption[];

  @ApiProperty({ description: 'Estimate valid until timestamp' })
  validUntil: Date;
}

export class VehicleFareOption {
  @ApiProperty({ description: 'Vehicle type', enum: VehicleType })
  vehicleType: VehicleType;

  @ApiProperty({ description: 'Estimated fare for this vehicle type' })
  fare: number;

  @ApiProperty({ description: 'Estimated time for pickup in minutes' })
  pickupTime: number;
}

export class SurgePricingDto {
  @ApiProperty({ description: 'Latitude for surge check' })
  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @ApiProperty({ description: 'Longitude for surge check' })
  @IsNumber()
  @IsNotEmpty()
  longitude: number;
}

export class SurgePricingResponseDto {
  @ApiProperty({ description: 'Whether surge pricing is active' })
  active: boolean;

  @ApiProperty({ description: 'Surge multiplier (1.0 = no surge)' })
  multiplier: number;

  @ApiProperty({ description: 'Reason for surge pricing' })
  reason: string;

  @ApiProperty({ description: 'Demand level in area' })
  demandLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH';

  @ApiProperty({ description: 'Nearby available drivers count' })
  availableDrivers: number;

  @ApiProperty({ description: 'Pending ride requests in area' })
  pendingRequests: number;

  @ApiProperty({ description: 'Estimated surge end time' })
  estimatedEnd?: Date;
}
