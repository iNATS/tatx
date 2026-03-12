/**
 * Ride-related types for the ride-hailing service
 */

import { Coordinates, Address, VehicleType, Money, Currency } from './common';

// ===========================================
// Ride Types
// ===========================================

export type RideStatus =
  | 'REQUESTED'
  | 'SEARCHING_DRIVER'
  | 'DRIVER_ASSIGNED'
  | 'DRIVER_ARRIVED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED';

export interface Ride {
  id: string;
  riderId: string;
  driverId?: string;
  status: RideStatus;
  pickup: Location;
  dropoff: Location;
  vehicleType: VehicleType;
  fare: RideFare;
  finalFare?: number;
  route?: Route;
  scheduledAt?: Date;
  startedAt?: Date;
  completedAt?: Date;
  cancelledAt?: Date;
  cancellationReason?: string;
  cancelledBy?: string;
  notes?: string;
  paymentMethod?: string;
  paymentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Note: Location is exported from common.ts

export interface Route {
  distance: number; // in km
  duration: number; // in minutes
  polyline: string;
  steps?: RouteStep[];
}

export interface RouteStep {
  instruction: string;
  distance: number;
  duration: number;
  startLocation: Coordinates;
  endLocation: Coordinates;
}

// ===========================================
// Fare Types
// ===========================================

export interface RideFare {
  baseFare: number;
  distanceFare: number;
  timeFare: number;
  surgeMultiplier: number;
  serviceFee: number;
  tax: number;
  discount: number;
  total: number;
  currency: Currency;
}

export interface FareEstimate {
  distance: number;
  duration: number;
  fare: RideFare;
  surgeMultiplier: number;
  surgeActive: boolean;
  breakdown: FareBreakdown;
}

export interface FareBreakdown {
  baseFare: number;
  distanceRate: number;
  distanceKm: number;
  timeRate: number;
  timeMinutes: number;
  surgeMultiplier: number;
  serviceFeePercent: number;
  taxPercent: number;
}

export interface PricingConfig {
  baseFare: number;
  perKmRate: number;
  perMinuteRate: number;
  minimumFare: number;
  surgeMultiplier: number;
  serviceFeePercent: number;
  taxPercent: number;
}

export interface SurgePricing {
  active: boolean;
  multiplier: number;
  reason: string;
  area: {
    center: Coordinates;
    radius: number;
  };
  startTime: Date;
  estimatedEndTime?: Date;
}

// ===========================================
// Ride Request Types
// ===========================================

export interface RideRequest {
  id: string;
  riderId: string;
  pickup: Coordinates;
  dropoff: Coordinates;
  vehicleType: VehicleType;
  status: 'PENDING' | 'ACCEPTED' | 'EXPIRED' | 'CANCELLED';
  expiresAt: Date;
  createdAt: Date;
}

export interface CreateRideRequest {
  pickupAddress: string;
  pickupLatitude: number;
  pickupLongitude: number;
  dropoffAddress: string;
  dropoffLatitude: number;
  dropoffLongitude: number;
  vehicleType?: VehicleType;
  scheduledAt?: Date;
  paymentMethodId?: string;
  promoCode?: string;
  notes?: string;
}

export interface EstimateFareRequest {
  pickupLatitude: number;
  pickupLongitude: number;
  dropoffLatitude: number;
  dropoffLongitude: number;
  vehicleType?: VehicleType;
}

// ===========================================
// Driver Matching Types
// ===========================================

export interface DriverMatch {
  driverId: string;
  distance: number; // in km
  eta: number; // in minutes
  rating: number;
  totalRides: number;
  vehicle: VehicleInfo;
  location: Coordinates;
}

export interface VehicleInfo {
  id: string;
  type: VehicleType;
  make: string;
  model: string;
  year: number;
  color: string;
  licensePlate: string;
}

export interface MatchingConfig {
  maxSearchRadius: number; // in km
  maxEta: number; // in minutes
  minDriverRating: number;
  searchTimeout: number; // in seconds
  maxRetryAttempts: number;
}

export interface SearchArea {
  center: Coordinates;
  radius: number;
  excludedDriverIds?: string[];
}

// ===========================================
// Ride Share Types
// ===========================================

export interface RideShare {
  id: string;
  primaryRideId: string;
  rides: SharedRideSegment[];
  route: SharedRoute;
  savings: {
    money: number;
    time: number;
    distance: number;
  };
  status: 'SEARCHING' | 'MATCHED' | 'IN_PROGRESS' | 'COMPLETED';
}

export interface SharedRideSegment {
  rideId: string;
  riderId: string;
  pickup: Location;
  dropoff: Location;
  pickupOrder: number;
  dropoffOrder: number;
  fareShare: number;
}

export interface SharedRoute {
  waypoints: Location[];
  totalDistance: number;
  totalDuration: number;
}

// ===========================================
// Ride Service Interface
// ===========================================

export interface IRideService {
  // Ride management
  createRide(request: CreateRideRequest, userId: string): Promise<Ride>;
  cancelRide(rideId: string, userId: string, reason: string): Promise<Ride>;
  getRide(rideId: string, userId: string): Promise<Ride>;
  getUserRides(userId: string, filters?: RideFilters): Promise<Ride[]>;
  
