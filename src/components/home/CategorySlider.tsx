"use client";

import { Utensils, Car, Wrench, PartyPopper, Home, Store, Pill } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { CATEGORIES } from '@/lib/data';

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
  const [active, setActive] = useState('الكل');

  return (
    <div className="w-full overflow-x-auto no-scrollbar py-6">
      <div className="flex gap-4 min-w-max flex-row-reverse">
        <button
          onClick={() => setActive('الكل')}
          className={cn(
            "flex flex-col items-center gap-2 p-4 min-w-[100px] rounded-2xl transition-all border-2",
            active === 'الكل'
              ? "bg-primary border-primary text-white scale-105 shadow-none" 
              : "bg-white border-transparent hover:border-primary/20 text-muted-foreground"
          )}
        >
          <div className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center transition-colors shadow-none",
            active === 'الكل' ? "bg-white/20" : "bg-secondary"
          )}>
            <Store className={cn("w-6 h-6", active === 'الكل' ? "text-white" : "text-primary")} />
          </div>
          <span className="text-sm font-bold">الكل</span>
        </button>

        {CATEGORIES.map((cat) => {
          const Icon = iconMap[cat.icon];
          const isActive = active === cat.name;
          return (
            <button
              key={cat.id}
              onClick={() => setActive(cat.name)}
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
                <Icon className={cn("w-6 h-6", isActive ? "text-white" : "text-primary")} />
              </div>
              <span className="text-sm font-bold">{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
