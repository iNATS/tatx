"use client";

import { Navbar } from '@/components/layout/Navbar';
import { CategorySlider } from '@/components/home/CategorySlider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Clock, Heart, ArrowLeft, Search, Zap, MapPin } from 'lucide-react';
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
import { Input } from '@/components/ui/input';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background">
        {/* Material Design 3 Hero Section */}
        <section className="relative pt-16 pb-24 md:pt-24 md:pb-36 overflow-hidden">
          {/* Subtle MD3 backgrounds/gradients */}
          <div className="absolute top-0 right-0 w-full h-full bg-primary/5 -z-10" />
          <div className="absolute top-1/4 -right-24 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mr-0 ml-auto text-right">
              <Badge className="bg-primary/10 text-primary border-none font-black px-6 py-2 rounded-full mb-8 text-sm md:text-base animate-in fade-in slide-in-from-right-10 duration-700">
                أهلاً بك في عالم تاتكس الجديد ✨
              </Badge>
              
              <h1 className="text-6xl md:text-9xl font-black mb-8 leading-[1.1] tracking-tighter text-foreground animate-in fade-in slide-in-from-right-10 duration-1000">
                كل احتياجاتك..<br />
                <span className="text-primary">بلمسة واحدة.</span>
              </h1>
              
              <p className="text-xl md:text-3xl mb-12 text-muted-foreground font-bold max-w-2xl mr-0 ml-auto leading-relaxed animate-in fade-in slide-in-from-right-10 duration-1000 delay-200">
                من وجبتك المفضلة إلى حجز قاعتك الخاصة.. كل ما تحتاجه في مكان واحد بأمان وسرعة فائقة.
              </p>

              {/* MD3 Tonal Search Bar */}
              <div className="relative max-w-2xl mr-0 ml-auto mb-10 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
                <div className="bg-white p-2 rounded-[2.5rem] shadow-xl md-elevation-2 border border-border flex items-center flex-row-reverse group transition-all focus-within:ring-4 focus-within:ring-primary/10">
                  <div className="flex-1 px-4">
                    <Input 
                      placeholder="ابحث عن مطعم، شاليه، أو خدمة صيانة..." 
                      className="border-none bg-transparent h-16 text-xl md:text-2xl font-black placeholder:text-muted-foreground/50 focus-visible:ring-0 shadow-none text-right"
                    />
                  </div>
                  <Button className="h-14 w-14 md:h-16 md:w-16 rounded-full bg-primary hover:bg-primary/90 text-white p-0 shrink-0 shadow-none border-none group-hover:scale-105 transition-transform">
                    <Search className="w-7 h-7" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Visual Elements - Hero Side */}
          <div className="absolute top-1/2 left-[5%] -translate-y-1/2 hidden xl:block w-[500px] h-[600px] animate-in fade-in zoom-in duration-1000">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-secondary rounded-[3.5rem] -rotate-6 shadow-xl" />
              <div className="absolute inset-4 bg-white rounded-[3rem] shadow-lg overflow-hidden border border-border">
                <Image 
                  src="https://picsum.photos/seed/tatx-md3-hero/1000/1200" 
                  alt="Tatx Hub" 
                  fill 
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              
              {/* MD3 Style Badge Card */}
              <div className="absolute top-12 -right-8 bg-white/95 backdrop-blur-xl p-5 rounded-[2rem] shadow-xl border border-border flex items-center gap-4 flex-row-reverse animate-float">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg rotate-12">
                  <Zap className="w-6 h-6" />
                </div>
                <div className="text-right">
                  <span className="block font-black text-base">حجز فوري</span>
                  <span className="text-xs text-muted-foreground font-bold">تأكيد تلقائي للطلبات</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          {/* Categories Slider (MD3 Tonal Chips) */}
          <div className="mb-20">
            <div className="text-right mb-8">
              <h2 className="text-3xl md:text-4xl font-black mb-2 tracking-tight">تصفح حسب الفئة</h2>
              <p className="text-base text-muted-foreground font-bold">كل الخدمات التي تحتاجها في تصنيفات واضحة</p>
            </div>
            <CategorySlider />
          </div>

          {/* Featured Items (MD3 Elevated Cards) */}
          <section className="mb-24">
            <div className="flex items-center justify-between mb-10 flex-row-reverse">
              <div className="text-right">
                <h2 className="text-4xl md:text-5xl font-black mb-2 tracking-tight">عروض تاتكس المميزة</h2>
                <p className="text-lg text-muted-foreground font-bold">أفضل الأسعار والخدمات المختارة لك بعناية</p>
              </div>
              <Button variant="ghost" className="text-primary font-black text-lg gap-2 flex-row-reverse group hover:bg-primary/5 shadow-none rounded-2xl h-12">
                 عرض الكل
                 <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </Button>
            </div>
            
            <div className="relative">
              <Carousel className="w-full" opts={{ direction: 'rtl', align: 'start' }}>
                <CarouselContent className="-ml-6">
                  {FEATURED_ITEMS.map((item) => (
                    <CarouselItem key={item.id} className="pl-6 basis-full md:basis-1/2 lg:basis-1/3">
                      <Link href={['chalets', 'halls', 'services'].includes(item.category) ? `/item/${item.id}` : `/provider/${item.providerId}`}>
                        <Card className="relative overflow-hidden group border-none bg-surface rounded-[2.5rem] shadow-sm md-elevation-1 h-[520px] transition-all duration-500 hover:md-elevation-3 hover:-translate-y-2">
                          <Image 
                            src={item.image} 
                            alt={item.name} 
                            fill 
                            className="object-cover transition-transform duration-700 group-hover:scale-110" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                          
                          <div className="absolute top-6 right-6 z-20">
                            <Badge className="bg-primary text-white font-black px-5 py-2 text-xl rounded-2xl shadow-xl flex items-center gap-1.5 flex-row-reverse">
                              <span>{item.price}</span>
                              <span className="text-sm">ر.س</span>
                            </Badge>
                          </div>

                          <div className="absolute top-6 left-6 z-20">
                            <Badge className="bg-white/20 backdrop-blur-md text-white border-none font-black px-4 py-1.5 rounded-xl text-xs">
                              {CATEGORIES.find(c => c.id === item.category)?.name}
                            </Badge>
                          </div>

                          <CardContent className="absolute inset-0 p-8 flex flex-col justify-end text-right text-white z-10">
                            <h3 className="text-3xl font-black mb-3 group-hover:text-primary-foreground/90 transition-colors leading-tight">{item.name}</h3>
                            <p className="text-white/80 text-base font-bold line-clamp-2 mb-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                              {item.description}
                            </p>
                            <Button className="rounded-2xl font-black text-base px-8 py-6 bg-primary text-white hover:bg-white hover:text-primary transition-all shadow-lg flex items-center gap-2 flex-row-reverse w-fit mr-0 ml-auto group/btn border-none">
                               {['chalets', 'halls', 'services'].includes(item.category) ? 'عرض التفاصيل' : 'اطلب الآن'}
                               <ArrowLeft className="w-5 h-5 group-hover/btn:-translate-x-1 transition-transform" />
                            </Button>
                          </CardContent>
                        </Card>
                      </Link>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="hidden md:block">
                  <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md shadow-lg border-none h-14 w-14 text-primary rounded-full transition-all hover:bg-primary hover:text-white" />
                  <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md shadow-lg border-none h-14 w-14 text-primary rounded-full transition-all hover:bg-primary hover:text-white" />
                </div>
              </Carousel>
            </div>
          </section>

          {/* Dynamic Content Rows (MD3 Style) */}
          {CATEGORIES.filter(cat => cat.id !== 'taxi').map((cat) => {
            const categoryItems = MENU_ITEMS.filter(item => item.category === cat.id).slice(0, 8);
            const provider = PROVIDERS.find(p => p.category === cat.id);
            const href = `/provider/${provider?.id}`;

            return (
              <section key={cat.id} className="mb-20">
                <div className="flex items-center justify-between mb-8 flex-row-reverse">
                  <div className="text-right">
                    <h2 className="text-3xl font-black text-foreground tracking-tight">{cat.name}</h2>
                    <p className="text-sm text-muted-foreground font-bold mt-1">خيارات مختارة لك من {cat.name}</p>
                  </div>
                  <Link href={href}>
                    <Button variant="ghost" className="text-primary font-black text-base gap-2 flex-row-reverse p-0 hover:bg-transparent shadow-none h-auto">
                      مشاهدة المزيد
                      <ArrowLeft className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>

                <div className="relative">
                  <Carousel className="w-full" opts={{ direction: 'rtl', align: 'start' }}>
                    <CarouselContent className="-ml-4">
                      {categoryItems.map((item) => {
                        const itemHref = ['chalets', 'halls', 'services'].includes(item.category) 
                          ? `/item/${item.id}` 
                          : href;
                        return (
                          <CarouselItem key={item.id} className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
                            <Link href={itemHref}>
                              <Card className="overflow-hidden group border-none bg-white rounded-[2rem] shadow-sm md-elevation-1 hover:shadow-xl transition-all duration-500 h-full hover:-translate-y-2">
                                <div className="relative aspect-square overflow-hidden bg-secondary/30">
                                  <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                  <div className="absolute top-3 right-3">
                                    <Badge className="bg-white/90 text-primary font-black border-none text-[10px] px-2.5 py-1 rounded-lg shadow-sm">
                                      {item.price} ر.س
                                    </Badge>
                                  </div>
                                </div>
                                <CardContent className="p-4 text-right">
                                  <h3 className="text-sm font-black mb-1 line-clamp-1 group-hover:text-primary transition-colors">{item.name}</h3>
                                  <p className="text-[10px] text-muted-foreground font-bold">{provider?.name}</p>
                                </CardContent>
                              </Card>
                            </Link>
                          </CarouselItem>
                        );
                      })}
                    </CarouselContent>
                    <div className="hidden md:block">
                      <CarouselPrevious className="absolute -left-6 top-1/2 -translate-y-1/2 bg-white/90 shadow-md border-none h-10 w-10 text-primary rounded-full" />
                      <CarouselNext className="absolute -right-6 top-1/2 -translate-y-1/2 bg-white/90 shadow-md border-none h-10 w-10 text-primary rounded-full" />
                    </div>
                  </Carousel>
                </div>
              </section>
            );
          })}
        </div>
      </main>
      
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(12deg); }
          50% { transform: translateY(-15px) rotate(12deg); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}