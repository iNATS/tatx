
"use client";

import { Utensils, Pizza, Beef, Coffee, Salad, Sandwich, Fish } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const CATEGORIES = [
  { name: 'All', icon: Utensils },
  { name: 'Burgers', icon: Beef },
  { name: 'Pizza', icon: Pizza },
  { name: 'Arabic', icon: Sandwich },
  { name: 'Sushi', icon: Fish },
  { name: 'Healthy', icon: Salad },
  { name: 'Desserts', icon: Coffee },
];

export function CategorySlider() {
  const [active, setActive] = useState('All');

  return (
    <div className="w-full overflow-x-auto no-scrollbar py-6">
      <div className="flex gap-4 min-w-max">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = active === cat.name;
          return (
            <button
              key={cat.name}
              onClick={() => setActive(cat.name)}
              className={cn(
                "flex flex-col items-center gap-2 p-4 min-w-[100px] rounded-2xl transition-all border-2",
                isActive 
                  ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105" 
                  : "bg-card border-transparent hover:border-primary/20 text-muted-foreground"
              )}
            >
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center transition-colors",
                isActive ? "bg-white/20" : "bg-secondary"
              )}>
                <Icon className={cn("w-6 h-6", isActive ? "text-white" : "text-primary")} />
              </div>
              <span className="text-sm font-semibold">{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
