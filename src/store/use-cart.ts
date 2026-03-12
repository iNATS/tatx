
"use client";

import { useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  restaurantId: string;
  image: string;
}

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('feastfast_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to load cart", e);
      }
    }
  }, []);

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('feastfast_cart', JSON.stringify(newCart));
  };

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    const existing = cart.find((i) => i.id === item.id);
    if (existing) {
      const newCart = cart.map((i) => 
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
      saveCart(newCart);
    } else {
      saveCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeItem = (id: string) => {
    saveCart(cart.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    const newCart = cart.map((i) => {
      if (i.id === id) {
        const nextQty = Math.max(1, i.quantity + delta);
        return { ...i, quantity: nextQty };
      }
      return i;
    });
    saveCart(newCart);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return { cart, addItem, removeItem, updateQuantity, clearCart, total };
}
