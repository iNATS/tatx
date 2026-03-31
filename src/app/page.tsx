"use client";

import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Star, 
  ArrowLeft, 
  Zap, 
  Smartphone, 
  Store, 
  Utensils, 
  Car, 
  Home as HomeIcon, 
  PartyPopper, 
  Wrench, 
  Pill,
  ShieldCheck,
  Clock,
  MapPin,
  CheckCircle2
} from 'lucide-react';
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
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const services = [
    { name: 'سوبر ماركت', icon: Store, desc: 'تسوق يومي' },
    { name: 'مطاعم', icon: Utensils, desc: 'وجبات ساخنة' },
    { name: 'تاكسي', icon: Car, desc: 'مشاوير آمنة' },
    { name: 'شاليهات', icon: HomeIcon, desc: 'استجمام وخصوصية' },
    { name: 'قاعات', icon: PartyPopper, desc: 'مناسبات سعيدة' },
    { name: 'صيانة', icon: Wrench, desc: 'خدمات منزلية' },
  ];

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white">
        
        {/* --- SECTION 1: HERO (Image-Inspired) --- */}
        <section className="relative pt-20 pb-32 overflow-hidden bg-gradient-to-b from-primary/5 to-white">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-6">
              <div className="flex items-center gap-1 bg-white px-4 py-1.5 rounded-full shadow-sm border border-border">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-black">موثوق لدى 50,000+ مستخدم</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-tight tracking-tighter">
              كل احتياجاتك اليومية<br />
              <span className="text-primary">في تطبيق واحد</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 text-muted-foreground font-bold max-w-2xl mx-auto leading-relaxed">
              من طلب الوجبات وحجز المشاوير إلى استئجار الشاليهات وتنسيق المناسبات.. Tatx هو رفيقك الذكي لكل لحظة.
            </p>

            <div className="flex flex-wrap gap-4 justify-center mb-20">
              <Button className="h-16 px-10 rounded-2xl bg-black text-white gap-3 shadow-xl hover:scale-105 transition-all">
                <Smartphone className="w-6 h-6" />
                <span className="font-black text-lg">تحميل التطبيق</span>
              </Button>
              <Button variant="outline" onClick={() => router.push('/search')} className="h-16 px-10 rounded-2xl border-2 font-black text-lg shadow-sm">
                استكشف الخدمات
              </Button>
            </div>

            {/* Mockup Showcase - Centered like reference */}
            <div className="relative max-w-4xl mx-auto">
              <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full scale-110 -z-10" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div className="hidden md:block space-y-6">
                  <div className="bg-white p-4 rounded-3xl shadow-xl border border-border text-right animate-bounce">
                    <Badge className="bg-green-100 text-green-600 mb-2">تم التوصيل</Badge>
                    <p className="text-xs font-black">طلبك من "قصر المندي" وصل!</p>
                  </div>
                  <div className="bg-white p-4 rounded-3xl shadow-xl border border-border text-right translate-x-10">
                    <Badge className="bg-blue-100 text-blue-600 mb-2">رحلة نشطة</Badge>
                    <p className="text-xs font-black">الكابتن في طريقه إليك</p>
                  </div>
                </div>
                
                <div className="relative aspect-[9/19] w-full max-w-[300px] mx-auto bg-foreground rounded-[3.5rem] p-3 shadow-2xl border-[10px] border-foreground">
                  <div className="relative w-full h-full rounded-[2.8rem] overflow-hidden bg-white">
                    <Image src="https://picsum.photos/seed/tatx-main/600/1200" alt="Tatx App" fill className="object-cover" />
                  </div>
                </div>

                <div className="hidden md:block space-y-6">
                  <div className="bg-white p-4 rounded-3xl shadow-xl border border-border text-right -translate-x-10">
                    <Badge className="bg-orange-100 text-primary mb-2">عرض جديد</Badge>
                    <p className="text-xs font-black">خصم 30% على حجز الشاليهات</p>
                  </div>
                  <div className="bg-white p-4 rounded-3xl shadow-xl border border-border text-right">
                    <Badge className="bg-purple-100 text-purple-600 mb-2">تأكيد حجز</Badge>
                    <p className="text-xs font-black">تم تأكيد حجز القاعة بنجاح</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 2: ADVENTURES & DEALS (Horizontal Scroll inspired) --- */}
        <section className="py-24 bg-white overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-12 flex-row-reverse text-right">
              <div>
                <h2 className="text-4xl font-black mb-2 tracking-tight">عروض Tatx الحصرية</h2>
                <p className="text-lg text-muted-foreground font-bold">استمتع بأفضل الخدمات بأسعار لا تقاوم</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="rounded-full h-12 w-12 border-2"><ArrowLeft className="w-5 h-5 rotate-180" /></Button>
                <Button variant="outline" size="icon" className="rounded-full h-12 w-12 border-2 bg-primary text-white border-primary"><ArrowLeft className="w-5 h-5" /></Button>
              </div>
            </div>

            <div className="flex gap-6 overflow-x-auto no-scrollbar pb-8 flex-row-reverse">
              {FEATURED_ITEMS.map((item) => (
                <Link key={item.id} href={`/item/${item.id}`} className="min-w-[350px] md:min-w-[450px]">
                  <Card className="relative h-[500px] rounded-[3rem] overflow-hidden group border-none shadow-lg">
                    <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-10 text-white text-right">
                      <Badge className="bg-primary text-white font-black px-4 py-1.5 rounded-xl mb-4 shadow-lg">{item.price} ر.س</Badge>
                      <h3 className="text-3xl font-black mb-2 leading-tight">{item.name}</h3>
                      <p className="text-white/70 font-bold line-clamp-2">{item.description}</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* --- SECTION 3: FEATURE GRID (Inspired by image features) --- */}
        <section className="py-24 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black mb-6">استكشف مزايا Tatx الاستثنائية</h2>
              <p className="text-lg text-muted-foreground font-bold leading-relaxed">
                صممنا التطبيق ليكون رفيقك المثالي، موفراً لك حلولاً ذكية تخدمك في كل تفاصيل يومك.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((ser, i) => (
                <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 border border-transparent hover:border-primary/10 group text-right">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8 mr-0 ml-auto transition-transform group-hover:rotate-12">
                    <ser.icon className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-black mb-4">{ser.name}</h4>
                  <p className="text-muted-foreground font-bold leading-relaxed">
                    تجربة {ser.desc} فريدة من نوعها مع ضمان الجودة والسرعة التي تميز Tatx عن غيرها.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- SECTION 4: MID-PAGE BANNER (Inspired by "Stress-Free Travel") --- */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="bg-primary rounded-[4rem] overflow-hidden relative min-h-[500px] flex items-center">
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-black/20 to-transparent -z-0" />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 w-full p-12 md:p-24">
                <div className="order-2 lg:order-1 flex justify-center lg:justify-start">
                  <div className="relative w-full max-w-[350px] aspect-[9/19] rounded-[3.5rem] overflow-hidden border-[12px] border-black/20 shadow-2xl scale-110">
                    <Image src="https://picsum.photos/seed/tatx-taxi-app/600/1200" alt="Tatx Taxi" fill className="object-cover" />
                  </div>
                </div>
                
                <div className="text-white text-right order-1 lg:order-2">
                  <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                    رحلاتك.. صارت<br />أسهل مع تاكسي Tatx
                  </h2>
                  <p className="text-xl md:text-2xl text-white/80 font-bold mb-12 leading-relaxed">
                    اطلب سيارتك الآن واستمتع بمشوار مريح وآمن، مع تتبع مباشر لرحلتك وكباتن محترفين.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-end">
                    {['تتبع مباشر', 'دفع إلكتروني', 'كباتن معتمدون', 'دعم 24/7'].map((tag, idx) => (
                      <Badge key={idx} className="bg-white/20 text-white border-none font-black px-5 py-2 text-sm rounded-full">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button onClick={() => router.push('/taxi')} className="mt-12 h-16 px-12 rounded-2xl bg-white text-primary hover:bg-white/90 font-black text-xl shadow-xl transition-all active:scale-95">
                    احجز مشوارك الآن
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 5: PROVIDER LISTING (Inspired by Hotel cards) --- */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-16 flex-row-reverse text-right">
              <div>
                <h2 className="text-4xl font-black mb-2 tracking-tight">أفضل الوجهات والخدمات</h2>
                <p className="text-lg text-muted-foreground font-bold">شركاؤنا الموثوقون يقدمون لك الأفضل دائماً</p>
              </div>
              <Button variant="ghost" className="text-primary font-black text-lg gap-2 flex-row-reverse hover:bg-primary/5">
                عرض الكل <ArrowLeft className="w-5 h-5" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {PROVIDERS.slice(0, 3).map((provider) => (
                <Link key={provider.id} href={`/provider/${provider.id}`}>
                  <Card className="rounded-[3rem] overflow-hidden border-none shadow-sm hover:shadow-2xl transition-all duration-500 bg-white ring-1 ring-border group">
                    <div className="relative h-72">
                      <Image src={provider.image} alt={provider.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute top-6 right-6">
                        <Badge className="bg-white/95 text-foreground font-black px-3 py-1 rounded-xl shadow-sm flex items-center gap-1">
                          <Star className="w-3.5 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{provider.rating}</span>
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-8 text-right">
                      <h3 className="text-2xl font-black mb-3 group-hover:text-primary transition-colors">{provider.name}</h3>
                      <div className="flex items-center gap-2 justify-end mb-6 text-muted-foreground font-bold text-sm">
                        <span>{provider.deliveryTime || 'خدمة فورية'}</span>
                        <MapPin className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex justify-between items-center flex-row-reverse border-t pt-6">
                        <div className="text-right">
                          <span className="text-xs text-muted-foreground block font-bold">يبدأ من</span>
                          <span className="text-2xl font-black text-primary">15 ر.س</span>
                        </div>
                        <Button className="rounded-2xl px-8 h-12 font-black bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all border-none shadow-none">استعرض</Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* --- SECTION 6: TESTIMONIALS (Inspired by image) --- */}
        <section className="py-24 bg-secondary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-20 tracking-tight">قصص نجاح من عائلة Tatx</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: 'أحمد القحطاني', role: 'عميل مميز', text: 'تطبيق تاتكس غير روتيني اليومي، سرعة التوصيل في السوبر ماركت خيالية والتطبيق سهل جداً.' },
                { name: 'سارة العتيبي', role: 'ربة منزل', text: 'أفضل ميزة هي حجز الشاليهات، الصور مطابقة للواقع تماماً والخدمة احترافية جداً، شكراً تاتكس.' },
                { name: 'خالد محمد', role: 'كابتن تاتكس', text: 'فخور كوني جزء من فريق كباتن تاتكس، نظام العمل مرن والدعم مستمر دائماً لتحسين دخلنا.' }
              ].map((test, i) => (
                <Card key={i} className="p-10 rounded-[3rem] border-none shadow-sm bg-white text-right relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-10">
                    <Zap className="w-20 h-20 text-primary" />
                  </div>
                  <div className="flex items-center gap-4 justify-end mb-8 flex-row-reverse">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-lg border-2 border-white">
                      <Image src={`https://picsum.photos/seed/user-${i}/100/100`} alt={test.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-black text-lg">{test.name}</h4>
                      <p className="text-xs font-bold text-primary">{test.role}</p>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-muted-foreground leading-relaxed italic">"{test.text}"</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* --- SECTION 7: BOTTOM CTA (Inspired by footer banner) --- */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="bg-black rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-30">
                <Image src="https://picsum.photos/seed/tatx-footer/1200/600" alt="Tatx Community" fill className="object-cover" />
              </div>
              <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-7xl font-black text-white mb-10 leading-tight tracking-tight">
                  انضم إلى آلاف المستخدمين<br />في Tatx اليوم
                </h2>
                <div className="flex flex-wrap gap-6 justify-center">
                  <Button className="h-18 px-12 py-8 rounded-[2rem] bg-primary text-white font-black text-2xl shadow-2xl hover:scale-105 transition-all">ابدأ الآن مجاناً</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
