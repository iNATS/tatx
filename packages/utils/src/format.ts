/**
 * Format utility functions
 */

import { formatCurrency } from './math';

/**
 * Format number with thousand separators
 */
export function formatNumber(num: number, locale: string = 'en-US'): string {
  return new Intl.NumberFormat(locale).format(num);
}

/**
 * Format percentage
 */
export function formatPercent(value: number, decimals: number = 0, locale: string = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value / 100);
}

/**
 * Format distance
 */
export function formatDistance(kilometers: number, locale: string = 'en-US'): string {
  if (kilometers < 1) {
    return `${Math.round(kilometers * 1000)} m`;
  }
  return `${kilometers.toFixed(1)} km`;
}

/**
 * Format duration in minutes to human-readable string
 */
export function formatDuration(minutes: number): string {
  if (minutes < 1) {
    return 'Less than a minute';
  }
  if (minutes < 60) {
    return `${Math.round(minutes)} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = Math.round(minutes % 60);
  if (remainingMinutes === 0) {
    return `${hours}h`;
  }
  return `${hours}h ${remainingMinutes}m`;
}

/**
 * Format size in bytes to human-readable string
 */
export function formatSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Format speed
 */
export function formatSpeed(kmPerHour: number, locale: string = 'en-US'): string {
  return `${kmPerHour.toFixed(0)} km/h`;
}

/**
 * Format temperature
 */
export function formatTemperature(celsius: number, unit: 'C' | 'F' = 'C'): string {
  if (unit === 'F') {
    const fahrenheit = (celsius * 9) / 5 + 32;
    return `${fahrenheit.toFixed(1)}°F`;
  }
  return `${celsius.toFixed(1)}°C`;
}

/**
 * Format rating with stars
 */
export function formatRating(rating: number, maxRating: number = 5): string {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

  return '★'.repeat(fullStars) + (hasHalfStar ? '½' : '') + '☆'.repeat(emptyStars);
}

/**
 * Format rating as number
 */
export function formatRatingNumber(rating: number, decimals: number = 1): string {
  return rating.toFixed(decimals);
}

/**
 * Format order number
 */
export function formatOrderNumber(orderNumber: string): string {
  return `#${orderNumber}`;
}

/**
 * Format ride ID
 */
export function formatRideId(rideId: string): string {
  return `Ride #${rideId.slice(-6).toUpperCase()}`;
}

/**
 * Format phone number
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  if (cleaned.length === 11) {
    return `+${cleaned[0]} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  return phone;
}

/**
 * Format address
 */
export function formatAddress(address: {
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}): string {
  const parts = [
    address.street,
    address.city,
    address.state,
    address.postalCode,
    address.country,
  ].filter(Boolean);
  return parts.join(', ');
}

/**
 * Format name
 */
export function formatName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`.trim();
}

/**
 * Format initials
 */
export function formatInitials(firstName: string, lastName: string): string {
  return `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase();
}

/**
 * Format status badge text
 */
export function formatStatus(status: string): string {
  return status
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Format vehicle type
 */
export function formatVehicleType(type: string): string {
  const types: Record<string, string> = {
    CAR: 'Car',
    MOTORCYCLE: 'Motorcycle',
    BICYCLE: 'Bicycle',
    VAN: 'Van',
    TRUCK: 'Truck',
  };
  return types[type] || type;
}

/**
 * Format payment method
 */
export function formatPaymentMethod(method: string): string {
  const methods: Record<string, string> = {
    CREDIT_CARD: 'Credit Card',
    DEBIT_CARD: 'Debit Card',
    CASH: 'Cash',
    WALLET: 'Wallet',
    APPLE_PAY: 'Apple Pay',
    GOOGLE_PAY: 'Google Pay',
    BANK_TRANSFER: 'Bank Transfer',
  };
  return methods[method] || method;
}

/**
 * Format relative time
 */
export function formatRelativeTime(date: Date | string): string {
  const now = new Date();
  const then = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Just now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks}w ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths}mo ago`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears}y ago`;
}

/**
 * Format ETA
 */
export function formatETA(minutes: number): string {
  if (minutes <= 0) {
    return 'Arriving now';
  }
  if (minutes < 1) {
    return 'Less than a minute';
  }
  if (minutes < 60) {
    return `${Math.round(minutes)} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = Math.round(minutes % 60);
  return `${hours}h ${remainingMinutes}m`;
}

/**
 * Format price range
 */
export function formatPriceRange(min: number, max: number, currency: string = 'USD'): string {
  return `${formatCurrency(min, currency)} - ${formatCurrency(max, currency)}`;
}

/**
 * Format discount
 */
export function formatDiscount(amount: number, isPercentage: boolean): string {
  if (isPercentage) {
    return `${amount}% off`;
  }
  return `Save ${formatCurrency(amount)}`;
}
