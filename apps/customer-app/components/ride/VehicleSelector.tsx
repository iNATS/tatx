'use client';

import React from 'react';
import { Card, CardContent } from '@tatx/ui/components/card';
import { Button } from '@tatx/ui/components/button';
import { Badge } from '@tatx/ui/components/badge';
import {
  Car,
  CarSide,
  Star,
  Users,
  Motorcycle,
  Zap,
  Clock,
  User,
  Briefcase,
  Flame,
} from 'lucide-react';
import { cn } from '@tatx/ui/utils/cn';
import type { VehicleOption, VehicleSelectorProps } from '@/types/ride-booking';

/**
 * VehicleSelector Component
 * Card-based vehicle type selector with pricing and capacity info
 */
export function VehicleSelector({
  vehicles,
  selectedVehicle,
  onSelectVehicle,
  estimatedFares,
  surgeActive = false,
  disabled = false,
}: VehicleSelectorProps) {
  const getVehicleIcon = (icon: string) => {
    switch (icon) {
      case 'car':
        return <Car className="h-8 w-8" />;
      case 'car-side':
        return <CarSide className="h-8 w-8" />;
      case 'star':
        return <Star className="h-8 w-8" />;
      case 'users':
        return <Users className="h-8 w-8" />;
      case 'motorcycle':
        return <Motorcycle className="h-8 w-8" />;
      case 'zap':
        return <Zap className="h-8 w-8" />;
      default:
        return <Car className="h-8 w-8" />;
    }
  };

  const getVehicleColors = (vehicleId: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> =
      {
        economy: {
          bg: 'bg-brand-50',
          text: 'text-brand-700',
          border: 'border-brand-200',
        },
        comfort: {
          bg: 'bg-blue-50',
          text: 'text-blue-700',
          border: 'border-blue-200',
        },
        premium: {
          bg: 'bg-purple-50',
          text: 'text-purple-700',
          border: 'border-purple-200',
        },
        luxury: {
          bg: 'bg-amber-50',
          text: 'text-amber-700',
          border: 'border-amber-200',
        },
        van: {
          bg: 'bg-green-50',
          text: 'text-green-700',
          border: 'border-green-200',
        },
        xl: {
          bg: 'bg-green-50',
          text: 'text-green-700',
          border: 'border-green-200',
        },
        moto: {
          bg: 'bg-orange-50',
          text: 'text-orange-700',
          border: 'border-orange-200',
        },
        motorcycle: {
          bg: 'bg-orange-50',
          text: 'text-orange-700',
          border: 'border-orange-200',
        },
      };

    return (
      colors[vehicleId.toLowerCase()] || {
        bg: 'bg-gray-50',
        text: 'text-gray-700',
        border: 'border-gray-200',
      }
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(price);
  };

  return (
    <div className="space-y-3">
      {/* Surge Pricing Banner */}
      {surgeActive && (
        <div className="flex items-center justify-between px-4 py-2 bg-orange-50 border border-orange-200 rounded-lg">
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-600" />
            <span className="text-sm font-medium text-orange-800">
              High demand in your area
            </span>
          </div>
          <Badge className="bg-orange-600 text-white">Surge Active</Badge>
        </div>
      )}

      {/* Vehicle Options */}
      <div className="space-y-2">
        {vehicles.map((vehicle) => {
          const colors = getVehicleColors(vehicle.id);
          const isSelected = selectedVehicle === vehicle.id;
          const estimatedFare = estimatedFares?.get(vehicle.id) || vehicle.estimatedFare;
          const surgeMultiplier = vehicle.surgeMultiplier || 1;
          const finalPrice = estimatedFare ? estimatedFare * surgeMultiplier : null;

          return (
            <Card
              key={vehicle.id}
              className={cn(
                'cursor-pointer transition-all duration-200 hover:shadow-md',
                'border-2',
                isSelected
                  ? cn('border-brand-500 shadow-md', colors.bg)
                  : 'border-gray-200 hover:border-gray-300',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
              onClick={() => !disabled && onSelectVehicle(vehicle.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  {/* Vehicle Icon */}
                  <div
                    className={cn(
                      'flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center',
                      colors.bg,
                      colors.text
                    )}
                  >
                    {getVehicleIcon(vehicle.icon)}
                  </div>

                  {/* Vehicle Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3
                        className={cn(
                          'font-semibold text-lg',
                          isSelected ? 'text-brand-700' : 'text-gray-900'
                        )}
                      >
                        {vehicle.name}
                      </h3>
                      {surgeMultiplier > 1 && (
                        <Badge
                          variant="secondary"
                          className="bg-orange-100 text-orange-700 text-xs"
                        >
                          {surgeMultiplier.toFixed(1)}x
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {vehicle.description}
                    </p>

                    {/* Capacity */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <User className="h-3 w-3" />
                        <span>{vehicle.capacity.passengers}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Briefcase className="h-3 w-3" />
                        <span>{vehicle.capacity.luggage}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>{vehicle.eta} min</span>
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex-shrink-0 text-right">
                    {finalPrice !== null ? (
                      <>
                        <div
                          className={cn(
                            'text-xl font-bold',
                            isSelected ? 'text-brand-600' : 'text-gray-900'
                          )}
                        >
                          {formatPrice(finalPrice)}
                        </div>
                        {surgeMultiplier > 1 && estimatedFare && (
                          <div className="text-xs text-gray-400 line-through">
                            {formatPrice(estimatedFare)}
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-sm text-gray-400">
                        Enter route for price
                      </div>
                    )}
                    {isSelected && (
                      <div className="mt-1">
                        <Badge className="bg-brand-600 text-white text-xs">
                          Selected
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Vehicle Comparison Info */}
      <div className="pt-2">
        <p className="text-xs text-gray-500 text-center">
          Prices include taxes and fees. Final price may vary based on traffic
          and route.
        </p>
      </div>
    </div>
  );
}

/**
 * CompactVehicleOption Component
 * Smaller vehicle option for horizontal scrolling
 */
export function CompactVehicleOption({
  vehicle,
  isSelected,
  onSelect,
  disabled,
}: {
  vehicle: VehicleOption;
  isSelected: boolean;
  onSelect: () => void;
  disabled?: boolean;
}) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <button
      onClick={onSelect}
      disabled={disabled}
      className={cn(
        'flex-shrink-0 w-32 p-3 rounded-xl border-2 transition-all duration-200',
        'hover:shadow-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
        isSelected
          ? 'border-brand-500 bg-brand-50'
          : 'border-gray-200 hover:border-gray-300',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      <div className="text-center">
        <div
          className={cn(
            'w-10 h-10 rounded-lg mx-auto flex items-center justify-center mb-2',
            isSelected ? 'bg-brand-100 text-brand-600' : 'bg-gray-100 text-gray-600'
          )}
        >
          {vehicle.icon === 'car' && <Car className="h-5 w-5" />}
          {vehicle.icon === 'car-side' && <CarSide className="h-5 w-5" />}
          {vehicle.icon === 'star' && <Star className="h-5 w-5" />}
          {vehicle.icon === 'users' && <Users className="h-5 w-5" />}
          {vehicle.icon === 'motorcycle' && <Motorcycle className="h-5 w-5" />}
        </div>
        <p
          className={cn(
            'font-medium text-sm',
            isSelected ? 'text-brand-700' : 'text-gray-700'
          )}
        >
          {vehicle.name}
        </p>
        {vehicle.estimatedFare && (
          <p
            className={cn(
              'font-bold text-sm mt-1',
              isSelected ? 'text-brand-600' : 'text-gray-900'
            )}
          >
            {formatPrice(vehicle.estimatedFare)}
          </p>
        )}
        <p className="text-xs text-gray-500 mt-0.5">{vehicle.eta} min</p>
      </div>
    </button>
  );
}

export default VehicleSelector;
