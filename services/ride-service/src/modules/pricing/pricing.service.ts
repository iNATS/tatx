import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { prisma } from '@tatx/database';
import { VehicleType } from '../ride/enums/ride.enums';

export interface FareCalculationInput {
  pickupLatitude: number;
  pickupLongitude: number;
  dropoffLatitude: number;
  dropoffLongitude: number;
  vehicleType?: VehicleType;
  promoCode?: string;
}

export interface FareEstimate {
  baseFare: number;
  distanceFare: number;
  timeFare: number;
  surgeMultiplier: number;
  surgeReason?: string;
  subtotal: number;
  discount?: number;
  promoCode?: string;
  tax: number;
  serviceFee: number;
  total: number;
  distance: number;
  duration: number;
  currency: string;
  vehicleType: VehicleType;
  validUntil: Date;
}

export interface FareRecalculationInput {
  rideId: string;
  originalFare: number;
  finalDistance: number;
  finalDuration?: number | null;
  additionalCharges?: number;
}

export interface FareRecalculation {
  originalFare: number;
  adjustedFare: number;
  additionalCharges: number;
  finalFare: number;
  driverEarnings: number;
}

export interface VehiclePricingConfig {
  vehicleType: VehicleType;
  baseFare: number;
  perKmRate: number;
  perMinuteRate: number;
  minimumFare: number;
  bookingFee: number;
  serviceFeePercent: number;
  taxPercent: number;
  cancellationFee: number;
  waitingTimeRate: number;
  freeWaitingTime: number;
}

export interface SurgePricingInfo {
  active: boolean;
  multiplier: number;
  reason: string;
  demandLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH';
  availableDrivers: number;
  pendingRequests: number;
  estimatedEnd?: Date;
}

@Injectable()
export class PricingService {
  private readonly logger = new Logger(PricingService.name);
  private readonly CURRENCY = 'SAR';
  private readonly ESTIMATE_VALID_MINUTES = 10;

  // Default pricing configuration by vehicle type
  private readonly PRICING_CONFIG: Record<VehicleType, VehiclePricingConfig> = {
    [VehicleType.ECONOMY]: {
      vehicleType: VehicleType.ECONOMY,
      baseFare: 5.0,
      perKmRate: 1.75,
      perMinuteRate: 0.40,
      minimumFare: 10.0,
      bookingFee: 2.0,
      serviceFeePercent: 5,
      taxPercent: 15, // VAT in Saudi Arabia
      cancellationFee: 10.0,
      waitingTimeRate: 0.50,
      freeWaitingTime: 5,
    },
    [VehicleType.COMFORT]: {
      vehicleType: VehicleType.COMFORT,
      baseFare: 8.0,
      perKmRate: 2.50,
      perMinuteRate: 0.60,
      minimumFare: 15.0,
      bookingFee: 3.0,
      serviceFeePercent: 5,
      taxPercent: 15,
      cancellationFee: 15.0,
      waitingTimeRate: 0.75,
      freeWaitingTime: 5,
    },
    [VehicleType.PREMIUM]: {
      vehicleType: VehicleType.PREMIUM,
      baseFare: 12.0,
      perKmRate: 3.50,
      perMinuteRate: 0.85,
      minimumFare: 25.0,
      bookingFee: 5.0,
      serviceFeePercent: 7,
      taxPercent: 15,
      cancellationFee: 25.0,
      waitingTimeRate: 1.00,
      freeWaitingTime: 5,
    },
    [VehicleType.LUXURY]: {
      vehicleType: VehicleType.LUXURY,
      baseFare: 25.0,
      perKmRate: 6.00,
      perMinuteRate: 1.50,
      minimumFare: 50.0,
      bookingFee: 10.0,
      serviceFeePercent: 10,
      taxPercent: 15,
      cancellationFee: 50.0,
      waitingTimeRate: 2.00,
      freeWaitingTime: 10,
    },
    [VehicleType.VAN]: {
      vehicleType: VehicleType.VAN,
      baseFare: 15.0,
      perKmRate: 4.00,
      perMinuteRate: 1.00,
      minimumFare: 30.0,
      bookingFee: 5.0,
      serviceFeePercent: 7,
      taxPercent: 15,
      cancellationFee: 30.0,
      waitingTimeRate: 1.25,
      freeWaitingTime: 5,
    },
    [VehicleType.MOTORCYCLE]: {
      vehicleType: VehicleType.MOTORCYCLE,
      baseFare: 3.0,
      perKmRate: 1.25,
      perMinuteRate: 0.30,
      minimumFare: 7.0,
      bookingFee: 1.0,
      serviceFeePercent: 5,
      taxPercent: 15,
      cancellationFee: 5.0,
      waitingTimeRate: 0.25,
      freeWaitingTime: 3,
    },
  };

