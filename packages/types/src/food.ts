/**
 * Food delivery and restaurant types
 */

import { Coordinates, Address, Money, Currency, TimeRange } from './common';

// ===========================================
// Restaurant Types
// ===========================================

export interface Restaurant {
  id: string;
  merchantId: string;
  name: string;
  slug: string;
  description?: string;
  cuisine: string[];
  logo?: string;
  banner?: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  state?: string;
  country: string;
  postalCode: string;
  location: Coordinates;
  deliveryRadius: number; // in km
  minOrderAmount: number;
  deliveryFee: number;
  estimatedDeliveryTime: number; // in minutes
  openingHours: OpeningHours;
  isOpen: boolean;
  rating: number;
  totalReviews: number;
  totalOrders: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface OpeningHours {
  monday?: TimeRange;
  tuesday?: TimeRange;
  wednesday?: TimeRange;
  thursday?: TimeRange;
  friday?: TimeRange;
  saturday?: TimeRange;
  sunday?: TimeRange;
  is24Hours?: boolean;
}

export interface RestaurantFilters {
  query?: string;
  cuisine?: string[];
  city?: string;
  isOpen?: boolean;
  minRating?: number;
  maxDeliveryTime?: number;
  priceRange?: [number, number];
  location?: Coordinates;
  radius?: number;
}

export interface RestaurantStats {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  averagePreparationTime: number;
  rating: number;
  totalReviews: number;
  popularItems: MenuItem[];
  peakHours: PeakHour[];
}

export interface PeakHour {
  hour: number;
  orderCount: number;
}

// ===========================================
// Menu Types
// ===========================================

export interface Category {
  id: string;
  restaurantId: string;
  name: string;
  description?: string;
  image?: string;
  sortOrder: number;
  isActive: boolean;
  menuItems: MenuItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  categoryId?: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  isAvailable: boolean;
  isVeg?: boolean;
  isPopular: boolean;
  prepTime?: number; // in minutes
  calories?: number;
  allergens: string[];
  customizations?: CustomizationGroup[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CustomizationGroup {
  id: string;
  name: string;
  description?: string;
  required: boolean;
  minSelections?: number;
  maxSelections?: number;
  options: CustomizationOption[];
}

export interface CustomizationOption {
  id: string;
  name: string;
  description?: string;
  price: number;
  isAvailable: boolean;
}

export interface CustomizationSelection {
  groupId: string;
  optionIds: string[];
}

// ===========================================
// Order Types
// ===========================================

export type OrderType = 'DELIVERY' | 'PICKUP';

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

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  restaurantId: string;
  driverId?: string;
  status: OrderStatus;
  orderType: OrderType;
  items: OrderItem[];
  pricing: OrderPricing;
  paymentMethod: string;
  paymentId?: string;
  deliveryAddress?: Address;
  customerNotes?: string;
  restaurantNotes?: string;
  estimatedDeliveryTime?: Date;
  preparedAt?: Date;
  pickedUpAt?: Date;
  deliveredAt?: Date;
  cancelledAt?: Date;
  cancellationReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  menuItemId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  customizations?: CustomizationSelection[];
  specialInstructions?: string;
  totalPrice: number;
}

export interface OrderPricing {
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  tax: number;
  discount: number;
  total: number;
  currency: Currency;
}

export interface CreateOrderRequest {
  restaurantId: string;
  items: OrderItemInput[];
  orderType?: OrderType;
  deliveryAddress?: Address;
  customerNotes?: string;
  paymentMethodId: string;
  promoCode?: string;
}

export interface OrderItemInput {
  menuItemId: string;
  quantity: number;
  customizations?: CustomizationSelection[];
  specialInstructions?: string;
}

// ===========================================
// Delivery Types
// ===========================================

export interface DeliveryZone {
  id: string;
  name: string;
  polygon: Coordinates[];
  deliveryFee: number;
  minOrderAmount: number;
  estimatedDeliveryTime: number;
  isActive: boolean;
}

export interface DeliveryArea {
  center: Coordinates;
  radius: number;
  excludedAreas?: Coordinates[][];
}

export interface DeliveryEstimate {
  distance: number;
  duration: number;
  deliveryFee: number;
  estimatedDeliveryTime: Date;
  available: boolean;
  reason?: string;
}

// ===========================================
// Merchant Types
// ===========================================

export interface Merchant {
  id: string;
  userId: string;
  businessName: string;
  businessType: string;
  taxId?: string;
  phone: string;
  email: string;
  logo?: string;
  banner?: string;
  description?: string;
  isActive: boolean;
  verifiedAt?: Date;
  rating: number;
  totalOrders: number;
  commissionRate: number;
  restaurants: Restaurant[];
  createdAt: Date;
  updatedAt: Date;
}

export interface MerchantDashboard {
  totalRestaurants: number;
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  averageRating: number;
  recentOrders: Order[];
  topRestaurants: RestaurantStats[];
}

// ===========================================
// Food Service Interface
// ===========================================

export interface IFoodService {
  // Restaurant management
  createRestaurant(data: CreateRestaurantData, merchantId: string): Promise<Restaurant>;
  updateRestaurant(restaurantId: string, data: UpdateRestaurantData): Promise<Restaurant>;
  deleteRestaurant(restaurantId: string): Promise<void>;
  getRestaurant(restaurantId: string): Promise<Restaurant>;
  getRestaurants(filters?: RestaurantFilters): Promise<Restaurant[]>;
  searchRestaurants(query: string, location?: Coordinates, radius?: number): Promise<Restaurant[]>;
  
