import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Base exception for ride-related errors
 */
export class RideException extends HttpException {
  constructor(
    message: string,
    status: HttpStatus,
    public readonly code: string,
    public readonly details?: any,
  ) {
    super({ message, code, details }, status);
  }
}

/**
 * Thrown when a ride is not found
 */
export class RideNotFoundException extends RideException {
  constructor(rideId: string) {
    super(
      `Ride with ID ${rideId} not found`,
      HttpStatus.NOT_FOUND,
      'RIDE_NOT_FOUND',
      { rideId },
    );
  }
}

/**
 * Thrown when a ride status transition is invalid
 */
export class InvalidRideStatusException extends RideException {
  constructor(currentStatus: string, targetStatus: string) {
    super(
      `Cannot transition ride from ${currentStatus} to ${targetStatus}`,
      HttpStatus.BAD_REQUEST,
      'INVALID_STATUS_TRANSITION',
      { currentStatus, targetStatus },
    );
  }
}

/**
 * Thrown when a ride cannot be cancelled
 */
export class RideCannotBeCancelledException extends RideException {
  constructor(rideId: string, reason: string) {
    super(
      `Ride ${rideId} cannot be cancelled: ${reason}`,
      HttpStatus.CONFLICT,
      'RIDE_CANNOT_BE_CANCELLED',
      { rideId, reason },
    );
  }
}

/**
 * Thrown when driver assignment fails
 */
export class DriverAssignmentException extends RideException {
  constructor(message: string, details?: any) {
    super(message, HttpStatus.CONFLICT, 'DRIVER_ASSIGNMENT_FAILED', details);
  }
}

/**
 * Thrown when no drivers are available
 */
export class NoDriversAvailableException extends RideException {
  constructor(location?: string) {
    super(
      location
        ? `No drivers available in ${location}`
        : 'No drivers available',
      HttpStatus.SERVICE_UNAVAILABLE,
      'NO_DRIVERS_AVAILABLE',
      { location },
    );
  }
}

/**
 * Thrown when fare calculation fails
 */
export class FareCalculationException extends RideException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST, 'FARE_CALCULATION_FAILED');
  }
}

/**
 * Thrown when promo code is invalid
 */
export class InvalidPromoCodeException extends RideException {
  constructor(code: string, reason: string) {
    super(
      `Promo code ${code} is invalid: ${reason}`,
      HttpStatus.BAD_REQUEST,
      'INVALID_PROMO_CODE',
      { code, reason },
    );
  }
}

/**
 * Thrown when driver is not authorized for an action
 */
export class DriverNotAuthorizedException extends RideException {
  constructor(action: string) {
    super(
      `Driver is not authorized to ${action}`,
      HttpStatus.FORBIDDEN,
      'DRIVER_NOT_AUTHORIZED',
      { action },
    );
  }
}

/**
 * Thrown when ride request is expired
 */
export class RideRequestExpiredException extends RideException {
  constructor(rideId: string) {
    super(
      `Ride request ${rideId} has expired`,
      HttpStatus.GONE,
      'RIDE_REQUEST_EXPIRED',
      { rideId },
    );
  }
}

/**
 * Thrown when rating is invalid
 */
export class InvalidRatingException extends RideException {
  constructor(reason: string) {
    super(
      `Invalid rating: ${reason}`,
      HttpStatus.BAD_REQUEST,
      'INVALID_RATING',
    );
  }
}

/**
 * Thrown when location data is invalid
 */
export class InvalidLocationException extends RideException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST, 'INVALID_LOCATION');
  }
}

/**
 * Thrown when vehicle type is not available
 */
export class VehicleTypeUnavailableException extends RideException {
  constructor(vehicleType: string, location?: string) {
    super(
      `${vehicleType} vehicles are not available${location ? ` in ${location}` : ''}`,
      HttpStatus.SERVICE_UNAVAILABLE,
      'VEHICLE_TYPE_UNAVAILABLE',
      { vehicleType, location },
    );
  }
}
