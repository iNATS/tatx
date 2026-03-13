
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
              <div className="relative rounded-3xl overflow-hidden group">
                <Carousel setApi={setApi} className="w-full" opts={{ direction: 'rtl' }}>
                  <CarouselContent>
                    {images.map((src, index) => (
                      <CarouselItem key={index}>
                        <div className="relative h-[400px] md:h-[500px]">
                          <Image src={src} alt={`${item.name} ${index + 1}`} fill className="object-cover" />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="absolute top-6 right-6 flex gap-3 z-20">
                    <Button size="icon" className="rounded-full bg-white/90 text-primary hover:bg-white shadow-none">
                      <Heart className="w-5 h-5" />
                    </Button>
                    <Button size="icon" className="rounded-full bg-white/90 text-primary hover:bg-white shadow-none">
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </div>
                  <div className="absolute bottom-6 left-6 z-20">
                     <Badge className="bg-black/60 backdrop-blur text-white border-none px-4 py-2 font-black rounded-full shadow-none">
                        {current}/{count} صور
                     </Badge>
                  </div>
                  <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 pointer-events-none">
                    <CarouselPrevious className="relative left-0 pointer-events-auto bg-white/50 backdrop-blur hover:bg-white border-none shadow-none" />
                    <CarouselNext className="relative right-0 pointer-events-auto bg-white/50 backdrop-blur hover:bg-white border-none shadow-none" />
                  </div>
                </Carousel>
              </div>

              <div className="text-right">
                <div className="flex items-center gap-2 mb-4 justify-end flex-row-reverse">
                   <Badge variant="secondary" className="bg-primary/10 text-primary border-none font-black px-4 py-1 rounded-full shadow-none">
                      {item.subCategory || 'عرض مميز'}
                   </Badge>
                   <span className="text-muted-foreground font-bold text-sm">• {provider?.name}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black mb-6">{item.name}</h1>
                
                <div className="flex flex-wrap items-center justify-start gap-8 text-lg font-bold text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                    <span className="text-foreground">{provider?.rating}</span>
                    <span className="text-sm">(200+ مراجعة)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-6 h-6 text-primary" />
                    <span>الرياض، الملقا</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-6 h-6 text-primary" />
                    <span>متاح اليوم</span>
                  </div>
                </div>
              </div>

              <Separator className="opacity-50 shadow-none" />

              <div className="text-right">
                <h3 className="text-2xl font-black mb-4">عن الخدمة</h3>
                <p className="text-xl text-muted-foreground leading-relaxed font-bold">
                  {item.description}. تاتكس تضمن لك تجربة فريدة مع أعلى معايير الجودة والأمان. هذه الخدمة تتبع لمزود الخدمة الموثوق {provider?.name} بإدارة مباشرة من منصة تاتكس.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                 {[
                   'دفع آمن ومضمون',
                   'إلغاء مرن',
                   'دعم فني 24/7',
                   'جودة تاتكس',
                   'حجز فوري مؤكد',
                   'أفضل سعر'
                 ].map((feature, i) => (
                   <div key={i} className="flex items-center gap-3 justify-end flex-row-reverse text-right bg-secondary/30 p-4 rounded-2xl">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      <span className="font-black text-sm">{feature}</span>
                   </div>
                 ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24 border-none shadow-none bg-white rounded-[2.5rem] overflow-hidden border-t-8 border-primary ring-1 ring-border">
                <CardContent className="p-8 text-right">
                  <div className="flex justify-between items-end mb-8 flex-row-reverse">
                     <div>
                        <span className="text-muted-foreground block font-bold text-sm mb-1">السعر يبدأ من</span>
                        <div className="flex items-baseline gap-2 flex-row-reverse">
                           <span className="text-4xl font-black text-primary">{item.price}</span>
                           <span className="text-lg font-black text-primary">ر.س</span>
                        </div>
                     </div>
                     <Badge className="bg-green-500 text-white border-none font-black px-3 py-1 rounded-lg shadow-none">
                        متوفر الآن
                     </Badge>
                  </div>

                  <div className="space-y-4 mb-8">
                     <div className="bg-secondary/30 p-4 rounded-2xl flex items-center gap-4 justify-between flex-row-reverse">
                        <div className="flex items-center gap-3 flex-row-reverse">
                           <ShieldCheck className="w-6 h-6 text-primary" />
                           <div className="text-right">
                              <span className="block font-black text-xs">حماية تاتكس</span>
                              <span className="text-[10px] text-muted-foreground font-bold">أموالك في أمان حتى تكتمل الخدمة</span>
                           </div>
                        </div>
                     </div>
                  </div>

                  <Button 
                    onClick={handleBooking}
                    className="w-full h-16 rounded-2xl text-xl font-black bg-primary hover:bg-primary/90 transition-all shadow-none border-none"
                  >
                    بدء الحجز الآن
                  </Button>

                  <p className="text-center text-[10px] text-muted-foreground mt-6 font-bold">
                    بالنقر على "بدء الحجز" فأنت توافق على سياسة الخصوصية وشروط الاستخدام الخاصة بتاتكس.
                  </p>
                </CardContent>
              </Card>

              <Card className="mt-6 border-none shadow-none bg-secondary/20 rounded-3xl p-6">
                 <div className="flex items-center gap-4 flex-row-reverse text-right">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white">
                       <Image src={provider?.image || ''} alt={provider?.name || ''} fill className="object-cover" />
                    </div>
                    <div>
                       <h4 className="font-black text-sm">{provider?.name}</h4>
                       <p className="text-[10px] text-muted-foreground font-bold">مزود معتمد منذ 2023</p>
                    </div>
                    <Button variant="ghost" className="mr-auto text-primary font-black text-xs shadow-none">تواصل</Button>
                 </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
