import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { prisma } from '@tatx/database';
import {
  CreateDeliveryZoneDto,
  UpdateDeliveryZoneDto,
  CheckDeliveryAvailabilityDto,
} from './dto';

@Injectable()
export class DeliveryZoneService {
  /**
   * Get all delivery zones
   */
  async findAll() {
    return prisma.deliveryZone.findMany({
      include: {
        restaurant: {
          select: {
            id: true,
            name: true,
            nameAr: true,
            logo: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Get delivery zone by ID
   */
  async findById(id: string) {
    const zone = await prisma.deliveryZone.findUnique({
      where: { id },
      include: {
        restaurant: {
          select: {
            id: true,
            name: true,
            nameAr: true,
            logo: true,
            phone: true,
            address: true,
          },
        },
      },
    });

    if (!zone) {
      throw new NotFoundException('Delivery zone not found');
    }

    return zone;
  }

  /**
   * Get delivery zones for a restaurant
   */
  async findByRestaurant(restaurantId: string, activeOnly = true) {
    return prisma.deliveryZone.findMany({
      where: {
        restaurantId,
        ...(activeOnly && { isActive: true }),
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Get active delivery zones by city
   */
  async findByCity(city: string) {
    const zones = await prisma.deliveryZone.findMany({
      where: {
        isActive: true,
        restaurant: {
          city,
          isActive: true,
          isOpen: true,
        },
      },
      include: {
        restaurant: {
          select: {
            id: true,
            name: true,
            nameAr: true,
            logo: true,
            cuisine: true,
            rating: true,
            estimatedDeliveryTime: true,
            deliveryFee: true,
            minOrderAmount: true,
          },
        },
      },
    });

    return zones;
  }

  /**
   * Create delivery zone
   */
  async create(restaurantId: string, data: CreateDeliveryZoneDto) {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantId },
    });

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    // Validate polygon if provided
    if (data.polygon) {
      if (!this.isValidPolygon(data.polygon)) {
        throw new BadRequestException('Invalid polygon format');
      }
    }

    return prisma.deliveryZone.create({
      data: {
        ...data,
        restaurantId,
        polygon: data.polygon as never,
      },
      include: {
        restaurant: {
          select: {
            id: true,
            name: true,
            nameAr: true,
          },
        },
      },
    });
  }

  /**
   * Update delivery zone
   */
  async update(id: string, data: UpdateDeliveryZoneDto) {
    const zone = await prisma.deliveryZone.findUnique({
      where: { id },
    });

    if (!zone) {
      throw new NotFoundException('Delivery zone not found');
    }

    // Validate polygon if provided
    if (data.polygon) {
      if (!this.isValidPolygon(data.polygon)) {
        throw new BadRequestException('Invalid polygon format');
      }
    }

    return prisma.deliveryZone.update({
      where: { id },
      data: {
        ...data,
        polygon: data.polygon as never,
      },
    });
  }

  /**
   * Delete delivery zone
   */
  async delete(id: string) {
    const zone = await prisma.deliveryZone.findUnique({
      where: { id },
    });

    if (!zone) {
      throw new NotFoundException('Delivery zone not found');
    }

    return prisma.deliveryZone.delete({
      where: { id },
    });
  }

  /**
   * Toggle delivery zone active status
   */
  async toggleActive(id: string) {
    const zone = await prisma.deliveryZone.findUnique({
      where: { id },
    });

    if (!zone) {
      throw new NotFoundException('Delivery zone not found');
    }

    return prisma.deliveryZone.update({
      where: { id },
      data: { isActive: !zone.isActive },
    });
  }

  /**
   * Check delivery availability for coordinates
   */
  async checkAvailability(restaurantId: string, data: CheckDeliveryAvailabilityDto) {
    const zones = await prisma.deliveryZone.findMany({
      where: { restaurantId, isActive: true },
    });

    if (zones.length === 0) {
      // If no zones defined, check against restaurant's delivery radius
      const restaurant = await prisma.restaurant.findUnique({
        where: { id: restaurantId },
        select: {
          latitude: true,
          longitude: true,
          deliveryRadius: true,
          deliveryFee: true,
          minOrderAmount: true,
          estimatedDeliveryTime: true,
        },
      });

      if (!restaurant || !restaurant.latitude || !restaurant.longitude) {
        return {
          available: false,
          message: 'Restaurant delivery area not defined',
        };
      }

      const distance = this.calculateDistance(
        Number(restaurant.latitude),
        Number(restaurant.longitude),
        data.latitude,
        data.longitude,
      );

      return {
        available: distance <= Number(restaurant.deliveryRadius),
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
   * Find restaurants that deliver to coordinates
   */
  async findRestaurantsForLocation(data: CheckDeliveryAvailabilityDto, city?: string) {
    const where: Record<string, unknown> = {
      isActive: true,
      isOpen: true,
    };

    if (city) {
      where.city = city;
    }

    const restaurants = await prisma.restaurant.findMany({
      where,
      include: {
        deliveryZones: {
          where: { isActive: true },
        },
      },
    });

    const availableRestaurants = [];

    for (const restaurant of restaurants) {
      if (restaurant.deliveryZones.length === 0) {
        // Check against delivery radius
        if (restaurant.latitude && restaurant.longitude) {
          const distance = this.calculateDistance(
            Number(restaurant.latitude),
            Number(restaurant.longitude),
            data.latitude,
            data.longitude,
          );

          if (distance <= Number(restaurant.deliveryRadius)) {
            availableRestaurants.push({
              restaurant: {
                id: restaurant.id,
                name: restaurant.name,
                nameAr: restaurant.nameAr,
                logo: restaurant.logo,
                cuisine: restaurant.cuisine,
                rating: restaurant.rating,
                estimatedDeliveryTime: restaurant.estimatedDeliveryTime,
              },
              delivery: {
                available: true,
                fee: restaurant.deliveryFee,
                minOrder: restaurant.minOrderAmount,
                distance: parseFloat(distance.toFixed(2)),
              },
            });
          }
        }
      } else {
        // Check against delivery zones
        for (const zone of restaurant.deliveryZones) {
          if (zone.polygon && this.isPointInPolygon(data.latitude, data.longitude, zone.polygon as Record<string, unknown>)) {
            availableRestaurants.push({
              restaurant: {
                id: restaurant.id,
                name: restaurant.name,
                nameAr: restaurant.nameAr,
                logo: restaurant.logo,
                cuisine: restaurant.cuisine,
                rating: restaurant.rating,
                estimatedDeliveryTime: restaurant.estimatedDeliveryTime,
              },
              delivery: {
                available: true,
                zoneId: zone.id,
                zoneName: zone.name,
                fee: zone.fee,
                minOrder: zone.minOrder,
              },
            });
            break;
          }
        }
      }
    }

    return availableRestaurants;
  }

  /**
   * Get delivery zone statistics
   */
  async getStatistics(zoneId: string) {
    const zone = await prisma.deliveryZone.findUnique({
      where: { id: zoneId },
    });

    if (!zone) {
      throw new NotFoundException('Delivery zone not found');
    }

    const orders = await prisma.order.findMany({
      where: {
        restaurant: {
          deliveryZones: {
            some: { id: zoneId },
          },
        },
        status: 'DELIVERED',
      },
      select: {
        total: true,
        deliveredAt: true,
        rating: true,
        restaurant: {
          select: {
            estimatedDeliveryTime: true,
          },
        },
      },
    });

    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total), 0);
    const avgRating =
      orders.filter((o) => o.rating).reduce((sum, o) => sum + (o.rating || 0), 0) /
      orders.filter((o) => o.rating).length || 0;

    // Calculate average delivery time
    const deliveryTimes = orders
      .filter((o) => o.deliveredAt && o.restaurant)
      .map((o) => o.restaurant!.estimatedDeliveryTime);

    const avgDeliveryTime =
      deliveryTimes.length > 0
        ? deliveryTimes.reduce((sum, t) => sum + t, 0) / deliveryTimes.length
        : 0;

    return {
      zone: {
        id: zone.id,
        name: zone.name,
        nameAr: zone.nameAr,
      },
      stats: {
        totalOrders,
        totalRevenue,
        averageRating: parseFloat(avgRating.toFixed(2)),
        averageDeliveryTime: Math.round(avgDeliveryTime),
      },
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
   * Validate polygon format
   */
  private isValidPolygon(polygon: Record<string, unknown>): boolean {
    try {
      const type = polygon.type as string;
      const coordinates = polygon.coordinates as unknown[][][];

      if (type !== 'Polygon' || !coordinates || !coordinates[0]) {
        return false;
      }

      // Check that coordinates are valid [lon, lat] pairs
      for (const point of coordinates[0]) {
        if (point.length !== 2) return false;
        const [lon, lat] = point as [number, number];
        if (typeof lon !== 'number' || typeof lat !== 'number') return false;
        if (lon < -180 || lon > 180 || lat < -90 || lat > 90) return false;
      }

      return true;
    } catch {
      return false;
    }
  }
}
