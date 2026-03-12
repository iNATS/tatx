import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '@tatx/database';

@Injectable()
export class UserService {
  async findAll() {
    return prisma.user.findMany({
      include: {
        customer: true,
        driver: true,
        merchant: true,
      },
    });
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        customer: true,
        driver: true,
        merchant: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: string, data: Partial<{ firstName: string; lastName: string; avatar: string }>) {
    return prisma.user.update({
      where: { id },
      data,
    });
  }
}
