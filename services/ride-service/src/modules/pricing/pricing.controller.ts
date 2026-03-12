import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  Query,
  Logger,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { PricingService } from './pricing.service';
import { FareEstimateDto, SurgePricingDto } from '../ride/dto/fare-estimate.dto';
import {
  PricingConfigDto,
  UpdatePricingConfigDto,
  ApplyPromoCodeDto,
} from './dto/pricing.dto';
import { VehicleType } from '../ride/enums/ride.enums';

@ApiTags('pricing')
@ApiBearerAuth()
@Controller('pricing')
export class PricingController {
  private readonly logger = new Logger(PricingController.name);

  constructor(private readonly pricingService: PricingService) {}

  @Post('estimate')
  @ApiOperation({ summary: 'Get fare estimate for a route' })
  @ApiResponse({ status: 200, description: 'Fare estimate calculated' })
  @ApiResponse({ status: 400, description: 'Invalid coordinates' })
  async estimateFare(@Body() dto: FareEstimateDto) {
    this.logger.log('Calculating fare estimate');
    return this.pricingService.calculateFare(dto);
  }

  @Post('estimate/vehicles')
  @ApiOperation({ summary: 'Get fare estimates for all vehicle types' })
  @ApiResponse({ status: 200, description: 'Vehicle options with fares' })
  async getVehicleOptions(@Body() dto: Omit<FareEstimateDto, 'vehicleType' | 'promoCode'>) {
    this.logger.log('Getting vehicle options');
    return this.pricingService.getVehicleOptions(dto);
  }

  @Get('surge')
  @ApiOperation({ summary: 'Get current surge pricing for a location' })
  @ApiQuery({ name: 'lat', description: 'Latitude' })
  @ApiQuery({ name: 'lng', description: 'Longitude' })
  @ApiResponse({ status: 200, description: 'Surge pricing info' })
  async getSurgePricing(
    @Query('lat') lat: number,
    @Query('lng') lng: number,
  ) {
    this.logger.log(`Getting surge pricing for ${lat}, ${lng}`);
    return this.pricingService.getSurgePricing(lat, lng);
  }

  @Get('config')
  @ApiOperation({ summary: 'Get pricing configuration' })
  @ApiQuery({ name: 'vehicleType', required: false, enum: VehicleType })
  @ApiResponse({ status: 200, description: 'Pricing configuration' })
  async getPricingConfig(@Query('vehicleType') vehicleType?: VehicleType) {
    if (vehicleType) {
      return this.pricingService.getPricingConfig(vehicleType);
    }
    // Return all configs
    return Object.values(VehicleType).map((vt) => ({
      vehicleType: vt,
      config: this.pricingService.getPricingConfig(vt),
    }));
  }

  @Put('config/:vehicleType')
  @ApiOperation({ summary: 'Update pricing configuration (admin)' })
  @ApiQuery({ name: 'vehicleType', enum: VehicleType })
  @ApiResponse({ status: 200, description: 'Configuration updated' })
  async updatePricingConfig(
    @Param('vehicleType') vehicleType: VehicleType,
    @Body() dto: UpdatePricingConfigDto,
  ) {
    this.logger.log(`Updating pricing config for ${vehicleType}`);
    // Note: This would need persistence in production
    return { message: 'Configuration updated', vehicleType, ...dto };
  }

  @Post('promo/validate')
  @ApiOperation({ summary: 'Validate and apply promo code' })
  @ApiResponse({ status: 200, description: 'Promo code validation result' })
  @ApiResponse({ status: 400, description: 'Invalid promo code' })
  async validatePromoCode(@Body() dto: ApplyPromoCodeDto) {
    this.logger.log(`Validating promo code: ${dto.code}`);
    return this.pricingService.applyPromoCode(dto.code, dto.rideFare, dto.vehicleType);
  }

  @Get('promo/:code')
  @ApiOperation({ summary: 'Get promo code details' })
  @ApiResponse({ status: 200, description: 'Promo code details' })
  @ApiResponse({ status: 404, description: 'Promo code not found' })
  async getPromoCodeDetails(@Param('code') code: string) {
    this.logger.log(`Getting promo code details: ${code}`);
    // Note: This would need implementation with database
    return { code: code.toUpperCase(), message: 'Promo code lookup not implemented' };
  }
}
