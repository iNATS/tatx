'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@tatx/ui/components/button';
import { Input } from '@tatx/ui/components/input';
import { Label } from '@tatx/ui/components/label';
import { Switch } from '@tatx/ui/components/switch';
import { Card, CardContent } from '@tatx/ui/components/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@tatx/ui/components/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@tatx/ui/components/select';
import {
  ArrowLeft,
  MapPin,
  Clock,
  User,
  Phone,
  Calendar,
  CreditCard,
  ChevronDown,
  Loader2,
  Check,
  X,
} from 'lucide-react';
import { cn } from '@tatx/ui/utils/cn';

// Import ride components
import { LocationSearch } from '@/components/ride/LocationSearch';
import { SavedAddresses, QuickAddressButton } from '@/components/ride/SavedAddresses';
import { RideMap } from '@/components/ride/RideMap';
import { VehicleSelector, CompactVehicleOption } from '@/components/ride/VehicleSelector';
import { FareBreakdown, SimpleFareDisplay } from '@/components/ride/FareBreakdown';
import { DriverCard, CompactDriverCard } from '@/components/ride/DriverCard';
import { RideStatus, StatusBadge } from '@/components/ride/RideStatus';
import { RideHistory } from '@/components/ride/RideHistory';

// Import types
import type {
  Location,
  RideStatus as RideStatusType,
  VehicleType,
  RideFare,
} from '@tatx/types';
import type {
  SavedAddress,
  LocationSuggestion,
  VehicleOption,
  RideBookingForm,
  RideHistoryItem,
} from '@/types/ride-booking';

// Mock data
const MOCK_SAVED_ADDRESSES: SavedAddress[] = [
  {
    id: '1',
    label: 'Home',
    address: '123 Marina Street, Dubai Marina, Dubai',
    latitude: 25.0805,
    longitude: 55.1396,
    icon: 'home',
    isDefault: true,
  },
  {
    id: '2',
    label: 'Work',
    address: '456 Business Bay Boulevard, Business Bay, Dubai',
    latitude: 25.1872,
    longitude: 55.2674,
    icon: 'work',
  },
  {
    id: '3',
    label: 'Gym',
    address: '789 JBR Walk, Jumeirah Beach Residence, Dubai',
    latitude: 25.0785,
    longitude: 55.1329,
    icon: 'star',
  },
];

const MOCK_RECENT_LOCATIONS: LocationSuggestion[] = [
  {
    id: 'r1',
    address: 'Dubai Mall, Downtown Dubai',
    name: 'Dubai Mall',
    latitude: 25.1972,
    longitude: 55.2794,
    type: 'place',
  },
  {
    id: 'r2',
    address: 'Dubai International Airport, Terminal 3',
    name: 'DXB Airport T3',
    latitude: 25.2532,
    longitude: 55.3657,
    type: 'place',
  },
];

const VEHICLE_OPTIONS: VehicleOption[] = [
  {
    id: 'economy',
    type: 'CAR',
    name: 'Economy',
    description: 'Affordable everyday rides',
    icon: 'car',
    basePrice: 2.5,
    pricePerKm: 1.5,
    pricePerMinute: 0.35,
    capacity: { passengers: 4, luggage: 2 },
    eta: 3,
  },
  {
    id: 'comfort',
    type: 'CAR',
    name: 'Comfort',
    description: 'Newer cars with extra legroom',
    icon: 'car-side',
    basePrice: 4.0,
    pricePerKm: 2.0,
    pricePerMinute: 0.45,
    capacity: { passengers: 4, luggage: 3 },
    eta: 5,
  },
  {
    id: 'premium',
    type: 'CAR',
    name: 'Premium',
    description: 'Luxury vehicles',
    icon: 'star',
    basePrice: 7.0,
    pricePerKm: 3.5,
    pricePerMinute: 0.65,
    capacity: { passengers: 4, luggage: 3 },
    eta: 7,
  },
  {
    id: 'luxury',
    type: 'CAR',
    name: 'Luxury',
    description: 'High-end luxury cars',
    icon: 'star',
    basePrice: 12.0,
    pricePerKm: 5.0,
    pricePerMinute: 1.0,
    capacity: { passengers: 4, luggage: 3 },
    eta: 10,
  },
  {
    id: 'van',
    type: 'VAN',
    name: 'Van',
    description: 'Rides for groups up to 6',
    icon: 'users',
    basePrice: 5.0,
    pricePerKm: 2.5,
    pricePerMinute: 0.55,
    capacity: { passengers: 6, luggage: 4 },
    eta: 8,
  },
];

