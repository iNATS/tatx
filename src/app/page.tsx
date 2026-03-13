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
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background">
        {/* Material Design 3 Hero Section - 2 Columns Layout */}
        <section className="relative pt-12 pb-20 overflow-hidden bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Right Column: Content */}
              <div className="text-right order-1 lg:order-1">
                <Badge className="bg-primary/10 text-primary border-none font-black px-4 py-1.5 rounded-full mb-6 text-sm">
                  أهلاً بك في عالم تاتكس الجديد ✨
                </Badge>
                
                <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight text-foreground">
                  كل احتياجاتك..<br />
                  <span className="text-primary">بلمسة واحدة.</span>
                </h1>
                
                <p className="text-lg md:text-xl mb-8 text-muted-foreground font-bold max-w-xl mr-0 ml-auto leading-relaxed">
                  من وجبتك المفضلة إلى حجز قاعتك الخاصة.. كل ما تحتاجه في مكان واحد بأمان وسرعة فائقة.
                </p>

                {/* MD3 Tonal Search Bar */}
                <div className="relative max-w-xl mr-0 ml-auto mb-6">
                  <div className="bg-white p-1.5 rounded-[2rem] shadow-md border border-border flex items-center flex-row-reverse group transition-all focus-within:ring-4 focus-within:ring-primary/10 cursor-pointer" onClick={() => router.push('/search')}>
                    <div className="flex-1 px-4">
                      <Input 
                        placeholder="ابحث عن مطعم أو خدمة..." 
                        className="border-none bg-transparent h-12 text-lg font-black placeholder:text-muted-foreground/50 focus-visible:ring-0 shadow-none text-right cursor-pointer"
                        readOnly
                      />
                    </div>
                    <Button className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90 text-white p-0 shrink-0 shadow-none border-none group-hover:scale-105 transition-transform">
                      <Search className="w-6 h-6" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Left Column: Mobile Mockup */}
              <div className="order-2 lg:order-2 flex justify-center lg:justify-start">
                <div className="relative w-full max-w-[320px] aspect-[9/18.5] bg-foreground rounded-[3rem] p-3 shadow-2xl border-[8px] border-foreground overflow-hidden">
                  <Image 
                    src="https://picsum.photos/seed/tatx-app-hero/600/1200" 
                    alt="تطبيق تاتكس" 
                    fill 
                    className="object-cover rounded-[2rem]"
                    data-ai-hint="mobile app"
                  />
                </div>
              </div>
              
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          {/* Categories Slider (MD3 Tonal Chips) */}
          <div className="mb-12">
            <div className="text-right mb-6">
              <h2 className="text-2xl md:text-3xl font-black mb-1 tracking-tight">تصفح حسب الفئة</h2>
              <p className="text-sm text-muted-foreground font-bold">كل الخدمات التي تحتاجها في تصنيفات واضحة</p>
            </div>
            <CategorySlider />
          </div>

          {/* Featured Items (MD3 Elevated Cards) */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8 flex-row-reverse">
              <div className="text-right">
                <h2 className="text-3xl md:text-4xl font-black mb-1 tracking-tight">عروض تاتكس المميزة</h2>
                <p className="text-base text-muted-foreground font-bold">أفضل الأسعار والخدمات المختارة لك</p>
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
                        <Card className="relative overflow-hidden group border-none bg-surface rounded-[2rem] shadow-sm h-[400px] transition-all duration-500 hover:shadow-lg hover:-translate-y-1">
                          <Image 
                            src={item.image} 
                            alt={item.name} 
                            fill 
                            className="object-cover transition-transform duration-700 group-hover:scale-105" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                          
                          <div className="absolute top-4 right-4 z-20">
                            <Badge className="bg-primary text-white font-black px-4 py-1.5 text-lg rounded-xl shadow-lg flex items-center gap-1.5 flex-row-reverse">
                              <span>{item.price}</span>
                              <span className="text-xs">ر.س</span>
                            </Badge>
                          </div>

                          <CardContent className="absolute inset-0 p-6 flex flex-col justify-end text-right text-white z-10">
                            <h3 className="text-xl font-black mb-2 group-hover:text-primary-foreground/90 transition-colors leading-tight">{item.name}</h3>
                            <p className="text-white/80 text-sm font-bold line-clamp-2 mb-4">
                              {item.description}
                            </p>
                            <Button className="rounded-xl font-black text-sm px-6 py-4 bg-primary text-white hover:bg-white hover:text-primary transition-all shadow-md flex items-center gap-2 flex-row-reverse w-fit mr-0 ml-auto group/btn border-none">
                               اطلب الآن
                               <ArrowLeft className="w-4 h-4 group-hover/btn:-translate-x-1 transition-transform" />
                            </Button>
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

          {/* Dynamic Content Rows (MD3 Style) */}
          {CATEGORIES.filter(cat => cat.id !== 'taxi').map((cat) => {
            const categoryItems = MENU_ITEMS.filter(item => item.category === cat.id).slice(0, 8);
            const provider = PROVIDERS.find(p => p.category === cat.id);
            const href = `/provider/${provider?.id}`;

            return (
              <section key={cat.id} className="mb-12">
                <div className="flex items-center justify-between mb-6 flex-row-reverse">
                  <div className="text-right">
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
