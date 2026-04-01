
"use client";

import { Car, Store, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function PartnerCTA() {
  return (
    <section className="bg-white pb-32" dir="rtl">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-[#F5F5F7] rounded-[2.5rem] p-12 flex flex-col justify-between hover:bg-[#E8E8ED] transition-all duration-500 group border border-[#D2D2D7]/30">
            <div className="text-right space-y-6">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8 mr-0 ml-auto">
                <Car className="w-7 h-7" />
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-[#1D1D1F] tracking-tight">انضم ككابتن Tatx</h3>
              <p className="text-lg text-[#86868B] font-bold leading-relaxed mb-8">
                هل تملك سيارة وترغب في زيادة دخلك؟ كن جزءاً من عائلة كباتن Tatx اليوم واستمتع بساعات عمل مرنة.
              </p>
            </div>
            <Link href="/register/driver">
              <Button 
                size="lg" 
                className="w-fit rounded-full h-14 px-10 text-lg font-black gap-3 bg-[#1D1D1F] text-white hover:bg-[#1D1D1F]/90 shadow-none border-none transition-all active:scale-95"
              >
                سجل الآن
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
          </div>

          <div className="bg-[#F5F5F7] rounded-[2.5rem] p-12 flex flex-col justify-between hover:bg-[#E8E8ED] transition-all duration-500 group border border-[#D2D2D7]/30">
            <div className="text-right space-y-6">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8 mr-0 ml-auto">
                <Store className="w-7 h-7" />
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-[#1D1D1F] tracking-tight">انضم كمزود خدمة</h3>
              <p className="text-lg text-[#86868B] font-bold leading-relaxed mb-8">
                سواء كنت تملك مطعماً أو تقدم خدمات صيانة؛ Tatx هو بوابتك للوصول لآلاف العملاء في المملكة.
              </p>
            </div>
            <Link href="/register/vendor">
              <Button 
                size="lg" 
                className="w-fit rounded-full h-14 px-10 text-lg font-black gap-3 bg-white text-[#1D1D1F] border border-[#D2D2D7] hover:bg-[#F5F5F7] shadow-none transition-all active:scale-95"
              >
                سجل متجرك
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
