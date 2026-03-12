import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';

@ApiTags('analytics')
@Controller('analytics')
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  @Get('rides')
  @ApiOperation({ summary: 'Get ride analytics' })
  async getRideAnalytics(@Query('startDate') startDate?: string, @Query('endDate') endDate?: string) {
    return this.analyticsService.getRideAnalytics(
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined,
    );
  }

  @Get('orders')
  @ApiOperation({ summary: 'Get order analytics' })
  async getOrderAnalytics(@Query('startDate') startDate?: string, @Query('endDate') endDate?: string) {
    return this.analyticsService.getOrderAnalytics(
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined,
    );
  }

  @Get('drivers')
  @ApiOperation({ summary: 'Get driver performance' })
  async getDriverPerformance(@Query('driverId') driverId?: string) {
    return this.analyticsService.getDriverPerformance(driverId);
  }
}
