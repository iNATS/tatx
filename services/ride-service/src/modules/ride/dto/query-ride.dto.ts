import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsEnum,
  IsInt,
  IsBoolean,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';
import { RideStatus, RideCategory, VehicleType } from '../enums/ride.enums';

export class RideHistoryQueryDto {
  @ApiPropertyOptional({ description: 'Page number', example: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({ description: 'Items per page', example: 20 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  limit?: number = 20;

  @ApiPropertyOptional({
    description: 'Filter by ride status',
    enum: RideStatus,
  })
  @IsEnum(RideStatus)
  @IsOptional()
  status?: RideStatus;

  @ApiPropertyOptional({
    description: 'Filter by ride category',
    enum: RideCategory,
  })
  @IsEnum(RideCategory)
  @IsOptional()
  category?: RideCategory;

  @ApiPropertyOptional({
    description: 'Filter by vehicle type',
    enum: VehicleType,
  })
  @IsEnum(VehicleType)
  @IsOptional()
  vehicleType?: VehicleType;

  @ApiPropertyOptional({ description: 'Start date filter (ISO format)' })
  @IsString()
  @IsOptional()
  startDate?: string;

  @ApiPropertyOptional({ description: 'End date filter (ISO format)' })
  @IsString()
  @IsOptional()
  endDate?: string;

  @ApiPropertyOptional({ description: 'Sort by field', example: 'createdAt' })
  @IsString()
  @IsOptional()
  sortBy?: string = 'createdAt';

  @ApiPropertyOptional({ description: 'Sort order', example: 'desc' })
  @IsString()
  @IsOptional()
  sortOrder?: 'asc' | 'desc' = 'desc';

  @ApiPropertyOptional({ description: 'Include cancelled rides', default: true })
  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  includeCancelled?: boolean = true;
}

export class RideSearchQueryDto {
  @ApiPropertyOptional({ description: 'Search by ride number' })
  @IsString()
  @IsOptional()
  rideNumber?: string;

  @ApiPropertyOptional({ description: 'Filter by rider ID' })
  @IsString()
  @IsOptional()
  riderId?: string;

  @ApiPropertyOptional({ description: 'Filter by driver ID' })
  @IsString()
  @IsOptional()
  driverId?: string;

  @ApiPropertyOptional({
    description: 'Filter by status',
    enum: RideStatus,
  })
  @IsEnum(RideStatus)
  @IsOptional()
  status?: RideStatus;

  @ApiPropertyOptional({ description: 'Page number' })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({ description: 'Items per page' })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  limit?: number = 20;
}

export class PaginationDto {
  @ApiPropertyOptional({ description: 'Page number', example: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({ description: 'Items per page', example: 20 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  limit?: number = 20;
}

export class PaginatedResponseDto<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
