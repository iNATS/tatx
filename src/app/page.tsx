
"use client";

import { Navbar } from '@/components/layout/Navbar';
import { CategorySlider } from '@/components/home/CategorySlider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Clock, Heart, ArrowLeft, ArrowRight, Car, Package, ChevronLeft, ShieldCheck, Zap, Sparkles, MapPin } from 'lucide-react';
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
        {/* Modern Premium Hero Section */}
        <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden">
          {/* Background Abstract Shapes */}
          <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />
          </div>
          
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Text Content */}
              <div className="lg:col-span-6 text-right order-2 lg:order-1">
                <div className="inline-flex items-center gap-3 mb-8 bg-secondary/50 backdrop-blur-sm px-5 py-2 rounded-2xl border border-primary/10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                  </span>
                  <span className="text-foreground font-black text-sm">تاتكس برو: التوصيل مجاني الآن!</span>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[1.05] tracking-tight text-foreground animate-in fade-in slide-in-from-right-8 duration-700 delay-100">
                  حياتك أسهل <br />
                  <span className="text-primary">بلمسة واحدة.</span>
                </h1>
                
                <p className="text-lg md:text-xl mb-12 text-muted-foreground font-bold max-w-xl mr-0 ml-auto leading-relaxed animate-in fade-in slide-in-from-right-8 duration-700 delay-200">
                  اكتشف قوة "تاتكس" - المنصة الوحيدة التي تجمع لك كل خدماتك اليومية من مطاعم، مشاوير، صيانة، وحتى حجز الشاليهات والقاعات، بكل أمان وسرعة.
                </p>

                <div className="flex flex-wrap gap-5 justify-start flex-row-reverse mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                  <Button size="lg" className="rounded-[2rem] px-12 text-xl font-black bg-primary hover:bg-primary/90 h-20 shadow-2xl shadow-primary/30 transition-all hover:scale-105 active:scale-95 border-none">
                    استكشف الآن
                  </Button>
                  <Link href="/taxi">
                    <Button size="lg" variant="outline" className="rounded-[2rem] px-12 text-xl font-black bg-white text-foreground border-2 border-border hover:bg-secondary h-20 transition-all hover:scale-105 active:scale-95 shadow-none">
                      اطلب مشوار
                    </Button>
                  </Link>
                </div>

                {/* Trust Stats */}
                <div className="flex items-center gap-10 justify-start flex-row-reverse animate-in fade-in duration-1000 delay-500">
                   <div className="text-right">
                      <span className="block text-3xl font-black text-foreground">1M+</span>
                      <span className="text-xs text-muted-foreground font-black uppercase tracking-wider">مستخدم سعيد</span>
                   </div>
                   <div className="w-px h-10 bg-border" />
                   <div className="text-right">
                      <span className="block text-3xl font-black text-foreground">500+</span>
                      <span className="text-xs text-muted-foreground font-black uppercase tracking-wider">مزود خدمة</span>
                   </div>
                   <div className="w-px h-10 bg-border" />
                   <div className="flex items-center gap-2">
                      <div className="flex -space-x-3 space-x-reverse">
                         {[1,2,3].map(i => (
                           <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-secondary overflow-hidden relative">
                              <Image src={`https://picsum.photos/seed/user${i}/100/100`} alt="user" fill className="object-cover" />
                           </div>
                         ))}
                      </div>
                      <div className="flex flex-col text-right">
                         <div className="flex gap-0.5">
                            {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
                         </div>
                         <span className="text-[10px] font-black text-muted-foreground">تقييم 4.9/5</span>
                      </div>
                   </div>
                </div>
              </div>

              {/* Visual Element with Floating Cards */}
              <div className="lg:col-span-6 relative order-1 lg:order-2 animate-in fade-in zoom-in-95 duration-1000">
                <div className="relative aspect-square md:aspect-[4/5] w-full max-w-2xl mx-auto rounded-[3.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] group">
                  <Image 
                    src="https://picsum.photos/seed/tatx-lifestyle-new/1200/1500"
                    alt="Tatx Hero"
                    fill
                    className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-transparent" />
                  
                  {/* Floating Card 1: Order Status */}
                  <div className="absolute top-12 left-[-5%] md:left-[-10%] bg-white/90 backdrop-blur-xl p-5 rounded-[2rem] shadow-2xl border border-white/50 flex items-center gap-4 flex-row-reverse animate-bounce-slow">
                     <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                        <Package className="w-8 h-8" />
                     </div>
                     <div className="text-right">
                        <span className="block font-black text-base text-foreground">طلبك وصل!</span>
                        <span className="text-xs text-muted-foreground font-bold">استمتع بوجبتك الساخنة</span>
                     </div>
                  </div>

                  {/* Floating Card 2: Driver Info */}
                  <div className="absolute bottom-12 right-[-5%] md:right-[-10%] bg-white/90 backdrop-blur-xl p-5 rounded-[2.5rem] shadow-2xl border border-white/50 flex items-center gap-5 flex-row-reverse animate-float">
                     <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-white">
                        <Image src="https://picsum.photos/seed/driver1/100/100" alt="driver" fill className="object-cover" />
                     </div>
                     <div className="text-right">
                        <span className="block font-black text-base text-foreground">أحمد القحطاني</span>
                        <div className="flex items-center gap-2 justify-end">
                           <span className="text-xs text-muted-foreground font-bold">كامري 2024</span>
                           <div className="flex items-center gap-1 bg-green-500/10 text-green-600 px-2 py-0.5 rounded-lg text-[10px] font-black">
                              <Star className="w-3 h-3 fill-current" />
                              4.9
                           </div>
                        </div>
                     </div>
                     <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white cursor-pointer hover:bg-primary/90 transition-colors">
                        <Car className="w-6 h-6" />
                     </div>
                  </div>

                  {/* Floating Card 3: Location */}
                  <div className="absolute top-[40%] right-[-5%] bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-xl border border-white/50 flex items-center gap-2 flex-row-reverse">
                     <MapPin className="w-4 h-4 text-primary" />
                     <span className="text-xs font-black text-foreground">الرياض، الملقا</span>
                  </div>
                </div>

                {/* Decorative Background Element */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl -z-10" />
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          {/* Categories Slider */}
          <div className="mb-20">
            <h2 className="text-4xl font-black mb-2 text-right">ماذا تريد أن تفعل اليوم؟</h2>
            <p className="text-muted-foreground text-right mb-6 font-bold text-lg">اختر الفئة وابدأ تجربتك الفريدة مع تاتكس</p>
            <CategorySlider />
          </div>

          {/* Featured Items Section */}
          <section className="mb-24">
            <div className="flex items-center justify-between mb-10 flex-row">
              <Button variant="link" className="text-primary font-black text-xl p-0 shadow-none flex items-center gap-2 hover:no-underline group">
                 عرض جميع العروض
                 <ArrowLeft className="w-6 h-6 group-hover:-translate-x-2 transition-transform" />
              </Button>
              <div className="text-right">
                <h2 className="text-4xl font-black mb-2">عروض تاتكس المميزة</h2>
                <p className="text-muted-foreground font-bold">أفضل الأسعار والخدمات المختارة لك بعناية</p>
              </div>
            </div>
            
            <div className="relative">
              <Carousel className="w-full" opts={{ direction: 'rtl', align: 'start' }}>
                <CarouselContent className="-ml-6">
                  {FEATURED_ITEMS.map((item) => (
                    <CarouselItem key={item.id} className="pl-6 basis-full md:basis-1/2 lg:basis-1/3">
                      <Link href={['chalets', 'halls', 'services'].includes(item.category) ? `/item/${item.id}` : `/provider/${item.providerId}`}>
                        <Card className="relative overflow-hidden group border-none bg-black rounded-[3rem] shadow-2xl h-[550px] transition-all duration-700 hover:-translate-y-4">
                          <Image 
                            src={item.image} 
                            alt={item.name} 
                            fill 
                            className="object-cover transition-transform duration-[3s] group-hover:scale-110 opacity-80 group-hover:opacity-60" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                          
                          {/* Top Badge Area */}
                          <div className="absolute top-8 right-8 left-8 z-20 flex justify-between items-start flex-row-reverse">
                            <div className="bg-primary text-white font-black px-6 py-2 text-2xl rounded-2xl shadow-2xl flex items-center gap-1 flex-row-reverse animate-in fade-in zoom-in duration-500">
                              <span>{item.price}</span>
                              <span className="text-sm">ر.س</span>
                            </div>
                            <Badge className="bg-white/10 backdrop-blur-md text-white border-white/20 font-black px-5 py-2 rounded-xl text-sm">
                              {CATEGORIES.find(c => c.id === item.category)?.name}
                            </Badge>
                          </div>

                          {/* Action Buttons */}
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                             <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white scale-50 group-hover:scale-100 transition-transform duration-500">
                                <Sparkles className="w-10 h-10" />
                             </div>
                          </div>

                          <CardContent className="absolute inset-0 p-10 flex flex-col justify-end text-right text-white z-10">
                            <div className="space-y-5">
                              <div>
                                <h3 className="text-4xl font-black mb-3 leading-tight group-hover:text-primary transition-colors duration-500">{item.name}</h3>
                                <p className="text-white/80 text-lg font-bold line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-8 group-hover:translate-y-0">
                                  {item.description}
                                </p>
                              </div>
                              <div className="pt-4 translate-y-12 group-hover:translate-y-0 transition-transform duration-700 opacity-0 group-hover:opacity-100">
                                <Button className="rounded-2xl font-black text-lg px-10 py-8 bg-primary text-white hover:bg-white hover:text-primary transition-all shadow-none flex items-center gap-3 flex-row-reverse w-fit mr-0 ml-auto group/btn">
                                   {['chalets', 'halls', 'services'].includes(item.category) ? 'عرض التفاصيل' : 'اطلب الآن'}
                                   <ArrowLeft className="w-6 h-6 group-hover/btn:-translate-x-2 transition-transform" />
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
                  <CarouselPrevious className="absolute -left-10 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-xl shadow-2xl border-none h-16 w-16 hover:bg-primary hover:text-white text-primary transition-all" />
                  <CarouselNext className="absolute -right-10 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-xl shadow-2xl border-none h-16 w-16 hover:bg-primary hover:text-white text-primary transition-all" />
                </div>
              </Carousel>
            </div>
          </section>

          {/* Dynamic Horizontal Sliders per Category */}
          {CATEGORIES.filter(cat => cat.id !== 'taxi').map((cat) => {
            const categoryItems = MENU_ITEMS.filter(item => item.category === cat.id).slice(0, 10);
            const provider = PROVIDERS.find(p => p.category === cat.id);
            const href = `/provider/${provider?.id}`;

            return (
              <section key={cat.id} className="mb-24">
                <div className="flex items-center justify-between mb-10 flex-row">
                  <Link href={href}>
                    <Button variant="ghost" className="text-primary font-black text-xl gap-3 flex-row-reverse p-0 hover:bg-transparent shadow-none group">
                      استكشف المزيد
                      <ArrowLeft className="w-6 h-6 group-hover:-translate-x-2 transition-transform" />
                    </Button>
                  </Link>
                  <div className="text-right border-r-8 border-primary pr-8">
                    <h2 className="text-4xl font-black">{cat.name}</h2>
                    <p className="text-muted-foreground font-bold mt-1">تصفح أفضل خيارات {cat.name} المتاحة الآن</p>
                  </div>
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
                              <Card className="overflow-hidden group border-none bg-white rounded-[2.5rem] ring-1 ring-border/50 shadow-none h-full hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
                                <div className="relative aspect-square overflow-hidden">
                                  <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                                  <div className="absolute bottom-4 left-4 right-4 translate-y-12 group-hover:translate-y-0 transition-transform duration-500">
                                    <Badge className="w-full justify-center bg-primary text-white font-black px-2 py-2 text-sm shadow-2xl rounded-xl border-none">
                                      {item.price} ر.س
                                    </Badge>
                                  </div>
                                </div>
                                <CardContent className="p-6 text-right">
                                  <h3 className="text-base font-black mb-1 line-clamp-1 group-hover:text-primary transition-colors">{item.name}</h3>
                                  <p className="text-xs text-muted-foreground font-bold line-clamp-1">{provider?.name}</p>
                                </CardContent>
                              </Card>
                            </Link>
                          </CarouselItem>
                        );
                      })}
                    </CarouselContent>
                    <div className="hidden md:block">
                      <CarouselPrevious className="absolute -left-6 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-xl shadow-xl border-none h-12 w-12 hover:bg-primary hover:text-white text-primary transition-all" />
                      <CarouselNext className="absolute -right-6 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-xl shadow-xl border-none h-12 w-12 hover:bg-primary hover:text-white text-primary transition-all" />
                    </div>
                  </Carousel>
                </div>
              </section>
            );
          })}
        </div>
      </main>
      
      {/* Animation Styles */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
