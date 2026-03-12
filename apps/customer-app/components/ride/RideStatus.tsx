'use client';

import React from 'react';
import { Card, CardContent } from '@tatx/ui/components/card';
import { Button } from '@tatx/ui/components/button';
import { Badge } from '@tatx/ui/components/badge';
import { Progress } from '@tatx/ui/components/progress';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@tatx/ui/components/alert-dialog';
import {
  Clock,
  CheckCircle2,
  Car,
  MapPin,
  XCircle,
  AlertCircle,
  Phone,
  MessageCircle,
  Navigation,
  Timer,
  Loader2,
} from 'lucide-react';
import { cn } from '@tatx/ui/utils/cn';
import type { RideStatusProps, RideStatusStep } from '@/types/ride-booking';
import type { RideStatus as RideStatusType } from '@tatx/types';

/**
 * RideStatus Component
 * Real-time ride status indicator with progress and actions
 */
export function RideStatus({
  currentStatus,
  eta,
  driverName,
  vehicleInfo,
  onCancel,
}: RideStatusProps) {
  const [showCancelDialog, setShowCancelDialog] = React.useState(false);

  // Define status steps
  const statusSteps: RideStatusStep[] = [
    {
      status: 'SEARCHING_DRIVER',
      label: 'Finding your driver',
      description: 'Looking for nearby drivers...',
      icon: 'search',
    },
    {
      status: 'DRIVER_ASSIGNED',
      label: 'Driver assigned',
      description: 'Your driver is on the way',
      icon: 'driver',
    },
    {
      status: 'DRIVER_ARRIVED',
      label: 'Driver arrived',
      description: 'Your driver has arrived at pickup',
      icon: 'arrived',
    },
    {
      status: 'IN_PROGRESS',
      label: 'Ride in progress',
      description: 'Heading to your destination',
      icon: 'driving',
    },
    {
      status: 'COMPLETED',
      label: 'Ride completed',
      description: 'You have arrived at your destination',
      icon: 'completed',
    },
  ];

  const getCurrentStepIndex = (): number => {
    const stepMap: Record<RideStatusType, number> = {
      REQUESTED: 0,
      SEARCHING_DRIVER: 0,
      DRIVER_ASSIGNED: 1,
      DRIVER_ARRIVED: 2,
      IN_PROGRESS: 3,
      COMPLETED: 4,
      CANCELLED: -1,
    };
    return stepMap[currentStatus] ?? 0;
  };

  const getProgressValue = (): number => {
    const index = getCurrentStepIndex();
    if (index < 0) return 0;
    return ((index + 1) / statusSteps.length) * 100;
  };

  const getStatusColor = (status: RideStatusType): string => {
    switch (status) {
      case 'SEARCHING_DRIVER':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'DRIVER_ASSIGNED':
        return 'text-brand-600 bg-brand-50 border-brand-200';
      case 'DRIVER_ARRIVED':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'IN_PROGRESS':
        return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'COMPLETED':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'CANCELLED':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (icon: string) => {
    switch (icon) {
      case 'search':
        return <Loader2 className="h-6 w-6 animate-spin" />;
      case 'driver':
        return <Car className="h-6 w-6" />;
      case 'arrived':
        return <MapPin className="h-6 w-6" />;
      case 'driving':
        return <Navigation className="h-6 w-6" />;
      case 'completed':
        return <CheckCircle2 className="h-6 w-6" />;
      default:
        return <Clock className="h-6 w-6" />;
    }
  };

  const currentStepIndex = getCurrentStepIndex();
  const isCancelled = currentStatus === 'CANCELLED';

  // Cancelled State
  if (isCancelled) {
    return (
      <Card className="border-red-200">
        <CardContent className="p-6">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Ride Cancelled</h3>
            <p className="text-gray-500 mt-1">
              Your ride has been cancelled
            </p>
            <Button className="mt-4" variant="outline">
              Book Another Ride
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Completed State
  if (currentStatus === 'COMPLETED') {
    return (
      <Card className="border-green-200">
        <CardContent className="p-6">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              You have arrived!
            </h3>
            <p className="text-gray-500 mt-1">
              Thank you for riding with Tatx
            </p>
            <div className="flex gap-3 mt-4 justify-center">
              <Button className="bg-green-600 hover:bg-green-700">
                Rate Driver
              </Button>
              <Button variant="outline">Download Receipt</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        {/* Status Header */}
        <div
          className={cn(
            'p-4 border-b',
            getStatusColor(currentStatus)
          )}
        >
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center',
                'bg-white shadow-sm'
              )}
            >
              {getStatusIcon(statusSteps[currentStepIndex]?.icon || 'clock')}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">
                {statusSteps[currentStepIndex]?.label || 'Processing'}
              </h3>
              <p className="text-sm opacity-80">
                {statusSteps[currentStepIndex]?.description || ''}
              </p>
            </div>
            {eta !== undefined && eta > 0 && currentStatus !== 'COMPLETED' && (
              <div className="text-right">
                <div className="flex items-center gap-1">
                  <Timer className="h-4 w-4" />
                  <span className="text-2xl font-bold">{eta}</span>
                </div>
                <p className="text-xs opacity-80">min</p>
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-4 py-3 border-b">
          <Progress value={getProgressValue()} className="h-2" />
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>Requested</span>
            <span>Driver Assigned</span>
            <span>Arrived</span>
            <span>In Progress</span>
            <span>Completed</span>
          </div>
        </div>

        {/* Driver & Vehicle Info */}
        {(driverName || vehicleInfo) &&
          currentStatus !== 'SEARCHING_DRIVER' && (
            <div className="p-4 border-b bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center">
                  <Car className="h-5 w-5 text-brand-600" />
                </div>
                <div className="flex-1">
                  {driverName && (
                    <p className="font-medium text-gray-900">{driverName}</p>
                  )}
                  {vehicleInfo && (
                    <p className="text-sm text-gray-500">{vehicleInfo}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

        {/* Status Message */}
        <div className="p-4">
          {currentStatus === 'SEARCHING_DRIVER' && (
            <div className="text-center py-4">
              <Loader2 className="h-8 w-8 animate-spin text-brand-600 mx-auto mb-3" />
              <p className="text-gray-600 font-medium">
                Finding the best driver for you
              </p>
              <p className="text-sm text-gray-500 mt-1">
                This usually takes less than a minute
              </p>
            </div>
          )}

          {currentStatus === 'DRIVER_ASSIGNED' && (
            <div className="flex items-start gap-3 p-3 bg-brand-50 rounded-lg">
              <AlertCircle className="h-5 w-5 text-brand-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-brand-800">
                  Driver is on the way
                </p>
                <p className="text-sm text-brand-600 mt-0.5">
                  Please be ready at the pickup location. The driver will wait for
                  up to 5 minutes.
                </p>
              </div>
            </div>
          )}

          {currentStatus === 'DRIVER_ARRIVED' && (
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <MapPin className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-green-800">
                  Driver has arrived
                </p>
                <p className="text-sm text-green-600 mt-0.5">
                  Please meet your driver at the pickup location. Verify the
                  license plate before entering.
                </p>
              </div>
            </div>
          )}

          {currentStatus === 'IN_PROGRESS' && (
            <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
              <Navigation className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-purple-800">
                  Heading to destination
                </p>
                <p className="text-sm text-purple-600 mt-0.5">
                  Sit back and relax. You will arrive soon.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Cancel Button */}
        {onCancel &&
          currentStatus !== 'COMPLETED' &&
          currentStatus !== 'CANCELLED' && (
            <div className="p-4 border-t">
              <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50">
                    Cancel Ride
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Cancel this ride?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to cancel this ride? If the driver is
                      already on the way, a cancellation fee may apply.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Keep Ride</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        onCancel();
                        setShowCancelDialog(false);
                      }}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Cancel Ride
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
      </CardContent>
    </Card>
  );
}

/**
 * StatusBadge Component
 * Compact status badge for lists
 */
export function StatusBadge({ status }: { status: RideStatusType }) {
  const getStatusConfig = (
    status: RideStatusType
  ): {
    label: string;
    className: string;
  } => {
    switch (status) {
      case 'REQUESTED':
        return { label: 'Requested', className: 'bg-gray-100 text-gray-700' };
      case 'SEARCHING_DRIVER':
        return {
          label: 'Finding Driver',
          className: 'bg-blue-100 text-blue-700',
        };
      case 'DRIVER_ASSIGNED':
        return {
          label: 'Driver Assigned',
          className: 'bg-brand-100 text-brand-700',
        };
      case 'DRIVER_ARRIVED':
        return {
          label: 'Driver Arrived',
          className: 'bg-green-100 text-green-700',
        };
      case 'IN_PROGRESS':
        return {
          label: 'In Progress',
          className: 'bg-purple-100 text-purple-700',
        };
      case 'COMPLETED':
        return { label: 'Completed', className: 'bg-green-100 text-green-700' };
      case 'CANCELLED':
        return { label: 'Cancelled', className: 'bg-red-100 text-red-700' };
      default:
        return { label: status, className: 'bg-gray-100 text-gray-700' };
    }
  };

  const config = getStatusConfig(status);

  return <Badge className={config.className}>{config.label}</Badge>;
}

export default RideStatus;