  /**
   * Calculate fare for a ride
   */
  async calculateFare(input: FareCalculationInput): Promise<FareEstimate> {
    const vehicleType = input.vehicleType || VehicleType.ECONOMY;
    const config = this.getPricingConfig(vehicleType);

    // Calculate distance and duration (using Haversine formula for estimation)
    const distance = this.calculateDistance(
      input.pickupLatitude,
      input.pickupLongitude,
      input.dropoffLatitude,
      input.dropoffLongitude,
    );

    // Estimate duration based on distance (average 40 km/h in city)
    const duration = (distance / 40) * 60;

    // Get surge pricing for pickup location
    const surgeInfo = await this.getSurgePricing(input.pickupLatitude, input.pickupLongitude);

    // Calculate base fares
    const baseFare = config.baseFare;
    const distanceFare = distance * config.perKmRate;
    const timeFare = duration * config.perMinuteRate;

    // Apply surge multiplier
    const subtotal = (baseFare + distanceFare + timeFare) * surgeInfo.multiplier;

    // Apply booking fee
    const withBookingFee = subtotal + config.bookingFee;

    // Calculate service fee
    const serviceFee = withBookingFee * (config.serviceFeePercent / 100);

    // Calculate tax (VAT)
    const taxableAmount = withBookingFee + serviceFee;
    const tax = taxableAmount * (config.taxPercent / 100);

    // Calculate total
    let total = taxableAmount + tax;

    // Apply minimum fare
    total = Math.max(total, config.minimumFare);

    // Apply promo code discount if provided
    let discount = 0;
    let appliedPromoCode: string | undefined;

    if (input.promoCode) {
      const promoResult = await this.applyPromoCode(input.promoCode, total, vehicleType);
      if (promoResult.valid) {
        discount = promoResult.discountAmount || 0;
        appliedPromoCode = input.promoCode;
        total = Math.max(total - discount, config.minimumFare);
      }
    }

    // Round to 2 decimal places
    total = Math.round(total * 100) / 100;

    const estimate: FareEstimate = {
      baseFare: Math.round(baseFare * 100) / 100,
      distanceFare: Math.round(distanceFare * 100) / 100,
      timeFare: Math.round(timeFare * 100) / 100,
      surgeMultiplier: surgeInfo.multiplier,
      surgeReason: surgeInfo.active ? surgeInfo.reason : undefined,
      subtotal: Math.round(subtotal * 100) / 100,
      discount: discount > 0 ? Math.round(discount * 100) / 100 : undefined,
      promoCode: appliedPromoCode,
      serviceFee: Math.round(serviceFee * 100) / 100,
      tax: Math.round(tax * 100) / 100,
      total,
      distance: Math.round(distance * 100) / 100,
      duration: Math.round(duration),
      currency: this.CURRENCY,
      vehicleType,
      validUntil: new Date(Date.now() + this.ESTIMATE_VALID_MINUTES * 60 * 1000),
    };

    this.logger.log(
      `Fare estimate for ${vehicleType}: ${total} ${this.CURRENCY} (${distance}km, ${duration}min)`,
    );

    return estimate;
  }

