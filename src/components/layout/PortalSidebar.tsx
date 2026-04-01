
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  Truck, 
  Settings, 
  LogOut, 
  Package, 
  CreditCard,
  MessageSquare,
  Bell,
  Star,
  Store
} from 'lucide-react';
import { Button } from '../ui/button';

interface SidebarItem {
  icon: any;
  label: string;
  href: string;
}

interface PortalSidebarProps {
  role: 'admin' | 'vendor' | 'driver' | 'customer';
  title: string;
}

export function PortalSidebar({ role, title }: PortalSidebarProps) {
  const pathname = usePathname();

  const getMenu = (): SidebarItem[] => {
    switch (role) {
      case 'admin':
        return [
          { icon: LayoutDashboard, label: 'لوحة التحكم', href: '/admin' },
          { icon: Store, label: 'إدارة الموردين', href: '/admin/vendors' },
          { icon: Users, label: 'إدارة المستخدمين', href: '/admin/users' },
          { icon: Truck, label: 'إدارة المناديب', href: '/admin/drivers' },
          { icon: CreditCard, label: 'التقارير المالية', href: '/admin/finance' },
          { icon: Settings, label: 'إعدادات المنصة', href: '/admin/settings' },
        ];
      case 'vendor':
        return [
          { icon: LayoutDashboard, label: 'نظرة عامة', href: '/vendor' },
          { icon: Package, label: 'المنتجات / المنيو', href: '/vendor/items' },
          { icon: ShoppingBag, label: 'الطلبات الواردة', href: '/vendor/orders' },
          { icon: CreditCard, label: 'المبيعات والأرباح', href: '/vendor/earnings' },
          { icon: MessageSquare, label: 'تقييمات العملاء', href: '/vendor/reviews' },
          { icon: Settings, label: 'إعدادات المتجر', href: '/vendor/settings' },
        ];
      case 'driver':
        return [
          { icon: LayoutDashboard, label: 'الطلبات المتاحة', href: '/delivery' },
          { icon: ShoppingBag, label: 'طلباتي الحالية', href: '/delivery/active' },
          { icon: Package, label: 'سجل الطلبات', href: '/delivery/history' },
          { icon: CreditCard, label: 'المحفظة', href: '/delivery/wallet' },
          { icon: Star, label: 'التقييم', href: '/delivery/rating' },
        ];
      case 'customer':
        return [
          { icon: LayoutDashboard, label: 'ملفي الشخصي', href: '/profile' },
          { icon: ShoppingBag, label: 'طلباتي', href: '/orders' },
          { icon: Bell, label: 'التنبيهات', href: '/profile/notifications' },
          { icon: CreditCard, label: 'بطاقاتي', href: '/profile/payments' },
          { icon: Settings, label: 'الإعدادات', href: '/profile/settings' },
        ];
    }
  };

  const menu = getMenu();

  return (
    <aside className="w-72 bg-white border-l h-screen flex flex-col sticky top-0" dir="rtl">
      <div className="p-8">
        <Link href="/" className="flex items-center gap-3 group mb-10">
          <div className="relative w-10 h-10 overflow-hidden rounded-xl bg-white border border-border flex items-center justify-center p-1 shadow-sm">
            <Image 
              src="https://picsum.photos/seed/tatx-brand-logo/200/200" 
              alt="Tatx Logo" 
              width={40} 
              height={40} 
              className="object-contain"
              data-ai-hint="tatx logo"
            />
          </div>
          <span className="text-2xl font-black">Tatx <span className="text-primary">{title}</span></span>
        </Link>

        <nav className="space-y-2">
          {menu.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div className={cn(
                  "flex items-center gap-4 px-5 py-4 rounded-2xl font-black text-sm transition-all group",
                  isActive 
                    ? "bg-primary text-white shadow-xl translate-x-[-8px]" 
                    : "text-muted-foreground hover:bg-secondary hover:text-primary"
                )}>
                  <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-muted-foreground group-hover:text-primary")} />
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-8 border-t">
        <Button variant="ghost" className="w-full flex items-center gap-4 justify-end rounded-2xl font-black text-destructive hover:bg-destructive/10 hover:text-destructive h-12 shadow-none">
          <span>تسجيل الخروج</span>
          <LogOut className="w-5 h-5" />
        </Button>
      </div>
    </aside>
  );
}
