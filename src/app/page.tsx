"use client";

import { Navbar } from '@/components/layout/Navbar';
import { CategorySlider } from '@/components/home/CategorySlider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Clock, Heart, ArrowLeft, Search, Zap, MapPin, Car, ArrowRight, Smartphone } from 'lucide-react';
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
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background">
        {/* Mobile App Landing Hero Section */}
        <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              {/* Right Column: Text Content */}
              <div className="text-right order-1 flex flex-col items-end">
                <Badge className="bg-primary/10 text-primary border-none font-black px-5 py-2 rounded-full mb-8 text-sm md-elevation-1">
                  تطبيق Tatx الجديد متاح الآن 🚀
                </Badge>
                
                <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight text-foreground">
                  كل ما تحتاجه<br />
                  <span className="text-primary">في تطبيق واحد.</span>
                </h1>
                
                <p className="text-xl md:text-2xl mb-12 text-muted-foreground font-bold max-w-xl leading-relaxed">
                  اطلب وجباتك، تسوق احتياجاتك، احجز مشاويرك، أو استأجر شاليهك المفضل.. كل ذلك وأكثر من خلال تطبيق Tatx.
                </p>

                {/* App Store Buttons - Landing Page Style */}
                <div className="flex flex-wrap gap-4 justify-end mb-12 flex-row-reverse">
                  <Button 
                    className="h-[64px] px-8 rounded-2xl bg-black text-white gap-4 shadow-xl hover:scale-105 transition-transform border-none"
                  >
                    <div className="text-right flex flex-col items-end leading-none">
                      <span className="text-[10px] opacity-60">Download on the</span>
                      <span className="text-lg font-black">App Store</span>
                    </div>
                    <Smartphone className="w-8 h-8" />
                  </Button>
                  <Button 
                    className="h-[64px] px-8 rounded-2xl bg-black text-white gap-4 shadow-xl hover:scale-105 transition-transform border-none"
                  >
                    <div className="text-right flex flex-col items-end leading-none">
                      <span className="text-[10px] opacity-60">Get it on</span>
                      <span className="text-lg font-black">Google Play</span>
                    </div>
                    <Zap className="w-8 h-8" />
                  </Button>
                </div>

                {/* Tonal Search for Quick Web Access */}
                <div className="relative w-full max-w-lg">
                  <div 
                    className="bg-secondary/30 p-1.5 rounded-full border border-transparent flex items-center flex-row-reverse group transition-all focus-within:bg-white focus-within:ring-4 focus-within:ring-primary/10 cursor-pointer" 
                    onClick={() => router.push('/search')}
                  >
                    <div className="flex-1 px-6">
                      <Input 
                        placeholder="أو ابحث عن خدمة سريعة هنا..." 
                        className="border-none bg-transparent h-12 text-lg font-bold placeholder:text-muted-foreground focus-visible:ring-0 shadow-none text-right cursor-pointer"
                        readOnly
                      />
                    </div>
                    <Button className="h-12 w-12 rounded-full bg-primary text-white p-0 shrink-0 shadow-none border-none">
                      <Search className="w-6 h-6" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Left Column: Premium Mobile Mockup */}
              <div className="order-2 flex justify-center lg:justify-start relative">
                <div className="relative w-full max-w-[320px]">
                  {/* Decorative Glow */}
                  <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full scale-150 -z-10" />
                  
                  <div className="relative aspect-[9/19] w-full bg-foreground rounded-[3.5rem] p-3 shadow-2xl border-[10px] border-foreground overflow-hidden">
                    <div className="relative w-full h-full rounded-[2.8rem] overflow-hidden bg-white">
                      <Image 
                        src="https://picsum.photos/seed/tatx-mockup/600/1200" 
                        alt="Tatx App Mockup" 
                        fill 
                        className="object-cover"
                        data-ai-hint="mobile app interface"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          {/* Categories Slider */}
          <div className="mb-12">
            <div className="text-right mb-6">
              <h2 className="text-2xl md:text-3xl font-black mb-1 tracking-tight">خدماتنا الشاملة</h2>
              <p className="text-sm text-muted-foreground font-bold">تصفح الفئات المتاحة في Tatx</p>
            </div>
            <CategorySlider />
          </div>

          {/* Taxi Service Banner */}
          <section className="mb-16">
            <Link href="/taxi">
              <Card className="relative overflow-hidden bg-black rounded-[2.5rem] min-h-[280px] flex items-center group cursor-pointer border-none md-elevation-2">
                <div className="absolute inset-0 opacity-40 group-hover:scale-105 transition-transform duration-700">
                  <Image 
                    src="https://picsum.photos/seed/taxi-bg/1200/400" 
                    alt="Tatx Taxi" 
                    fill 
                    className="object-cover"
                    data-ai-hint="city taxi"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
                
                <CardContent className="relative z-10 p-10 flex flex-col md:flex-row-reverse justify-between items-center w-full gap-8">
                  <div className="text-right">
                    <div className="inline-flex items-center gap-2 bg-primary text-white px-4 py-1.5 rounded-full font-black text-xs mb-4">
                      <Car className="w-4 h-4" />
                      جديد
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-4">تاكسي Tatx</h2>
                    <p className="text-white/70 text-lg font-bold max-w-md">مشاويرك اليومية صارت أسهل وأسرع.. اطلب سيارتك الآن واستمتع برحلة آمنة.</p>
                  </div>
                  <Button size="lg" className="h-16 px-10 rounded-2xl bg-white text-black hover:bg-primary hover:text-white font-black text-xl gap-3 transition-all">
                    احجز مشوارك الآن
                    <ArrowLeft className="w-6 h-6" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </section>

          {/* Featured Items */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8 flex-row-reverse text-right">
              <div>
                <h2 className="text-3xl md:text-4xl font-black mb-1 tracking-tight">عروض Tatx المختارة</h2>
                <p className="text-base text-muted-foreground font-bold">أفضل الخدمات بأسعار تنافسية</p>
              </div>
              <Button variant="ghost" className="text-primary font-black text-base gap-2 flex-row-reverse group hover:bg-primary/5 shadow-none rounded-xl h-10">
                 عرض الكل
                 <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </Button>
            </div>
            
            <div className="relative">
              <Carousel className="w-full" opts={{ direction: 'rtl', align: 'start' }}>
                <CarouselContent className="-ml-4">
                  {FEATURED_ITEMS.map((item) => (
                    <CarouselItem key={item.id} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                      <Link href={['chalets', 'halls', 'services'].includes(item.category) ? `/item/${item.id}` : `/provider/${item.providerId}`}>
                        <Card className="relative overflow-hidden group border-none bg-surface rounded-[2rem] shadow-sm h-[420px] transition-all duration-500 hover:shadow-lg hover:-translate-y-1">
                          <Image 
                            src={item.image} 
                            alt={item.name} 
                            fill 
                            className="object-cover transition-transform duration-700 group-hover:scale-110" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                          
                          <div className="absolute top-5 right-5 z-20">
                            <Badge className="bg-primary text-white font-black px-4 py-2 text-xl rounded-2xl shadow-xl flex items-center gap-2 flex-row-reverse">
                              <span>{item.price}</span>
                              <span className="text-xs">ر.س</span>
                            </Badge>
                          </div>

                          <CardContent className="absolute inset-0 p-8 flex flex-col justify-end text-right text-white z-10">
                            <h3 className="text-2xl font-black mb-2 group-hover:text-primary transition-colors leading-tight">{item.name}</h3>
                            <p className="text-white/80 text-base font-bold line-clamp-2 mb-6">
                              {item.description}
                            </p>
                            <div className="flex items-center justify-end flex-row-reverse">
                              <Button className="rounded-2xl font-black text-base px-8 py-6 bg-white text-black hover:bg-primary hover:text-white transition-all shadow-md flex items-center gap-3 flex-row-reverse group/btn border-none">
                                اطلب الآن
                                <ArrowLeft className="w-5 h-5 group-hover/btn:-translate-x-1 transition-transform" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="hidden md:block">
                  <CarouselPrevious className="absolute -left-10 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md shadow-md border-none h-12 w-12 text-primary rounded-full transition-all hover:bg-primary hover:text-white" />
                  <CarouselNext className="absolute -right-10 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md shadow-md border-none h-12 w-12 text-primary rounded-full transition-all hover:bg-primary hover:text-white" />
                </div>
              </Carousel>
            </div>
          </section>

          {/* Dynamic Content Rows */}
          {CATEGORIES.filter(cat => cat.id !== 'taxi').map((cat) => {
            const categoryItems = MENU_ITEMS.filter(item => item.category === cat.id).slice(0, 8);
            const provider = PROVIDERS.find(p => p.category === cat.id);
            const href = `/provider/${provider?.id}`;

            return (
              <section key={cat.id} className="mb-12">
                <div className="flex items-center justify-between mb-6 flex-row-reverse text-right">
                  <div>
                    <h2 className="text-2xl font-black text-foreground tracking-tight">{cat.name}</h2>
                    <p className="text-xs text-muted-foreground font-bold mt-1">أفضل الخيارات في {cat.name}</p>
                  </div>
                  <Link href={href}>
                    <Button variant="ghost" className="text-primary font-black text-sm gap-2 flex-row-reverse p-0 hover:bg-transparent shadow-none h-auto">
                      مشاهدة المزيد
                      <ArrowLeft className="w-3 h-3" />
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
                              <Card className="overflow-hidden group border-none bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-500 h-full">
                                <div className="relative aspect-square overflow-hidden bg-secondary/30">
                                  <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                  <div className="absolute top-2 right-2">
                                    <Badge className="bg-white/90 text-primary font-black border-none text-[10px] px-2 py-0.5 rounded-lg shadow-sm">
                                      {item.price} ر.س
                                    </Badge>
                                  </div>
                                </div>
                                <CardContent className="p-3 text-right">
                                  <h3 className="text-xs font-black mb-1 line-clamp-1 group-hover:text-primary transition-colors">{item.name}</h3>
                                  <p className="text-[10px] text-muted-foreground font-bold">{provider?.name}</p>
                                </CardContent>
                              </Card>
                            </Link>
                          </CarouselItem>
                        );
                      })}
                    </CarouselContent>
                    <div className="hidden md:block">
                      <CarouselPrevious className="absolute -left-6 top-1/2 -translate-y-1/2 bg-white/90 shadow-sm border-none h-8 w-8 text-primary rounded-full" />
                      <CarouselNext className="absolute -right-6 top-1/2 -translate-y-1/2 bg-white/90 shadow-sm border-none h-8 w-8 text-primary rounded-full" />
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