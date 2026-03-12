import React from 'react';
import { Card, CardContent } from '@tatx/ui/components/card';
import { cn } from '@tatx/ui/src/utils/cn';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: number;
  trendLabel?: string;
  iconBgColor?: string;
  className?: string;
}

export function StatsCard({
  title,
  value,
  icon,
  trend,
  trendLabel = 'vs last month',
  iconBgColor = 'bg-brand-100',
  className,
}: StatsCardProps) {
  const isPositive = trend && trend > 0;
  const isNegative = trend && trend < 0;
  const isNeutral = trend === 0 || trend === undefined;

  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-3xl font-bold tracking-tight">{value}</p>
            {trend !== undefined && (
              <div className="flex items-center gap-1">
                {isPositive && (
                  <TrendingUp className="w-4 h-4 text-success-600" />
                )}
                {isNegative && (
                  <TrendingDown className="w-4 h-4 text-error-600" />
                )}
                {isNeutral && <Minus className="w-4 h-4 text-gray-400" />}
                <span
                  className={cn(
                    'text-sm font-medium',
                    isPositive && 'text-success-600',
                    isNegative && 'text-error-600',
                    isNeutral && 'text-gray-500'
                  )}
                >
                  {isPositive && '+'}
                  {trend}%
                </span>
                <span className="text-sm text-gray-500">{trendLabel}</span>
              </div>
            )}
          </div>
          {icon && (
            <div className={cn('p-3 rounded-full', iconBgColor)}>{icon}</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
