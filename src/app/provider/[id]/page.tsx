
"use client";

import { useParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { PROVIDERS, MENU_ITEMS } from '@/lib/data';
import Image from 'next/image';
import { Star, Clock, ShoppingBag, Plus, Minus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/store/use-cart';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';

export default function ProviderPage() {
  const params = useParams();
  const id = params.id as string;
  const provider = PROVIDERS.find(p => p.id === id);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('الكل');
  
  const { addItem, cart, updateQuantity } = useCart();
  const { toast } = useToast();

  const isMarket = provider?.category === 'market';

  const menuItems = useMemo(() => {
    let items = MENU_ITEMS.filter(m => m.providerId === id);
    
    if (searchQuery) {
      items = items.filter(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    
    if (activeFilter !== 'الكل') {
      items = items.filter(i => i.subCategory === activeFilter);
    }
    
    return items;
  }, [id, searchQuery, activeFilter]);

  const subCategories = useMemo(() => {
    const cats = MENU_ITEMS.filter(m => m.providerId === id).map(i => i.subCategory).filter(Boolean);
    return ['الكل', ...Array.from(new Set(cats))];
  }, [id]);

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
        <section className="relative h-[250px] md:h-[350px]">
          <Image 
            src={provider.image}
            alt={provider.name}
            fill
            className="object-cover brightness-[0.7]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-12 relative z-10 text-white text-right">
            <h1 className="text-3xl md:text-6xl font-black mb-4">{provider.name}</h1>
            <div className="flex flex-wrap items-center justify-start gap-4 text-xs md:text-lg font-bold">
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur px-3 py-1.5 rounded-full border border-white/20">
                <Star className="w-4 h-4 md:w-5 md:h-5 fill-yellow-400 text-yellow-400" />
                <span>{provider.rating}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                <span>{provider.deliveryTime || 'توصيل فوري'}</span>
              </div>
              {provider.minOrder !== undefined && (
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  <span>الحد الأدنى {provider.minOrder} ر.س</span>
                </div>
              )}
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          {/* Filters & Search */}
          <div className="flex flex-col md:flex-row-reverse justify-between gap-6 mb-8">
            <div className="relative w-full md:w-96">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="ابحث عن منتج..." 
                className="pr-12 h-12 rounded-2xl bg-secondary/50 border-none shadow-none text-right font-bold focus-visible:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 flex-row-reverse">
              {subCategories.map((cat) => (
                <Button 
                  key={cat}
                  variant={activeFilter === cat ? "default" : "secondary"}
                  className={cn(
                    "rounded-2xl px-6 h-12 font-black shadow-none transition-all whitespace-nowrap",
                    activeFilter === cat ? "bg-primary text-white" : "bg-secondary text-foreground hover:bg-secondary/80"
                  )}
                  onClick={() => setActiveFilter(cat!)}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Categories (Only for Non-Market) */}
            {!isMarket && (
              <aside className="hidden lg:block">
                <div className="sticky top-24 text-right">
                  <h3 className="text-xl font-black mb-6 border-r-4 border-primary pr-3 flex items-center justify-end gap-2">
                    التصنيفات
                    <Filter className="w-4 h-4 text-primary" />
                  </h3>
                  <nav className="space-y-2">
                    {subCategories.map((cat) => (
                      <button 
                        key={cat} 
                        onClick={() => setActiveFilter(cat!)}
                        className={cn(
                          "w-full text-right px-4 py-3 rounded-2xl font-bold transition-all",
                          activeFilter === cat 
                            ? "bg-primary/10 text-primary border-r-4 border-primary" 
                            : "hover:bg-secondary text-muted-foreground"
                        )}
                      >
                        {cat}
                      </button>
                    ))}
                  </nav>
                </div>
              </aside>
            )}

            {/* Menu Items Grid */}
            <div className={cn("text-right", isMarket ? "lg:col-span-4" : "lg:col-span-3")}>
              <div className="mb-12">
                {menuItems.length > 0 ? (
                  <div className={cn(
                    "grid gap-6",
                    isMarket 
                      ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6" 
                      : "grid-cols-1 md:grid-cols-2"
                  )}>
                    {menuItems.map((item) => {
                      const quantity = getItemQuantity(item.id);
                      
                      if (isMarket) {
                        return (
                          <Card key={item.id} className="overflow-hidden group border-none bg-secondary/20 rounded-2xl shadow-none flex flex-col">
                            <div className="relative aspect-square w-full">
                              <Image 
                                src={item.image} 
                                alt={item.name} 
                                fill 
                                className="object-cover transition-transform group-hover:scale-105"
                              />
                            </div>
                            <CardContent className="flex-1 p-3 flex flex-col text-right">
                              <h3 className="text-sm font-black mb-1 line-clamp-2 min-h-[40px]">{item.name}</h3>
                              <span className="text-primary font-black text-sm mb-3 block">{item.price} ر.س</span>
                              
                              <div className="mt-auto">
                                {quantity > 0 ? (
                                  <div className="flex items-center justify-between bg-primary text-white rounded-xl px-1 py-1">
                                    <Button 
                                      size="icon" 
                                      variant="ghost" 
                                      className="h-7 w-7 rounded-lg text-white hover:bg-white/20 shadow-none"
                                      onClick={() => updateQuantity(item.id, -1)}
                                    >
                                      <Minus className="w-3 h-3" />
                                    </Button>
                                    <span className="font-black text-sm">{quantity}</span>
                                    <Button 
                                      size="icon" 
                                      variant="ghost" 
                                      className="h-7 w-7 rounded-lg text-white hover:bg-white/20 shadow-none"
                                      onClick={() => updateQuantity(item.id, 1)}
                                    >
                                      <Plus className="w-3 h-3" />
                                    </Button>
                                  </div>
                                ) : (
                                  <Button 
                                    size="sm" 
                                    className="w-full rounded-xl gap-2 font-black bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all shadow-none text-xs h-9"
                                    onClick={() => handleAddToCart(item)}
                                  >
                                    أضف
                                  </Button>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        );
                      }

                      return (
                        <Card key={item.id} className="overflow-hidden group border-none bg-secondary/20 rounded-3xl shadow-none">
                          <div className="flex flex-col sm:flex-row-reverse">
                            <div className="relative w-full sm:w-40 h-40">
                              <Image 
                                src={item.image} 
                                alt={item.name} 
                                fill 
                                className="object-cover transition-transform group-hover:scale-105"
                              />
                            </div>
                            <CardContent className="flex-1 p-5 flex flex-col justify-between text-right">
                              <div>
                                <div className="flex justify-between items-start mb-2 flex-row-reverse">
                                  <h3 className="text-lg font-black group-hover:text-primary transition-colors">{item.name}</h3>
                                  <span className="text-primary font-black whitespace-nowrap">{item.price} ر.س</span>
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
                                      className="h-8 w-8 rounded-full text-white hover:bg-white/20 shadow-none"
                                      onClick={() => updateQuantity(item.id, -1)}
                                    >
                                      <Minus className="w-4 h-4" />
                                    </Button>
                                    <span className="font-black">{quantity}</span>
                                    <Button 
                                      size="icon" 
                                      variant="ghost" 
                                      className="h-8 w-8 rounded-full text-white hover:bg-white/20 shadow-none"
                                      onClick={() => updateQuantity(item.id, 1)}
                                    >
                                      <Plus className="w-4 h-4" />
                                    </Button>
                                  </div>
                                ) : (
                                  <Button 
                                    size="sm" 
                                    className="rounded-full px-6 gap-2 font-black bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all shadow-none"
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
                ) : (
                  <div className="text-center py-20 bg-secondary/10 rounded-3xl">
                    <p className="text-muted-foreground font-bold">لا توجد نتائج تطابق بحثك أو التصنيف المختار.</p>
                  </div>
                )}
              </div>
              <Separator className="my-12 opacity-50 shadow-none" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
