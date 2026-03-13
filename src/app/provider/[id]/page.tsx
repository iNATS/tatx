"use client";

import { useParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { PROVIDERS, MENU_ITEMS } from '@/lib/data';
import Image from 'next/image';
import { Star, Clock, ShoppingBag, Plus, Minus, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/store/use-cart';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

export default function ProviderPage() {
  const params = useParams();
  const id = params.id as string;
  const provider = PROVIDERS.find(p => p.id === id);
  const menuItems = MENU_ITEMS.filter(m => m.providerId === id);
  const { addItem, cart, updateQuantity } = useCart();
  const { toast } = useToast();

  if (!provider) return <div className="text-center py-20 font-black text-2xl">مزود الخدمة غير موجود</div>;

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      restaurantId: id,
      image: item.image
    });
    toast({
      title: "تمت الإضافة للسلة",
      description: `تم إضافة ${item.name} إلى طلبك.`,
    });
  };

  const getItemQuantity = (itemId: string) => {
    return cart.find(i => i.id === itemId)?.quantity || 0;
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white" dir="rtl">
        {/* Header Section */}
        <section className="relative h-[300px]">
          <Image 
            src={provider.image}
            alt={provider.name}
            fill
            className="object-cover brightness-[0.7]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-8 relative z-10 text-white text-right">
            <h1 className="text-4xl md:text-5xl font-black mb-4">{provider.name}</h1>
            <div className="flex flex-wrap items-center justify-start gap-6 text-sm md:text-base font-bold">
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur px-3 py-1 rounded-full border border-white/20">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{provider.rating} (500+ تقييم)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{provider.deliveryTime || 'توصيل سريع'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShoppingBag className="w-4 h-4" />
                <span>الحد الأدنى {provider.minOrder || 0} ر.س</span>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Sidebar Categories */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 text-right">
                <h3 className="text-xl font-black mb-6 border-r-4 border-primary pr-3">الأقسام</h3>
                <nav className="space-y-2">
                  {['الأكثر طلباً', 'القائمة كاملة', 'عروض خاصة'].map((cat) => (
                    <button 
                      key={cat} 
                      className="w-full text-right px-4 py-2 rounded-lg hover:bg-primary/10 hover:text-primary font-bold transition-colors"
                    >
                      {cat}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Menu Items */}
            <div className="lg:col-span-3 text-right">
              <div className="mb-12">
                <h2 className="text-3xl font-black mb-8 flex items-center justify-start gap-2 flex-row-reverse">
                  <div className="w-2 h-8 bg-primary rounded-full" />
                  الأصناف المتوفرة
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {menuItems.map((item) => {
                    const quantity = getItemQuantity(item.id);
                    return (
                      <Card key={item.id} className="overflow-hidden group hover:shadow-lg transition-all border-none bg-secondary/20 rounded-2xl">
                        <div className="flex flex-col sm:flex-row-reverse">
                          <div className="relative w-full sm:w-40 h-40">
                            <Image 
                              src={item.image} 
                              alt={item.name} 
                              fill 
                              className="object-cover"
                            />
                          </div>
                          <CardContent className="flex-1 p-5 flex flex-col justify-between text-right">
                            <div>
                              <div className="flex justify-between items-start mb-2 flex-row-reverse">
                                <h3 className="text-lg font-black group-hover:text-primary transition-colors">{item.name}</h3>
                                <span className="text-primary font-black">{item.price} ر.س</span>
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                {item.description}
                              </p>
                            </div>
                            
                            <div className="flex justify-start">
                              {quantity > 0 ? (
                                <div className="flex items-center gap-4 bg-primary text-white rounded-full px-2 py-1">
                                  <Button 
                                    size="icon" 
                                    variant="ghost" 
                                    className="h-8 w-8 rounded-full text-white hover:bg-white/20"
                                    onClick={() => updateQuantity(item.id, -1)}
                                  >
                                    <Minus className="w-4 h-4" />
                                  </Button>
                                  <span className="font-black">{quantity}</span>
                                  <Button 
                                    size="icon" 
                                    variant="ghost" 
                                    className="h-8 w-8 rounded-full text-white hover:bg-white/20"
                                    onClick={() => updateQuantity(item.id, 1)}
                                  >
                                    <Plus className="w-4 h-4" />
                                  </Button>
                                </div>
                              ) : (
                                <Button 
                                  size="sm" 
                                  className="rounded-full px-6 gap-2 font-black bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all"
                                  onClick={() => handleAddToCart(item)}
                                >
                                  أضف للسلة
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
            </div>
          </div>
        </div>
      </main>
    </>
  );
}