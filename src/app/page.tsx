
"use client";

import { Navbar } from '@/components/layout/Navbar';
import { CategorySlider } from '@/components/home/CategorySlider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Clock, Heart, ArrowLeft, ArrowRight, Car, Package, ChevronLeft, ShieldCheck, Zap } from 'lucide-react';
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
        {/* New Modern Hero Section */}
        <section className="relative pt-20 pb-32 overflow-hidden bg-[#fafafa]">
          {/* Background Decorative Elements */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 rounded-bl-[100px] -z-10" />
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
          
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <div className="text-right order-2 lg:order-1 animate-in fade-in slide-in-from-right-10 duration-1000">
                <div className="inline-flex items-center gap-2 mb-6 bg-white px-4 py-2 rounded-2xl shadow-sm border border-border/50">
                  <Badge className="bg-primary text-white border-none px-2 py-0.5 rounded-lg text-[10px] font-black uppercase">جديد</Badge>
                  <span className="text-muted-foreground font-bold text-xs">تاتكس برو - استمتع بتوصيل مجاني غير محدود</span>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[1.1] tracking-tight text-foreground">
                  كل ما تتمناه <br />
                  <span className="text-primary italic">في متناول يدك.</span>
                </h1>
                
                <p className="text-lg md:text-xl mb-12 text-muted-foreground font-medium max-w-xl mr-0 ml-auto leading-relaxed">
                  تاتكس هو رفيقك الرقمي الأول في المملكة. اطلب طعامك، مشوارك، أو حتى صيانة منزلك بضغطة زر واحدة بكل أمان وسهولة من مكان واحد.
                </p>

                <div className="flex flex-wrap gap-4 justify-start flex-row-reverse mb-12">
                  <Button size="lg" className="rounded-2xl px-10 text-lg font-black bg-primary hover:bg-primary/90 h-16 shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95 border-none">
                    استكشف الخدمات
                  </Button>
                  <Link href="/taxi">
                    <Button size="lg" variant="outline" className="rounded-2xl px-10 text-lg font-black bg-white text-foreground border-2 hover:bg-secondary h-16 transition-all hover:scale-105 active:scale-95 shadow-none">
                      اطلب مشوار الآن
                    </Button>
                  </Link>
                </div>

                {/* Features Row */}
                <div className="flex items-center gap-8 justify-start flex-row-reverse">
                  <div className="flex items-center gap-3 text-right">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-primary">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="block font-black text-sm">أمان تام</span>
                      <span className="text-[10px] text-muted-foreground font-bold">بضمان تاتكس</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-right">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-primary">
                      <Zap className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="block font-black text-sm">توصيل برق</span>
                      <span className="text-[10px] text-muted-foreground font-bold">خلال دقائق</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Element */}
              <div className="relative order-1 lg:order-2 h-[400px] md:h-[550px] animate-in fade-in zoom-in-95 duration-1000">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-[4rem] -rotate-3 scale-95" />
                <div className="relative h-full w-full rounded-[4rem] overflow-hidden shadow-2xl ring-1 ring-border">
                  <Image 
                    src="https://picsum.photos/seed/tatx-lifestyle-1/1200/1200"
                    alt="تاتكس - أسلوب حياة"
                    fill
                    className="object-cover"
                    priority
                    data-ai-hint="lifestyle Saudi"
                  />
                  {/* Floating App Card */}
                  <div className="absolute bottom-10 right-10 left-10 bg-white/90 backdrop-blur-xl p-6 rounded-[2.5rem] shadow-2xl border border-white/20 flex items-center justify-between flex-row-reverse">
                    <div className="flex items-center gap-4 flex-row-reverse">
                       <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white">
                          <Car className="w-7 h-7" />
                       </div>
                       <div className="text-right">
                          <span className="block font-black text-base">تاكسي تاتكس</span>
                          <span className="text-xs text-muted-foreground font-bold">مشوارك الآن في 3 دقائق</span>
                       </div>
                    </div>
                    <div className="bg-primary/10 text-primary font-black px-4 py-2 rounded-xl text-sm">
                       اطلب
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          {/* Categories Slider */}
          <div className="mb-16">
            <h2 className="text-3xl font-black mb-2 text-right">الأقسام</h2>
            <p className="text-muted-foreground text-right mb-4 font-bold">ما الذي تبحث عنه اليوم؟</p>
            <CategorySlider />
          </div>

          {/* Featured Items Section */}
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
                          <Image 
                            src={item.image} 
                            alt={item.name} 
                            fill 
                            className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-60" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                          <div className="absolute top-6 right-6 z-20 flex flex-col gap-3">
                            <Button size="icon" className="rounded-full bg-white/10 backdrop-blur text-white hover:bg-primary hover:text-white transition-all shadow-none border-none h-12 w-12">
                              <Heart className="w-6 h-6" />
                            </Button>
                          </div>
                          <CardContent className="absolute inset-0 p-8 flex flex-col justify-between text-right text-white z-10">
                            <div className="flex justify-between items-start flex-row-reverse">
                              <div className="bg-primary text-white font-black px-4 py-1.5 text-xl rounded-xl shadow-xl flex items-center gap-1 flex-row-reverse">
                                <span>{item.price}</span>
                                <span className="text-xs">ر.س</span>
                              </div>
                              <Badge className="bg-white/20 backdrop-blur text-white border-none font-black px-3 py-1 rounded-lg">
                                {CATEGORIES.find(c => c.id === item.category)?.name}
                              </Badge>
                            </div>
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

          {/* Dynamic Sections per Category */}
          {CATEGORIES.filter(cat => cat.id !== 'taxi').map((cat) => {
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
