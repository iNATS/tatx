import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { DocumentsService } from './documents.service';

@ApiTags('documents')
@Controller('documents')
export class DocumentsController {
  constructor(private documentsService: DocumentsService) {}

  @Get('driver/:driverId')
  @ApiOperation({ summary: 'Get driver documents' })
  async findByDriverId(@Param('driverId') driverId: string) {
    return this.documentsService.findByDriverId(driverId);
  }

  @Post('driver/:driverId')
  @ApiOperation({ summary: 'Upload driver document' })
  async upload(@Param('driverId') driverId: string, @Body() data: unknown) {
    return this.documentsService.upload(driverId, data as never);
  }

  @Put(':id/approve')
  @ApiOperation({ summary: 'Approve document' })
  async approve(@Param('id') id: string) {
    return this.documentsService.approve(id);
  }

  @Put(':id/reject')
  @ApiOperation({ summary: 'Reject document' })
  async reject(@Param('id') id: string, @Body() data: { reason: string }) {
    return this.documentsService.reject(id, data.reason);
  }
}
