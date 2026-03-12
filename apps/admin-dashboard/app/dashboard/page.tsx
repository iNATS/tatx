'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { AnalyticsChart } from '@/components/dashboard/AnalyticsChart';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { RecentRidesTable } from '@/components/dashboard/RecentRidesTable';
import { RecentOrdersTable } from '@/components/dashboard/RecentOrdersTable';
import { MapVisualization } from '@/components/dashboard/MapVisualization';
import { NotificationPanel } from '@/components/dashboard/NotificationPanel';
import {
  Users,
  Car,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Activity,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@tatx/ui/components/card';
import { Button } from '@tatx/ui/components/button';
import { Badge } from '@tatx/ui/components/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@tatx/ui/components/tabs';

// Sample data for charts
const rideAnalyticsData = [
  { name: 'Mon', rides: 145, completed: 132 },
  { name: 'Tue', rides: 168, completed: 155 },
  { name: 'Wed', rides: 195, completed: 180 },
  { name: 'Thu', rides: 152, completed: 140 },
  { name: 'Fri', rides: 225, completed: 210 },
  { name: 'Sat', rides: 268, completed: 250 },
  { name: 'Sun', rides: 210, completed: 195 },
];

const orderAnalyticsData = [
  { name: 'Mon', orders: 89, delivered: 85 },
  { name: 'Tue', orders: 112, delivered: 108 },
  { name: 'Wed', orders: 145, delivered: 138 },
  { name: 'Thu', orders: 98, delivered: 92 },
  { name: 'Fri', orders: 178, delivered: 170 },
  { name: 'Sat', orders: 210, delivered: 200 },
  { name: 'Sun', orders: 165, delivered: 158 },
];

const serviceDistributionData = [
  { name: 'Rides', value: 45 },
  { name: 'Food', value: 30 },
  { name: 'Grocery', value: 15 },
  { name: 'Courier', value: 10 },
];

const hourlyActivityData = [
  { hour: '00:00', rides: 45, orders: 32 },
  { hour: '04:00', rides: 28, orders: 18 },
  { hour: '08:00', rides: 156, orders: 89 },
  { hour: '12:00', rides: 245, orders: 312 },
  { hour: '16:00', rides: 289, orders: 278 },
  { hour: '20:00', rides: 198, orders: 245 },
  { hour: '23:59', rides: 78, orders: 56 },
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Dashboard Overview</h1>
            <p className="text-gray-600 mt-1">
              Welcome to Tatx Admin - Monitor your platform performance
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-success-100 text-success-700">
              <Activity className="w-3 h-3 mr-1" />
              System Online
            </Badge>
            <Button variant="outline" size="sm">
              <Clock className="w-4 h-4 mr-2" />
              Last updated: Just now
            </Button>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Users"
            value="12,458"
            icon={<Users className="w-6 h-6 text-brand-600" />}
            trend={12.5}
            iconBgColor="bg-brand-100"
          />
          <StatsCard
            title="Active Drivers"
            value="1,234"
            icon={<Car className="w-6 h-6 text-success-600" />}
            trend={8.2}
            iconBgColor="bg-success-100"
          />
          <StatsCard
            title="Total Orders"
            value="8,567"
            icon={<ShoppingBag className="w-6 h-6 text-orange-600" />}
            trend={-2.4}
            iconBgColor="bg-orange-100"
          />
          <StatsCard
            title="Total Revenue"
            value="SAR 245K"
            icon={<DollarSign className="w-6 h-6 text-purple-600" />}
            trend={15.3}
            iconBgColor="bg-purple-100"
          />
        </div>

        {/* Additional Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Active Rides"
            value="156"
            icon={<MapPin className="w-6 h-6 text-blue-600" />}
            trend={5.1}
            iconBgColor="bg-blue-100"
          />
          <StatsCard
            title="Pending Orders"
            value="43"
            icon={<Clock className="w-6 h-6 text-warning-600" />}
            trend={-12.5}
            iconBgColor="bg-warning-100"
          />
          <StatsCard
            title="Completion Rate"
            value="94.2%"
            icon={<TrendingUp className="w-6 h-6 text-green-600" />}
            trend={2.1}
            iconBgColor="bg-green-100"
          />
          <StatsCard
            title="Avg. Response Time"
            value="4.2 min"
            icon={<Activity className="w-6 h-6 text-indigo-600" />}
            trend={-8.5}
            iconBgColor="bg-indigo-100"
          />
        </div>

        {/* Tabs for Overview and Notifications */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="notifications">
              Notifications
              <Badge className="ml-2 bg-error-500 text-white text-xs">3</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Revenue and Service Distribution */}
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <RevenueChart />
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Service Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <AnalyticsChart
                    data={serviceDistributionData}
                    type="pie"
                    xAxisKey="name"
                    dataKeys={[{ key: 'value', color: '#00bcd4' }]}
                    height={250}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Analytics Charts */}
            <div className="grid gap-6 lg:grid-cols-2">
              <AnalyticsChart
                title="Ride Analytics (Last 7 Days)"
                data={rideAnalyticsData}
                type="area"
                xAxisKey="name"
                dataKeys={[
                  { key: 'rides', color: '#00bcd4', name: 'Total Rides' },
                  { key: 'completed', color: '#22c55e', name: 'Completed' },
                ]}
                height={300}
              />
              <AnalyticsChart
                title="Order Analytics (Last 7 Days)"
                data={orderAnalyticsData}
                type="bar"
                xAxisKey="name"
                dataKeys={[
                  { key: 'orders', color: '#f59e0b', name: 'Total Orders' },
                  { key: 'delivered', color: '#22c55e', name: 'Delivered' },
                ]}
                height={300}
              />
            </div>

            {/* Hourly Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Hourly Activity Pattern</CardTitle>
              </CardHeader>
              <CardContent>
                <AnalyticsChart
                  data={hourlyActivityData}
                  type="line"
                  xAxisKey="hour"
                  dataKeys={[
                    { key: 'rides', color: '#00bcd4', name: 'Rides' },
                    { key: 'orders', color: '#f59e0b', name: 'Orders' },
                  ]}
                  height={250}
                />
              </CardContent>
            </Card>

            {/* Map and Recent Activity */}
            <div className="grid gap-6 lg:grid-cols-2">
              <MapVisualization height={400} />
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Recent Activity</CardTitle>
                    <Button variant="ghost" size="sm">View All</Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Recent Rides</h4>
                    <RecentRidesTable rides={defaultRides.slice(0, 3)} />
                  </div>
                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-medium mb-2">Recent Orders</h4>
                    <RecentOrdersTable orders={defaultOrders.slice(0, 3)} />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Full Tables */}
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>All Recent Rides</CardTitle>
                    <Button variant="outline" size="sm">View All Rides</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <RecentRidesTable />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>All Recent Orders</CardTitle>
                    <Button variant="outline" size="sm">View All Orders</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <RecentOrdersTable />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <NotificationPanel />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

// Sample data for tables
const defaultRides = [
  {
    id: 'RD-2024-001',
    customer: 'Ahmed Al-Saud',
    driver: 'Mohammed Hassan',
    pickup: 'King Fahd Road, Riyadh',
    dropoff: 'Riyadh Park Mall',
    status: 'IN_PROGRESS' as const,
    fare: 45.5,
    time: '5 min ago',
    vehicleType: 'Economy',
  },
  {
    id: 'RD-2024-002',
    customer: 'Fatima Al-Zahrani',
    driver: 'Khalid Ibrahim',
    pickup: 'Olaya District',
    dropoff: 'King Khalid Airport',
    status: 'COMPLETED' as const,
    fare: 120.0,
    time: '12 min ago',
    vehicleType: 'Premium',
  },
  {
    id: 'RD-2024-003',
    customer: 'Sarah Mohammed',
    driver: 'Waiting for driver',
    pickup: 'Al Malqa District',
    dropoff: 'Granada Mall',
    status: 'REQUESTED' as const,
    fare: 32.0,
    time: 'Just now',
    vehicleType: 'Economy',
  },
];

const defaultOrders = [
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
];
