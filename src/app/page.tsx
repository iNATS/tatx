
"use client";

import { Navbar } from '@/components/layout/Navbar';
import { CategorySlider } from '@/components/home/CategorySlider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Clock, Heart, ArrowLeft, ArrowRight, Car, Package, ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FEATURED_ITEMS, PROVIDERS, CATEGORIES, MENU_ITEMS } from '@/lib/data';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from '@/lib/utils';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white">
        {/* Hero Section */}
        <section className="relative h-[450px] flex items-center overflow-hidden">
          <Image 
            src="https://picsum.photos/seed/tatx-hero/1200/600"
            alt="تاتكس - كل احتياجاتك"
            fill
            className="object-cover brightness-[0.5]"
            priority
          />
          <div className="container mx-auto px-4 relative z-10 text-white">
            <div className="max-w-2xl animate-in slide-in-from-right duration-700 text-right">
              <Badge className="mb-4 bg-primary text-white border-none font-black px-6 py-2 text-sm rounded-full shadow-none">
                منصة تاتكس الشاملة
              </Badge>
              <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                كل احتياجاتك <br />
                <span className="text-primary italic">من منصة واحدة.</span>
              </h1>
              <p className="text-xl mb-10 text-gray-200 font-medium">
                تاتكس توفر لك كل شيء مباشرة: طعام، مستلزمات منزلية، أدوية، وحتى مشوارك القادم.
              </p>
              <div className="flex gap-4 justify-start flex-row-reverse">
                <Button size="lg" className="rounded-full px-10 text-xl font-black bg-primary hover:bg-primary/90 h-14 shadow-none">
                  ابدأ التسوق
                </Button>
                <Link href="/taxi">
                  <Button size="lg" variant="outline" className="rounded-full px-10 text-xl font-black bg-white/10 backdrop-blur text-white border-white/40 hover:bg-white/20 h-14 shadow-none">
                    اطلب تاكسي
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          {/* Categories Slider */}
          <div className="mb-16">
            <h2 className="text-3xl font-black mb-2 text-right">الأقسام</h2>
            <p className="text-muted-foreground text-right mb-4">ما الذي تبحث عنه اليوم؟</p>
            <CategorySlider />
          </div>

          {/* Featured Items Section - Redesigned with Full Background Images */}
          <section className="mb-20">
            <div className="flex items-center justify-between mb-8 flex-row">
              <Button variant="link" className="text-primary font-black text-lg p-0 shadow-none">عرض الكل</Button>
              <h2 className="text-3xl font-black text-right">عروض تاتكس المميزة</h2>
            </div>
            <div className="relative">
              <Carousel className="w-full" opts={{ direction: 'rtl', align: 'start' }}>
                <CarouselContent className="-ml-4">
                  {FEATURED_ITEMS.map((item) => (
                    <CarouselItem key={item.id} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                      <Link href={['chalets', 'halls', 'services'].includes(item.category) ? `/item/${item.id}` : `/provider/${item.providerId}`}>
                        <Card className="relative overflow-hidden group border-none bg-black rounded-[2.5rem] shadow-none h-[450px] transition-all duration-500 hover:ring-4 hover:ring-primary/20">
                          {/* Background Image */}
                          <Image 
                            src={item.image} 
                            alt={item.name} 
                            fill 
                            className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-60" 
                          />
                          
                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                          {/* Top Badges */}
                          <div className="absolute top-6 right-6 z-20 flex flex-col gap-3">
                            <Button size="icon" className="rounded-full bg-white/10 backdrop-blur text-white hover:bg-primary hover:text-white transition-all shadow-none border-none h-12 w-12">
                              <Heart className="w-6 h-6" />
                            </Button>
                          </div>

                          {/* Content Overlay */}
                          <CardContent className="absolute inset-0 p-8 flex flex-col justify-between text-right text-white z-10">
                            {/* Top info - Price moved here */}
                            <div className="flex justify-between items-start flex-row-reverse">
                              <div className="bg-primary text-white font-black px-4 py-1.5 text-xl rounded-xl shadow-xl flex items-center gap-1 flex-row-reverse">
                                <span>{item.price}</span>
                                <span className="text-xs">ر.س</span>
                              </div>
                              <Badge className="bg-white/20 backdrop-blur text-white border-none font-black px-3 py-1 rounded-lg">
                                {CATEGORIES.find(c => c.id === item.category)?.name}
                              </Badge>
                            </div>
                            
                            {/* Bottom info */}
                            <div className="space-y-4">
                              <div>
                                <h3 className="text-3xl font-black mb-2 leading-tight group-hover:text-primary transition-colors">{item.name}</h3>
                                <p className="text-white/80 text-sm font-bold line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                                  {item.description}
                                </p>
                              </div>

                              <div className="pt-2">
                                <Button className="rounded-xl font-black text-base px-8 bg-primary text-white hover:bg-white hover:text-primary transition-all shadow-none flex items-center gap-2 flex-row-reverse w-fit mr-0 ml-auto">
                                   {['chalets', 'halls', 'services'].includes(item.category) ? 'تفاصيل الحجز' : 'اطلب الآن'}
                                   <ArrowLeft className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="hidden md:block">
                  <CarouselPrevious className="absolute -left-6 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur shadow-none border-none h-12 w-12 hover:bg-white text-primary" />
                  <CarouselNext className="absolute -right-6 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur shadow-none border-none h-12 w-12 hover:bg-white text-primary" />
                </div>
              </Carousel>
            </div>
          </section>

          {/* Dynamic Sections per Category - Slider Layout */}
          {CATEGORIES.map((cat) => {
            if (cat.id === 'taxi') {
              return (
                <section key={cat.id} className="mb-20">
                   <div className="flex items-center justify-between mb-8 flex-row border-r-8 border-primary pr-6">
                    <Link href="/taxi">
                      <Button variant="ghost" className="text-primary font-black text-lg gap-3 flex-row-reverse p-0 hover:bg-transparent shadow-none">
                        اطلب الآن
                        <ArrowLeft className="w-6 h-6" />
                      </Button>
                    </Link>
                    <h2 className="text-4xl font-black text-right">{cat.name}</h2>
                  </div>
                  <Link href="/taxi">
                    <Card className="group border-none shadow-none hover:bg-secondary/20 transition-all rounded-[2.5rem] p-8 lg:p-12 bg-secondary/10 overflow-hidden flex flex-col md:flex-row-reverse items-center gap-8">
                       <div className="relative w-full md:w-80 h-48 md:h-64 rounded-3xl overflow-hidden shrink-0">
                          <Image src="https://picsum.photos/seed/tatx-taxi-home/600/400" alt="Taxi" fill className="object-cover group-hover:scale-105 duration-700" />
                       </div>
                       <div className="text-right flex-1">
                          <h3 className="text-3xl font-black mb-4">مشاوير تاتكس السريعة</h3>
                          <p className="text-xl text-muted-foreground font-bold mb-6">احجز رحلتك القادمة الآن بأمان تام وأسعار منافسة تبدأ من 15 ريال فقط.</p>
                          <Button className="rounded-2xl px-12 py-7 text-xl font-black bg-primary shadow-none border-none">احجز الآن</Button>
                       </div>
                    </Card>
                  </Link>
                </section>
              );
            }

            const categoryItems = MENU_ITEMS.filter(item => item.category === cat.id).slice(0, 10);
            const provider = PROVIDERS.find(p => p.category === cat.id);
            const href = `/provider/${provider?.id}`;

            return (
              <section key={cat.id} className="mb-20">
                <div className="flex items-center justify-between mb-8 flex-row border-r-8 border-primary pr-6">
                  <Link href={href}>
                    <Button variant="ghost" className="text-primary font-black text-lg gap-3 flex-row-reverse p-0 hover:bg-transparent shadow-none">
                      عرض الكل
                      <ArrowLeft className="w-6 h-6" />
                    </Button>
                  </Link>
                  <h2 className="text-4xl font-black text-right">{cat.name}</h2>
                </div>

                <div className="relative">
                  <Carousel className="w-full" opts={{ direction: 'rtl', align: 'start' }}>
                    <CarouselContent className="-ml-4">
                      {categoryItems.map((item) => {
                        const itemHref = ['chalets', 'halls', 'services'].includes(item.category) 
                          ? `/item/${item.id}` 
                          : href;
                        return (
                          <CarouselItem key={item.id} className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                            <Link href={itemHref}>
                              <Card className="overflow-hidden group border-none bg-white rounded-[1.5rem] ring-1 ring-border/50 shadow-none h-full hover:bg-secondary/10 transition-colors">
                                <div className="relative aspect-square">
                                  <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                                  <div className="absolute bottom-2 left-2">
                                    <Badge className="bg-white/90 text-primary font-black px-2 py-1 text-xs shadow-none rounded-lg border-none">
                                      {item.price} ر.س
                                    </Badge>
                                  </div>
                                </div>
                                <CardContent className="p-4 text-right">
                                  <h3 className="text-sm font-black mb-1 line-clamp-1 group-hover:text-primary transition-colors">{item.name}</h3>
                                  <p className="text-[10px] text-muted-foreground font-bold line-clamp-1">{provider?.name}</p>
                                </CardContent>
                              </Card>
                            </Link>
                          </CarouselItem>
                        );
                      })}
                    </CarouselContent>
                    <div className="hidden md:block">
                      <CarouselPrevious className="absolute -left-6 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur shadow-none border-none h-10 w-10 hover:bg-white text-primary" />
                      <CarouselNext className="absolute -right-6 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur shadow-none border-none h-10 w-10 hover:bg-white text-primary" />
                    </div>
                  </Carousel>
                </div>
              </section>
            );
          })}
        </div>
      </main>
    </>
  );
}
