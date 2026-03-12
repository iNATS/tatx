/**
 * API types for HTTP requests and responses
 */

import { PaginationParams, Coordinates, Address, Money, Currency } from './common';

// ===========================================
// Request/Response Base Types
// ===========================================

export interface ApiRequest {
  headers: Record<string, string>;
  query: Record<string, string>;
  params: Record<string, string>;
  body: unknown;
  user?: AuthUser;
}

export interface AuthUser {
  id: string;
  email: string;
  role: string;
}

// ===========================================
// Auth API Types
// ===========================================

export interface RegisterRequest {
  email: string;
  password: string;
  phone: string;
  firstName: string;
  lastName: string;
  role?: 'CUSTOMER' | 'DRIVER' | 'MERCHANT';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    avatar?: string;
  };
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

export interface VerifyOtpRequest {
  phone: string;
  code: string;
}

export interface SendOtpRequest {
  phone: string;
}

// ===========================================
// User API Types
// ===========================================

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  avatar?: string;
  email?: string;
  phone?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface UserResponse {
  id: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  createdAt: Date;
}

// ===========================================
// Address API Types
// ===========================================

export interface CreateAddressRequest {
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

export interface UpdateAddressRequest {
  label?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
  instructions?: string;
  isDefault?: boolean;
}

export interface AddressResponse {
  id: string;
  label?: string;
  address: string;
  city: string;
  state?: string;
  country: string;
  postalCode: string;
  latitude?: number;
  longitude?: number;
  instructions?: string;
  isDefault: boolean;
}

// ===========================================
// Driver API Types
// ===========================================

export interface RegisterDriverRequest {
  email: string;
  password: string;
  phone: string;
  firstName: string;
  lastName: string;
  vehicleType: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: number;
  licensePlate: string;
}

export interface UpdateDriverStatusRequest {
  status: 'ONLINE' | 'OFFLINE' | 'BUSY';
}

export interface DriverLocationUpdate {
  latitude: number;
  longitude: number;
  heading?: number;
  speed?: number;
}

export interface DriverDocumentRequest {
  type: string;
  documentUrl: string;
  expiryDate?: Date;
}

export interface DriverResponse {
  id: string;
  userId: string;
  status: string;
  rating: number;
  totalRides: number;
  totalEarnings: number;
  vehicle?: VehicleResponse;
  verifiedAt?: Date;
}

export interface VehicleResponse {
  id: string;
  type: string;
  make: string;
  model: string;
  year: number;
  color: string;
  licensePlate: string;
}

// ===========================================
// Ride API Types
// ===========================================
// Note: CreateRideRequest is now exported from ride.ts

export interface EstimateRideRequest {
  pickupLatitude: number;
  pickupLongitude: number;
  dropoffLatitude: number;
  dropoffLongitude: number;
  vehicleType?: string;
}

export interface EstimateRideResponse {
  distance: number;
  duration: number;
  fare: ApiFareEstimate;
  surgeMultiplier: number;
}

export interface ApiFareEstimate {
  baseFare: number;
  distanceFare: number;
  timeFare: number;
  surgeMultiplier: number;
  total: number;
  currency: Currency;
}

export interface AcceptRideRequest {
  rideId: string;
}

export interface CancelRideRequest {
  rideId: string;
  reason: string;
}

export interface CompleteRideRequest {
  rideId: string;
  notes?: string;
}

export interface RideResponse {
  id: string;
  rider: {
    id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    rating?: number;
  };
  driver?: {
    id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    rating?: number;
    vehicle?: VehicleResponse;
  };
  status: string;
  pickup: LocationResponse;
  dropoff: LocationResponse;
  vehicleType: string;
  fare: ApiFareEstimate;
  finalFare?: number;
  scheduledAt?: Date;
  startedAt?: Date;
  completedAt?: Date;
  createdAt: Date;
}

export interface LocationResponse {
  address: string;
  latitude: number;
  longitude: number;
}

export interface NearbyDriversRequest {
  latitude: number;
  longitude: number;
  radius?: number;
  limit?: number;
}

export interface NearbyDriversResponse {
  drivers: {
    id: string;
    latitude: number;
    longitude: number;
    distance: number;
    eta: number;
    vehicle: VehicleResponse;
    rating: number;
  }[];
}

// ===========================================
// Restaurant & Food API Types
// ===========================================

export interface CreateRestaurantRequest {
  name: string;
  description?: string;
  cuisine: string[];
  phone: string;
  email?: string;
  address: string;
  city: string;
  state?: string;
  country: string;
  postalCode: string;
  latitude?: number;
  longitude?: number;
  deliveryRadius?: number;
  minOrderAmount?: number;
  deliveryFee?: number;
  estimatedDeliveryTime?: number;
  openingHours?: Record<string, { start: string; end: string }>;
}

export interface UpdateRestaurantRequest {
  name?: string;
  description?: string;
  cuisine?: string[];
  phone?: string;
  logo?: string;
  banner?: string;
  isOpen?: boolean;
}

export interface RestaurantResponse {
  id: string;
  name: string;
  slug: string;
  description?: string;
  cuisine: string[];
  logo?: string;
  banner?: string;
  address: string;
  city: string;
  latitude?: number;
  longitude?: number;
  deliveryRadius: number;
  minOrderAmount: number;
  deliveryFee: number;
  estimatedDeliveryTime: number;
  isOpen: boolean;
  rating: number;
  totalReviews: number;
  totalOrders: number;
}

export interface CreateCategoryRequest {
  name: string;
  description?: string;
  image?: string;
  sortOrder?: number;
}

export interface CreateMenuItemRequest {
  name: string;
  description?: string;
  price: number;
  image?: string;
  categoryId?: string;
  isVeg?: boolean;
  isPopular?: boolean;
  prepTime?: number;
  calories?: number;
  allergens?: string[];
  customizations?: Record<string, unknown>;
}

export interface UpdateMenuItemRequest {
  name?: string;
  description?: string;
  price?: number;
  image?: string;
  isAvailable?: boolean;
  isVeg?: boolean;
  isPopular?: boolean;
  prepTime?: number;
  calories?: number;
  allergens?: string[];
  customizations?: Record<string, unknown>;
}

export interface MenuItemResponse {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  isAvailable: boolean;
  isVeg?: boolean;
  isPopular: boolean;
  prepTime?: number;
  calories?: number;
  allergens: string[];
  customizations?: Record<string, unknown>;
}

export interface SearchRestaurantsRequest extends PaginationParams {
  query?: string;
  cuisine?: string;
  city?: string;
  isOpen?: boolean;
  minRating?: number;
  latitude?: number;
  longitude?: number;
  radius?: number;
}
// ===========================================
// Order API Types
// ===========================================
// Note: CreateOrderRequest is exported from food.ts

export interface OrderItemRequest {
  menuItemId: string;
  quantity: number;
  customizations?: Record<string, unknown>;
  specialInstructions?: string;
}

export interface UpdateOrderStatusRequest {
  status: string;
}

export interface OrderResponse {
  id: string;
  orderNumber: string;
  restaurant: {
    id: string;
    name: string;
    phone: string;
    address: string;
  };
  driver?: {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    vehicle?: VehicleResponse;
  };
  status: string;
  orderType: string;
  items: OrderItemResponse[];
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod: string;
  deliveryAddress?: Address;
  estimatedDeliveryTime?: Date;
  createdAt: Date;
}

export interface OrderItemResponse {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  customizations?: Record<string, unknown>;
  specialInstructions?: string;
  totalPrice: number;
}

export interface TrackOrderResponse {
  orderId: string;
  status: string;
  driverLocation?: Coordinates;
  estimatedDeliveryTime?: Date;
  timeline: OrderTimeline[];
}

export interface OrderTimeline {
  status: string;
  timestamp: Date;
  message?: string;
}

// ===========================================
// Payment API Types
// ===========================================

export interface CreatePaymentRequest {
  amount: number;
  currency?: Currency;
  method: string;
  orderId?: string;
  rideId?: string;
  saveCard?: boolean;
}

export interface PaymentMethodRequest {
  type: string;
  cardNumber?: string;
  expiryMonth?: number;
  expiryYear?: number;
  cvv?: string;
  cardholderName?: string;
  billingAddress?: Address;
}

export interface PaymentResponse {
  id: string;
  amount: number;
  currency: string;
  status: string;
  method: string;
  provider?: string;
  createdAt: Date;
}

export interface PaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
}

