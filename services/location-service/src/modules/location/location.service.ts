import { Injectable } from '@nestjs/common';
import { prisma } from '@tatx/database';

@Injectable()
export class LocationService {
  async updateDriverLocation(driverId: string, data: {
    latitude: number; longitude: number; heading?: number; speed?: number; accuracy?: number;
  }) {
    // Upsert current location
    await prisma.location.upsert({
      where: { driverId },
      update: { ...data, timestamp: new Date() },
      create: { driverId, ...data },
    });

    // Store in history
    await prisma.locationHistory.create({
      data: {
        entityType: 'DRIVER',
        entityId: driverId,
        latitude: data.latitude,
        longitude: data.longitude,
        heading: data.heading,
        speed: data.speed,
      },
    });

    return { success: true, driverId, ...data };
  }

  async getDriverLocation(driverId: string) {
    return prisma.location.findUnique({ where: { driverId } });
  }

  async getDriverHistory(driverId: string, limit: number = 100) {
    return prisma.locationHistory.findMany({
      where: { entityType: 'DRIVER', entityId: driverId },
      orderBy: { timestamp: 'desc' },
      take: limit,
    });
  }

  async trackEntity(entityType: string, entityId: string, data: {
    latitude: number; longitude: number; heading?: number; speed?: number;
  }) {
    await prisma.locationHistory.create({
      data: { entityType, entityId, ...data },
    });
    return { success: true };
  }
}
