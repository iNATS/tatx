
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
      <div className="flex gap-6 min-w-full justify-start px-4">
        {/* "All" Category Button */}
        <Link href="/">
          <div
            className={cn(
              "flex flex-col items-center gap-3 p-5 min-w-[120px] rounded-[2.5rem] transition-all duration-500 cursor-pointer group",
              pathname === '/'
                ? "bg-primary text-white shadow-[0_20px_40px_-15px_rgba(226,126,54,0.4)] translate-y-[-6px]" 
                : "bg-white hover:bg-white text-muted-foreground shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:translate-y-[-6px]"
            )}
          >
            <div className={cn(
              "w-16 h-16 rounded-[1.8rem] flex items-center justify-center transition-all duration-500",
              pathname === '/' ? "bg-white/20 rotate-12 scale-110" : "bg-secondary group-hover:bg-primary/10 group-hover:rotate-12 group-hover:scale-110"
            )}>
              <Store className={cn("w-8 h-8 transition-colors duration-500", pathname === '/' ? "text-white" : "text-primary")} />
            </div>
            <span className="text-[13px] font-black tracking-tight whitespace-nowrap">الكل</span>
          </div>
        </Link>

        {/* Dynamic Category Buttons */}
        {CATEGORIES.map((cat) => {
          const Icon = iconMap[cat.icon];
          const provider = PROVIDERS.find(p => p.category === cat.id);
          const href = cat.id === 'taxi' ? '/taxi' : (provider ? `/provider/${provider.id}` : '/');
          const isActive = pathname === href;

          return (
            <Link key={cat.id} href={href}>
              <div
                className={cn(
                  "flex flex-col items-center gap-3 p-5 min-w-[120px] rounded-[2.5rem] transition-all duration-500 cursor-pointer group",
                  isActive 
                    ? "bg-primary text-white shadow-[0_20px_40px_-15px_rgba(226,126,54,0.4)] translate-y-[-6px]" 
                    : "bg-white hover:bg-white text-muted-foreground shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:translate-y-[-6px]"
                )}
              >
                <div className={cn(
                  "w-16 h-16 rounded-[1.8rem] flex items-center justify-center transition-all duration-500",
                  isActive ? "bg-white/20 rotate-12 scale-110" : "bg-secondary group-hover:bg-primary/10 group-hover:rotate-12 group-hover:scale-110"
                )}>
                  {Icon && <Icon className={cn("w-8 h-8 transition-colors duration-500", isActive ? "text-white" : "text-primary")} />}
                </div>
                <span className="text-[13px] font-black tracking-tight whitespace-nowrap">{cat.name}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
