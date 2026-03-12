'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@tatx/ui/components/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@tatx/ui/components/tabs';

interface RevenueData {
  date: string;
  revenue: number;
  commission: number;
  driverEarnings: number;
}

interface RevenueChartProps {
  data?: RevenueData[];
  className?: string;
}

const defaultData: RevenueData[] = [
  { date: 'Mon', revenue: 12500, commission: 1875, driverEarnings: 10625 },
  { date: 'Tue', revenue: 15200, commission: 2280, driverEarnings: 12920 },
  { date: 'Wed', revenue: 18900, commission: 2835, driverEarnings: 16065 },
  { date: 'Thu', revenue: 14300, commission: 2145, driverEarnings: 12155 },
  { date: 'Fri', revenue: 22100, commission: 3315, driverEarnings: 18785 },
  { date: 'Sat', revenue: 25600, commission: 3840, driverEarnings: 21760 },
  { date: 'Sun', revenue: 20800, commission: 3120, driverEarnings: 17680 },
];

export function RevenueChart({ data = defaultData, className }: RevenueChartProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Revenue Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="commission">Commission</TabsTrigger>
            <TabsTrigger value="driver">Driver Earnings</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                <YAxis
                  stroke="#9ca3af"
                  fontSize={12}
                  tickFormatter={(value) => `SAR ${value.toLocaleString()}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => `SAR ${value.toLocaleString()}`}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#00bcd4"
                  fill="#00bcd4"
                  fillOpacity={0.1}
                  name="Total Revenue"
                  stackId="1"
                />
                <Area
                  type="monotone"
                  dataKey="commission"
                  stroke="#22c55e"
                  fill="#22c55e"
                  fillOpacity={0.1}
                  name="Commission"
                  stackId="2"
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="commission" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                <YAxis
                  stroke="#9ca3af"
                  fontSize={12}
                  tickFormatter={(value) => `SAR ${value.toLocaleString()}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => `SAR ${value.toLocaleString()}`}
                />
                <Area
                  type="monotone"
                  dataKey="commission"
                  stroke="#22c55e"
                  fill="#22c55e"
                  fillOpacity={0.2}
                  name="Commission (15%)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="driver" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                <YAxis
                  stroke="#9ca3af"
                  fontSize={12}
                  tickFormatter={(value) => `SAR ${value.toLocaleString()}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => `SAR ${value.toLocaleString()}`}
                />
                <Area
                  type="monotone"
                  dataKey="driverEarnings"
                  stroke="#f59e0b"
                  fill="#f59e0b"
                  fillOpacity={0.2}
                  name="Driver Earnings"
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
