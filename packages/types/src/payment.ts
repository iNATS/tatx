/**
 * Payment and financial types
 */

import { Currency, Money } from './common';

// ===========================================
// Payment Types
// ===========================================

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
  | 'BANK_TRANSFER';

export interface Payment {
  id: string;
  userId: string;
  amount: number;
  currency: Currency;
  status: PaymentStatus;
  method: PaymentMethod;
  provider?: string;
  providerPaymentId?: string;
  rideId?: string;
  orderId?: string;
  metadata?: Record<string, unknown>;
  transactions: Transaction[];
  refunds: Refund[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Transaction {
  id: string;
  paymentId: string;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  provider?: string;
  providerTransactionId?: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export type TransactionType = 'CHARGE' | 'REFUND' | 'PAYOUT' | 'ADJUSTMENT';

export type TransactionStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'COMPLETED'
  | 'FAILED'
  | 'CANCELLED';

export interface Refund {
  id: string;
  paymentId: string;
  amount: number;
  reason: string;
  status: RefundStatus;
  providerRefundId?: string;
  processedBy?: string;
  processedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type RefundStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';

// ===========================================
// Payment Method Types
// ===========================================

export interface PaymentMethodDetails {
  id: string;
  userId: string;
  type: PaymentMethod;
  isDefault: boolean;
  card?: CardDetails;
  wallet?: WalletDetails;
  bankAccount?: BankAccountDetails;
  createdAt: Date;
  updatedAt: Date;
}

export interface CardDetails {
  brand: string;
  last4: string;
  expiryMonth: number;
  expiryYear: number;
  cardholderName: string;
  fingerprint?: string;
  funding: 'credit' | 'debit' | 'prepaid';
  country?: string;
}

export interface WalletDetails {
  provider: 'APPLE_PAY' | 'GOOGLE_PAY';
  deviceId?: string;
}

export interface BankAccountDetails {
  bankName: string;
  accountType: 'CHECKING' | 'SAVINGS';
  last4: string;
  routingNumber?: string;
  accountHolderName: string;
}

export interface CreatePaymentMethodRequest {
  type: PaymentMethod;
  card?: {
    number: string;
    expiryMonth: number;
    expiryYear: number;
    cvv: string;
    cardholderName: string;
  };
  isDefault?: boolean;
}

// ===========================================
// Wallet Types
// ===========================================

export interface Wallet {
  id: string;
  customerId: string;
  balance: number;
  currency: Currency;
  transactions: WalletTransaction[];
  createdAt: Date;
  updatedAt: Date;
}

export interface WalletTransaction {
  id: string;
  walletId: string;
  type: WalletTransactionType;
  amount: number;
  balance: number;
  description: string;
  referenceId?: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

export type WalletTransactionType = 'CREDIT' | 'DEBIT' | 'REFUND' | 'TRANSFER';

export interface AddFundsRequest {
  amount: number;
  paymentMethodId: string;
}

export interface WithdrawFundsRequest {
  amount: number;
  bankAccountId: string;
}

// ===========================================
// Driver Earnings Types
// ===========================================

export interface Earning {
  id: string;
  driverId: string;
  rideId?: string;
  amount: number;
  type: EarningType;
  status: EarningStatus;
  paidAt?: Date;
  createdAt: Date;
}

export type EarningType = 'RIDE' | 'TIP' | 'BONUS' | 'INCENTIVE' | 'REFERRAL';

export type EarningStatus = 'PENDING' | 'PROCESSING' | 'PAID' | 'CANCELLED';

export interface DriverEarnings {
  driverId: string;
  totalEarnings: number;
  pendingEarnings: number;
  paidEarnings: number;
  thisWeek: number;
  thisMonth: number;
  breakdown: EarningBreakdown;
  recentEarnings: Earning[];
}

export interface EarningBreakdown {
  rideEarnings: number;
  tips: number;
  bonuses: number;
  incentives: number;
  referrals: number;
  deductions: number;
}

export interface Payout {
  id: string;
  driverId: string;
  amount: number;
  status: PayoutStatus;
  method: PayoutMethod;
  bankAccountId?: string;
  processedAt?: Date;
  estimatedArrival?: Date;
  createdAt: Date;
}

export type PayoutStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';

export type PayoutMethod = 'BANK_TRANSFER' | 'INSTANT' | 'CASH';

export interface PayoutRequest {
  amount: number;
  method: PayoutMethod;
  bankAccountId?: string;
}

// ===========================================
// Payment Provider Types
// ===========================================

export type PaymentProvider = 'STRIPE' | 'PAYPAL' | 'HYPERPAY' | 'TAP' | 'CHECKOUT';

export interface PaymentProviderConfig {
  provider: PaymentProvider;
  enabled: boolean;
  credentials: Record<string, string>;
  webhookSecret?: string;
  supportedMethods: PaymentMethod[];
  supportedCurrencies: Currency[];
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: Currency;
  status: string;
  clientSecret: string;
  paymentMethodId?: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

export interface PaymentWebhookEvent {
  id: string;
  type: string;
  provider: PaymentProvider;
  data: Record<string, unknown>;
  timestamp: Date;
}

// ===========================================
// Pricing Types
// ===========================================

export interface PricingConfig {
  ride: RidePricing;
  delivery: DeliveryPricing;
  service: ServicePricing;
}

export interface RidePricing {
  baseFare: number;
  perKmRate: number;
  perMinuteRate: number;
  minimumFare: number;
  cancellationFee: number;
  bookingFee: number;
  surgeMultiplier: number;
}

export interface DeliveryPricing {
  baseFee: number;
  perKmRate: number;
  minimumOrder: number;
  smallOrderFee: number;
  priorityFee: number;
}

export interface ServicePricing {
  serviceFeePercent: number;
  taxPercent: number;
  platformFeePercent: number;
}

export interface FareCalculation {
  baseFare: number;
  distance: number;
  distanceRate: number;
  duration: number;
  timeRate: number;
  surgeMultiplier: number;
  subtotal: number;
  serviceFee: number;
  tax: number;
  discount: number;
  total: number;
}

// ===========================================
// Promo & Discount Types
// ===========================================

export interface PromoCode {
  id: string;
  code: string;
  description?: string;
  type: PromoType;
  value: number;
  minOrderAmount?: number;
  maxDiscount?: number;
  usageLimit?: number;
  usedCount: number;
  validFrom: Date;
  validUntil: Date;
  isActive: boolean;
  applicableServices: ServiceType[];
  newUserOnly: boolean;
  applicableRestaurantIds?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type PromoType = 'PERCENTAGE' | 'FIXED';

export type ServiceType = 'RIDE' | 'FOOD_DELIVERY' | 'PACKAGE_DELIVERY';

export interface ApplyPromoRequest {
  code: string;
  orderId?: string;
  rideId?: string;
}

export interface PromoValidationResult {
  valid: boolean;
  discount: number;
  error?: string;
}

// ===========================================
// Invoice Types
// ===========================================

export interface Invoice {
  id: string;
  invoiceNumber: string;
  userId: string;
  type: InvoiceType;
  status: InvoiceStatus;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  currency: Currency;
  paymentId?: string;
  dueDate?: Date;
  paidAt?: Date;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export type InvoiceType = 'RIDE' | 'ORDER' | 'SUBSCRIPTION' | 'OTHER';

export type InvoiceStatus = 'DRAFT' | 'SENT' | 'PAID' | 'OVERDUE' | 'CANCELLED';

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

// ===========================================
// Payment Service Interface
// ===========================================

export interface IPaymentService {
  // Payment processing
  createPayment(data: CreatePaymentData, userId: string): Promise<Payment>;
  processPayment(paymentId: string): Promise<Payment>;
  cancelPayment(paymentId: string): Promise<Payment>;
  getPayment(paymentId: string): Promise<Payment>;
  
  // Payment methods
  addPaymentMethod(data: CreatePaymentMethodRequest, userId: string): Promise<PaymentMethodDetails>;
  getPaymentMethods(userId: string): Promise<PaymentMethodDetails[]>;
  setDefaultPaymentMethod(methodId: string, userId: string): Promise<void>;
  deletePaymentMethod(methodId: string): Promise<void>;
  
  // Wallet operations
  getWallet(userId: string): Promise<Wallet>;
  addFunds(data: AddFundsRequest, userId: string): Promise<WalletTransaction>;
  withdrawFunds(data: WithdrawFundsRequest, userId: string): Promise<void>;
  
  // Refunds
  createRefund(data: CreateRefundData): Promise<Refund>;
  processRefund(refundId: string): Promise<Refund>;
  
  // Driver earnings
  getDriverEarnings(driverId: string, startDate?: Date, endDate?: Date): Promise<DriverEarnings>;
  requestPayout(data: PayoutRequest, driverId: string): Promise<Payout>;
  
  // Promo codes
  validatePromoCode(code: string, userId: string, amount: number): Promise<PromoValidationResult>;
  applyPromoCode(code: string, orderId?: string, rideId?: string): Promise<PromoValidationResult>;
}

export interface CreatePaymentData {
  amount: number;
  currency?: Currency;
  method: PaymentMethod;
  paymentMethodId?: string;
  orderId?: string;
  rideId?: string;
  saveCard?: boolean;
  metadata?: Record<string, unknown>;
}

export interface CreateRefundData {
  paymentId: string;
  amount?: number;
  reason: string;
}

// ===========================================
// Payment Events
// ===========================================

export interface PaymentInitiatedEvent {
  type: 'PAYMENT_INITIATED';
  paymentId: string;
  userId: string;
  amount: number;
  currency: Currency;
  method: PaymentMethod;
  timestamp: Date;
}

export interface PaymentCompletedEvent {
  type: 'PAYMENT_COMPLETED';
  paymentId: string;
  userId: string;
  amount: number;
  transactionId: string;
  timestamp: Date;
}

export interface PaymentFailedEvent {
  type: 'PAYMENT_FAILED';
  paymentId: string;
  userId: string;
  amount: number;
  reason: string;
  errorCode?: string;
  timestamp: Date;
}

export interface RefundProcessedEvent {
  type: 'REFUND_PROCESSED';
  refundId: string;
  paymentId: string;
  amount: number;
  timestamp: Date;
}

export type PaymentEvent =
  | PaymentInitiatedEvent
  | PaymentCompletedEvent
  | PaymentFailedEvent
  | RefundProcessedEvent;
