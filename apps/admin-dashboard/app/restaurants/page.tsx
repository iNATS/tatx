'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { AnalyticsChart } from '@/components/dashboard/AnalyticsChart';
import { RestaurantCard } from '@/components/dashboard/RestaurantCard';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@tatx/ui/components/tabs';
import {
  Store,
  Search,
  Filter,
  Download,
  CheckCircle,
  Clock,
  XCircle,
  TrendingUp,
  DollarSign,
  Star,
} from 'lucide-react';

const restaurantPerformanceData = [
  { name: 'Mon', orders: 245, revenue: 12500, avgRating: 4.5 },
  { name: 'Tue', orders: 289, revenue: 15200, avgRating: 4.6 },
  { name: 'Wed', orders: 356, revenue: 18900, avgRating: 4.5 },
  { name: 'Thu', orders: 278, revenue: 14300, avgRating: 4.4 },
  { name: 'Fri', orders: 425, revenue: 22100, avgRating: 4.7 },
  { name: 'Sat', orders: 498, revenue: 25600, avgRating: 4.6 },
  { name: 'Sun', orders: 389, revenue: 20800, avgRating: 4.5 },
];

const cuisineDistributionData = [
  { name: 'Arabic', value: 35 },
  { name: 'Fast Food', value: 25 },
  { name: 'Italian', value: 15 },
  { name: 'Asian', value: 12 },
  { name: 'Desserts', value: 8 },
  { name: 'Other', value: 5 },
];

