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
  ArrowLeft,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const services = [
    { name: 'سوبر ماركت', icon: Store, desc: 'تسوق يومي سريع بنقرة واحدة', color: 'text-blue-600', tint: 'bg-blue-50/50' },
    { name: 'سوق الجميلة', icon: Sparkles, desc: 'أرقى الماركات العالمية للعناية والجمال', color: 'text-purple-600', tint: 'bg-purple-50/50' },
    { name: 'مشاوير', icon: Car, desc: 'مشاوير آمنة مع كباتن محترفين', color: 'text-emerald-600', tint: 'bg-emerald-50/50' },
    { name: 'مطاعم', icon: Utensils, desc: 'وجباتك المفضلة تصلك ساخنة', color: 'text-orange-600', tint: 'bg-orange-50/50' },
    { name: 'صيدليات', icon: Pill, desc: 'احتياجاتك الصحية والطبية تصلك فوراً', color: 'text-pink-600', tint: 'bg-pink-50/50' },
    { name: 'لعب أطفال وهدايا', icon: Gift, desc: 'عالم من المرح والهدايا المميزة', color: 'text-amber-600', tint: 'bg-amber-50/50' },
  ];

  const appStoreBadge = "https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg";
  const googlePlayBadge = "https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg";

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white overflow-hidden font-body">
        
        {/* HERO SECTION */}
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
              
              <div className="flex flex-wrap gap-4 justify-center pt-4">
                <a href="#" className="transition-transform hover:scale-105 active:scale-95">
                  <Image src={appStoreBadge} alt="Download on the App Store" width={180} height={60} className="h-[60px] w-auto" />
                </a>
                <a href="#" className="transition-transform hover:scale-105 active:scale-95">
                  <Image src={googlePlayBadge} alt="Get it on Google Play" width={200} height={60} className="h-[60px] w-auto" />
                </a>
              </div>
            </div>

            <div className="relative mx-auto max-w-[1000px] w-full mt-10 px-4">
               <div className="relative z-10 aspect-[16/9] rounded-[4rem] overflow-hidden shadow-[0_80px_120px_-30px_rgba(0,0,0,0.1)] border-[12px] border-[#1D1D1F] bg-white">
                  <Image 
                    src="https://picsum.photos/seed/tatx-main-hero/2000/1200" 
                    alt="Tatx App Power" 
                    fill 
                    className="object-cover"
                  />
               </div>
               <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-4/5 h-20 bg-primary/10 blur-[100px] -z-0" />
            </div>
          </div>
        </section>

        {/* BENTO SERVICES */}
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
                  <div className={`w-20 h-20 ${ser.tint} rounded-[2rem] flex items-center justify-center mb-10 mr-0 ml-auto transition-all duration-500 group-hover:scale-110`}>
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
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TAXI SECTION */}
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
                  <Button onClick={() => router.push('/taxi')} className="mt-6 h-20 px-16 rounded-[2rem] bg-primary text-white hover:bg-primary/90 font-black text-2xl shadow-[0_25px_50px_-12px_rgba(226,126,54,0.4)] transition-all hover:scale-105 active:scale-95 border-none">
                    احجز مشوارك الآن
                  </Button>
                </div>
                <div className="relative aspect-square md:aspect-video rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                  <Image src="https://picsum.photos/seed/tatx-taxi-white/1200/1000" alt="Tatx Premium Ride" fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-40 relative overflow-hidden text-center bg-primary/5">
          <div className="container mx-auto px-4 max-w-5xl space-y-16">
            <div className="w-24 h-24 bg-white rounded-[2rem] shadow-xl flex items-center justify-center mx-auto mb-10 border border-[#D2D2D7]/30 p-4">
               <Image src="https://app.tatx.com/assets/?unstable_path=.%2Fassets/logo.png" alt="Tatx Logo" width={64} height={64} className="object-contain" />
            </div>
            <h2 className="text-6xl md:text-[120px] font-black text-[#1D1D1F] tracking-tight leading-[1.1]">
              ابدأ رحلتك <br /><span className="text-primary italic">مع Tatx اليوم.</span>
            </h2>
            <p className="text-2xl md:text-4xl text-[#86868B] font-bold max-w-3xl mx-auto leading-relaxed">
              انضم إلى ملايين المستخدمين الذين جعلوا Tatx جزءاً من روتينهم اليومي.
            </p>
            <div className="flex flex-wrap gap-8 justify-center pt-10">
              <a href="#" className="transition-transform hover:scale-105 active:scale-95">
                <Image src={appStoreBadge} alt="Download on the App Store" width={180} height={60} className="h-[60px] w-auto" />
              </a>
              <a href="#" className="transition-transform hover:scale-105 active:scale-95">
                <Image src={googlePlayBadge} alt="Get it on Google Play" width={200} height={60} className="h-[60px] w-auto" />
              </a>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
