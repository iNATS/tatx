import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsObject,
  Min,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class PolygonPointDto {
  @ApiProperty({ example: 24.7136 })
  @IsNumber()
  latitude: number;

  @ApiProperty({ example: 46.6753 })
  @IsNumber()
  longitude: number;
}

export class CreateDeliveryZoneDto {
  @ApiProperty({ example: 'Riyadh Central' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'وسط الرياض' })
  @IsOptional()
  @IsString()
  nameAr?: string;

  @ApiPropertyOptional({
    example: {
      type: 'Polygon',
      coordinates: [[[46.6753, 24.7136], [46.6853, 24.7136], [46.6853, 24.7236], [46.6753, 24.7236], [46.6753, 24.7136]]],
    },
    description: 'GeoJSON polygon defining the delivery zone',
  })
  @IsOptional()
  @IsObject()
  polygon?: Record<string, unknown>;

  @ApiProperty({ example: 5.99, description: 'Delivery fee for this zone in SAR' })
  @IsNumber()
  @Min(0)
  fee: number;

  @ApiProperty({ example: 15.0, description: 'Minimum order amount for this zone in SAR' })
  @IsNumber()
  @Min(0)
  minOrder: number;

  @ApiPropertyOptional({ example: 25.0, description: 'Maximum order amount for this zone' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxOrder?: number;

  @ApiPropertyOptional({ example: 45, description: 'Estimated delivery time in minutes' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  estimatedDeliveryTime?: number;

  @ApiPropertyOptional({ example: 10.0, description: 'Delivery radius in km' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  radius?: number;

  @ApiPropertyOptional({ example: ['Riyadh', 'Al Olaya'], description: 'Covered cities/districts' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  coveredAreas?: string[];

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateDeliveryZoneDto {
  @ApiPropertyOptional({ example: 'Riyadh Central' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'وسط الرياض' })
  @IsOptional()
  @IsString()
  nameAr?: string;

  @ApiPropertyOptional({
    example: {
      type: 'Polygon',
      coordinates: [[[46.6753, 24.7136], [46.6853, 24.7136], [46.6853, 24.7236], [46.6753, 24.7236], [46.6753, 24.7136]]],
    },
  })
  @IsOptional()
  @IsObject()
  polygon?: Record<string, unknown>;

  @ApiPropertyOptional({ example: 5.99 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  fee?: number;

  @ApiPropertyOptional({ example: 15.0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  minOrder?: number;

  @ApiPropertyOptional({ example: 25.0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxOrder?: number;

  @ApiPropertyOptional({ example: 45 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  estimatedDeliveryTime?: number;

  @ApiPropertyOptional({ example: 10.0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  radius?: number;

  @ApiPropertyOptional({ example: ['Riyadh', 'Al Olaya'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  coveredAreas?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class CheckDeliveryAvailabilityDto {
  @ApiProperty({ example: 24.7136 })
  @IsNumber()
  latitude: number;

  @ApiProperty({ example: 46.6753 })
  @IsNumber()
  longitude: number;

  @ApiPropertyOptional({ example: 'Riyadh' })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({ example: 'Al Olaya' })
  @IsOptional()
  @IsString()
  district?: string;
}

export class DeliveryZoneStatsDto {
  @ApiProperty({ example: 'ZONE123' })
  zoneId: string;

  @ApiProperty({ example: 'Riyadh Central' })
  zoneName: string;

  @ApiProperty({ example: 150 })
  totalOrders: number;

  @ApiProperty({ example: 12500.50 })
  totalRevenue: number;

  @ApiProperty({ example: 35 })
  averageDeliveryTime: number;

  @ApiProperty({ example: 4.5 })
  averageRating: number;
}