export interface RefundRequest {
  paymentId: string;
  amount?: number;
  reason: string;
}

export interface WalletResponse {
  id: string;
  balance: number;
  currency: string;
}

export interface AddWalletFundsRequest {
  amount: number;
  paymentMethodId: string;
}

// ===========================================
// Notification API Types
// ===========================================

export interface SendNotificationRequest {
  userId: string;
  type: 'EMAIL' | 'SMS' | 'PUSH' | 'IN_APP';
  title: string;
  message: string;
  data?: Record<string, unknown>;
}

export interface NotificationPreferenceRequest {
  emailNotifications?: boolean;
  smsNotifications?: boolean;
  pushNotifications?: boolean;
  rideUpdates?: boolean;
  orderUpdates?: boolean;
  promotionalMessages?: boolean;
}

export interface NotificationResponse {
  id: string;
  type: string;
  title: string;
  message: string;
  status: string;
  readAt?: Date;
  createdAt: Date;
}

// ===========================================
// Search & Filter Types
// ===========================================

export interface SearchRequest extends PaginationParams {
  query: string;
  filters?: Record<string, unknown>;
}

export interface FilterOption {
  name: string;
  values: string[];
}

export interface SearchFilters {
  priceRange?: [number, number];
  rating?: number;
  distance?: number;
  cuisine?: string[];
  vehicleType?: string[];
  isOpen?: boolean;
}

// ===========================================
// Health Check Types
// ===========================================

export interface HealthCheckResponse {
  status: 'healthy' | 'unhealthy' | 'degraded';
  timestamp: Date;
  uptime: number;
  services: {
    database: boolean;
    redis: boolean;
    queue: boolean;
  };
  version: string;
}
