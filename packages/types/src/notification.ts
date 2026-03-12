/**
 * Notification and communication types
 */

// ===========================================
// Notification Types
// ===========================================

export type NotificationType = 'EMAIL' | 'SMS' | 'PUSH' | 'IN_APP';

export type NotificationStatus = 'PENDING' | 'SENT' | 'DELIVERED' | 'READ' | 'FAILED';

export type NotificationCategory =
  | 'ORDER'
  | 'RIDE'
  | 'PAYMENT'
  | 'PROMOTION'
  | 'SYSTEM'
  | 'SECURITY'
  | 'DRIVER';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  category?: NotificationCategory;
  title: string;
  message: string;
  data?: Record<string, unknown>;
  actionUrl?: string;
  actionLabel?: string;
  imageUrl?: string;
  status: NotificationStatus;
  priority: NotificationPriority;
  sentAt?: Date;
  deliveredAt?: Date;
  readAt?: Date;
  failedAt?: Date;
  errorMessage?: string;
  provider?: string;
  providerMessageId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type NotificationPriority = 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';

export interface NotificationTemplate {
  id: string;
  name: string;
  type: NotificationType;
  category: NotificationCategory;
  subject?: string;
  body: string;
  variables: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ===========================================
// Push Notification Types
// ===========================================

export interface PushNotification {
  id: string;
  userId: string;
  deviceId: string;
  platform: PushPlatform;
  token: string;
  title: string;
  body: string;
  data?: Record<string, unknown>;
  badge?: number;
  sound?: string;
  priority?: 'normal' | 'high';
  ttl?: number;
  status: NotificationStatus;
  sentAt?: Date;
  deliveredAt?: Date;
  createdAt: Date;
}

export type PushPlatform = 'IOS' | 'ANDROID' | 'WEB';

export interface DeviceToken {
  id: string;
  userId: string;
  platform: PushPlatform;
  token: string;
  deviceId?: string;
  appVersion?: string;
  osVersion?: string;
  isActive: boolean;
  lastUsedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface RegisterDeviceRequest {
  platform: PushPlatform;
  token: string;
  deviceId?: string;
  appVersion?: string;
  osVersion?: string;
}

// ===========================================
// Email Types
// ===========================================

export interface EmailNotification {
  id: string;
  userId?: string;
  to: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  from?: string;
  subject: string;
  body: string;
  htmlBody?: string;
  attachments?: EmailAttachment[];
  templateId?: string;
  templateData?: Record<string, unknown>;
  status: NotificationStatus;
  sentAt?: Date;
  deliveredAt?: Date;
  openedAt?: Date;
  clickedAt?: Date;
  bouncedAt?: Date;
  errorMessage?: string;
  provider?: string;
  providerMessageId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmailAttachment {
  filename: string;
  content: Buffer;
  contentType: string;
}

export interface SendEmailRequest {
  to: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  subject: string;
  body: string;
  htmlBody?: string;
  attachments?: EmailAttachment[];
  templateId?: string;
  templateData?: Record<string, unknown>;
  priority?: NotificationPriority;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  htmlBody?: string;
  variables: string[];
  category: NotificationCategory;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ===========================================
// SMS Types
// ===========================================

export interface SmsNotification {
  id: string;
  userId?: string;
  to: string;
  from?: string;
  body: string;
  templateId?: string;
  templateData?: Record<string, unknown>;
  status: NotificationStatus;
  sentAt?: Date;
  deliveredAt?: Date;
  failedAt?: Date;
  errorMessage?: string;
  provider?: string;
  providerMessageId?: string;
  segments?: number;
  cost?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface SendSmsRequest {
  to: string;
  body: string;
  templateId?: string;
  templateData?: Record<string, unknown>;
  priority?: NotificationPriority;
}

export interface SmsTemplate {
  id: string;
  name: string;
  body: string;
  variables: string[];
  category: NotificationCategory;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ===========================================
// In-App Notification Types
// ===========================================

export interface InAppNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: string;
  data?: Record<string, unknown>;
  actionUrl?: string;
  actionLabel?: string;
  imageUrl?: string;
  isRead: boolean;
  priority: NotificationPriority;
  expiresAt?: Date;
  createdAt: Date;
  readAt?: Date;
}

export interface InAppNotificationSettings {
  enabled: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  showPreview: boolean;
  quietHours?: QuietHours;
}

export interface QuietHours {
  enabled: boolean;
  startTime: string;
  endTime: string;
}

// ===========================================
// Notification Preferences
// ===========================================

export interface NotificationPreferences {
  userId: string;
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  inAppNotifications: boolean;
  categories: NotificationCategoryPreferences;
  quietHours?: QuietHours;
  language: string;
  timezone: string;
  updatedAt: Date;
}

export interface NotificationCategoryPreferences {
  order: boolean;
  ride: boolean;
  payment: boolean;
  promotion: boolean;
  system: boolean;
  security: boolean;
  driver: boolean;
}

export interface UpdateNotificationPreferencesRequest {
  emailNotifications?: boolean;
  smsNotifications?: boolean;
  pushNotifications?: boolean;
  inAppNotifications?: boolean;
  categories?: Partial<NotificationCategoryPreferences>;
  quietHours?: QuietHours;
  language?: string;
  timezone?: string;
}

// ===========================================
// Notification Service Interface
// ===========================================

export interface INotificationService {
  // Send notifications
  sendEmail(data: SendEmailRequest): Promise<EmailNotification>;
  sendSms(data: SendSmsRequest): Promise<SmsNotification>;
  sendPush(userId: string, title: string, body: string, data?: Record<string, unknown>): Promise<PushNotification>;
  sendInApp(userId: string, title: string, message: string, data?: Record<string, unknown>): Promise<InAppNotification>;
  
