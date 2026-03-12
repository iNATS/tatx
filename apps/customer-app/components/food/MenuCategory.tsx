'use client';

import { Clock, Flame, Plus } from 'lucide-react';
import { Button } from '@tatx/ui/button';
import { Badge } from '@tatx/ui/badge';
import { Card, CardContent } from '@tatx/ui/card';

interface MenuItem {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  price: number;
  image?: string;
  isPopular?: boolean;
  isAvailable: boolean;
  prepTime?: number;
  calories?: number;
  modifiers?: any[];
}

interface MenuCategoryProps {
  category: {
    id: string;
    name: string;
    nameAr: string;
    description?: string;
    items: MenuItem[];
  };
  onAddToCart: (item: MenuItem, modifiers?: any[]) => void;
}

export function MenuCategory({ category, onAddToCart }: MenuCategoryProps) {
  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{category.name}</h2>
        <p className="text-sm text-gray-500">{category.nameAr}</p>
        {category.description && (
          <p className="text-sm text-gray-600 mt-2">{category.description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {category.items.map((item) => (
          <Card key={item.id} className={!item.isAvailable ? 'opacity-50' : ''}>
            <CardContent className="p-4">
              <div className="flex gap-4">
                {/* Item Image */}
                <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      🍽️
                    </div>
                  )}
                </div>

                {/* Item Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.nameAr}</p>
                    </div>
                    {item.isPopular && (
                      <Badge className="bg-orange-100 text-orange-800">Popular</Badge>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Item Meta */}
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    {item.prepTime && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{item.prepTime} min</span>
                      </div>
                    )}
                    {item.calories && (
                      <div className="flex items-center gap-1">
                        <Flame className="h-3 w-3" />
                        <span>{item.calories} cal</span>
                      </div>
                    )}
                  </div>

                  {/* Price and Add Button */}
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg text-gray-900">
                      {item.price.toFixed(2)} SAR
                    </span>
                    <Button
                      size="sm"
                      onClick={() => onAddToCart(item)}
                      disabled={!item.isAvailable}
                      className="bg-brand-600 hover:bg-brand-700"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
