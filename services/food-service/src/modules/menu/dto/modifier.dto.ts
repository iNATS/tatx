import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  Min,
} from 'class-validator';

export class CreateModifierGroupDto {
  @ApiProperty({ example: 'Extra Toppings' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'إضافات إضافية' })
  @IsOptional()
  @IsString()
  nameAr?: string;

  @ApiPropertyOptional({ example: 'Choose your extra toppings' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 0, description: 'Minimum number of selections' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  minSelection?: number;

  @ApiPropertyOptional({ example: 3, description: 'Maximum number of selections' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxSelection?: number;

  @ApiPropertyOptional({ description: 'Is this modifier group required', default: false })
  @IsOptional()
  @IsBoolean()
  isRequired?: boolean;

  @ApiPropertyOptional({ example: 'CAT123', description: 'Category ID to associate with' })
  @IsOptional()
  @IsString()
  categoryId?: string;
}

export class UpdateModifierGroupDto {
  @ApiPropertyOptional({ example: 'Extra Toppings' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'إضافات إضافية' })
  @IsOptional()
  @IsString()
  nameAr?: string;

  @ApiPropertyOptional({ example: 'Choose your extra toppings' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  minSelection?: number;

  @ApiPropertyOptional({ example: 3 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxSelection?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isRequired?: boolean;
}

export class CreateModifierDto {
  @ApiProperty({ example: 'Extra Cheese' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'جبن إضافي' })
  @IsOptional()
  @IsString()
  nameAr?: string;

  @ApiPropertyOptional({ example: 'Add extra cheese to your burger' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 3.50, description: 'Price in SAR' })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiPropertyOptional({ example: 1, description: 'Sort order for display' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  sortOrder?: number;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;
}

export class UpdateModifierDto {
  @ApiPropertyOptional({ example: 'Extra Cheese' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'جبن إضافي' })
  @IsOptional()
  @IsString()
  nameAr?: string;

  @ApiPropertyOptional({ example: 'Add extra cheese to your burger' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 3.50 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  sortOrder?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;
}
