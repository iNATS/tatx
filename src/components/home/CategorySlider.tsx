"use client";

import { Utensils, Car, Wrench, PartyPopper, Home, Store, Pill } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CATEGORIES, PROVIDERS } from '@/lib/data';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const iconMap: Record<string, any> = {
  Utensils,
  Car,
  Wrench,
  PartyPopper,
  Home,
  Store,
  Pill,
};

export function CategorySlider() {
  const pathname = usePathname();

  return (
    <div className="w-full overflow-x-auto no-scrollbar py-6" dir="rtl">
      <div className="flex gap-4 min-w-full justify-start flex-row-reverse">
        <Link href="/">
          <button
            className={cn(
              "flex flex-col items-center gap-2 p-4 min-w-[100px] rounded-2xl transition-all border-2",
              pathname === '/'
                ? "bg-primary border-primary text-white scale-105 shadow-none" 
                : "bg-white border-transparent hover:border-primary/20 text-muted-foreground"
            )}
          >
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center transition-colors shadow-none",
              pathname === '/' ? "bg-white/20" : "bg-secondary"
            )}>
              <Store className={cn("w-6 h-6", pathname === '/' ? "text-white" : "text-primary")} />
            </div>
            <span className="text-sm font-bold">الكل</span>
          </button>
        </Link>

        {CATEGORIES.map((cat) => {
          const Icon = iconMap[cat.icon];
          const provider = PROVIDERS.find(p => p.category === cat.id);
          const href = cat.id === 'taxi' ? '/taxi' : (provider ? `/provider/${provider.id}` : '/');
          const isActive = pathname === href;

          return (
            <Link key={cat.id} href={href}>
              <button
                className={cn(
                  "flex flex-col items-center gap-2 p-4 min-w-[100px] rounded-2xl transition-all border-2",
                  isActive 
                    ? "bg-primary border-primary text-white scale-105 shadow-none" 
                    : "bg-white border-transparent hover:border-primary/20 text-muted-foreground"
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center transition-colors shadow-none",
                  isActive ? "bg-white/20" : "bg-secondary"
                )}>
                  {Icon && <Icon className={cn("w-6 h-6", isActive ? "text-white" : "text-primary")} />}
                </div>
                <span className="text-sm font-bold">{cat.name}</span>
              </button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
