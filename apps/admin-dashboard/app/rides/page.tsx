'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { AnalyticsChart } from '@/components/dashboard/AnalyticsChart';
import { RecentRidesTable } from '@/components/dashboard/RecentRidesTable';
import { MapVisualization } from '@/components/dashboard/MapVisualization';
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
  Car,
  Search,
  Filter,
  Download,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  MapPin,
} from 'lucide-react';

const rideStatusData = [
  { name: 'Mon', requested: 45, inProgress: 32, completed: 132, cancelled: 8 },
  { name: 'Tue', requested: 52, inProgress: 38, completed: 155, cancelled: 12 },
  { name: 'Wed', requested: 60, inProgress: 45, completed: 180, cancelled: 15 },
  { name: 'Thu', requested: 48, inProgress: 35, completed: 140, cancelled: 10 },
  { name: 'Fri', requested: 72, inProgress: 55, completed: 210, cancelled: 18 },
  { name: 'Sat', requested: 85, inProgress: 62, completed: 250, cancelled: 22 },
  { name: 'Sun', requested: 68, inProgress: 50, completed: 195, cancelled: 16 },
];

const vehicleTypeData = [
  { name: 'Economy', value: 45 },
  { name: 'Comfort', value: 25 },
  { name: 'Premium', value: 15 },
  { name: 'Luxury', value: 10 },
  { name: 'Van', value: 5 },
];

const allRides = [
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
  {
    id: 'RD-2024-004',
    customer: 'Omar Farooq',
    driver: 'Abdullah Ahmed',
    pickup: 'Diplomatic Quarter',
    dropoff: 'King Saud University',
    status: 'COMPLETED' as const,
    fare: 28.5,
    time: '25 min ago',
    vehicleType: 'Comfort',
  },
  {
    id: 'RD-2024-005',
    customer: 'Nora Al-Rashid',
    driver: 'Cancelled',
    pickup: 'Al Nakheel',
    dropoff: 'Al Rawdah',
    status: 'CANCELLED' as const,
    fare: 0,
    time: '1 hour ago',
    vehicleType: 'Luxury',
  },
  {
    id: 'RD-2024-006',
    customer: 'Khalid Rahman',
    driver: 'Fahad Saleh',
    pickup: 'Al Aziziyah',
    dropoff: 'Riyadh Front',
    status: 'IN_PROGRESS' as const,
    fare: 38.0,
    time: '8 min ago',
    vehicleType: 'Economy',
  },
  {
    id: 'RD-2024-007',
    customer: 'Layla Ahmed',
    driver: 'Omar Khalid',
    pickup: 'Al Malqa',
    dropoff: 'Al Aqiq Park',
    status: 'REQUESTED' as const,
    fare: 42.5,
    time: '2 min ago',
    vehicleType: 'Comfort',
  },
  {
    id: 'RD-2024-008',
    customer: 'Fahad Al-Otaibi',
    driver: 'Hassan Ali',
    pickup: 'Al Rawdah',
    dropoff: 'Al Muruj',
    status: 'COMPLETED' as const,
    fare: 35.0,
    time: '35 min ago',
    vehicleType: 'Economy',
  },
];

export default function RidesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [vehicleFilter, setVehicleFilter] = useState<string>('all');

  const filteredRides = allRides.filter((ride) => {
    const matchesSearch =
      ride.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || ride.status === statusFilter;
    const matchesVehicle =
      vehicleFilter === 'all' || ride.vehicleType === vehicleFilter;
    return matchesSearch && matchesStatus && matchesVehicle;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Ride Management</h1>
            <p className="text-gray-600 mt-1">
              Monitor and manage all rides across the platform
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button>
              <Car className="w-4 h-4 mr-2" />
              Assign Ride
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Rides Today"
            value="1,234"
            icon={<Car className="w-6 h-6 text-brand-600" />}
            trend={12.5}
            iconBgColor="bg-brand-100"
          />
          <StatsCard
            title="Active Rides"
            value="156"
            icon={<MapPin className="w-6 h-6 text-blue-600" />}
            trend={8.2}
            iconBgColor="bg-blue-100"
          />
          <StatsCard
            title="Completed Today"
            value="1,045"
            icon={<CheckCircle className="w-6 h-6 text-success-600" />}
            trend={15.3}
            iconBgColor="bg-success-100"
          />
          <StatsCard
            title="Cancelled Today"
            value="33"
            icon={<XCircle className="w-6 h-6 text-error-600" />}
            trend={-5.2}
            iconBgColor="bg-error-100"
          />
        </div>

        {/* Additional Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Avg. Ride Duration"
            value="18 min"
            icon={<Clock className="w-6 h-6 text-purple-600" />}
            trend={-2.1}
            iconBgColor="bg-purple-100"
          />
          <StatsCard
            title="Avg. Fare"
            value="SAR 42"
            icon={<MapPin className="w-6 h-6 text-green-600" />}
            trend={5.8}
            iconBgColor="bg-green-100"
          />
          <StatsCard
            title="Pending Assignment"
            value="23"
            icon={<AlertCircle className="w-6 h-6 text-warning-600" />}
            trend={-12.5}
            iconBgColor="bg-warning-100"
          />
          <StatsCard
            title="Driver Utilization"
            value="78%"
            icon={<Car className="w-6 h-6 text-indigo-600" />}
            trend={3.2}
            iconBgColor="bg-indigo-100"
          />
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by ride ID or customer..."
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
                  <SelectItem value="REQUESTED">Requested</SelectItem>
                  <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={vehicleFilter} onValueChange={setVehicleFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by vehicle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Vehicles</SelectItem>
                  <SelectItem value="Economy">Economy</SelectItem>
                  <SelectItem value="Comfort">Comfort</SelectItem>
                  <SelectItem value="Premium">Premium</SelectItem>
                  <SelectItem value="Luxury">Luxury</SelectItem>
                  <SelectItem value="Van">Van</SelectItem>
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
              <CardTitle>Ride Status Trends (Last 7 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <AnalyticsChart
                data={rideStatusData}
                type="area"
                xAxisKey="name"
                dataKeys={[
                  { key: 'requested', color: '#f59e0b', name: 'Requested' },
                  { key: 'inProgress', color: '#3b82f6', name: 'In Progress' },
                  { key: 'completed', color: '#22c55e', name: 'Completed' },
                  { key: 'cancelled', color: '#ef4444', name: 'Cancelled' },
                ]}
                height={300}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Type Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <AnalyticsChart
                data={vehicleTypeData}
                type="pie"
                xAxisKey="name"
                dataKeys={[{ key: 'value', color: '#00bcd4' }]}
                height={300}
              />
            </CardContent>
          </Card>
        </div>

        {/* Map and Table */}
        <div className="grid gap-6 lg:grid-cols-2">
          <MapVisualization height={400} />
          <Card>
            <CardHeader>
              <CardTitle>Live Rides</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentRidesTable rides={filteredRides.slice(0, 5)} />
            </CardContent>
          </Card>
        </div>

        {/* Full Ride Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Rides</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentRidesTable rides={filteredRides} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
