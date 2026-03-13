
"use client";

import Image from 'next/image';
import { Smartphone, Apple, PlayCircle, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AppDownloadCTA() {
  return (
    <section className="bg-primary overflow-hidden py-16 md:py-0" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="flex-1 text-right py-12 md:py-24">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              تاتكس في جيبك..<br />
              حمل التطبيق الآن!
            </h2>
            <p className="text-xl text-white/90 font-bold mb-10 max-w-xl">
              استمتع بتجربة أسرع وأكثر سلاسة. اطلب وجبتك، احجز مشوارك، أو نسق لمناسبتك بضغطة زر واحدة من هاتفك.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-start flex-row-reverse">
              <Button 
                size="lg" 
                className="bg-black text-white hover:bg-black/80 h-16 px-8 rounded-2xl gap-3 shadow-xl border-none"
              >
                <div className="text-right">
                  <span className="text-[10px] block opacity-70 font-bold">حمل من</span>
                  <span className="text-lg font-black block leading-none">App Store</span>
                </div>
                <Apple className="w-8 h-8" />
              </Button>
              
              <Button 
                size="lg" 
                className="bg-black text-white hover:bg-black/80 h-16 px-8 rounded-2xl gap-3 shadow-xl border-none"
              >
                <div className="text-right">
                  <span className="text-[10px] block opacity-70 font-bold">احصل عليه من</span>
                  <span className="text-lg font-black block leading-none">Google Play</span>
                </div>
                <div className="w-8 h-8 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L18.66,14L4.84,22.85C4.84,22.85 14.5,16.76 16.81,15.12M18.66,10L16.81,8.88C14.5,7.24 4.84,1.15 4.84,1.15L18.66,10M14.69,13L21,9.42C21.61,9.07 22,8.43 22,7.75C22,7.07 21.61,6.43 21,6.08L14.69,11L14.69,13Z" />
                  </svg>
                </div>
              </Button>
            </div>
            
            <div className="mt-10 flex items-center gap-4 text-white/80 font-bold flex-row-reverse">
              <div className="flex -space-x-3 space-x-reverse">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-primary bg-secondary relative overflow-hidden">
                    <Image src={`https://picsum.photos/seed/user${i}/100/100`} alt="User" fill />
                  </div>
                ))}
              </div>
              <span>أكثر من +500 ألف مستخدم يثقون بتاتكس</span>
            </div>
          </div>

          {/* Visual Element */}
          <div className="flex-1 relative w-full max-w-md h-[400px] md:h-[600px] mt-8 md:mt-0">
            <div className="absolute inset-0 bg-white/10 rounded-full blur-[100px] -z-10" />
            <div className="relative w-full h-full animate-float">
               <Image 
                 src="https://picsum.photos/seed/tatx-app/800/1200" 
                 alt="Tatx Mobile App" 
                 fill 
                 className="object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.3)]"
                 data-ai-hint="mobile app mockup"
               />
            </div>
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
