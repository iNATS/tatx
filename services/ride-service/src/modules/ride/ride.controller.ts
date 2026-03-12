import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  ParseEnumPipe,
  Logger,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { RideService } from './ride.service';
import { PricingService } from '../pricing/pricing.service';
import { CreateRideDto, UpdateRideDto } from './dto/create-ride.dto';
import { FareEstimateDto } from './dto/fare-estimate.dto';
import {
  AcceptRideDto,
  StartRideDto,
  CompleteRideDto,
  CancelRideDto,
  RateRideDto,
  AssignDriverDto,
  UpdateRideStatusDto,
} from './dto/ride-actions.dto';
import { RideHistoryQueryDto } from './dto/query-ride.dto';
import { RideStatus } from './enums/ride.enums';

@ApiTags('rides')
@ApiBearerAuth()
@Controller('rides')
export class RideController {
  private readonly logger = new Logger(RideController.name);

  constructor(
    private readonly rideService: RideService,
    private readonly pricingService: PricingService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new ride request' })
  @ApiResponse({
    status: 201,
    description: 'Ride created successfully',
  })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async create(@Body() createRideDto: CreateRideDto) {
    this.logger.log(`Creating ride for rider: ${createRideDto.riderId}`);
    return this.rideService.createRide(createRideDto);
  }

  @Post('/estimate')
  @ApiOperation({ summary: 'Get fare estimate for a route' })
  @ApiResponse({
    status: 200,
    description: 'Fare estimate calculated successfully',
  })
  @ApiResponse({ status: 400, description: 'Invalid coordinates' })
  async estimateFare(@Body() fareEstimateDto: FareEstimateDto) {
    this.logger.log('Calculating fare estimate');
    return this.pricingService.calculateFare(fareEstimateDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get ride details by ID' })
  @ApiParam({ name: 'id', description: 'Ride ID', example: 'cm1234567890' })
  @ApiResponse({ status: 200, description: 'Ride details retrieved' })
  @ApiResponse({ status: 404, description: 'Ride not found' })
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    this.logger.log(`Fetching ride: ${id}`);
    return this.rideService.findById(id);
  }

  @Get('number/:rideNumber')
  @ApiOperation({ summary: 'Get ride details by ride number' })
  @ApiParam({ name: 'rideNumber', description: 'Ride number', example: 'TATX-20240101-0001' })
  @ApiResponse({ status: 200, description: 'Ride details retrieved' })
  @ApiResponse({ status: 404, description: 'Ride not found' })
  async findByRideNumber(@Param('rideNumber') rideNumber: string) {
    this.logger.log(`Fetching ride by number: ${rideNumber}`);
    return this.rideService.findByRideNumber(rideNumber);
  }

  @Get('user/:userId/history')
  @ApiOperation({ summary: "Get user's ride history" })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 20 })
  @ApiQuery({ name: 'status', required: false, enum: RideStatus })
  @ApiResponse({ status: 200, description: 'Ride history retrieved' })
  async getRideHistory(
    @Param('userId') userId: string,
    @Query() query: RideHistoryQueryDto,
  ) {
    this.logger.log(`Fetching ride history for user: ${userId}`);
    return this.rideService.findByRiderId(userId, query);
  }

