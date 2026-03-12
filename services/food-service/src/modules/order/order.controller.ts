import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  Query,
  DefaultValuePipe,
  ParseBoolPipe,
  HttpCode,
  HttpStatus,
  Headers,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { OrderService } from './order.service';
import {
  CreateOrderDto,
  OrderFilterDto,
  UpdateOrderStatusDto,
  CancelOrderDto,
  RateOrderDto,
} from './dto';

@ApiTags('orders')
@ApiBearerAuth()
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // ==================== Order Creation ====================

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'Order created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid order data' })
  @ApiResponse({ status: 404, description: 'Restaurant or customer not found' })
  async createOrder(@Body() data: CreateOrderDto) {
    return this.orderService.createOrder(data);
  }

  // ==================== Order Retrieval ====================

  @Get(':id')
  @ApiOperation({ summary: 'Get order by ID' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiResponse({ status: 200, description: 'Order details' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async getOrderById(@Param('id') id: string) {
    return this.orderService.getOrderById(id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get orders for a user' })
  @ApiParam({ name: 'userId', description: 'User/Customer ID' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 20 })
  @ApiQuery({ name: 'types', required: false, description: 'Filter by order types (FOOD, GROCERY, etc.)' })
  @ApiQuery({ name: 'statuses', required: false, description: 'Filter by statuses' })
  @ApiQuery({ name: 'startDate', required: false, type: String, example: '2026-01-01' })
  @ApiQuery({ name: 'endDate', required: false, type: String, example: '2026-12-31' })
  @ApiQuery({ name: 'minTotal', required: false, type: Number })
  @ApiQuery({ name: 'maxTotal', required: false, type: Number })
  @ApiQuery({ name: 'includeCancelled', required: false, type: Boolean, example: false })
  async getUserOrders(
    @Param('userId') userId: string,
    @Query('page', new DefaultValuePipe(1), ParseBoolPipe as unknown as typeof Number) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseBoolPipe as unknown as typeof Number) limit: number,
    @Query('types') types?: string,
    @Query('statuses') statuses?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('minTotal', ParseBoolPipe as unknown as typeof Number) minTotal?: number,
    @Query('maxTotal', ParseBoolPipe as unknown as typeof Number) maxTotal?: number,
    @Query('includeCancelled', new DefaultValuePipe(false), ParseBoolPipe) includeCancelled: boolean,
  ) {
    const filters: OrderFilterDto = {
      types: types ? (types.split(',') as never) : undefined,
      statuses: statuses ? statuses.split(',') : undefined,
      startDate,
      endDate,
      minTotal,
      maxTotal,
      includeCancelled,
    };

    return this.orderService.getUserOrders(userId, filters, page, limit);
  }

  @Get('restaurant/:restaurantId')
  @ApiOperation({ summary: 'Get orders for a restaurant' })
  @ApiParam({ name: 'restaurantId', description: 'Restaurant ID' })
  @ApiQuery({ name: 'status', required: false, description: 'Filter by status' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 20 })
  async getRestaurantOrders(
    @Param('restaurantId') restaurantId: string,
    @Query('status') status?: string,
    @Query('page', new DefaultValuePipe(1), ParseBoolPipe as unknown as typeof Number) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseBoolPipe as unknown as typeof Number) limit: number,
  ) {
    return this.orderService.getRestaurantOrders(restaurantId, status, page, limit);
  }

  @Get(':id/tracking')
  @ApiOperation({ summary: 'Get order tracking information' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  async getOrderTracking(@Param('id') id: string) {
    return this.orderService.getOrderTracking(id);
  }

  // ==================== Order Status Management ====================

  @Put(':id/status')
  @ApiOperation({ summary: 'Update order status' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiResponse({ status: 200, description: 'Status updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid status transition' })
  async updateOrderStatus(
    @Param('id') id: string,
    @Body() data: UpdateOrderStatusDto,
    @Headers('x-user-id') userId?: string,
  ) {
    return this.orderService.updateOrderStatus(id, data, userId);
  }

  // ==================== Order Cancellation ====================

  @Post(':id/cancel')
  @ApiOperation({ summary: 'Cancel an order' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiResponse({ status: 200, description: 'Order cancelled successfully' })
  @ApiResponse({ status: 400, description: 'Order cannot be cancelled' })
  async cancelOrder(
    @Param('id') id: string,
    @Body() data: CancelOrderDto,
    @Headers('x-user-id') userId?: string,
  ) {
    return this.orderService.cancelOrder(id, data, userId);
  }

  // ==================== Order Rating ====================

  @Post(':id/rate')
  @ApiOperation({ summary: 'Rate an order' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiResponse({ status: 200, description: 'Order rated successfully' })
  @ApiResponse({ status: 400, description: 'Cannot rate this order' })
  async rateOrder(
    @Param('id') id: string,
    @Body() data: RateOrderDto,
    @Headers('x-user-id') userId: string,
  ) {
    return this.orderService.rateOrder(id, data, userId);
  }

  // ==================== Reorder ====================

  @Post(':id/reorder')
  @ApiOperation({ summary: 'Reorder from order history' })
  @ApiParam({ name: 'id', description: 'Order ID to reorder' })
  @ApiResponse({ status: 201, description: 'Order created from history' })
  async reorder(
    @Param('id') id: string,
    @Headers('x-user-id') customerId: string,
  ) {
    return this.orderService.reorder(id, customerId);
  }

  // ==================== Restaurant Order Management ====================

  @Post(':id/confirm')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Confirm order (restaurant)' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  async confirmOrder(@Param('id') id: string) {
    return this.orderService.updateOrderStatus(id, { status: 'CONFIRMED' });
  }

  @Post(':id/prepare')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Start preparing order (restaurant)' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  async startPreparing(@Param('id') id: string) {
    return this.orderService.updateOrderStatus(id, { status: 'PREPARING' });
  }

  @Post(':id/ready')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Mark order as ready for pickup (restaurant)' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  async markReady(@Param('id') id: string) {
    return this.orderService.updateOrderStatus(id, { status: 'READY_FOR_PICKUP' });
  }

  @Post(':id/pickup')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Mark order as picked up (driver)' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  async markPickedUp(@Param('id') id: string) {
    return this.orderService.updateOrderStatus(id, { status: 'PICKED_UP' });
  }

  @Post(':id/deliver')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Mark order as delivered (driver)' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  async markDelivered(@Param('id') id: string) {
    return this.orderService.updateOrderStatus(id, { status: 'DELIVERED' });
  }
}
