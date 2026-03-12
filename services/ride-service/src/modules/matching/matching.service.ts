import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { prisma } from '@tatx/database';
import { VehicleType } from '../ride/enums/ride.enums';
import { BroadcastRideRequestDto, MatchingResultDto } from './dto/matching.dto';

export interface NearbyDriver {
  id: string;
  userId: string;
  name: string;
  rating: number;
  totalRides: number;
  vehicleType: VehicleType;
  vehicleMake: string;
  vehicleModel: string;
  vehicleColor: string;
  licensePlate: string;
  latitude: number;
  longitude: number;
  distance: number;
  eta: number;
}

export interface DriverMatchRequest {
  rideId: string;
  pickupLatitude: number;
  pickupLongitude: number;
  vehicleType: VehicleType;
  estimatedFare: number;
}

export interface AutoAssignConfig {
  enabled: boolean;
  maxWaitTime: number;
  maxDistance: number;
  minRating: number;
  driversToNotify: number;
}

@Injectable()
export class MatchingService {
  private readonly logger = new Logger(MatchingService.name);
  private readonly DEFAULT_RADIUS_KM = 5;
  private readonly MAX_DRIVERS_TO_NOTIFY = 20;
  private readonly AUTO_ASSIGN_CONFIG: AutoAssignConfig = {
    enabled: true,
    maxWaitTime: 30, // seconds
    maxDistance: 10, // km
    minRating: 4.0,
    driversToNotify: 10,
  };

  // Track pending ride requests for auto-assign
  private pendingRequests: Map<string, {
    request: DriverMatchRequest;
    notifiedDrivers: Set<string>;
    createdAt: Date;
    timeoutId?: NodeJS.Timeout;
  }> = new Map();

