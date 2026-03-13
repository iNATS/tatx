"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, Bell, User, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/store/use-cart';

const NAV_ITEMS = [
  { label: 'الرئيسية', icon: Home, href: '/' },
  { label: 'البحث', icon: Search, href: '/search' },
  { label: 'طلباتي', icon: ShoppingBag, href: '/orders' },
  { label: 'التنبيهات', icon: Bell, href: '/profile/notifications' },
  { label: 'حسابي', icon: User, href: '/profile' },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const { cart } = useCart();
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-border pb-safe">
      <div className="flex items-center justify-around h-16">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full gap-1 transition-all relative",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <div className={cn(
                "p-1 rounded-xl transition-all",
                isActive ? "bg-primary/10" : "bg-transparent"
              )}>
                <Icon className={cn("w-6 h-6", isActive ? "stroke-[2.5px]" : "stroke-[2px]")} />
              </div>
              <span className="text-[10px] font-black">{item.label}</span>
              
              {/* Cart Badge */}
              {item.href === '/orders' && itemCount > 0 && (
                <span className="absolute top-2 right-4 h-4 w-4 bg-primary text-white text-[8px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  {itemCount}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
