
"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Apple } from 'lucide-react';

export function AppDownloadCTA() {
  return (
    <section className="bg-white py-32" dir="rtl">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="relative overflow-hidden bg-primary/5 rounded-[4rem] p-12 md:p-24 border border-primary/10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-20 relative z-10">
            
            <div className="flex-1 text-right order-1 lg:order-2 w-full space-y-10">
              <h2 className="text-5xl md:text-[80px] font-black text-[#1D1D1F] leading-[0.9] tracking-tight">
                كل ما تحتاجه <br />
                <span className="text-primary italic">في جيبك الآن.</span>
              </h2>
              
              <p className="text-2xl text-[#86868B] font-bold max-w-xl leading-relaxed">
                استمتع بتجربة Tatx الكاملة عبر التطبيق. اطلب وجباتك، احجز مشاويرك، أو نسق لمناسباتك القادمة بسرعة وسهولة فائقة.
              </p>
              
              <div className="flex flex-wrap gap-6 justify-end">
                <Button className="h-[80px] px-10 rounded-3xl bg-[#1D1D1F] text-white hover:bg-[#1D1D1F]/90 font-black text-2xl gap-5 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] transition-all hover:scale-105 active:scale-95">
                  <Apple className="w-10 h-10" />
                  <div className="text-right flex flex-col items-start leading-none">
                    <span className="text-xs opacity-60 font-bold">Download on the</span>
                    <span className="text-2xl font-black">App Store</span>
                  </div>
                </Button>
                
                <Button className="h-[80px] px-10 rounded-3xl bg-white text-[#1D1D1F] border-2 border-[#D2D2D7] hover:bg-[#F5F5F7] font-black text-2xl gap-5 transition-all hover:scale-105 active:scale-95">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <svg viewBox="0 0 512 512" fill="currentColor" className="w-full h-full">
                      <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
                    </svg>
                  </div>
                  <div className="text-right flex flex-col items-start leading-none">
                    <span className="text-xs opacity-60 font-bold">GET IT ON</span>
                    <span className="text-2xl font-black">Google Play</span>
                  </div>
                </Button>
              </div>
            </div>

            <div className="flex-1 relative w-full max-w-md aspect-[4/5] order-2 lg:order-1 flex justify-center items-end">
              <div className="relative w-full h-[115%] bottom-[-5%]">
                 <div className="relative w-full h-full rounded-[4rem] overflow-hidden border-[12px] border-[#1D1D1F] shadow-[0_60px_100px_-30px_rgba(0,0,0,0.3)] bg-white">
                    <Image 
                      src="https://picsum.photos/seed/tatx-iphone-powerful/1000/1500" 
                      alt="تطبيق Tatx الذكي" 
                      fill 
                      className="object-cover"
                    />
                 </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