  /**
   * Find nearby drivers for a location
   */
  async findNearbyDrivers(
    latitude: number,
    longitude: number,
    radius: number = this.DEFAULT_RADIUS_KM,
    vehicleType?: VehicleType,
    limit: number = 10,
  ): Promise<NearbyDriver[]> {
    // Get all online drivers with their locations
    const drivers = await prisma.driver.findMany({
      where: {
        status: 'ONLINE',
        canAcceptRides: true,
        vehicle: vehicleType
          ? { type: vehicleType }
          : undefined,
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
        vehicle: {
          select: {
            type: true,
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
          },
        },
      },
    });

    // Filter by distance and calculate ETA
    const nearbyDrivers = drivers
      .filter((driver) => {
        if (!driver.currentLocation) return false;
        const distance = this.calculateDistance(
          latitude,
          longitude,
          Number(driver.currentLocation.latitude),
          Number(driver.currentLocation.longitude),
        );
        return distance <= radius;
      })
      .map((driver) => ({
        id: driver.id,
        userId: driver.userId,
        name: `${driver.user.firstName} ${driver.user.lastName}`,
        rating: Number(driver.rating),
        totalRides: driver.totalRides,
        vehicleType: driver.vehicle?.type as VehicleType,
        vehicleMake: driver.vehicle?.make || '',
        vehicleModel: driver.vehicle?.model || '',
        vehicleColor: driver.vehicle?.color || '',
        licensePlate: driver.vehicle?.licensePlate || '',
        latitude: Number(driver.currentLocation!.latitude),
        longitude: Number(driver.currentLocation!.longitude),
        distance: this.calculateDistance(
          latitude,
          longitude,
          Number(driver.currentLocation!.latitude),
          Number(driver.currentLocation!.longitude),
        ),
        eta: this.estimatePickupTime(
          latitude,
          longitude,
          Number(driver.currentLocation!.latitude),
          Number(driver.currentLocation!.longitude),
        ),
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, limit);

    this.logger.log(
      `Found ${nearbyDrivers.length} nearby drivers within ${radius}km`,
    );

    return nearbyDrivers;
  }

  /**
   * Find and notify drivers for a ride request
   */
  async findAndNotifyDrivers(request: DriverMatchRequest): Promise<MatchingResultDto> {
    const startTime = Date.now();

    // Find nearby drivers
    const nearbyDrivers = await this.findNearbyDrivers(
      request.pickupLatitude,
      request.pickupLongitude,
      this.DEFAULT_RADIUS_KM,
      request.vehicleType,
      this.MAX_DRIVERS_TO_NOTIFY,
    );

    if (nearbyDrivers.length === 0) {
      this.logger.warn(`No drivers found for ride ${request.rideId}`);

      // Update ride status
      await prisma.ride.update({
        where: { id: request.rideId },
        data: { status: 'NO_DRIVERS_FOUND' },
      });

      return {
        matched: false,
        reason: 'No drivers available in your area',
        driversNotified: 0,
        matchTime: (Date.now() - startTime) / 1000,
      };
    }

    // Create pending request for auto-assign
    this.pendingRequests.set(request.rideId, {
      request,
      notifiedDrivers: new Set(nearbyDrivers.map((d) => d.id)),
      createdAt: new Date(),
    });

    // Set up auto-assign timeout
    if (this.AUTO_ASSIGN_CONFIG.enabled) {
      const timeoutId = setTimeout(() => {
        this.autoAssignDriver(request.rideId).catch((err) => {
          this.logger.error(`Auto-assign failed for ride ${request.rideId}: ${err.message}`);
        });
      }, this.AUTO_ASSIGN_CONFIG.maxWaitTime * 1000);

      const pendingRequest = this.pendingRequests.get(request.rideId);
      if (pendingRequest) {
        pendingRequest.timeoutId = timeoutId;
      }
    }

    // Notify drivers (in production, this would send push notifications)
    await this.notifyDrivers(nearbyDrivers, request);

    this.logger.log(
      `Notified ${nearbyDrivers.length} drivers for ride ${request.rideId}`,
    );

    return {
      matched: false, // Will be updated when driver accepts
      driversNotified: nearbyDrivers.length,
      matchTime: (Date.now() - startTime) / 1000,
      alternatives: nearbyDrivers.slice(0, 5).map((d) => ({
        id: d.id,
        name: d.name,
        rating: d.rating,
        distance: d.distance,
        eta: d.eta,
      })),
    };
  }

  /**
   * Accept a ride request (called when driver accepts)
   */
  async acceptRideRequest(rideId: string, driverId: string): Promise<MatchingResultDto> {
    const pendingRequest = this.pendingRequests.get(rideId);

    if (!pendingRequest) {
      // Check if ride still exists and is available
      const ride = await prisma.ride.findUnique({
        where: { id: rideId },
        select: { status: true, driverId: true },
      });

      if (!ride) {
        throw new NotFoundException('Ride not found');
      }

      if (ride.driverId) {
        return {
          matched: false,
          reason: 'Ride already accepted by another driver',
          driversNotified: 0,
          matchTime: 0,
        };
      }
    }

    // Clear auto-assign timeout
    if (pendingRequest?.timeoutId) {
      clearTimeout(pendingRequest.timeoutId);
    }
    this.pendingRequests.delete(rideId);

    // Assign driver to ride
    await prisma.ride.update({
      where: { id: rideId },
      data: {
        driverId,
        status: 'DRIVER_ASSIGNED',
        acceptedAt: new Date(),
      },
    });

    // Get driver details
    const driver = await prisma.driver.findUnique({
      where: { id: driverId },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
        vehicle: {
          select: {
            type: true,
            make: true,
            model: true,
            color: true,
            licensePlate: true,
          },
        },
      },
    });

    this.logger.log(`Driver ${driverId} accepted ride ${rideId}`);

    return {
      matched: true,
      driver: driver
        ? {
            id: driver.id,
            name: `${driver.user.firstName} ${driver.user.lastName}`,
            rating: Number(driver.rating),
            vehicleType: driver.vehicle?.type || 'ECONOMY',
            vehiclePlate: driver.vehicle?.licensePlate || '',
            eta: 5, // Would calculate based on actual location
            distance: 0,
          }
        : undefined,
      driversNotified: pendingRequest?.notifiedDrivers.size || 0,
      matchTime: pendingRequest
        ? (Date.now() - pendingRequest.createdAt.getTime()) / 1000
        : 0,
    };
  }

  /**
   * Auto-assign driver if no one accepts within timeout
   */
  private async autoAssignDriver(rideId: string): Promise<void> {
    const pendingRequest = this.pendingRequests.get(rideId);
    if (!pendingRequest) return;

    this.logger.log(`Auto-assigning driver for ride ${rideId}`);

    // Find best available driver (highest rated, closest)
    const drivers = await this.findNearbyDrivers(
      pendingRequest.request.pickupLatitude,
      pendingRequest.request.pickupLongitude,
      this.AUTO_ASSIGN_CONFIG.maxDistance,
      pendingRequest.request.vehicleType,
      5,
    );

    // Filter by minimum rating
    const eligibleDrivers = drivers.filter(
      (d) => d.rating >= this.AUTO_ASSIGN_CONFIG.minRating,
    );

    if (eligibleDrivers.length === 0) {
      this.logger.warn(`No eligible drivers for auto-assign on ride ${rideId}`);
      return;
    }

    // Assign to best driver (first in sorted list)
    const bestDriver = eligibleDrivers[0];

    await prisma.ride.update({
      where: { id: rideId },
      data: {
        driverId: bestDriver.id,
        status: 'DRIVER_ASSIGNED',
        acceptedAt: new Date(),
        metadata: {
          autoAssigned: true,
          assignedAt: new Date(),
        },
      },
    });

    this.logger.log(
      `Auto-assigned driver ${bestDriver.id} to ride ${rideId}`,
    );

    this.pendingRequests.delete(rideId);
  }

  /**
   * Notify drivers about ride request
   */
  private async notifyDrivers(
    drivers: NearbyDriver[],
    request: DriverMatchRequest,
  ): Promise<void> {
    // In production, this would:
    // 1. Send push notifications to driver apps
    // 2. Create ride request records in notification service
    // 3. Use WebSocket for real-time updates

    // For now, we'll create RideRequest records
    const rideRequests = drivers.map((driver) => ({
      riderId: '', // Would get from ride
      pickupLatitude: request.pickupLatitude,
      pickupLongitude: request.pickupLongitude,
      dropoffLatitude: 0, // Would get from ride
      dropoffLongitude: 0, // Would get from ride
      vehicleType: request.vehicleType,
      category: 'REGULAR',
      status: 'PENDING',
      estimatedFare: request.estimatedFare,
      nearbyDrivers: [driver.id],
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
    }));

    // Create ride request records
    await prisma.rideRequest.createMany({
      data: rideRequests,
    });

    this.logger.log(`Created ${drivers.length} ride request notifications`);
  }

  /**
   * Decline ride request (driver declines)
   */
  async declineRideRequest(rideId: string, driverId: string): Promise<void> {
    const pendingRequest = this.pendingRequests.get(rideId);

    if (pendingRequest) {
      pendingRequest.notifiedDrivers.delete(driverId);

      // If no more drivers to notify, trigger auto-assign
      if (pendingRequest.notifiedDrivers.size === 0) {
        await this.autoAssignDriver(rideId);
      }
    }

    this.logger.log(`Driver ${driverId} declined ride ${rideId}`);
  }

  /**
   * Cancel pending ride request
   */
  async cancelPendingRequest(rideId: string): Promise<void> {
    const pendingRequest = this.pendingRequests.get(rideId);

    if (pendingRequest) {
      if (pendingRequest.timeoutId) {
        clearTimeout(pendingRequest.timeoutId);
      }
      this.pendingRequests.delete(rideId);
    }

    this.logger.log(`Cancelled pending request for ride ${rideId}`);
  }

  /**
   * Get matching statistics
   */
  async getMatchingStats(): Promise<{
    pendingRequests: number;
    averageMatchTime: number;
    acceptanceRate: number;
  }> {
    // Get stats from database
    const recentRides = await prisma.ride.findMany({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
        },
        status: {
          in: ['DRIVER_ASSIGNED', 'COMPLETED'],
        },
      },
      select: {
        requestedAt: true,
        acceptedAt: true,
      },
    });

