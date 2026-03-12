import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  IsNotEmpty,
  IsInt,
  Min,
  Max,
  IsBoolean,
} from 'class-validator';
import { VehicleType } from '../../ride/enums/ride.enums';

export class FindNearbyDriversDto {
  @ApiProperty({ description: 'Latitude for search', example: 24.7136 })
  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @ApiProperty({ description: 'Longitude for search', example: 46.6753 })
  @IsNumber()
  @IsNotEmpty()
  longitude: number;

  @ApiPropertyOptional({ description: 'Search radius in kilometers', example: 5 })
  @IsNumber()
  @Min(0.5)
  @Max(50)
  @IsOptional()
  radius?: number = 5;

  @ApiPropertyOptional({
    description: 'Filter by vehicle type',
    enum: VehicleType,
  })
  @IsEnum(VehicleType)
  @IsOptional()
  vehicleType?: VehicleType;

  @ApiPropertyOptional({ description: 'Maximum number of drivers to return', example: 10 })
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  limit?: number = 10;
}

export class DriverMatchDto {
  @ApiProperty({ description: 'Driver ID' })
  @IsString()
  @IsNotEmpty()
  driverId: string;

  @ApiProperty({ description: 'Ride ID' })
  @IsString()
  @IsNotEmpty()
  rideId: string;

  @ApiPropertyOptional({ description: 'Distance from pickup in km' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  distance?: number;

  @ApiPropertyOptional({ description: 'Estimated time to pickup in minutes' })
  @IsInt()
  @Min(0)
  @IsOptional()
  eta?: number;

  @ApiPropertyOptional({ description: 'Driver rating' })
  @IsNumber()
  @Min(0)
  @Max(5)
  @IsOptional()
  rating?: number;

  @ApiPropertyOptional({ description: 'Driver total rides completed' })
  @IsInt()
  @Min(0)
  @IsOptional()
  totalRides?: number;

  @ApiPropertyOptional({ description: 'Vehicle type', enum: VehicleType })
  @IsEnum(VehicleType)
  @IsOptional()
  vehicleType?: VehicleType;
}

export class MatchingResultDto {
  @ApiProperty({ description: 'Whether a match was found' })
  matched: boolean;

  @ApiPropertyOptional({ description: 'Matched driver details' })
  driver?: {
    id: string;
    name: string;
    rating: number;
    vehicleType: string;
    vehiclePlate: string;
    eta: number;
    distance: number;
  };

  @ApiPropertyOptional({ description: 'Alternative drivers considered' })
  alternatives?: Array<{
    id: string;
    name: string;
    rating: number;
    distance: number;
    eta: number;
  }>;

  @ApiPropertyOptional({ description: 'Reason if no match found' })
  reason?: string;

  @ApiProperty({ description: 'Number of drivers notified' })
  driversNotified: number;

  @ApiProperty({ description: 'Time taken to find match in seconds' })
  matchTime: number;
}

export class BroadcastRideRequestDto {
  @ApiProperty({ description: 'Ride ID' })
  @IsString()
  @IsNotEmpty()
  rideId: string;

  @ApiProperty({ description: 'Pickup latitude' })
  @IsNumber()
  @IsNotEmpty()
  pickupLatitude: number;

  @ApiProperty({ description: 'Pickup longitude' })
  @IsNumber()
  @IsNotEmpty()
  pickupLongitude: number;

  @ApiProperty({ description: 'Dropoff latitude' })
  @IsNumber()
  @IsNotEmpty()
  dropoffLatitude: number;

  @ApiProperty({ description: 'Dropoff longitude' })
  @IsNumber()
  @IsNotEmpty()
  dropoffLongitude: number;

  @ApiProperty({ description: 'Vehicle type required', enum: VehicleType })
  @IsEnum(VehicleType)
  @IsNotEmpty()
  vehicleType: VehicleType;

  @ApiProperty({ description: 'Estimated fare' })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  estimatedFare: number;

  @ApiPropertyOptional({ description: 'Maximum broadcast radius in km' })
  @IsNumber()
  @Min(1)
  @Max(20)
  @IsOptional()
  radius?: number = 5;

  @ApiPropertyOptional({ description: 'Maximum number of drivers to notify' })
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  maxDrivers?: number = 20;
}

export class DriverAvailabilityDto {
  @ApiProperty({ description: 'Driver ID' })
  @IsString()
  @IsNotEmpty()
  driverId: string;

  @ApiProperty({ description: 'Whether driver is available', default: true })
  @IsBoolean()
  @IsOptional()
  available?: boolean;

  @ApiPropertyOptional({ description: 'Current latitude' })
  @IsNumber()
  @IsOptional()
  latitude?: number;

  @ApiPropertyOptional({ description: 'Current longitude' })
  @IsNumber()
  @IsOptional()
  longitude?: number;

  @ApiPropertyOptional({ description: 'Can accept ride requests' })
  @IsBoolean()
  @IsOptional()
  canAcceptRides?: boolean;
}

export class AutoAssignConfigDto {
  @ApiPropertyOptional({ description: 'Enable auto-assign', default: true })
  @IsBoolean()
  @IsOptional()
  enabled?: boolean;

  @ApiPropertyOptional({ description: 'Maximum wait time before auto-assign in seconds', default: 30 })
  @IsInt()
  @Min(10)
  @Max(300)
  @IsOptional()
  maxWaitTime?: number;

  @ApiPropertyOptional({ description: 'Maximum distance for auto-assign in km', default: 10 })
  @IsNumber()
  @Min(1)
  @Max(50)
  @IsOptional()
  maxDistance?: number;

  @ApiPropertyOptional({ description: 'Minimum driver rating for auto-assign', default: 4.0 })
  @IsNumber()
  @Min(0)
  @Max(5)
  @IsOptional()
  minRating?: number;

  @ApiPropertyOptional({ description: 'Number of drivers to notify before auto-assign', default: 10 })
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  driversToNotify?: number;
}