const MOCK_RIDE_HISTORY: RideHistoryItem[] = [
  {
    id: 'ride-1',
    status: 'COMPLETED',
    pickup: {
      address: '123 Marina Street, Dubai Marina',
      latitude: 25.0805,
      longitude: 55.1396,
      name: 'Home',
    },
    dropoff: {
      address: 'Dubai Mall, Downtown Dubai',
      latitude: 25.1972,
      longitude: 55.2794,
      name: 'Dubai Mall',
    },
    fare: 24.5,
    date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    vehicleType: 'CAR',
    driverName: 'Ahmed M.',
    driverRating: 5,
  },
  {
    id: 'ride-2',
    status: 'COMPLETED',
    pickup: {
      address: '456 Business Bay Boulevard',
      latitude: 25.1872,
      longitude: 55.2674,
      name: 'Work',
    },
    dropoff: {
      address: '789 JBR Walk, Jumeirah Beach Residence',
      latitude: 25.0785,
      longitude: 55.1329,
      name: 'Gym',
    },
    fare: 18.75,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    vehicleType: 'CAR',
    driverName: 'Mohammed K.',
    driverRating: 4,
  },
  {
    id: 'ride-3',
    status: 'CANCELLED',
    pickup: {
      address: 'Dubai International Airport',
      latitude: 25.2532,
      longitude: 55.3657,
      name: 'DXB Airport',
    },
    dropoff: {
      address: '123 Marina Street, Dubai Marina',
      latitude: 25.0805,
      longitude: 55.1396,
      name: 'Home',
    },
    fare: 45.0,
    date: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    vehicleType: 'VAN',
  },
];

/**
 * Ride Booking Page
 * Main page for booking rides with map, vehicle selection, and fare estimation
 */
