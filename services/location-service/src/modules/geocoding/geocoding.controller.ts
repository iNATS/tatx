import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { GeocodingService } from './geocoding.service';

@ApiTags('geocoding')
@Controller('geocoding')
export class GeocodingController {
  constructor(private geocodingService: GeocodingService) {}

  @Get()
  @ApiOperation({ summary: 'Geocode address' })
  async geocode(@Query('address') address: string) {
    return this.geocodingService.geocode(address);
  }

  @Get('reverse')
  @ApiOperation({ summary: 'Reverse geocode coordinates' })
  async reverseGeocode(@Query('lat') lat: number, @Query('lng') lng: number) {
    return this.geocodingService.reverseGeocode(lat, lng);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search places' })
  async searchPlaces(
    @Query('query') query: string,
    @Query('lat') lat?: number,
    @Query('lng') lng?: number,
    @Query('radius') radius?: number,
  ) {
    return this.geocodingService.searchPlaces(query, lat, lng, radius);
  }
}
