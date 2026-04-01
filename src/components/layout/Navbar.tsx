
"use client";

import Link from 'next/link';
import { ShoppingBag, User, Search, MapPin, ChevronDown, Menu, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/store/use-cart';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const LOCATIONS = [
  { id: '1', city: 'الرياض', district: 'الملقا' },
  { id: '2', city: 'الرياض', district: 'الياسمين' },
  { id: '3', city: 'الرياض', district: 'النرجس' },
  { id: '4', city: 'جدة', district: 'الشاطئ' },
  { id: '5', city: 'الدمام', district: 'الفيصلية' },
];

export function Navbar() {
  const { cart } = useCart();
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4 h-24 flex items-center justify-between gap-6">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative w-12 h-12 overflow-hidden rounded-2xl bg-white border border-border/50 shadow-sm flex items-center justify-center p-1.5 transition-transform group-hover:scale-105">
            <Image 
              src="https://picsum.photos/seed/tatx-brand-logo/200/200" 
              alt="Tatx Logo" 
              width={48} 
              height={48} 
              className="object-contain"
            />
          </div>
          <span className="text-3xl font-black tracking-tight text-foreground">
            Tatx
          </span>
        </Link>

        {/* Location Picker - Hidden on Mobile */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <div className="hidden lg:flex items-center gap-3 px-6 py-3 bg-secondary/40 rounded-full cursor-pointer hover:bg-secondary/60 transition-all border border-transparent hover:border-border/50">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-sm font-black truncate max-w-[180px]">التوصيل إلى: {selectedLocation.district}</span>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[450px] rounded-[2.5rem] border-none shadow-2xl p-10" dir="rtl">
            <DialogHeader>
              <DialogTitle className="text-3xl font-black text-right mb-8">اختر موقع التوصيل</DialogTitle>
            </DialogHeader>
            <RadioGroup 
              defaultValue={selectedLocation.id} 
              onValueChange={(id) => {
                const loc = LOCATIONS.find(l => l.id === id);
                if (loc) {
                  setSelectedLocation(loc);
                  setIsOpen(false);
                }
              }}
              className="space-y-4"
            >
              {LOCATIONS.map((loc) => (
                <div key={loc.id}>
                  <RadioGroupItem value={loc.id} id={loc.id} className="peer sr-only" />
                  <Label
                    htmlFor={loc.id}
                    className="flex items-center justify-between p-6 bg-secondary/30 rounded-3xl cursor-pointer hover:bg-secondary/50 transition-all peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-white font-black"
                  >
                    <div className="flex items-center gap-5">
                      <MapPin className="w-6 h-6 opacity-70" />
                      <div className="flex flex-col text-right">
                        <span className="text-lg">{loc.district}</span>
                        <span className="text-xs opacity-60 font-bold">{loc.city}</span>
                      </div>
                    </div>
                    {selectedLocation.id === loc.id && <Check className="w-6 h-6" />}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            <div className="mt-10">
              <Button className="w-full rounded-2xl font-black h-16 text-lg bg-white text-primary border-2 border-primary/20 hover:bg-primary/5 shadow-none">
                إضافة عنوان جديد
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link href="/profile" className="hidden md:block">
            <Button variant="ghost" className="flex gap-2 font-black shadow-none hover:bg-secondary/50 rounded-full px-8 h-14 text-lg">
              <User className="w-6 h-6" />
              <span>دخول</span>
            </Button>
          </Link>

          <Link href="/cart">
            <Button className="relative gap-3 font-black rounded-full px-8 h-14 text-lg bg-primary hover:bg-primary/90 shadow-xl border-none transition-all active:scale-95">
              <ShoppingBag className="w-6 h-6" />
              <span className="hidden sm:inline">السلة</span>
              {itemCount > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 h-7 w-7 flex items-center justify-center p-0 text-xs bg-black text-white border-2 border-white shadow-xl rounded-full"
                >
                  {itemCount}
                </Badge>
              )}
            </Button>
          </Link>

          <Button variant="ghost" size="icon" className="md:hidden shadow-none rounded-full h-14 w-14 hover:bg-secondary/50" asChild>
            <Link href="/search"><Search className="w-7 h-7" /></Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
