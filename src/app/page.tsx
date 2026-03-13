
"use client";

import { Navbar } from '@/components/layout/Navbar';
import { CategorySlider } from '@/components/home/CategorySlider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Clock, Heart, ArrowLeft, ArrowRight, Car, Package, Search, Sparkles, MapPin, Zap, ShieldCheck, Users, TrendingUp } from 'lucide-react';
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
        <section className="relative pt-20 pb-28 md:pt-32 md:pb-48 overflow-hidden bg-white">
          {/* Background Decorative Elements */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[#E27E36]/5 -skew-x-12 origin-top-right -z-0" />
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#E27E36]/10 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mr-0 ml-auto text-right">
              {/* Main Heading */}
              <h1 className="text-6xl md:text-9xl font-black mb-10 leading-[1.05] tracking-tighter text-foreground animate-in fade-in slide-in-from-right-10 duration-1000">
                تاتكس..<br />
                <span className="text-[#E27E36]">عالمك الرقمي.</span>
              </h1>
              
              <p className="text-xl md:text-3xl mb-14 text-muted-foreground font-bold max-w-2xl mr-0 ml-auto leading-relaxed animate-in fade-in slide-in-from-right-10 duration-1000 delay-200">
                من وجبتك المفضلة إلى حجز قاعتك الخاصة.. كل ما تحتاجه في مكان واحد بأمان وسرعة فائقة.
              </p>

              {/* Integrated Search Bar */}
              <div className="relative max-w-2xl mr-0 ml-auto mb-10 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
                <div className="bg-white p-3 rounded-[2.5rem] shadow-[0_25px_60px_rgba(0,0,0,0.1)] border border-border flex items-center flex-row-reverse group transition-all focus-within:ring-4 focus-within:ring-[#E27E36]/10">
                  <div className="flex-1 px-6">
                    <Input 
                      placeholder="ابحث عن مطعم، شاليه، أو خدمة صيانة..." 
                      className="border-none bg-transparent h-16 text-2xl font-black placeholder:text-muted-foreground/50 focus-visible:ring-0 shadow-none text-right"
                    />
                  </div>
                  <Button className="h-16 w-16 rounded-full bg-[#E27E36] hover:bg-[#E27E36]/90 text-white p-0 shrink-0 shadow-none border-none group-hover:scale-105 transition-transform">
                    <Search className="w-7 h-7" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Abstract Floating Visual Element */}
          <div className="absolute top-1/2 left-[5%] -translate-y-1/2 hidden xl:block w-[550px] h-[650px] animate-in fade-in zoom-in duration-1000">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#E27E36]/20 to-transparent rounded-[5rem] -rotate-6 shadow-2xl" />
              <div className="absolute inset-6 bg-white rounded-[4rem] shadow-2xl overflow-hidden border border-border">
                <Image 
                  src="https://picsum.photos/seed/tatx-lifestyle-2/1000/1200" 
                  alt="Tatx Hub" 
                  fill 
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              </div>
              
              {/* Overlay Stat Card */}
              <div className="absolute top-12 -right-12 bg-white/95 backdrop-blur-xl p-6 rounded-[2.5rem] shadow-2xl border border-border flex items-center gap-5 flex-row-reverse animate-float">
                <div className="w-14 h-14 bg-[#E27E36] rounded-3xl flex items-center justify-center text-white shadow-xl rotate-12">
                  <Zap className="w-8 h-8" />
                </div>
                <div className="text-right">
                  <span className="block font-black text-lg">طلبك مؤكد!</span>
                  <span className="text-xs text-muted-foreground font-bold">تجهيز الطلب في 20 ثانية</span>
                </div>
              </div>

              <div className="absolute bottom-20 -left-12 bg-white/95 backdrop-blur-xl p-6 rounded-[2.5rem] shadow-2xl border border-border flex items-center gap-5 flex-row-reverse animate-float-delayed">
                <div className="w-14 h-14 bg-green-500 rounded-3xl flex items-center justify-center text-white shadow-xl -rotate-6">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <div className="text-right">
                  <span className="block font-black text-lg">دفع آمن</span>
                  <span className="text-xs text-muted-foreground font-bold">أموالك محمية مع تاتكس</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16">
          {/* Categories Slider */}
          <div className="mb-24">
            <div className="text-right mb-10 pr-0 ml-auto">
              <h2 className="text-4xl font-black mb-3">تصفح حسب الفئة</h2>
              <p className="text-lg text-muted-foreground font-bold">كل الخدمات التي تحتاجها منظمة لسهولة وصولك</p>
            </div>
            <CategorySlider />
          </div>

          {/* Featured Items Section */}
          <section className="mb-28">
            <div className="flex items-center justify-between mb-12 flex-row-reverse">
              <div className="text-right border-r-8 border-[#E27E36] pr-8">
                <h2 className="text-5xl font-black mb-3 text-foreground tracking-tight">عروض تاتكس المميزة</h2>
                <p className="text-lg text-muted-foreground font-bold">أفضل الأسعار والخدمات المختارة لك بعناية</p>
              </div>
              <Button variant="ghost" className="text-[#E27E36] font-black text-xl gap-3 flex-row-reverse group hover:bg-transparent shadow-none">
                 عرض الكل
                 <ArrowLeft className="w-6 h-6 group-hover:-translate-x-2 transition-transform" />
              </Button>
            </div>
            
            <div className="relative">
              <Carousel className="w-full" opts={{ direction: 'rtl', align: 'start' }}>
                <CarouselContent className="-ml-8">
                  {FEATURED_ITEMS.map((item) => (
                    <CarouselItem key={item.id} className="pl-8 basis-full md:basis-1/2 lg:basis-1/3">
                      <Link href={['chalets', 'halls', 'services'].includes(item.category) ? `/item/${item.id}` : `/provider/${item.providerId}`}>
                        <Card className="relative overflow-hidden group border-none bg-black rounded-[3rem] shadow-2xl h-[550px] transition-all duration-700 hover:-translate-y-3">
                          <Image 
                            src={item.image} 
                            alt={item.name} 
                            fill 
                            className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-60" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                          
                          {/* Price Tag in Top-Right */}
                          <div className="absolute top-8 right-8 z-20">
                            <div className="bg-[#E27E36] text-white font-black px-5 py-2.5 text-2xl rounded-[1.5rem] shadow-2xl flex items-center gap-1.5 flex-row-reverse scale-100 group-hover:scale-110 transition-transform">
                              <span>{item.price}</span>
                              <span className="text-sm">ر.س</span>
                            </div>
                          </div>

                          <div className="absolute top-8 left-8 z-20">
                            <Badge className="bg-white/10 backdrop-blur-xl text-white border-white/20 font-black px-5 py-2 rounded-xl text-sm">
                              {CATEGORIES.find(c => c.id === item.category)?.name}
                            </Badge>
                          </div>

                          <CardContent className="absolute inset-0 p-10 flex flex-col justify-end text-right text-white z-10">
                            <h3 className="text-4xl font-black mb-4 group-hover:text-[#E27E36] transition-colors leading-tight">{item.name}</h3>
                            <p className="text-white/80 text-lg font-bold line-clamp-2 mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                              {item.description}
                            </p>
                            <Button className="rounded-2xl font-black text-lg px-8 py-7 bg-[#E27E36] text-white hover:bg-white hover:text-[#E27E36] transition-all shadow-xl flex items-center gap-3 flex-row-reverse w-fit mr-0 ml-auto group/btn">
                               {['chalets', 'halls', 'services'].includes(item.category) ? 'عرض التفاصيل' : 'اطلب الآن'}
                               <ArrowLeft className="w-5 h-5 group-hover/btn:-translate-x-2 transition-transform" />
                            </Button>
                          </CardContent>
                        </Card>
                      </Link>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="hidden md:block">
                  <CarouselPrevious className="absolute -left-10 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-xl shadow-2xl border-none h-16 w-16 hover:bg-[#E27E36] hover:text-white text-[#E27E36] transition-all rounded-full" />
                  <CarouselNext className="absolute -right-10 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-xl shadow-2xl border-none h-16 w-16 hover:bg-[#E27E36] hover:text-white text-[#E27E36] transition-all rounded-full" />
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
              <section key={cat.id} className="mb-24">
                <div className="flex items-center justify-between mb-10 flex-row-reverse">
                  <div className="text-right">
                    <h2 className="text-3xl font-black text-foreground">{cat.name}</h2>
                    <p className="text-base text-muted-foreground font-bold mt-1">خيارات مختارة من {cat.name}</p>
                  </div>
                  <Link href={href}>
                    <Button variant="link" className="text-[#E27E36] font-black text-lg gap-2 flex-row-reverse p-0 hover:no-underline group">
                      مشاهدة المزيد
                      <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>

                <div className="relative">
                  <Carousel className="w-full" opts={{ direction: 'rtl', align: 'start' }}>
                    <CarouselContent className="-ml-6">
                      {categoryItems.map((item) => {
                        const itemHref = ['chalets', 'halls', 'services'].includes(item.category) 
                          ? `/item/${item.id}` 
                          : href;
                        return (
                          <CarouselItem key={item.id} className="pl-6 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
                            <Link href={itemHref}>
                              <Card className="overflow-hidden group border-none bg-white rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 h-full hover:-translate-y-2">
                                <div className="relative aspect-square overflow-hidden bg-secondary">
                                  <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                  <div className="absolute top-3 right-3">
                                    <Badge className="bg-white/95 text-[#E27E36] font-black border-none text-xs px-3 py-1 rounded-xl shadow-lg">
                                      {item.price} ر.س
                                    </Badge>
                                  </div>
                                </div>
                                <CardContent className="p-5 text-right">
                                  <h3 className="text-base font-black mb-1 line-clamp-1 group-hover:text-[#E27E36] transition-colors">{item.name}</h3>
                                  <p className="text-xs text-muted-foreground font-bold">{provider?.name}</p>
                                </CardContent>
                              </Card>
                            </Link>
                          </CarouselItem>
                        );
                      })}
                    </CarouselContent>
                    <div className="hidden md:block">
                      <CarouselPrevious className="absolute -left-6 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-xl shadow-xl border-none h-12 w-12 text-[#E27E36] rounded-full" />
                      <CarouselNext className="absolute -right-6 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-xl shadow-xl border-none h-12 w-12 text-[#E27E36] rounded-full" />
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
          50% { transform: translateY(-20px) rotate(12deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) rotate(-6deg); }
          50% { transform: translateY(-15px) rotate(-6deg); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 6s ease-in-out infinite;
          animation-delay: 1s;
        }
      `}</style>
    </>
  );
}
