import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { prisma } from '@tatx/database';
import {
  CreateRestaurantDto,
  UpdateRestaurantDto,
  RestaurantFilterDto,
  RestaurantSortDto,
  CreatePromotionDto,
  UpdatePromotionDto,
  CreateDeliveryZoneDto,
  UpdateDeliveryZoneDto,
  CheckDeliveryZoneDto,
} from './dto';

@Injectable()
export class RestaurantService {
  /**
   * Find all restaurants with pagination
   */
  async findAll(sort?: RestaurantSortDto) {
    const { page = 1, limit = 20, sortBy = 'popularity', sortOrder = 'DESC' } = sort || {};
    const skip = (page - 1) * limit;

    const orderBy: Record<string, string> = {};
    switch (sortBy) {
      case 'rating':
        orderBy.rating = sortOrder;
        break;
      case 'deliveryTime':
        orderBy.estimatedDeliveryTime = sortOrder;
        break;
      case 'deliveryFee':
        orderBy.deliveryFee = sortOrder;
        break;
      case 'minOrder':
        orderBy.minOrderAmount = sortOrder;
        break;
      case 'newest':
        orderBy.createdAt = sortOrder;
        break;
      default:
        orderBy.totalOrders = sortOrder;
    }

    const [restaurants, total] = await Promise.all([
      prisma.restaurant.findMany({
        skip,
        take: limit,
        orderBy,
        where: { isActive: true },
        include: {
          categories: { where: { isActive: true }, include: { menuItems: { where: { isAvailable: true } } } },
          merchant: { select: { businessName: true, businessNameAr: true } },
        },
      }),
      prisma.restaurant.count({ where: { isActive: true } }),
    ]);

    return {
      data: restaurants,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Find restaurant by ID
   */
  async findById(id: string) {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id },
      include: {
        categories: {
          where: { isActive: true },
          orderBy: { sortOrder: 'asc' },
          include: {
            menuItems: {
              where: { isAvailable: true },
              include: {
                modifierGroups: {
                  include: {
                    modifiers: { where: { isAvailable: true } },
                  },
                },
              },
            },
          },
        },
        merchant: true,
        promotions: { where: { isActive: true } },
        deliveryZones: { where: { isActive: true } },
      },
    });

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    return restaurant;
  }

  /**
   * Find restaurants by merchant ID
   */
  async findByMerchantId(merchantId: string) {
    return prisma.restaurant.findMany({
      where: { merchantId },
      include: {
        categories: { where: { isActive: true } },
        promotions: { where: { isActive: true } },
      },
    });
  }

  /**
   * Search restaurants with filters
   */
  async search(filters: RestaurantFilterDto, sort?: RestaurantSortDto) {
    const { page = 1, limit = 20, sortBy = 'popularity', sortOrder = 'DESC' } = sort || {};
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {
      isActive: filters.isActive ?? true,
    };

    if (filters.isOpen !== undefined) {
      where.isOpen = filters.isOpen;
    }

    if (filters.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { nameAr: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
        { cuisine: { has: filters.search.toUpperCase() } },
      ];
    }

    if (filters.city) {
      where.city = filters.city;
    }

    if (filters.district) {
      where.district = filters.district;
    }

    if (filters.cuisines && filters.cuisines.length > 0) {
      where.cuisine = { hasSome: filters.cuisines };
    }

    if (filters.minRating !== undefined) {
      where.rating = { gte: filters.minRating };
    }

    if (filters.maxDeliveryFee !== undefined) {
      where.deliveryFee = { lte: filters.maxDeliveryFee };
    }

    if (filters.maxDeliveryTime !== undefined) {
      where.estimatedDeliveryTime = { lte: filters.maxDeliveryTime };
    }

    if (filters.maxMinOrder !== undefined) {
      where.minOrderAmount = { lte: filters.maxMinOrder };
    }

    if (filters.freeDelivery) {
      where.freeDeliveryAbove = { not: null };
    }

    if (filters.isFeatured) {
      where.isFeatured = true;
    }

    if (filters.badges && filters.badges.length > 0) {
      where.badges = { hasSome: filters.badges };
    }

    // Location-based search
    if (filters.latitude && filters.longitude && filters.radius) {
      // Note: For production, use PostGIS or similar for proper geospatial queries
      // This is a simplified version using Haversine formula approximation
      where.latitude = {
        gte: filters.latitude - filters.radius * 0.01,
        lte: filters.latitude + filters.radius * 0.01,
      };
      where.longitude = {
        gte: filters.longitude - filters.radius * 0.01,
        lte: filters.longitude + filters.radius * 0.01,
      };
    }

    const orderBy: Record<string, string> = {};
    switch (sortBy) {
      case 'rating':
        orderBy.rating = sortOrder;
        break;
      case 'deliveryTime':
        orderBy.estimatedDeliveryTime = sortOrder;
        break;
      case 'deliveryFee':
        orderBy.deliveryFee = sortOrder;
        break;
      case 'minOrder':
        orderBy.minOrderAmount = sortOrder;
        break;
      case 'distance':
        orderBy.latitude = sortOrder;
        break;
      case 'newest':
        orderBy.createdAt = sortOrder;
        break;
      default:
        orderBy.totalOrders = sortOrder;
    }

    const [restaurants, total] = await Promise.all([
      prisma.restaurant.findMany({
        skip,
        take: limit,
        orderBy,
        where,
        include: {
          categories: { where: { isActive: true }, take: 5 },
          merchant: { select: { businessName: true } },
        },
      }),
      prisma.restaurant.count({ where }),
    ]);

    return {
      data: restaurants,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Create a new restaurant
   */
  async create(merchantId: string, data: CreateRestaurantDto) {
    // Check if merchant exists
    const merchant = await prisma.merchant.findUnique({
      where: { id: merchantId },
    });

    if (!merchant) {
      throw new NotFoundException('Merchant not found');
    }

    // Generate unique slug
    const slug = data.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '-' + Date.now();

    // Check if slug already exists
    const existingSlug = await prisma.restaurant.findUnique({ where: { slug } });
    if (existingSlug) {
      throw new ConflictException('Restaurant with this name already exists');
    }

    return prisma.restaurant.create({
      data: {
        ...data,
        slug,
        merchantId,
        openingHours: data.openingHours as never,
        holidayHours: data.holidayHours as never,
      },
      include: {
        merchant: { select: { businessName: true, businessNameAr: true } },
      },
    });
  }

  /**
   * Update restaurant
   */
  async update(id: string, data: UpdateRestaurantDto) {
    const restaurant = await prisma.restaurant.findUnique({ where: { id } });
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    // If name is being updated, generate new slug
    const updateData: Record<string, unknown> = { ...data };
    if (data.name && data.name !== restaurant.name) {
      const slug = data.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '-' + Date.now();
      updateData.slug = slug;
    }

    if (data.openingHours) {
      updateData.openingHours = data.openingHours as never;
    }

    if (data.holidayHours) {
      updateData.holidayHours = data.holidayHours as never;
    }

    return prisma.restaurant.update({
      where: { id },
      data: updateData,
      include: {
        merchant: { select: { businessName: true } },
        categories: { where: { isActive: true } },
      },
    });
  }

  /**
   * Delete restaurant (soft delete by setting isActive to false)
   */
  async delete(id: string) {
    const restaurant = await prisma.restaurant.findUnique({ where: { id } });
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    return prisma.restaurant.update({
      where: { id },
      data: { isActive: false },
    });
  }

  /**
   * Update restaurant status (open/close)
   */
  async updateStatus(id: string, isOpen: boolean) {
    const restaurant = await prisma.restaurant.findUnique({ where: { id } });
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    return prisma.restaurant.update({
      where: { id },
      data: { isOpen },
    });
  }

  /**
   * Toggle restaurant active status
   */
  async toggleActive(id: string) {
    const restaurant = await prisma.restaurant.findUnique({ where: { id } });
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    return prisma.restaurant.update({
      where: { id },
      data: { isActive: !restaurant.isActive },
    });
  }

  /**
   * Get restaurant menu
   */
  async getMenu(restaurantId: string) {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantId },
      include: {
        categories: {
          where: { isActive: true },
          orderBy: { sortOrder: 'asc' },
          include: {
            menuItems: {
              where: { isAvailable: true },
              include: {
                modifierGroups: {
                  include: {
                    modifiers: { where: { isAvailable: true } },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    return {
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        nameAr: restaurant.nameAr,
        isOpen: restaurant.isOpen,
        estimatedDeliveryTime: restaurant.estimatedDeliveryTime,
        minOrderAmount: restaurant.minOrderAmount,
        deliveryFee: restaurant.deliveryFee,
      },
      categories: restaurant.categories,
    };
  }

  /**
   * Create promotion for restaurant
   */
  async createPromotion(restaurantId: string, data: CreatePromotionDto) {
    const restaurant = await prisma.restaurant.findUnique({ where: { id: restaurantId } });
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    // Validate dates
    if (new Date(data.endDate) <= new Date(data.startDate)) {
      throw new BadRequestException('End date must be after start date');
    }

    return prisma.restaurantPromotion.create({
      data: {
        ...data,
        restaurantId,
      },
    });
  }

  /**
   * Get all promotions for a restaurant
   */
  async getPromotions(restaurantId: string, activeOnly = true) {
    return prisma.restaurantPromotion.findMany({
      where: {
        restaurantId,
        ...(activeOnly && { isActive: true, endDate: { gte: new Date() } }),
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Get active promotions
   */
  async getActivePromotions(restaurantId: string) {
    return prisma.restaurantPromotion.findMany({
      where: {
        restaurantId,
        isActive: true,
        startDate: { lte: new Date() },
        endDate: { gte: new Date() },
      },
    });
  }

  /**
   * Update promotion
   */
  async updatePromotion(restaurantId: string, promotionId: string, data: UpdatePromotionDto) {
    const promotion = await prisma.restaurantPromotion.findFirst({
      where: { id: promotionId, restaurantId },
    });

    if (!promotion) {
      throw new NotFoundException('Promotion not found');
    }

    // Validate dates if both are provided
    if (data.startDate && data.endDate && new Date(data.endDate) <= new Date(data.startDate)) {
      throw new BadRequestException('End date must be after start date');
    }

    return prisma.restaurantPromotion.update({
      where: { id: promotionId },
      data,
    });
  }

  /**
   * Delete promotion
   */
  async deletePromotion(restaurantId: string, promotionId: string) {
    const promotion = await prisma.restaurantPromotion.findFirst({
      where: { id: promotionId, restaurantId },
    });

    if (!promotion) {
      throw new NotFoundException('Promotion not found');
    }

    return prisma.restaurantPromotion.delete({
      where: { id: promotionId },
    });
  }

  /**
   * Create delivery zone for restaurant
   */
  async createDeliveryZone(restaurantId: string, data: CreateDeliveryZoneDto) {
    const restaurant = await prisma.restaurant.findUnique({ where: { id: restaurantId } });
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    return prisma.deliveryZone.create({
      data: {
        ...data,
        restaurantId,
        polygon: data.polygon as never,
      },
    });
  }

  /**
   * Get all delivery zones for a restaurant
   */
  async getDeliveryZones(restaurantId: string) {
    return prisma.deliveryZone.findMany({
      where: { restaurantId },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Update delivery zone
   */
  async updateDeliveryZone(restaurantId: string, zoneId: string, data: UpdateDeliveryZoneDto) {
    const zone = await prisma.deliveryZone.findFirst({
      where: { id: zoneId, restaurantId },
    });

    if (!zone) {
      throw new NotFoundException('Delivery zone not found');
    }

    return prisma.deliveryZone.update({
      where: { id: zoneId },
      data: {
        ...data,
        polygon: data.polygon as never,
      },
    });
  }

  /**
   * Delete delivery zone
   */
  async deleteDeliveryZone(restaurantId: string, zoneId: string) {
    const zone = await prisma.deliveryZone.findFirst({
      where: { id: zoneId, restaurantId },
    });

    if (!zone) {
      throw new NotFoundException('Delivery zone not found');
    }

    return prisma.deliveryZone.delete({
      where: { id: zoneId },
    });
  }

  /**
   * Check if address is within delivery zone
   */
  async checkDeliveryAvailability(restaurantId: string, data: CheckDeliveryZoneDto) {
    const zones = await prisma.deliveryZone.findMany({
      where: { restaurantId, isActive: true },
    });

    if (zones.length === 0) {
      // If no zones defined, check against restaurant's delivery radius
      const restaurant = await prisma.restaurant.findUnique({
        where: { id: restaurantId },
        select: { latitude: true, longitude: true, deliveryRadius: true },
      });

      if (!restaurant || !restaurant.latitude || !restaurant.longitude) {
        return {
          available: false,
          message: 'Restaurant delivery area not defined',
        };
      }

      const distance = this.calculateDistance(
        restaurant.latitude as number,
        restaurant.longitude as number,
        data.latitude,
        data.longitude,
      );

      return {
        available: distance <= restaurant.deliveryRadius,
        distance: parseFloat(distance.toFixed(2)),
        fee: restaurant.deliveryFee,
        minOrder: restaurant.minOrderAmount,
        estimatedDeliveryTime: restaurant.estimatedDeliveryTime,
      };
    }

    // Check if point is within any polygon zone
    for (const zone of zones) {
      if (zone.polygon && this.isPointInPolygon(data.latitude, data.longitude, zone.polygon as Record<string, unknown>)) {
        return {
          available: true,
          zoneId: zone.id,
          zoneName: zone.name,
          zoneNameAr: zone.nameAr,
          fee: zone.fee,
          minOrder: zone.minOrder,
          maxOrder: zone.maxOrder,
          estimatedDeliveryTime: zone.estimatedDeliveryTime,
        };
      }
    }

    return {
      available: false,
      message: 'Address outside delivery zones',
    };
  }

  /**
   * Calculate distance between two points using Haversine formula
   */
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  /**
   * Check if a point is inside a polygon (ray casting algorithm)
   */
  private isPointInPolygon(lat: number, lon: number, polygon: Record<string, unknown>): boolean {
    try {
      // Handle GeoJSON format
      const coords = (polygon as Record<string, unknown>).coordinates as unknown[][][];
      if (!coords || !coords[0]) return false;

      const ring = coords[0];
      let inside = false;

      for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
        const xi = ring[i][1];
        const yi = ring[i][0];
        const xj = ring[j][1];
        const yj = ring[j][0];

        const intersect = yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi;
        if (intersect) inside = !inside;
      }

      return inside;
    } catch {
      return false;
    }
  }

  /**
   * Get restaurant statistics
   */
  async getStatistics(restaurantId: string) {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantId },
      include: {
        _count: {
          select: {
            orders: true,
            categories: true,
            menuItems: true,
            promotions: true,
            deliveryZones: true,
          },
        },
      },
    });

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    // Get order statistics
    const orders = await prisma.order.findMany({
      where: { restaurantId },
      select: {
        total: true,
        status: true,
        createdAt: true,
      },
    });

    const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total), 0);
    const completedOrders = orders.filter((o) => o.status === 'DELIVERED').length;

    return {
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        rating: restaurant.rating,
        totalReviews: restaurant.totalReviews,
      },
      counts: restaurant._count,
      orders: {
        total: orders.length,
        completed: completedOrders,
        pending: orders.filter((o) => o.status === 'PENDING').length,
        preparing: orders.filter((o) => o.status === 'PREPARING').length,
      },
      revenue: {
        total: totalRevenue,
        average: orders.length > 0 ? totalRevenue / orders.length : 0,
      },
    };
  }
}