export default function RideBookingPage() {
  // Form state
  const [form, setForm] = useState<RideBookingForm>({
    pickup: null,
    dropoff: null,
    vehicleType: null,
    scheduledTime: undefined,
    isForSomeoneElse: false,
    riderName: '',
    riderPhone: '',
    notes: '',
    promoCode: '',
    paymentMethodId: undefined,
  });

  // UI state
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [isEstimating, setIsEstimating] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [showRideForSomeoneDialog, setShowRideForSomeoneDialog] = useState(false);

  // Booking state
  const [currentRideStatus, setCurrentRideStatus] = useState<RideStatusType | null>(null);
  const [fareEstimate, setFareEstimate] = useState<RideFare | null>(null);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [surgeActive, setSurgeActive] = useState(false);
  const [surgeMultiplier, setSurgeMultiplier] = useState(1);

  // Mock driver data
  const [assignedDriver, setAssignedDriver] = useState<{
    id: string;
    name: string;
    rating: number;
    totalRides: number;
    photo?: string;
    vehicle: {
      id: string;
      type: VehicleType;
      make: string;
      model: string;
      year: number;
      color: string;
      licensePlate: string;
    };
    eta: number;
    licensePlate: string;
  } | null>(null);

  // Calculate fare estimate when locations or vehicle changes
  useEffect(() => {
    const calculateFare = async () => {
      if (!form.pickup || !form.dropoff || !selectedVehicle) {
        setFareEstimate(null);
        setDistance(0);
        setDuration(0);
        return;
      }

      setIsEstimating(true);
      setError(null);

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Calculate mock distance and duration
        const latDiff = Math.abs(form.pickup.latitude - form.dropoff.latitude);
        const lngDiff = Math.abs(form.pickup.longitude - form.dropoff.longitude);
        const mockDistance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff) * 111; // Rough km conversion
        const mockDuration = mockDistance * 3; // Rough estimate: 3 min per km

        setDistance(mockDistance);
        setDuration(mockDuration);

        // Find vehicle pricing
        const vehicle = VEHICLE_OPTIONS.find((v) => v.id === selectedVehicle);
        if (!vehicle) return;

        // Calculate fare
        const baseFare = vehicle.basePrice;
        const distanceFare = mockDistance * vehicle.pricePerKm;
        const timeFare = mockDuration * vehicle.pricePerMinute;
        const subtotal = baseFare + distanceFare + timeFare;

        // Apply surge (mock)
        const isSurge = Math.random() > 0.7;
        const multiplier = isSurge ? 1.2 + Math.random() * 0.5 : 1;
        setSurgeActive(isSurge);
        setSurgeMultiplier(multiplier);

        const withSurge = subtotal * multiplier;
        const serviceFee = withSurge * 0.1; // 10% service fee
        const tax = withSurge * 0.05; // 5% tax

        setFareEstimate({
          baseFare: Math.round(baseFare * 100) / 100,
          distanceFare: Math.round(distanceFare * 100) / 100,
          timeFare: Math.round(timeFare * 100) / 100,
          surgeMultiplier: multiplier,
          serviceFee: Math.round(serviceFee * 100) / 100,
          tax: Math.round(tax * 100) / 100,
          discount: 0,
          total: Math.round((withSurge + serviceFee + tax) * 100) / 100,
          currency: 'USD',
        });
      } catch (err) {
        setError('Failed to calculate fare. Please try again.');
        console.error('Fare calculation error:', err);
      } finally {
        setIsEstimating(false);
      }
    };

    calculateFare();
  }, [form.pickup, form.dropoff, selectedVehicle]);

  // Handle booking
  const handleBookRide = useCallback(async () => {
    if (!form.pickup || !form.dropoff || !selectedVehicle) {
      setError('Please select pickup, dropoff, and vehicle type');
      return;
    }

    setIsBooking(true);
    setError(null);

    try {
      // Simulate booking API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulate driver assignment
      setCurrentRideStatus('SEARCHING_DRIVER');

      // Simulate finding a driver
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setCurrentRideStatus('DRIVER_ASSIGNED');

      setAssignedDriver({
        id: 'driver-1',
        name: 'Ahmed Mohammed',
        rating: 4.9,
        totalRides: 1247,
        photo: undefined,
        vehicle: {
          id: 'vehicle-1',
          type: 'CAR',
          make: 'Toyota',
          model: 'Camry',
          year: 2023,
          color: 'Silver',
          licensePlate: 'DUB 12345',
        },
        eta: 5,
        licensePlate: 'DUB 12345',
      });
    } catch (err) {
      setError('Failed to book ride. Please try again.');
      console.error('Booking error:', err);
      setIsBooking(false);
    }
  }, [form, selectedVehicle]);

  // Handle cancel ride
  const handleCancelRide = useCallback(() => {
    setCurrentRideStatus('CANCELLED');
    setAssignedDriver(null);
    setIsBooking(false);
  }, []);

  // Handle quick address selection
  const handleQuickAddressSelect = useCallback(
    (address: SavedAddress, isPickup: boolean) => {
      const location: Location = {
        address: address.address,
        latitude: address.latitude,
        longitude: address.longitude,
        name: address.label,
      };

      setForm((prev) => ({
        ...prev,
        [isPickup ? 'pickup' : 'dropoff']: location,
      }));
    },
    []
  );

  // Get estimated fares for all vehicles
  const getEstimatedFares = () => {
    if (!fareEstimate) return new Map<string, number>();

    const fares = new Map<string, number>();
    VEHICLE_OPTIONS.forEach((vehicle) => {
      const baseFare = vehicle.basePrice;
      const distanceFare = distance * vehicle.pricePerKm;
      const timeFare = duration * vehicle.pricePerMinute;
      const subtotal = baseFare + distanceFare + timeFare;
      const withSurge = subtotal * surgeMultiplier;
      const serviceFee = withSurge * 0.1;
      const tax = withSurge * 0.05;
      fares.set(vehicle.id, Math.round((withSurge + serviceFee + tax) * 100) / 100);
    });
    return fares;
  };

  const estimatedFares = getEstimatedFares();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Book a Ride</h1>
              <p className="text-sm text-gray-500">
                {currentRideStatus
                  ? 'Ride in progress'
                  : 'Enter your destination'}
              </p>
            </div>
          </div>
          {currentRideStatus && (
            <StatusBadge status={currentRideStatus} />
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column - Form */}
          <div className="space-y-4">
            {/* Active Ride Status */}
            {currentRideStatus && currentRideStatus !== 'CANCELLED' && (
              <>
                <RideStatus
                  currentStatus={currentRideStatus}
                  eta={assignedDriver?.eta}
                  driverName={assignedDriver?.name}
                  vehicleInfo={
                    assignedDriver
                      ? `${assignedDriver.vehicle.year} ${assignedDriver.vehicle.make} ${assignedDriver.vehicle.model}`
                      : undefined
                  }
                  onCancel={handleCancelRide}
                />

                {assignedDriver && currentRideStatus !== 'SEARCHING_DRIVER' && (
                  <DriverCard
                    driver={assignedDriver}
                    onCall={() => console.log('Call driver')}
                    onMessage={() => console.log('Message driver')}
                  />
                )}
              </>
            )}

            {/* Location Inputs */}
            {!currentRideStatus && (
              <>
                <Card>
                  <CardContent className="p-4 space-y-4">
                    <LocationSearch
                      label="Pickup Location"
                      placeholder="Enter pickup location"
                      value={form.pickup}
                      onChange={(location) =>
                        setForm((prev) => ({ ...prev, pickup: location }))
                      }
                      recentLocations={MOCK_RECENT_LOCATIONS}
                      savedLocations={MOCK_SAVED_ADDRESSES}
                      icon={<MapPin className="h-5 w-5 text-brand-600" />}
                    />

                    {/* Quick Address Buttons for Pickup */}
                    {!form.pickup && (
                      <div className="flex flex-wrap gap-2">
                        {MOCK_SAVED_ADDRESSES.slice(0, 3).map((addr) => (
                          <QuickAddressButton
                            key={addr.id}
                            address={addr}
                            onClick={() =>
                              handleQuickAddressSelect(addr, true)
                            }
                          />
                        ))}
                      </div>
                    )}

                    <LocationSearch
                      label="Dropoff Location"
                      placeholder="Enter destination"
                      value={form.dropoff}
                      onChange={(location) =>
                        setForm((prev) => ({ ...prev, dropoff: location }))
                      }
                      recentLocations={MOCK_RECENT_LOCATIONS}
                      savedLocations={MOCK_SAVED_ADDRESSES}
                      icon={<MapPin className="h-5 w-5 text-green-600" />}
                    />

                    {/* Quick Address Buttons for Dropoff */}
                    {!form.dropoff && (
                      <div className="flex flex-wrap gap-2">
                        {MOCK_SAVED_ADDRESSES.slice(0, 3).map((addr) => (
                          <QuickAddressButton
                            key={addr.id}
                            address={addr}
                            onClick={() =>
                              handleQuickAddressSelect(addr, false)
                            }
                          />
                        ))}
                      </div>
                    )}

                    {/* Schedule Ride & Ride for Someone Else */}
                    <div className="flex items-center justify-between pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowScheduleDialog(true)}
                        className={cn(
                          form.scheduledTime && 'bg-brand-50 border-brand-200'
                        )}
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        {form.scheduledTime ? 'Scheduled' : 'Schedule'}
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowRideForSomeoneDialog(true)}
                        className={cn(
                          form.isForSomeoneElse && 'bg-brand-50 border-brand-200'
                        )}
                      >
                        <User className="h-4 w-4 mr-2" />
                        {form.isForSomeoneElse ? 'For Someone Else' : 'For Me'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Vehicle Selection */}
                {form.pickup && form.dropoff && (
                  <Card>
                    <CardContent className="p-4">
                      <h2 className="text-lg font-semibold mb-4">
                        Choose Vehicle
                      </h2>
                      <VehicleSelector
                        vehicles={VEHICLE_OPTIONS}
                        selectedVehicle={selectedVehicle}
                        onSelectVehicle={setSelectedVehicle}
                        estimatedFares={estimatedFares}
                        surgeActive={surgeActive}
                        disabled={isEstimating || isBooking}
                      />
                    </CardContent>
                  </Card>
                )}

                {/* Fare Breakdown */}
                {fareEstimate && (
                  <FareBreakdown
                    fare={fareEstimate}
                    distance={distance}
                    duration={duration}
                    surgeMultiplier={surgeMultiplier}
                  />
                )}

                {/* Book Button */}
                <Button
                  className="w-full h-14 text-lg"
                  size="lg"
                  onClick={handleBookRide}
                  disabled={
                    !form.pickup ||
                    !form.dropoff ||
                    !selectedVehicle ||
                    isEstimating ||
                    isBooking
                  }
                >
                  {isBooking ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Booking your ride...
                    </>
                  ) : isEstimating ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Calculating fare...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5 mr-2" />
                      Book {selectedVehicle ? VEHICLE_OPTIONS.find(v => v.id === selectedVehicle)?.name : 'Ride'}
                    </>
                  )}
                </Button>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    {error}
                  </div>
                )}
              </>
            )}

            {/* Ride History */}
            {!currentRideStatus && (
              <RideHistory
                rides={MOCK_RIDE_HISTORY}
                onRebook={(ride) => {
                  setForm((prev) => ({
                    ...prev,
                    pickup: ride.pickup,
                    dropoff: ride.dropoff,
                  }));
                }}
              />
            )}
          </div>

          {/* Right Column - Map */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Card className="overflow-hidden">
              <div className="h-[400px] lg:h-[600px]">
                <RideMap
                  pickupLocation={form.pickup}
                  dropoffLocation={form.dropoff}
                  driverLocation={
                    assignedDriver && currentRideStatus !== 'SEARCHING_DRIVER'
                      ? { latitude: 25.2048, longitude: 55.2708 }
                      : undefined
                  }
                  interactive={!currentRideStatus}
                  showTraffic
                />
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* Schedule Ride Dialog */}
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule Your Ride</DialogTitle>
            <DialogDescription>
              Choose when you want your driver to arrive
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Pickup Time</Label>
              <Select
                onValueChange={(value) => {
                  const hours = parseInt(value);
                  const scheduledTime = new Date();
                  scheduledTime.setHours(scheduledTime.getHours() + hours);
                  setForm((prev) => ({ ...prev, scheduledTime }));
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Now</SelectItem>
                  <SelectItem value="1">In 1 hour</SelectItem>
                  <SelectItem value="2">In 2 hours</SelectItem>
                  <SelectItem value="4">In 4 hours</SelectItem>
                  <SelectItem value="8">In 8 hours</SelectItem>
                  <SelectItem value="24">Tomorrow</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {form.scheduledTime && (
              <div className="p-3 bg-brand-50 rounded-lg">
                <p className="text-sm text-brand-700">
                  Ride scheduled for{' '}
                  <strong>
                    {form.scheduledTime.toLocaleString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
                  </strong>
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowScheduleDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setShowScheduleDialog(false);
              }}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Ride for Someone Else Dialog */}
      <Dialog
        open={showRideForSomeoneDialog}
        onOpenChange={setShowRideForSomeoneDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book for Someone Else</DialogTitle>
            <DialogDescription>
              Enter the details of the person who will be taking the ride
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center space-x-2">
              <Switch
                checked={form.isForSomeoneElse}
                onCheckedChange={(checked) =>
                  setForm((prev) => ({ ...prev, isForSomeoneElse: checked }))
                }
              />
              <Label>Book for someone else</Label>
            </div>
            {form.isForSomeoneElse && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="rider-name">Rider Name</Label>
                  <Input
                    id="rider-name"
                    placeholder="Enter name"
                    value={form.riderName}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, riderName: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rider-phone">Rider Phone</Label>
                  <Input
                    id="rider-phone"
                    placeholder="Enter phone number"
                    value={form.riderPhone}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, riderPhone: e.target.value }))
                    }
                  />
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowRideForSomeoneDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setShowRideForSomeoneDialog(false);
              }}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
