import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  DefaultValuePipe,
  ParseBoolPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { DeliveryZoneService } from './delivery-zone.service';
import {
  CreateDeliveryZoneDto,
  UpdateDeliveryZoneDto,
  CheckDeliveryAvailabilityDto,
} from './dto';

@ApiTags('delivery-zones')
@ApiBearerAuth()
@Controller('delivery-zones')
export class DeliveryZoneController {
  constructor(private readonly deliveryZoneService: DeliveryZoneService) {}

  // ==================== Delivery Zone CRUD ====================

  @Get()
  @ApiOperation({ summary: 'Get all delivery zones' })
  async findAll() {
    return this.deliveryZoneService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get delivery zone by ID' })
  @ApiParam({ name: 'id', description: 'Delivery zone ID' })
  async findById(@Param('id') id: string) {
    return this.deliveryZoneService.findById(id);
  }

  @Get('restaurant/:restaurantId')
  @ApiOperation({ summary: 'Get delivery zones for a restaurant' })
  @ApiParam({ name: 'restaurantId', description: 'Restaurant ID' })
  @ApiQuery({ name: 'activeOnly', required: false, type: Boolean, example: true })
  async findByRestaurant(
    @Param('restaurantId') restaurantId: string,
    @Query('activeOnly', new DefaultValuePipe(true), ParseBoolPipe) activeOnly: boolean,
  ) {
    return this.deliveryZoneService.findByRestaurant(restaurantId, activeOnly);
  }

  @Get('city/:city')
  @ApiOperation({ summary: 'Get active delivery zones by city' })
  @ApiParam({ name: 'city', description: 'City name' })
  async findByCity(@Param('city') city: string) {
    return this.deliveryZoneService.findByCity(city);
  }

  @Post('restaurant/:restaurantId')
  @ApiOperation({ summary: 'Create a new delivery zone' })
  @ApiParam({ name: 'restaurantId', description: 'Restaurant ID' })
  @ApiResponse({ status: 201, description: 'Delivery zone created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid polygon format' })
  async create(@Param('restaurantId') restaurantId: string, @Body() data: CreateDeliveryZoneDto) {
    return this.deliveryZoneService.create(restaurantId, data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update delivery zone' })
  @ApiParam({ name: 'id', description: 'Delivery zone ID' })
  @ApiResponse({ status: 200, description: 'Delivery zone updated successfully' })
  async update(@Param('id') id: string, @Body() data: UpdateDeliveryZoneDto) {
    return this.deliveryZoneService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete delivery zone' })
  @ApiParam({ name: 'id', description: 'Delivery zone ID' })
  async delete(@Param('id') id: string) {
    await this.deliveryZoneService.delete(id);
  }

  @Post(':id/toggle-active')
  @ApiOperation({ summary: 'Toggle delivery zone active status' })
  @ApiParam({ name: 'id', description: 'Delivery zone ID' })
  async toggleActive(@Param('id') id: string) {
    return this.deliveryZoneService.toggleActive(id);
  }

  @Get(':id/statistics')
  @ApiOperation({ summary: 'Get delivery zone statistics' })
  @ApiParam({ name: 'id', description: 'Delivery zone ID' })
  async getStatistics(@Param('id') id: string) {
    return this.deliveryZoneService.getStatistics(id);
  }

  // ==================== Delivery Availability ====================

  @Post('restaurant/:restaurantId/check')
  @ApiOperation({ summary: 'Check delivery availability for coordinates' })
  @ApiParam({ name: 'restaurantId', description: 'Restaurant ID' })
  @ApiResponse({ status: 200, description: 'Delivery availability check result' })
  async checkAvailability(
    @Param('restaurantId') restaurantId: string,
    @Body() data: CheckDeliveryAvailabilityDto,
  ) {
    return this.deliveryZoneService.checkAvailability(restaurantId, data);
  }

  @Post('find-restaurants')
  @ApiOperation({ summary: 'Find restaurants that deliver to a location' })
  @ApiResponse({ status: 200, description: 'List of restaurants delivering to the location' })
  @ApiQuery({ name: 'city', required: false, type: String })
  async findRestaurantsForLocation(
    @Body() data: CheckDeliveryAvailabilityDto,
    @Query('city') city?: string,
  ) {
    return this.deliveryZoneService.findRestaurantsForLocation(data, city);
  }
}
