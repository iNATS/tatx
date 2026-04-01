"use client";

import { Utensils, Car, Store, Pill, Sparkles, Gift } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CATEGORIES, PROVIDERS } from '@/lib/data';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const iconMap: Record<string, any> = {
  Utensils,
  Car,
  Store,
  Pill,
  Sparkles,
  Gift,
};

export function CategorySlider() {
  const pathname = usePathname();

  return (
    <div className="w-full overflow-x-auto no-scrollbar py-4" dir="rtl">
      <div className="flex gap-4 min-w-full justify-start px-2">
        {/* "All" Category Chip - MD3 Style */}
        <Link href="/">
          <div
            className={cn(
              "flex items-center gap-3 px-6 py-3 min-w-[120px] rounded-full transition-all duration-300 cursor-pointer group border-2 shadow-sm",
              pathname === '/'
                ? "bg-primary border-primary text-white md-elevation-2 translate-y-[-2px]" 
                : "bg-surface border-border text-muted-foreground hover:bg-secondary hover:translate-y-[-2px]"
            )}
          >
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
              pathname === '/' ? "bg-white/20" : "bg-primary/10"
            )}>
              <Store className={cn("w-4 h-4", pathname === '/' ? "text-white" : "text-primary")} />
            </div>
            <span className="text-sm font-black whitespace-nowrap">الكل</span>
          </div>
        </Link>

        {/* Dynamic MD3 Chips */}
        {CATEGORIES.map((cat) => {
          const Icon = iconMap[cat.icon];
          const provider = PROVIDERS.find(p => p.category === cat.id);
          const href = cat.id === 'taxi' ? '/taxi' : (provider ? `/provider/${provider.id}` : '/');
          const isActive = pathname === href;

          return (
            <Link key={cat.id} href={href}>
              <div
                className={cn(
                  "flex items-center gap-3 px-6 py-3 min-w-[140px] rounded-full transition-all duration-300 cursor-pointer group border-2 shadow-sm",
                  isActive 
                    ? "bg-primary border-primary text-white md-elevation-2 translate-y-[-2px]" 
                    : "bg-surface border-border text-muted-foreground hover:bg-secondary hover:translate-y-[-2px]"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                  isActive ? "bg-white/20" : "bg-primary/10"
                )}>
                  {Icon && <Icon className={cn("w-4 h-4", isActive ? "text-white" : "text-primary")} />}
                </div>
                <span className="text-sm font-black whitespace-nowrap">{cat.name}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
