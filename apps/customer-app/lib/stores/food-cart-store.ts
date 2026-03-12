/**
 * Food Cart Store
 * Zustand store for managing food cart state
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartState, CartActions, CartItemData, CartSummaryData } from '@/types/food-ordering';

type CartStore = CartState & CartActions;

const SERVICE_FEE_RATE = 0.05; // 5%
const TAX_RATE = 0.08; // 8%
const DELIVERY_FEE = 3.99;

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // Initial state
      items: [],
      restaurantId: null,
      restaurantName: null,
      deliveryAddress: undefined,
      customerNotes: '',

      // Actions
      addItem: (item: Omit<CartItemData, 'id'>) => {
        set((state) => {
          // Check if adding from different restaurant
          if (state.restaurantId && state.restaurantId !== item.restaurantId) {
            // Clear cart and start fresh
            const newItem = {
              ...item,
              id: `cart-item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            };
            return {
              items: [newItem],
              restaurantId: item.restaurantId,
              restaurantName: item.restaurantName,
            };
          }

          // Check if item already exists with same customizations
          const existingItemIndex = state.items.findIndex(
            (cartItem) =>
              cartItem.menuItemId === item.menuItemId &&
              JSON.stringify(cartItem.customizations) === JSON.stringify(item.customizations) &&
              cartItem.specialInstructions === item.specialInstructions
          );

          if (existingItemIndex > -1) {
            // Update quantity of existing item
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              quantity: updatedItems[existingItemIndex].quantity + item.quantity,
              totalPrice:
                updatedItems[existingItemIndex].totalPrice + item.totalPrice,
            };
            return { items: updatedItems };
          }

          // Add new item
          const newItem = {
            ...item,
            id: `cart-item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          };
          return {
            items: [...state.items, newItem],
            restaurantId: item.restaurantId,
            restaurantName: item.restaurantName,
          };
        });
      },

      updateQuantity: (itemId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }

        set((state) => {
          const updatedItems = state.items.map((item) => {
            if (item.id === itemId) {
              const pricePerUnit = item.totalPrice / item.quantity;
              return {
                ...item,
                quantity,
                totalPrice: pricePerUnit * quantity,
              };
            }
            return item;
          });
          return { items: updatedItems };
        });
      },

      removeItem: (itemId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
          // Clear restaurant info if cart is empty
          restaurantId: state.items.filter((item) => item.id !== itemId).length === 0 ? null : state.restaurantId,
          restaurantName: state.items.filter((item) => item.id !== itemId).length === 0 ? null : state.restaurantName,
        }));
      },

      clearCart: () => {
        set({
          items: [],
          restaurantId: null,
          restaurantName: null,
          deliveryAddress: undefined,
          customerNotes: '',
        });
      },

      setDeliveryAddress: (address) => {
        set({ deliveryAddress: address });
      },

      setCustomerNotes: (notes) => {
        set({ customerNotes: notes });
      },

      getSummary: () => {
        const state = get();
        const subtotal = state.items.reduce((sum, item) => sum + item.totalPrice, 0);
        const serviceFee = subtotal * SERVICE_FEE_RATE;
        const tax = subtotal * TAX_RATE;
        const deliveryFee = state.items.length > 0 ? DELIVERY_FEE : 0;
        const discount = 0; // Could apply promo codes here
        const total = subtotal + serviceFee + tax + deliveryFee - discount;

        return {
          subtotal: Math.round(subtotal * 100) / 100,
          deliveryFee: Math.round(deliveryFee * 100) / 100,
          serviceFee: Math.round(serviceFee * 100) / 100,
          tax: Math.round(tax * 100) / 100,
          discount: Math.round(discount * 100) / 100,
          total: Math.round(total * 100) / 100,
          currency: 'USD',
        };
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: 'tatx-food-cart',
      partialize: (state) => ({
        items: state.items,
        restaurantId: state.restaurantId,
        restaurantName: state.restaurantName,
        deliveryAddress: state.deliveryAddress,
        customerNotes: state.customerNotes,
      }),
    }
  )
);

// Hook for easier access to cart data
export const useCart = () => {
  const store = useCartStore();
  return {
    items: store.items,
    restaurantId: store.restaurantId,
    restaurantName: store.restaurantName,
    deliveryAddress: store.deliveryAddress,
    customerNotes: store.customerNotes,
    isEmpty: store.items.length === 0,
    itemCount: store.getItemCount(),
    summary: store.getSummary(),
    addItem: store.addItem,
    updateQuantity: store.updateQuantity,
    removeItem: store.removeItem,
    clearCart: store.clearCart,
    setDeliveryAddress: store.setDeliveryAddress,
    setCustomerNotes: store.setCustomerNotes,
  };
};
