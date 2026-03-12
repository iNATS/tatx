import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsArray,
  IsNumber,
  IsBoolean,
  IsEnum,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum CuisineType {
  ARABIC = 'ARABIC',
  ITALIAN = 'ITALIAN',
  CHINESE = 'CHINESE',
  INDIAN = 'INDIAN',
  AMERICAN = 'AMERICAN',
  FAST_FOOD = 'FAST_FOOD',
  PIZZA = 'PIZZA',
  BURGER = 'BURGER',
  SEAFOOD = 'SEAFOOD',
  GROCERY = 'GROCERY',
  PHARMACY = 'PHARMACY',
  DESSERT = 'DESSERT',
  CAFE = 'CAFE',
  OTHER = 'OTHER',
}

export enum SortBy {
  RATING = 'rating',
  DELIVERY_TIME = 'deliveryTime',
  DELIVERY_FEE = 'deliveryFee',
  MIN_ORDER = 'minOrder',
  DISTANCE = 'distance',
  POPULARITY = 'popularity',
  NEWEST = 'newest',
}

export class RestaurantFilterDto {
  @ApiPropertyOptional({ example: 'Al Baik' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ example: 'Riyadh' })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({ example: 'Al Olaya' })
  @IsOptional()
  @IsString()
  district?: string;

  @ApiPropertyOptional({ enum: CuisineType, isArray: true })
  @IsOptional()
  @IsArray()
  @IsEnum(CuisineType, { each: true })
  cuisines?: CuisineType[];

  @ApiPropertyOptional({ example: true, description: 'Only open restaurants' })
  @IsOptional()
  @IsBoolean()
  isOpen?: boolean;

  @ApiPropertyOptional({ example: true, description: 'Only active restaurants' })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ example: 4.0, description: 'Minimum rating' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  minRating?: number;

  @ApiPropertyOptional({ example: 50.0, description: 'Maximum delivery fee' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxDeliveryFee?: number;

  @ApiPropertyOptional({ example: 30, description: 'Maximum delivery time in minutes' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxDeliveryTime?: number;

  @ApiPropertyOptional({ example: 10.0, description: 'Minimum order amount' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxMinOrder?: number;

  @ApiPropertyOptional({ example: true, description: 'Free delivery only' })
  @IsOptional()
  @IsBoolean()
  freeDelivery?: boolean;

  @ApiPropertyOptional({ example: true, description: 'Featured restaurants only' })
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @ApiPropertyOptional({ example: ['FAST_DELIVERY', 'POPULAR'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  badges?: string[];

  @ApiPropertyOptional({ example: 24.7136 })
  @IsOptional()
  @IsNumber()
  latitude?: number;

  @ApiPropertyOptional({ example: 46.6753 })
  @IsOptional()
  @IsNumber()
  longitude?: number;

  @ApiPropertyOptional({ example: 5.0, description: 'Search radius in km' })
  @IsOptional()
  @IsNumber()
  @Min(0.1)
  radius?: number;
}

export class RestaurantSortDto {
  @ApiPropertyOptional({ enum: SortBy, default: SortBy.POPULARITY })
  @IsOptional()
  @IsEnum(SortBy)
  sortBy?: SortBy;

  @ApiPropertyOptional({ example: 'DESC', enum: ['ASC', 'DESC'] })
  @IsOptional()
  @IsString()
  sortOrder?: 'ASC' | 'DESC';

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({ example: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number;
}
