import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Health check' })
  async healthCheck() {
    return { status: 'healthy', service: 'notification-service', timestamp: new Date().toISOString(), uptime: process.uptime() };
  }

  @Get('ready')
  async readinessCheck() {
    return { status: 'ready', service: 'notification-service', timestamp: new Date().toISOString() };
  }

  @Get('live')
  async livenessCheck() {
    return { status: 'alive', service: 'notification-service', timestamp: new Date().toISOString() };
  }
}
