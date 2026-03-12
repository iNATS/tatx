import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { NotificationService } from './notification.service';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Post()
  @ApiOperation({ summary: 'Create notification' })
  async create(@Body() data: unknown) {
    return this.notificationService.create(data as never);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get notifications by user' })
  async findByUserId(@Param('userId') userId: string, @Query('unreadOnly') unreadOnly?: string) {
    return this.notificationService.findByUserId(userId, unreadOnly === 'true');
  }

  @Put(':id/read')
  @ApiOperation({ summary: 'Mark notification as read' })
  async markAsRead(@Param('id') id: string) {
    return this.notificationService.markAsRead(id);
  }

  @Post('user/:userId/read-all')
  @ApiOperation({ summary: 'Mark all notifications as read' })
  async markAllAsRead(@Param('userId') userId: string) {
    return this.notificationService.markAllAsRead(userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete notification' })
  async delete(@Param('id') id: string) {
    return this.notificationService.delete(id);
  }

  @Post('email')
  @ApiOperation({ summary: 'Send email' })
  async sendEmail(@Body() data: { to: string; subject: string; body: string }) {
    return this.notificationService.sendEmail(data.to, data.subject, data.body);
  }

  @Post('sms')
  @ApiOperation({ summary: 'Send SMS' })
  async sendSms(@Body() data: { to: string; body: string }) {
    return this.notificationService.sendSms(data.to, data.body);
  }

  @Post('push')
  @ApiOperation({ summary: 'Send push notification' })
  async sendPush(@Body() data: { userId: string; title: string; body: string; data?: Record<string, unknown> }) {
    return this.notificationService.sendPush(data.userId, data.title, data.body, data.data);
  }
}
