import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { prisma } from '@tatx/database';
import {
  CreateOrderDto,
  OrderFilterDto,
  UpdateOrderStatusDto,
  CancelOrderDto,
  RateOrderDto,
  OrderTypeEnum,
} from './dto';

@Injectable()
export class OrderService {
  /**
   * Generate unique order number
   */
  private generateOrderNumber(): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `ORD-${timestamp}-${random}`;
  }

  /**
   * Create a new order
   */
  async createOrder(data: CreateOrderDto) {
    // Validate restaurant exists
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: data.restaurantId },
    });

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    // Check if restaurant is open
    if (!restaurant.isOpen || !restaurant.isActive) {
      throw new BadRequestException('Restaurant is currently closed or inactive');
    }

    // Validate customer exists
    const customer = await prisma.customer.findUnique({
      where: { id: data.customerId },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    // Validate menu items exist and are available
    const menuItemIds = data.items.map((item) => item.menuItemId);
    const menuItems = await prisma.menuItem.findMany({
      where: { id: { in: menuItemIds } },
    });

    if (menuItems.length !== menuItemIds.length) {
      throw new NotFoundException('One or more menu items not found');
    }

    const unavailableItems = menuItems.filter((item) => !item.isAvailable);
    if (unavailableItems.length > 0) {
      throw new BadRequestException(
        `Items not available: ${unavailableItems.map((i) => i.name).join(', ')}`,
      );
    }

    // Calculate order totals
    let subtotal = 0;
    for (const item of data.items) {
      const menuItem = menuItems.find((m) => m.id === item.menuItemId);
      if (!menuItem) continue;

      const itemPrice = menuItem.salePrice || menuItem.price;
      subtotal += Number(itemPrice) * item.quantity;

      // Add modifier prices
      if (item.modifiers) {
        for (const modifier of item.modifiers) {
          subtotal += Number(modifier.price) * (modifier.quantity || 1);
        }
      }
    }

    // Calculate delivery fee
    let deliveryFee = restaurant.deliveryFee;
    if (data.orderType === 'PICKUP') {
      deliveryFee = 0;
    }

    // Check for free delivery threshold
    if (restaurant.freeDeliveryAbove && subtotal >= Number(restaurant.freeDeliveryAbove)) {
      deliveryFee = 0;
    }

    // Calculate tip
    const tip = data.tip || 0;

    // Calculate discount (promo code handling would go here)
    const discount = 0;

    // Calculate tax (15% VAT in Saudi Arabia)
    const tax = (subtotal + deliveryFee - discount) * 0.15;

    // Calculate total
    const total = subtotal + deliveryFee + tax + tip - discount;

    // Check minimum order amount
    if (subtotal < Number(restaurant.minOrderAmount)) {
      throw new BadRequestException(
        `Minimum order amount is ${restaurant.minOrderAmount} SAR`,
      );
    }

    // Create order
    const orderNumber = this.generateOrderNumber();

    const order = await prisma.order.create({
      data: {
        orderNumber,
        type: data.type,
        customerId: data.customerId,
        restaurantId: data.restaurantId,
        status: 'PENDING',
        orderType: data.orderType,
        priority: data.priority || 'STANDARD',

        // Items
        items: {
          create: data.items.map((item) => ({
            menuItemId: item.menuItemId,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            specialInstructions: item.specialInstructions,
            modifiers: item.modifiers as never,
          })),
        },

        // Pricing
        subtotal,
        deliveryFee,
        serviceFee: 0,
        tax,
        discount,
        tip,
        total,

        // Payment
        paymentMethod: (data.paymentMethod as never) || 'CASH',
        paymentStatus: 'PENDING',

        // Delivery address
        ...(data.deliveryAddress && {
          deliveryAddress: data.deliveryAddress.address,
          deliveryAddressAr: data.deliveryAddress.addressAr,
          deliveryLatitude: data.deliveryAddress.latitude,
          deliveryLongitude: data.deliveryAddress.longitude,
          deliveryInstructions: data.deliveryAddress.instructions,
          deliveryInstructionsAr: data.deliveryAddress.instructionsAr,
          contactName: data.deliveryAddress.contactName,
          contactPhone: data.deliveryAddress.contactPhone,
        }),

        // Scheduling
        scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : null,

        // Courier specific
        packageSize: data.packageSize as never,
        packageWeight: data.packageWeight,
        packageValue: data.packageValue,
        pickupContact: data.pickupContact,
        pickupPhone: data.pickupPhone,
        pickupNotes: data.pickupNotes,
        deliveryContact: data.deliveryContact,
        deliveryPhone: data.deliveryPhone,
        deliveryNotes: data.deliveryNotes,
        signatureRequired: data.signatureRequired || false,
        idRequired: data.idRequired || false,

        // Notes
        customerNotes: data.customerNotes,
        customerNotesAr: data.customerNotesAr,
      },
      include: {
        items: true,
        restaurant: {
          select: {
            name: true,
            nameAr: true,
            phone: true,
            address: true,
          },
        },
      },
    });

    // Update restaurant total orders
    await prisma.restaurant.update({
      where: { id: data.restaurantId },
      data: {
        totalOrders: { increment: 1 },
      },
    });

    // Update customer total orders and spent
    await prisma.customer.update({
      where: { id: data.customerId },
      data: {
        totalOrders: { increment: 1 },
        totalSpent: { increment: total },
      },
    });

    return order;
  }

  /**
   * Get order by ID
   */
  async getOrderById(id: string) {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            menuItem: {
              select: {
                id: true,
                name: true,
                nameAr: true,
                image: true,
              },
            },
          },
        },
        restaurant: {
          select: {
            id: true,
            name: true,
            nameAr: true,
            phone: true,
            address: true,
            logo: true,
          },
        },
        driver: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                phone: true,
                avatar: true,
              },
            },
            vehicle: {
              select: {
                make: true,
                model: true,
                color: true,
                licensePlate: true,
              },
            },
          },
        },
        customer: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                phone: true,
                avatar: true,
              },
            },
          },
        },
        payment: true,
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  /**
   * Get orders for a user
   */
  async getUserOrders(
    userId: string,
    filters?: OrderFilterDto,
    page = 1,
    limit = 20,
  ) {
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = { customerId: userId };

    if (filters) {
      if (filters.types && filters.types.length > 0) {
        where.type = { in: filters.types };
      }

      if (filters.statuses && filters.statuses.length > 0) {
        where.status = { in: filters.statuses };
      }

      if (!filters.includeCancelled) {
        where.status = { notIn: ['CANCELLED', 'REFUNDED'] };
      }

      if (filters.startDate || filters.endDate) {
        where.createdAt = {};
        if (filters.startDate) {
          (where.createdAt as Record<string, string>).gte = filters.startDate;
        }
        if (filters.endDate) {
          (where.createdAt as Record<string, string>).lte = filters.endDate;
        }
      }

      if (filters.minTotal !== undefined || filters.maxTotal !== undefined) {
        where.total = {};
        if (filters.minTotal !== undefined) {
          (where.total as Record<string, number>).gte = filters.minTotal;
        }
        if (filters.maxTotal !== undefined) {
          (where.total as Record<string, number>).lte = filters.maxTotal;
        }
      }
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        skip,
        take: limit,
        where,
        orderBy: { createdAt: 'desc' },
        include: {
          items: {
            take: 3,
            select: {
              name: true,
              quantity: true,
              price: true,
            },
          },
          restaurant: {
            select: {
              name: true,
              nameAr: true,
              logo: true,
            },
          },
        },
      }),
      prisma.order.count({ where }),
    ]);

    return {
      data: orders,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get orders for a restaurant
   */
  async getRestaurantOrders(
    restaurantId: string,
    status?: string,
    page = 1,
    limit = 20,
  ) {
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = { restaurantId };

    if (status) {
      where.status = status;
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        skip,
        take: limit,
        where,
        orderBy: { createdAt: 'desc' },
        include: {
          items: true,
          customer: {
            include: {
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                  phone: true,
                },
              },
            },
          },
          driver: {
            include: {
              user: {
                select: {
                  firstName: true,
                  phone: true,
                },
              },
            },
          },
        },
      }),
      prisma.order.count({ where }),
    ]);

    return {
      data: orders,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Update order status
   */
  async updateOrderStatus(id: string, data: UpdateOrderStatusDto, userId?: string) {
    const order = await prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    // Validate status transition
    const validTransitions: Record<string, string[]> = {
      PENDING: ['CONFIRMED', 'CANCELLED'],
      CONFIRMED: ['PREPARING', 'CANCELLED'],
      PREPARING: ['READY_FOR_PICKUP', 'CANCELLED'],
      READY_FOR_PICKUP: ['PICKED_UP', 'CANCELLED'],
      PICKED_UP: ['IN_TRANSIT'],
      IN_TRANSIT: ['DELIVERED'],
      DELIVERED: [],
      CANCELLED: [],
      REFUNDED: [],
    };

    const currentStatusTransitions = validTransitions[order.status];
    if (!currentStatusTransitions || !currentStatusTransitions.includes(data.status)) {
      throw new BadRequestException(
        `Cannot transition from ${order.status} to ${data.status}`,
      );
    }

    // Build update data
    const updateData: Record<string, unknown> = {
      status: data.status,
    };

    // Set timestamps based on status
    const now = new Date();
    switch (data.status) {
      case 'CONFIRMED':
        updateData.confirmedAt = now;
        break;
      case 'PREPARING':
        updateData.preparingAt = now;
        break;
      case 'READY_FOR_PICKUP':
        updateData.readyForPickupAt = now;
        break;
      case 'PICKED_UP':
        updateData.pickedUpAt = now;
        break;
      case 'DELIVERED':
        updateData.deliveredAt = now;
        break;
      case 'CANCELLED':
        updateData.cancelledAt = now;
        break;
    }

    if (data.notes) {
      updateData.driverNotes = data.notes;
    }

    return prisma.order.update({
      where: { id },
      data: updateData,
      include: {
        items: true,
        restaurant: true,
        customer: {
          include: {
            user: {
              select: {
                firstName: true,
                phone: true,
              },
            },
          },
        },
      },
    });
  }

  /**
   * Cancel order
   */
  async cancelOrder(id: string, data: CancelOrderDto, userId?: string) {
    const order = await prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    // Check if order can be cancelled
    const cancellableStatuses = ['PENDING', 'CONFIRMED', 'PREPARING'];
    if (!cancellableStatuses.includes(order.status)) {
      throw new BadRequestException(
        `Order cannot be cancelled in ${order.status} status`,
      );
    }

    // Calculate refund amount
    let refundAmount = order.total;

    // If order was picked up or in transit, may charge cancellation fee
    if (['READY_FOR_PICKUP', 'PICKED_UP'].includes(order.status)) {
      refundAmount = order.total * 0.5; // 50% refund
    }

    // Update order
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        status: 'CANCELLED',
        cancellationReason: data.reason,
        cancelledBy: userId || 'CUSTOMER',
        cancelledAt: new Date(),
      },
      include: {
        items: true,
        restaurant: true,
        customer: {
          include: {
            user: true,
          },
        },
      },
    });

    // Update restaurant stats
    await prisma.restaurant.update({
      where: { id: order.restaurantId },
      data: {
        totalOrders: { decrement: 1 },
      },
    });

    // Update customer stats
    await prisma.customer.update({
      where: { id: order.customerId },
      data: {
        totalOrders: { decrement: 1 },
        totalSpent: { decrement: Number(order.total) },
      },
    });

    return {
      order: updatedOrder,
      refund: {
        amount: refundAmount,
        status: 'PROCESSING',
        estimatedDays: 3,
      },
    };
  }

  /**
   * Rate order
   */
  async rateOrder(id: string, data: RateOrderDto, userId: string) {
    const order = await prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    // Check if order is delivered
    if (order.status !== 'DELIVERED') {
      throw new BadRequestException('Can only rate delivered orders');
    }

    // Check if already rated
    if (order.rating) {
      throw new BadRequestException('Order already rated');
    }

    // Check if user is the customer
    if (order.customerId !== userId) {
      throw new ForbiddenException('Can only rate your own orders');
    }

    // Update order with rating
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        rating: data.rating,
        restaurantRating: data.restaurantRating || data.rating,
        driverRating: data.driverRating,
      },
    });

    // Create review for restaurant
    if (data.restaurantRating && order.restaurantId) {
      await prisma.review.create({
        data: {
          userId,
          restaurantId: order.restaurantId,
          orderId: id,
          rating: data.restaurantRating,
          comment: data.comment,
          commentAr: data.commentAr,
          tags: data.tags || [],
        },
      });

      // Update restaurant rating
      const reviews = await prisma.review.findMany({
        where: { restaurantId: order.restaurantId },
        select: { rating: true },
      });

      const avgRating =
        reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

      await prisma.restaurant.update({
        where: { id: order.restaurantId },
        data: {
          rating: avgRating,
          totalReviews: { increment: 1 },
        },
      });
    }

    // Create review for driver if rated
    if (data.driverRating && order.driverId) {
      await prisma.review.create({
        data: {
          userId,
          driverId: order.driverId,
          orderId: id,
          rating: data.driverRating,
          comment: data.comment,
          commentAr: data.commentAr,
        },
      });

      // Update driver rating
      const reviews = await prisma.review.findMany({
        where: { driverId: order.driverId },
        select: { rating: true },
      });

      const avgRating =
        reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

      await prisma.driver.update({
        where: { id: order.driverId },
        data: {
          rating: avgRating,
        },
      });
    }

    return updatedOrder;
  }

  /**
   * Reorder from order history
   */
  async reorder(orderId: string, customerId: string) {
    const originalOrder = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (!originalOrder) {
      throw new NotFoundException('Order not found');
    }

    // Check if user owns the order
    if (originalOrder.customerId !== customerId) {
      throw new ForbiddenException('Can only reorder your own orders');
    }

    // Check if restaurant is still active
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: originalOrder.restaurantId },
    });

    if (!restaurant || !restaurant.isActive || !restaurant.isOpen) {
      throw new BadRequestException('Restaurant is no longer available');
    }

    // Check if menu items are still available
    const menuItemIds = originalOrder.items.map((item) => item.menuItemId);
    const menuItems = await prisma.menuItem.findMany({
      where: { id: { in: menuItemIds } },
    });

    const unavailableItems = menuItems.filter((item) => !item.isAvailable);
    if (unavailableItems.length > 0) {
      throw new BadRequestException(
        `Some items are no longer available: ${unavailableItems.map((i) => i.name).join(', ')}`,
      );
    }

    // Create new order with same items
    const newOrderData: CreateOrderDto = {
      type: originalOrder.type as OrderTypeEnum,
      customerId,
      restaurantId: originalOrder.restaurantId!,
      orderType: originalOrder.orderType as 'DELIVERY' | 'PICKUP',
      items: originalOrder.items.map((item) => ({
        menuItemId: item.menuItemId,
        name: item.name,
        quantity: item.quantity,
        price: Number(item.price),
        specialInstructions: item.specialInstructions || undefined,
        modifiers: item.modifiers as never,
      })),
      paymentMethod: originalOrder.paymentMethod as string,
      tip: Number(originalOrder.tip),
    };

    // Add delivery address if original was delivery
    if (
      originalOrder.deliveryAddress &&
      originalOrder.deliveryLatitude &&
      originalOrder.deliveryLongitude
    ) {
      newOrderData.deliveryAddress = {
        address: originalOrder.deliveryAddress,
        addressAr: originalOrder.deliveryAddressAr || undefined,
        latitude: Number(originalOrder.deliveryLatitude),
        longitude: Number(originalOrder.deliveryLongitude),
        instructions: originalOrder.deliveryInstructions || undefined,
        instructionsAr: originalOrder.deliveryInstructionsAr || undefined,
        contactName: originalOrder.contactName || customerId,
        contactPhone: originalOrder.contactPhone || '',
      };
    }

    return this.createOrder(newOrderData);
  }

  /**
   * Get order tracking information
   */
  async getOrderTracking(id: string) {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        restaurant: {
          select: {
            name: true,
            nameAr: true,
            phone: true,
            address: true,
            latitude: true,
            longitude: true,
          },
        },
        driver: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                phone: true,
                avatar: true,
              },
            },
            vehicle: {
              select: {
                make: true,
                model: true,
                color: true,
                licensePlate: true,
              },
            },
            currentLocation: {
              select: {
                latitude: true,
                longitude: true,
                updatedAt: true,
              },
            },
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    // Build tracking timeline
    const timeline = [
      {
        status: 'PENDING',
        label: 'Order Placed',
        labelAr: 'تم الطلب',
        timestamp: order.createdAt,
        completed: true,
      },
    ];

    if (order.confirmedAt) {
      timeline.push({
        status: 'CONFIRMED',
        label: 'Order Confirmed',
        labelAr: 'تم التأكيد',
        timestamp: order.confirmedAt,
        completed: true,
      });
    }

    if (order.preparingAt) {
      timeline.push({
        status: 'PREPARING',
        label: 'Preparing',
        labelAr: 'جاري التحضير',
        timestamp: order.preparingAt,
        completed: true,
      });
    }

    if (order.readyForPickupAt) {
      timeline.push({
        status: 'READY_FOR_PICKUP',
        label: 'Ready for Pickup',
        labelAr: 'جاهز للاستلام',
        timestamp: order.readyForPickupAt,
        completed: true,
      });
    }

    if (order.pickedUpAt) {
      timeline.push({
        status: 'PICKED_UP',
        label: 'Picked Up',
        labelAr: 'تم الاستلام',
        timestamp: order.pickedUpAt,
        completed: true,
      });
    }

    if (order.deliveredAt) {
      timeline.push({
        status: 'DELIVERED',
        label: 'Delivered',
        labelAr: 'تم التوصيل',
        timestamp: order.deliveredAt,
        completed: true,
      });
    }

    return {
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        status: order.status,
        estimatedDeliveryTime: order.estimatedDeliveryTime,
      },
      restaurant: order.restaurant,
      driver: order.driver
        ? {
            name: `${order.driver.user.firstName} ${order.driver.user.lastName}`,
            phone: order.driver.user.phone,
            avatar: order.driver.user.avatar,
            vehicle: order.driver.vehicle
              ? {
                  make: order.driver.vehicle.make,
                  model: order.driver.vehicle.model,
                  color: order.driver.vehicle.color,
                  licensePlate: order.driver.vehicle.licensePlate,
                }
              : null,
            location: order.driver.currentLocation
              ? {
                  latitude: Number(order.driver.currentLocation.latitude),
                  longitude: Number(order.driver.currentLocation.longitude),
                  lastUpdated: order.driver.currentLocation.updatedAt,
                }
              : null,
          }
        : null,
      timeline,
      deliveryAddress: order.deliveryAddress
        ? {
            address: order.deliveryAddress,
            addressAr: order.deliveryAddressAr,
            latitude: order.deliveryLatitude
              ? Number(order.deliveryLatitude)
              : null,
            longitude: order.deliveryLongitude
              ? Number(order.deliveryLongitude)
              : null,
          }
        : null,
    };
  }
}
