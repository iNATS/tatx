"use client";

import Link from 'next/link';
import { ShoppingBag, User, Search, MapPin, ChevronDown, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/store/use-cart';
import { Badge } from '@/components/ui/badge';

export function Navbar() {
  const { cart } = useCart();
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-primary/20 transition-transform group-hover:scale-105">
            T
          </div>
          <span className="text-2xl font-black hidden sm:block">
            تاتكس<span className="text-primary">Tatx</span>
          </span>
        </Link>

        {/* Address Picker */}
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-secondary rounded-full cursor-pointer hover:bg-secondary/80 transition-colors">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-sm font-bold">التوصيل إلى: الرياض، الملقا</span>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md relative hidden lg:block">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="بحث عن خدمات، مطاعم..." 
            className="pr-10 bg-muted/50 border-none focus-visible:ring-primary text-right"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Search className="w-5 h-5" />
          </Button>
          
          <Link href="/profile" className="hidden md:block">
            <Button variant="ghost" className="flex gap-2 font-bold">
              <User className="w-5 h-5" />
              <span>دخول</span>
            </Button>
          </Link>

          <Link href="/cart">
            <Button className="relative gap-2 font-black rounded-full px-6 bg-primary hover:bg-primary/90">
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline">السلة</span>
              {itemCount > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-black text-white border-2 border-white"
                >
                  {itemCount}
                </Badge>
              )}
            </Button>
          </Link>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </nav>
  );
}