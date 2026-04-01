
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
  ChevronLeft,
  CheckCircle2,
  Download
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FEATURED_ITEMS } from '@/lib/data';
import { useRouter } from 'next/navigation';

/**
 * @fileOverview الصفحة الرئيسية المعاد تصميمها بأسلوب Material Design 3.
 * تركز الصفحة على كونها Landing Page احترافية تبرز ميزات تطبيق Tatx.
 */
export default function Home() {
  const router = useRouter();

  const services = [
    { name: 'سوبر ماركت', icon: Store, desc: 'كل مستلزمات المنزل بجودة تاتكس', color: 'bg-blue-50 text-blue-600' },
    { name: 'مطاعم', icon: Utensils, desc: 'أشهى الأطباق من أفضل المطاعم', color: 'bg-orange-50 text-orange-600' },
    { name: 'تاكسي', icon: Car, desc: 'مشاوير آمنة، سريعة، وبسعر عادل', color: 'bg-emerald-50 text-green-600' },
    { name: 'شاليهات', icon: HomeIcon, desc: 'خصوصية تامة واستجمام عائلي فاخر', color: 'bg-purple-50 text-purple-600' },
    { name: 'قاعات', icon: PartyPopper, desc: 'قاعات فخمة لجميع مناسباتكم', color: 'bg-pink-50 text-pink-600' },
    { name: 'صيانة', icon: Wrench, desc: 'خدمات منزلية متكاملة بضماننا', color: 'bg-amber-50 text-amber-600' },
  ];

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#FBFBFB]">
        
        {/* --- SECTION 1: MD3 HERO SECTION --- */}
        <section className="relative pt-16 md:pt-28 pb-32 overflow-hidden bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              {/* Text Content */}
              <div className="text-right space-y-8 order-1">
                <div className="inline-flex items-center gap-2 bg-primary/5 px-6 py-2.5 rounded-full border border-primary/10">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-sm font-black text-primary">تطبيق Tatx الجديد متاح الآن</span>
                </div>
                
                <h1 className="text-5xl md:text-[5.5rem] font-black leading-[1] tracking-tight text-foreground">
                  كل احتياجاتك<br />
                  <span className="text-primary italic">في تطبيق واحد</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-muted-foreground font-bold leading-relaxed max-w-xl mr-0 ml-auto">
                  من طلب الوجبات وحجز المشاوير إلى استئجار الشاليهات وتنسيق المناسبات.. Tatx هو رفيقك الذكي لكل لحظة في يومك.
                </p>

                <div className="flex flex-wrap gap-4 justify-end">
                  <Button className="h-[72px] px-8 rounded-3xl bg-black text-white gap-4 shadow-xl hover:scale-[1.02] transition-all border-none">
                    <div className="flex flex-col items-end leading-none">
                      <span className="text-[10px] opacity-60 mb-1">Download on the</span>
                      <span className="text-xl font-black">App Store</span>
                    </div>
                    <Smartphone className="w-8 h-8" />
                  </Button>
                  <Button className="h-[72px] px-8 rounded-3xl bg-black text-white gap-4 shadow-xl hover:scale-[1.02] transition-all border-none">
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

                <div className="flex items-center gap-10 justify-end pt-8">
                  {[
                    { label: 'مستخدم نشط', val: '50K+' },
                    { label: 'تقييم المتجر', val: '4.9' },
                    { label: 'ضمان الخدمة', val: '100%' }
                  ].map((stat, i) => (
                    <div key={i} className="text-right">
                      <h4 className="text-3xl font-black text-foreground">{stat.val}</h4>
                      <p className="text-xs text-muted-foreground font-bold">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Phone Mockup with MD3 Style */}
              <div className="relative order-2 flex justify-center lg:justify-start">
                <div className="absolute inset-0 bg-primary/10 blur-[120px] rounded-full scale-110 -z-10" />
                <div className="relative w-full max-w-[340px] md:max-w-[400px] aspect-[9/18.5] bg-[#1A1C1E] rounded-[4.5rem] p-4 shadow-[0_60px_120px_-20px_rgba(0,0,0,0.3)] border-[14px] border-[#1A1C1E] overflow-hidden group">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-8 bg-[#1A1C1E] rounded-b-3xl z-30" />
                  <div className="relative w-full h-full rounded-[3.5rem] overflow-hidden bg-white">
                    <Image 
                      src="https://picsum.photos/seed/tatx-mobile-ui/800/1600" 
                      alt="Tatx App Screenshot" 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-105" 
                      data-ai-hint="mobile app screenshot"
                    />
                  </div>
                </div>
                
                {/* Floating MD3 Chips */}
                <div className="absolute -right-8 top-1/4 bg-white/90 backdrop-blur-xl p-4 rounded-3xl shadow-2xl border border-white/20 flex items-center gap-4 animate-bounce duration-[3000ms]">
                  <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <span className="block font-black text-sm">تم تأكيد الطلب</span>
                    <span className="text-[10px] text-muted-foreground font-bold">المندوب في طريقه إليك</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* --- SECTION 2: MD3 SERVICES GRID --- */}
        <section className="py-32 bg-[#FBFBFB]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-24">
              <h2 className="text-4xl md:text-6xl font-black mb-8 text-foreground tracking-tight">خدمات Tatx بين يديك</h2>
              <p className="text-xl text-muted-foreground font-bold leading-relaxed">
                صممنا Tatx ليكون رفيقك المثالي، موفراً لك حلولاً ذكية تخدمك في كل تفاصيل يومك بجودة وسرعة فائقة.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((ser, i) => (
                <div key={i} className="group bg-white p-12 rounded-[3.5rem] transition-all duration-500 hover:bg-white hover:shadow-2xl hover:translate-y-[-12px] text-right border border-border/50">
                  <div className={`w-24 h-24 ${ser.color} rounded-[2.5rem] flex items-center justify-center mb-10 mr-0 ml-auto shadow-sm group-hover:scale-110 transition-transform duration-500`}>
                    <ser.icon className="w-12 h-12" />
                  </div>
                  <h4 className="text-3xl font-black mb-4 text-foreground">{ser.name}</h4>
                  <p className="text-lg text-muted-foreground font-bold leading-relaxed mb-10">
                    {ser.desc}. جودة استثنائية وسرعة في التنفيذ بضمان Tatx.
                  </p>
                  <Button variant="ghost" className="p-0 h-auto font-black text-primary gap-3 hover:bg-transparent shadow-none group-hover:translate-x-[-8px] transition-transform text-lg">
                    <span>اكتشف الخدمة</span>
                    <ChevronLeft className="w-6 h-6" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- SECTION 3: TAXI FEATURE BANNER --- */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="bg-[#121416] rounded-[4.5rem] p-12 md:p-28 overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-l from-primary/20 to-transparent -z-0" />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
                <div className="order-2 lg:order-1 flex justify-center">
                  <div className="relative w-full max-w-[450px] aspect-video rounded-[3rem] overflow-hidden border-[12px] border-white/5 shadow-2xl group-hover:scale-105 transition-transform duration-1000">
                    <Image src="https://picsum.photos/seed/tatx-taxi-vibe/900/500" alt="Tatx Taxi" fill className="object-cover brightness-75" data-ai-hint="modern taxi" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-primary shadow-2xl animate-pulse">
                        <Car className="w-10 h-10" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-white text-right order-1 lg:order-2">
                  <h2 className="text-4xl md:text-7xl font-black mb-10 leading-tight tracking-tight">
                    رحلاتك.. صارت<br />أسهل مع <span className="text-primary">تاكسي Tatx</span>
                  </h2>
                  <p className="text-xl md:text-2xl text-white/70 font-bold mb-14 leading-relaxed">
                    اطلب سيارتك الآن واستمتع بمشوار مريح وآمن، مع تتبع مباشر لرحلتك وكباتن محترفين تم اختيارهم بعناية لخدمتكم.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-end">
                    {['تتبع حي', 'دفع رقمي', 'كباتن معتمدون'].map((tag, idx) => (
                      <Badge key={idx} className="bg-white/10 text-white border-none font-black px-8 py-3 text-sm rounded-2xl shadow-none backdrop-blur-md">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button onClick={() => router.push('/taxi')} className="mt-16 h-[80px] px-16 rounded-3xl bg-primary text-white hover:bg-primary/90 font-black text-2xl shadow-2xl transition-all active:scale-95 border-none">
                    احجز مشوارك الأول
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 4: APP SCREENSHOTS / FEATURES --- */}
        <section className="py-32 bg-white overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-24 flex-row-reverse text-right">
              <div>
                <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-foreground">تجربة مستخدم لا تضاهى</h2>
                <p className="text-xl text-muted-foreground font-bold">بساطة في التصميم، قوة في الأداء. شاهد واجهات تطبيق Tatx</p>
              </div>
              <div className="hidden md:flex gap-4">
                <Button variant="outline" size="icon" className="rounded-full h-16 w-16 border-2 shadow-sm"><ArrowLeft className="w-8 h-8 rotate-180" /></Button>
                <Button variant="outline" size="icon" className="rounded-full h-16 w-16 border-2 bg-primary text-white border-primary shadow-xl"><ArrowLeft className="w-8 h-8" /></Button>
              </div>
            </div>

            <div className="flex gap-10 overflow-x-auto no-scrollbar pb-16 flex-row-reverse -mx-4 px-4">
              {[
                { title: 'سوبر ماركت ذكي', img: 'https://picsum.photos/seed/screen1/600/1200', hint: 'تصفح آلاف المنتجات بلمسة واحدة' },
                { title: 'تتبع رحلاتك', img: 'https://picsum.photos/seed/screen2/600/1200', hint: 'راقب الكابتن مباشرة على الخريطة' },
                { title: 'حجز فوري للشاليهات', img: 'https://picsum.photos/seed/screen3/600/1200', hint: 'أفضل العروض الحصرية بين يديك' },
                { title: 'خدمات منزلية', img: 'https://picsum.photos/seed/screen4/600/1200', hint: 'اطلب فني متخصص في دقائق' }
              ].map((screen, idx) => (
                <div key={idx} className="min-w-[300px] md:min-w-[380px] space-y-8">
                  <div className="relative aspect-[9/18.5] rounded-[3.5rem] overflow-hidden border-8 border-[#F0F0F0] shadow-2xl group cursor-pointer">
                    <Image src={screen.img} alt={screen.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="text-right px-4">
                    <h4 className="text-2xl font-black text-foreground mb-2">{screen.title}</h4>
                    <p className="text-sm text-muted-foreground font-bold">{screen.hint}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- SECTION 5: TRUST & TESTIMONIALS --- */}
        <section className="py-32 bg-[#F1F3F4]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-6xl font-black mb-24 text-foreground tracking-tight">لماذا يفضلنا الآلاف؟</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { name: 'أحمد القحطاني', role: 'عميل بلاتيني', text: 'Tatx غير روتيني اليومي، سرعة التوصيل في السوبر ماركت خيالية والتطبيق سهل جداً وسلس في الاستخدام.' },
                { name: 'سارة العتيبي', role: 'ربة منزل', text: 'أفضل ميزة هي حجز الشاليهات، الصور مطابقة للواقع تماماً والخدمة احترافية جداً، شكراً لفريق تاتكس.' },
                { name: 'خالد محمد', role: 'كابتن تاتكس', text: 'فخور كوني جزء من فريق كباتن تاتكس، نظام العمل مرن والدعم مستمر دائماً لتحسين دخلنا وتطوير مهاراتنا.' }
              ].map((test, i) => (
                <Card key={i} className="p-12 rounded-[4rem] border-none shadow-sm bg-white text-right relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
                  <div className="flex items-center gap-6 justify-end mb-10 flex-row-reverse">
                    <div className="relative w-24 h-24 rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                      <Image src={`https://picsum.photos/seed/user-${i}/300/300`} alt={test.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-black text-2xl text-foreground">{test.name}</h4>
                      <p className="text-sm font-bold text-primary">{test.role}</p>
                    </div>
                  </div>
                  <p className="text-xl font-bold text-muted-foreground leading-[1.8] italic">"{test.text}"</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* --- SECTION 6: MD3 FINAL CTA --- */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="bg-primary rounded-[5rem] p-16 md:p-32 text-center relative overflow-hidden group">
              <div className="absolute inset-0 opacity-20 grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110">
                <Image src="https://picsum.photos/seed/tatx-community-love/1600/800" alt="Tatx Community" fill className="object-cover" />
              </div>
              <div className="absolute inset-0 bg-primary/80" />
              
              <div className="relative z-10 max-w-4xl mx-auto space-y-12">
                <h2 className="text-5xl md:text-8xl font-black text-white leading-tight tracking-tight">
                  انضم إلى عائلة Tatx<br />وابدأ رحلتك اليوم
                </h2>
                <p className="text-2xl text-white/90 font-bold max-w-2xl mx-auto leading-relaxed">
                  حمل التطبيق الآن واستمتع بتجربة فريدة تجمع كل احتياجاتك في مكان واحد وبأفضل الأسعار.
                </p>
                <div className="flex flex-wrap gap-8 justify-center pt-8">
                  <Button className="h-[84px] px-16 rounded-[2.5rem] bg-white text-primary hover:bg-white/95 font-black text-2xl shadow-2xl hover:scale-105 transition-all border-none gap-4">
                    <Download className="w-8 h-8" />
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
