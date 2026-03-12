import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsArray,
  IsNumber,
  IsBoolean,
  ValidateNested,
  IsObject,
  Min,
  Max,
  IsEmail,
  IsDecimal,
} from 'class-validator';
import { Type } from 'class-transformer';

export class OpeningHoursDto {
  @ApiProperty({ example: '09:00' })
  @IsString()
  open: string;

  @ApiProperty({ example: '23:00' })
  @IsString()
  close: string;
}

export class HolidayHoursDto {
  @ApiProperty({ example: '2026-01-01' })
  @IsString()
  date: string;

  @ApiProperty({ example: '10:00' })
  @IsString()
  open: string;

  @ApiProperty({ example: '22:00' })
  @IsString()
  close: string;

  @ApiProperty({ example: 'New Year Day' })
  @IsString()
  reason: string;
}

export class CreateRestaurantDto {
  @ApiProperty({ example: 'Al Baik' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'البيك' })
  @IsOptional()
  @IsString()
  nameAr?: string;

  @ApiPropertyOptional({ example: 'Famous Saudi fast food restaurant' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'مطعم سعودي شهير للوجبات السريعة' })
  @IsOptional()
  @IsString()
  descriptionAr?: string;

  @ApiProperty({ example: ['ARABIC', 'FAST_FOOD', 'CHICKEN'] })
  @IsArray()
  @IsString({ each: true })
  cuisine: string[];

  @ApiPropertyOptional({ example: 'https://example.com/logo.png' })
  @IsOptional()
  @IsString()
  logo?: string;

  @ApiPropertyOptional({ example: 'https://example.com/banner.png' })
  @IsOptional()
  @IsString()
  banner?: string;

  @ApiPropertyOptional({ example: ['https://example.com/gallery1.png'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  gallery?: string[];

  @ApiProperty({ example: '+966501234567' })
  @IsString()
  phone: string;

  @ApiPropertyOptional({ example: 'contact@albaik.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: 'King Fahd Road, Riyadh' })
  @IsString()
  address: string;

  @ApiPropertyOptional({ example: 'طريق الملك فهد، الرياض' })
  @IsOptional()
  @IsString()
  addressAr?: string;

  @ApiProperty({ example: 'Riyadh' })
  @IsString()
  city: string;

  @ApiPropertyOptional({ example: 'Al Olaya' })
  @IsOptional()
  @IsString()
  district?: string;

  @ApiPropertyOptional({ example: 'Riyadh Province' })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiPropertyOptional({ example: 'Saudi Arabia' })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiPropertyOptional({ example: '12211' })
  @IsOptional()
  @IsString()
  postalCode?: string;

  @ApiPropertyOptional({ example: 24.7136 })
  @IsOptional()
  @IsNumber()
  latitude?: number;

  @ApiPropertyOptional({ example: 46.6753 })
  @IsOptional()
  @IsNumber()
  longitude?: number;

  @ApiPropertyOptional({ example: 5.0, description: 'Delivery radius in km' })
  @IsOptional()
  @IsNumber()
  @Min(0.1)
  deliveryRadius?: number;

  @ApiPropertyOptional({ example: 10.0, description: 'Minimum order amount in SAR' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  minOrderAmount?: number;

  @ApiPropertyOptional({ example: 3.99, description: 'Delivery fee in SAR' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  deliveryFee?: number;

  @ApiPropertyOptional({ example: 50.0, description: 'Free delivery above this amount' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  freeDeliveryAbove?: number;

  @ApiPropertyOptional({ example: 30, description: 'Estimated delivery time in minutes' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  estimatedDeliveryTime?: number;

  @ApiPropertyOptional({ example: 20, description: 'Minimum delivery time in minutes' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  minDeliveryTime?: number;

  @ApiPropertyOptional({ example: 60, description: 'Maximum delivery time in minutes' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxDeliveryTime?: number;

  @ApiPropertyOptional({ example: { monday: { open: '09:00', close: '23:00' } } })
  @IsOptional()
  @IsObject()
  openingHours?: Record<string, OpeningHoursDto>;

  @ApiPropertyOptional({ type: [HolidayHoursDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HolidayHoursDto)
  holidayHours?: HolidayHoursDto[];

  @ApiPropertyOptional({ example: ['FAST_DELIVERY', 'POPULAR'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  badges?: string[];

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;
}