  /**
   * Recalculate fare after ride completion
   */
  async recalculateFare(input: FareRecalculationInput): Promise<FareRecalculation> {
    const ride = await prisma.ride.findUnique({
      where: { id: input.rideId },
      select: { vehicleType: true, distance: true, duration: true, finalFare: true },
    });

    if (!ride) {
      throw new NotFoundException(`Ride ${input.rideId} not found`);
    }

    const config = this.getPricingConfig(ride.vehicleType as VehicleType);
    const finalDistance = input.finalDistance;
    const finalDuration = input.finalDuration || ride.duration;

    // Recalculate based on actual distance and duration
    const distanceFare = finalDistance * config.perKmRate;
    const timeFare = (finalDuration || 0) * config.perMinuteRate;
    const calculatedFare = config.baseFare + distanceFare + timeFare;

    // Add additional charges
    const additionalCharges = input.additionalCharges || 0;
    const adjustedFare = calculatedFare + additionalCharges;

    // Calculate driver earnings (typically 75-80% of fare)
    const driverEarningsPercentage = 0.75;
    const driverEarnings = adjustedFare * driverEarningsPercentage;

    const finalFare = Math.round(adjustedFare * 100) / 100;

    this.logger.log(
      `Recalculated fare for ride ${input.rideId}: ${finalFare} (original: ${input.originalFare})`,
    );

    return {
      originalFare: input.originalFare,
      adjustedFare: Math.round(adjustedFare * 100) / 100,
      additionalCharges: Math.round(additionalCharges * 100) / 100,
      finalFare,
      driverEarnings: Math.round(driverEarnings * 100) / 100,
    };
  }

  /**
   * Get surge pricing for a location
   */
  async getSurgePricing(latitude: number, longitude: number): Promise<SurgePricingInfo> {
    // In production, this would query real-time demand data
    // For now, we'll simulate based on time of day and day of week

    const now = new Date();
    const hour = now.getHours();
    const dayOfWeek = now.getDay();

    // Check for peak hours (morning rush: 7-9 AM, evening rush: 5-8 PM)
    const isMorningRush = hour >= 7 && hour <= 9;
    const isEveningRush = hour >= 17 && hour <= 20;
    const isWeekend = dayOfWeek === 5 || dayOfWeek === 6; // Thursday-Friday in Saudi Arabia

    let multiplier = 1.0;
    let reason = 'Normal demand';
    let demandLevel: SurgePricingInfo['demandLevel'] = 'LOW';

    // Count nearby drivers and pending requests (simplified)
    const nearbyDrivers = await this.getNearbyDriverCount(latitude, longitude);
    const pendingRequests = await this.getPendingRequestCount(latitude, longitude);

    // Calculate demand ratio
    const demandRatio = pendingRequests / Math.max(nearbyDrivers, 1);

    if (isMorningRush || isEveningRush) {
      multiplier = 1.3;
      reason = isMorningRush ? 'Morning rush hour' : 'Evening rush hour';
      demandLevel = 'HIGH';
    }

    if (isWeekend && (hour >= 20 || hour <= 2)) {
      multiplier = 1.5;
      reason = 'Weekend night demand';
      demandLevel = 'VERY_HIGH';
    }

    // Adjust based on real-time demand ratio
    if (demandRatio > 3) {
      multiplier = Math.max(multiplier, 1.8);
      reason = 'High demand in your area';
      demandLevel = 'VERY_HIGH';
    } else if (demandRatio > 2) {
      multiplier = Math.max(multiplier, 1.5);
      reason = 'Increased demand in your area';
      demandLevel = 'HIGH';
    } else if (demandRatio > 1.5) {
      multiplier = Math.max(multiplier, 1.2);
      reason = 'Moderate demand in your area';
      demandLevel = 'MEDIUM';
    }

    // Cap the multiplier
    multiplier = Math.min(multiplier, 3.0);

    const surgeInfo: SurgePricingInfo = {
      active: multiplier > 1.0,
      multiplier: Math.round(multiplier * 100) / 100,
      reason,
      demandLevel,
      availableDrivers: nearbyDrivers,
      pendingRequests,
    };

    // Estimate when surge might end
    if (surgeInfo.active) {
      const surgeEndMinutes = isMorningRush || isEveningRush ? 60 : 30;
      surgeInfo.estimatedEnd = new Date(Date.now() + surgeEndMinutes * 60 * 1000);
    }

    return surgeInfo;
  }

