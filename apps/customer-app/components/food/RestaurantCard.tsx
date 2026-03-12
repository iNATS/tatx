'use client';

import { Star, Clock, MapPin, ChevronRight, BadgeCheck } from 'lucide-react';
import { Card, CardContent } from '@tatx/ui/card';
import { Badge } from '@tatx/ui/badge';

interface Restaurant {
  id: string;
  name: string;
  nameAr: string;
  cuisine: string[];
  rating: number;
  totalReviews: number;
  deliveryTime: number;
  deliveryFee: number;
  minOrder: number;
  image: string;
  isFeatured: boolean;
  badges: string[];
  distance: number;
}

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const BADGE_CONFIG: Record<string, { label: string; color: string }> = {
  POPULAR: { label: 'Popular', color: 'bg-orange-100 text-orange-800' },
  FAST_DELIVERY: { label: 'Fast Delivery', color: 'bg-green-100 text-green-800' },
  NEW: { label: 'New', color: 'bg-blue-100 text-blue-800' },
};

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
      {/* Restaurant Image */}
      <div className="relative h-48 bg-gray-200">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
          {restaurant.badges.map((badge) => (
            BADGE_CONFIG[badge] && (
              <Badge key={badge} className={BADGE_CONFIG[badge].color}>
                {BADGE_CONFIG[badge].label}
              </Badge>
            )
          ))}
        </div>

        {/* Featured Badge */}
        {restaurant.isFeatured && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1">
            <BadgeCheck className="h-3 w-3" />
            Featured
          </div>
        )}
      </div>

      <CardContent className="p-4">
        {/* Restaurant Name */}
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-bold text-lg text-gray-900">{restaurant.name}</h3>
            <p className="text-sm text-gray-500">{restaurant.nameAr}</p>
          </div>
        </div>

        {/* Cuisine Types */}
        <div className="flex flex-wrap gap-1 mb-3">
          {restaurant.cuisine.map((type, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {type}
            </Badge>
          ))}
        </div>

        {/* Rating & Reviews */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-gray-900">{restaurant.rating}</span>
          </div>
          <span className="text-sm text-gray-500">({restaurant.totalReviews} reviews)</span>
        </div>

        {/* Delivery Info */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{restaurant.deliveryTime}-{restaurant.deliveryTime + 10} min</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{restaurant.distance.toFixed(1)} km</span>
          </div>
        </div>

        {/* Delivery Fee & Min Order */}
        <div className="flex items-center justify-between pt-3 border-t">
          <div>
            <span className="text-xs text-gray-500">Delivery Fee</span>
            <p className="font-semibold text-gray-900">
              {restaurant.deliveryFee === 0 ? (
                <span className="text-green-600">FREE</span>
              ) : (
                `${restaurant.deliveryFee.toFixed(2)} SAR`
              )}
            </p>
          </div>
          <div>
            <span className="text-xs text-gray-500">Min Order</span>
            <p className="font-semibold text-gray-900">{restaurant.minOrder.toFixed(2)} SAR</p>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
        </div>
      </CardContent>
    </Card>
  );
}
