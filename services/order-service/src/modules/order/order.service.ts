import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '@tatx/database';

@Injectable()
export class OrderService {
  async create(data: {
    customerId: string; restaurantId: string; orderType: string;
    subtotal: number; deliveryFee: number; serviceFee: number; tax: number;
    total: number; paymentMethod: string; deliveryAddress?: string;
  }) {
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    return prisma.order.create({
      data: { ...data, orderNumber, status: 'PENDING' },
    });
  }

  async findById(id: string) {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        customer: { include: { user: true } },
        restaurant: true,
        driver: { include: { user: true, vehicle: true } },
        items: { include: { menuItem: true } },
      },
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async findByCustomerId(customerId: string) {
    return prisma.order.findMany({ where: { customerId }, orderBy: { createdAt: 'desc' } });
  }

  async findByRestaurantId(restaurantId: string) {
    return prisma.order.findMany({ where: { restaurantId }, orderBy: { createdAt: 'desc' } });
  }

  async updateStatus(id: string, status: string) {
    const updates: Record<string, unknown> = { status };
    if (status === 'PREPARING') updates.preparedAt = new Date();
    if (status === 'PICKED_UP') updates.pickedUpAt = new Date();
    if (status === 'DELIVERED') updates.deliveredAt = new Date();
    if (status === 'CANCELLED') updates.cancelledAt = new Date();
    return prisma.order.update({ where: { id }, data: updates });
  }

  async assignDriver(orderId: string, driverId: string) {
    return prisma.order.update({
      where: { id: orderId },
      data: { driverId, status: 'IN_TRANSIT' },
    });
  }

  async cancel(orderId: string, reason: string) {
    return prisma.order.update({
      where: { id: orderId },
      data: { status: 'CANCELLED', cancellationReason: reason, cancelledAt: new Date() },
    });
  }
}
