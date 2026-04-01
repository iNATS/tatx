
"use client";

import Link from 'next/link';
import { ShoppingBag, User, MapPin, ChevronDown, Check } from 'lucide-react';
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
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-2xl border-b border-[#D2D2D7]/30 h-20 md:h-24 transition-all">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        
        {/* Left Side (Cart & User) */}
        <div className="flex items-center gap-3">
          <Link href="/profile">
            <Button variant="ghost" size="icon" className="rounded-full h-12 w-12 hover:bg-[#F5F5F7] shadow-none">
              <User className="w-6 h-6 text-[#1D1D1F]" />
            </Button>
          </Link>
          <Link href="/cart">
            <Button variant="ghost" className="relative h-12 px-5 rounded-full hover:bg-[#F5F5F7] font-black text-[#1D1D1F] gap-2 shadow-none border-none">
              <ShoppingBag className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="h-5 w-5 flex items-center justify-center text-[10px] bg-primary text-white rounded-full">
                  {itemCount}
                </span>
              )}
            </Button>
          </Link>
        </div>

        {/* Center Side (Location Picker) */}
        <div className="hidden md:flex flex-1 justify-center">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <div className="flex items-center gap-2 px-6 py-2.5 bg-[#F5F5F7] rounded-full cursor-pointer hover:bg-[#E8E8ED] transition-all border border-transparent">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm font-black text-[#1D1D1F]">التوصيل إلى: {selectedLocation.district}</span>
                <ChevronDown className="w-4 h-4 text-[#86868B]" />
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px] rounded-[2.5rem] border-none shadow-2xl p-8" dir="rtl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black text-right mb-6 text-[#1D1D1F]">اختر الموقع</DialogTitle>
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
                className="space-y-3"
              >
                {LOCATIONS.map((loc) => (
                  <div key={loc.id}>
                    <RadioGroupItem value={loc.id} id={loc.id} className="peer sr-only" />
                    <Label
                      htmlFor={loc.id}
                      className="flex items-center justify-between p-5 bg-[#F5F5F7] rounded-2xl cursor-pointer hover:bg-[#E8E8ED] transition-all peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-white font-black"
                    >
                      <div className="flex items-center gap-4">
                        <MapPin className="w-5 h-5 opacity-70" />
                        <div className="flex flex-col text-right">
                          <span className="text-base">{loc.district}</span>
                          <span className="text-[10px] opacity-60 font-bold">{loc.city}</span>
                        </div>
                      </div>
                      {selectedLocation.id === loc.id && <Check className="w-5 h-5" />}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </DialogContent>
          </Dialog>
        </div>

        {/* Right Side (Brand) */}
        <Link href="/" className="flex items-center gap-3 group">
          <span className="text-2xl md:text-3xl font-black tracking-tight text-[#1D1D1F]">
            Tatx
          </span>
          <div className="relative w-10 h-10 md:w-12 md:h-12 overflow-hidden rounded-xl bg-white shadow-sm border border-[#D2D2D7]/30 flex items-center justify-center p-1.5 transition-transform group-hover:scale-105">
            <Image 
              src="https://picsum.photos/seed/tatx-brand-logo/200/200" 
              alt="Tatx Logo" 
              width={48} 
              height={48} 
              className="object-contain"
            />
          </div>
        </Link>

      </div>
    </nav>
  );
}
