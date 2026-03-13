
"use client";

import Image from 'next/image';
import { CheckCircle2, Star, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AppDownloadCTA() {
  return (
    <section className="bg-zinc-50 py-16 md:py-24" dir="rtl">
      <div className="container mx-auto px-4">
        {/* Material Design 3 Surface Container */}
        <div className="relative overflow-hidden bg-white border border-zinc-200 rounded-[3rem] p-8 md:p-16 shadow-sm">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
            
            {/* Content Section */}
            <div className="flex-1 text-right order-1 lg:order-2 w-full">
              <div className="flex items-center gap-2 mb-6 justify-end flex-row-reverse">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <Download className="w-6 h-6" />
                </div>
                <span className="text-sm font-black text-primary uppercase tracking-wider">تطبيق تاتكس الجديد</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-black text-zinc-900 mb-8 leading-[1.2]">
                كل ما تحتاجه..<br />
                <span className="text-primary">في جيبك الآن.</span>
              </h2>
              
              <p className="text-xl text-zinc-600 font-bold mb-10 max-w-xl leading-relaxed ml-0 mr-auto">
                استمتع بتجربة "تاتكس" الكاملة عبر التطبيق. اطلب وجباتك، احجز مشاويرك، أو نسق لمناسباتك القادمة بسرعة وسهولة فائقة.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                {[
                  'تتبع مباشر وحي لطلبك',
                  'عروض حصرية لمستخدمي التطبيق',
                  'دفع آمن بلمسة واحدة',
                  'دعم فني فوري 24/7'
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-zinc-700 font-black flex-row-reverse justify-end">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Official Store Buttons - Right Aligned */}
              <div className="flex flex-wrap gap-4 justify-end flex-row-reverse">
                {/* App Store Button */}
                <Button 
                  size="lg" 
                  className="bg-black text-white hover:bg-zinc-900 h-[60px] px-6 rounded-xl gap-3 shadow-none transition-all flex-row-reverse border-none"
                >
                  <svg viewBox="0 0 384 512" fill="currentColor" className="w-8 h-8">
                    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 21.8-88.5 21.8-11.4 0-51.1-20.8-83.6-20.8-41.2 0-82.3 25-103.3 61.2-40.6 69.8-10.4 175.1 28.7 231.1 19.1 27.4 42.1 58.1 71.8 57 28.6-1.1 39.4-18.1 74.1-18.1 34.2 0 44.1 18.1 74.1 17.6 30.5-.5 50.5-27.4 69.1-54.4 21.8-31.4 30.5-62 30.9-63.6-.6-.2-59.5-22.9-59.7-87.3zm-46.6-170.5c15.5-18.8 25.9-45 23-71.1-22.5 1-49.4 15.2-65.6 34.1-14.4 16.6-27.1 43.1-24.1 68.6 24.8 1.9 49.3-13 66.7-31.6z"/>
                  </svg>
                  <div className="text-right flex flex-col items-end leading-none">
                    <span className="text-[10px] font-bold opacity-80 mb-0.5">Download on the</span>
                    <span className="text-lg font-black tracking-tight">App Store</span>
                  </div>
                </Button>
                
                {/* Google Play Button */}
                <Button 
                  variant="outline"
                  size="lg" 
                  className="bg-black text-white hover:bg-zinc-900 h-[60px] px-6 rounded-xl gap-3 border-none shadow-none transition-all flex-row-reverse"
                >
                  <svg viewBox="0 0 512 512" fill="currentColor" className="w-8 h-8">
                    <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
                  </svg>
                  <div className="text-right flex flex-col items-end leading-none">
                    <span className="text-[10px] font-bold opacity-80 mb-0.5">GET IT ON</span>
                    <span className="text-lg font-black tracking-tight">Google Play</span>
                  </div>
                </Button>
              </div>
            </div>

            {/* Visual Section - Smartphone Mockup */}
            <div className="flex-1 relative w-full max-w-md aspect-[4/5] order-2 lg:order-1 flex justify-center items-end">
              <div className="relative w-full h-[110%] bottom-0 transform translate-y-12 lg:translate-y-24">
                 <div className="relative w-full h-full rounded-[3rem] overflow-hidden border-[12px] border-zinc-900 shadow-2xl bg-zinc-100">
                    <Image 
                      src="https://picsum.photos/seed/tatx-app-premium/800/1200" 
                      alt="تطبيق تاتكس" 
                      fill 
                      className="object-cover"
                      data-ai-hint="smartphone interface"
                    />
                    {/* Floating Trust Card */}
                    <div className="absolute top-10 right-[-20px] bg-white p-4 rounded-2xl shadow-xl border border-zinc-100 flex items-center gap-3 flex-row-reverse animate-bounce-slow">
                       <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                          <Star className="w-5 h-5 fill-white" />
                       </div>
                       <div className="text-right">
                          <span className="block font-black text-sm">4.9 تقييم</span>
                          <span className="text-[10px] text-zinc-400 font-bold">أكثر من 500ألف مستخدم</span>
                       </div>
                    </div>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
