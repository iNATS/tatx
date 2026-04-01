
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
  ShieldCheck,
  Clock,
  MapPin,
  ChevronLeft
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FEATURED_ITEMS, PROVIDERS } from '@/lib/data';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const services = [
    { name: 'سوبر ماركت', icon: Store, desc: 'كل مستلزمات المنزل' },
    { name: 'مطاعم', icon: Utensils, desc: 'أشهى الأطباق والوجبات' },
    { name: 'تاكسي', icon: Car, desc: 'مشاوير آمنة وسريعة' },
    { name: 'شاليهات', icon: HomeIcon, desc: 'خصوصية تامة واستجمام' },
    { name: 'قاعات', icon: PartyPopper, desc: 'لمناسباتكم السعيدة' },
    { name: 'صيانة', icon: Wrench, desc: 'خدمات منزلية متكاملة' },
  ];

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white">
        
        {/* --- SECTION 1: HERO (App Landing Style) --- */}
        <section className="relative pt-12 md:pt-24 pb-32 overflow-hidden bg-gradient-to-br from-primary/5 via-white to-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              {/* Right Column: Text Content */}
              <div className="text-right space-y-10 order-1">
                <div className="inline-flex items-center gap-2 bg-white px-5 py-2 rounded-full shadow-sm border border-primary/10">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-sm font-black text-primary">الآن متاح في جميع مدن المملكة</span>
                </div>
                
                <h1 className="text-5xl md:text-8xl font-black leading-[1.1] tracking-tighter text-foreground">
                  كل احتياجاتك<br />
                  <span className="text-primary italic">في تطبيق واحد</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-muted-foreground font-bold leading-relaxed max-w-xl mr-0 ml-auto">
                  من طلب الوجبات وحجز المشاوير إلى استئجار الشاليهات وتنسيق المناسبات.. Tatx هو رفيقك الذكي لكل لحظة في يومك.
                </p>

                <div className="flex flex-wrap gap-5 justify-end">
                  <Button className="h-[70px] px-10 rounded-[1.5rem] bg-black text-white gap-4 shadow-2xl hover:scale-[1.02] transition-all border-none">
                    <div className="flex flex-col items-end leading-none">
                      <span className="text-[10px] opacity-60 mb-1">Download on the</span>
                      <span className="text-xl font-black">App Store</span>
                    </div>
                    <Smartphone className="w-8 h-8" />
                  </Button>
                  <Button className="h-[70px] px-10 rounded-[1.5rem] bg-black text-white gap-4 shadow-2xl hover:scale-[1.02] transition-all border-none">
                    <div className="flex flex-col items-end leading-none">
                      <span className="text-[10px] opacity-60 mb-1">GET IT ON</span>
                      <span className="text-xl font-black">Google Play</span>
                    </div>
                    <div className="w-8 h-8 flex items-center justify-center">
                      <svg viewBox="0 0 512 512" fill="currentColor" className="w-full h-full">
                        <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
                      </svg>
                    </div>
                  </Button>
                </div>

                <div className="flex items-center gap-8 justify-end pt-6">
                  <div className="text-center">
                    <h4 className="text-3xl font-black">50K+</h4>
                    <p className="text-xs text-muted-foreground font-bold">مستخدم نشط</p>
                  </div>
                  <div className="w-px h-10 bg-border" />
                  <div className="text-center">
                    <h4 className="text-3xl font-black">4.9</h4>
                    <p className="text-xs text-muted-foreground font-bold">تقييم المتجر</p>
                  </div>
                  <div className="w-px h-10 bg-border" />
                  <div className="text-center">
                    <h4 className="text-3xl font-black">100%</h4>
                    <p className="text-xs text-muted-foreground font-bold">ضمان الخدمة</p>
                  </div>
                </div>
              </div>

              {/* Left Column: Phone Mockup */}
              <div className="relative order-2 flex justify-center lg:justify-start">
                <div className="absolute inset-0 bg-primary/20 blur-[150px] rounded-full scale-110 -z-10" />
                <div className="relative w-full max-w-[320px] md:max-w-[380px] aspect-[9/19] bg-foreground rounded-[4rem] p-3 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border-[12px] border-foreground overflow-hidden">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-foreground rounded-b-3xl z-30" />
                  <div className="relative w-full h-full rounded-[3.2rem] overflow-hidden bg-white">
                    <Image src="https://picsum.photos/seed/tatx-app-ui/800/1600" alt="Tatx Mobile UI" fill className="object-cover" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* --- SECTION 2: CORE SERVICES GRID --- */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-black mb-6">خدمات Tatx بين يديك</h2>
              <p className="text-xl text-muted-foreground font-bold leading-relaxed">
                صممنا Tatx ليكون رفيقك المثالي، موفراً لك حلولاً ذكية تخدمك في كل تفاصيل يومك بجودة وسرعة فائقة.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((ser, i) => (
                <div key={i} className="group bg-secondary/20 p-10 rounded-[3rem] transition-all duration-500 hover:bg-primary/5 hover:shadow-xl hover:translate-y-[-8px] text-right border border-transparent hover:border-primary/10">
                  <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center text-primary mb-8 mr-0 ml-auto shadow-sm group-hover:rotate-12 transition-transform duration-500">
                    <ser.icon className="w-10 h-10" />
                  </div>
                  <h4 className="text-3xl font-black mb-4">{ser.name}</h4>
                  <p className="text-lg text-muted-foreground font-bold leading-relaxed mb-8">
                    تجربة {ser.desc} فريدة من نوعها مع ضمان الجودة والسرعة التي تميز Tatx عن غيرها.
                  </p>
                  <Button variant="ghost" className="p-0 h-auto font-black text-primary gap-2 hover:bg-transparent shadow-none group-hover:translate-x-[-5px] transition-transform">
                    <span>اكتشف المزيد</span>
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- SECTION 3: TAXI FEATURE BANNER --- */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="bg-primary rounded-[4rem] p-12 md:p-24 overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-l from-black/20 to-transparent -z-0" />
              <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <svg width="100%" height="100%" fill="none" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0 100 L100 0 L100 100 Z" fill="white" />
                </svg>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                <div className="order-2 lg:order-1 flex justify-center">
                  <div className="relative w-full max-w-[400px] aspect-video rounded-[2.5rem] overflow-hidden border-[10px] border-white/20 shadow-2xl group-hover:scale-105 transition-transform duration-700">
                    <Image src="https://picsum.photos/seed/tatx-taxi-map/800/450" alt="Tatx Taxi Map" fill className="object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary shadow-2xl animate-pulse">
                        <Car className="w-8 h-8" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-white text-right order-1 lg:order-2">
                  <h2 className="text-4xl md:text-7xl font-black mb-8 leading-tight">
                    رحلاتك.. صارت<br />أسهل مع تاكسي Tatx
                  </h2>
                  <p className="text-xl md:text-2xl text-white/80 font-bold mb-12 leading-relaxed">
                    اطلب سيارتك الآن واستمتع بمشوار مريح وآمن، مع تتبع مباشر لرحلتك وكباتن محترفين تم اختيارهم بعناية.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-end">
                    {['تتبع مباشر', 'دفع إلكتروني', 'كباتن معتمدون', 'دعم 24/7'].map((tag, idx) => (
                      <Badge key={idx} className="bg-white/20 text-white border-none font-black px-6 py-2.5 text-sm rounded-full shadow-none backdrop-blur-md">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button onClick={() => router.push('/taxi')} className="mt-12 h-18 px-14 rounded-[1.5rem] bg-white text-primary hover:bg-white/90 font-black text-2xl shadow-2xl transition-all active:scale-95 border-none">
                    احجز مشوارك الآن
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 4: EXCLUSIVE DEALS (Horizontal Scroll) --- */}
        <section className="py-24 bg-white overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-16 flex-row-reverse text-right">
              <div>
                <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">عروض تاتكس الحصرية</h2>
                <p className="text-xl text-muted-foreground font-bold">أفضل الخدمات بأسعار لا تقاوم، فقط لمستخدمي التطبيق</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="icon" className="rounded-full h-14 w-14 border-2 shadow-sm"><ArrowLeft className="w-6 h-6 rotate-180" /></Button>
                <Button variant="outline" size="icon" className="rounded-full h-14 w-14 border-2 bg-primary text-white border-primary shadow-lg"><ArrowLeft className="w-6 h-6" /></Button>
              </div>
            </div>

            <div className="flex gap-8 overflow-x-auto no-scrollbar pb-12 flex-row-reverse -mx-4 px-4">
              {FEATURED_ITEMS.map((item) => (
                <Link key={item.id} href={`/item/${item.id}`} className="min-w-[380px] md:min-w-[500px]">
                  <Card className="relative h-[550px] rounded-[3.5rem] overflow-hidden group border-none shadow-2xl">
                    <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-12 text-white text-right">
                      <div className="flex items-center gap-3 mb-6 justify-end">
                        <Badge className="bg-primary text-white font-black px-5 py-2 rounded-xl shadow-lg border-none text-lg">{item.price} ر.س</Badge>
                        <Badge variant="secondary" className="bg-white/20 text-white border-none font-black px-5 py-2 rounded-xl text-lg backdrop-blur-md">خصم 20%</Badge>
                      </div>
                      <h3 className="text-4xl font-black mb-4 leading-tight">{item.name}</h3>
                      <p className="text-white/70 font-bold text-lg line-clamp-2 leading-relaxed">{item.description}</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* --- SECTION 5: TRUST & TESTIMONIALS --- */}
        <section className="py-24 bg-secondary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-6xl font-black mb-20">لماذا يختارنا الآلاف؟</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { name: 'أحمد القحطاني', role: 'عميل مميز', text: 'Tatx غير روتيني اليومي، سرعة التوصيل في السوبر ماركت خيالية والتطبيق سهل جداً وسلس في الاستخدام.' },
                { name: 'سارة العتيبي', role: 'ربة منزل', text: 'أفضل ميزة هي حجز الشاليهات، الصور مطابقة للواقع تماماً والخدمة احترافية جداً، شكراً لفريق تاتكس.' },
                { name: 'خالد محمد', role: 'كابتن تاتكس', text: 'فخور كوني جزء من فريق كباتن تاتكس، نظام العمل مرن والدعم مستمر دائماً لتحسين دخلنا وتطوير مهاراتنا.' }
              ].map((test, i) => (
                <Card key={i} className="p-12 rounded-[3.5rem] border-none shadow-sm bg-white text-right relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Zap className="w-24 h-24 text-primary" />
                  </div>
                  <div className="flex items-center gap-5 justify-end mb-10 flex-row-reverse">
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                      <Image src={`https://picsum.photos/seed/user-${i}/200/200`} alt={test.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-black text-2xl">{test.name}</h4>
                      <p className="text-sm font-bold text-primary">{test.role}</p>
                    </div>
                  </div>
                  <p className="text-xl font-bold text-muted-foreground leading-relaxed italic">"{test.text}"</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* --- SECTION 6: FINAL CALL TO ACTION --- */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="bg-black rounded-[5rem] p-12 md:p-32 text-center relative overflow-hidden group">
              <div className="absolute inset-0 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000">
                <Image src="https://picsum.photos/seed/tatx-community/1600/800" alt="Tatx Community" fill className="object-cover" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90" />
              
              <div className="relative z-10 max-w-4xl mx-auto space-y-12">
                <h2 className="text-5xl md:text-8xl font-black text-white leading-tight tracking-tight">
                  انضم إلى عائلة Tatx<br />وابدأ رحلتك اليوم
                </h2>
                <p className="text-2xl text-white/70 font-bold max-w-2xl mx-auto leading-relaxed">
                  حمل التطبيق الآن واستمتع بتجربة فريدة تجمع كل احتياجاتك في مكان واحد وبأفضل الأسعار.
                </p>
                <div className="flex flex-wrap gap-8 justify-center pt-8">
                  <Button className="h-20 px-16 rounded-[2rem] bg-primary text-white font-black text-2xl shadow-[0_20px_50px_rgba(226,126,54,0.4)] hover:scale-105 transition-all border-none">
                    ابدأ الآن مجاناً
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
