'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { AnalyticsChart } from '@/components/dashboard/AnalyticsChart';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { Card, CardContent, CardHeader, CardTitle } from '@tatx/ui/components/card';
import { Button } from '@tatx/ui/components/button';
import { Badge } from '@tatx/ui/components/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@tatx/ui/components/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@tatx/ui/components/tabs';
import {
  Download,
  TrendingUp,
  TrendingDown,
  Users,
  Car,
  ShoppingBag,
  DollarSign,
  Clock,
  Star,
  MapPin,
  BarChart3,
  Calendar,
} from 'lucide-react';

const timeRangeOptions = [
  { value: 'today', label: 'Today' },
  { value: '7d', label: 'Last 7 Days' },
  { value: '30d', label: 'Last 30 Days' },
  { value: '90d', label: 'Last 90 Days' },
  { value: 'ytd', label: 'Year to Date' },
];

const rideAnalyticsData = {
  '7d': [
    { name: 'Mon', rides: 1245, completed: 1180, cancelled: 65, revenue: 52500 },
    { name: 'Tue', rides: 1356, completed: 1290, cancelled: 66, revenue: 57200 },
    { name: 'Wed', rides: 1489, completed: 1420, cancelled: 69, revenue: 62800 },
    { name: 'Thu', rides: 1278, completed: 1210, cancelled: 68, revenue: 53900 },
    { name: 'Fri', rides: 1856, completed: 1760, cancelled: 96, revenue: 78200 },
    { name: 'Sat', rides: 2145, completed: 2040, cancelled: 105, revenue: 90400 },
    { name: 'Sun', rides: 1789, completed: 1700, cancelled: 89, revenue: 75400 },
  ],
  '30d': [
    { name: 'Week 1', rides: 8500, completed: 8100, cancelled: 400, revenue: 358000 },
    { name: 'Week 2', rides: 9200, completed: 8800, cancelled: 400, revenue: 387000 },
    { name: 'Week 3', rides: 8800, completed: 8400, cancelled: 400, revenue: 370000 },
    { name: 'Week 4', rides: 9500, completed: 9100, cancelled: 400, revenue: 400000 },
  ],
};

const orderAnalyticsData = {
  '7d': [
    { name: 'Mon', orders: 856, delivered: 820, cancelled: 36, revenue: 42500 },
    { name: 'Tue', orders: 945, delivered: 910, cancelled: 35, revenue: 47200 },
    { name: 'Wed', orders: 1089, delivered: 1050, cancelled: 39, revenue: 54800 },
    { name: 'Thu', orders: 878, delivered: 840, cancelled: 38, revenue: 43900 },
    { name: 'Fri', orders: 1356, delivered: 1300, cancelled: 56, revenue: 68200 },
    { name: 'Sat', orders: 1545, delivered: 1480, cancelled: 65, revenue: 78400 },
    { name: 'Sun', orders: 1289, delivered: 1240, cancelled: 49, revenue: 65400 },
  ],
  '30d': [
    { name: 'Week 1', orders: 6200, delivered: 5950, cancelled: 250, revenue: 310000 },
    { name: 'Week 2', orders: 6800, delivered: 6520, cancelled: 280, revenue: 340000 },
    { name: 'Week 3', orders: 6500, delivered: 6240, cancelled: 260, revenue: 325000 },
    { name: 'Week 4', orders: 7100, delivered: 6820, cancelled: 280, revenue: 355000 },
  ],
};

const driverPerformanceData = [
  { name: 'Mohammed H.', rides: 156, earnings: 6240, rating: 4.9, hours: 42 },
  { name: 'Khalid I.', rides: 142, earnings: 5680, rating: 4.8, hours: 38 },
  { name: 'Ahmed A.', rides: 138, earnings: 5520, rating: 4.7, hours: 40 },
  { name: 'Fahad S.', rides: 125, earnings: 5000, rating: 4.8, hours: 35 },
  { name: 'Omar K.', rides: 118, earnings: 4720, rating: 4.6, hours: 36 },
];

