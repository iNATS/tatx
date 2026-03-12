/**
 * Re-export Prisma types for convenience
 */
export type {
  Prisma,
  User,
  Driver,
  Rider,
  Merchant,
  Restaurant,
  MenuItem,
  Order,
  OrderItem,
  Ride,
  RideRequest,
  Payment,
  Transaction,
  Refund,
  InstallmentPlan,
  Notification,
  Location,
  Vehicle,
  Review,
  Wallet,
  WalletTransaction,
  SavedCard,
  Earning,
  PromoCode,
  Admin,
} from '@prisma/client';

/**
 * Custom database types for Tatx platform
 */
export interface DatabaseConfig {
  url: string;
  poolSize: number;
  connectionTimeout: number;
}

export type UserRole = 'CUSTOMER' | 'DRIVER' | 'MERCHANT' | 'ADMIN';

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PREPARING'
  | 'READY_FOR_PICKUP'
  | 'PICKED_UP'
  | 'IN_TRANSIT'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'REFUNDED';

export type RideStatus =
  | 'REQUESTED'
  | 'SEARCHING_DRIVER'
  | 'DRIVER_ASSIGNED'
  | 'DRIVER_ARRIVED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED';

export type PaymentStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'COMPLETED'
  | 'FAILED'
  | 'REFUNDED'
  | 'PARTIALLY_REFUNDED';

export type PaymentMethod =
  | 'CREDIT_CARD'
  | 'DEBIT_CARD'
  | 'CASH'
  | 'WALLET'
  | 'APPLE_PAY'
  | 'GOOGLE_PAY'
  | 'MADA'
  | 'STC_PAY'
  | 'TABBY'
  | 'TAMARA';

export type NotificationType =
  | 'EMAIL'
  | 'SMS'
  | 'PUSH'
  | 'IN_APP';

export type VehicleType = 'CAR' | 'MOTORCYCLE' | 'BICYCLE' | 'VAN' | 'TRUCK';

export type ServiceType = 'RIDE' | 'FOOD_DELIVERY' | 'PACKAGE_DELIVERY';
