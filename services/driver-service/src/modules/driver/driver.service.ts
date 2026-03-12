import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '@tatx/database';

@Injectable()
export class DriverService {
  async findAll() {
    return prisma.driver.findMany({ include: { user: true, vehicle: true } });
  }

  async findById(id: string) {
    const driver = await prisma.driver.findUnique({
      where: { id },
      include: { user: true, vehicle: true, documents: true },
    });
    if (!driver) throw new NotFoundException('Driver not found');
    return driver;
  }

  async updateStatus(id: string, status: 'ONLINE' | 'OFFLINE' | 'BUSY') {
    return prisma.driver.update({ where: { id }, data: { status } });
  }

  async findNearby(latitude: number, longitude: number, radius: number) {
    // Simplified - in production use PostGIS
    return prisma.driver.findMany({
      where: { status: 'ONLINE' },
      include: { user: true, vehicle: true, currentLocation: true },
    });
  }
}
