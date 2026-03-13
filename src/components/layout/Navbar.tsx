"use client";

import Link from 'next/link';
import { ShoppingBag, User, Search, MapPin, ChevronDown, Menu, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/store/use-cart';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
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
    <nav className="sticky top-0 z-50 w-full bg-white border-b shadow-none">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-black text-2xl transition-transform group-hover:scale-105">
            T
          </div>
          <span className="text-2xl font-black hidden sm:block">
            تاتكس<span className="text-primary">Tatx</span>
          </span>
        </Link>

        {/* Address Picker */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-secondary rounded-full cursor-pointer hover:bg-secondary/80 transition-colors">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold">التوصيل إلى: {selectedLocation.city}، {selectedLocation.district}</span>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] rounded-3xl border-none shadow-none" dir="rtl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black text-right mb-4">اختر موقع التوصيل</DialogTitle>
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
                    className="flex items-center justify-between p-4 bg-secondary/50 rounded-2xl cursor-pointer hover:bg-secondary transition-all peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-white font-bold"
                  >
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5" />
                      <span>{loc.city}، {loc.district}</span>
                    </div>
                    {selectedLocation.id === loc.id && <Check className="w-5 h-5" />}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            <div className="mt-6">
              <Button variant="outline" className="w-full rounded-2xl font-bold h-12 border-2 shadow-none">
                إضافة عنوان جديد
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Search */}
        <div className="flex-1 max-w-md relative hidden lg:block">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="بحث عن خدمات، منتجات..." 
            className="pr-10 bg-muted/50 border-none focus-visible:ring-primary text-right shadow-none rounded-2xl h-10 font-bold"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="lg:hidden shadow-none">
            <Search className="w-5 h-5" />
          </Button>
          
          <Link href="/profile" className="hidden md:block">
            <Button variant="ghost" className="flex gap-2 font-bold shadow-none hover:bg-transparent">
              <User className="w-5 h-5" />
              <span>دخول</span>
            </Button>
          </Link>

          <Link href="/cart">
            <Button className="relative gap-2 font-black rounded-full px-6 bg-primary hover:bg-primary/90 shadow-none border-none">
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline">السلة</span>
              {itemCount > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-black text-white border-2 border-white shadow-none"
                >
                  {itemCount}
                </Badge>
              )}
            </Button>
          </Link>

          <Button variant="ghost" size="icon" className="md:hidden shadow-none">
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
