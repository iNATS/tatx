import React, { createContext, useContext, useMemo, useState } from 'react';
import { demoMarket, translations, user as defaultUser } from '../data/staticData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState('ar');
  const [user, setUser] = useState(defaultUser);
  const [cart, setCart] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  const isRTL = language === 'ar';
  const locale = language === 'ar' ? 'ar-SA' : 'en-SA';
  const currencySymbol = demoMarket.currency || '﷼';
  const rowDirection = isRTL ? 'row-reverse' : 'row';
  const textAlignStart = isRTL ? 'right' : 'left';
  const textAlignEnd = isRTL ? 'left' : 'right';
  const dictionary = translations[language] || translations.ar;

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
