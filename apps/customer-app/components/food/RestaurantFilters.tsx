'use client';

import { Slider } from '@tatx/ui/slider';
import { Label } from '@tatx/ui/label';

interface RestaurantFiltersProps {
  filters: {
    minRating: number;
    maxDeliveryTime: number;
    maxDeliveryFee: number;
  };
  onFiltersChange: (filters: { minRating: number; maxDeliveryTime: number; maxDeliveryFee: number }) => void;
}

export function RestaurantFilters({ filters, onFiltersChange }: RestaurantFiltersProps) {
  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Filters</h3>
        <button
          onClick={() =>
            onFiltersChange({
              minRating: 0,
              maxDeliveryTime: 60,
              maxDeliveryFee: 10,
            })
          }
          className="text-sm text-brand-600 hover:underline"
        >
          Reset
        </button>
      </div>

      {/* Minimum Rating */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Minimum Rating</Label>
          <span className="text-sm text-gray-600">{filters.minRating}+ ⭐</span>
        </div>
        <Slider
          value={[filters.minRating]}
          min={0}
          max={5}
          step={0.5}
          onValueChange={(value) => onFiltersChange({ ...filters, minRating: value[0] || 0 })}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>Any</span>
          <span>4.5+</span>
          <span>5.0</span>
        </div>
      </div>

      {/* Maximum Delivery Time */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Max Delivery Time</Label>
          <span className="text-sm text-gray-600">{filters.maxDeliveryTime} min</span>
        </div>
        <Slider
          value={[filters.maxDeliveryTime]}
          min={15}
          max={90}
          step={5}
          onValueChange={(value) => onFiltersChange({ ...filters, maxDeliveryTime: value[0] || 0 })}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>15 min</span>
          <span>45 min</span>
          <span>90 min</span>
        </div>
      </div>

      {/* Maximum Delivery Fee */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Max Delivery Fee</Label>
          <span className="text-sm text-gray-600">{filters.maxDeliveryFee} SAR</span>
        </div>
        <Slider
          value={[filters.maxDeliveryFee]}
          min={0}
          max={20}
          step={1}
          onValueChange={(value) => onFiltersChange({ ...filters, maxDeliveryFee: value[0] || 0 })}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>Free</span>
          <span>10 SAR</span>
          <span>20 SAR</span>
        </div>
      </div>
    </div>
  );
}
