import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '@tatx/database';

@Injectable()
export class AdminService {
  async getDashboardStats() {
    const [
      totalUsers,
      totalDrivers,
      totalMerchants,
      totalRides,
      totalOrders,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.driver.count(),
      prisma.merchant.count(),
      prisma.ride.count(),
      prisma.order.count(),
    ]);

    const totalRevenue = await prisma.payment.aggregate({
      where: { status: 'COMPLETED' },
      _sum: { amount: true },
    });

    return {
      totalUsers,
      totalDrivers,
      totalMerchants,
      totalRides,
      totalOrders,
      totalRevenue: totalRevenue._sum.amount || 0,
    };
  }

  async getAllUsers() {
    return prisma.user.findMany({
      include: { customer: true, driver: true, merchant: true },
    });
  }

  async getUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { customer: true, driver: true, merchant: true },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async deactivateUser(id: string) {
    return prisma.user.update({ where: { id }, data: { isActive: false } });
  }

  async approveDriver(driverId: string) {
    return prisma.driver.update({
      where: { id: driverId },
      data: { verifiedAt: new Date() },
    });
  }

  async rejectDriver(driverId: string, reason: string) {
    return prisma.driver.update({
      where: { id: driverId },
      data: { rejectedReason: reason },
    });
  }
}
