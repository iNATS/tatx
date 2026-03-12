'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { AnalyticsChart } from '@/components/dashboard/AnalyticsChart';
import { RecentOrdersTable } from '@/components/dashboard/RecentOrdersTable';
import { Card, CardContent, CardHeader, CardTitle } from '@tatx/ui/components/card';
import { Button } from '@tatx/ui/components/button';
import { Badge } from '@tatx/ui/components/badge';
import { Input } from '@tatx/ui/components/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@tatx/ui/components/select';
import {
  ShoppingBag,
  Search,
  Filter,
  Download,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Utensils,
  Package,
  TrendingUp,
  DollarSign,
} from 'lucide-react';

const orderStatusData = [
  { name: 'Mon', pending: 25, preparing: 32, inTransit: 18, delivered: 85, cancelled: 5 },
  { name: 'Tue', pending: 32, preparing: 38, inTransit: 22, delivered: 108, cancelled: 8 },
  { name: 'Wed', pending: 38, preparing: 45, inTransit: 28, delivered: 138, cancelled: 12 },
  { name: 'Thu', pending: 28, preparing: 35, inTransit: 20, delivered: 92, cancelled: 6 },
  { name: 'Fri', pending: 45, preparing: 55, inTransit: 35, delivered: 170, cancelled: 15 },
  { name: 'Sat', pending: 52, preparing: 62, inTransit: 40, delivered: 200, cancelled: 18 },
  { name: 'Sun', pending: 42, preparing: 50, inTransit: 32, delivered: 158, cancelled: 12 },
];

const orderTypeData = [
  { name: 'Food', value: 55 },
  { name: 'Grocery', value: 25 },
  { name: 'Courier', value: 15 },
  { name: 'Pharmacy', value: 5 },
];

