'use client';

import { ShoppingCart } from 'lucide-react';
import { Button } from '@tatx/ui/button';
import Link from 'next/link';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

interface CartSummaryProps {
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
}

export function CartSummary({ cart, cartCount, cartTotal }: CartSummaryProps) {
  if (cartCount === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <Link href="/food/cart">
          <Button className="w-full" size="lg">
            <ShoppingCart className="h-5 w-5 mr-2" />
            View Cart ({cartCount}) - {cartTotal.toFixed(2)} SAR
          </Button>
        </Link>
      </div>
    </div>
  );
}
