
"use client";

import Image from 'next/image';
import { Apple, Smartphone, CheckCircle2, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function AppDownloadCTA() {
  return (
    <section className="bg-white py-12 md:py-24" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden bg-zinc-950 rounded-[3rem] p-8 md:p-20 group">
          {/* Background Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,#E27E3615,transparent_50%)]" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-[100px] opacity-50" />
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
            {/* Text Content */}
            <div className="flex-1 text-right">
              <Badge className="bg-primary/20 text-primary border-none font-black px-6 py-2 rounded-full mb-8 text-sm animate-pulse">
                تطبيق تاتكس الجديد 2024
              </Badge>
              
              <h2 className="text-4xl md:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tight">
                كل خدماتنا..<br />
                بين <span className="text-primary italic">يديك</span> الآن.
              </h2>
              
              <p className="text-xl text-zinc-400 font-bold mb-12 max-w-2xl leading-relaxed">
                استمتع بتجربة "السوبر آب" المتكاملة. اطلب وجبتك، احجز مشوارك، أو نسق لمناسبتك بضغطة زر واحدة. السرعة والأمان في تطبيق واحد.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12 max-w-lg">
                {[
                  { text: 'حجز فوري في أقل من دقيقة', icon: Zap },
                  { text: 'عروض حصرية لمستخدمي التطبيق', icon: Star },
                  { text: 'تتبع مباشر لطلبك لحظة بلحظة', icon: Smartphone },
                  { text: 'دفع آمن بلمسة واحدة عبر التطبيق', icon: CheckCircle2 }
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-white/80 font-bold text-sm bg-white/5 p-4 rounded-2xl border border-white/10">
                    <feature.icon className="w-5 h-5 text-primary shrink-0" />
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-5 justify-start flex-row-reverse">
                <Button 
                  size="lg" 
                  className="bg-white text-black hover:bg-zinc-200 h-20 px-10 rounded-[1.8rem] gap-4 shadow-2xl transition-all hover:scale-105 group/btn"
                >
                  <div className="text-right">
                    <span className="text-[10px] block opacity-60 font-black">تحميل من</span>
                    <span className="text-xl font-black block leading-none">App Store</span>
                  </div>
                  <Apple className="w-10 h-10" />
                </Button>
                
                <Button 
                  size="lg" 
                  className="bg-zinc-800 text-white hover:bg-zinc-700 h-20 px-10 rounded-[1.8rem] gap-4 shadow-2xl transition-all hover:scale-105 group/btn border border-white/10"
                >
                  <div className="text-right">
                    <span className="text-[10px] block opacity-60 font-black">احصل عليه من</span>
                    <span className="text-xl font-black block leading-none">Google Play</span>
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L18.66,14L4.84,22.85C4.84,22.85 14.5,16.76 16.81,15.12M18.66,10L16.81,8.88C14.5,7.24 4.84,1.15 4.84,1.15L18.66,10M14.69,13L21,9.42C21.61,9.07 22,8.43 22,7.75C22,7.07 21.61,6.43 21,6.08L14.69,11L14.69,13Z" />
                    </svg>
                  </div>
                </Button>
              </div>
            </div>

            {/* Visual Element */}
            <div className="flex-1 relative w-full max-w-lg aspect-square lg:aspect-auto h-auto lg:h-[700px]">
              {/* Floating Stat Card */}
              <div className="absolute top-1/4 -right-12 z-30 bg-white p-5 rounded-[2rem] shadow-2xl animate-float-slow hidden md:flex items-center gap-4 flex-row-reverse border border-zinc-100">
                <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center text-white">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="text-right">
                  <span className="block font-black text-lg">طلب مكتمل!</span>
                  <span className="text-xs text-muted-foreground font-bold">بواسطة تاتكس كابتن</span>
                </div>
              </div>

              <div className="absolute bottom-1/4 -left-12 z-30 bg-primary p-5 rounded-[2rem] shadow-2xl animate-float-delayed hidden md:flex items-center gap-4 flex-row-reverse">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-white">
                  <Zap className="w-8 h-8" />
                </div>
                <div className="text-right">
                  <span className="block font-black text-lg text-white">حجز مؤكد</span>
                  <span className="text-xs text-white/70 font-bold">شاليهات الملقا</span>
                </div>
              </div>

              <div className="relative w-full h-full animate-float">
                 <Image 
                   src="https://picsum.photos/seed/tatx-app-v2/1000/1200" 
                   alt="تطبيق تاتكس" 
                   fill 
                   className="object-contain drop-shadow-[0_50px_50px_rgba(0,0,0,0.5)]"
                   data-ai-hint="smartphone mockup"
                 />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-15px) translateX(-10px); }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
}
