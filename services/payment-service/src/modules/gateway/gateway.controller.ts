import { Controller, Get, Post, Body, Param, Headers, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { GatewayService } from './gateway.service';
import { GatewayProvider, GatewayStatusResponse } from '../../dto/gateway.dto';

@ApiTags('Gateway')
@Controller('gateway')
export class GatewayController {
  constructor(private gatewayService: GatewayService) {}

  @Get('providers')
  @ApiOperation({ summary: 'Get available payment gateway providers' })
  getAvailableProviders(): GatewayProvider[] {
    return this.gatewayService.getAvailableProviders();
  }

  @Get('status')
  @ApiOperation({ summary: 'Get status of all gateway providers' })
  getGatewayStatus(): GatewayStatusResponse[] {
    const strategies = this.gatewayService.getAllStrategies();
    return strategies.map((strategy) => ({
      name: strategy.getProvider(),
      enabled: strategy.isAvailable(),
      healthy: strategy.isAvailable(),
      lastCheck: new Date(),
    }));
  }
}