  @Get('user/:userId/active')
  @ApiOperation({ summary: "Get user's active rides" })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'Active rides retrieved' })
  async getActiveRides(@Param('userId') userId: string) {
    this.logger.log(`Fetching active rides for user: ${userId}`);
    return this.rideService.getActiveRides(userId);
  }

  @Get('driver/:driverId/history')
  @ApiOperation({ summary: "Get driver's ride history" })
  @ApiParam({ name: 'driverId', description: 'Driver ID' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 20 })
  @ApiResponse({ status: 200, description: 'Ride history retrieved' })
  async getDriverHistory(
    @Param('driverId') driverId: string,
    @Query() query: RideHistoryQueryDto,
  ) {
    this.logger.log(`Fetching ride history for driver: ${driverId}`);
    return this.rideService.findByDriverId(driverId, query);
  }

  @Post(':id/accept')
  @ApiOperation({ summary: 'Driver accepts a ride' })
  @ApiParam({ name: 'id', description: 'Ride ID' })
  @ApiResponse({ status: 200, description: 'Ride accepted' })
  @ApiResponse({ status: 404, description: 'Ride not found' })
  @ApiResponse({ status: 409, description: 'Ride not available for acceptance' })
  async acceptRide(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() acceptRideDto: AcceptRideDto,
  ) {
    this.logger.log(`Driver ${acceptRideDto.driverId} accepting ride: ${id}`);
    return this.rideService.acceptRide(id, acceptRideDto);
  }

  @Post(':id/arrive')
  @ApiOperation({ summary: 'Driver marks arrival at pickup location' })
  @ApiParam({ name: 'id', description: 'Ride ID' })
  @ApiResponse({ status: 200, description: 'Arrival marked' })
  @ApiResponse({ status: 403, description: 'Not the assigned driver' })
  @ApiResponse({ status: 409, description: 'Invalid ride status' })
  async driverArrived(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: { driverId: string },
  ) {
    this.logger.log(`Driver ${body.driverId} marking arrival for ride: ${id}`);
    return this.rideService.driverArrived(id, body.driverId);
  }

  @Post(':id/start')
  @ApiOperation({ summary: 'Driver starts the ride' })
  @ApiParam({ name: 'id', description: 'Ride ID' })
  @ApiResponse({ status: 200, description: 'Ride started' })
  @ApiResponse({ status: 403, description: 'Not the assigned driver' })
  @ApiResponse({ status: 409, description: 'Invalid ride status' })
  async startRide(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() startRideDto: StartRideDto,
  ) {
    this.logger.log(`Driver ${startRideDto.driverId} starting ride: ${id}`);
    return this.rideService.startRide(id, startRideDto);
  }

  @Post(':id/complete')
  @ApiOperation({ summary: 'Driver completes the ride' })
  @ApiParam({ name: 'id', description: 'Ride ID' })
  @ApiResponse({ status: 200, description: 'Ride completed' })
  @ApiResponse({ status: 403, description: 'Not the assigned driver' })
  @ApiResponse({ status: 409, description: 'Invalid ride status' })
  async completeRide(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() completeRideDto: CompleteRideDto,
  ) {
    this.logger.log(`Driver ${completeRideDto.driverId} completing ride: ${id}`);
    return this.rideService.completeRide(id, completeRideDto);
  }

  @Post(':id/cancel')
  @ApiOperation({ summary: 'Cancel a ride' })
  @ApiParam({ name: 'id', description: 'Ride ID' })
  @ApiResponse({ status: 200, description: 'Ride cancelled' })
  @ApiResponse({ status: 404, description: 'Ride not found' })
  @ApiResponse({ status: 409, description: 'Cannot cancel completed ride' })
  async cancelRide(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() cancelRideDto: CancelRideDto,
  ) {
    this.logger.log(`Cancelling ride: ${id} by ${cancelRideDto.cancelledBy}`);
    return this.rideService.cancelRide(id, cancelRideDto);
  }

  @Post(':id/rate')
  @ApiOperation({ summary: 'Rate a completed ride' })
  @ApiParam({ name: 'id', description: 'Ride ID' })
  @ApiResponse({ status: 200, description: 'Ride rated' })
  @ApiResponse({ status: 404, description: 'Ride not found' })
  @ApiResponse({ status: 409, description: 'Ride not completed or already rated' })
  async rateRide(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() rateRideDto: RateRideDto,
  ) {
    this.logger.log(`Rating ride: ${id} with ${rateRideDto.rating} stars`);
    return this.rideService.rateRide(id, rateRideDto);
  }

  @Post(':id/assign')
  @ApiOperation({ summary: 'Manually assign a driver to a ride' })
  @ApiParam({ name: 'id', description: 'Ride ID' })
  @ApiResponse({ status: 200, description: 'Driver assigned' })
  @ApiResponse({ status: 404, description: 'Ride or driver not found' })
  @ApiResponse({ status: 409, description: 'Ride already has a driver' })
  async assignDriver(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() assignDriverDto: AssignDriverDto,
  ) {
    this.logger.log(`Assigning driver ${assignDriverDto.driverId} to ride: ${id}`);
    return this.rideService.assignDriver(id, assignDriverDto);
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Update ride status' })
  @ApiParam({ name: 'id', description: 'Ride ID' })
  @ApiResponse({ status: 200, description: 'Status updated' })
  @ApiResponse({ status: 400, description: 'Invalid status transition' })
  @ApiResponse({ status: 404, description: 'Ride not found' })
  async updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateStatusDto: UpdateRideStatusDto,
  ) {
    this.logger.log(`Updating ride ${id} status to ${updateStatusDto.status}`);
    return this.rideService.updateStatus(id, updateStatusDto.status, updateStatusDto.driverId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update ride details' })
  @ApiParam({ name: 'id', description: 'Ride ID' })
  @ApiResponse({ status: 200, description: 'Ride updated' })
  @ApiResponse({ status: 404, description: 'Ride not found' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateRideDto: UpdateRideDto,
  ) {
    this.logger.log(`Updating ride: ${id}`);
    // Note: This would need to be implemented in the service
    // For now, returning the ride as-is
    return this.rideService.findById(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a ride (admin only)' })
  @ApiParam({ name: 'id', description: 'Ride ID' })
  @ApiResponse({ status: 204, description: 'Ride deleted' })
  @ApiResponse({ status: 404, description: 'Ride not found' })
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    this.logger.log(`Deleting ride: ${id}`);
    // Note: This would need to be implemented in the service
    // For now, just logging
  }
}
