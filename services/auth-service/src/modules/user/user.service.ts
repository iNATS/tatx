import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '@tatx/database';

@Injectable()
export class UserService {
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

    const { password, ...result } = user;
    return result;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { password, ...result } = user;
    return result;
  }

  async updateProfile(userId: string, data: {
    firstName?: string;
    lastName?: string;
    avatar?: string;
  }) {
    const user = await prisma.user.update({
      where: { id: userId },
      data,
    });

    const { password, ...result } = user;
    return result;
  }

  async deleteAccount(userId: string) {
    await prisma.user.update({
      where: { id: userId },
      data: { isActive: false },
    });

    return { message: 'Account deactivated successfully' };
  }
}
