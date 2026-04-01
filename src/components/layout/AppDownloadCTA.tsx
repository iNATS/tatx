"use client";

import Image from 'next/image';

export function AppDownloadCTA() {
  const appStoreBadge = "https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg";
  const googlePlayBadge = "https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg";

  return (
    <section id="download" className="bg-white py-32" dir="rtl">
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
                <a href="#" className="transition-transform hover:scale-105 active:scale-95">
                  <Image src={appStoreBadge} alt="Download on the App Store" width={180} height={54} className="h-[54px] w-auto" />
                </a>
                <a href="#" className="transition-transform hover:scale-105 active:scale-95">
                  <Image src={googlePlayBadge} alt="Get it on Google Play" width={180} height={54} className="h-[54px] w-auto" />
                </a>
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
