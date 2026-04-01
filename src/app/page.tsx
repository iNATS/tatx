
"use client";

import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Star, 
  ArrowLeft, 
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
  Download,
  TrendingUp,
  ArrowRight,
  Apple
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

/**
 * @fileOverview الصفحة الرئيسية المصممة وفق معايير Apple HIG.
 * تركز على البساطة، الوضوح، والعمق البصري.
 */
export default function Home() {
  const router = useRouter();

  const services = [
    { name: 'سوبر ماركت', icon: Store, desc: 'تسوق يومي سريع بنقرة واحدة', color: 'bg-blue-500', tint: 'bg-blue-50' },
    { name: 'مطاعم تاتكس', icon: Utensils, desc: 'وجباتك المفضلة تصلك ساخنة', color: 'bg-orange-500', tint: 'bg-orange-50' },
    { name: 'تاكسي Tatx', icon: Car, desc: 'مشاوير آمنة مع كباتن محترفين', color: 'bg-emerald-500', tint: 'bg-emerald-50' },
    { name: 'شاليهات', icon: HomeIcon, desc: 'استجمام وخصوصية تامة لعائلتك', color: 'bg-purple-500', tint: 'bg-purple-50' },
    { name: 'قاعات', icon: PartyPopper, desc: 'قاعات فخمة لمناسباتك السعيدة', color: 'bg-pink-500', tint: 'bg-pink-50' },
    { name: 'صيانة منزلية', icon: Wrench, desc: 'فنيون خبراء لخدمتك فوراً', color: 'bg-amber-500', tint: 'bg-amber-50' },
  ];

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#F5F5F7] overflow-hidden font-body">
        
        {/* --- SECTION 1: APPLE-STYLE HERO --- */}
        <section className="relative pt-20 pb-20 md:pt-32 md:pb-40 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col items-center text-center space-y-8 mb-16">
              <Badge variant="secondary" className="bg-[#F5F5F7] text-[#1D1D1F] px-4 py-1.5 rounded-full border-none font-bold text-sm">
                تطبيق Tatx الجديد كلياً
              </Badge>
              <h1 className="text-5xl md:text-8xl font-black tracking-tight text-[#1D1D1F] leading-tight max-w-4xl">
                كل ما تحتاجه في <br />
                <span className="text-primary">تطبيق واحد مذهل.</span>
              </h1>
              <p className="text-xl md:text-2xl text-[#86868B] font-bold max-w-2xl leading-relaxed">
                اطلب وجباتك، احجز مشاويرك، تسوق مستلزماتك، ونسق مناسباتك. Tatx هو رفيقك الرقمي المتكامل في المملكة.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center pt-4">
                <Button className="h-14 px-10 rounded-full bg-[#1D1D1F] text-white hover:bg-[#1D1D1F]/90 font-black text-lg gap-3 transition-transform hover:scale-105 active:scale-95 shadow-none border-none">
                  <Apple className="w-6 h-6" />
                  App Store
                </Button>
                <Button className="h-14 px-10 rounded-full bg-[#F5F5F7] text-[#1D1D1F] hover:bg-[#E8E8ED] font-black text-lg gap-3 transition-transform hover:scale-105 active:scale-95 shadow-none border-none">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <svg viewBox="0 0 512 512" fill="currentColor" className="w-full h-full">
                      <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
                    </svg>
                  </div>
                  Google Play
                </Button>
              </div>
            </div>

            {/* Centered Device Mockup */}
            <div className="relative mx-auto max-w-[900px] w-full mt-10">
               <div className="relative z-10 aspect-[16/10] rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-[1px] border-[#D2D2D7]/30">
                  <Image 
                    src="https://picsum.photos/seed/tatx-apple-hero/1800/1000" 
                    alt="Tatx App Ecosystem" 
                    fill 
                    className="object-cover"
                  />
               </div>
               {/* Background Glow */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-[120px] -z-0" />
            </div>
          </div>
        </section>

        {/* --- SECTION 2: SERVICES GRID (APPLE WIDGET STYLE) --- */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-right mb-16 space-y-4">
              <h2 className="text-4xl md:text-6xl font-black text-[#1D1D1F] tracking-tight">عالم من الخدمات.</h2>
              <p className="text-xl md:text-2xl text-[#86868B] font-bold">بساطة في الاختيار، سرعة في التنفيذ.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((ser, i) => (
                <div key={i} className="group relative bg-white p-10 rounded-[2.5rem] transition-all duration-500 hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.05)] hover:translate-y-[-8px] text-right border border-[#D2D2D7]/30">
                  <div className={`w-16 h-16 ${ser.tint} rounded-2xl flex items-center justify-center mb-8 mr-0 ml-auto transition-all duration-500 group-hover:scale-110`}>
                    <ser.icon className={`w-8 h-8 ${ser.color.replace('bg-', 'text-')}`} />
                  </div>
                  <h4 className="text-2xl font-black mb-3 text-[#1D1D1F]">{ser.name}</h4>
                  <p className="text-lg text-[#86868B] font-bold leading-relaxed mb-8">
                    {ser.desc}. أفضل تجربة مستخدم مع ضمان جودة Tatx.
                  </p>
                  <Button variant="ghost" className="p-0 h-auto font-black text-primary gap-2 hover:bg-transparent shadow-none group-hover:translate-x-[-5px] transition-transform text-lg">
                    <span>استكشف الخدمة</span>
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- SECTION 3: PREMIUM TAXI (DARK MODE INTERRUPT) --- */}
        <section className="pb-32 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="bg-[#1D1D1F] rounded-[3.5rem] overflow-hidden relative group">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-12 md:p-24 relative z-10">
                <div className="text-white text-right space-y-8">
                  <Badge className="bg-white/10 text-white border-none font-bold px-4 py-1.5 rounded-full shadow-none backdrop-blur-md">حصرياً في Tatx</Badge>
                  <h2 className="text-5xl md:text-7xl font-black leading-tight tracking-tight">
                    مشاويرك <br /><span className="text-primary">بمعايير Pro</span>
                  </h2>
                  <p className="text-xl md:text-2xl text-[#86868B] font-bold leading-relaxed">
                    استمتع برحلة هادئة، سيارات حديثة، وكباتن هم الأفضل في المنطقة. اطلب الآن واختبر الفرق.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-end">
                    {['كباتن معتمدون', 'تتبع حي', 'أفضل الأسعار'].map((tag, idx) => (
                      <span key={idx} className="bg-white/5 text-white/60 font-bold px-6 py-2 rounded-full text-sm border border-white/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Button onClick={() => router.push('/taxi')} className="mt-6 h-16 px-12 rounded-full bg-primary text-white hover:bg-primary/90 font-black text-xl shadow-none transition-transform hover:scale-105 active:scale-95 border-none">
                    احجز رحلتك الأولى
                  </Button>
                </div>
                <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl">
                  <Image src="https://picsum.photos/seed/tatx-taxi-pro/1200/800" alt="Tatx VIP Taxi" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 4: APP SHOWCASE - CLEAN CARDS --- */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex justify-between items-end mb-16 text-right">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-6xl font-black tracking-tight text-[#1D1D1F]">صُمم من أجلك.</h2>
                <p className="text-xl md:text-2xl text-[#86868B] font-bold">واجهات بديهية وسرعة فائقة في التنفيذ.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: 'سوبر ماركت ذكي', img: 'https://picsum.photos/seed/screen-market/600/1200' },
                { title: 'تتبع الرحلات', img: 'https://picsum.photos/seed/screen-taxi/600/1200' },
                { title: 'حجز فوري للشاليهات', img: 'https://picsum.photos/seed/screen-chalet/600/1200' },
                { title: 'إدارة طلباتك', img: 'https://picsum.photos/seed/screen-orders/600/1200' }
              ].map((screen, idx) => (
                <div key={idx} className="space-y-6 group cursor-pointer">
                  <div className="relative aspect-[9/18.5] rounded-[3rem] overflow-hidden border border-[#D2D2D7]/50 shadow-sm bg-[#F5F5F7] transition-all duration-500 group-hover:shadow-xl group-hover:translate-y-[-10px]">
                    <Image src={screen.img} alt={screen.title} fill className="object-cover" />
                  </div>
                  <div className="text-right px-2">
                    <h4 className="text-xl font-black text-[#1D1D1F]">{screen.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- SECTION 5: THE FINAL CALL - APPLE STYLE --- */}
        <section className="py-32">
          <div className="container mx-auto px-4 max-w-5xl text-center space-y-12">
            <h2 className="text-5xl md:text-8xl font-black text-[#1D1D1F] tracking-tight leading-tight">
              جاهز لتجربة <br /><span className="text-primary">Tatx؟</span>
            </h2>
            <p className="text-xl md:text-3xl text-[#86868B] font-bold max-w-2xl mx-auto leading-relaxed">
              انضم إلى آلاف المستخدمين الذين يثقون بنا يومياً. حمل التطبيق مجاناً الآن.
            </p>
            <div className="flex flex-wrap gap-6 justify-center pt-6">
              <Button className="h-[80px] px-12 rounded-3xl bg-[#1D1D1F] text-white gap-4 shadow-none transition-transform hover:scale-105 active:scale-95 border-none">
                <Smartphone className="w-8 h-8" />
                <div className="flex flex-col items-start leading-none text-left">
                  <span className="text-[10px] opacity-60">Download on the</span>
                  <span className="text-2xl font-black">App Store</span>
                </div>
              </Button>
              <Button className="h-[80px] px-12 rounded-3xl bg-[#1D1D1F] text-white gap-4 shadow-none transition-transform hover:scale-105 active:scale-95 border-none">
                <div className="w-8 h-8 flex items-center justify-center">
                  <svg viewBox="0 0 512 512" fill="currentColor" className="w-full h-full">
                    <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
                  </svg>
                </div>
                <div className="flex flex-col items-start leading-none text-left">
                  <span className="text-[10px] opacity-60">GET IT ON</span>
                  <span className="text-2xl font-black">Google Play</span>
                </div>
              </Button>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
