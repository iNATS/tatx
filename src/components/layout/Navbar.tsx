
"use client";

import Link from 'next/link';
import { ShoppingBag, User, Search, MapPin, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/store/use-cart';
import { Badge } from '@/components/ui/badge';

export function Navbar() {
  const { cart } = useCart();
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 w-full bg-background border-b shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 group">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-xl rotate-3 group-hover:rotate-0 transition-transform">
            F
          </div>
          <span className="text-xl font-bold font-headline hidden sm:block">
            Feast<span className="text-primary">Fast</span>
          </span>
        </Link>

        {/* Address Picker */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-full cursor-pointer hover:bg-secondary/80 transition-colors">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Deliver to: Riyadh, Al Malqa</span>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md relative hidden lg:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search restaurants or cuisines..." 
            className="pl-10 bg-muted/50 border-none focus-visible:ring-primary"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="w-5 h-5" />
          </Button>
          
          <Link href="/profile">
            <Button variant="ghost" className="hidden md:flex gap-2">
              <User className="w-5 h-5" />
              <span>Sign In</span>
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <User className="w-5 h-5" />
            </Button>
          </Link>

          <Link href="/cart">
            <Button variant="primary" className="relative gap-2 font-bold rounded-full">
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline">Cart</span>
              {itemCount > 0 && (
                <Badge 
                  variant="accent" 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] border-2 border-background"
                >
                  {itemCount}
                </Badge>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
