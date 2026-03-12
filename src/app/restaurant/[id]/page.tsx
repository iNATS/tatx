
"use client";

import { useParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { RESTAURANTS, MENU_ITEMS } from '@/lib/data';
import Image from 'next/image';
import { Star, Clock, ShoppingBag, Plus, Minus, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/store/use-cart';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

export default function RestaurantPage() {
  const params = useParams();
  const id = params.id as string;
  const restaurant = RESTAURANTS.find(r => r.id === id);
  const menuItems = MENU_ITEMS.filter(m => m.restaurantId === id);
  const { addItem, cart, updateQuantity } = useCart();
  const { toast } = useToast();

  if (!restaurant) return <div>Restaurant not found</div>;

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      restaurantId: id,
      image: item.image
    });
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your order.`,
    });
  };

  const getItemQuantity = (itemId: string) => {
    return cart.find(i => i.id === itemId)?.quantity || 0;
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background">
        {/* Header Section */}
        <section className="relative h-[300px]">
          <Image 
            src={restaurant.image}
            alt={restaurant.name}
            fill
            className="object-cover brightness-[0.7]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-8 relative z-10 text-white">
            <h1 className="text-4xl md:text-5xl font-black mb-4">{restaurant.name}</h1>
            <div className="flex flex-wrap items-center gap-6 text-sm md:text-base font-medium">
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur px-3 py-1 rounded-full border border-white/20">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{restaurant.rating} (500+ ratings)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{restaurant.deliveryTime}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShoppingBag className="w-4 h-4" />
                <span>Min. {restaurant.minOrder} SAR</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Info className="w-4 h-4" />
                <span>Restaurant info</span>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Sidebar Categories */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <h3 className="text-xl font-bold mb-6">Menu Categories</h3>
                <nav className="space-y-2">
                  {['Popular', 'Main Courses', 'Burgers', 'Sides', 'Beverages'].map((cat) => (
                    <button 
                      key={cat} 
                      className="w-full text-left px-4 py-2 rounded-lg hover:bg-primary/10 hover:text-primary font-medium transition-colors"
                    >
                      {cat}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Menu Items */}
            <div className="lg:col-span-3">
              <div className="mb-12">
                <h2 className="text-3xl font-black mb-8 flex items-center gap-2">
                  <div className="w-2 h-8 bg-primary rounded-full" />
                  Popular Items
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {menuItems.map((item) => {
                    const quantity = getItemQuantity(item.id);
                    return (
                      <Card key={item.id} className="overflow-hidden group hover:shadow-lg transition-all border-none bg-card">
                        <div className="flex flex-col sm:flex-row">
                          <div className="relative w-full sm:w-40 h-40">
                            <Image 
                              src={item.image} 
                              alt={item.name} 
                              fill 
                              className="object-cover"
                            />
                          </div>
                          <CardContent className="flex-1 p-5 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{item.name}</h3>
                                <span className="text-primary font-black">{item.price} SAR</span>
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                {item.description}
                              </p>
                            </div>
                            
                            <div className="flex justify-end">
                              {quantity > 0 ? (
                                <div className="flex items-center gap-4 bg-primary/10 rounded-full px-2 py-1">
                                  <Button 
                                    size="icon" 
                                    variant="ghost" 
                                    className="h-8 w-8 rounded-full text-primary hover:bg-primary hover:text-white"
                                    onClick={() => updateQuantity(item.id, -1)}
                                  >
                                    <Minus className="w-4 h-4" />
                                  </Button>
                                  <span className="font-bold text-primary">{quantity}</span>
                                  <Button 
                                    size="icon" 
                                    variant="ghost" 
                                    className="h-8 w-8 rounded-full text-primary hover:bg-primary hover:text-white"
                                    onClick={() => updateQuantity(item.id, 1)}
                                  >
                                    <Plus className="w-4 h-4" />
                                  </Button>
                                </div>
                              ) : (
                                <Button 
                                  size="sm" 
                                  className="rounded-full px-4 gap-2 font-bold"
                                  onClick={() => handleAddToCart(item)}
                                >
                                  <Plus className="w-4 h-4" />
                                  Add
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>

              <Separator className="my-12" />

              <div>
                <h2 className="text-3xl font-black mb-8 flex items-center gap-2">
                  <div className="w-2 h-8 bg-primary rounded-full" />
                  Full Menu
                </h2>
                <div className="space-y-6">
                  {/* Additional menu sections could go here */}
                  <p className="text-muted-foreground italic">More delicious options coming soon...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
