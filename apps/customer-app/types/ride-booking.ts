/**
 * Ride Booking UI Types
 * Types specific to the ride booking interface components
 */

import {
  Ride,
  RideStatus,
  VehicleType,
  RideFare,
  FareEstimate,
  Location,
  Coordinates,
  DriverMatch,
  VehicleInfo,
} from '@tatx/types';

// ===========================================
// Location Search Types
// ===========================================

export interface LocationSuggestion {
  id: string;
  address: string;
  name?: string;
  latitude: number;
  longitude: number;
  type: 'address' | 'place' | 'saved';
  savedLabel?: string;
}

export interface LocationSearchProps {
  label: string;
  placeholder?: string;
  value: Location | null;
  onChange: (location: Location | null) => void;
  recentLocations?: LocationSuggestion[];
  savedLocations?: LocationSuggestion[];
  disabled?: boolean;
  icon?: React.ReactNode;
}

// ===========================================
// Vehicle Selector Types
// ===========================================

export interface VehicleOption {
  id: string;
  type: VehicleType;
  name: string;
  description: string;
  icon: string;
  basePrice: number;
  pricePerKm: number;
  pricePerMinute: number;
  capacity: {
    passengers: number;
    luggage: number;
  };
  eta: number; // minutes
  estimatedFare?: number;
  surgeMultiplier?: number;
}

export interface VehicleSelectorProps {
  vehicles: VehicleOption[];
  selectedVehicle: string | null;
  onSelectVehicle: (vehicleId: string) => void;
  estimatedFares?: Map<string, number>;
  surgeActive?: boolean;
  disabled?: boolean;
}

// ===========================================
// Fare Breakdown Types
// ===========================================

export interface FareBreakdownProps {
  fare: RideFare | null;
  distance: number;
  duration: number;
  surgeMultiplier?: number;
  showDetails?: boolean;
}

export interface FareDisplay {
  label: string;
  amount: number;
  detail?: string;
}

// ===========================================
// Driver Card Types
// ===========================================

export interface DriverCardProps {
  driver: {
    id: string;
    name: string;
    rating: number;
    totalRides: number;
    photo?: string;
    vehicle: VehicleInfo;
    eta: number;
    licensePlate: string;
  };
  onCall?: () => void;
  onMessage?: () => void;
}

// ===========================================
// Ride Status Types
// ===========================================

export interface RideStatusStep {
  status: RideStatus;
  label: string;
  description: string;
  icon: string;
}

export interface RideStatusProps {
  currentStatus: RideStatus;
  eta?: number;
  driverName?: string;
  vehicleInfo?: string;
  onCancel?: () => void;
}

// ===========================================
// Saved Addresses Types
// ===========================================

export interface SavedAddress {
  id: string;
  label: string;
  address: string;
  latitude: number;
  longitude: number;
  icon: 'home' | 'work' | 'star';
  isDefault?: boolean;
}

export interface SavedAddressesProps {
  addresses: SavedAddress[];
  onSelect: (address: SavedAddress) => void;
  onEdit?: (address: SavedAddress) => void;
  onDelete?: (address: SavedAddress) => void;
}

// ===========================================
// Ride History Types
// ===========================================

export interface RideHistoryItem {
  id: string;
  status: RideStatus;
  pickup: Location;
  dropoff: Location;
  fare: number;
  date: Date;
  vehicleType: VehicleType;
  driverName?: string;
  driverRating?: number;
}

export interface RideHistoryProps {
  rides: RideHistoryItem[];
  onRebook?: (ride: RideHistoryItem) => void;
  onViewDetails?: (ride: RideHistoryItem) => void;
  isLoading?: boolean;
}

// ===========================================
// Ride Booking Form Types
// ===========================================

export interface RideBookingForm {
  pickup: Location | null;
  dropoff: Location | null;
  vehicleType: VehicleType | null;
  scheduledTime?: Date;
  isForSomeoneElse: boolean;
  riderName?: string;
  riderPhone?: string;
  notes?: string;
  promoCode?: string;
  paymentMethodId?: string;
}

export interface RideBookingState {
  form: RideBookingForm;
  selectedVehicle: string | null;
  fareEstimate: FareEstimate | null;
  isEstimating: boolean;
  isBooking: boolean;
  error: string | null;
  savedAddresses: SavedAddress[];
  recentLocations: LocationSuggestion[];
  surgeActive: boolean;
  surgeMultiplier: number;
}

// ===========================================
// Map Types
// ===========================================

export interface RideMapProps {
  pickupLocation: Location | null;
  dropoffLocation: Location | null;
  routePolyline?: string;
  driverLocation?: Coordinates;
  onMapClick?: (coordinates: Coordinates) => void;
  showTraffic?: boolean;
  interactive?: boolean;
  height?: string;
}

export interface MapboxConfig {
  accessToken: string;
  style: string;
  center: Coordinates;
  zoom: number;
}

// ===========================================
// Promo Code Types
// ===========================================

export interface PromoCode {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minFare: number;
  maxDiscount?: number;
  validUntil: Date;
  applicableVehicles?: VehicleType[];
}

export interface PromoCodeInputProps {
  value: string;
  onChange: (code: string) => void;
  onApply: (code: string) => Promise<boolean>;
  appliedPromo?: PromoCode;
  disabled?: boolean;
}

// ===========================================
// Schedule Ride Types
// ===========================================

export interface ScheduleRideProps {
  isScheduled: boolean;
  scheduledTime?: Date;
  onToggle: (isScheduled: boolean) => void;
  onTimeChange: (time: Date) => void;
  minScheduleTime?: Date;
  maxScheduleTime?: Date;
}

// ===========================================
// Ride for Someone Else Types
// ===========================================

export interface RideForSomeoneElseProps {
  isForSomeoneElse: boolean;
  riderName?: string;
  riderPhone?: string;
  onToggle: (isForSomeoneElse: boolean) => void;
  onNameChange: (name: string) => void;
  onPhoneChange: (phone: string) => void;
}