const topRestaurantsData = [
  { name: 'Al Baik', orders: 1250, revenue: 62500, rating: 4.8 },
  { name: 'Najdi Village', orders: 890, revenue: 53400, rating: 4.9 },
  { name: 'Panda', orders: 2100, revenue: 84000, rating: 4.6 },
  { name: 'Bin Dawood', orders: 1890, revenue: 75600, rating: 4.7 },
  { name: 'Shawerma House', orders: 567, revenue: 22680, rating: 4.5 },
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

const districtPerformanceData = [
  { name: 'Olaya', rides: 456, orders: 389, revenue: 28500 },
  { name: 'Al Malqa', rides: 389, orders: 312, revenue: 24200 },
  { name: 'Diplomatic Quarter', rides: 312, orders: 245, revenue: 22800 },
  { name: 'Al Aziziyah', rides: 278, orders: 289, revenue: 19500 },
  { name: 'King Fahd Road', rides: 356, orders: 334, revenue: 25600 },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d');
  const [serviceType, setServiceType] = useState('all');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Analytics & Reports</h1>
            <p className="text-gray-600 mt-1">
              Advanced analytics and insights for your platform
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timeRangeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Revenue"
            value="SAR 478.5K"
            icon={<DollarSign className="w-6 h-6 text-brand-600" />}
            trend={15.3}
            iconBgColor="bg-brand-100"
          />
          <StatsCard
            title="Total Rides"
            value="12,458"
            icon={<Car className="w-6 h-6 text-blue-600" />}
            trend={12.5}
            iconBgColor="bg-blue-100"
          />
          <StatsCard
            title="Total Orders"
            value="8,567"
            icon={<ShoppingBag className="w-6 h-6 text-orange-600" />}
            trend={18.2}
            iconBgColor="bg-orange-100"
          />
          <StatsCard
            title="Active Users"
            value="3,456"
            icon={<Users className="w-6 h-6 text-green-600" />}
            trend={8.7}
            iconBgColor="bg-green-100"
          />
        </div>

        {/* Performance Metrics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Avg. Response Time"
            value="4.2 min"
            icon={<Clock className="w-6 h-6 text-purple-600" />}
            trend={-8.5}
            iconBgColor="bg-purple-100"
          />
          <StatsCard
            title="Completion Rate"
            value="94.2%"
            icon={<TrendingUp className="w-6 h-6 text-success-600" />}
            trend={2.1}
            iconBgColor="bg-success-100"
          />
          <StatsCard
            title="Customer Satisfaction"
            value="4.6"
            icon={<Star className="w-6 h-6 text-yellow-600" />}
            trend={1.5}
            iconBgColor="bg-yellow-100"
          />
          <StatsCard
            title="Service Areas"
            value="24"
            icon={<MapPin className="w-6 h-6 text-indigo-600" />}
            trend={4.2}
            iconBgColor="bg-indigo-100"
          />
        </div>

        {/* Tabs for different analytics views */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="rides">
              <Car className="w-4 h-4 mr-2" />
              Rides
            </TabsTrigger>
            <TabsTrigger value="orders">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="drivers">
              <Users className="w-4 h-4 mr-2" />
              Drivers
            </TabsTrigger>
            <TabsTrigger value="restaurants">
              <Star className="w-4 h-4 mr-2" />
              Restaurants
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Revenue Chart */}
            <RevenueChart />

            {/* Charts Grid */}
            <div className="grid gap-6 lg:grid-cols-2">
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
                    height={300}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>District Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <AnalyticsChart
                    data={districtPerformanceData}
                    type="bar"
                    xAxisKey="name"
                    dataKeys={[
                      { key: 'rides', color: '#3b82f6', name: 'Rides' },
                      { key: 'orders', color: '#f59e0b', name: 'Orders' },
                    ]}
                    height={300}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="rides" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Ride Analytics</CardTitle>
                  <Select value={serviceType} onValueChange={setServiceType}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Vehicle Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Vehicles</SelectItem>
                      <SelectItem value="economy">Economy</SelectItem>
                      <SelectItem value="comfort">Comfort</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="luxury">Luxury</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <AnalyticsChart
                  data={rideAnalyticsData[timeRange as keyof typeof rideAnalyticsData] || rideAnalyticsData['7d']}
                  type="area"
                  xAxisKey="name"
                  dataKeys={[
                    { key: 'rides', color: '#00bcd4', name: 'Total Rides' },
                    { key: 'completed', color: '#22c55e', name: 'Completed' },
                    { key: 'cancelled', color: '#ef4444', name: 'Cancelled' },
                  ]}
                  height={400}
                />
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Ride Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-brand-600">
                    SAR 285.4K
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-success-600" />
                    <span className="text-success-600">+12.5%</span>
                    <span className="text-gray-500">vs last period</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Avg. Fare</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">SAR 42</div>
                  <div className="flex items-center gap-2 mt-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-success-600" />
                    <span className="text-success-600">+5.8%</span>
                    <span className="text-gray-500">vs last period</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Avg. Duration</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600">18 min</div>
                  <div className="flex items-center gap-2 mt-2 text-sm">
                    <TrendingDown className="w-4 h-4 text-success-600" />
                    <span className="text-success-600">-2.1%</span>
                    <span className="text-gray-500">vs last period</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <AnalyticsChart
                  data={orderAnalyticsData[timeRange as keyof typeof orderAnalyticsData] || orderAnalyticsData['7d']}
                  type="area"
                  xAxisKey="name"
                  dataKeys={[
                    { key: 'orders', color: '#f59e0b', name: 'Total Orders' },
                    { key: 'delivered', color: '#22c55e', name: 'Delivered' },
                    { key: 'cancelled', color: '#ef4444', name: 'Cancelled' },
                  ]}
                  height={400}
                />
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Order Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-600">
                    SAR 193.1K
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-success-600" />
                    <span className="text-success-600">+18.2%</span>
                    <span className="text-gray-500">vs last period</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Avg. Order Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">SAR 78</div>
                  <div className="flex items-center gap-2 mt-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-success-600" />
                    <span className="text-success-600">+5.2%</span>
                    <span className="text-gray-500">vs last period</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Avg. Delivery Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-indigo-600">32 min</div>
                  <div className="flex items-center gap-2 mt-2 text-sm">
                    <TrendingDown className="w-4 h-4 text-success-600" />
                    <span className="text-success-600">-8.5%</span>
                    <span className="text-gray-500">vs last period</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="drivers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Drivers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="text-left p-4 font-medium">Driver</th>
                        <th className="text-left p-4 font-medium">Rides</th>
                        <th className="text-left p-4 font-medium">Earnings</th>
                        <th className="text-left p-4 font-medium">Hours</th>
                        <th className="text-left p-4 font-medium">Rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      {driverPerformanceData.map((driver, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-4 font-medium">{driver.name}</td>
                          <td className="p-4">{driver.rides}</td>
                          <td className="p-4">SAR {driver.earnings.toLocaleString()}</td>
                          <td className="p-4">{driver.hours}h</td>
                          <td className="p-4">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-warning-500 text-warning-500" />
                              {driver.rating}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="restaurants" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Restaurants</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="text-left p-4 font-medium">Restaurant</th>
                        <th className="text-left p-4 font-medium">Orders</th>
                        <th className="text-left p-4 font-medium">Revenue</th>
                        <th className="text-left p-4 font-medium">Rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topRestaurantsData.map((restaurant, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-4 font-medium">{restaurant.name}</td>
                          <td className="p-4">{restaurant.orders.toLocaleString()}</td>
                          <td className="p-4">SAR {restaurant.revenue.toLocaleString()}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-warning-500 text-warning-500" />
                              {restaurant.rating}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
