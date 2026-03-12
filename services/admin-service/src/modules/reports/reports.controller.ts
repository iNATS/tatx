import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ReportsService } from './reports.service';

@ApiTags('reports')
@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get('daily')
  @ApiOperation({ summary: 'Generate daily report' })
  async generateDailyReport(@Query('date') date?: string) {
    return this.reportsService.generateDailyReport(date ? new Date(date) : new Date());
  }

  @Get('monthly')
  @ApiOperation({ summary: 'Generate monthly report' })
  async generateMonthlyReport(@Query('year') year?: string, @Query('month') month?: string) {
    const now = new Date();
    return this.reportsService.generateMonthlyReport(
      year ? parseInt(year) : now.getFullYear(),
      month ? parseInt(month) : now.getMonth() + 1,
    );
  }
}
