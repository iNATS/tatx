import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RoutingService } from './routing.service';

@ApiTags('routing')
@Controller('routing')
export class RoutingController {
  constructor(private routingService: RoutingService) {}

  @Get()
  @ApiOperation({ summary: 'Get route between two points' })
  async getRoute(
    @Query('originLat') originLat: number,
    @Query('originLng') originLng: number,
    @Query('destLat') destLat: number,
    @Query('destLng') destLng: number,
  ) {
    return this.routingService.getRoute(originLat, originLng, destLat, destLng);
  }

  @Get('matrix')
  @ApiOperation({ summary: 'Get distance matrix' })
  async getDistanceMatrix(@Query('origins') origins: string, @Query('destinations') destinations: string) {
    const originList = JSON.parse(origins);
    const destList = JSON.parse(destinations);
    return this.routingService.getDistanceMatrix(originList, destList);
  }
}
