import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsEnum,
  IsDateString,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum PromotionType {
  PERCENTAGE = 'PERCENTAGE',
  FIXED_AMOUNT = 'FIXED_AMOUNT',
  FREE_DELIVERY = 'FREE_DELIVERY',
  BUY_ONE_GET_ONE = 'BUY_ONE_GET_ONE',
  FREE_ITEM = 'FREE_ITEM',
}

export enum PromotionScope {
  ALL_ITEMS = 'ALL_ITEMS',
  SPECIFIC_ITEMS = 'SPECIFIC_ITEMS',
  SPECIFIC_CATEGORIES = 'SPECIFIC_CATEGORIES',
}

export class CreatePromotionDto {
  @ApiProperty({ example: '20% Off Weekend Special' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: 'خصم 20% في عطلة نهاية الأسبوع' })
  @IsOptional()
  @IsString()
  titleAr?: string;

  @ApiPropertyOptional({ example: 'Get 20% off on all orders above 50 SAR' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'احصل على خصم 20% على جميع الطلبات فوق 50 ريال' })
  @IsOptional()
  @IsString()
  descriptionAr?: string;

  @ApiProperty({ enum: PromotionType })
  @IsEnum(PromotionType)
  type: PromotionType;

  @ApiProperty({ example: 20, description: 'Discount value (percentage or fixed amount)' })
  @IsNumber()
  @Min(0)
  value: number;

  @ApiPropertyOptional({ example: 50, description: 'Minimum order amount for promotion' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  minOrderAmount?: number;

  @ApiPropertyOptional({ example: 100, description: 'Maximum discount amount' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxDiscountAmount?: number;

  @ApiProperty({ enum: PromotionScope, default: PromotionScope.ALL_ITEMS })
  @IsEnum(PromotionScope)
  scope: PromotionScope;

  @ApiPropertyOptional({ example: ['item1', 'item2'], description: 'Specific item IDs' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  itemIds?: string[];

  @ApiPropertyOptional({ example: ['cat1', 'cat2'], description: 'Specific category IDs' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  categoryIds?: string[];

  @ApiProperty({ example: '2026-01-01T00:00:00Z' })
  @IsDateString()
  startDate: Date;

  @ApiProperty({ example: '2026-12-31T23:59:59Z' })
  @IsDateString()
  endDate: Date;

  @ApiPropertyOptional({ example: 'WEEKEND', description: 'Days of week: MONDAY, TUESDAY, etc.' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  applicableDays?: string[];

  @ApiPropertyOptional({ example: '11:00', description: 'Start time for daily promotion' })
  @IsOptional()
  @IsString()
  startTime?: string;

  @ApiPropertyOptional({ example: '23:00', description: 'End time for daily promotion' })
  @IsOptional()
  @IsString()
  endTime?: string;

  @ApiPropertyOptional({ example: 1000, description: 'Maximum number of uses' })
  @IsOptional()
  @IsNumber()
  @Min(1)
  maxUses?: number;

  @ApiPropertyOptional({ example: 1, description: 'Maximum uses per customer' })
  @IsOptional()
  @IsNumber()
  @Min(1)
  maxUsesPerCustomer?: number;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ example: 'https://example.com/promo-banner.png' })
  @IsOptional()
  @IsString()
  bannerImage?: string;

  @ApiPropertyOptional({ example: 'WEEKEND20', description: 'Promo code' })
  @IsOptional()
  @IsString()
  promoCode?: string;
}

export class UpdatePromotionDto {
  @ApiPropertyOptional({ example: '20% Off Weekend Special' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 'خصم 20% في عطلة نهاية الأسبوع' })
  @IsOptional()
  @IsString()
  titleAr?: string;

  @ApiPropertyOptional({ example: 'Get 20% off on all orders above 50 SAR' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'احصل على خصم 20% على جميع الطلبات فوق 50 ريال' })
  @IsOptional()
  @IsString()
  descriptionAr?: string;

  @ApiPropertyOptional({ enum: PromotionType })
  @IsOptional()
  @IsEnum(PromotionType)
  type?: PromotionType;

  @ApiPropertyOptional({ example: 20 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  value?: number;

  @ApiPropertyOptional({ example: 50 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  minOrderAmount?: number;

  @ApiPropertyOptional({ example: 100 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxDiscountAmount?: number;

  @ApiPropertyOptional({ enum: PromotionScope })
  @IsOptional()
  @IsEnum(PromotionScope)
  scope?: PromotionScope;

  @ApiPropertyOptional({ example: ['item1', 'item2'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  itemIds?: string[];

  @ApiPropertyOptional({ example: ['cat1', 'cat2'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  categoryIds?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  endDate?: Date;

  @ApiPropertyOptional({ example: ['WEEKEND'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  applicableDays?: string[];

  @ApiPropertyOptional({ example: '11:00' })
  @IsOptional()
  @IsString()
  startTime?: string;

  @ApiPropertyOptional({ example: '23:00' })
  @IsOptional()
  @IsString()
  endTime?: string;

  @ApiPropertyOptional({ example: 1000 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  maxUses?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  maxUsesPerCustomer?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ example: 'https://example.com/promo-banner.png' })
  @IsOptional()
  @IsString()
  bannerImage?: string;
}
