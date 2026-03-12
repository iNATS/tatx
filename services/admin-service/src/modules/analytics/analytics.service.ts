import { Injectable } from '@nestjs/common';
import { prisma } from '@tatx/database';

@Injectable()
export class AnalyticsService {
  async getRideAnalytics(startDate?: Date, endDate?: Date) {
    const rides = await prisma.ride.groupBy({
      by: ['status'],
      _count: true,
      ...(startDate && endDate && { where: { createdAt: { gte: startDate, lte: endDate } } }),
    });

    const revenue = await prisma.ride.aggregate({
      _sum: { finalFare: true },
      ...(startDate && endDate && { where: { createdAt: { gte: startDate, lte: endDate } } }),
    });

    return { rides, totalRevenue: revenue._sum.finalFare || 0 };
  }

  async getOrderAnalytics(startDate?: Date, endDate?: Date) {
    const orders = await prisma.order.groupBy({
      by: ['status'],
      _count: true,
      ...(startDate && endDate && { where: { createdAt: { gte: startDate, lte: endDate } } }),
    });

    const revenue = await prisma.order.aggregate({
      _sum: { total: true },
      ...(startDate && endDate && { where: { createdAt: { gte: startDate, lte: endDate } } }),
    });

    return { orders, totalRevenue: revenue._sum.total || 0 };
  }

  async getDriverPerformance(driverId?: string) {
    const where = driverId ? { driverId } : {};
    
    const rides = await prisma.ride.findMany({
      where,
      include: { driver: true },
    });

    const totalRides = rides.length;
    const completedRides = rides.filter(r => r.status === 'COMPLETED').length;
    const cancelledRides = rides.filter(r => r.status === 'CANCELLED').length;
    const totalRevenue = rides.reduce((sum, r) => sum + (r.finalFare || 0), 0);

    return { totalRides, completedRides, cancelledRides, totalRevenue };
  }
}
