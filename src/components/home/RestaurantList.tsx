
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Star, Clock, ShoppingBag } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RESTAURANTS } from '@/lib/data';

export function RestaurantList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
      {RESTAURANTS.map((restaurant) => (
        <Link key={restaurant.id} href={`/restaurant/${restaurant.id}`}>
          <Card className="overflow-hidden group hover:shadow-xl transition-all border-none bg-card">
            <div className="relative h-48 overflow-hidden">
              <Image
                src={restaurant.image}
                alt={restaurant.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                data-ai-hint="restaurant food"
              />
              <div className="absolute top-3 right-3">
                <Badge className="bg-white/90 text-foreground hover:bg-white backdrop-blur flex gap-1 items-center px-2 py-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold">{restaurant.rating}</span>
                </Badge>
              </div>
              <div className="absolute bottom-3 left-3">
                <Badge variant="primary" className="font-bold">
                  {restaurant.deliveryTime}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                  {restaurant.name}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-1">
                {restaurant.cuisine}
              </p>
              <div className="flex items-center gap-4 pt-4 border-t text-xs font-medium text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>Free delivery</span>
                </div>
                <div className="flex items-center gap-1">
                  <ShoppingBag className="w-3 h-3" />
                  <span>Min. {restaurant.minOrder} SAR</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