  // Menu management
  createCategory(restaurantId: string, data: CreateCategoryData): Promise<Category>;
  updateCategory(categoryId: string, data: UpdateCategoryData): Promise<Category>;
  deleteCategory(categoryId: string): Promise<void>;
  createMenuItem(restaurantId: string, data: CreateMenuItemData): Promise<MenuItem>;
  updateMenuItem(menuItemId: string, data: UpdateMenuItemData): Promise<MenuItem>;
  deleteMenuItem(menuItemId: string): Promise<void>;
  toggleMenuItemAvailability(menuItemId: string): Promise<MenuItem>;
  
  // Order management
  createOrder(data: CreateOrderRequest, customerId: string): Promise<Order>;
  updateOrderStatus(orderId: string, status: OrderStatus): Promise<Order>;
  cancelOrder(orderId: string, reason: string): Promise<Order>;
  getOrder(orderId: string): Promise<Order>;
  getRestaurantOrders(restaurantId: string, status?: OrderStatus): Promise<Order[]>;
  
  // Delivery estimation
  estimateDelivery(restaurantId: string, deliveryAddress: Address): Promise<DeliveryEstimate>;
  isDeliveryAvailable(restaurantId: string, address: Address): Promise<boolean>;
}

export interface CreateRestaurantData {
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
  latitude: number;
  longitude: number;
  deliveryRadius?: number;
  minOrderAmount?: number;
  deliveryFee?: number;
  estimatedDeliveryTime?: number;
  openingHours?: OpeningHours;
}

export interface UpdateRestaurantData {
  name?: string;
  description?: string;
  cuisine?: string[];
  phone?: string;
  logo?: string;
  banner?: string;
  deliveryRadius?: number;
  minOrderAmount?: number;
  deliveryFee?: number;
  estimatedDeliveryTime?: number;
  openingHours?: OpeningHours;
  isOpen?: boolean;
}

export interface CreateCategoryData {
  name: string;
  description?: string;
  image?: string;
  sortOrder?: number;
}

export interface UpdateCategoryData {
  name?: string;
  description?: string;
  image?: string;
  sortOrder?: number;
  isActive?: boolean;
}

export interface CreateMenuItemData {
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
  customizations?: CustomizationGroup[];
}

export interface UpdateMenuItemData {
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
  customizations?: CustomizationGroup[];
}

// ===========================================
// Food Events
// ===========================================

export interface OrderPlacedEvent {
  type: 'ORDER_PLACED';
  orderId: string;
  restaurantId: string;
  customerId: string;
  total: number;
  timestamp: Date;
}

export interface OrderConfirmedEvent {
  type: 'ORDER_CONFIRMED';
  orderId: string;
  restaurantId: string;
  timestamp: Date;
}

export interface OrderReadyEvent {
  type: 'ORDER_READY';
  orderId: string;
  restaurantId: string;
  timestamp: Date;
}

export interface OrderDeliveredEvent {
  type: 'ORDER_DELIVERED';
  orderId: string;
  restaurantId: string;
  customerId: string;
  timestamp: Date;
}

export type FoodEvent =
  | OrderPlacedEvent
  | OrderConfirmedEvent
  | OrderReadyEvent
  | OrderDeliveredEvent;

// ===========================================
// Cuisine Types
// ===========================================

export interface CuisineType {
  id: string;
  name: string;
  icon: string;
  description?: string;
  popular: boolean;
}

export const POPULAR_CUISINES: CuisineType[] = [
  { id: 'arabic', name: 'Arabic', icon: '🥙', popular: true },
  { id: 'italian', name: 'Italian', icon: '🍕', popular: true },
  { id: 'chinese', name: 'Chinese', icon: '🥡', popular: true },
  { id: 'indian', name: 'Indian', icon: '🍛', popular: true },
  { id: 'american', name: 'American', icon: '🍔', popular: true },
  { id: 'mexican', name: 'Mexican', icon: '🌮', popular: true },
  { id: 'japanese', name: 'Japanese', icon: '🍣', popular: true },
  { id: 'thai', name: 'Thai', icon: '🍜', popular: true },
  { id: 'mediterranean', name: 'Mediterranean', icon: '🥗', popular: true },
  { id: 'fast_food', name: 'Fast Food', icon: '🍟', popular: true },
  { id: 'desserts', name: 'Desserts', icon: '🍰', popular: true },
  { id: 'healthy', name: 'Healthy', icon: '🥬', popular: false },
];
