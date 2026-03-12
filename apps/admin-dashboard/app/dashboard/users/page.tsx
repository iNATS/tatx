'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { UserTable } from '@/components/dashboard/UserTable';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@tatx/ui/components/card';
import { Button } from '@tatx/ui/components/button';
import { Badge } from '@tatx/ui/components/badge';
import { Users, UserPlus, UserCheck, UserX, Download, Filter, Shield, AlertCircle } from 'lucide-react';
import { AnalyticsChart } from '@/components/dashboard/AnalyticsChart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@tatx/ui/components/tabs';

const userGrowthData = [
  { name: 'Mon', customers: 120, drivers: 45, merchants: 12 },
  { name: 'Tue', customers: 145, drivers: 52, merchants: 15 },
  { name: 'Wed', customers: 168, drivers: 60, merchants: 18 },
  { name: 'Thu', customers: 152, drivers: 55, merchants: 16 },
  { name: 'Fri', customers: 195, drivers: 68, merchants: 22 },
  { name: 'Sat', customers: 220, drivers: 75, merchants: 25 },
  { name: 'Sun', customers: 185, drivers: 65, merchants: 20 },
];

const verificationStatusData = [
  { name: 'Verified', value: 87 },
  { name: 'Pending', value: 8 },
  { name: 'Rejected', value: 5 },
];

