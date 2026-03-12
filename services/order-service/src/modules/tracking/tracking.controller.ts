import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { TrackingService } from './tracking.service';

@ApiTags('tracking')
@Controller('tracking')
export class TrackingController {
  constructor(private trackingService: TrackingService) {}

  @Get(':orderId')
  @ApiOperation({ summary: 'Track order' })
  async trackOrder(@Param('orderId') orderId: string) {
    return this.trackingService.trackOrder(orderId);
  }
}
