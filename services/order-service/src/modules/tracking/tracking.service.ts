import { Injectable } from '@nestjs/common';
import { prisma } from '@tatx/database';

@Injectable()
export class TrackingService {
  async trackOrder(orderId: string) {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        driver: { include: { currentLocation: true } },
        restaurant: true,
      },
    });

    if (!order) return null;

    const timeline = [
      { status: 'PENDING', timestamp: order.createdAt, message: 'Order placed' },
    ];

    if (order.preparedAt) timeline.push({ status: 'PREPARING', timestamp: order.preparedAt, message: 'Restaurant is preparing your order' });
    if (order.pickedUpAt) timeline.push({ status: 'PICKED_UP', timestamp: order.pickedUpAt, message: 'Order picked up by driver' });
    if (order.deliveredAt) timeline.push({ status: 'DELIVERED', timestamp: order.deliveredAt, message: 'Order delivered' });

    return {
      orderId: order.id,
      orderNumber: order.orderNumber,
      status: order.status,
      driverLocation: order.driver?.currentLocation
        ? { latitude: order.driver.currentLocation.latitude, longitude: order.driver.currentLocation.longitude }
        : null,
      estimatedDeliveryTime: order.estimatedDeliveryTime,
      timeline,
    };
  }
}
