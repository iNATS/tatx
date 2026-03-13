
"use client";

import Image from 'next/image';
import { Apple, Smartphone, CheckCircle2, Star, Zap, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function AppDownloadCTA() {
  return (
    <section className="bg-zinc-50 py-16 md:py-24" dir="rtl">
      <div className="container mx-auto px-4">
        {/* Material Design 3 Surface Container */}
        <div className="relative overflow-hidden bg-white border border-zinc-200 rounded-[2.5rem] p-8 md:p-16 shadow-sm">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
            
            {/* Image Section - Simplified per MD3 */}
            <div className="flex-1 relative w-full max-w-md aspect-[4/5] md:aspect-square order-2 lg:order-1">
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-zinc-100 flex items-center justify-center">
                 <Image 
                   src="https://picsum.photos/seed/tatx-app-md3/800/1000" 
                   alt="تطبيق تاتكس" 
                   fill 
                   className="object-cover"
                   data-ai-hint="minimalist smartphone"
                 />
                 {/* Subtle MD3 Overlay Chips */}
                 <div className="absolute top-6 right-6 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-sm flex items-center gap-2 border border-zinc-100">
                    <Star className="w-4 h-4 text-primary fill-primary" />
                    <span className="text-sm font-bold">4.9 تقييم</span>
                 </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 text-right order-1 lg:order-2">
              <div className="flex items-center gap-2 mb-6 justify-start flex-row-reverse">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <Download className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-zinc-500 uppercase tracking-widest">متاح الآن</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-black text-zinc-900 mb-6 leading-tight">
                تجربة "تاتكس"<br />
                كما لم تعهدها من قبل.
              </h2>
              
              <p className="text-lg text-zinc-600 font-medium mb-10 max-w-xl leading-relaxed">
                استمتع بواجهة مستخدم ذكية وسريعة. اطلب طعامك، احجز مشوارك، أو نسق مناسباتك. كل ذلك في تطبيق واحد صُمم لراحتك.
              </p>
              
              <div className="space-y-4 mb-10">
                {[
                  'واجهة عصرية سهلة الاستخدام',
                  'تنبيهات فورية لحالة الطلب',
                  'عروض حصرية لمستخدمي التطبيق'
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-zinc-700 font-bold flex-row-reverse">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* MD3 Tonal Buttons */}
              <div className="flex flex-wrap gap-4 justify-start flex-row-reverse">
                <Button 
                  size="lg" 
                  className="bg-zinc-900 text-white hover:bg-zinc-800 h-16 px-8 rounded-2xl gap-3 shadow-none transition-all flex-row-reverse"
                >
                  <Apple className="w-6 h-6" />
                  <div className="text-right">
                    <span className="text-[10px] block opacity-70">Download on</span>
                    <span className="text-base font-black block">App Store</span>
                  </div>
                </Button>
                
                <Button 
                  variant="outline"
                  size="lg" 
                  className="bg-white text-zinc-900 hover:bg-zinc-50 h-16 px-8 rounded-2xl gap-3 border-zinc-200 shadow-none transition-all flex-row-reverse"
                >
                  <div className="w-6 h-6 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L18.66,14L4.84,22.85C4.84,22.85 14.5,16.76 16.81,15.12M18.66,10L16.81,8.88C14.5,7.24 4.84,1.15 4.84,1.15L18.66,10M14.69,13L21,9.42C21.61,9.07 22,8.43 22,7.75C22,7.07 21.61,6.43 21,6.08L14.69,11L14.69,13Z" />
                    </svg>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] block opacity-70">Get it on</span>
                    <span className="text-base font-black block">Google Play</span>
                  </div>
                </Button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
