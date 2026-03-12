import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  IsBoolean,
  IsInt,
  Min,
  Max,
  MaxLength,
  IsNotEmpty,
  ValidateNested,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { RideCategory, VehicleType, PaymentMethod } from '../enums/ride.enums';

export class CreateRideDto {
  @ApiProperty({ description: 'User ID of the rider', example: 'user_123' })
  @IsString()
  @IsNotEmpty()
  riderId: string;

  @ApiProperty({ description: 'Pickup address', example: 'King Fahd Road, Riyadh' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  pickupAddress: string;

  @ApiPropertyOptional({ description: 'Pickup address in Arabic' })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  pickupAddressAr?: string;

  @ApiProperty({ description: 'Pickup latitude', example: 24.7136 })
  @IsNumber()
  @IsNotEmpty()
  pickupLatitude: number;

  @ApiProperty({ description: 'Pickup longitude', example: 46.6753 })
  @IsNumber()
  @IsNotEmpty()
  pickupLongitude: number;

  @ApiPropertyOptional({ description: 'Pickup location name' })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  pickupName?: string;

  @ApiPropertyOptional({ description: 'Pickup location name in Arabic' })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  pickupNameAr?: string;

  @ApiPropertyOptional({ description: 'Pickup contact phone' })
  @IsString()
  @IsOptional()
  @MaxLength(20)
  pickupPhone?: string;

  @ApiPropertyOptional({ description: 'Pickup notes for driver' })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  pickupNotes?: string;

  @ApiPropertyOptional({ description: 'Pickup notes in Arabic' })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  pickupNotesAr?: string;

  @ApiProperty({ description: 'Dropoff address', example: 'King Abdullah Financial District, Riyadh' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  dropoffAddress: string;

  @ApiPropertyOptional({ description: 'Dropoff address in Arabic' })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  dropoffAddressAr?: string;

  @ApiProperty({ description: 'Dropoff latitude', example: 24.7642 })
  @IsNumber()
  @IsNotEmpty()
  dropoffLatitude: number;

  @ApiProperty({ description: 'Dropoff longitude', example: 46.6386 })
  @IsNumber()
  @IsNotEmpty()
  dropoffLongitude: number;

  @ApiPropertyOptional({ description: 'Dropoff location name' })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  dropoffName?: string;

  @ApiPropertyOptional({ description: 'Dropoff location name in Arabic' })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  dropoffNameAr?: string;

  @ApiPropertyOptional({ description: 'Dropoff contact phone' })
  @IsString()
  @IsOptional()
  @MaxLength(20)
  dropoffPhone?: string;

  @ApiPropertyOptional({ description: 'Dropoff notes for driver' })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  dropoffNotes?: string;

  @ApiPropertyOptional({ description: 'Dropoff notes in Arabic' })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  dropoffNotesAr?: string;

  @ApiPropertyOptional({
    description: 'Vehicle type preference',
    enum: VehicleType,
    default: VehicleType.ECONOMY,
  })
  @IsEnum(VehicleType)
  @IsOptional()
  vehicleType?: VehicleType;

  @ApiPropertyOptional({
    description: 'Ride category',
    enum: RideCategory,
    default: RideCategory.REGULAR,
  })
  @IsEnum(RideCategory)
  @IsOptional()
  category?: RideCategory;

  @ApiPropertyOptional({ description: 'Number of passengers', example: 1, minimum: 1, maximum: 8 })
  @IsInt()
  @Min(1)
  @Max(8)
  @IsOptional()
  passengerCount?: number;

  @ApiPropertyOptional({ description: 'Number of luggage pieces', example: 0, minimum: 0 })
  @IsInt()
  @Min(0)
  @IsOptional()
  luggageCount?: number;

  @ApiPropertyOptional({ description: 'General notes for the ride' })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  notes?: string;

  @ApiPropertyOptional({ description: 'General notes in Arabic' })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  notesAr?: string;

  @ApiPropertyOptional({ description: 'Is this ride for someone else?', default: false })
  @IsBoolean()
  @IsOptional()
  isForSomeoneElse?: boolean;

  @ApiPropertyOptional({ description: 'Recipient name (if ride is for someone else)' })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  recipientName?: string;

  @ApiPropertyOptional({ description: 'Recipient phone (if ride is for someone else)' })
  @IsString()
  @IsOptional()
  @MaxLength(20)
  recipientPhone?: string;

  @ApiPropertyOptional({
    description: 'Payment method',
    enum: PaymentMethod,
  })
  @IsEnum(PaymentMethod)
  @IsOptional()
  paymentMethod?: PaymentMethod;

  @ApiPropertyOptional({ description: 'Scheduled pickup time (for scheduled rides)' })
  @IsDateString()
  @IsOptional()
  scheduledAt?: string;

  @ApiPropertyOptional({ description: 'Promo code to apply' })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  promoCode?: string;

  @ApiPropertyOptional({ description: 'Estimated distance in km (from route calculation)' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  estimatedDistance?: number;

  @ApiPropertyOptional({ description: 'Estimated duration in minutes (from route calculation)' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  estimatedDuration?: number;
}

export class UpdateRideDto {
  @ApiPropertyOptional({ description: 'Pickup address' })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  pickupAddress?: string;

  @ApiPropertyOptional({ description: 'Dropoff address' })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  dropoffAddress?: string;

  @ApiPropertyOptional({ description: 'Pickup latitude' })
  @IsNumber()
  @IsOptional()
  pickupLatitude?: number;

  @ApiPropertyOptional({ description: 'Pickup longitude' })
  @IsNumber()
  @IsOptional()
  pickupLongitude?: number;

  @ApiPropertyOptional({ description: 'Dropoff latitude' })
  @IsNumber()
  @IsOptional()
  dropoffLatitude?: number;

  @ApiPropertyOptional({ description: 'Dropoff longitude' })
  @IsNumber()
  @IsOptional()
  dropoffLongitude?: number;

  @ApiPropertyOptional({ description: 'Notes for the ride' })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  notes?: string;

  @ApiPropertyOptional({ description: 'Passenger count' })
  @IsInt()
  @Min(1)
  @Max(8)
  @IsOptional()
  passengerCount?: number;
}
