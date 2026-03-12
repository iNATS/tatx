'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@tatx/ui/components/card';
import { Button } from '@tatx/ui/components/button';
import { Badge } from '@tatx/ui/components/badge';
import { ScrollArea } from '@tatx/ui/components/scroll-area';
import {
  Car,
  Clock,
  MapPin,
  Navigation,
  ChevronRight,
  RotateCcw,
  Star,
  Receipt,
  Download,
  Loader2,
  Calendar,
} from 'lucide-react';
import { cn } from '@tatx/ui/utils/cn';
import type { RideHistoryProps, RideHistoryItem } from '@/types/ride-booking';
import type { RideStatus as RideStatusType } from '@tatx/types';

/**
 * RideHistory Component
 * Past rides list with status badges and quick actions
 */
export function RideHistory({
  rides,
  onRebook,
  onViewDetails,
  isLoading = false,
}: RideHistoryProps) {
  const formatDate = (date: Date) => {
    const now = new Date();
    const rideDate = new Date(date);
    const diffMs = now.getTime() - rideDate.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return rideDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    }
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getStatusBadge = (status: RideStatusType) => {
    const config: Record<
      RideStatusType,
      { label: string; className: string }
    > = {
      REQUESTED: { label: 'Requested', className: 'bg-gray-100 text-gray-700' },
      SEARCHING_DRIVER: {
        label: 'Searching',
        className: 'bg-blue-100 text-blue-700',
      },
      DRIVER_ASSIGNED: {
        label: 'Assigned',
        className: 'bg-brand-100 text-brand-700',
      },
      DRIVER_ARRIVED: {
        label: 'Arrived',
        className: 'bg-green-100 text-green-700',
      },
      IN_PROGRESS: {
        label: 'In Progress',
        className: 'bg-purple-100 text-purple-700',
      },
      COMPLETED: { label: 'Completed', className: 'bg-green-100 text-green-700' },
      CANCELLED: { label: 'Cancelled', className: 'bg-red-100 text-red-700' },
    };

    const { label, className } = config[status] || config.REQUESTED;
    return <Badge className={className}>{label}</Badge>;
  };

  const getVehicleIcon = () => {
    return <Car className="h-5 w-5" />;
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Ride History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (rides.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Ride History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Car className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              No rides yet
            </h3>
            <p className="text-gray-500 mt-1">
              Book your first ride to see it here
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Ride History</CardTitle>
          <Button variant="ghost" size="sm" className="text-brand-600">
            View All
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {rides.map((ride) => (
              <RideHistoryCard
                key={ride.id}
                ride={ride}
                formatDate={formatDate}
                formatTime={formatTime}
                formatPrice={formatPrice}
                getStatusBadge={getStatusBadge}
                onRebook={onRebook}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

/**
 * RideHistoryCard Component
 * Individual ride card for history list
 */
function RideHistoryCard({
  ride,
  formatDate,
  formatTime,
  formatPrice,
  getStatusBadge,
  onRebook,
  onViewDetails,
}: {
  ride: RideHistoryItem;
  formatDate: (date: Date) => string;
  formatTime: (date: Date) => string;
  formatPrice: (amount: number) => string;
  getStatusBadge: (status: RideStatusType) => React.ReactNode;
  onRebook?: (ride: RideHistoryItem) => void;
  onViewDetails?: (ride: RideHistoryItem) => void;
}) {
  const isCompleted = ride.status === 'COMPLETED';
  const isCancelled = ride.status === 'CANCELLED';

  return (
    <Card
      className={cn(
        'cursor-pointer transition-all duration-200 hover:shadow-md',
        isCancelled && 'opacity-75'
      )}
      onClick={() => onViewDetails?.(ride)}
    >
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
              {getVehicleIcon()}
            </div>
            <div>
              <p className="font-medium text-gray-900 capitalize">
                {ride.vehicleType.toLowerCase()}
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Calendar className="h-3 w-3" />
                <span>
                  {formatDate(ride.date)} at {formatTime(ride.date)}
                </span>
              </div>
            </div>
          </div>
          {getStatusBadge(ride.status)}
        </div>

        {/* Route */}
        <div className="relative pl-4 border-l-2 border-gray-200 space-y-3 mb-3">
          {/* Pickup */}
          <div className="flex items-start gap-2">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-brand-500 border-2 border-white" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                Pickup
              </p>
              <p className="text-sm font-medium text-gray-900 truncate">
                {ride.pickup.name || ride.pickup.address}
              </p>
            </div>
          </div>

          {/* Dropoff */}
          <div className="flex items-start gap-2">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-green-500 border-2 border-white" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <Navigation className="h-3 w-3" />
                Dropoff
              </p>
              <p className="text-sm font-medium text-gray-900 truncate">
                {ride.dropoff.name || ride.dropoff.address}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t">
          <div>
            <p className="text-2xl font-bold text-brand-600">
              {formatPrice(ride.fare)}
            </p>
            {ride.driverRating && (
              <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span>You rated: {ride.driverRating.toFixed(1)}</span>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            {isCompleted && onRebook && (
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onRebook(ride);
                }}
                className="text-brand-600"
              >
                <RotateCcw className="h-3 w-3 mr-1" />
                Rebook
              </Button>
            )}
            {isCompleted && (
              <Button variant="outline" size="sm">
                <Receipt className="h-3 w-3 mr-1" />
                Receipt
              </Button>
            )}
            {isCancelled && (
              <Button variant="outline" size="sm" onClick={(e) => {
                e.stopPropagation();
                onRebook?.(ride);
              }}>
                <RotateCcw className="h-3 w-3 mr-1" />
                Book Again
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * RideDetailsDialog Component
 * Detailed view of a single ride
 */
export function RideDetailsDialog({
  ride,
  open,
  onOpenChange,
}: {
  ride: RideHistoryItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!ride) return null;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ride Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Date & Status */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">{formatDate(ride.date)}</p>
            <p className="text-sm text-gray-500">{formatTime(ride.date)}</p>
          </div>
          <Badge
            className={
              ride.status === 'COMPLETED'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }
          >
            {ride.status}
          </Badge>
        </div>

        {/* Route */}
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-brand-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-gray-500">Pickup</p>
              <p className="font-medium">{ride.pickup.address}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Navigation className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-gray-500">Dropoff</p>
              <p className="font-medium">{ride.dropoff.address}</p>
            </div>
          </div>
        </div>

        {/* Fare */}
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Total Paid</span>
            <span className="text-xl font-bold text-brand-600">
              {formatPrice(ride.fare)}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button className="flex-1">
            <Download className="h-4 w-4 mr-2" />
            Download Receipt
          </Button>
          <Button variant="outline" className="flex-1">
            <Star className="h-4 w-4 mr-2" />
            Rate Driver
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default RideHistory;
