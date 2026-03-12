import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ProfileService } from './profile.service';

@ApiTags('profiles')
@Controller('profiles')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get('customer/:userId')
  @ApiOperation({ summary: 'Get customer profile' })
  async getCustomerProfile(@Param('userId') userId: string) {
    return this.profileService.getCustomerProfile(userId);
  }

  @Get('driver/:userId')
  @ApiOperation({ summary: 'Get driver profile' })
  async getDriverProfile(@Param('userId') userId: string) {
    return this.profileService.getDriverProfile(userId);
  }

  @Get('merchant/:userId')
  @ApiOperation({ summary: 'Get merchant profile' })
  async getMerchantProfile(@Param('userId') userId: string) {
    return this.profileService.getMerchantProfile(userId);
  }
}