export default function UsersPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">User Management</h1>
            <p className="text-gray-600 mt-1">
              Manage customers, drivers, and merchants across the platform
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button>
              <UserPlus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Users"
            value="12,458"
            icon={<Users className="w-6 h-6 text-brand-600" />}
            trend={12.5}
            iconBgColor="bg-brand-100"
          />
          <StatsCard
            title="Customers"
            value="9,234"
            icon={<UserCheck className="w-6 h-6 text-blue-600" />}
            trend={15.2}
            iconBgColor="bg-blue-100"
          />
          <StatsCard
            title="Drivers"
            value="2,456"
            icon={<UserCheck className="w-6 h-6 text-green-600" />}
            trend={8.7}
            iconBgColor="bg-green-100"
          />
          <StatsCard
            title="Merchants"
            value="768"
            icon={<UserCheck className="w-6 h-6 text-orange-600" />}
            trend={5.3}
            iconBgColor="bg-orange-100"
          />
        </div>

        {/* Additional Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Verified Users"
            value="10,892"
            icon={<UserCheck className="w-6 h-6 text-success-600" />}
            trend={3.2}
            iconBgColor="bg-success-100"
          />
          <StatsCard
            title="Pending Verification"
            value="234"
            icon={<Shield className="w-6 h-6 text-warning-600" />}
            trend={-5.4}
            iconBgColor="bg-warning-100"
          />
          <StatsCard
            title="Blocked Users"
            value="156"
            icon={<UserX className="w-6 h-6 text-error-600" />}
            trend={-12.5}
            iconBgColor="bg-error-100"
          />
          <StatsCard
            title="Active Today"
            value="3,456"
            icon={<Users className="w-6 h-6 text-purple-600" />}
            trend={18.2}
            iconBgColor="bg-purple-100"
          />
        </div>

        {/* Tabs for different views */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Users</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="drivers">Drivers</TabsTrigger>
            <TabsTrigger value="merchants">Merchants</TabsTrigger>
            <TabsTrigger value="verification">Verification</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {/* User Growth Chart */}
            <Card>
              <CardHeader>
                <CardTitle>User Growth (Last 7 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                <AnalyticsChart
                  data={userGrowthData}
                  type="bar"
                  xAxisKey="name"
                  dataKeys={[
                    { key: 'customers', color: '#3b82f6', name: 'Customers' },
                    { key: 'drivers', color: '#22c55e', name: 'Drivers' },
                    { key: 'merchants', color: '#f97316', name: 'Merchants' },
                  ]}
                  height={300}
                />
              </CardContent>
            </Card>

            {/* User Table */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>All Users</CardTitle>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Advanced Filters
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <UserTable />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Customers</CardTitle>
              </CardHeader>
              <CardContent>
                <UserTable 
                  users={defaultUsers.filter(u => u.role === 'CUSTOMER')}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="drivers" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Active Drivers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-success-600">1,892</div>
                  <p className="text-sm text-gray-500 mt-1">Currently online</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Avg. Rating</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-warning-600">4.7</div>
                  <p className="text-sm text-gray-500 mt-1">Across all drivers</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Pending Approval</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-warning-600">45</div>
                  <p className="text-sm text-gray-500 mt-1">Awaiting verification</p>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Drivers</CardTitle>
              </CardHeader>
              <CardContent>
                <UserTable 
                  users={defaultUsers.filter(u => u.role === 'DRIVER')}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="merchants" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Merchants</CardTitle>
              </CardHeader>
              <CardContent>
                <UserTable 
                  users={defaultUsers.filter(u => u.role === 'MERCHANT')}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="verification" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Verification Status Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <AnalyticsChart
                    data={verificationStatusData}
                    type="pie"
                    xAxisKey="name"
                    dataKeys={[{ key: 'value', color: '#00bcd4' }]}
                    height={300}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Pending Verifications</CardTitle>
                    <Badge className="bg-warning-100 text-warning-700">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      234 pending
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingVerifications.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-brand-600" />
                          </div>
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-gray-500">{item.type} • {item.submittedDate}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">Review</Button>
                          <Button size="sm">Approve</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

const defaultUsers = [
  {
    id: 'USR-001',
    name: 'Ahmed Al-Saud',
    email: 'ahmed.saud@email.com',
    phone: '+966 50 123 4567',
    role: 'CUSTOMER' as const,
    status: 'ACTIVE' as const,
    joinedDate: '2024-01-15',
    totalRides: 45,
    totalOrders: 23,
    verified: true,
  },
  {
    id: 'DRV-001',
    name: 'Mohammed Hassan',
    email: 'mohammed.hassan@email.com',
    phone: '+966 55 987 6543',
    role: 'DRIVER' as const,
    status: 'ACTIVE' as const,
    joinedDate: '2024-02-01',
    totalRides: 312,
    rating: 4.8,
    verified: true,
  },
  {
    id: 'MER-001',
    name: 'Al Baik Restaurant',
    email: 'contact@albaik.sa',
    phone: '+966 11 234 5678',
    role: 'MERCHANT' as const,
    status: 'ACTIVE' as const,
    joinedDate: '2024-01-20',
    totalOrders: 1250,
    rating: 4.9,
    verified: true,
  },
  {
    id: 'USR-002',
    name: 'Fatima Al-Zahrani',
    email: 'fatima.z@email.com',
    phone: '+966 56 111 2222',
    role: 'CUSTOMER' as const,
    status: 'ACTIVE' as const,
    joinedDate: '2024-03-10',
    totalRides: 12,
    totalOrders: 8,
    verified: false,
  },
  {
    id: 'DRV-002',
    name: 'Khalid Ibrahim',
    email: 'khalid.ibrahim@email.com',
    phone: '+966 50 333 4444',
    role: 'DRIVER' as const,
    status: 'INACTIVE' as const,
    joinedDate: '2024-02-15',
    totalRides: 89,
    rating: 4.5,
    verified: true,
  },
];

const pendingVerifications = [
  {
    id: 'VER-001',
    name: 'Ahmed Mohammed',
    type: 'Driver Application',
    submittedDate: '2 hours ago',
  },
  {
    id: 'VER-002',
    name: 'Najdi Restaurant',
    type: 'Merchant Application',
    submittedDate: '5 hours ago',
  },
  {
    id: 'VER-003',
    name: 'Fahad Saleh',
    type: 'Driver Application',
    submittedDate: '1 day ago',
  },
];
