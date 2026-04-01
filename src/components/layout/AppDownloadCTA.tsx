
"use client";

import Image from 'next/image';

export function AppDownloadCTA() {
  const appStoreUrl = "https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg";
  const googlePlayUrl = "https://storage.googleapis.com/pe-portal-consumer-prod-wagtail-static/images/googleplay-badge-01-getit.width-1440.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=wagtail%40pe-portal-consumer-prod.iam.gserviceaccount.com%2F20260401%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20260401T070647Z&X-Goog-Expires=86400&X-Goog-SignedHeaders=host&X-Goog-Signature=8f41108c3f91c16681aa762bdf17525548b03092f6564192a9487ce5ca0e80afdddf144527da9801b0d82e6c06bf2e7005d610a9cbf7ee32a5ab5b2d7ad3105ca97345a71152b9bb67e2b36990350ae4d365b25ae67e666208c794e49e61156bcd828aa1f43cca2dcacece3e77d7735398a4ab15958fb5aaf2c6171400d8b1d883c5e783868d77696c5cdf0014959138cbb3680684d1636ceb0f5ec170575c3afa914bda43251aced0d4c0eb4976c9640a94613319cd0a3cdfbe245ad82194fab7c6be7e95b38f50a8e0dd755a73e70f11046b0d9dcc62f42eee85581b8b477b5951b399b952d6a92dc4963913dffc60bc61995d34b70ce905130845346c6139";

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
                <div className="relative h-[65px] w-[190px] cursor-pointer hover:scale-105 transition-transform">
                  <Image 
                    src={appStoreUrl} 
                    alt="Download on the App Store" 
                    fill 
                    className="object-contain" 
                  />
                </div>
                <div className="relative h-[65px] w-[210px] cursor-pointer hover:scale-105 transition-transform">
                  <Image 
                    src={googlePlayUrl} 
                    alt="Get it on Google Play" 
                    fill 
                    className="object-contain" 
                  />
                </div>
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
