
"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Smartphone, Apple } from 'lucide-react';

export function AppDownloadCTA() {
  return (
    <section className="bg-white py-24 md:py-32" dir="rtl">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="relative overflow-hidden bg-[#F5F5F7] rounded-[3.5rem] p-12 md:p-24 border border-[#D2D2D7]/30">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
            
            <div className="flex-1 text-right order-1 lg:order-2 w-full space-y-8">
              <h2 className="text-4xl md:text-7xl font-black text-[#1D1D1F] leading-tight tracking-tight">
                كل ما تحتاجه <br />
                <span className="text-primary">في جيبك الآن.</span>
              </h2>
              
              <p className="text-xl md:text-2xl text-[#86868B] font-bold max-w-xl leading-relaxed">
                استمتع بتجربة Tatx الكاملة عبر التطبيق. اطلب وجباتك، احجز مشاويرك، أو نسق لمناسباتك القادمة بسرعة وسهولة فائقة بضمان آبل المعتمد.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-end">
                <Button className="h-[70px] px-8 rounded-2xl bg-[#1D1D1F] text-white hover:bg-[#1D1D1F]/90 font-black text-xl gap-4 shadow-none border-none">
                  <Apple className="w-8 h-8" />
                  <div className="text-right flex flex-col items-start leading-none">
                    <span className="text-[10px] opacity-60">Download on the</span>
                    <span className="text-xl font-black">App Store</span>
                  </div>
                </Button>
                
                <Button className="h-[70px] px-8 rounded-2xl bg-[#1D1D1F] text-white hover:bg-[#1D1D1F]/90 font-black text-xl gap-4 shadow-none border-none">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <svg viewBox="0 0 512 512" fill="currentColor" className="w-full h-full">
                      <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
                    </svg>
                  </div>
                  <div className="text-right flex flex-col items-start leading-none">
                    <span className="text-[10px] opacity-60">GET IT ON</span>
                    <span className="text-xl font-black">Google Play</span>
                  </div>
                </Button>
              </div>
            </div>

            <div className="flex-1 relative w-full max-w-md aspect-[4/5] order-2 lg:order-1 flex justify-center items-end">
              <div className="relative w-full h-[110%] bottom-0">
                 <div className="relative w-full h-full rounded-[3.5rem] overflow-hidden border-[10px] border-[#1D1D1F] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)] bg-white">
                    <Image 
                      src="https://picsum.photos/seed/tatx-iphone-app/800/1200" 
                      alt="تطبيق Tatx" 
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
