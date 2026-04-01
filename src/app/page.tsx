"use client";

import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Store, 
  Utensils, 
  Car, 
  Sparkles, 
  Pill, 
  Gift, 
  Apple,
  Zap,
  ArrowLeft,
  Home as HomeIcon
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

/**
 * @fileOverview الصفحة الرئيسية المعاد تصميمها لـ Tatx كصفحة هبوط (Landing Page) فاخرة.
 * تتبع معايير Apple RTL HIG وتستخدم خط Cairo وتصميماً مشرقاً وقوياً.
 */
export default function Home() {
  const router = useRouter();

  const services = [
    { name: 'سوبر ماركت', icon: Store, desc: 'تسوق يومي سريع بنقرة واحدة', color: 'text-blue-600', tint: 'bg-blue-50/50' },
    { name: 'سوق الجميلة', icon: Sparkles, desc: 'أرقى الماركات العالمية للعناية والجمال', color: 'text-purple-600', tint: 'bg-purple-50/50' },
    { name: 'مشاوير Tatx', icon: Car, desc: 'مشاوير آمنة مع كباتن محترفين', color: 'text-emerald-600', tint: 'bg-emerald-50/50' },
    { name: 'مطاعم Tatx', icon: Utensils, desc: 'وجباتك المفضلة تصلك ساخنة', color: 'text-orange-600', tint: 'bg-orange-50/50' },
    { name: 'صيدليات', icon: Pill, desc: 'احتياجاتك الصحية والطبية تصلك فوراً', color: 'text-pink-600', tint: 'bg-pink-50/50' },
    { name: 'لعب أطفال وهدايا', icon: Gift, desc: 'عالم من المرح والهدايا المميزة', color: 'text-amber-600', tint: 'bg-amber-50/50' },
  ];

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white overflow-hidden font-body">
        
        {/* --- SECTION 1: BRIGHT HERO --- */}
        <section className="relative pt-20 pb-20 md:pt-32 md:pb-40 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-full bg-[radial-gradient(circle_at_top,_rgba(226,126,54,0.05)_0%,_rgba(255,255,255,0)_50%)] -z-10" />
          
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col items-center text-center space-y-10 mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-black text-sm">
                <Zap className="w-4 h-4 fill-primary" />
                <span>أذكى تطبيق للخدمات في المملكة</span>
              </div>
              
              <h1 className="text-6xl md:text-[100px] font-black text-[#1D1D1F] leading-[1.1] max-w-5xl">
                حياتك اليومية <br />
                <span className="text-primary italic">أسهل مع Tatx.</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-[#86868B] font-bold max-w-2xl leading-relaxed">
                كل ما تحتاجه من توصيل، تسوق، ومشاوير في واجهة واحدة أنيقة. صُمم ليواكب طموحاتك.
              </p>
              
              <div className="flex flex-wrap gap-6 justify-center pt-4">
                <Button className="h-16 px-12 rounded-2xl bg-[#1D1D1F] text-white hover:bg-[#1D1D1F]/90 font-black text-xl gap-3 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] transition-transform hover:scale-105 active:scale-95">
                  <Apple className="w-7 h-7" />
                  App Store
                </Button>
                <Button className="h-16 px-12 rounded-2xl bg-white text-[#1D1D1F] border-2 border-[#D2D2D7] hover:bg-[#F5F5F7] font-black text-xl gap-3 transition-transform hover:scale-105 active:scale-95">
                  <div className="w-7 h-7 flex items-center justify-center">
                    <svg viewBox="0 0 512 512" fill="currentColor" className="w-full h-full">
                      <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
                    </svg>
                  </div>
                  Google Play
                </Button>
              </div>
            </div>

            {/* Central High-Impact Device */}
            <div className="relative mx-auto max-w-[1000px] w-full mt-10 px-4">
               <div className="relative z-10 aspect-[16/9] rounded-[4rem] overflow-hidden shadow-[0_80px_120px_-30px_rgba(0,0,0,0.1)] border-[12px] border-[#1D1D1F] bg-white group cursor-pointer transition-transform duration-700 hover:scale-[1.02]">
                  <Image 
                    src="https://picsum.photos/seed/tatx-powerful-hero/2000/1200" 
                    alt="Tatx App Power" 
                    fill 
                    className="object-cover"
                  />
                  <div className="absolute top-10 right-10 bg-white/90 backdrop-blur-xl p-6 rounded-[2.5rem] shadow-2xl border border-white/50 hidden md:flex items-center gap-5">
                     <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center p-2">
                        <Image src="https://app.tatx.com/assets/?unstable_path=.%2Fassets/logo.png" alt="Tatx Logo" width={48} height={48} className="object-contain" />
                     </div>
                     <div className="text-right">
                        <span className="block font-black text-xl text-[#1D1D1F]">سرعة البرق</span>
                        <span className="text-sm font-bold text-[#86868B]">توصيل في أقل من 20 دقيقة</span>
                     </div>
                  </div>
               </div>
               <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-4/5 h-20 bg-primary/10 blur-[100px] -z-0" />
            </div>
          </div>
        </section>

        {/* --- SECTION 2: BENTO SERVICES --- */}
        <section className="py-32 bg-[#FBFBFD]">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div className="text-right space-y-4">
                <h2 className="text-5xl md:text-7xl font-black text-[#1D1D1F] tracking-tight">خدمات بلا حدود.</h2>
                <p className="text-xl md:text-2xl text-[#86868B] font-bold max-w-xl leading-relaxed">
                  من الضروريات اليومية إلى الرفاهية المطلقة، كل شيء متاح بلمسة واحدة في Tatx.
                </p>
              </div>
              <Button variant="ghost" className="h-14 px-8 rounded-full font-black text-primary gap-3 text-xl hover:bg-primary/5">
                اكتشف الجميع
                <ArrowLeft className="w-6 h-6" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((ser, i) => (
                <div key={i} className="group relative bg-white p-12 rounded-[3.5rem] transition-all duration-500 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] hover:translate-y-[-12px] text-right border border-[#D2D2D7]/40 overflow-hidden">
                  <div className={`w-20 h-20 ${ser.tint} rounded-[2rem] flex items-center justify-center mb-10 mr-0 ml-auto transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                    <ser.icon className={`w-10 h-10 ${ser.color}`} />
                  </div>
                  <h4 className="text-3xl font-black mb-4 text-[#1D1D1F]">{ser.name}</h4>
                  <p className="text-xl text-[#86868B] font-bold leading-relaxed mb-10">
                    {ser.desc}. جودة استثنائية يضمنها لك خبراء Tatx.
                  </p>
                  <div className="flex items-center gap-3 text-primary font-black text-lg group-hover:translate-x-[-10px] transition-transform">
                    <span>ابدأ الآن</span>
                    <ArrowLeft className="w-6 h-6" />
                  </div>
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- SECTION 3: BRIGHT TAXI EXPERIENCE --- */}
        <section className="py-32 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="bg-white rounded-[4rem] overflow-hidden relative border-2 border-primary/10 shadow-[0_50px_100px_-20px_rgba(226,126,54,0.1)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center p-12 md:p-24 relative z-10">
                <div className="text-right space-y-10">
                  <Badge className="bg-primary/10 text-primary border-none font-black px-6 py-2.5 rounded-full text-sm">مشاوير Tatx الفاخرة</Badge>
                  <h2 className="text-5xl md:text-8xl font-black text-[#1D1D1F] leading-[1.1] tracking-tight">
                    انطلق بـ <br /><span className="text-primary italic">أسلوب Pro.</span>
                  </h2>
                  <p className="text-xl md:text-2xl text-[#86868B] font-bold leading-relaxed">
                    وداعاً للانتظار. كباتن Tatx متاحون دائماً لضمان وصولك براحة وأمان وبأفضل الأسعار في السوق.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-end">
                    {['كباتن معتمدون', 'تتبع ذكي', 'سيارات حديثة'].map((tag, idx) => (
                      <span key={idx} className="bg-[#F5F5F7] text-[#1D1D1F] font-black px-8 py-3 rounded-2xl text-base border border-[#D2D2D7]/50">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Button onClick={() => router.push('/taxi')} className="mt-6 h-20 px-16 rounded-[2rem] bg-primary text-white hover:bg-primary/90 font-black text-2xl shadow-[0_25px_50px_-12px_rgba(226,126,54,0.4)] transition-all hover:scale-105 active:scale-95">
                    احجز مشوارك الآن
                  </Button>
                </div>
                <div className="relative aspect-square md:aspect-video rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                  <Image src="https://picsum.photos/seed/tatx-taxi-white/1200/1000" alt="Tatx Premium Ride" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
                </div>
              </div>
              <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-0" />
            </div>
          </div>
        </section>

        {/* --- SECTION 4: APP SHOWCASE --- */}
        <section className="py-32 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-24 space-y-6">
              <h2 className="text-5xl md:text-8xl font-black tracking-tight text-[#1D1D1F]">واجهات صُممت لتبهرك.</h2>
              <p className="text-xl md:text-3xl text-[#86868B] font-bold max-w-3xl mx-auto leading-relaxed">
                بساطة تامة في الاستخدام، قوة هائلة في الأداء. اكتشف ذكاء تصميم Tatx في كل ركن.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {[
                { title: 'سوبر ماركت ذكي', img: 'https://picsum.photos/seed/sc-1/800/1600' },
                { title: 'تتبع لحظي للرحلات', img: 'https://picsum.photos/seed/sc-2/800/1600' },
                { title: 'عالم الجمال والماركات', img: 'https://picsum.photos/seed/sc-3/800/1600' },
                { title: 'إدارة شاملة لطلباتك', img: 'https://picsum.photos/seed/sc-4/800/1600' }
              ].map((screen, idx) => (
                <div key={idx} className="space-y-8 group cursor-pointer">
                  <div className="relative aspect-[9/19] rounded-[3.5rem] overflow-hidden border-[8px] border-[#1D1D1F] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] transition-all duration-700 group-hover:scale-105 group-hover:shadow-[0_60px_100px_-30px_rgba(0,0,0,0.2)]">
                    <Image src={screen.img} alt={screen.title} fill className="object-cover" />
                  </div>
                  <div className="text-center">
                    <h4 className="text-2xl font-black text-[#1D1D1F] transition-colors group-hover:text-primary">{screen.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- SECTION 5: THE FINAL CALL --- */}
        <section className="py-40 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 -z-10" />
          <div className="container mx-auto px-4 max-w-5xl text-center space-y-16">
            <div className="w-24 h-24 bg-white rounded-[2rem] shadow-xl flex items-center justify-center mx-auto mb-10 border border-[#D2D2D7]/30 p-4">
               <Image src="https://app.tatx.com/assets/?unstable_path=.%2Fassets/logo.png" alt="Tatx Logo" width={64} height={64} className="object-contain" data-ai-hint="tatx logo" />
            </div>
            <h2 className="text-6xl md:text-[120px] font-black text-[#1D1D1F] tracking-tight leading-[1.1]">
              ابدأ رحلتك <br /><span className="text-primary italic">مع Tatx اليوم.</span>
            </h2>
            <p className="text-2xl md:text-4xl text-[#86868B] font-bold max-w-3xl mx-auto leading-relaxed">
              انضم إلى ملايين المستخدمين الذين جعلوا Tatx جزءاً من روتينهم اليومي.
            </p>
            <div className="flex flex-wrap gap-8 justify-center pt-10">
              <Button className="h-[90px] px-14 rounded-3xl bg-[#1D1D1F] text-white gap-5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] transition-all hover:scale-105 active:scale-95 border-none">
                <Apple className="w-10 h-10" />
                <div className="flex flex-col items-start leading-none text-left">
                  <span className="text-xs opacity-60 font-bold">Download on the</span>
                  <span className="text-3xl font-black">App Store</span>
                </div>
              </Button>
              <Button className="h-[90px] px-14 rounded-3xl bg-white text-[#1D1D1F] gap-5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all hover:scale-105 active:scale-95 border-2 border-[#D2D2D7]">
                <div className="w-10 h-10 flex items-center justify-center">
                  <svg viewBox="0 0 512 512" fill="currentColor" className="w-full h-full">
                    <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
                  </svg>
                </div>
                <div className="flex flex-col items-start leading-none text-left">
                  <span className="text-xs opacity-60 font-bold">GET IT ON</span>
                  <span className="text-3xl font-black">Google Play</span>
                </div>
              </Button>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
