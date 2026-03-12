import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { prisma } from '@tatx/database';
import { RideStatus } from '../ride/enums/ride.enums';

export interface DriverLocationUpdate {
  driverId: string;
  rideId: string;
  latitude: number;
  longitude: number;
  speed?: number;
  heading?: number;
  accuracy?: number;
}

export interface RideTrackingInfo {
  rideId: string;
  status: RideStatus;
  driverLocation?: {
    latitude: number;
    longitude: number;
    lastUpdated: Date;
    speed?: number;
    heading?: number;
  };
  pickupLocation?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  dropoffLocation?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  estimatedArrival?: Date;
  distanceToDestination?: number;
  timeToDestination?: number;
  progress?: number;
  lastUpdate?: Date;
}

export interface RouteInfo {
  distance: number;
  duration: number;
  polyline: string;
  steps?: Array<{
    instruction: string;
    distance: number;
    duration: number;
    startLocation: { lat: number; lng: number };
    endLocation: { lat: number; lng: number };
  }>;
}

@Injectable()
export class TrackingService {
  private readonly logger = new Logger(TrackingService.name);

  // In-memory store for real-time driver locations
  // In production, this would use Redis or similar
  private driverLocations: Map<string, {
    latitude: number;
    longitude: number;
    speed?: number;
    heading?: number;
    accuracy?: number;
    lastUpdated: Date;
  }> = new Map();

  // Active tracking sessions
  private trackingSessions: Map<string, {
    rideId: string;
    userId: string;
    startedAt: Date;
    lastPing: Date;
  }> = new Map();

  /**
   * Update driver location
   */
  async updateDriverLocation(update: DriverLocationUpdate): Promise<void> {
    const locationKey = `${update.driverId}-${update.rideId}`;

    // Store in memory for real-time access
    this.driverLocations.set(locationKey, {
      latitude: update.latitude,
      longitude: update.longitude,
      speed: update.speed,
      heading: update.heading,
      accuracy: update.accuracy,
      lastUpdated: new Date(),
    });

    // Store in database for persistence
    await prisma.location.upsert({
      where: {
        driverId: update.driverId,
      },
      update: {
        latitude: update.latitude,
        longitude: update.longitude,
        lastUpdated: new Date(),
      },
      create: {
        driverId: update.driverId,
        latitude: update.latitude,
        longitude: update.longitude,
        lastUpdated: new Date(),
      },
    });

    this.logger.debug(
      `Updated location for driver ${update.driverId} on ride ${update.rideId}`,
    );
  }

  /**
   * Get driver location for a ride
   */
  async getDriverLocation(
    rideId: string,
    driverId: string,
  ): Promise<{
    latitude: number;
    longitude: number;
    lastUpdated: Date;
    speed?: number;
    heading?: number;
  } | null> {
    const locationKey = `${driverId}-${rideId}`;
    const cachedLocation = this.driverLocations.get(locationKey);

    if (cachedLocation) {
      return {
        latitude: cachedLocation.latitude,
        longitude: cachedLocation.longitude,
        lastUpdated: cachedLocation.lastUpdated,
        speed: cachedLocation.speed,
        heading: cachedLocation.heading,
      };
    }

    // Fallback to database
    const location = await prisma.location.findUnique({
      where: { driverId },
      select: {
        latitude: true,
        longitude: true,
        lastUpdated: true,
      },
    });

    if (!location) {
      return null;
    }

    return {
      latitude: Number(location.latitude),
      longitude: Number(location.longitude),
      lastUpdated: location.lastUpdated,
    };
  }

  /**
   * Get ride tracking information
   */
  async getRideTrackingInfo(rideId: string): Promise<RideTrackingInfo> {
    const ride = await prisma.ride.findUnique({
      where: { id: rideId },
      select: {
        id: true,
        status: true,
        pickupLatitude: true,
        pickupLongitude: true,
        pickupAddress: true,
        dropoffLatitude: true,
        dropoffLongitude: true,
        dropoffAddress: true,
        driverId: true,
        startedAt: true,
        completedAt: true,
        duration: true,
        distance: true,
      },
    });

    if (!ride) {
      throw new NotFoundException(`Ride ${rideId} not found`);
    }

    const trackingInfo: RideTrackingInfo = {
      rideId: ride.id,
      status: ride.status as RideStatus,
      pickupLocation: {
        latitude: Number(ride.pickupLatitude),
        longitude: Number(ride.pickupLongitude),
        address: ride.pickupAddress,
      },
      dropoffLocation: {
        latitude: Number(ride.dropoffLatitude),
        longitude: Number(ride.dropoffLongitude),
        address: ride.dropoffAddress,
      },
    };

    // Get driver location if ride is in progress
    if (ride.driverId && ride.status !== 'COMPLETED' && ride.status !== 'CANCELLED') {
      const driverLocation = await this.getDriverLocation(rideId, ride.driverId);

      if (driverLocation) {
        trackingInfo.driverLocation = driverLocation;

        // Calculate ETA and progress
        const distanceToDestination = this.calculateDistance(
          driverLocation.latitude,
          driverLocation.longitude,
          Number(ride.dropoffLatitude),
          Number(ride.dropoffLongitude),
        );

        trackingInfo.distanceToDestination = Math.round(distanceToDestination * 100) / 100;

        // Estimate time based on average speed (assume 40 km/h if speed not available)
        const avgSpeed = driverLocation.speed || 40;
        trackingInfo.timeToDestination = Math.round((distanceToDestination / avgSpeed) * 60);

        trackingInfo.estimatedArrival = new Date(
          Date.now() + trackingInfo.timeToDestination * 60 * 1000,
        );

        // Calculate progress percentage
        const totalDistance = Number(ride.distance) || distanceToDestination;
        if (totalDistance > 0) {
          const distanceCovered = totalDistance - distanceToDestination;
          trackingInfo.progress = Math.round((distanceCovered / totalDistance) * 100);
        }

        trackingInfo.lastUpdate = driverLocation.lastUpdated;
      }
    }

    return trackingInfo;
  }

