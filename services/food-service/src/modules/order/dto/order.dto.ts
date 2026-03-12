import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsArray,
  IsEnum,
  IsObject,
  Min,
  Max,
  ValidateNested,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum OrderTypeEnum {
  FOOD = 'FOOD',
  GROCERY = 'GROCERY',
  COURIER = 'COURIER',
  PHARMACY = 'PHARMACY',
}

export enum OrderType {
  DELIVERY = 'DELIVERY',
  PICKUP = 'PICKUP',
}

export enum DeliveryPriority {
  STANDARD = 'STANDARD',
  EXPRESS = 'EXPRESS',
  SCHEDULED = 'SCHEDULED',
}

export enum PackageSize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
  EXTRA_LARGE = 'EXTRA_LARGE',
}

export class OrderItemModifierDto {
  @ApiProperty({ example: 'MOD123' })
  @IsString()
  modifierId: string;

  @ApiProperty({ example: 'Extra Cheese' })
  @IsString()
  name: string;

  @ApiProperty({ example: 3.50 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiPropertyOptional({ example: 2 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  quantity?: number;
}

export class CreateOrderItemDto {
  @ApiProperty({ example: 'ITEM123' })
  @IsString()
  menuItemId: string;

  @ApiProperty({ example: 'Chicken Burger' })
  @IsString()
  name: string;

  @ApiProperty({ example: 2 })
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty({ example: 25.99 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiPropertyOptional({ example: 'Special instructions for this item' })
  @IsOptional()
  @IsString()
  specialInstructions?: string;

  @ApiPropertyOptional({ type: [OrderItemModifierDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemModifierDto)
  modifiers?: OrderItemModifierDto[];
}

export class DeliveryAddressDto {
  @ApiProperty({ example: 'King Fahd Road, Riyadh' })
  @IsString()
  address: string;

  @ApiPropertyOptional({ example: 'طريق الملك فهد، الرياض' })
  @IsOptional()
  @IsString()
  addressAr?: string;

  @ApiProperty({ example: 24.7136 })
  @IsNumber()
  latitude: number;

  @ApiProperty({ example: 46.6753 })
  @IsNumber()
  longitude: number;

  @ApiPropertyOptional({ example: 'Apartment 5, Floor 2' })
  @IsOptional()
  @IsString()
  instructions?: string;

  @ApiPropertyOptional({ example: 'شقة 5، طابق 2' })
  @IsOptional()
  @IsString()
  instructionsAr?: string;

  @ApiProperty({ example: 'Ahmed Mohammed' })
  @IsString()
  contactName: string;

  @ApiProperty({ example: '+966501234567' })
  @IsString()
  contactPhone: string;
}

export class CreateOrderDto {
  @ApiProperty({ enum: OrderTypeEnum, default: OrderTypeEnum.FOOD })
  @IsEnum(OrderTypeEnum)
  type: OrderTypeEnum;

  @ApiProperty({ example: 'CUST123' })
  @IsString()
  customerId: string;

  @ApiProperty({ example: 'REST123' })
  @IsString()
  restaurantId: string;

  @ApiProperty({ enum: OrderType, default: OrderType.DELIVERY })
  @IsEnum(OrderType)
  orderType: OrderType;

  @ApiProperty({ type: [CreateOrderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];

  @ApiPropertyOptional({ type: DeliveryAddressDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => DeliveryAddressDto)
  deliveryAddress?: DeliveryAddressDto;

  @ApiPropertyOptional({ enum: DeliveryPriority, default: DeliveryPriority.STANDARD })
  @IsOptional()
  @IsEnum(DeliveryPriority)
  priority?: DeliveryPriority;

  @ApiPropertyOptional({ example: '2026-01-15T19:00:00Z', description: 'For scheduled orders' })
  @IsOptional()
  @IsDateString()
  scheduledAt?: string;

  @ApiPropertyOptional({ example: 'CASH' })
  @IsOptional()
  @IsString()
  paymentMethod?: string;

  @ApiPropertyOptional({ example: 'PROMO123' })
  @IsOptional()
  @IsString()
  promoCode?: string;

  @ApiPropertyOptional({ example: 5.0, description: 'Tip amount in SAR' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  tip?: number;

  @ApiPropertyOptional({ example: 'No onions please' })
  @IsOptional()
  @IsString()
  customerNotes?: string;

  @ApiPropertyOptional({ example: 'من فضلك بدون بصل' })
  @IsOptional()
  @IsString()
  customerNotesAr?: string;

  // Courier specific fields
  @ApiPropertyOptional({ enum: PackageSize })
  @IsOptional()
  @IsEnum(PackageSize)
  packageSize?: PackageSize;

  @ApiPropertyOptional({ example: 2.5, description: 'Package weight in kg' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  packageWeight?: number;

  @ApiPropertyOptional({ example: 100, description: 'Declared package value in SAR' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  packageValue?: number;

  @ApiPropertyOptional({ example: 'Mohammed Ali' })
  @IsOptional()
  @IsString()
  pickupContact?: string;

  @ApiPropertyOptional({ example: '+966501234567' })
  @IsOptional()
  @IsString()
  pickupPhone?: string;

  @ApiPropertyOptional({ example: 'Ring the doorbell twice' })
  @IsOptional()
  @IsString()
  pickupNotes?: string;

  @ApiPropertyOptional({ example: 'Fatima Hassan' })
  @IsOptional()
  @IsString()
  deliveryContact?: string;

  @ApiPropertyOptional({ example: '+966509876543' })
  @IsOptional()
  @IsString()
  deliveryPhone?: string;

  @ApiPropertyOptional({ example: 'Leave at reception' })
  @IsOptional()
  @IsString()
  deliveryNotes?: string;

  @ApiPropertyOptional({ description: 'Signature required for delivery' })
  @IsOptional()
  @IsBoolean()
  signatureRequired?: boolean;

  @ApiPropertyOptional({ description: 'ID required for delivery' })
  @IsOptional()
  @IsBoolean()
  idRequired?: boolean;
}

export class OrderFilterDto {
  @ApiPropertyOptional({ enum: OrderTypeEnum, isArray: true })
  @IsOptional()
  @IsArray()
  @IsEnum(OrderTypeEnum, { each: true })
  types?: OrderTypeEnum[];

  @ApiPropertyOptional({ enum: ['PENDING', 'CONFIRMED', 'PREPARING', 'READY_FOR_PICKUP', 'PICKED_UP', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED', 'REFUNDED'], isArray: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  statuses?: string[];

  @ApiPropertyOptional({ example: '2026-01-01' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({ example: '2026-12-31' })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional({ example: 50.0, description: 'Minimum order total' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  minTotal?: number;

  @ApiPropertyOptional({ example: 500.0, description: 'Maximum order total' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxTotal?: number;

  @ApiPropertyOptional({ example: true, description: 'Include cancelled orders' })
  @IsOptional()
  @IsBoolean()
  includeCancelled?: boolean;
}

export class UpdateOrderStatusDto {
  @ApiProperty({
    enum: ['PENDING', 'CONFIRMED', 'PREPARING', 'READY_FOR_PICKUP', 'PICKED_UP', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED', 'REFUNDED'],
  })
  @IsString()
  status: string;

  @ApiPropertyOptional({ example: 'Order is being prepared' })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class CancelOrderDto {
  @ApiProperty({ example: 'Changed my mind' })
  @IsString()
  reason: string;

  @ApiPropertyOptional({ example: 'Customer requested cancellation' })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class RateOrderDto {
  @ApiProperty({ example: 5, description: 'Overall order rating (1-5)' })
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiPropertyOptional({ example: 5, description: 'Restaurant rating (1-5)' })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  restaurantRating?: number;

  @ApiPropertyOptional({ example: 4, description: 'Driver rating (1-5)' })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  driverRating?: number;

  @ApiPropertyOptional({ example: 'Great food, fast delivery!' })
  @IsOptional()
  @IsString()
  comment?: string;

  @ApiPropertyOptional({ example: 'الطعام رائع، التوصيل سريع!' })
  @IsOptional()
  @IsString()
  commentAr?: string;

  @ApiPropertyOptional({ example: ['FOOD_QUALITY', 'FAST_DELIVERY'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
