import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  IsInt,
  Min,
  Max,
  MaxLength,
  IsNotEmpty,
  IsBoolean,
} from 'class-validator';
import { CancellationReason } from '../enums/ride.enums';

export class AcceptRideDto {
  @ApiProperty({ description: 'Driver ID accepting the ride' })
  @IsString()
  @IsNotEmpty()
  driverId: string;

  @ApiPropertyOptional({ description: 'Estimated time to pickup in minutes' })
  @IsInt()
  @Min(1)
  @Max(120)
  @IsOptional()
  estimatedPickupTime?: number;

  @ApiPropertyOptional({ description: 'Driver note to rider' })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  driverNote?: string;
}

export class StartRideDto {
  @ApiProperty({ description: 'Driver ID starting the ride' })
  @IsString()
  @IsNotEmpty()
  driverId: string;

  @ApiPropertyOptional({ description: 'Actual pickup latitude' })
  @IsNumber()
  @IsOptional()
  actualPickupLatitude?: number;

  @ApiPropertyOptional({ description: 'Actual pickup longitude' })
  @IsNumber()
  @IsOptional()
  actualPickupLongitude?: number;

  @ApiPropertyOptional({ description: 'Number of passengers picked up' })
  @IsInt()
  @Min(1)
  @Max(8)
  @IsOptional()
  actualPassengerCount?: number;
}

export class CompleteRideDto {
  @ApiProperty({ description: 'Driver ID completing the ride' })
  @IsString()
  @IsNotEmpty()
  driverId: string;

  @ApiPropertyOptional({ description: 'Actual dropoff latitude' })
  @IsNumber()
  @IsOptional()
  actualDropoffLatitude?: number;

  @ApiPropertyOptional({ description: 'Actual dropoff longitude' })
  @IsNumber()
  @IsOptional()
  actualDropoffLongitude?: number;

  @ApiPropertyOptional({ description: 'Final distance in km (if different from estimate)' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  finalDistance?: number;

  @ApiPropertyOptional({ description: 'Final duration in minutes (if different from estimate)' })
  @IsInt()
  @Min(1)
  @IsOptional()
  finalDuration?: number;

  @ApiPropertyOptional({ description: 'Additional charges (e.g., tolls, waiting time)' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  additionalCharges?: number;

  @ApiPropertyOptional({ description: 'Reason for additional charges' })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  additionalChargesReason?: string;

  @ApiPropertyOptional({ description: 'Driver notes about the ride' })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  driverNotes?: string;
}

export class CancelRideDto {
  @ApiProperty({
    description: 'Cancellation reason',
    enum: CancellationReason,
  })
  @IsEnum(CancellationReason)
  @IsNotEmpty()
  reason: CancellationReason;

  @ApiPropertyOptional({ description: 'Additional cancellation details' })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  details?: string;

  @ApiProperty({ description: 'User ID cancelling the ride' })
  @IsString()
  @IsNotEmpty()
  cancelledBy: string;

  @ApiPropertyOptional({ description: 'Whether to charge cancellation fee', default: false })
  @IsBoolean()
  @IsOptional()
  waiveFee?: boolean;
}

export class RateRideDto {
  @ApiProperty({ description: 'Rating for the driver (1-5 stars)', minimum: 1, maximum: 5 })
  @IsInt()
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  rating: number;

  @ApiPropertyOptional({ description: 'Rating for the rider (1-5 stars, optional for driver rating)' })
  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  riderRating?: number;

  @ApiPropertyOptional({ description: 'Comment about the ride experience' })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  comment?: string;

  @ApiPropertyOptional({ description: 'Comment in Arabic' })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  commentAr?: string;

  @ApiPropertyOptional({ description: 'Tip amount for driver' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  tipAmount?: number;

  @ApiPropertyOptional({ description: 'Cleanliness rating (1-5)' })
  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  cleanlinessRating?: number;

  @ApiPropertyOptional({ description: 'Communication rating (1-5)' })
  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  communicationRating?: number;

  @ApiPropertyOptional({ description: 'Safety rating (1-5)' })
  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  safetyRating?: number;

  @ApiPropertyOptional({ description: 'Would ride with this driver again' })
  @IsBoolean()
  @IsOptional()
  wouldRideAgain?: boolean;

  @ApiPropertyOptional({ description: 'User ID submitting the rating' })
  @IsString()
  @IsNotEmpty()
  ratedBy: string;
}

export class UpdateRideStatusDto {
  @ApiProperty({ description: 'New ride status' })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiPropertyOptional({ description: 'Driver ID (if status change is by driver)' })
  @IsString()
  @IsOptional()
  driverId?: string;

  @ApiPropertyOptional({ description: 'Additional notes for status change' })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  notes?: string;
}

export class AssignDriverDto {
  @ApiProperty({ description: 'Driver ID to assign' })
  @IsString()
  @IsNotEmpty()
  driverId: string;

  @ApiPropertyOptional({ description: 'Whether this is a manual assignment by admin' })
  @IsBoolean()
  @IsOptional()
  isManualAssignment?: boolean;

  @ApiPropertyOptional({ description: 'Admin/user ID making the assignment' })
  @IsString()
  @IsOptional()
  assignedBy?: string;
}
