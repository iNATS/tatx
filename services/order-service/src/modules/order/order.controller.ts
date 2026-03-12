import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { OrderService } from './order.service';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Create order' })
  async create(@Body() data: unknown) {
    return this.orderService.create(data as never);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order by ID' })
  async findById(@Param('id') id: string) {
    return this.orderService.findById(id);
  }

  @Get('customer/:customerId')
  @ApiOperation({ summary: 'Get orders by customer' })
  async findByCustomerId(@Param('customerId') customerId: string) {
    return this.orderService.findByCustomerId(customerId);
  }

  @Get('restaurant/:restaurantId')
  @ApiOperation({ summary: 'Get orders by restaurant' })
  async findByRestaurantId(@Param('restaurantId') restaurantId: string) {
    return this.orderService.findByRestaurantId(restaurantId);
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Update order status' })
  async updateStatus(@Param('id') id: string, @Body() data: { status: string }) {
    return this.orderService.updateStatus(id, data.status);
  }

  @Put(':id/assign')
  @ApiOperation({ summary: 'Assign driver to order' })
  async assignDriver(@Param('id') id: string, @Body() data: { driverId: string }) {
    return this.orderService.assignDriver(id, data.driverId);
  }

  @Put(':id/cancel')
  @ApiOperation({ summary: 'Cancel order' })
  async cancel(@Param('id') id: string, @Body() data: { reason: string }) {
    return this.orderService.cancel(id, data.reason);
  }
}