const allOrders = [
  {
    id: 'OD-2024-001',
    customer: 'Mohammed Al-Otaibi',
    restaurant: 'Al Baik',
    items: 4,
    status: 'IN_TRANSIT' as const,
    total: 65.0,
    time: '3 min ago',
    type: 'FOOD' as const,
    deliveryAddress: 'Al Aziziyah, Riyadh',
  },
  {
    id: 'OD-2024-002',
    customer: 'Aisha Ibrahim',
    restaurant: 'Panda Supermarket',
    items: 12,
    status: 'PREPARING' as const,
    total: 245.5,
    time: '8 min ago',
    type: 'GROCERY' as const,
    deliveryAddress: 'Al Malqa, Riyadh',
  },
  {
    id: 'OD-2024-003',
    customer: 'Khalid Rahman',
    restaurant: 'Hunger Station',
    items: 2,
    status: 'DELIVERED' as const,
    total: 89.0,
    time: '20 min ago',
    type: 'FOOD' as const,
    deliveryAddress: 'Olaya, Riyadh',
  },
  {
    id: 'OD-2024-004',
    customer: 'Layla Ahmed',
    restaurant: 'Najdi Cuisine',
    items: 6,
    status: 'CONFIRMED' as const,
    total: 156.0,
    time: '25 min ago',
    type: 'FOOD' as const,
    deliveryAddress: 'Diplomatic Quarter',
  },
  {
    id: 'OD-2024-005',
    customer: 'Fahad Al-Shehri',
    restaurant: 'Quick Package',
    items: 1,
    status: 'PICKED_UP' as const,
    total: 35.0,
    time: '30 min ago',
    type: 'COURIER' as const,
    deliveryAddress: 'King Fahd Road',
  },
  {
    id: 'OD-2024-006',
    customer: 'Nora Al-Rashid',
    restaurant: 'Bin Dawood',
    items: 8,
    status: 'DELIVERED' as const,
    total: 178.5,
    time: '45 min ago',
    type: 'GROCERY' as const,
    deliveryAddress: 'Al Nakheel',
  },
  {
    id: 'OD-2024-007',
    customer: 'Omar Khalid',
    restaurant: 'Shawerma House',
    items: 3,
    status: 'IN_TRANSIT' as const,
    total: 52.0,
    time: '15 min ago',
    type: 'FOOD' as const,
    deliveryAddress: 'Al Muruj',
  },
  {
    id: 'OD-2024-008',
    customer: 'Sarah Abdullah',
    restaurant: 'Pharmacy Plus',
    items: 2,
    status: 'PENDING' as const,
    total: 85.0,
    time: '5 min ago',
    type: 'FOOD' as const,
    deliveryAddress: 'Al Rawdah',
  },
];

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredOrders = allOrders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.restaurant.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || order.status === statusFilter;
    const matchesType = typeFilter === 'all' || order.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Order Management</h1>
            <p className="text-gray-600 mt-1">
              Track and manage food, grocery, and courier orders
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button>
              <ShoppingBag className="w-4 h-4 mr-2" />
              Create Order
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Orders Today"
            value="2,456"
            icon={<ShoppingBag className="w-6 h-6 text-brand-600" />}
            trend={18.5}
            iconBgColor="bg-brand-100"
          />
          <StatsCard
            title="Pending Orders"
            value="89"
            icon={<Clock className="w-6 h-6 text-warning-600" />}
            trend={-5.2}
            iconBgColor="bg-warning-100"
          />
          <StatsCard
            title="In Transit"
            value="156"
            icon={<Package className="w-6 h-6 text-blue-600" />}
            trend={12.3}
            iconBgColor="bg-blue-100"
          />
          <StatsCard
            title="Delivered Today"
            value="2,178"
            icon={<CheckCircle className="w-6 h-6 text-success-600" />}
            trend={22.1}
            iconBgColor="bg-success-100"
          />
        </div>

        {/* Additional Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Avg. Delivery Time"
            value="32 min"
            icon={<Clock className="w-6 h-6 text-purple-600" />}
            trend={-8.5}
            iconBgColor="bg-purple-100"
          />
          <StatsCard
            title="Avg. Order Value"
            value="SAR 78"
            icon={<DollarSign className="w-6 h-6 text-green-600" />}
            trend={5.2}
            iconBgColor="bg-green-100"
          />
          <StatsCard
            title="Cancelled Orders"
            value="33"
            icon={<XCircle className="w-6 h-6 text-error-600" />}
            trend={-15.3}
            iconBgColor="bg-error-100"
          />
          <StatsCard
            title="Refund Requests"
            value="12"
            icon={<AlertCircle className="w-6 h-6 text-orange-600" />}
            trend={-22.5}
            iconBgColor="bg-orange-100"
          />
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filter Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by order ID, customer, or restaurant..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                  <SelectItem value="PREPARING">Preparing</SelectItem>
                  <SelectItem value="READY_FOR_PICKUP">Ready</SelectItem>
                  <SelectItem value="PICKED_UP">Picked Up</SelectItem>
                  <SelectItem value="IN_TRANSIT">In Transit</SelectItem>
                  <SelectItem value="DELIVERED">Delivered</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="FOOD">Food</SelectItem>
                  <SelectItem value="GROCERY">Grocery</SelectItem>
                  <SelectItem value="COURIER">Courier</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Order Status Trends (Last 7 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <AnalyticsChart
                data={orderStatusData}
                type="area"
                xAxisKey="name"
                dataKeys={[
                  { key: 'pending', color: '#f59e0b', name: 'Pending' },
                  { key: 'preparing', color: '#3b82f6', name: 'Preparing' },
                  { key: 'inTransit', color: '#8b5cf6', name: 'In Transit' },
                  { key: 'delivered', color: '#22c55e', name: 'Delivered' },
                  { key: 'cancelled', color: '#ef4444', name: 'Cancelled' },
                ]}
                height={300}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Order Type Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <AnalyticsChart
                data={orderTypeData}
                type="pie"
                xAxisKey="name"
                dataKeys={[{ key: 'value', color: '#00bcd4' }]}
                height={300}
              />
            </CardContent>
          </Card>
        </div>

        {/* Order Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Orders</CardTitle>
              <Badge variant="outline">{filteredOrders.length} orders</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <RecentOrdersTable orders={filteredOrders} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
