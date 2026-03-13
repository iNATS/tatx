"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';

export function AppDownloadCTA() {
  return (
    <section className="bg-background py-16 md:py-28" dir="rtl">
      <div className="container mx-auto px-4">
        {/* MD3 Surface Container with Elevated Design */}
        <div className="relative overflow-hidden bg-white border border-border rounded-[3.5rem] p-10 md:p-20 shadow-sm md-elevation-1">
          {/* Subtle MD3 Background Detail */}
          <div className="absolute top-0 right-0 w-full h-full bg-primary/5 -z-0" />
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
            
            {/* Content Section */}
            <div className="flex-1 text-right order-1 lg:order-2 w-full">
              <h2 className="text-4xl md:text-7xl font-black text-foreground mb-8 leading-[1.1] tracking-tighter">
                كل ما تحتاجه..<br />
                <span className="text-primary">في جيبك الآن.</span>
              </h2>
              
              <p className="text-xl md:text-2xl text-muted-foreground font-bold mb-12 max-w-xl leading-relaxed mr-0 ml-auto text-right">
                استمتع بتجربة "تاتكس" الكاملة عبر التطبيق. اطلب وجباتك، احجز مشاويرك، أو نسق لمناسباتك القادمة بسرعة وسهولة فائقة.
              </p>
              
              {/* Official Store Buttons - MD3 Themed */}
              <div className="flex flex-wrap gap-5 justify-end flex-row-reverse">
                <Button 
                  size="lg" 
                  className="bg-foreground text-background hover:bg-foreground/90 h-[70px] px-8 rounded-2xl gap-4 shadow-xl transition-all active:scale-95 flex-row-reverse border-none"
                >
                  <svg viewBox="0 0 384 512" fill="currentColor" className="w-9 h-9">
                    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 21.8-88.5 21.8-11.4 0-51.1-20.8-83.6-20.8-41.2 0-82.3 25-103.3 61.2-40.6 69.8-10.4 175.1 28.7 231.1 19.1 27.4 42.1 58.1 71.8 57 28.6-1.1 39.4-18.1 74.1-18.1 34.2 0 44.1 18.1 74.1 17.6 30.5-.5 50.5-27.4 69.1-54.4 21.8-31.4 30.5-62 30.9-63.6-.6-.2-59.5-22.9-59.7-87.3zm-46.6-170.5c15.5-18.8 25.9-45 23-71.1-22.5 1-49.4 15.2-65.6 34.1-14.4 16.6-27.1 43.1-24.1 68.6 24.8 1.9 49.3-13 66.7-31.6z"/>
                  </svg>
                  <div className="text-right flex flex-col items-end leading-none">
                    <span className="text-xs font-bold opacity-60 mb-1">Download on the</span>
                    <span className="text-xl font-black tracking-tight">App Store</span>
                  </div>
                </Button>
                
                <Button 
                  size="lg" 
                  className="bg-foreground text-background hover:bg-foreground/90 h-[70px] px-8 rounded-2xl gap-4 shadow-xl transition-all active:scale-95 flex-row-reverse border-none"
                >
                  <svg viewBox="0 0 512 512" fill="currentColor" className="w-9 h-9">
                    <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
                  </svg>
                  <div className="text-right flex flex-col items-end leading-none">
                    <span className="text-xs font-bold opacity-60 mb-1">GET IT ON</span>
                    <span className="text-xl font-black tracking-tight">Google Play</span>
                  </div>
                </Button>
              </div>
            </div>

            {/* Smartphone Mockup with MD3 Rounding */}
            <div className="flex-1 relative w-full max-w-md aspect-[4/5] order-2 lg:order-1 flex justify-center items-end">
              <div className="relative w-full h-[115%] bottom-0 transform translate-y-16 lg:translate-y-32">
                 <div className="relative w-full h-full rounded-[4rem] overflow-hidden border-[14px] border-foreground shadow-2xl bg-secondary md-elevation-3">
                    <Image 
                      src="https://picsum.photos/seed/tatx-md3-app/800/1200" 
                      alt="تطبيق تاتكس" 
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