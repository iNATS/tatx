'use client';

import React from 'react';
import { Badge } from '@tatx/ui/components/badge';
import { Button } from '@tatx/ui/components/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@tatx/ui/components/table';
import {
  ShoppingBag,
  MapPin,
  Clock,
  MoreHorizontal,
  Phone,
  Utensils,
  Package,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@tatx/ui/components/dropdown-menu';

interface Order {
  id: string;
  customer: string;
  restaurant: string;
  items: number;
  status:
    | 'PENDING'
    | 'CONFIRMED'
    | 'PREPARING'
    | 'READY_FOR_PICKUP'
    | 'PICKED_UP'
    | 'IN_TRANSIT'
    | 'DELIVERED'
    | 'CANCELLED';
  total: number;
  time: string;
  type: 'FOOD' | 'GROCERY' | 'COURIER';
  deliveryAddress: string;
}

interface RecentOrdersTableProps {
  orders?: Order[];
  className?: string;
}

const defaultOrders: Order[] = [
  {
    id: 'OD-2024-001',
    customer: 'Mohammed Al-Otaibi',
    restaurant: 'Al Baik',
    items: 4,
    status: 'IN_TRANSIT',
    total: 65.0,
    time: '3 min ago',
    type: 'FOOD',
    deliveryAddress: 'Al Aziziyah, Riyadh',
  },
  {
    id: 'OD-2024-002',
    customer: 'Aisha Ibrahim',
    restaurant: 'Panda Supermarket',
    items: 12,
    status: 'PREPARING',
    total: 245.5,
    time: '8 min ago',
    type: 'GROCERY',
    deliveryAddress: 'Al Malqa, Riyadh',
  },
  {
    id: 'OD-2024-003',
    customer: 'Khalid Rahman',
    restaurant: 'Hunger Station',
    items: 2,
    status: 'DELIVERED',
    total: 89.0,
    time: '20 min ago',
    type: 'FOOD',
    deliveryAddress: 'Olaya, Riyadh',
  },
  {
    id: 'OD-2024-004',
    customer: 'Layla Ahmed',
    restaurant: 'Najdi Cuisine',
    items: 6,
    status: 'CONFIRMED',
    total: 156.0,
    time: '25 min ago',
    type: 'FOOD',
    deliveryAddress: 'Diplomatic Quarter',
  },
  {
    id: 'OD-2024-005',
    customer: 'Fahad Al-Shehri',
    restaurant: 'Quick Package',
    items: 1,
    status: 'PICKED_UP',
    total: 35.0,
    time: '30 min ago',
    type: 'COURIER',
    deliveryAddress: 'King Fahd Road',
  },
];

const statusColors: Record<string, string> = {
  PENDING: 'bg-gray-100 text-gray-700',
  CONFIRMED: 'bg-brand-100 text-brand-700',
  PREPARING: 'bg-warning-100 text-warning-700',
  READY_FOR_PICKUP: 'bg-purple-100 text-purple-700',
  PICKED_UP: 'bg-indigo-100 text-indigo-700',
  IN_TRANSIT: 'bg-blue-100 text-blue-700',
  DELIVERED: 'bg-success-100 text-success-700',
  CANCELLED: 'bg-error-100 text-error-700',
};

const typeIcons: Record<string, React.ReactNode> = {
  FOOD: <Utensils className="w-4 h-4" />,
  GROCERY: <ShoppingBag className="w-4 h-4" />,
  COURIER: <Package className="w-4 h-4" />,
};

export function RecentOrdersTable({
  orders = defaultOrders,
  className,
}: RecentOrdersTableProps) {
  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Recent Orders</h3>
        <Button variant="ghost" size="sm">
          View All
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Restaurant/Store</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {typeIcons[order.type]}
                    <span>{order.restaurant}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{order.type}</Badge>
                </TableCell>
                <TableCell>
                  <Badge className={statusColors[order.status]}>
                    {order.status.replace('_', ' ')}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="font-medium">SAR {order.total.toFixed(2)}</span>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Phone className="w-4 h-4 mr-2" />
                        Contact
                      </DropdownMenuItem>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Track Order</DropdownMenuItem>
                      <DropdownMenuItem>Issue Refund</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