  // Fare estimation
  estimateFare(request: EstimateFareRequest): Promise<FareEstimate>;
  
  // Driver matching
  findNearbyDrivers(location: Coordinates, vehicleType?: VehicleType): Promise<DriverMatch[]>;
  assignDriver(rideId: string, driverId: string): Promise<Ride>;
  
  // Ride status updates
  startRide(rideId: string, driverId: string): Promise<Ride>;
  completeRide(rideId: string, driverId: string, notes?: string): Promise<Ride>;
  
  // Surge pricing
  getCurrentSurge(location: Coordinates): Promise<SurgePricing>;
  updateSurgePricing(area: SearchArea, multiplier: number, reason: string): Promise<SurgePricing>;
}

export interface RideFilters {
  status?: RideStatus;
  startDate?: Date;
  endDate?: Date;
  vehicleType?: VehicleType;
  limit?: number;
  offset?: number;
}

// ===========================================
// Ride Events
// ===========================================

export interface RideRequestedEvent {
  type: 'RIDE_REQUESTED';
  rideId: string;
  riderId: string;
  pickup: Coordinates;
  dropoff: Coordinates;
  vehicleType: VehicleType;
  timestamp: Date;
}

export interface DriverAssignedEvent {
  type: 'DRIVER_ASSIGNED';
  rideId: string;
  driverId: string;
  riderId: string;
  eta: number;
  timestamp: Date;
}

export interface RideStartedEvent {
  type: 'RIDE_STARTED';
  rideId: string;
  driverId: string;
  riderId: string;
  timestamp: Date;
}

export interface RideCompletedEvent {
  type: 'RIDE_COMPLETED';
  rideId: string;
  driverId: string;
  riderId: string;
  finalFare: number;
  distance: number;
  duration: number;
  timestamp: Date;
}

export interface RideCancelledEvent {
  type: 'RIDE_CANCELLED';
  rideId: string;
  cancelledBy: 'RIDER' | 'DRIVER';
  reason: string;
  timestamp: Date;
}

export type RideEvent =
  | RideRequestedEvent
  | DriverAssignedEvent
  | RideStartedEvent
  | RideCompletedEvent
  | RideCancelledEvent;

// ===========================================
// Vehicle Types Configuration
// ===========================================

export interface VehicleCategory {
  id: string;
  name: string;
  type: VehicleType;
  description: string;
  icon: string;
  capacity: {
    passengers: number;
    luggage: number;
  };
  pricing: {
    baseFare: number;
    perKmRate: number;
    perMinuteRate: number;
    minimumFare: number;
  };
  enabled: boolean;
}

export const DEFAULT_VEHICLE_CATEGORIES: VehicleCategory[] = [
  {
    id: 'economy',
    name: 'Economy',
    type: 'CAR',
    description: 'Affordable everyday rides',
    icon: 'car',
    capacity: { passengers: 4, luggage: 2 },
    pricing: {
      baseFare: 2.5,
      perKmRate: 1.5,
      perMinuteRate: 0.35,
      minimumFare: 5.0,
    },
    enabled: true,
  },
  {
    id: 'comfort',
    name: 'Comfort',
    type: 'CAR',
    description: 'Newer cars with extra legroom',
    icon: 'car-side',
    capacity: { passengers: 4, luggage: 3 },
    pricing: {
      baseFare: 4.0,
      perKmRate: 2.0,
      perMinuteRate: 0.45,
      minimumFare: 8.0,
    },
    enabled: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    type: 'CAR',
    description: 'Luxury vehicles',
    icon: 'star',
    capacity: { passengers: 4, luggage: 3 },
    pricing: {
      baseFare: 7.0,
      perKmRate: 3.5,
      perMinuteRate: 0.65,
      minimumFare: 15.0,
    },
    enabled: true,
  },
  {
    id: 'xl',
    name: 'XL',
    type: 'VAN',
    description: 'Rides for groups up to 6',
    icon: 'users',
    capacity: { passengers: 6, luggage: 4 },
    pricing: {
      baseFare: 5.0,
      perKmRate: 2.5,
      perMinuteRate: 0.55,
      minimumFare: 10.0,
    },
    enabled: true,
  },
  {
    id: 'moto',
    name: 'Motorcycle',
    type: 'MOTORCYCLE',
    description: 'Fast and affordable',
    icon: 'motorcycle',
    capacity: { passengers: 1, luggage: 1 },
    pricing: {
      baseFare: 1.5,
      perKmRate: 0.8,
      perMinuteRate: 0.20,
      minimumFare: 3.0,
    },
    enabled: true,
  },
];
