'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { UserTable } from '@/components/dashboard/UserTable';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@tatx/ui/components/card';
import { Button } from '@tatx/ui/components/button';
import { Badge } from '@tatx/ui/components/badge';
import { Users, UserPlus, UserCheck, UserX, Download, Filter } from 'lucide-react';
import { AnalyticsChart } from '@/components/dashboard/AnalyticsChart';

const userGrowthData = [
  { name: 'Mon', customers: 120, drivers: 45, merchants: 12 },
  { name: 'Tue', customers: 145, drivers: 52, merchants: 15 },
  { name: 'Wed', customers: 168, drivers: 60, merchants: 18 },
  { name: 'Thu', customers: 152, drivers: 55, merchants: 16 },
  { name: 'Fri', customers: 195, drivers: 68, merchants: 22 },
  { name: 'Sat', customers: 220, drivers: 75, merchants: 25 },
  { name: 'Sun', customers: 185, drivers: 65, merchants: 20 },
];

export default function UsersPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
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
            icon={<UserCheck className="w-6 h-6 text-warning-600" />}
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
      </div>
    </DashboardLayout>
  );
}
