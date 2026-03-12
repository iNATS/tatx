import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { VehicleService } from './vehicle.service';

@ApiTags('vehicles')
@Controller('vehicles')
export class VehicleController {
  constructor(private vehicleService: VehicleService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get vehicle by ID' })
  async findById(@Param('id') id: string) {
    return this.vehicleService.findById(id);
  }

  @Get('driver/:driverId')
  @ApiOperation({ summary: 'Get vehicle by driver ID' })
  async findByDriverId(@Param('driverId') driverId: string) {
    return this.vehicleService.findByDriverId(driverId);
  }

  @Post('driver/:driverId')
  @ApiOperation({ summary: 'Create vehicle for driver' })
  async create(@Param('driverId') driverId: string, @Body() data: unknown) {
    return this.vehicleService.create(driverId, data as never);
  }
}
