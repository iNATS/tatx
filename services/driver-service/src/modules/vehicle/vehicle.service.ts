import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '@tatx/database';

@Injectable()
export class VehicleService {
  async findById(id: string) {
    const vehicle = await prisma.vehicle.findUnique({
      where: { id },
      include: { driver: true, documents: true },
    });
    if (!vehicle) throw new NotFoundException('Vehicle not found');
    return vehicle;
  }

  async findByDriverId(driverId: string) {
    return prisma.vehicle.findUnique({
      where: { driverId },
      include: { documents: true },
    });
  }

  async create(driverId: string, data: {
    type: string; make: string; model: string; year: number;
    color: string; licensePlate: string; registrationNo: string;
    insuranceExpiry: Date;
  }) {
    return prisma.vehicle.create({
      data: { ...data, driverId },
    });
  }
}
