'use client';

import { Card, CardContent } from '@tatx/ui/card';
import { Badge } from '@tatx/ui/badge';

interface OrderTrackerProps {
  status: 'preparing' | 'on_the_way' | 'delivered';
  estimatedTime: number;
  driverName?: string;
  driverPhone?: string;
}

export function OrderTracker({ status, estimatedTime, driverName, driverPhone }: OrderTrackerProps) {
  const statusLabels = {
    preparing: { label: 'Preparing', labelAr: 'جاري التحضير', color: 'bg-blue-500' },
    on_the_way: { label: 'On the Way', labelAr: 'في الطريق', color: 'bg-yellow-500' },
    delivered: { label: 'Delivered', labelAr: 'تم التوصيل', color: 'bg-green-500' },
  };

  const currentStatus = statusLabels[status];

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">{currentStatus.label}</h3>
            <p className="text-sm text-gray-500">{currentStatus.labelAr}</p>
          </div>
          <Badge className={currentStatus.color}>{currentStatus.label}</Badge>
        </div>

        <div className="text-center py-4">
          <p className="text-2xl font-bold text-gray-900">{estimatedTime} min</p>
          <p className="text-sm text-gray-500">Estimated delivery time</p>
        </div>

        {driverName && (
          <div className="border-t pt-4">
            <p className="text-sm font-medium text-gray-900">{driverName}</p>
            {driverPhone && (
              <p className="text-sm text-gray-500">{driverPhone}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
