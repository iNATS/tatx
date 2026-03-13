
"use client";

import { Navbar } from '@/components/layout/Navbar';
import { CategorySlider } from '@/components/home/CategorySlider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Clock, Heart, ArrowLeft, ArrowRight } from 'lucide-react';
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
                تاتكس تبيع لك كل شيء مباشرة: طعام، مستلزمات منزلية، أدوية، وحتى مشوارك القادم.
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

          {/* Featured Items Carousel Section */}
          <section className="mb-20">
            <div className="flex items-center justify-between mb-8 flex-row">
              <Button variant="link" className="text-primary font-black text-lg p-0 shadow-none">عرض الكل</Button>
              <h2 className="text-3xl font-black text-right">عروض تاتكس المميزة</h2>
            </div>
            <div className="relative px-4">
              <Carousel className="w-full" opts={{ direction: 'rtl', align: 'start' }}>
                <CarouselContent className="-ml-4">
                  {FEATURED_ITEMS.map((item) => (
                    <CarouselItem key={item.id} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                      <Card className="overflow-hidden group border-none bg-white rounded-[2rem] ring-1 ring-border/50 shadow-none h-full">
                        <div className="relative h-56">
                          <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                          <div className="absolute top-4 right-4">
                            <Button size="icon" className="rounded-full bg-white/90 text-primary hover:bg-white shadow-none">
                              <Heart className="w-5 h-5" />
                            </Button>
                          </div>
                          <div className="absolute bottom-4 left-4">
                            <Badge className="bg-primary text-white font-black px-4 py-2 text-lg shadow-none rounded-xl">
                              {item.price} ر.س
                            </Badge>
                          </div>
                        </div>
                        <CardContent className="p-8 text-right flex flex-col items-end justify-between h-[240px]">
                          <div className="w-full">
                            <h3 className="text-2xl font-black mb-3 group-hover:text-primary transition-colors text-right">{item.name}</h3>
                            <p className="text-muted-foreground text-base font-bold mb-6 line-clamp-2 text-right">{item.description}</p>
                          </div>
                          <Link href={['chalets', 'halls', 'services'].includes(item.category) ? `/item/${item.id}` : `/provider/${item.providerId}`} className="w-full">
                            <Button className="w-full rounded-2xl font-black text-lg py-7 bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all shadow-none">
                              {['chalets', 'halls', 'services'].includes(item.category) ? 'عرض التفاصيل' : 'تسوق الآن'}
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="absolute top-1/2 -left-4 -translate-y-1/2 z-10">
                  <CarouselPrevious className="relative left-0 bg-white/80 backdrop-blur shadow-none border-none hover:bg-white" />
                </div>
                <div className="absolute top-1/2 -right-4 -translate-y-1/2 z-10">
                  <CarouselNext className="relative right-0 bg-white/80 backdrop-blur shadow-none border-none hover:bg-white" />
                </div>
              </Carousel>
            </div>
          </section>

          {/* Platform Services Sections */}
          {CATEGORIES.map((cat) => {
            const provider = PROVIDERS.find(p => p.category === cat.id);
            if (!provider && cat.id !== 'taxi') return null;

            const href = cat.id === 'taxi' ? '/taxi' : `/provider/${provider?.id}`;
            const categoryItems = MENU_ITEMS.filter(item => item.category === cat.id).slice(0, 10);
            const isTaxi = cat.id === 'taxi';

            return (
              <section key={cat.id} className="mb-20">
                <div className="flex items-center justify-between mb-8 flex-row border-r-8 border-primary pr-6">
                  <Link href={href}>
                    <Button variant="ghost" className="text-primary font-black text-lg gap-3 flex-row-reverse p-0 hover:bg-transparent shadow-none">
                      اكتشف المزيد
                      <ArrowLeft className="w-6 h-6" />
                    </Button>
                  </Link>
                  <h2 className="text-4xl font-black text-right">{cat.name}</h2>
                </div>
                <Card className="group border-none shadow-none hover:bg-secondary/20 transition-all rounded-[2.5rem] p-8 lg:p-12 bg-secondary/10 overflow-hidden">
                  <div className="flex flex-col md:flex-row-reverse gap-10 lg:gap-16 items-center mb-12">
                    <div className="relative w-full md:w-80 h-80 rounded-[2rem] overflow-hidden flex-shrink-0">
                      <Image 
                        src={isTaxi ? 'https://picsum.photos/seed/tatx-taxi/600/400' : provider?.image || ''} 
                        alt={cat.name} 
                        fill 
                        className="object-cover transition-transform group-hover:scale-105 duration-700" 
                      />
                    </div>
                    <div className="flex-1 text-right py-4 flex flex-col items-end">
                      <h3 className="text-4xl lg:text-5xl font-black mb-6 text-right w-full">{isTaxi ? 'تاتكس مشاوير' : provider?.name}</h3>
                      <p className="text-xl lg:text-2xl text-muted-foreground mb-10 font-bold text-right w-full leading-relaxed">
                        {isTaxi ? 'احجز رحلتك القادمة الآن بأفضل الأسعار وأعلى مستويات الأمان.' : provider?.description}
                      </p>
                      <div className="flex items-center gap-10 flex-row-reverse text-xl font-black text-primary mb-8 w-full justify-end">
                         <span className="flex items-center gap-3"><Star className="w-7 h-7 fill-primary" /> {isTaxi ? '5.0' : provider?.rating} تقييم المنصة</span>
                         <span className="text-muted-foreground/30 font-thin">|</span>
                         <span>{isTaxi ? 'حجز فوري' : (provider?.deliveryTime || 'خدمة فورية')}</span>
                      </div>
                      <Link href={href}>
                        <Button className="px-16 py-8 rounded-2xl text-2xl font-black shadow-none border-none bg-primary hover:bg-primary/90">
                          {isTaxi ? 'احجز الآن' : 'عرض الكل'}
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Sample Products for all categories except Taxi */}
                  {!isTaxi && categoryItems.length > 0 && (
                    <div className="mt-12 pt-12 border-t border-primary/10">
                      <div className="flex items-center justify-between mb-8 flex-row">
                         <Link href={href}>
                           <Button variant="link" className="text-primary font-black text-lg p-0 h-auto shadow-none">تصفح الكل</Button>
                         </Link>
                         <h4 className="text-2xl font-black">وصلنا حديثاً في {cat.name}</h4>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {categoryItems.map(item => {
                          const itemHref = ['chalets', 'halls', 'services'].includes(item.category) 
                            ? `/item/${item.id}` 
                            : href;
                          return (
                            <Link href={itemHref} key={item.id}>
                              <div className="bg-white rounded-[1.5rem] p-4 flex flex-col items-center text-center group cursor-pointer transition-all border border-transparent hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
                                <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-4">
                                  <Image 
                                    src={item.image} 
                                    alt={item.name} 
                                    fill 
                                    className="object-cover transition-transform group-hover:scale-110 duration-500" 
                                  />
                                </div>
                                <span className="text-sm font-black line-clamp-1 mb-2 text-right w-full px-1">{item.name}</span>
                                <span className="text-primary font-black text-lg text-right w-full px-1">{item.price} ر.س</span>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </Card>
              </section>
            );
          })}
        </div>
      </main>
    </>
  );
}
