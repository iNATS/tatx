import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Query,
  Logger,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { MatchingService } from './matching.service';
import { FindNearbyDriversDto, BroadcastRideRequestDto } from './dto/matching.dto';
import { VehicleType } from '../ride/enums/ride.enums';

@ApiTags('matching')
@ApiBearerAuth()
@Controller('matching')
export class MatchingController {
  private readonly logger = new Logger(MatchingController.name);

  constructor(private readonly matchingService: MatchingService) {}

  @Get('drivers')
  @ApiOperation({ summary: 'Find nearby drivers' })
  @ApiQuery({ name: 'lat', description: 'Latitude' })
  @ApiQuery({ name: 'lng', description: 'Longitude' })
  @ApiQuery({ name: 'radius', required: false, description: 'Search radius in km' })
  @ApiQuery({ name: 'vehicleType', required: false, enum: VehicleType })
  @ApiQuery({ name: 'limit', required: false, description: 'Max drivers to return' })
  @ApiResponse({ status: 200, description: 'Nearby drivers found' })
  async findNearbyDrivers(
    @Query('lat') lat: number,
    @Query('lng') lng: number,
    @Query('radius') radius?: number,
    @Query('vehicleType') vehicleType?: VehicleType,
    @Query('limit') limit?: number,
  ) {
    this.logger.log(`Finding drivers near ${lat}, ${lng}`);
    return this.matchingService.findNearbyDrivers(
      lat,
      lng,
      radius,
      vehicleType,
      limit ? parseInt(limit.toString(), 10) : undefined,
    );
  }

  @Post('broadcast')
  @ApiOperation({ summary: 'Broadcast ride request to nearby drivers' })
  @ApiResponse({ status: 200, description: 'Ride request broadcast' })
  @ApiResponse({ status: 404, description: 'Ride not found' })
  async broadcastRideRequest(@Body() dto: BroadcastRideRequestDto) {
    this.logger.log(`Broadcasting ride request: ${dto.rideId}`);
    return this.matchingService.findAndNotifyDrivers({
      rideId: dto.rideId,
      pickupLatitude: dto.pickupLatitude,
      pickupLongitude: dto.pickupLongitude,
      vehicleType: dto.vehicleType,
      estimatedFare: dto.estimatedFare,
    });
  }

  @Post(':rideId/accept')
  @ApiOperation({ summary: 'Driver accepts a ride request' })
  @ApiParam({ name: 'rideId', description: 'Ride ID' })
  @ApiResponse({ status: 200, description: 'Ride accepted' })
  @ApiResponse({ status: 404, description: 'Ride not found' })
  async acceptRide(
    @Param('rideId', ParseUUIDPipe) rideId: string,
    @Body() body: { driverId: string },
  ) {
    this.logger.log(`Driver ${body.driverId} accepting ride ${rideId}`);
    return this.matchingService.acceptRideRequest(rideId, body.driverId);
  }

  @Post(':rideId/decline')
  @ApiOperation({ summary: 'Driver declines a ride request' })
  @ApiParam({ name: 'rideId', description: 'Ride ID' })
  @ApiResponse({ status: 200, description: 'Ride declined' })
  async declineRide(
    @Param('rideId', ParseUUIDPipe) rideId: string,
    @Body() body: { driverId: string },
  ) {
    this.logger.log(`Driver ${body.driverId} declining ride ${rideId}`);
    await this.matchingService.declineRideRequest(rideId, body.driverId);
    return { success: true };
  }

  @Post(':rideId/cancel')
  @ApiOperation({ summary: 'Cancel pending ride request' })
  @ApiParam({ name: 'rideId', description: 'Ride ID' })
  @ApiResponse({ status: 200, description: 'Request cancelled' })
  async cancelRequest(@Param('rideId', ParseUUIDPipe) rideId: string) {
    this.logger.log(`Cancelling pending request for ride ${rideId}`);
    await this.matchingService.cancelPendingRequest(rideId);
    return { success: true };
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get matching statistics' })
  @ApiResponse({ status: 200, description: 'Matching statistics' })
  async getStats() {
    return this.matchingService.getMatchingStats();
  }

  @Get('drivers/available')
  @ApiOperation({ summary: 'Get count of available drivers' })
  @ApiQuery({ name: 'lat', required: false })
  @ApiQuery({ name: 'lng', required: false })
  @ApiResponse({ status: 200, description: 'Available driver count' })
  async getAvailableDriversCount(
    @Query('lat') lat?: number,
    @Query('lng') lng?: number,
  ) {
    const where: any = {
      status: 'ONLINE',
      canAcceptRides: true,
    };

    const count = await prisma.driver.count({ where });

    return {
      total: count,
      location: lat && lng ? { lat, lng } : null,
    };
  }
}

// Import prisma for the available drivers count
import { prisma } from '@tatx/database';