  /**
   * Apply promo code to fare
   */
  async applyPromoCode(
    code: string,
    fareAmount: number,
    vehicleType: VehicleType,
  ): Promise<{ valid: boolean; discountAmount?: number; error?: string }> {
    const promoCode = await prisma.promoCode.findFirst({
      where: {
        code: code.toUpperCase(),
        isActive: true,
      },
    });

    if (!promoCode) {
      return { valid: false, error: 'Invalid promo code' };
    }

    // Check validity dates
    const now = new Date();
    if (promoCode.validFrom && now < promoCode.validFrom) {
      return { valid: false, error: 'Promo code not yet active' };
    }
    if (promoCode.validUntil && now > promoCode.validUntil) {
      return { valid: false, error: 'Promo code has expired' };
    }

    // Check minimum fare requirement
    if (promoCode.minRideFare && fareAmount < promoCode.minRideFare) {
      return { valid: false, error: `Minimum fare of ${promoCode.minRideFare} ${this.CURRENCY} required` };
    }

    // Check vehicle type applicability
    if (promoCode.applicableVehicleTypes && !promoCode.applicableVehicleTypes.includes(vehicleType)) {
      return { valid: false, error: 'Promo code not applicable for this vehicle type' };
    }

    // Calculate discount
    let discountAmount = 0;

    if (promoCode.discountType === 'PERCENTAGE') {
      discountAmount = fareAmount * (promoCode.discountValue / 100);

      // Apply max discount cap if set
      if (promoCode.maxDiscount) {
        discountAmount = Math.min(discountAmount, promoCode.maxDiscount);
      }
    } else if (promoCode.discountType === 'FIXED') {
      discountAmount = promoCode.discountValue;

      // Don't allow discount to exceed fare
      discountAmount = Math.min(discountAmount, fareAmount);
    }

    return {
      valid: true,
      discountAmount: Math.round(discountAmount * 100) / 100,
    };
  }

  /**
   * Get pricing configuration for a vehicle type
   */
  getPricingConfig(vehicleType: VehicleType): VehiclePricingConfig {
    return this.PRICING_CONFIG[vehicleType] || this.PRICING_CONFIG[VehicleType.ECONOMY];
  }

  /**
   * Get all vehicle options with fares
   */
  async getVehicleOptions(input: Omit<FareCalculationInput, 'vehicleType'>): Promise<
    Array<{
      vehicleType: VehicleType;
      fare: number;
      eta: number;
    }>
  > {
    const vehicleTypes = Object.values(VehicleType);
    const options = await Promise.all(
      vehicleTypes.map(async (vehicleType) => {
        const estimate = await this.calculateFare({ ...input, vehicleType });
        const eta = await this.estimatePickupTime(input.pickupLatitude, input.pickupLongitude, vehicleType);

        return {
          vehicleType,
          fare: estimate.total,
          eta,
        };
      }),
    );

    return options.sort((a, b) => a.fare - b.fare);
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
   * Estimate pickup time based on vehicle type and location
   */
  private async estimatePickupTime(
    latitude: number,
    longitude: number,
    vehicleType: VehicleType,
  ): Promise<number> {
    // Simplified estimation - in production would use real driver locations
    const baseEta = 5; // minutes

    // Adjust based on vehicle availability
    const config = this.getPricingConfig(vehicleType);
    const availabilityFactor = vehicleType === VehicleType.LUXURY ? 2 : 1;

    return baseEta * availabilityFactor;
  }

  /**
   * Get count of nearby available drivers
   */
  private async getNearbyDriverCount(latitude: number, longitude: number): Promise<number> {
    // Simplified - in production would use geospatial queries
    const drivers = await prisma.driver.findMany({
      where: {
        status: 'ONLINE',
        canAcceptRides: true,
      },
      include: {
        currentLocation: true,
      },
    });

    // Filter by distance (simplified)
    const nearbyCount = drivers.filter((driver) => {
      if (!driver.currentLocation) return false;
      const distance = this.calculateDistance(
        latitude,
        longitude,
        Number(driver.currentLocation.latitude),
        Number(driver.currentLocation.longitude),
      );
      return distance <= 5; // 5km radius
    }).length;

    return nearbyCount;
  }

  /**
   * Get count of pending ride requests in area
   */
  private async getPendingRequestCount(latitude: number, longitude: number): Promise<number> {
    const count = await prisma.ride.count({
      where: {
        status: {
          in: ['REQUESTED', 'SEARCHING_DRIVER'],
        },
        pickupLatitude: {
          gte: latitude - 0.05,
          lte: latitude + 0.05,
        },
        pickupLongitude: {
          gte: longitude - 0.05,
          lte: longitude + 0.05,
        },
      },
    });

    return count;
  }
}
