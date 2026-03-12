'use client';

import React from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@tatx/ui/components/card';

type ChartType = 'line' | 'area' | 'bar' | 'pie';

interface AnalyticsChartProps {
  title?: string;
  data: any[];
  type?: ChartType;
  xAxisKey?: string;
  dataKeys?: { key: string; color: string; name?: string }[];
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  className?: string;
}

const COLORS = ['#00bcd4', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export function AnalyticsChart({
  title,
  data,
  type = 'line',
  xAxisKey = 'name',
  dataKeys = [{ key: 'value', color: '#00bcd4' }],
  height = 300,
  showGrid = true,
  showLegend = true,
  className,
}: AnalyticsChartProps) {
  const renderChart = () => {
    switch (type) {
      case 'area':
        return (
          <AreaChart data={data}>
            {showGrid && (
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            )}
            <XAxis dataKey={xAxisKey} stroke="#9ca3af" fontSize={12} />
            <YAxis stroke="#9ca3af" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            {showLegend && <Legend />}
            {dataKeys.map((key, index) => (
              <Area
                key={key.key}
                type="monotone"
                dataKey={key.key}
                stroke={key.color}
                fill={key.color}
                fillOpacity={0.1}
                name={key.name || key.key}
              />
            ))}
          </AreaChart>
        );

      case 'bar':
        return (
          <BarChart data={data}>
            {showGrid && (
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            )}
            <XAxis dataKey={xAxisKey} stroke="#9ca3af" fontSize={12} />
            <YAxis stroke="#9ca3af" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            {showLegend && <Legend />}
            {dataKeys.map((key) => (
              <Bar
                key={key.key}
                dataKey={key.key}
                fill={key.color}
                name={key.name || key.key}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        );

      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={height / 2 - 20}
              fill="#8884d8"
              dataKey={dataKeys[0]?.key || 'value'}
              nameKey={xAxisKey}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            {showLegend && <Legend />}
          </PieChart>
        );

      case 'line':
      default:
        return (
          <LineChart data={data}>
            {showGrid && (
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            )}
            <XAxis dataKey={xAxisKey} stroke="#9ca3af" fontSize={12} />
            <YAxis stroke="#9ca3af" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            {showLegend && <Legend />}
            {dataKeys.map((key) => (
              <Line
                key={key.key}
                type="monotone"
                dataKey={key.key}
                stroke={key.color}
                strokeWidth={2}
                dot={{ fill: key.color, strokeWidth: 2 }}
                name={key.name || key.key}
              />
            ))}
          </LineChart>
        );
    }
  };

  return (
    <Card className={className}>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          {renderChart()}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
