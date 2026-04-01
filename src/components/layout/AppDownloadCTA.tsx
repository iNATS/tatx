"use client";

import { Apple, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
              
              <div className="flex flex-wrap gap-6 justify-end pt-4">
                <Button className="h-[74px] px-8 rounded-2xl bg-black text-white hover:bg-black/90 font-black gap-4 shadow-xl transition-all hover:scale-105 active:scale-95 border-none">
                  <div className="flex flex-col items-end leading-none">
                    <span className="text-[10px] font-bold opacity-60">Download on the</span>
                    <span className="text-xl">App Store</span>
                  </div>
                  <Apple className="w-8 h-8" />
                </Button>
                <Button className="h-[74px] px-8 rounded-2xl bg-black text-white hover:bg-black/90 font-black gap-4 shadow-xl transition-all hover:scale-105 active:scale-95 border-none">
                  <div className="flex flex-col items-end leading-none">
                    <span className="text-[10px] font-bold opacity-60">GET IT ON</span>
                    <span className="text-xl">Google Play</span>
                  </div>
                  <div className="w-8 h-8 flex items-center justify-center">
                    <Play className="w-7 h-7 fill-white" />
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

import Image from 'next/image';
