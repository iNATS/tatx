/**
 * Common types used across the platform
 */

// ===========================================
// Base Types
// ===========================================

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// ===========================================
// Geographic Types
// ===========================================

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Location extends Coordinates {
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  heading?: number;
  speed?: number;
  accuracy?: number;
}

export interface Address {
  id?: string;
  label?: string;
  address: string;
  city: string;
  state?: string;
  country: string;
  postalCode: string;
  latitude?: number;
  longitude?: number;
  instructions?: string;
  isDefault?: boolean;
}

// ===========================================
// User Types
// ===========================================

export type UserRole = 'CUSTOMER' | 'DRIVER' | 'MERCHANT' | 'ADMIN';

export interface BaseUser extends BaseEntity {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: UserRole;
  emailVerified: boolean;
  phoneVerified: boolean;
  isActive: boolean;
  lastLoginAt?: Date;
}

export interface Customer extends BaseEntity {
  userId: string;
  defaultAddress?: string;
  loyaltyPoints: number;
  totalSpent: number;
  totalRides: number;
  totalOrders: number;
  preferences?: Record<string, unknown>;
}

export interface Driver extends BaseEntity {
  userId: string;
  status: DriverStatus;
  rating: number;
  totalRides: number;
  totalEarnings: number;
  vehicleId?: string;
  verifiedAt?: Date;
}

export type DriverStatus = 'OFFLINE' | 'ONLINE' | 'BUSY' | 'INACTIVE';

export interface Merchant extends BaseEntity {
  userId: string;
  businessName: string;
  businessType: string;
  phone: string;
  email: string;
  logo?: string;
  isActive: boolean;
  verifiedAt?: Date;
}

// ===========================================
// Vehicle Types
// ===========================================

export type VehicleType = 'CAR' | 'MOTORCYCLE' | 'BICYCLE' | 'VAN' | 'TRUCK';

export interface Vehicle extends BaseEntity {
  driverId: string;
  type: VehicleType;
  make: string;
  model: string;
  year: number;
  color: string;
  licensePlate: string;
  registrationNo: string;
  insuranceExpiry: Date;
  isActive: boolean;
}

// ===========================================
// Service Types
// ===========================================

export type ServiceType = 'RIDE' | 'FOOD_DELIVERY' | 'PACKAGE_DELIVERY';

export interface ServiceConfig {
  enabled: boolean;
  minAmount?: number;
  maxDistance?: number;
  operatingHours?: OperatingHours;
}

export interface OperatingHours {
  monday?: TimeRange;
  tuesday?: TimeRange;
  wednesday?: TimeRange;
  thursday?: TimeRange;
  friday?: TimeRange;
  saturday?: TimeRange;
  sunday?: TimeRange;
}

export interface TimeRange {
  start: string;
  end: string;
}

// ===========================================
// File & Media Types
// ===========================================

export interface UploadedFile {
  id: string;
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  url: string;
  path: string;
  uploadedAt: Date;
}

export interface ImageUploadParams {
  file: Buffer;
  filename: string;
  mimetype: string;
  folder?: string;
}

// ===========================================
// Error Types
// ===========================================

export interface ApiError {
  statusCode: number;
  message: string;
  error?: string;
  details?: Record<string, unknown>;
  timestamp: string;
  path: string;
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ErrorResponse {
  success: false;
  error: ApiError;
}

// ===========================================
// Response Types
// ===========================================

export interface SuccessResponse<T = unknown> {
  success: true;
  data: T;
  message?: string;
}

export type ApiResponse<T = unknown> = SuccessResponse<T> | ErrorResponse;

// ===========================================
// Date & Time Types
// ===========================================

export interface DateRange {
  start: Date;
  end: Date;
}

export interface TimeSlot {
  start: string;
  end: string;
  available: boolean;
}

// ===========================================
// Money & Currency Types
// ===========================================

export type Currency = 'USD' | 'EUR' | 'GBP' | 'SAR' | 'AED' | 'KWD';

export interface Money {
  amount: number;
  currency: Currency;
}

export interface PricingBreakdown {
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

// ===========================================
// Rating & Review Types
// ===========================================

export interface Rating {
  average: number;
  count: number;
  distribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export interface Review extends BaseEntity {
  userId: string;
  targetType: 'DRIVER' | 'RESTAURANT' | 'CUSTOMER';
  targetId: string;
  rating: number;
  comment?: string;
  images?: string[];
  response?: string;
  isVisible: boolean;
}

// ===========================================
// Analytics Types
// ===========================================

export interface AnalyticsMetrics {
  totalUsers: number;
  totalDrivers: number;
  totalMerchants: number;
  totalRides: number;
  totalOrders: number;
  totalRevenue: number;
  activeDrivers: number;
  averageRating: number;
}

export interface TimeSeriesData {
  timestamp: Date;
  value: number;
}

export interface DashboardStats {
  today: AnalyticsMetrics;
  thisWeek: AnalyticsMetrics;
  thisMonth: AnalyticsMetrics;
  growth: {
    users: number;
    revenue: number;
    rides: number;
    orders: number;
  };
}
