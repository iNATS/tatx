import { Injectable } from '@nestjs/common';
import { prisma } from '@tatx/database';

@Injectable()
export class DocumentsService {
  async findByDriverId(driverId: string) {
    return prisma.driverDocument.findMany({ where: { driverId } });
  }

  async upload(driverId: string, data: { type: string; documentUrl: string; expiryDate?: Date }) {
    return prisma.driverDocument.create({ data: { ...data, driverId } });
  }

  async approve(documentId: string) {
    return prisma.driverDocument.update({
      where: { id: documentId },
      data: { status: 'APPROVED', verifiedAt: new Date() },
    });
  }

  async reject(documentId: string, reason: string) {
    return prisma.driverDocument.update({
      where: { id: documentId },
      data: { status: 'REJECTED', rejectionReason: reason },
    });
  }
}
