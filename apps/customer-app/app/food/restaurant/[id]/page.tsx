'use client';

import { useState } from 'react';
import { Star, Clock, MapPin, Phone, Info, ChevronLeft, ShoppingCart } from 'lucide-react';
import { Button } from '@tatx/ui/button';
import { Badge } from '@tatx/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@tatx/ui/tabs';
import { MenuCategory } from '../../components/food/MenuCategory';
import { CartSummary } from '../../components/food/CartSummary';
import Link from 'next/link';

// Mock data
const RESTAURANT = {
  id: '1',
  name: 'Al-Baik',
  nameAr: 'البيك',
  description: 'Famous Saudi fried chicken restaurant serving delicious meals since 1974',
  descriptionAr: 'مطعم دجاج مشهور سعودي يقدم وجبات لذيذة منذ 1974',
  cuisine: ['Fast Food', 'Arabic', 'Chicken'],
  rating: 4.5,
  totalReviews: 1250,
  deliveryTime: 30,
  deliveryFee: 3.99,
  minOrder: 15.0,
  image: '/images/restaurants/al-baik.jpg',
  gallery: ['/images/restaurants/al-baik-1.jpg', '/images/restaurants/al-baik-2.jpg'],
  phone: '+966 12 345 6789',
  address: 'King Fahd Road, Riyadh',
  isOpen: true,
  badges: ['POPULAR', 'FAST_DELIVERY'],
};

const MENU_CATEGORIES = [
  {
    id: '1',
    name: 'Main Meals',
    nameAr: 'الوجبات الرئيسية',
    description: 'Signature chicken meals',
    items: [
      {
        id: '101',
        name: 'Chicken Meal (8pcs)',
        nameAr: 'وجبة دجاج 8 قطع',
        description: '8 pieces fried chicken with fries and sauce',
        price: 25.0,
        image: '/images/items/chicken-meal.jpg',
        isPopular: true,
        isAvailable: true,
        prepTime: 10,
        calories: 850,
        modifiers: [
          {
            id: 'm1',
            name: 'Extra Sauce',
            nameAr: 'صوص إضافي',
            price: 2.0,
          },
          {
            id: 'm2',
            name: 'Extra Fries',
            nameAr: 'بطاطس إضافية',
            price: 5.0,
          },
        ],
      },
      {
        id: '102',
        name: 'Shrimp Meal (12pcs)',
        nameAr: 'وجبة روبيان 12 قطعة',
        description: '12 pieces fried shrimp with fries and sauce',
        price: 35.0,
        image: '/images/items/shrimp-meal.jpg',
        isPopular: true,
        isAvailable: true,
        prepTime: 12,
        calories: 650,
      },
    ],
  },
  {
    id: '2',
    name: 'Sides',
    nameAr: 'الأطباق الجانبية',
    description: 'Complement your meal',
    items: [
      {
        id: '201',
        name: 'French Fries',
        nameAr: 'بطاطس مقلية',
        description: 'Crispy golden fries',
        price: 6.0,
        image: '/images/items/fries.jpg',
        isAvailable: true,
        prepTime: 5,
        calories: 350,
      },
      {
        id: '202',
        name: 'Coleslaw',
        nameAr: 'سلطة كول سلو',
        description: 'Fresh cabbage salad',
        price: 5.0,
        image: '/images/items/coleslaw.jpg',
        isAvailable: true,
        prepTime: 2,
        calories: 150,
      },
    ],
  },
  {
    id: '3',
    name: 'Beverages',
    nameAr: 'المشروبات',
    description: 'Refresh yourself',
    items: [
      {
        id: '301',
        name: 'Pepsi 330ml',
        nameAr: 'بيبسي 330مل',
        description: 'Cold Pepsi can',
        price: 3.0,
        image: '/images/items/pepsi.jpg',
        isAvailable: true,
        prepTime: 1,
        calories: 140,
      },
    ],
  },
];

export default function RestaurantPage({ params }: { params: { id: string } }) {
  const [cart, setCart] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState(MENU_CATEGORIES[0].id);

  const addToCart = (item: any, modifiers?: any[]) => {
    const cartItem = {
      ...item,
      quantity: 1,
      selectedModifiers: modifiers || [],
      totalPrice: item.price + (modifiers || []).reduce((sum, m) => sum + m.price, 0),
    };

    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, cartItem];
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((i) => i.id !== itemId));
    } else {
      setCart((prev) =>
        prev.map((i) => (i.id === itemId ? { ...i, quantity } : i))
      );
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.totalPrice * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Restaurant Header */}
      <div className="relative h-64 bg-gray-200">
        <img
          src={RESTAURANT.image}
          alt={RESTAURANT.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Back Button */}
        <Link href="/food">
          <Button variant="ghost" size="icon" className="absolute top-4 left-4 text-white hover:bg-white/20">
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </Link>

        {/* Cart Button */}
        {cartCount > 0 && (
          <Link href="/food/cart">
            <Button className="absolute top-4 right-4 bg-white text-gray-900 hover:bg-gray-100">
              <ShoppingCart className="h-5 w-5 mr-2" />
              {cartCount} items
            </Button>
          </Link>
        )}

        {/* Restaurant Info Overlay */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-1">{RESTAURANT.name}</h1>
              <p className="text-white/80">{RESTAURANT.nameAr}</p>
            </div>
            <Badge className={RESTAURANT.isOpen ? 'bg-green-500' : 'bg-red-500'}>
              {RESTAURANT.isOpen ? 'Open' : 'Closed'}
            </Badge>
          </div>
        </div>
      </div>

      {/* Restaurant Details */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-bold text-lg">{RESTAURANT.rating}</span>
              <span className="text-gray-500">({RESTAURANT.totalReviews} reviews)</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <Clock className="h-4 w-4" />
              <span>{RESTAURANT.deliveryTime}-{RESTAURANT.deliveryTime + 10} min</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>{RESTAURANT.deliveryFee} SAR</span>
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-3">{RESTAURANT.description}</p>

          <div className="flex flex-wrap gap-2 mb-3">
            {RESTAURANT.cuisine.map((type, i) => (
              <Badge key={i} variant="secondary">{type}</Badge>
            ))}
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              <span>{RESTAURANT.phone}</span>
            </div>
            <div className="flex items-center gap-1">
              <Info className="h-4 w-4" />
              <span>Min order: {RESTAURANT.minOrder} SAR</span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Tabs */}
      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue={MENU_CATEGORIES[0].id} className="w-full">
          <TabsList className="w-full justify-start overflow-x-auto">
            {MENU_CATEGORIES.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {MENU_CATEGORIES.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <MenuCategory
                category={category}
                onAddToCart={addToCart}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Cart Summary (Bottom Bar) */}
      {cartCount > 0 && (
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
      )}
    </div>
  );
}
