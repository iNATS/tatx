import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Query,
  Logger,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { TrackingService } from './tracking.service';
import {
  UpdateDriverLocationDto,
  RideLocationUpdateDto,
  TrackingSessionDto,
  RouteOptimizationDto,
} from './dto/tracking.dto';

@ApiTags('tracking')
@ApiBearerAuth()
@Controller('tracking')
export class TrackingController {
  private readonly logger = new Logger(TrackingController.name);

  constructor(private readonly trackingService: TrackingService) {}

  @Post('driver/location')
  @ApiOperation({ summary: 'Update driver location' })
  @ApiResponse({ status: 200, description: 'Location updated' })
  @ApiResponse({ status: 400, description: 'Invalid location data' })
  async updateDriverLocation(@Body() dto: UpdateDriverLocationDto) {
    this.logger.log(
      `Updating driver ${dto.driverId} location for ride ${dto.rideId}`,
    );
    await this.trackingService.updateDriverLocation(dto);
    return { success: true };
  }

  @Post('ride/:rideId/location')
  @ApiOperation({ summary: 'Update ride location (for in-progress rides)' })
  @ApiParam({ name: 'rideId', description: 'Ride ID' })
  @ApiResponse({ status: 200, description: 'Location updated' })
  async updateRideLocation(
    @Param('rideId', ParseUUIDPipe) rideId: string,
    @Body() dto: RideLocationUpdateDto,
  ) {
    this.logger.log(`Updating location for ride ${rideId}`);
    // This would typically be called by the driver app
    await this.trackingService.updateDriverLocation({
      driverId: '', // Would need to get from ride
      rideId,
      latitude: dto.latitude,
      longitude: dto.longitude,
      speed: dto.speed,
      heading: dto.heading,
    });
    return { success: true };
  }

  @Get('ride/:rideId')
  @ApiOperation({ summary: 'Get ride tracking information' })
  @ApiParam({ name: 'rideId', description: 'Ride ID' })
  @ApiResponse({ status: 200, description: 'Tracking info retrieved' })
  @ApiResponse({ status: 404, description: 'Ride not found' })
  async getRideTracking(@Param('rideId', ParseUUIDPipe) rideId: string) {
    this.logger.log(`Getting tracking info for ride ${rideId}`);
    return this.trackingService.getRideTrackingInfo(rideId);
  }

  @Get('driver/:driverId/location')
  @ApiOperation({ summary: 'Get driver current location' })
  @ApiParam({ name: 'driverId', description: 'Driver ID' })
  @ApiResponse({ status: 200, description: 'Driver location retrieved' })
  @ApiResponse({ status: 404, description: 'Driver location not found' })
  async getDriverLocation(
    @Param('driverId') driverId: string,
    @Query('rideId') rideId?: string,
  ) {
    this.logger.log(`Getting location for driver ${driverId}`);
    if (!rideId) {
      // Get latest location from database
      const location = await prisma.location.findUnique({
        where: { driverId },
        select: {
          latitude: true,
          longitude: true,
          lastUpdated: true,
        },
      });

      if (!location) {
        return { error: 'Driver location not found' };
      }

      return {
        driverId,
        latitude: Number(location.latitude),
        longitude: Number(location.longitude),
        lastUpdated: location.lastUpdated,
      };
    }

    return this.trackingService.getDriverLocation(rideId, driverId);
  }

  @Post('session/start')
  @ApiOperation({ summary: 'Start tracking session' })
  @ApiResponse({ status: 200, description: 'Session started' })
  async startTrackingSession(@Body() dto: TrackingSessionDto) {
    this.logger.log(
      `Starting tracking session for user ${dto.userId} on ride ${dto.rideId}`,
    );
    this.trackingService.startTrackingSession(dto.rideId, dto.userId);
    return { success: true };
  }

  @Post('session/ping')
  @ApiOperation({ summary: 'Ping tracking session (keep alive)' })
  @ApiResponse({ status: 200, description: 'Session pinged' })
  async pingTrackingSession(@Body() dto: TrackingSessionDto) {
    this.trackingService.updateTrackingSession(dto.rideId, dto.userId);
    return { success: true };
  }

  @Post('session/end')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'End tracking session' })
  @ApiResponse({ status: 200, description: 'Session ended' })
  async endTrackingSession(@Body() dto: TrackingSessionDto) {
    this.logger.log(
      `Ending tracking session for user ${dto.userId} on ride ${dto.rideId}`,
    );
    this.trackingService.endTrackingSession(dto.rideId, dto.userId);
    return { success: true };
  }

  @Get('ride/:rideId/sessions')
  @ApiOperation({ summary: 'Get active tracking sessions for a ride' })
  @ApiParam({ name: 'rideId', description: 'Ride ID' })
  @ApiResponse({ status: 200, description: 'Active sessions count' })
  async getActiveSessions(@Param('rideId', ParseUUIDPipe) rideId: string) {
    const count = this.trackingService.getActiveSessions(rideId);
    return { rideId, activeSessions: count };
  }

  @Post('route')
  @ApiOperation({ summary: 'Calculate route between two points' })
  @ApiResponse({ status: 200, description: 'Route calculated' })
  async calculateRoute(@Body() dto: RouteOptimizationDto) {
    this.logger.log('Calculating route');
    return this.trackingService.calculateRoute(
      dto.startLat,
      dto.startLng,
      dto.endLat,
      dto.endLng,
    );
  }

  @Get('route/distance')
  @ApiOperation({ summary: 'Calculate distance between two points' })
  @ApiQuery({ name: 'startLat', description: 'Start latitude' })
  @ApiQuery({ name: 'startLng', description: 'Start longitude' })
  @ApiQuery({ name: 'endLat', description: 'End latitude' })
  @ApiQuery({ name: 'endLng', description: 'End longitude' })
  @ApiResponse({ status: 200, description: 'Distance calculated' })
  async calculateDistance(
    @Query('startLat') startLat: number,
    @Query('startLng') startLng: number,
    @Query('endLat') endLat: number,
    @Query('endLng') endLng: number,
  ) {
    const distance = this.trackingService['calculateDistance'](
      startLat,
      startLng,
      endLat,
      endLng,
    );
    return {
      distance: Math.round(distance * 100) / 100,
      unit: 'km',
    };
  }
}

// Import prisma for driver location lookup
import { prisma } from '@tatx/database';
