'use client';

import { useState } from 'react';
import { Trash2, Plus, Minus, ChevronLeft, CreditCard } from 'lucide-react';
import { Button } from '@tatx/ui/button';
import { Input } from '@tatx/ui/input';
import { Label } from '@tatx/ui/label';
import Link from 'next/link';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  selectedModifiers?: any[];
}

export default function CartPage() {
  const [promoCode, setPromoCode] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '101',
      name: 'Chicken Meal (8pcs)',
      price: 25.0,
      quantity: 2,
      selectedModifiers: [{ name: 'Extra Sauce', price: 2.0 }],
    },
    {
      id: '201',
      name: 'French Fries',
      price: 6.0,
      quantity: 1,
    },
  ]);

  const updateQuantity = (itemId: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const newQuantity = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price + (item.selectedModifiers || []).reduce((s, m) => s + m.price, 0)) * item.quantity,
    0
  );
  const deliveryFee = 3.99;
  const serviceFee = subtotal * 0.05;
  const tax = subtotal * 0.15;
  const discount = promoCode === 'WELCOME50' ? subtotal * 0.5 : 0;
  const total = subtotal + deliveryFee + serviceFee + tax - discount;

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/food">
              <Button variant="ghost" size="icon">
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Your Cart</h1>
          </div>
        </div>
      </div>

      {/* Cart Items */}
      <div className="container mx-auto px-4 py-6 space-y-4">
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
            <Link href="/food">
              <Button>Browse Restaurants</Button>
            </Link>
          </div>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    {item.selectedModifiers && item.selectedModifiers.length > 0 && (
                      <div className="text-sm text-gray-500 mt-1">
                        {item.selectedModifiers.map((m, i) => (
                          <div key={i}>+ {m.name}: {m.price.toFixed(2)} SAR</div>
                        ))}
                      </div>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="font-semibold w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <span className="font-bold text-lg">
                    {((item.price + (item.selectedModifiers || []).reduce((s, m) => s + m.price, 0)) * item.quantity).toFixed(2)} SAR
                  </span>
                </div>
              </div>
            ))}

            {/* Promo Code */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <Label className="text-sm font-medium mb-2 block">Promo Code</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline">Apply</Button>
              </div>
              {discount > 0 && (
                <p className="text-green-600 text-sm mt-2">Promo code applied! You saved {discount.toFixed(2)} SAR</p>
              )}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg p-4 shadow-sm space-y-3">
              <h3 className="font-bold text-lg">Order Summary</h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{subtotal.toFixed(2)} SAR</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>{deliveryFee.toFixed(2)} SAR</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Service Fee (5%)</span>
                  <span>{serviceFee.toFixed(2)} SAR</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>VAT (15%)</span>
                  <span>{tax.toFixed(2)} SAR</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-{discount.toFixed(2)} SAR</span>
                  </div>
                )}
              </div>

              <div className="border-t pt-3 flex justify-between items-center">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-2xl text-brand-600">{total.toFixed(2)} SAR</span>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-bold text-lg mb-3">Delivery Address</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 border rounded-lg bg-gray-50">
                  <div className="w-4 h-4 rounded-full border-4 border-brand-600 mt-1" />
                  <div>
                    <p className="font-medium">Home</p>
                    <p className="text-sm text-gray-600">123 King Fahd Road, Al Olaya, Riyadh</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full">Change Address</Button>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-bold text-lg mb-3">Payment Method</h3>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <CreditCard className="h-6 w-6 text-gray-600" />
                <div className="flex-1">
                  <p className="font-medium">Credit Card</p>
                  <p className="text-sm text-gray-600">**** **** **** 4242</p>
                </div>
                <Button variant="ghost" size="sm">Change</Button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Checkout Button */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <Button className="w-full" size="lg">
              Place Order - {total.toFixed(2)} SAR
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
