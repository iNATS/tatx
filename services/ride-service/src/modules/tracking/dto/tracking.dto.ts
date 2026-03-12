import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsNotEmpty,
  IsInt,
  Min,
  Max,
  IsDateString,
} from 'class-validator';

export class UpdateDriverLocationDto {
  @ApiProperty({ description: 'Driver ID' })
  @IsString()
  @IsNotEmpty()
  driverId: string;

  @ApiProperty({ description: 'Ride ID being tracked' })
  @IsString()
  @IsNotEmpty()
  rideId: string;

  @ApiProperty({ description: 'Current latitude' })
  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @ApiProperty({ description: 'Current longitude' })
  @IsNumber()
  @IsNotEmpty()
  longitude: number;

  @ApiPropertyOptional({ description: 'Current speed in km/h' })
  @IsNumber()
  @Min(0)
  @Max(200)
  @IsOptional()
  speed?: number;

  @ApiPropertyOptional({ description: 'Heading/bearing in degrees (0-360)' })
  @IsNumber()
  @Min(0)
  @Max(360)
  @IsOptional()
  heading?: number;

  @ApiPropertyOptional({ description: 'Accuracy in meters' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  accuracy?: number;
}

export class RideLocationUpdateDto {
  @ApiProperty({ description: 'Ride ID' })
  @IsString()
  @IsNotEmpty()
  rideId: string;

  @ApiProperty({ description: 'Current latitude' })
  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @ApiProperty({ description: 'Current longitude' })
  @IsNumber()
  @IsNotEmpty()
  longitude: number;

  @ApiPropertyOptional({ description: 'Speed in km/h' })
  @IsNumber()
  @Min(0)
  @Max(200)
  @IsOptional()
  speed?: number;

  @ApiPropertyOptional({ description: 'Heading in degrees' })
  @IsNumber()
  @Min(0)
  @Max(360)
  @IsOptional()
  heading?: number;

  @ApiPropertyOptional({ description: 'Estimated time to arrival in minutes' })
  @IsInt()
  @Min(0)
  @IsOptional()
  eta?: number;

  @ApiPropertyOptional({ description: 'Distance to destination in km' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  distanceToDestination?: number;
}

export class TrackingSessionDto {
  @ApiProperty({ description: 'Ride ID' })
  @IsString()
  @IsNotEmpty()
  rideId: string;

  @ApiProperty({ description: 'User ID viewing the tracking' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiPropertyOptional({ description: 'Session duration in seconds' })
  @IsInt()
  @Min(0)
  @IsOptional()
  duration?: number;
}

export class DriverLocationResponseDto {
  @ApiProperty({ description: 'Driver ID' })
  driverId: string;

  @ApiProperty({ description: 'Current latitude' })
  latitude: number;

  @ApiProperty({ description: 'Current longitude' })
  longitude: number;

  @ApiPropertyOptional({ description: 'Last updated timestamp' })
  lastUpdated?: Date;

  @ApiPropertyOptional({ description: 'Speed in km/h' })
  speed?: number;

  @ApiPropertyOptional({ description: 'Heading in degrees' })
  heading?: number;

  @ApiPropertyOptional({ description: 'Distance from pickup in km' })
  distanceFromPickup?: number;

  @ApiPropertyOptional({ description: 'ETA to pickup in minutes' })
  etaToPickup?: number;
}

export class RideTrackingResponseDto {
  @ApiProperty({ description: 'Ride ID' })
  rideId: string;

  @ApiProperty({ description: 'Current ride status' })
  status: string;

  @ApiPropertyOptional({ description: 'Driver location' })
  driverLocation?: DriverLocationResponseDto;

  @ApiPropertyOptional({ description: 'Pickup location' })
  pickupLocation?: {
    latitude: number;
    longitude: number;
    address: string;
  };

  @ApiPropertyOptional({ description: 'Dropoff location' })
  dropoffLocation?: {
    latitude: number;
    longitude: number;
    address: string;
  };

  @ApiPropertyOptional({ description: 'Route polyline (encoded)' })
  routePolyline?: string;

  @ApiPropertyOptional({ description: 'Estimated arrival time' })
  estimatedArrival?: Date;

  @ApiPropertyOptional({ description: 'Distance to destination in km' })
  distanceToDestination?: number;

  @ApiPropertyOptional({ description: 'Time to destination in minutes' })
  timeToDestination?: number;

  @ApiPropertyOptional({ description: 'Progress percentage (0-100)' })
  progress?: number;

  @ApiPropertyOptional({ description: 'Last location update timestamp' })
  lastUpdate?: Date;
}

export class RouteOptimizationDto {
  @ApiProperty({ description: 'Starting latitude' })
  @IsNumber()
  @IsNotEmpty()
  startLat: number;

  @ApiProperty({ description: 'Starting longitude' })
  @IsNumber()
  @IsNotEmpty()
  startLng: number;

  @ApiProperty({ description: 'Destination latitude' })
  @IsNumber()
  @IsNotEmpty()
  endLat: number;

  @ApiProperty({ description: 'Destination longitude' })
  @IsNumber()
  @IsNotEmpty()
  endLng: number;

  @ApiPropertyOptional({ description: 'Waypoints as array of lat,lng pairs' })
  @IsString({ each: true })
  @IsOptional()
  waypoints?: string[];

  @ApiPropertyOptional({ description: 'Avoid tolls', default: false })
  @IsBoolean()
  @IsOptional()
  avoidTolls?: boolean;

  @ApiPropertyOptional({ description: 'Avoid highways', default: false })
  @IsBoolean()
  @IsOptional()
  avoidHighways?: boolean;
}

export class RouteResponseDto {
  @ApiProperty({ description: 'Total distance in km' })
  distance: number;

  @ApiProperty({ description: 'Estimated duration in minutes' })
  duration: number;

  @ApiProperty({ description: 'Encoded polyline for the route' })
  polyline: string;

  @ApiPropertyOptional({ description: 'Route steps' })
  steps?: Array<{
    instruction: string;
    distance: number;
    duration: number;
    startLocation: { lat: number; lng: number };
    endLocation: { lat: number; lng: number };
  }>;

  @ApiPropertyOptional({ description: 'Traffic conditions' })
  traffic?: 'LIGHT' | 'MODERATE' | 'HEAVY' | 'SEVERE';

  @ApiPropertyOptional({ description: 'Alternative routes' })
  alternatives?: Array<{
    distance: number;
    duration: number;
    polyline: string;
  }>;
}
