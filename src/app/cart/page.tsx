
"use client";

import { Navbar } from '@/components/layout/Navbar';
import { useCart } from '@/store/use-cart';
import Image from 'next/image';
import { Trash2, Plus, Minus, ArrowRight, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { RESTAURANTS } from '@/lib/data';

export default function CartPage() {
  const { cart, updateQuantity, removeItem, total } = useCart();

  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
          <div className="w-32 h-32 bg-secondary rounded-full flex items-center justify-center mb-8">
            <ShoppingCart className="w-16 h-16 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-black mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground text-lg mb-8 max-w-md">
            Looks like you haven't added anything to your cart yet. Browse our best restaurants and find something delicious!
          </p>
          <Link href="/">
            <Button size="lg" className="rounded-full px-12 font-bold">
              Explore Restaurants
            </Button>
          </Link>
        </main>
      </>
    );
  }

  const deliveryFee = 15;
  const grandTotal = total + deliveryFee;

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-black mb-12">Your Order</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => (
                <Card key={item.id} className="overflow-hidden border-none shadow-sm">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex gap-6">
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-bold mb-1">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {RESTAURANTS.find(r => r.id === item.restaurantId)?.name}
                            </p>
                          </div>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-muted-foreground hover:text-accent transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                        
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center gap-4 bg-secondary rounded-full px-3 py-1">
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              className="h-8 w-8 rounded-full"
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="font-bold">{item.quantity}</span>
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              className="h-8 w-8 rounded-full"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                          <span className="text-xl font-black text-primary">
                            {(item.price * item.quantity).toFixed(2)} SAR
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24 border-none shadow-xl bg-white">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-8">Summary</h3>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>{total.toFixed(2)} SAR</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Delivery Fee</span>
                      <span>{deliveryFee.toFixed(2)} SAR</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Service Tax (5%)</span>
                      <span>{(total * 0.05).toFixed(2)} SAR</span>
                    </div>
                    <Separator className="my-6" />
                    <div className="flex justify-between text-2xl font-black">
                      <span>Total</span>
                      <span className="text-primary">{(grandTotal + total * 0.05).toFixed(2)} SAR</span>
                    </div>
                  </div>

                  <Link href="/checkout">
                    <Button className="w-full h-14 rounded-xl text-lg font-black gap-2 group shadow-lg shadow-primary/30">
                      Go to Checkout
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>

                  <p className="text-center text-xs text-muted-foreground mt-6">
                    By proceeding, you agree to our Terms & Conditions
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
