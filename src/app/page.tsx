
"use client";

import { Navbar } from '@/components/layout/Navbar';
import { CategorySlider } from '@/components/home/CategorySlider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Clock, Heart, ArrowLeft, ArrowRight, Car, Package, Search, Sparkles, MapPin, Zap, ShieldCheck } from 'lucide-react';
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
      <main className="flex-1 bg-[#F5F2F0]">
        {/* Modern Immersive Hero Section */}
        <section className="relative pt-16 pb-24 md:pt-24 md:pb-40 overflow-hidden bg-white">
          {/* Background Decorative Elements */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[#E27E36]/5 -skew-x-12 origin-top-right -z-0" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mr-0 ml-auto text-right">
              {/* Top Announcement */}
              <div className="inline-flex items-center gap-2 bg-[#E27E36]/10 px-4 py-1.5 rounded-full mb-8 animate-in fade-in slide-in-from-right-4 duration-700">
                <Sparkles className="w-4 h-4 text-[#E27E36]" />
                <span className="text-[#E27E36] font-black text-xs">منصتك المتكاملة لكل احتياجاتك اليومية</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight text-foreground animate-in fade-in slide-in-from-right-8 duration-700 delay-100">
                تاتكس.. <br />
                <span className="text-[#E27E36]">عالمك في تطبيق واحد.</span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-12 text-muted-foreground font-bold max-w-2xl mr-0 ml-auto leading-relaxed animate-in fade-in slide-in-from-right-8 duration-700 delay-200">
                اطلب طعامك، احجز مشوارك، صيانة منزلك، أو حتى قاعة مناسباتك وشاليهك الخاص. كل ما تحتاجه بلمسة واحدة وبأعلى معايير الأمان والسرعة.
              </p>

              {/* Integrated Search Bar */}
              <div className="relative max-w-2xl mr-0 ml-auto mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                <div className="bg-white p-2 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-border flex items-center flex-row-reverse group transition-all focus-within:ring-2 focus-within:ring-[#E27E36]/20">
                  <div className="flex-1 px-4">
                    <Input 
                      placeholder="ابحث عن مطعم، شاليه، أو خدمة صيانة..." 
                      className="border-none bg-transparent h-14 text-xl font-bold placeholder:text-muted-foreground focus-visible:ring-0 shadow-none text-right"
                    />
                  </div>
                  <Button className="h-14 w-14 rounded-full bg-[#E27E36] hover:bg-[#E27E36]/90 text-white p-0 shrink-0 shadow-none border-none">
                    <Search className="w-6 h-6" />
                  </Button>
                </div>
                
                {/* Popular Tags */}
                <div className="flex flex-wrap gap-3 mt-4 justify-start flex-row-reverse pr-4">
                  <span className="text-xs font-black text-muted-foreground">شائع الآن:</span>
                  {['مندي', 'شاليهات الملقا', 'صيانة مكيفات', 'تاكسي مطار'].map((tag) => (
                    <button key={tag} className="text-xs font-black text-foreground hover:text-[#E27E36] transition-colors">#{tag}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Abstract Floating Visual Element */}
          <div className="absolute top-1/2 left-[5%] -translate-y-1/2 hidden xl:block w-[500px] h-[600px] animate-in fade-in zoom-in duration-1000">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#E27E36]/20 to-transparent rounded-[4rem] -rotate-6" />
              <div className="absolute inset-4 bg-white rounded-[3.5rem] shadow-2xl overflow-hidden border border-border">
                <Image 
                  src="https://picsum.photos/seed/tatx-lifestyle/800/1000" 
                  alt="Tatx Hub" 
                  fill 
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-8 right-8 left-8 text-right text-white">
                  <h4 className="text-2xl font-black mb-2">أهلاً بك في تاتكس</h4>
                  <p className="text-sm font-bold opacity-80">رفيقك اليومي في كل مكان وأي وقت.</p>
                </div>
              </div>
              
              {/* Overlay Stat Card */}
              <div className="absolute top-10 -right-10 bg-white p-5 rounded-3xl shadow-2xl border border-border flex items-center gap-4 flex-row-reverse animate-float">
                <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center text-white">
                  <Car className="w-6 h-6" />
                </div>
                <div className="text-right">
                  <span className="block font-black text-sm">سائق في الطريق</span>
                  <span className="text-[10px] text-muted-foreground font-bold">وصول خلال 4 دقائق</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          {/* Categories Slider */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8 flex-row-reverse">
              <div className="text-right">
                <h2 className="text-3xl font-black mb-2">تصفح حسب الفئة</h2>
                <p className="text-muted-foreground font-bold">كل الخدمات التي تحتاجها منظمة لسهولة وصولك</p>
              </div>
            </div>
            <CategorySlider />
          </div>

          {/* Featured Items Section */}
          <section className="mb-24">
            <div className="flex items-center justify-between mb-10 flex-row-reverse">
              <div className="text-right border-r-8 border-[#E27E36] pr-6">
                <h2 className="text-4xl font-black mb-2 text-foreground">عروض تاتكس المميزة</h2>
                <p className="text-muted-foreground font-bold">أفضل الأسعار والخدمات المختارة لك بعناية</p>
              </div>
              <Button variant="ghost" className="text-[#E27E36] font-black text-lg gap-2 flex-row-reverse group hover:bg-transparent shadow-none">
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
                        <Card className="relative overflow-hidden group border-none bg-black rounded-[2.5rem] shadow-xl h-[500px] transition-all duration-500 hover:-translate-y-2">
                          <Image 
                            src={item.image} 
                            alt={item.name} 
                            fill 
                            className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-60" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                          
                          {/* Price Tag in Top-Right */}
                          <div className="absolute top-6 right-6 z-20">
                            <div className="bg-[#E27E36] text-white font-black px-4 py-1.5 text-xl rounded-xl shadow-xl flex items-center gap-1 flex-row-reverse">
                              <span>{item.price}</span>
                              <span className="text-xs">ر.س</span>
                            </div>
                          </div>

                          <div className="absolute top-6 left-6 z-20">
                            <Badge className="bg-white/10 backdrop-blur-md text-white border-white/20 font-black px-4 py-1.5 rounded-lg text-xs">
                              {CATEGORIES.find(c => c.id === item.category)?.name}
                            </Badge>
                          </div>

                          <CardContent className="absolute inset-0 p-8 flex flex-col justify-end text-right text-white z-10">
                            <h3 className="text-3xl font-black mb-2 group-hover:text-[#E27E36] transition-colors">{item.name}</h3>
                            <p className="text-white/80 text-sm font-bold line-clamp-2 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                              {item.description}
                            </p>
                            <Button className="rounded-xl font-black text-sm px-6 py-5 bg-[#E27E36] text-white hover:bg-white hover:text-[#E27E36] transition-all shadow-none flex items-center gap-2 flex-row-reverse w-fit mr-0 ml-auto group/btn">
                               {['chalets', 'halls', 'services'].includes(item.category) ? 'عرض التفاصيل' : 'اطلب الآن'}
                               <ArrowLeft className="w-4 h-4 group-hover/btn:-translate-x-1 transition-transform" />
                            </Button>
                          </CardContent>
                        </Card>
                      </Link>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="hidden md:block">
                  <CarouselPrevious className="absolute -left-6 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-xl shadow-xl border-none h-12 w-12 hover:bg-[#E27E36] hover:text-white text-[#E27E36] transition-all" />
                  <CarouselNext className="absolute -right-6 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-xl shadow-xl border-none h-12 w-12 hover:bg-[#E27E36] hover:text-white text-[#E27E36] transition-all" />
                </div>
              </Carousel>
            </div>
          </section>

          {/* Horizontal Category Rows */}
          {CATEGORIES.filter(cat => cat.id !== 'taxi').map((cat) => {
            const categoryItems = MENU_ITEMS.filter(item => item.category === cat.id).slice(0, 8);
            const provider = PROVIDERS.find(p => p.category === cat.id);
            const href = `/provider/${provider?.id}`;

            return (
              <section key={cat.id} className="mb-20">
                <div className="flex items-center justify-between mb-8 flex-row-reverse">
                  <div className="text-right">
                    <h2 className="text-2xl font-black text-foreground">{cat.name}</h2>
                    <p className="text-sm text-muted-foreground font-bold mt-1">خيارات مختارة من {cat.name}</p>
                  </div>
                  <Link href={href}>
                    <Button variant="link" className="text-[#E27E36] font-black gap-1 flex-row-reverse p-0 hover:no-underline">
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
                              <Card className="overflow-hidden group border-none bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 h-full">
                                <div className="relative aspect-square overflow-hidden bg-secondary">
                                  <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                                  <div className="absolute top-2 right-2">
                                    <Badge className="bg-white/90 text-[#E27E36] font-black border-none text-[10px] px-2 py-0.5 rounded-lg">
                                      {item.price} ر.س
                                    </Badge>
                                  </div>
                                </div>
                                <CardContent className="p-4 text-right">
                                  <h3 className="text-sm font-black mb-1 line-clamp-1 group-hover:text-[#E27E36] transition-colors">{item.name}</h3>
                                  <p className="text-[10px] text-muted-foreground font-bold">{provider?.name}</p>
                                </CardContent>
                              </Card>
                            </Link>
                          </CarouselItem>
                        );
                      })}
                    </CarouselContent>
                    <div className="hidden md:block">
                      <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md shadow-lg border-none h-10 w-10 text-[#E27E36]" />
                      <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md shadow-lg border-none h-10 w-10 text-[#E27E36]" />
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
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
