import { Controller, Get, Put, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { DriverService } from './driver.service';

@ApiTags('drivers')
@Controller('drivers')
export class DriverController {
  constructor(private driverService: DriverService) {}

  @Get()
  @ApiOperation({ summary: 'Get all drivers' })
  async findAll() {
    return this.driverService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get driver by ID' })
  async findById(@Param('id') id: string) {
    return this.driverService.findById(id);
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Update driver status' })
  async updateStatus(
    @Param('id') id: string,
    @Body() data: { status: 'ONLINE' | 'OFFLINE' | 'BUSY' },
  ) {
    return this.driverService.updateStatus(id, data.status);
  }

  @Get('nearby/search')
  @ApiOperation({ summary: 'Find nearby drivers' })
  async findNearby(
    @Query('lat') lat: number,
    @Query('lng') lng: number,
    @Query('radius') radius: number,
  ) {
    return this.driverService.findNearby(lat, lng, radius);
  }
}