    const matchTimes = recentRides
      .filter((r) => r.requestedAt && r.acceptedAt)
      .map((r) => (r.acceptedAt!.getTime() - r.requestedAt!.getTime()) / 1000);

    const averageMatchTime =
      matchTimes.length > 0
        ? matchTimes.reduce((a, b) => a + b, 0) / matchTimes.length
        : 0;

    const totalRequested = await prisma.ride.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
        status: {
          in: ['REQUESTED', 'SEARCHING_DRIVER', 'DRIVER_ASSIGNED', 'COMPLETED'],
        },
      },
    });

    const accepted = recentRides.length;
    const acceptanceRate = totalRequested > 0 ? accepted / totalRequested : 0;

    return {
      pendingRequests: this.pendingRequests.size,
      averageMatchTime: Math.round(averageMatchTime),
      acceptanceRate: Math.round(acceptanceRate * 100) / 100,
    };
  }

  /**
   * Calculate distance between two points
   */
  private calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
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
   * Estimate pickup time based on distance
   */
  private estimatePickupTime(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const distance = this.calculateDistance(lat1, lon1, lat2, lon2);
    // Assume average speed of 30 km/h in city traffic
    const estimatedTime = (distance / 30) * 60; // minutes
    return Math.round(estimatedTime);
  }
}
