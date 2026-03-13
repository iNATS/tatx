
"use client";

import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { MENU_ITEMS, PROVIDERS } from '@/lib/data';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, MapPin, Share2, Heart, ShieldCheck, CheckCircle2, ArrowRight, ChevronRight, ChevronLeft } from 'lucide-react';
import { useCart } from '@/store/use-cart';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState, useEffect } from 'react';

export default function ItemDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { addItem } = useCart();
  const { toast } = useToast();
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  
  const id = params.id as string;
  const item = MENU_ITEMS.find(i => i.id === id);
  const provider = item ? PROVIDERS.find(p => p.id === item.providerId) : null;

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  if (!item) return <div className="text-center py-20 font-black text-2xl">العنصر غير موجود</div>;

  const images = [
    item.image,
    `https://picsum.photos/seed/${item.id}1/1200/800`,
    `https://picsum.photos/seed/${item.id}2/1200/800`,
    `https://picsum.photos/seed/${item.id}3/1200/800`,
    `https://picsum.photos/seed/${item.id}4/1200/800`,
  ];

  const handleBooking = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      restaurantId: item.providerId,
      image: item.image
    });
    toast({
      title: "تم الاختيار",
      description: `تم إضافة ${item.name} لخطوات الحجز.`,
    });
    router.push('/cart');
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white pb-20" dir="rtl">
        <div className="container mx-auto px-4 py-8">
          <Button 
            variant="ghost" 
            className="mb-6 font-black gap-2 flex-row-reverse shadow-none"
            onClick={() => router.back()}
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
            العودة للمتجر
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              {/* Image Showcase */}
              <div className="relative rounded-[2.5rem] overflow-hidden group border-none shadow-none ring-1 ring-border/50">
                <Carousel setApi={setApi} className="w-full" opts={{ direction: 'rtl' }}>
                  <CarouselContent>
                    {images.map((src, index) => (
                      <CarouselItem key={index}>
                        <div className="relative h-[400px] md:h-[550px]">
                          <Image src={src} alt={`${item.name} ${index + 1}`} fill className="object-cover" />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="absolute top-6 right-6 flex gap-3 z-20">
                    <Button size="icon" className="rounded-full bg-white/95 text-primary hover:bg-white shadow-none border-none">
                      <Heart className="w-5 h-5" />
                    </Button>
                    <Button size="icon" className="rounded-full bg-white/95 text-primary hover:bg-white shadow-none border-none">
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </div>
                  <div className="absolute bottom-6 left-6 z-20">
                     <Badge className="bg-black/60 backdrop-blur text-white border-none px-5 py-2.5 font-black rounded-full shadow-none text-sm">
                        {current} من {count} صور
                     </Badge>
                  </div>
                  <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-6 pointer-events-none">
                    <CarouselPrevious className="relative left-0 pointer-events-auto bg-white/70 backdrop-blur hover:bg-white border-none shadow-none h-12 w-12" />
                    <CarouselNext className="relative right-0 pointer-events-auto bg-white/70 backdrop-blur hover:bg-white border-none shadow-none h-12 w-12" />
                  </div>
                </Carousel>
              </div>

              {/* Title and Key Stats */}
              <div className="text-right">
                <div className="flex items-center gap-3 mb-6 justify-end flex-row-reverse">
                   <Badge variant="secondary" className="bg-primary/10 text-primary border-none font-black px-5 py-1.5 rounded-full shadow-none text-sm">
                      {item.subCategory || 'عرض مميز'}
                   </Badge>
                   <span className="text-muted-foreground font-bold text-base">• {provider?.name}</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight">{item.name}</h1>
                
                <div className="flex flex-wrap items-center justify-start gap-10 text-lg font-bold text-muted-foreground">
                  <div className="flex items-center gap-2 flex-row-reverse">
                    <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                    <span className="text-foreground">{provider?.rating}</span>
                    <span className="text-sm">(200+ مراجعة)</span>
                  </div>
                  <div className="flex items-center gap-2 flex-row-reverse">
                    <MapPin className="w-6 h-6 text-primary" />
                    <span>الرياض، الملقا</span>
                  </div>
                  <div className="flex items-center gap-2 flex-row-reverse">
                    <Clock className="w-6 h-6 text-primary" />
                    <span>متاح اليوم للحجز</span>
                  </div>
                </div>
              </div>

              <Separator className="opacity-50 shadow-none my-10" />

              {/* Description */}
              <div className="text-right">
                <h3 className="text-3xl font-black mb-6">عن هذه الخدمة</h3>
                <p className="text-xl text-muted-foreground leading-[1.8] font-bold">
                  {item.description}. تاتكس تضمن لك تجربة فريدة مع أعلى معايير الجودة والأمان. هذه الخدمة تتبع لمزود الخدمة الموثوق {provider?.name} بإدارة مباشرة من منصة تاتكس. استمتع بخصوصية تامة وتجهيزات متكاملة تلبي تطلعاتك.
                </p>
              </div>

              {/* Feature Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
                 {[
                   { text: 'دفع آمن ومضمون', icon: ShieldCheck },
                   { text: 'إلغاء مرن', icon: CheckCircle2 },
                   { text: 'دعم فني 24/7', icon: Clock },
                   { text: 'جودة تاتكس المعتمدة', icon: Star },
                   { text: 'حجز فوري مؤكد', icon: MapPin },
                   { text: 'أفضل سعر مضمون', icon: ArrowRight }
                 ].map((feature, i) => (
                   <div key={i} className="flex items-center gap-4 justify-end flex-row-reverse text-right bg-secondary/20 p-5 rounded-[1.5rem] transition-colors hover:bg-secondary/30">
                      <feature.icon className="w-6 h-6 text-primary shrink-0" />
                      <span className="font-black text-base">{feature.text}</span>
                   </div>
                 ))}
              </div>
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 border-none shadow-none bg-white rounded-[3rem] overflow-hidden border-t-8 border-primary ring-1 ring-border">
                <CardContent className="p-10 text-right">
                  <div className="flex justify-between items-end mb-10 flex-row-reverse">
                     <div>
                        <span className="text-muted-foreground block font-bold text-sm mb-2">السعر يبدأ من</span>
                        <div className="flex items-baseline gap-2 flex-row-reverse">
                           <span className="text-5xl font-black text-primary">{item.price}</span>
                           <span className="text-xl font-black text-primary">ر.س</span>
                        </div>
                     </div>
                     <Badge className="bg-green-500 text-white border-none font-black px-4 py-2 rounded-xl shadow-none text-xs">
                        متوفر الآن
                     </Badge>
                  </div>

                  <div className="space-y-6 mb-10">
                     <div className="bg-secondary/20 p-6 rounded-[2rem] flex items-center gap-5 justify-between flex-row-reverse">
                        <div className="flex items-center gap-4 flex-row-reverse">
                           <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-none">
                              <ShieldCheck className="w-7 h-7" />
                           </div>
                           <div className="text-right">
                              <span className="block font-black text-sm mb-1">حماية تاتكس</span>
                              <span className="text-[11px] text-muted-foreground font-bold leading-tight block">أموالك في أمان حتى تكتمل الخدمة وتستلمها</span>
                           </div>
                        </div>
                     </div>
                  </div>

                  <Button 
                    onClick={handleBooking}
                    className="w-full h-18 py-8 rounded-[1.5rem] text-2xl font-black bg-primary hover:bg-primary/90 transition-all shadow-none border-none"
                  >
                    بدء الحجز الآن
                  </Button>

                  <p className="text-center text-[11px] text-muted-foreground mt-8 font-bold">
                    بالنقر على "بدء الحجز" فأنت توافق على <span className="underline cursor-pointer">سياسة الخصوصية</span> و <span className="underline cursor-pointer">شروط الاستخدام</span> الخاصة بتاتكس.
                  </p>
                </CardContent>
              </Card>

              {/* Provider Mini Card */}
              <Card className="mt-8 border-none shadow-none bg-secondary/10 rounded-[2rem] p-8">
                 <div className="flex items-center gap-5 flex-row-reverse text-right">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-none">
                       <Image src={provider?.image || ''} alt={provider?.name || ''} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                       <h4 className="font-black text-lg mb-1">{provider?.name}</h4>
                       <p className="text-xs text-muted-foreground font-bold">مزود معتمد منذ 2023 لدى تاتكس</p>
                    </div>
                    <Button variant="outline" className="mr-auto text-primary font-black text-xs h-10 px-6 rounded-full border-2 border-primary/20 hover:bg-primary/5 shadow-none">
                      تواصل
                    </Button>
                 </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