  /**
   * Start tracking session for a user
   */
  startTrackingSession(rideId: string, userId: string): void {
    const sessionKey = `${rideId}-${userId}`;

    this.trackingSessions.set(sessionKey, {
      rideId,
      userId,
      startedAt: new Date(),
      lastPing: new Date(),
    });

    this.logger.log(`Started tracking session for user ${userId} on ride ${rideId}`);
  }

  /**
   * Update tracking session ping
   */
  updateTrackingSession(rideId: string, userId: string): void {
    const sessionKey = `${rideId}-${userId}`;
    const session = this.trackingSessions.get(sessionKey);

    if (session) {
      session.lastPing = new Date();
      this.trackingSessions.set(sessionKey, session);
    }
  }

  /**
   * End tracking session
   */
  endTrackingSession(rideId: string, userId: string): void {
    const sessionKey = `${rideId}-${userId}`;
    const session = this.trackingSessions.get(sessionKey);

    if (session) {
      const duration = Math.round(
        (session.lastPing.getTime() - session.startedAt.getTime()) / 1000,
      );

      this.logger.log(
        `Ended tracking session for user ${userId} on ride ${rideId}. Duration: ${duration}s`,
      );

      this.trackingSessions.delete(sessionKey);
    }
  }

  /**
   * Get active tracking sessions for a ride
   */
  getActiveSessions(rideId: string): number {
    let count = 0;
    for (const session of this.trackingSessions.values()) {
      if (session.rideId === rideId) {
        count++;
      }
    }
    return count;
  }

  /**
   * Calculate route between two points
   */
  async calculateRoute(
    startLat: number,
    startLng: number,
    endLat: number,
    endLng: number,
  ): Promise<RouteInfo> {
    const distance = this.calculateDistance(startLat, startLng, endLat, endLng);

    // Estimate duration based on average speed
    const avgSpeed = 40; // km/h
    const duration = (distance / avgSpeed) * 60; // minutes

    // Generate simplified polyline (in production, use actual routing service)
    const polyline = this.encodePolyline([
      { lat: startLat, lng: startLng },
      { lat: endLat, lng: endLng },
    ]);

    return {
      distance: Math.round(distance * 100) / 100,
      duration: Math.round(duration),
      polyline,
    };
  }

  /**
   * Calculate distance between two points using Haversine formula
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
   * Encode coordinates to polyline (simplified)
   */
  private encodePolyline(coordinates: Array<{ lat: number; lng: number }>): string {
    // Simplified polyline encoding
    // In production, use a proper polyline encoding library
    return coordinates
      .map((c) => `${c.lat.toFixed(4)},${c.lng.toFixed(4)}`)
      .join('|');
  }

  /**
   * Clean up stale tracking sessions
   */
  cleanupStaleSessions(maxAgeMinutes: number = 30): void {
    const now = Date.now();
    const maxAge = maxAgeMinutes * 60 * 1000;

    for (const [key, session] of this.trackingSessions.entries()) {
      if (now - session.lastPing.getTime() > maxAge) {
        this.trackingSessions.delete(key);
        this.logger.debug(`Cleaned up stale tracking session: ${key}`);
      }
    }
  }

  /**
   * Clean up stale driver locations
   */
  cleanupStaleLocations(maxAgeMinutes: number = 5): void {
    const now = Date.now();
    const maxAge = maxAgeMinutes * 60 * 1000;

    for (const [key, location] of this.driverLocations.entries()) {
      if (now - location.lastUpdated.getTime() > maxAge) {
        this.driverLocations.delete(key);
        this.logger.debug(`Cleaned up stale driver location: ${key}`);
      }
    }
  }
}
