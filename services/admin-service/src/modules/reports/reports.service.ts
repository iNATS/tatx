import { Injectable } from '@nestjs/common';
import { prisma } from '@tatx/database';

@Injectable()
export class ReportsService {
  async generateDailyReport(date: Date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const [rides, orders, newUsers, revenue] = await Promise.all([
      prisma.ride.count({ where: { createdAt: { gte: startOfDay, lte: endOfDay } } }),
      prisma.order.count({ where: { createdAt: { gte: startOfDay, lte: endOfDay } } }),
      prisma.user.count({ where: { createdAt: { gte: startOfDay, lte: endOfDay } } }),
      prisma.payment.aggregate({
        where: { createdAt: { gte: startOfDay, lte: endOfDay }, status: 'COMPLETED' },
        _sum: { amount: true },
      }),
    ]);

    return {
      date,
      rides,
      orders,
      newUsers,
      revenue: revenue._sum.amount || 0,
    };
  }

  async generateMonthlyReport(year: number, month: number) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const [rides, orders, newUsers, revenue] = await Promise.all([
      prisma.ride.count({ where: { createdAt: { gte: startDate, lte: endDate } } }),
      prisma.order.count({ where: { createdAt: { gte: startDate, lte: endDate } } }),
      prisma.user.count({ where: { createdAt: { gte: startDate, lte: endDate } } }),
      prisma.payment.aggregate({
        where: { createdAt: { gte: startDate, lte: endDate }, status: 'COMPLETED' },
        _sum: { amount: true },
      }),
    ]);

    return {
      year,
      month,
      rides,
      orders,
      newUsers,
      revenue: revenue._sum.amount || 0,
    };
  }
}
