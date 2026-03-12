'use client';

import { Plus, Minus, Trash2 } from 'lucide-react';
import { Button } from '@tatx/ui/button';
import { Card, CardContent } from '@tatx/ui/card';

interface CartItemProps {
  item: {
    id: string;
    name: string;
    nameAr?: string;
    price: number;
    quantity: number;
    selectedModifiers?: { name: string; price: number }[];
  };
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const itemTotal = (item.price + (item.selectedModifiers || []).reduce((sum, m) => sum + m.price, 0)) * item.quantity;

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{item.name}</h3>
            {item.nameAr && (
              <p className="text-sm text-gray-500">{item.nameAr}</p>
            )}
            {item.selectedModifiers && item.selectedModifiers.length > 0 && (
              <div className="text-xs text-gray-500 mt-1">
                {item.selectedModifiers.map((m, i) => (
                  <span key={i}>+ {m.name}</span>
                ))}
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(item.id)}
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="font-semibold w-8 text-center">{item.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <span className="font-bold text-lg">{itemTotal.toFixed(2)} SAR</span>
        </div>
      </CardContent>
    </Card>
  );
}