const allRestaurants = [
  {
    id: 'RES-001',
    name: 'Al Baik',
    nameAr: 'البايك',
    merchantName: 'Al Baik Co.',
    email: 'contact@albaik.sa',
    phone: '+966 11 234 5678',
    address: 'King Fahd Road, Riyadh',
    city: 'Riyadh',
    cuisine: ['Fast Food', 'Chicken', 'Arabic'],
    rating: 4.8,
    totalOrders: 1250,
    status: 'PENDING' as const,
    submittedDate: '2024-03-10',
    commissionRate: 15,
    deliveryRadius: 5,
    minOrderAmount: 25,
    documents: [
      { type: 'Commercial Registration', status: 'APPROVED' as const },
      { type: 'Food License', status: 'APPROVED' as const },
      { type: 'Health Certificate', status: 'PENDING' as const },
      { type: 'Tax Registration', status: 'APPROVED' as const },
    ],
    isOpenNow: true,
    estimatedDeliveryTime: 30,
  },
  {
    id: 'RES-002',
    name: 'Najdi Village',
    nameAr: 'قرية نجد',
    merchantName: 'Najdi Hospitality',
    email: 'info@najdivillage.sa',
    phone: '+966 11 345 6789',
    address: 'Olaya District, Riyadh',
    city: 'Riyadh',
    cuisine: ['Arabic', 'Traditional', 'Saudi'],
    rating: 4.9,
    totalOrders: 890,
    status: 'PENDING' as const,
    submittedDate: '2024-03-08',
    commissionRate: 18,
    deliveryRadius: 8,
    minOrderAmount: 50,
    documents: [
      { type: 'Commercial Registration', status: 'APPROVED' as const },
      { type: 'Food License', status: 'APPROVED' as const },
      { type: 'Health Certificate', status: 'APPROVED' as const },
      { type: 'Tax Registration', status: 'APPROVED' as const },
    ],
    isOpenNow: true,
    estimatedDeliveryTime: 45,
  },
  {
    id: 'RES-003',
    name: 'Panda Supermarket',
    nameAr: 'بنده',
    merchantName: 'Panda Retail Co.',
    email: 'support@panda.sa',
    phone: '+966 11 456 7890',
    address: 'Multiple Locations',
    city: 'Riyadh',
    cuisine: ['Grocery', 'Supermarket'],
    rating: 4.6,
    totalOrders: 2100,
    status: 'APPROVED' as const,
    submittedDate: '2024-02-15',
    commissionRate: 12,
    deliveryRadius: 10,
    minOrderAmount: 35,
    documents: [
      { type: 'Commercial Registration', status: 'APPROVED' as const },
      { type: 'Food License', status: 'APPROVED' as const },
      { type: 'Health Certificate', status: 'APPROVED' as const },
      { type: 'Tax Registration', status: 'APPROVED' as const },
    ],
    isOpenNow: true,
    estimatedDeliveryTime: 40,
  },
  {
    id: 'RES-004',
    name: 'Shawerma House',
    nameAr: 'بيت الشاورما',
    merchantName: 'SH Restaurants',
    email: 'hello@shawermahouse.sa',
    phone: '+966 50 123 4567',
    address: 'Al Malqa, Riyadh',
    city: 'Riyadh',
    cuisine: ['Arabic', 'Fast Food', 'Lebanese'],
    rating: 4.5,
    totalOrders: 567,
    status: 'PENDING' as const,
    submittedDate: '2024-03-11',
    commissionRate: 15,
    deliveryRadius: 6,
    minOrderAmount: 20,
    documents: [
      { type: 'Commercial Registration', status: 'PENDING' as const },
      { type: 'Food License', status: 'APPROVED' as const },
      { type: 'Health Certificate', status: 'PENDING' as const },
      { type: 'Tax Registration', status: 'PENDING' as const },
    ],
    isOpenNow: false,
    estimatedDeliveryTime: 35,
  },
  {
    id: 'RES-005',
    name: 'Bin Dawood',
    nameAr: 'بن داود',
    merchantName: 'Bin Dawood Co.',
    email: 'contact@bindawood.sa',
    phone: '+966 11 567 8901',
    address: 'Multiple Locations',
    city: 'Riyadh',
    cuisine: ['Grocery', 'Supermarket', 'Bakery'],
    rating: 4.7,
    totalOrders: 1890,
    status: 'APPROVED' as const,
    submittedDate: '2024-01-20',
    commissionRate: 10,
    deliveryRadius: 12,
    minOrderAmount: 40,
    documents: [
      { type: 'Commercial Registration', status: 'APPROVED' as const },
      { type: 'Food License', status: 'APPROVED' as const },
      { type: 'Health Certificate', status: 'APPROVED' as const },
      { type: 'Tax Registration', status: 'APPROVED' as const },
    ],
    isOpenNow: true,
    estimatedDeliveryTime: 35,
  },
  {
    id: 'RES-006',
    name: 'Pizza Hut',
    nameAr: 'بيتزا هت',
    merchantName: 'Pizza Hut KSA',
    email: 'support@pizzahut.sa',
    phone: '+966 800 123 4567',
    address: 'Multiple Locations',
    city: 'Riyadh',
    cuisine: ['Italian', 'Pizza', 'Fast Food'],
    rating: 4.4,
    totalOrders: 1456,
    status: 'REJECTED' as const,
    submittedDate: '2024-03-01',
    commissionRate: 20,
    deliveryRadius: 8,
    minOrderAmount: 30,
    documents: [
      { type: 'Commercial Registration', status: 'APPROVED' as const },
      { type: 'Food License', status: 'REJECTED' as const },
      { type: 'Health Certificate', status: 'APPROVED' as const },
      { type: 'Tax Registration', status: 'APPROVED' as const },
    ],
    isOpenNow: true,
    estimatedDeliveryTime: 40,
  },
];

