import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsBoolean, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateInventoryDto {
  @ApiProperty({ example: 100, description: 'Initial quantity' })
  @IsNumber()
  @Min(0)
  quantity: number;

  @ApiPropertyOptional({ example: 10, description: 'Low stock threshold' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  lowStockThreshold?: number;

  @ApiPropertyOptional({ description: 'Enable inventory tracking', default: false })
  @IsOptional()
  @IsBoolean()
  trackInventory?: boolean;
}

export class UpdateInventoryDto {
  @ApiPropertyOptional({ example: 100 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  quantity?: number;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  lowStockThreshold?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  trackInventory?: boolean;
}

export class UpdateStockDto {
  @ApiProperty({ example: 50, description: 'New stock quantity' })
  @IsNumber()
  @Min(0)
  quantity: number;

  @ApiPropertyOptional({ example: '2026-01-15', description: 'Last restocked date' })
  @IsOptional()
  @Type(() => Date)
  lastRestocked?: Date;
}

export class InventoryAlertDto {
  @ApiProperty({ example: 'ITEM123' })
  menuItemId: string;

  @ApiProperty({ example: 'Chicken Burger' })
  menuItemName: string;

  @ApiProperty({ example: 5 })
  currentQuantity: number;

  @ApiProperty({ example: 10 })
  lowStockThreshold: number;

  @ApiProperty({ example: 'LOW_STOCK' })
  alertType: 'LOW_STOCK' | 'OUT_OF_STOCK';

  @ApiProperty({ example: new Date().toISOString() })
  createdAt: Date;
}
