'use client';

import React from 'react';
import { Card, CardContent } from '@tatx/ui/components/card';
import { Button } from '@tatx/ui/components/button';
import { Badge } from '@tatx/ui/components/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@tatx/ui/components/avatar';
import {
  Star,
  Phone,
  MessageCircle,
  Car,
  Shield,
  Clock,
  Navigation,
  Award,
} from 'lucide-react';
import { cn } from '@tatx/ui/utils/cn';
import type { DriverCardProps } from '@/types/ride-booking';

/**
 * DriverCard Component
 * Driver info card with photo, rating, vehicle details, and contact options
 */
export function DriverCard({
  driver,
  onCall,
  onMessage,
}: DriverCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatRating = (rating: number) => {
    return rating.toFixed(1);
  };

  const getVehicleIcon = (type: string) => {
    return <Car className="h-5 w-5" />;
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        {/* Header with Driver Info */}
        <div className="bg-gradient-to-r from-brand-600 to-brand-700 p-4 text-white">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-white shadow-lg">
              <AvatarImage src={driver.photo} alt={driver.name} />
              <AvatarFallback className="bg-brand-200 text-brand-800 text-lg font-semibold">
                {getInitials(driver.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-xl font-bold">{driver.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{formatRating(driver.rating)}</span>
                </div>
                <span className="text-brand-200">•</span>
                <span className="text-brand-100">
                  {driver.totalRides} rides
                </span>
              </div>
              <div className="flex items-center gap-1 mt-1 text-brand-100 text-sm">
                <Clock className="h-3 w-3" />
                <span>ETA: {driver.eta} min</span>
              </div>
            </div>
          </div>
        </div>

        {/* Vehicle Info */}
        <div className="p-4 border-b">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
              {getVehicleIcon(driver.vehicle.type)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-gray-900">
                  {driver.vehicle.year} {driver.vehicle.make} {driver.vehicle.model}
                </h4>
                <Badge variant="secondary" className="text-xs">
                  {driver.vehicle.type}
                </Badge>
              </div>
              <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Navigation className="h-3 w-3" />
                  <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">
                    {driver.vehicle.licensePlate}
                  </span>
                </div>
                <span className="text-gray-400">•</span>
                <span className="capitalize">{driver.vehicle.color}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Driver Badges */}
        <div className="p-4 border-b bg-gray-50">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-xs text-gray-500">Background Checked</p>
                <p className="text-sm font-medium text-gray-700">Verified</p>
              </div>
            </div>
            {driver.rating >= 4.8 && (
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="text-xs text-gray-500">Top Rated</p>
                  <p className="text-sm font-medium text-gray-700">
                    Top {Math.round((1 - driver.rating / 5) * 100)}%
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Contact Actions */}
        <div className="p-4">
          <div className="flex gap-3">
            {onCall && (
              <Button
                onClick={onCall}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <Phone className="h-4 w-4 mr-2" />
                Call
              </Button>
            )}
            {onMessage && (
              <Button
                onClick={onMessage}
                variant="outline"
                className="flex-1"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Message
              </Button>
            )}
          </div>
        </div>

        {/* Safety Note */}
        <div className="px-4 pb-4">
          <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
            <Shield className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-blue-700">
              Always verify the vehicle license plate before entering. Share your
              trip status with loved ones for added safety.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * CompactDriverCard Component
 * Smaller driver card for ride status view
 */
export function CompactDriverCard({
  driver,
  onCall,
}: {
  driver: DriverCardProps['driver'];
  onCall?: () => void;
}) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card>
      <CardContent className="p-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={driver.photo} alt={driver.name} />
            <AvatarFallback className="bg-brand-100 text-brand-800 text-sm font-semibold">
              {getInitials(driver.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-gray-900 truncate">
                {driver.name}
              </h4>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{driver.rating.toFixed(1)}</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 truncate">
              {driver.vehicle.year} {driver.vehicle.make} {driver.vehicle.model}
            </p>
            <p className="text-xs text-gray-400 font-mono">
              {driver.vehicle.licensePlate}
            </p>
          </div>
          {onCall && (
            <Button
              variant="outline"
              size="icon"
              className="flex-shrink-0 h-10 w-10"
              onClick={onCall}
            >
              <Phone className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * VehiclePlate Component
 * License plate display with visual styling
 */
export function VehiclePlate({ plate, className }: { plate: string; className?: string }) {
  return (
    <div
      className={cn(
        'inline-flex items-center px-3 py-1.5 bg-white border-2 border-gray-300 rounded-md shadow-sm',
        className
      )}
    >
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
          <span className="text-white text-xs font-bold">T</span>
        </div>
        <span className="font-mono text-lg font-bold tracking-wider text-gray-900">
          {plate}
        </span>
      </div>
    </div>
  );
}

export default DriverCard;
