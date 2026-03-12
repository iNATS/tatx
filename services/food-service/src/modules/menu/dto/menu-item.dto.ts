import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsArray,
  Min,
  Max,
  ValidateNested,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PortionSize } from './category.dto';

export class NutritionalInfoDto {
  @ApiPropertyOptional({ example: 250, description: 'Calories' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  calories?: number;

  @ApiPropertyOptional({ example: 15, description: 'Protein in grams' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  protein?: number;

  @ApiPropertyOptional({ example: 30, description: 'Carbohydrates in grams' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  carbs?: number;

  @ApiPropertyOptional({ example: 10, description: 'Fat in grams' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  fat?: number;
}

export class CreateMenuItemDto {
  @ApiProperty({ example: 'Chicken Burger' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'برجر دجاج' })
  @IsOptional()
  @IsString()
  nameAr?: string;

  @ApiPropertyOptional({ example: 'Crispy chicken burger with lettuce and mayo' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'برجر دجاج مقرمش مع خس ومايونيز' })
  @IsOptional()
  @IsString()
  descriptionAr?: string;

  @ApiProperty({ example: 25.99, description: 'Price in SAR' })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiPropertyOptional({ example: 22.99, description: 'Sale price in SAR' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  salePrice?: number;

  @ApiPropertyOptional({ example: 'https://example.com/burger.png' })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiPropertyOptional({ example: ['https://example.com/burger1.png', 'https://example.com/burger2.png'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @ApiPropertyOptional({ example: 'CAT123', description: 'Category ID' })
  @IsOptional()
  @IsString()
  categoryId?: string;

  @ApiPropertyOptional({ description: 'Vegetarian item' })
  @IsOptional()
  @IsBoolean()
  isVeg?: boolean;

  @ApiPropertyOptional({ description: 'Halal certified', default: true })
  @IsOptional()
  @IsBoolean()
  isHalal?: boolean;

  @ApiPropertyOptional({ description: 'Popular item' })
  @IsOptional()
  @IsBoolean()
  isPopular?: boolean;

  @ApiPropertyOptional({ description: 'Featured item' })
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @ApiPropertyOptional({ example: 15, description: 'Preparation time in minutes' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  prepTime?: number;

  @ApiPropertyOptional({ type: NutritionalInfoDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => NutritionalInfoDto)
  nutritionalInfo?: NutritionalInfoDto;

  @ApiPropertyOptional({ example: ['NUTS', 'DAIRY'], description: 'Allergen types' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  allergens?: string[];

  @ApiPropertyOptional({ example: ['Chicken', 'Bread', 'Lettuce', 'Mayo'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  ingredients?: string[];

  @ApiPropertyOptional({ example: 2, description: 'Spiciness level 0-5' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  spiciness?: number;

  @ApiPropertyOptional({ enum: PortionSize })
  @IsOptional()
  @IsEnum(PortionSize)
  portionSize?: PortionSize;

  @ApiPropertyOptional({ example: 'BURGER-001' })
  @IsOptional()
  @IsString()
  sku?: string;

  @ApiPropertyOptional({ example: '123456789' })
  @IsOptional()
  @IsString()
  barcode?: string;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;

  @ApiPropertyOptional({ description: 'Customization options' })
  @IsOptional()
  @IsObject()
  customizations?: Record<string, unknown>;

  @ApiPropertyOptional({ example: ['MOD_GROUP_1', 'MOD_GROUP_2'], description: 'Modifier group IDs' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  modifierGroupIds?: string[];
}

export class UpdateMenuItemDto {
  @ApiPropertyOptional({ example: 'Chicken Burger' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'برجر دجاج' })
  @IsOptional()
  @IsString()
  nameAr?: string;

  @ApiPropertyOptional({ example: 'Crispy chicken burger with lettuce and mayo' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'برجر دجاج مقرمش مع خس ومايونيز' })
  @IsOptional()
  @IsString()
  descriptionAr?: string;

  @ApiPropertyOptional({ example: 25.99 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiPropertyOptional({ example: 22.99 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  salePrice?: number;

  @ApiPropertyOptional({ example: 'https://example.com/burger.png' })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiPropertyOptional({ example: ['https://example.com/burger1.png'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @ApiPropertyOptional({ example: 'CAT123' })
  @IsOptional()
  @IsString()
  categoryId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isVeg?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isHalal?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isPopular?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @ApiPropertyOptional({ example: 15 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  prepTime?: number;

  @ApiPropertyOptional({ type: NutritionalInfoDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => NutritionalInfoDto)
  nutritionalInfo?: NutritionalInfoDto;

  @ApiPropertyOptional({ example: ['NUTS', 'DAIRY'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  allergens?: string[];

  @ApiPropertyOptional({ example: ['Chicken', 'Bread'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  ingredients?: string[];

  @ApiPropertyOptional({ example: 2 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  spiciness?: number;

  @ApiPropertyOptional({ enum: PortionSize })
  @IsOptional()
  @IsEnum(PortionSize)
  portionSize?: PortionSize;

  @ApiPropertyOptional({ example: 'BURGER-001' })
  @IsOptional()
  @IsString()
  sku?: string;

  @ApiPropertyOptional({ example: '123456789' })
  @IsOptional()
  @IsString()
  barcode?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  customizations?: Record<string, unknown>;
}

export class UpdateItemAvailabilityDto {
  @ApiProperty({ description: 'Item availability status' })
  @IsBoolean()
  isAvailable: boolean;

  @ApiPropertyOptional({ example: 'Out of stock' })
  @IsOptional()
  @IsString()
  reason?: string;
}