export default function RestaurantsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [cityFilter, setCityFilter] = useState<string>('all');

  const filteredRestaurants = allRestaurants.filter((restaurant) => {
    const matchesSearch =
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.merchantName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || restaurant.status === statusFilter;
    const matchesCity =
      cityFilter === 'all' || restaurant.city === cityFilter;
    return matchesSearch && matchesStatus && matchesCity;
  });

  const pendingCount = allRestaurants.filter((r) => r.status === 'PENDING').length;
  const approvedCount = allRestaurants.filter((r) => r.status === 'APPROVED').length;
  const rejectedCount = allRestaurants.filter((r) => r.status === 'REJECTED').length;

  const handleApprove = (id: string) => {
    console.log('Approving restaurant:', id);
    // In a real app, this would call an API
  };

  const handleReject = (id: string) => {
    console.log('Rejecting restaurant:', id);
    // In a real app, this would call an API
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Restaurant Management</h1>
            <p className="text-gray-600 mt-1">
              Approve and manage restaurants and merchants on the platform
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button>
              <Store className="w-4 h-4 mr-2" />
              Add Restaurant
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Restaurants"
            value="768"
            icon={<Store className="w-6 h-6 text-brand-600" />}
            trend={12.5}
            iconBgColor="bg-brand-100"
          />
          <StatsCard
            title="Pending Approval"
            value={pendingCount.toString()}
            icon={<Clock className="w-6 h-6 text-warning-600" />}
            trend={5.2}
            iconBgColor="bg-warning-100"
          />
          <StatsCard
            title="Active Restaurants"
            value={approvedCount.toString()}
            icon={<CheckCircle className="w-6 h-6 text-success-600" />}
            trend={8.7}
            iconBgColor="bg-success-100"
          />
          <StatsCard
            title="Rejected"
            value={rejectedCount.toString()}
            icon={<XCircle className="w-6 h-6 text-error-600" />}
            trend={-15.3}
            iconBgColor="bg-error-100"
          />
        </div>

        {/* Additional Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Orders (Today)"
            value="3,456"
            icon={<TrendingUp className="w-6 h-6 text-blue-600" />}
            trend={18.2}
            iconBgColor="bg-blue-100"
          />
          <StatsCard
            title="Total Revenue (Today)"
            value="SAR 89K"
            icon={<DollarSign className="w-6 h-6 text-green-600" />}
            trend={22.5}
            iconBgColor="bg-green-100"
          />
          <StatsCard
            title="Avg. Rating"
            value="4.6"
            icon={<Star className="w-6 h-6 text-yellow-600" />}
            trend={2.1}
            iconBgColor="bg-yellow-100"
          />
          <StatsCard
            title="Commission Earned"
            value="SAR 13.4K"
            icon={<DollarSign className="w-6 h-6 text-purple-600" />}
            trend={15.8}
            iconBgColor="bg-purple-100"
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="pending">
              Pending Approval ({pendingCount})
            </TabsTrigger>
            <TabsTrigger value="active">Active ({approvedCount})</TabsTrigger>
            <TabsTrigger value="all">All Restaurants</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              {filteredRestaurants
                .filter((r) => r.status === 'PENDING')
                .map((restaurant) => (
                  <RestaurantCard
                    key={restaurant.id}
                    restaurant={restaurant}
                    onApprove={handleApprove}
                    onReject={handleReject}
                  />
                ))}
            </div>
            {filteredRestaurants.filter((r) => r.status === 'PENDING').length === 0 && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <CheckCircle className="w-12 h-12 text-success-600 mb-4" />
                  <h3 className="text-lg font-medium">All Caught Up!</h3>
                  <p className="text-gray-600">
                    No pending restaurant approvals at the moment.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              {filteredRestaurants
                .filter((r) => r.status === 'APPROVED')
                .map((restaurant) => (
                  <RestaurantCard
                    key={restaurant.id}
                    restaurant={restaurant}
                    onApprove={handleApprove}
                    onReject={handleReject}
                  />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              {filteredRestaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  onApprove={handleApprove}
                  onReject={handleReject}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filter Restaurants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by name or merchant..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="APPROVED">Approved</SelectItem>
                  <SelectItem value="REJECTED">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select value={cityFilter} onValueChange={setCityFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  <SelectItem value="Riyadh">Riyadh</SelectItem>
                  <SelectItem value="Jeddah">Jeddah</SelectItem>
                  <SelectItem value="Dammam">Dammam</SelectItem>
                  <SelectItem value="Makkah">Makkah</SelectItem>
                  <SelectItem value="Madinah">Madinah</SelectItem>
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
              <CardTitle>Restaurant Performance (Last 7 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <AnalyticsChart
                data={restaurantPerformanceData}
                type="bar"
                xAxisKey="name"
                dataKeys={[
                  { key: 'orders', color: '#00bcd4', name: 'Orders' },
                  { key: 'revenue', color: '#22c55e', name: 'Revenue (SAR)' },
                ]}
                height={300}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Cuisine Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <AnalyticsChart
                data={cuisineDistributionData}
                type="pie"
                xAxisKey="name"
                dataKeys={[{ key: 'value', color: '#00bcd4' }]}
                height={300}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
