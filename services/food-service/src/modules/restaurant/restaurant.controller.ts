import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  ParseBoolPipe,
  DefaultValuePipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { RestaurantService } from './restaurant.service';
import {
  CreateRestaurantDto,
  UpdateRestaurantDto,
  RestaurantFilterDto,
  RestaurantSortDto,
  CreatePromotionDto,
  UpdatePromotionDto,
  CreateDeliveryZoneDto,
  UpdateDeliveryZoneDto,
  CheckDeliveryZoneDto,
} from './dto';

@ApiTags('restaurants')
@ApiBearerAuth()
@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  // ==================== Restaurant CRUD ====================

  @Get()
  @ApiOperation({ summary: 'Get all restaurants with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 20 })
  @ApiQuery({ name: 'sortBy', required: false, enum: ['rating', 'deliveryTime', 'deliveryFee', 'minOrder', 'popularity', 'newest'] })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['ASC', 'DESC'] })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseBoolPipe as unknown as typeof Number) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseBoolPipe as unknown as typeof Number) limit: number,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: 'ASC' | 'DESC',
  ) {
    return this.restaurantService.findAll({ page, limit, sortBy: sortBy as never, sortOrder });
  }

  @Get('search')
  @ApiOperation({ summary: 'Search restaurants with filters' })
  @ApiResponse({ status: 200, description: 'List of restaurants matching the search criteria' })
  async search(
    @Query() filters: RestaurantFilterDto,
    @Query('page', new DefaultValuePipe(1), ParseBoolPipe as unknown as typeof Number) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseBoolPipe as unknown as typeof Number) limit: number,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: 'ASC' | 'DESC',
  ) {
    return this.restaurantService.search(filters, { page, limit, sortBy: sortBy as never, sortOrder });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get restaurant by ID with full details' })
  @ApiParam({ name: 'id', description: 'Restaurant ID' })
  @ApiResponse({ status: 200, description: 'Restaurant details' })
  @ApiResponse({ status: 404, description: 'Restaurant not found' })
  async findById(@Param('id') id: string) {
    return this.restaurantService.findById(id);
  }

  @Get('merchant/:merchantId')
  @ApiOperation({ summary: 'Get all restaurants by merchant ID' })
  @ApiParam({ name: 'merchantId', description: 'Merchant ID' })
  async findByMerchantId(@Param('merchantId') merchantId: string) {
    return this.restaurantService.findByMerchantId(merchantId);
  }

  @Post('merchant/:merchantId')
  @ApiOperation({ summary: 'Create a new restaurant' })
  @ApiParam({ name: 'merchantId', description: 'Merchant ID' })
  @ApiResponse({ status: 201, description: 'Restaurant created successfully' })
  @ApiResponse({ status: 404, description: 'Merchant not found' })
  @ApiResponse({ status: 409, description: 'Restaurant already exists' })
  async create(@Param('merchantId') merchantId: string, @Body() data: CreateRestaurantDto) {
    return this.restaurantService.create(merchantId, data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update restaurant' })
  @ApiParam({ name: 'id', description: 'Restaurant ID' })
  @ApiResponse({ status: 200, description: 'Restaurant updated successfully' })
  @ApiResponse({ status: 404, description: 'Restaurant not found' })
  async update(@Param('id') id: string, @Body() data: UpdateRestaurantDto) {
    return this.restaurantService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete restaurant (soft delete)' })
  @ApiParam({ name: 'id', description: 'Restaurant ID' })
  @ApiResponse({ status: 204, description: 'Restaurant deleted successfully' })
  @ApiResponse({ status: 404, description: 'Restaurant not found' })
  async delete(@Param('id') id: string) {
    await this.restaurantService.delete(id);
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Update restaurant open/close status' })
  @ApiParam({ name: 'id', description: 'Restaurant ID' })
  @ApiResponse({ status: 200, description: 'Status updated successfully' })
  async updateStatus(@Param('id') id: string, @Body() data: { isOpen: boolean }) {
    return this.restaurantService.updateStatus(id, data.isOpen);
  }

  @Put(':id/active')
  @ApiOperation({ summary: 'Toggle restaurant active status' })
  @ApiParam({ name: 'id', description: 'Restaurant ID' })
  @ApiResponse({ status: 200, description: 'Active status toggled successfully' })
  async toggleActive(@Param('id') id: string) {
    return this.restaurantService.toggleActive(id);
  }

  @Get(':id/statistics')
  @ApiOperation({ summary: 'Get restaurant statistics' })
  @ApiParam({ name: 'id', description: 'Restaurant ID' })
  async getStatistics(@Param('id') id: string) {
    return this.restaurantService.getStatistics(id);
  }

  // ==================== Menu Endpoints ====================

  @Get(':id/menu')
  @ApiOperation({ summary: 'Get restaurant menu with categories and items' })
  @ApiParam({ name: 'id', description: 'Restaurant ID' })
  async getMenu(@Param('id') id: string) {
    return this.restaurantService.getMenu(id);
  }

  // ==================== Promotion Endpoints ====================

  @Get(':id/promotions')
  @ApiOperation({ summary: 'Get all promotions for a restaurant' })
  @ApiParam({ name: 'id', description: 'Restaurant ID' })
  @ApiQuery({ name: 'activeOnly', required: false, type: Boolean, example: true })
  async getPromotions(
    @Param('id') restaurantId: string,
    @Query('activeOnly', new DefaultValuePipe(true), ParseBoolPipe) activeOnly: boolean,
  ) {
    return this.restaurantService.getPromotions(restaurantId, activeOnly);
  }

  @Get(':id/promotions/active')
  @ApiOperation({ summary: 'Get active promotions for a restaurant' })
  @ApiParam({ name: 'id', description: 'Restaurant ID' })
  async getActivePromotions(@Param('id') restaurantId: string) {
    return this.restaurantService.getActivePromotions(restaurantId);
  }

  @Post(':id/promotions')
  @ApiOperation({ summary: 'Create a new promotion' })
  @ApiParam({ name: 'id', description: 'Restaurant ID' })
  @ApiResponse({ status: 201, description: 'Promotion created successfully' })
  async createPromotion(@Param('id') restaurantId: string, @Body() data: CreatePromotionDto) {
    return this.restaurantService.createPromotion(restaurantId, data);
  }

  @Put(':id/promotions/:promotionId')
  @ApiOperation({ summary: 'Update a promotion' })
  @ApiParam({ name: 'id', description: 'Restaurant ID' })
  @ApiParam({ name: 'promotionId', description: 'Promotion ID' })
  async updatePromotion(
    @Param('id') restaurantId: string,
    @Param('promotionId') promotionId: string,
    @Body() data: UpdatePromotionDto,
  ) {
    return this.restaurantService.updatePromotion(restaurantId, promotionId, data);
  }

  @Delete(':id/promotions/:promotionId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a promotion' })
  @ApiParam({ name: 'id', description: 'Restaurant ID' })
  @ApiParam({ name: 'promotionId', description: 'Promotion ID' })
  async deletePromotion(@Param('id') restaurantId: string, @Param('promotionId') promotionId: string) {
    await this.restaurantService.deletePromotion(restaurantId, promotionId);
  }

  // ==================== Delivery Zone Endpoints ====================

  @Get(':id/delivery-zones')
  @ApiOperation({ summary: 'Get all delivery zones for a restaurant' })
  @ApiParam({ name: 'id', description: 'Restaurant ID' })
  async getDeliveryZones(@Param('id') restaurantId: string) {
    return this.restaurantService.getDeliveryZones(restaurantId);
  }

  @Post(':id/delivery-zones')
  @ApiOperation({ summary: 'Create a new delivery zone' })
  @ApiParam({ name: 'id', description: 'Restaurant ID' })
  @ApiResponse({ status: 201, description: 'Delivery zone created successfully' })
  async createDeliveryZone(@Param('id') restaurantId: string, @Body() data: CreateDeliveryZoneDto) {
    return this.restaurantService.createDeliveryZone(restaurantId, data);
  }

  @Put(':id/delivery-zones/:zoneId')
  @ApiOperation({ summary: 'Update a delivery zone' })
  @ApiParam({ name: 'id', description: 'Restaurant ID' })
  @ApiParam({ name: 'zoneId', description: 'Delivery zone ID' })
  async updateDeliveryZone(
    @Param('id') restaurantId: string,
    @Param('zoneId') zoneId: string,
    @Body() data: UpdateDeliveryZoneDto,
  ) {
    return this.restaurantService.updateDeliveryZone(restaurantId, zoneId, data);
  }

  @Delete(':id/delivery-zones/:zoneId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a delivery zone' })
  @ApiParam({ name: 'id', description: 'Restaurant ID' })
  @ApiParam({ name: 'zoneId', description: 'Delivery zone ID' })
  async deleteDeliveryZone(@Param('id') restaurantId: string, @Param('zoneId') zoneId: string) {
    await this.restaurantService.deleteDeliveryZone(restaurantId, zoneId);
  }

  @Post(':id/delivery-zones/check')
  @ApiOperation({ summary: 'Check if address is within delivery zone' })
  @ApiParam({ name: 'id', description: 'Restaurant ID' })
  @ApiResponse({ status: 200, description: 'Delivery availability check result' })
  async checkDeliveryAvailability(@Param('id') restaurantId: string, @Body() data: CheckDeliveryZoneDto) {
    return this.restaurantService.checkDeliveryAvailability(restaurantId, data);
  }
}
