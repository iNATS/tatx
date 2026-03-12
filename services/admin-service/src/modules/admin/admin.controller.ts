import { Controller, Get, Put, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AdminService } from './admin.service';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Get dashboard statistics' })
  async getDashboardStats() {
    return this.adminService.getDashboardStats();
  }

  @Get('users')
  @ApiOperation({ summary: 'Get all users' })
  async getAllUsers() {
    return this.adminService.getAllUsers();
  }

  @Get('users/:id')
  @ApiOperation({ summary: 'Get user by ID' })
  async getUserById(@Param('id') id: string) {
    return this.adminService.getUserById(id);
  }

  @Put('users/:id/deactivate')
  @ApiOperation({ summary: 'Deactivate user' })
  async deactivateUser(@Param('id') id: string) {
    return this.adminService.deactivateUser(id);
  }

  @Put('drivers/:id/approve')
  @ApiOperation({ summary: 'Approve driver' })
  async approveDriver(@Param('id') driverId: string) {
    return this.adminService.approveDriver(driverId);
  }

  @Put('drivers/:id/reject')
  @ApiOperation({ summary: 'Reject driver' })
  async rejectDriver(@Param('id') driverId: string, @Body() data: { reason: string }) {
    return this.adminService.rejectDriver(driverId, data.reason);
  }
}
