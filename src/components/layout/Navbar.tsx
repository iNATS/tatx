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
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-border shadow-none">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-6">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 overflow-hidden rounded-xl bg-white border border-border shadow-sm flex items-center justify-center p-1">
            <Image 
              src="https://picsum.photos/seed/tatx-logo/200/200" 
              alt="Tatx Logo" 
              width={40} 
              height={40} 
              className="object-contain"
              data-ai-hint="app logo"
            />
          </div>
          <span className="text-2xl font-black hidden md:block tracking-tight text-foreground">
            Tatx
          </span>
        </Link>

        {/* Location Picker - Hidden on Mobile */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <div className="hidden lg:flex items-center gap-2 px-5 py-2.5 bg-secondary/50 rounded-full cursor-pointer hover:bg-secondary transition-all border border-transparent hover:border-border">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold truncate max-w-[150px]">التوصيل إلى: {selectedLocation.district}</span>
              <ChevronDown className="w-3 h-3 text-muted-foreground" />
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] rounded-[2rem] border-none shadow-2xl p-8" dir="rtl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black text-right mb-6">اختر موقع التوصيل</DialogTitle>
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
                    className="flex items-center justify-between p-5 bg-secondary/40 rounded-2xl cursor-pointer hover:bg-secondary/60 transition-all peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-white font-black"
                  >
                    <div className="flex items-center gap-4">
                      <MapPin className="w-5 h-5 opacity-70" />
                      <div className="flex flex-col text-right">
                        <span>{loc.district}</span>
                        <span className="text-[10px] opacity-60 font-bold">{loc.city}</span>
                      </div>
                    </div>
                    {selectedLocation.id === loc.id && <Check className="w-5 h-5" />}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            <div className="mt-8">
              <Button className="w-full rounded-2xl font-black h-14 bg-white text-primary border-2 border-primary/20 hover:bg-primary/5 shadow-none">
                إضافة عنوان جديد
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Desktop Actions */}
        <div className="flex items-center gap-3">
          <Link href="/profile" className="hidden md:block">
            <Button variant="ghost" className="flex gap-2 font-black shadow-none hover:bg-secondary rounded-full px-6 h-12">
              <User className="w-5 h-5" />
              <span>دخول</span>
            </Button>
          </Link>

          <Link href="/cart">
            <Button className="relative gap-2 font-black rounded-full px-7 h-12 bg-primary hover:bg-primary/90 shadow-lg border-none transition-all active:scale-95">
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline">السلة</span>
              {itemCount > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 h-6 w-6 flex items-center justify-center p-0 text-[10px] bg-foreground text-background border-2 border-white shadow-xl rounded-full"
                >
                  {itemCount}
                </Badge>
              )}
            </Button>
          </Link>

          <Button variant="ghost" size="icon" className="md:hidden shadow-none rounded-full h-12 w-12" asChild>
            <Link href="/search"><Search className="w-6 h-6" /></Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}