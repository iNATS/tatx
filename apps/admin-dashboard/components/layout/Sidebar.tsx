'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@tatx/ui/src/utils/cn';
import {
  LayoutDashboard,
  Users,
  Car,
  ShoppingBag,
  Store,
  CreditCard,
  BarChart3,
  Settings,
  Utensils,
  Package,
  X,
} from 'lucide-react';
import { Button } from '@tatx/ui/components/button';
import { Badge } from '@tatx/ui/components/badge';

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Users', href: '/dashboard/users', icon: Users },
  { name: 'Rides', href: '/dashboard/rides', icon: Car },
  { name: 'Orders', href: '/dashboard/orders', icon: ShoppingBag },
  { name: 'Restaurants', href: '/dashboard/restaurants', icon: Store },
  { name: 'Payments', href: '/dashboard/payments', icon: CreditCard },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

const stats = {
  activeRides: 156,
  pendingOrders: 43,
  newUsers: 24,
};

export function Sidebar({ open = true, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {!open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 bg-white border-r transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-auto',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="h-full overflow-y-auto scrollbar-hide">
          {/* Close button for mobile */}
          <div className="flex items-center justify-between p-4 lg:hidden">
            <span className="text-sm font-medium text-gray-500">Menu</span>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group',
                    isActive
                      ? 'bg-brand-50 text-brand-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  )}
                >
                  <item.icon
                    className={cn(
                      'w-5 h-5 transition-colors',
                      isActive ? 'text-brand-600' : 'text-gray-400 group-hover:text-gray-600'
                    )}
                  />
                  <span>{item.name}</span>
                  {/* Live indicators for specific pages */}
                  {item.name === 'Rides' && (
                    <Badge className="ml-auto bg-brand-100 text-brand-700 text-xs">
                      {stats.activeRides}
                    </Badge>
                  )}
                  {item.name === 'Orders' && (
                    <Badge className="ml-auto bg-warning-100 text-warning-700 text-xs">
                      {stats.pendingOrders}
                    </Badge>
                  )}
                  {item.name === 'Users' && (
                    <Badge className="ml-auto bg-success-100 text-success-700 text-xs">
                      +{stats.newUsers}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Quick Stats Section */}
          <div className="p-4 mt-4 border-t">
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Quick Stats
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 flex items-center gap-2">
                    <Car className="w-4 h-4 text-brand-600" />
                    Active Rides
                  </span>
                  <span className="font-medium">{stats.activeRides}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-orange-600" />
                    Pending Orders
                  </span>
                  <span className="font-medium">{stats.pendingOrders}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 flex items-center gap-2">
                    <Users className="w-4 h-4 text-green-600" />
                    New Users Today
                  </span>
                  <span className="font-medium">+{stats.newUsers}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tatx Pro Upgrade Card */}
          <div className="p-4 mt-4 border-t">
            <div className="bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl p-4 text-white shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">T</span>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Tatx Pro</h3>
                  <p className="text-xs text-brand-100">Premium Features</p>
                </div>
              </div>
              <p className="text-xs text-brand-100 mb-3">
                Unlock advanced analytics, priority support, and more
              </p>
              <button className="w-full bg-white text-brand-600 py-2 rounded-lg text-sm font-medium hover:bg-brand-50 transition-colors shadow-sm">
                Upgrade Now
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 mt-4 border-t">
            <div className="text-center">
              <p className="text-xs text-gray-400">
                Tatx Admin v1.0.0
              </p>
              <p className="text-xs text-gray-400 mt-1">
                © 2024 Tatx Platform
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
