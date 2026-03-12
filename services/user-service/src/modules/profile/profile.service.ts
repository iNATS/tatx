import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '@tatx/database';

@Injectable()
export class ProfileService {
  async getCustomerProfile(userId: string) {
    const customer = await prisma.customer.findUnique({
      where: { userId },
      include: {
        user: true,
        savedAddresses: true,
        wallet: true,
      },
    });

    if (!customer) {
      throw new NotFoundException('Customer profile not found');
    }

    return customer;
  }

  async getDriverProfile(userId: string) {
    const driver = await prisma.driver.findUnique({
      where: { userId },
      include: {
        user: true,
        vehicle: true,
        documents: true,
        currentLocation: true,
      },
    });

    if (!driver) {
      throw new NotFoundException('Driver profile not found');
    }

    return driver;
  }

  async getMerchantProfile(userId: string) {
    const merchant = await prisma.merchant.findUnique({
      where: { userId },
      include: {
        user: true,
        restaurants: true,
      },
    });

    if (!merchant) {
      throw new NotFoundException('Merchant profile not found');
    }

    return merchant;
  }
}
