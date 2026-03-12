/**
 * Food Ordering UI Types
 * Types specific to the food ordering interface components
 */

import type {
  Restaurant,
  MenuItem,
  Category,
  CustomizationGroup,
  CustomizationOption,
  CustomizationSelection,
  Order,
  OrderStatus,
  OrderItem,
  OrderPricing,
  OrderType,
  CuisineType,
} from '@tatx/types';

// ===========================================
// Restaurant Card Types
// ===========================================

export interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick?: (restaurant: Restaurant) => void;
  className?: string;
}

// ===========================================
// Restaurant Filters Types
// ===========================================

export interface RestaurantFiltersState {
  query: string;
  cuisines: string[];
  minRating: number;
  maxDeliveryTime: number;
  isOpenOnly: boolean;
}

export interface RestaurantFiltersProps {
  filters: RestaurantFiltersState;
  onFiltersChange: (filters: RestaurantFiltersState) => void;
  availableCuisines?: string[];
  className?: string;
}

// ===========================================
// Cuisine Selector Types
// ===========================================

export interface CuisineOption {
  id: string;
  name: string;
  icon: string;
}

export interface CuisineSelectorProps {
  selectedCuisines: string[];
  onCuisineSelect: (cuisineId: string) => void;
  onCuisineDeselect: (cuisineId: string) => void;
  cuisines?: CuisineOption[];
  className?: string;
}

// ===========================================
// Menu Category Types
// ===========================================

export interface MenuCategoryProps {
  category: Category;
  onAddItem: (item: MenuItem) => void;
  className?: string;
}

// ===========================================
// Menu Item Card Types
// ===========================================

export interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem, customizations?: CustomizationSelection[], specialInstructions?: string) => void;
  className?: string;
}

// ===========================================
// Modifier Selector Types
// ===========================================

export interface ModifierOption extends CustomizationOption {
  selected?: boolean;
}

export interface ModifierGroup extends CustomizationGroup {
  selectedOptions?: string[];
}

export interface ModifierSelectorProps {
  groups: CustomizationGroup[];
  selections: Map<string, string[]>;
  onSelectionChange: (groupId: string, optionIds: string[]) => void;
  className?: string;
}

// ===========================================
// Cart Item Types
// ===========================================

export interface CartItemData {
  id: string;
  menuItemId: string;
  name: string;
  description?: string;
  image?: string;
  quantity: number;
  unitPrice: number;
  customizations?: CustomizationSelection[];
  specialInstructions?: string;
  totalPrice: number;
  restaurantId: string;
  restaurantName: string;
}

export interface CartItemProps {
  item: CartItemData;
  onQuantityChange: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
  className?: string;
}

// ===========================================
// Cart Summary Types
// ===========================================

export interface CartSummaryData {
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  tax: number;
  discount: number;
  total: number;
  currency: string;
}

export interface CartSummaryProps {
  summary: CartSummaryData;
  onCheckout?: () => void;
  disabled?: boolean;
  className?: string;
}

// ===========================================
// Cart State Types
// ===========================================

export interface CartState {
  items: CartItemData[];
  restaurantId: string | null;
  restaurantName: string | null;
  deliveryAddress?: {
    label: string;
    address: string;
    latitude: number;
    longitude: number;
  };
  customerNotes: string;
}

export interface CartActions {
  addItem: (item: Omit<CartItemData, 'id'>) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  setDeliveryAddress: (address: CartState['deliveryAddress']) => void;
  setCustomerNotes: (notes: string) => void;
  getSummary: () => CartSummaryData;
  getItemCount: () => number;
}

// ===========================================
// Order Tracker Types
// ===========================================

export interface OrderStatusStep {
  status: OrderStatus;
  label: string;
  description: string;
  icon: string;
  completed?: boolean;
  current?: boolean;
}

export interface OrderTrackerProps {
  order: Order;
  className?: string;
}

export interface OrderTimelineProps {
  status: OrderStatus;
  estimatedDeliveryTime?: Date;
  className?: string;
}

// ===========================================
// Order History Card Types
// ===========================================

export interface OrderHistoryCardProps {
  order: Order;
  onReorder?: (order: Order) => void;
  onViewDetails?: (order: Order) => void;
  className?: string;
}

// ===========================================
// Order Details Page Types
// ===========================================

export interface OrderDetailsPageProps {
  orderId: string;
}

export interface OrderDetailsProps {
  order: Order;
  onReorder?: () => void;
  onTrackOrder?: () => void;
  className?: string;
}

// ===========================================
// Restaurant Listing Page Types
// ===========================================

export interface RestaurantListingPageProps {
  initialQuery?: string;
  initialCuisine?: string;
}

export interface RestaurantGridProps {
  restaurants: Restaurant[];
  onRestaurantClick: (restaurant: Restaurant) => void;
  isLoading?: boolean;
  className?: string;
}

// ===========================================
// Restaurant Menu Page Types
// ===========================================

export interface RestaurantMenuPageProps {
  restaurantId: string;
}

export interface RestaurantMenuProps {
  restaurant: Restaurant;
  categories: Category[];
  onAddToCart: (item: MenuItem, customizations?: CustomizationSelection[], specialInstructions?: string) => void;
  className?: string;
}

// ===========================================
// Search and Filter Types
// ===========================================

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export interface RatingFilterProps {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

export interface DeliveryTimeFilterProps {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

// ===========================================
// Mock Data for Development
// ===========================================

export const MOCK_CUISINES: CuisineOption[] = [
  { id: 'arabic', name: 'Arabic', icon: '🥙' },
  { id: 'italian', name: 'Italian', icon: '🍕' },
  { id: 'chinese', name: 'Chinese', icon: '🥡' },
  { id: 'indian', name: 'Indian', icon: '🍛' },
  { id: 'american', name: 'American', icon: '🍔' },
  { id: 'mexican', name: 'Mexican', icon: '🌮' },
  { id: 'japanese', name: 'Japanese', icon: '🍣' },
  { id: 'thai', name: 'Thai', icon: '🍜' },
  { id: 'mediterranean', name: 'Mediterranean', icon: '🥗' },
  { id: 'fast_food', name: 'Fast Food', icon: '🍟' },
  { id: 'desserts', name: 'Desserts', icon: '🍰' },
  { id: 'healthy', name: 'Healthy', icon: '🥬' },
];

export const ORDER_STATUS_STEPS: OrderStatusStep[] = [
  {
    status: 'PENDING',
    label: 'Order Placed',
    description: 'Waiting for restaurant confirmation',
    icon: 'clock',
  },
  {
    status: 'CONFIRMED',
    label: 'Confirmed',
    description: 'Restaurant has confirmed your order',
    icon: 'check-circle',
  },
  {
    status: 'PREPARING',
    label: 'Preparing',
    description: 'Your food is being prepared',
    icon: 'chef-hat',
  },
  {
    status: 'READY_FOR_PICKUP',
    label: 'Ready for Pickup',
    description: 'Order is ready for delivery',
    icon: 'package',
  },
  {
    status: 'IN_TRANSIT',
    label: 'On the Way',
    description: 'Driver is on the way to you',
    icon: 'truck',
  },
  {
    status: 'DELIVERED',
    label: 'Delivered',
    description: 'Order has been delivered',
    icon: 'check',
  },
];