  // Send to multiple users
  broadcastEmail(data: SendEmailRequest): Promise<number>;
  broadcastPush(userIds: string[], title: string, body: string, data?: Record<string, unknown>): Promise<number>;
  
  // Device management
  registerDevice(userId: string, data: RegisterDeviceRequest): Promise<DeviceToken>;
  unregisterDevice(deviceId: string): Promise<void>;
  getUserDevices(userId: string): Promise<DeviceToken[]>;
  
  // Preferences
  getPreferences(userId: string): Promise<NotificationPreferences>;
  updatePreferences(userId: string, data: UpdateNotificationPreferencesRequest): Promise<NotificationPreferences>;
  
  // In-app notifications
  getInAppNotifications(userId: string, unreadOnly?: boolean): Promise<InAppNotification[]>;
  markAsRead(notificationId: string, userId: string): Promise<void>;
  markAllAsRead(userId: string): Promise<void>;
  deleteNotification(notificationId: string, userId: string): Promise<void>;
  
  // Templates
  sendFromTemplate(templateId: string, userId: string, data: Record<string, unknown>): Promise<Notification>;
}

// ===========================================
// Notification Events
// ===========================================

export interface NotificationSentEvent {
  type: 'NOTIFICATION_SENT';
  notificationId: string;
  userId: string;
  notificationType: NotificationType;
  category?: NotificationCategory;
  timestamp: Date;
}

export interface NotificationDeliveredEvent {
  type: 'NOTIFICATION_DELIVERED';
  notificationId: string;
  userId: string;
  notificationType: NotificationType;
  timestamp: Date;
}

export interface NotificationReadEvent {
  type: 'NOTIFICATION_READ';
  notificationId: string;
  userId: string;
  timestamp: Date;
}

export interface NotificationFailedEvent {
  type: 'NOTIFICATION_FAILED';
  notificationId: string;
  userId: string;
  notificationType: NotificationType;
  reason: string;
  timestamp: Date;
}

export type NotificationEvent =
  | NotificationSentEvent
  | NotificationDeliveredEvent
  | NotificationReadEvent
  | NotificationFailedEvent;

// ===========================================
// Template Variables
// ===========================================

export interface OrderNotificationVariables {
  orderNumber: string;
  restaurantName: string;
  orderTotal: string;
  estimatedDeliveryTime: string;
  orderStatus: string;
  trackingUrl?: string;
}

export interface RideNotificationVariables {
  driverName: string;
  vehicleInfo: string;
  pickupAddress: string;
  dropoffAddress: string;
  estimatedArrival: string;
  rideStatus: string;
  fare?: string;
  trackingUrl?: string;
}

export interface PaymentNotificationVariables {
  amount: string;
  paymentMethod: string;
  transactionId: string;
  paymentStatus: string;
  receiptUrl?: string;
}

export interface VerificationNotificationVariables {
  code: string;
  expiryMinutes: number;
}

export interface PromoNotificationVariables {
  promoCode: string;
  discountAmount: string;
  expiryDate: string;
  termsUrl?: string;
}
