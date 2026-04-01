
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Bell, User, Car, Store } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/store/use-cart';

const NAV_ITEMS = [
  { label: 'الرئيسية', icon: Home, href: '/' },
  { label: 'تاكسي', icon: Car, href: '/taxi' },
  { label: 'المتجر', icon: Store, href: '/provider/market-tatx' },
  { label: 'التنبيهات', icon: Bell, href: '/profile/notifications' },
  { label: 'حسابي', icon: User, href: '/profile' },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const { cart } = useCart();
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-2xl border-t border-border/50 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-around h-20">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full gap-1.5 transition-all relative px-1",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <div className={cn(
                "p-2 rounded-2xl transition-all duration-300",
                isActive ? "bg-primary/10" : "bg-transparent hover:bg-secondary/50"
              )}>
                <Icon className={cn("w-7 h-7", isActive ? "stroke-[2.5px]" : "stroke-[2px]")} />
              </div>
              <span className="text-[11px] font-black">{item.label}</span>
              
              {/* Cart Badge - Show on Store if items present */}
              {item.href.includes('market') && itemCount > 0 && (
                <span className="absolute top-3 right-5 h-5 w-5 bg-primary text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-md">
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
