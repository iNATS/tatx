
"use client";

import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCart } from '@/store/use-cart';
import { MapPin, CreditCard, Apple, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { total, clearCart } = useCart();
  const [isOrdered, setIsOrdered] = useState(false);
  const router = useRouter();

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrdered(true);
    setTimeout(() => {
      clearCart();
      router.push('/orders');
    }, 2000);
  };

  if (isOrdered) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center px-4">
        <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mb-8 animate-bounce">
          <CheckCircle2 className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-4xl font-black mb-4">Order Confirmed!</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Sit back and relax, your food is being prepared.
        </p>
        <p className="text-sm text-primary font-bold animate-pulse">
          Redirecting to order status...
        </p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-4xl font-black mb-12">Checkout</h1>

          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              {/* Delivery Address */}
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Delivery Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="street">Street Address</Label>
                    <Input id="street" placeholder="123 Riyadh St" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" value="Riyadh" disabled />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="+966 5XX XXX XXX" required />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup defaultValue="card" className="space-y-4">
                    <Label
                      htmlFor="card"
                      className="flex items-center justify-between p-4 border rounded-xl cursor-pointer hover:bg-secondary/50 transition-colors [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5"
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="card" id="card" />
                        <span className="font-bold">Credit / Debit Card</span>
                      </div>
                      <div className="flex gap-1">
                        <div className="w-8 h-5 bg-blue-600 rounded" />
                        <div className="w-8 h-5 bg-red-500 rounded" />
                      </div>
                    </Label>
                    <Label
                      htmlFor="apple"
                      className="flex items-center justify-between p-4 border rounded-xl cursor-pointer hover:bg-secondary/50 transition-colors [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5"
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="apple" id="apple" />
                        <span className="font-bold">Apple Pay</span>
                      </div>
                      <Apple className="w-6 h-6" />
                    </Label>
                    <Label
                      htmlFor="cash"
                      className="flex items-center justify-between p-4 border rounded-xl cursor-pointer hover:bg-secondary/50 transition-colors [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5"
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="cash" id="cash" />
                        <span className="font-bold">Cash on Delivery</span>
                      </div>
                    </Label>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24 border-none shadow-xl bg-primary text-white">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-8">Final Review</h3>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-white/80">
                      <span>Total to Pay</span>
                      <span className="text-3xl font-black">{(total * 1.05 + 15).toFixed(2)} SAR</span>
                    </div>
                  </div>

                  <Button 
                    type="submit"
                    variant="secondary"
                    className="w-full h-14 rounded-xl text-lg font-black shadow-lg bg-white text-primary hover:bg-gray-100"
                  >
                    Place My Order
                  </Button>

                  <p className="text-center text-xs text-white/60 mt-6">
                    Fastest delivery in town guaranteed.
                  </p>
                </CardContent>
              </Card>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
