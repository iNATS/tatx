import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { LocationService } from './location.service';

@ApiTags('location')
@Controller('location')
export class LocationController {
  constructor(private locationService: LocationService) {}

  @Post('driver/:driverId')
  @ApiOperation({ summary: 'Update driver location' })
  async updateDriverLocation(@Param('driverId') driverId: string, @Body() data: {
    latitude: number; longitude: number; heading?: number; speed?: number; accuracy?: number;
  }) {
    return this.locationService.updateDriverLocation(driverId, data);
  }

  @Get('driver/:driverId')
  @ApiOperation({ summary: 'Get driver location' })
  async getDriverLocation(@Param('driverId') driverId: string) {
    return this.locationService.getDriverLocation(driverId);
  }

  @Get('driver/:driverId/history')
  @ApiOperation({ summary: 'Get driver location history' })
  async getDriverHistory(@Param('driverId') driverId: string, @Query('limit') limit?: number) {
    return this.locationService.getDriverHistory(driverId, limit ? parseInt(limit) : 100);
  }

  @Post('track/:entityType/:entityId')
  @ApiOperation({ summary: 'Track entity location' })
  async trackEntity(
    @Param('entityType') entityType: string,
    @Param('entityId') entityId: string,
    @Body() data: { latitude: number; longitude: number; heading?: number; speed?: number },
  ) {
    return this.locationService.trackEntity(entityType, entityId, data);
  }
}
