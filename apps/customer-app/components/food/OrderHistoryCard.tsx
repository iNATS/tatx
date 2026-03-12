'use client';

import { Clock, Package } from 'lucide-react';
import { Card, CardContent } from '@tatx/ui/card';
import { Badge } from '@tatx/ui/badge';
import { Button } from '@tatx/ui/button';

interface OrderHistoryCardProps {
  order: {
    id: string;
    restaurantName: string;
    restaurantNameAr?: string;
    date: string;
    total: number;
    status: 'completed' | 'cancelled' | 'preparing' | 'on_the_way';
    items: { name: string; quantity: number }[];
  };
  onReorder: (orderId: string) => void;
}

export function OrderHistoryCard({ order, onReorder }: OrderHistoryCardProps) {
  const statusLabels = {
    completed: { label: 'Delivered', labelAr: 'تم التوصيل', color: 'bg-green-500' },
    cancelled: { label: 'Cancelled', labelAr: 'ملغي', color: 'bg-red-500' },
    preparing: { label: 'Preparing', labelAr: 'جاري التحضير', color: 'bg-blue-500' },
    on_the_way: { label: 'On the Way', labelAr: 'في الطريق', color: 'bg-yellow-500' },
  };

  const status = statusLabels[order.status];

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-gray-900">{order.restaurantName}</h3>
            {order.restaurantNameAr && (
              <p className="text-sm text-gray-500">{order.restaurantNameAr}</p>
            )}
          </div>
          <Badge className={status.color}>{status.label}</Badge>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{order.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Package className="h-4 w-4" />
            <span>{order.items.length} items</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-bold text-lg text-gray-900">{order.total.toFixed(2)} SAR</span>
          {order.status === 'completed' && (
            <Button size="sm" onClick={() => onReorder(order.id)}>
              Reorder
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
