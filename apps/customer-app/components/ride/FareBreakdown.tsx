'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@tatx/ui/components/card';
import { Button } from '@tatx/ui/components/button';
import { Badge } from '@tatx/ui/components/badge';
import { Input } from '@tatx/ui/components/input';
import {
  ChevronDown,
  ChevronUp,
  Info,
  Tag,
  Percent,
  Check,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { cn } from '@tatx/ui/utils/cn';
import type { FareBreakdownProps, FareDisplay } from '@/types/ride-booking';
import type { RideFare } from '@tatx/types';

/**
 * FareBreakdown Component
 * Detailed fare breakdown showing base fare, distance, time, surge, and fees
 */
export function FareBreakdown({
  fare,
  distance,
  duration,
  surgeMultiplier = 1,
  showDetails = false,
}: FareBreakdownProps) {
  const [isExpanded, setIsExpanded] = useState(showDetails);
  const [promoCode, setPromoCode] = useState('');
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDistance = (km: number) => {
    return `${km.toFixed(1)} km`;
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${Math.round(minutes)} min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return;

    setIsApplyingPromo(true);
    setPromoError(null);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Mock validation
      const validCodes = ['SAVE10', 'WELCOME', 'FIRST50'];
      if (validCodes.includes(promoCode.toUpperCase())) {
        setAppliedPromo(promoCode.toUpperCase());
        setPromoCode('');
      } else {
        setPromoError('Invalid promo code');
      }
    } catch (error) {
      setPromoError('Failed to apply promo code');
    } finally {
      setIsApplyingPromo(false);
    }
  };

  if (!fare) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-4">
            <Info className="h-8 w-8 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500">
              Enter pickup and dropoff locations to see fare estimate
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const subtotal =
    fare.baseFare + fare.distanceFare + fare.timeFare;
  const surgeAmount = subtotal * (surgeMultiplier - 1);
  const totalWithSurge = subtotal * surgeMultiplier;
  const finalTotal =
    totalWithSurge + fare.serviceFee + fare.tax - fare.discount;

  const breakdownItems: FareDisplay[] = [
    {
      label: 'Base Fare',
      amount: fare.baseFare,
      detail: 'Standard booking fee',
    },
    {
      label: 'Distance',
      amount: fare.distanceFare,
      detail: formatDistance(distance),
    },
    {
      label: 'Time',
      amount: fare.timeFare,
      detail: formatDuration(duration),
    },
  ];

  if (surgeMultiplier > 1) {
    breakdownItems.push({
      label: 'Surge Pricing',
      amount: surgeAmount,
      detail: `${surgeMultiplier.toFixed(1)}x multiplier`,
    });
  }

  breakdownItems.push(
    {
      label: 'Service Fee',
      amount: fare.serviceFee,
      detail: 'Platform fee',
    },
    {
      label: 'Tax',
      amount: fare.tax,
      detail: 'VAT & local taxes',
    }
  );

  if (fare.discount > 0) {
    breakdownItems.push({
      label: 'Discount',
      amount: -fare.discount,
      detail: appliedPromo ? `Code: ${appliedPromo}` : 'Applied offer',
    });
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Fare Details</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-500"
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Trip Summary */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-xs text-gray-500">Distance</p>
              <p className="font-semibold text-gray-900">
                {formatDistance(distance)}
              </p>
            </div>
            <div className="w-px h-8 bg-gray-200" />
            <div className="text-center">
              <p className="text-xs text-gray-500">Duration</p>
              <p className="font-semibold text-gray-900">
                {formatDuration(duration)}
              </p>
            </div>
          </div>
          {surgeMultiplier > 1 && (
            <Badge className="bg-orange-100 text-orange-700">
              {surgeMultiplier.toFixed(1)}x Surge
            </Badge>
          )}
        </div>

        {/* Expanded Breakdown */}
        {isExpanded && (
          <div className="space-y-2 pt-2 border-t">
            {breakdownItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">{item.label}</span>
                  {item.detail && (
                    <span className="text-xs text-gray-400">({item.detail})</span>
                  )}
                </div>
                <span
                  className={cn(
                    'font-medium',
                    item.amount < 0 ? 'text-green-600' : 'text-gray-900'
                  )}
                >
                  {item.amount < 0 ? '-' : ''}
                  {formatPrice(Math.abs(item.amount))}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Promo Code Input */}
        <div className="pt-2 border-t">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Promo code"
                value={promoCode}
                onChange={(e) => {
                  setPromoCode(e.target.value);
                  setPromoError(null);
                }}
                disabled={!!appliedPromo || isApplyingPromo}
                className={cn(
                  'pl-10 pr-4 h-10',
                  promoError && 'border-red-300 focus:ring-red-500'
                )}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleApplyPromo();
                  }
                }}
              />
            </div>
            {appliedPromo ? (
              <Button
                variant="outline"
                size="sm"
                className="bg-green-50 text-green-700 border-green-200"
              >
                <Check className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={handleApplyPromo}
                disabled={!promoCode.trim() || isApplyingPromo}
              >
                {isApplyingPromo ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Apply'
                )}
              </Button>
            )}
          </div>
          {promoError && (
            <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
              <AlertCircle className="h-3 w-3" />
              <span>{promoError}</span>
            </div>
          )}
        </div>

        {/* Total */}
        <div className="pt-3 border-t">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-semibold text-gray-900">Total</span>
              {surgeMultiplier > 1 && (
                <p className="text-xs text-gray-500 mt-0.5">
                  Includes {surgeMultiplier.toFixed(1)}x surge pricing
                </p>
              )}
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-brand-600">
                {formatPrice(finalTotal)}
              </span>
              {fare.discount > 0 && (
                <p className="text-xs text-green-600 mt-0.5">
                  You saved {formatPrice(fare.discount)}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Price Guarantee */}
        <div className="pt-2">
          <div className="flex items-start gap-2 p-2 bg-brand-50 rounded-lg">
            <Info className="h-4 w-4 text-brand-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-brand-700">
              Price locked! This is the final price you&apos;ll pay. No surprises.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * SimpleFareDisplay Component
 * Compact fare display for quick viewing
 */
export function SimpleFareDisplay({
  fare,
  distance,
  duration,
  compact = false,
}: {
  fare: RideFare | null;
  distance: number;
  duration: number;
  compact?: boolean;
}) {
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  if (!fare) {
    return (
      <div className="text-center py-4 text-gray-500">
        Enter route to see price
      </div>
    );
  }

  const total =
    fare.baseFare +
    fare.distanceFare +
    fare.timeFare +
    fare.serviceFee +
    fare.tax -
    fare.discount;

  if (compact) {
    return (
      <div className="text-center">
        <p className="text-3xl font-bold text-brand-600">{formatPrice(total)}</p>
        <p className="text-xs text-gray-500 mt-1">
          {distance.toFixed(1)} km • {Math.round(duration)} min
        </p>
      </div>
    );
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Estimated Fare</p>
            <p className="text-2xl font-bold text-brand-600">
              {formatPrice(total)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">{distance.toFixed(1)} km</p>
            <p className="text-sm text-gray-600">{Math.round(duration)} min</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default FareBreakdown;
