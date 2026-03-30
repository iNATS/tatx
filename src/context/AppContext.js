import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { translations } from '../data/staticData';
import {
  createOrderInSupabase,
  defaultAppContent,
  fetchAppContent,
} from '../services/appContentService';
import { isSupabaseConfigured } from '../lib/supabase';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [content, setContent] = useState(defaultAppContent);
  const [contentSource, setContentSource] = useState(isSupabaseConfigured ? 'loading' : 'static');
  const [contentError, setContentError] = useState(null);
  const [contentLoading, setContentLoading] = useState(isSupabaseConfigured);
  const [user, setUser] = useState(defaultAppContent.user);
  const [cart, setCart] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  const refreshContent = async () => {
    setContentLoading(true);

    const result = await fetchAppContent();

    setContent(result.content);
    setContentSource(result.source);
    setContentError(result.error);
    setContentLoading(false);
  };

  useEffect(() => {
    refreshContent();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      setUser(content.user || defaultAppContent.user);
    }
  }, [content.user, isAuthenticated]);

  const language = 'ar';
  const setLanguage = () => {};
  const isRTL = true;
  const locale = content.demoMarket?.locale || 'ar-SA';
  const currencySymbol = content.demoMarket?.currency || '﷼';
  const rowDirection = isRTL ? 'row-reverse' : 'row';
  const textAlignStart = isRTL ? 'right' : 'left';
  const textAlignEnd = isRTL ? 'left' : 'right';
  const dictionary = translations.ar;

  const t = (key) => dictionary[key] || translations.ar?.[key] || key;

  const formatCurrency = (value, options = {}) => {
    const numericValue = Number(value || 0);
    const absoluteValue = Math.abs(numericValue);
    const hasDecimals = absoluteValue % 1 !== 0;
    const formattedNumber = new Intl.NumberFormat(locale, {
      minimumFractionDigits: hasDecimals ? 2 : 0,
      maximumFractionDigits: hasDecimals ? 2 : 0,
    }).format(absoluteValue);
    const formattedAmount = isRTL
      ? `${formattedNumber} ${currencySymbol}`
      : `${currencySymbol} ${formattedNumber}`;

    if (options.signed) {
      const sign = numericValue > 0 ? '+' : numericValue < 0 ? '-' : '';
      return `${sign}${formattedAmount}`;
    }

    return numericValue < 0 ? `- ${formattedAmount}` : formattedAmount;
  };

  const getCartItemUnitPrice = (item) => Number(item?.finalPrice ?? item?.price ?? 0);

  const addToCart = (item) => {
    setCart((prev) => {
      const nextQuantity = Math.max(Number(item?.quantity || 1), 1);
      const itemNotes = JSON.stringify(item?.notes || []);
      const existing = prev.find(
        (i) => i.id === item.id && JSON.stringify(i?.notes || []) === itemNotes
      );

      if (existing) {
        return prev.map((i) =>
          i.id === existing.id && JSON.stringify(i?.notes || []) === itemNotes
            ? {
                ...i,
                ...item,
                quantity: i.quantity + nextQuantity,
              }
            : i
        );
      }

      return [
        ...prev,
        {
          ...item,
          quantity: nextQuantity,
        },
      ];
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prev) => prev.filter((i) => i.id !== itemId));
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const submitOrder = async (order) => {
    const { data, error } = await createOrderInSupabase(order);

    if (!error) {
      setContent((prev) => ({
        ...prev,
        orders: [order, ...(prev.orders || [])],
      }));
    }

    return { data, error };
  };

  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + getCartItemUnitPrice(item) * item.quantity, 0),
    [cart]
  );
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        user,
        setUser,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        isAuthenticated,
        setIsAuthenticated,
        currentOrder,
        setCurrentOrder,
        isRTL,
        locale,
        currencySymbol,
        rowDirection,
        textAlignStart,
        textAlignEnd,
        t,
        formatCurrency,
        content,
        contentSource,
        contentError,
        contentLoading,
        refreshContent,
        isSupabaseConfigured,
        demoAccounts: content.demoAccounts || defaultAppContent.demoAccounts,
        demoMarket: content.demoMarket || defaultAppContent.demoMarket,
        homeServices: content.homeServices || defaultAppContent.homeServices,
        homeOffers: content.homeOffers || defaultAppContent.homeOffers,
        onboardingSlides: content.onboardingSlides || defaultAppContent.onboardingSlides,
        notifications: content.notifications || defaultAppContent.notifications,
        restaurants: content.restaurants || defaultAppContent.restaurants,
        products: content.products || defaultAppContent.products,
        orders: content.orders || defaultAppContent.orders,
        paymentMethods: content.paymentMethods || defaultAppContent.paymentMethods,
        stayBookingOptions: content.stayBookingOptions || defaultAppContent.stayBookingOptions,
        supportTopics: content.supportTopics || defaultAppContent.supportTopics,
        walletTransactions: content.walletTransactions || defaultAppContent.walletTransactions,
        submitOrder,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
