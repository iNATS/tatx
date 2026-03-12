'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@tatx/ui/components/card';
import { Button } from '@tatx/ui/components/button';
import { Badge } from '@tatx/ui/components/badge';
import { ScrollArea } from '@tatx/ui/components/scroll-area';
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  AlertCircle,
  Info,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Store,
  Car,
  DollarSign,
  Settings,
} from 'lucide-react';
import { cn } from '@tatx/ui/src/utils/cn';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionRequired?: boolean;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

interface NotificationPanelProps {
  notifications?: Notification[];
  className?: string;
}

const defaultNotifications: Notification[] = [
  {
    id: 'NOTIF-001',
    type: 'warning',
    title: 'New Driver Application',
    message: 'Ahmed Mohammed has applied for driver verification. Documents pending review.',
    timestamp: '5 min ago',
    read: false,
    actionRequired: true,
    actionLabel: 'Review',
    icon: <User className="w-5 h-5" />,
  },
  {
    id: 'NOTIF-002',
    type: 'info',
    title: 'Restaurant Approval Pending',
    message: 'Al Baik Restaurant submitted all required documents for verification.',
    timestamp: '15 min ago',
    read: false,
    actionRequired: true,
    actionLabel: 'Review',
    icon: <Store className="w-5 h-5" />,
  },
  {
    id: 'NOTIF-003',
    type: 'error',
    title: 'Payment Dispute',
    message: 'Customer disputed ride payment #RD-2024-001. Amount: SAR 45.50',
    timestamp: '1 hour ago',
    read: false,
    actionRequired: true,
    actionLabel: 'Resolve',
    icon: <DollarSign className="w-5 h-5" />,
  },
  {
    id: 'NOTIF-004',
    type: 'success',
    title: 'Daily Target Achieved',
    message: 'Congratulations! Today\'s ride target of 1000 rides has been achieved.',
    timestamp: '2 hours ago',
    read: true,
    icon: <CheckCircle className="w-5 h-5" />,
  },
  {
    id: 'NOTIF-005',
    type: 'system',
    title: 'System Maintenance',
    message: 'Scheduled maintenance tonight from 2:00 AM to 4:00 AM AST.',
    timestamp: '3 hours ago',
    read: true,
    icon: <Settings className="w-5 h-5" />,
  },
  {
    id: 'NOTIF-006',
    type: 'warning',
    title: 'Low Driver Availability',
    message: 'Driver availability is low in Olaya district. Consider surge pricing.',
    timestamp: '4 hours ago',
    read: false,
    actionRequired: true,
    actionLabel: 'View Map',
    icon: <Car className="w-5 h-5" />,
  },
  {
    id: 'NOTIF-007',
    type: 'info',
    title: 'New Feature Available',
    message: 'Scheduled rides feature is now available. Enable it in settings.',
    timestamp: '1 day ago',
    read: true,
    icon: <Info className="w-5 h-5" />,
  },
  {
    id: 'NOTIF-008',
    type: 'error',
    title: 'Payment Gateway Issue',
    message: 'Temporary issue with MADA payments. Engineering team is investigating.',
    timestamp: '1 day ago',
    read: true,
    actionRequired: false,
    icon: <XCircle className="w-5 h-5" />,
  },
];

const typeColors: Record<string, string> = {
  info: 'bg-blue-50 border-blue-200',
  success: 'bg-success-50 border-success-200',
  warning: 'bg-warning-50 border-warning-200',
  error: 'bg-error-50 border-error-200',
  system: 'bg-purple-50 border-purple-200',
};

const typeIconColors: Record<string, string> = {
  info: 'text-blue-600 bg-blue-100',
  success: 'text-success-600 bg-success-100',
  warning: 'text-warning-600 bg-warning-100',
  error: 'text-error-600 bg-error-100',
  system: 'text-purple-600 bg-purple-100',
};

export function NotificationPanel({
  notifications = defaultNotifications,
  className,
}: NotificationPanelProps) {
  const [notificationList, setNotificationList] = useState<Notification[]>(notifications);
  const [filter, setFilter] = useState<'all' | 'unread' | 'action'>('all');

  const unreadCount = notificationList.filter((n) => !n.read).length;
  const actionRequiredCount = notificationList.filter((n) => n.actionRequired).length;

  const filteredNotifications = notificationList.filter((notification) => {
    if (filter === 'unread') return !notification.read;
    if (filter === 'action') return notification.actionRequired;
    return true;
  });

  const markAsRead = (id: string) => {
    setNotificationList((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotificationList((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotificationList((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotificationList([]);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-brand-600" />
            <CardTitle>Notifications</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Badge variant="outline" className="text-xs">
                {unreadCount} unread
              </Badge>
            )}
            {actionRequiredCount > 0 && (
              <Badge className="bg-error-100 text-error-700 text-xs">
                {actionRequiredCount} action required
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {/* Filter Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => setFilter('all')}
            className={cn(
              'flex-1 px-4 py-2 text-sm font-medium transition-colors',
              filter === 'all'
                ? 'text-brand-600 border-b-2 border-brand-600'
                : 'text-gray-600 hover:text-gray-900'
            )}
          >
            All ({notificationList.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={cn(
              'flex-1 px-4 py-2 text-sm font-medium transition-colors',
              filter === 'unread'
                ? 'text-brand-600 border-b-2 border-brand-600'
                : 'text-gray-600 hover:text-gray-900'
            )}
          >
            Unread ({unreadCount})
          </button>
          <button
            onClick={() => setFilter('action')}
            className={cn(
              'flex-1 px-4 py-2 text-sm font-medium transition-colors',
              filter === 'action'
                ? 'text-brand-600 border-b-2 border-brand-600'
                : 'text-gray-600 hover:text-gray-900'
            )}
          >
            Action Required ({actionRequiredCount})
          </button>
        </div>

        {/* Actions Bar */}
        <div className="flex items-center justify-between px-4 py-2 border-b bg-gray-50">
          <div className="text-sm text-gray-600">
            Showing {filteredNotifications.length} notifications
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                <CheckCheck className="w-4 h-4 mr-1" />
                Mark all read
              </Button>
            )}
            {notificationList.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAll}
                className="text-error-600"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Clear all
              </Button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <ScrollArea className="h-[500px]">
          <div className="divide-y">
            {filteredNotifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Bell className="w-12 h-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900">
                  No notifications
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {filter === 'unread'
                    ? 'All notifications have been read'
                    : filter === 'action'
                    ? 'No actions required'
                    : 'You\'re all caught up!'}
                </p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    'p-4 transition-colors hover:bg-gray-50',
                    !notification.read && 'bg-white',
                    notification.read && 'bg-gray-50/50'
                  )}
                >
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div
                      className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
                        typeIconColors[notification.type]
                      )}
                    >
                      {notification.icon || (
                        <Bell className="w-5 h-5" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4
                              className={cn(
                                'text-sm font-medium',
                                !notification.read && 'text-gray-900',
                                notification.read && 'text-gray-600'
                              )}
                            >
                              {notification.title}
                            </h4>
                            {!notification.read && (
                              <span className="w-2 h-2 bg-brand-500 rounded-full" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-gray-400">
                              {notification.timestamp}
                            </span>
                            <Badge
                              variant="outline"
                              className="text-xs"
                            >
                              {notification.type}
                            </Badge>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1 flex-shrink-0">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="w-8 h-8"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                          )}
                          {notification.actionRequired && notification.onAction && (
                            <Button
                              size="sm"
                              className="text-xs"
                              onClick={notification.onAction}
                            >
                              {notification.actionLabel}
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-8 h-8 text-gray-400 hover:text-error-600"
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
