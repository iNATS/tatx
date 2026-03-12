import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsArray,
  IsNumber,
  IsBoolean,
  IsObject,
  Min,
  IsEmail,
} from 'class-validator';
import { OpeningHoursDto, HolidayHoursDto } from './create-restaurant.dto';

export class UpdateRestaurantDto {
  @ApiPropertyOptional({ example: 'Al Baik' })
  @IsOptional()
  @IsString()
  name?: string;

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

  @ApiPropertyOptional({ example: ['ARABIC', 'FAST_FOOD', 'CHICKEN'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  cuisine?: string[];

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

  @ApiPropertyOptional({ example: '+966501234567' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ example: 'contact@albaik.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: 'King Fahd Road, Riyadh' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ example: 'طريق الملك فهد، الرياض' })
  @IsOptional()
  @IsString()
  addressAr?: string;

  @ApiPropertyOptional({ example: 'Riyadh' })
  @IsOptional()
  @IsString()
  city?: string;

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

  @ApiPropertyOptional({ example: 10.0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  minOrderAmount?: number;

  @ApiPropertyOptional({ example: 3.99 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  deliveryFee?: number;

  @ApiPropertyOptional({ example: 50.0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  freeDeliveryAbove?: number;

  @ApiPropertyOptional({ example: 30 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  estimatedDeliveryTime?: number;

  @ApiPropertyOptional({ example: 20 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  minDeliveryTime?: number;

  @ApiPropertyOptional({ example: 60 })
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

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  isOpen?: boolean;
}
