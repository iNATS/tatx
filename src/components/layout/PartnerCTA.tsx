
"use client";

import { Car, Store, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function PartnerCTA() {
  return (
    <section className="bg-white pb-40" dir="rtl">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          <div className="bg-[#FBFBFD] rounded-[4rem] p-16 flex flex-col justify-between hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.05)] transition-all duration-700 group border border-[#D2D2D7]/40">
            <div className="text-right space-y-8">
              <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mb-10 mr-0 ml-auto transition-all group-hover:scale-110 group-hover:rotate-3">
                <Car className="w-10 h-10" />
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-[#1D1D1F] tracking-tight">انضم ككابتن Tatx</h3>
              <p className="text-xl text-[#86868B] font-bold leading-relaxed mb-10">
                هل تملك سيارة وترغب في زيادة دخلك؟ كن جزءاً من عائلة كباتن Tatx اليوم واستمتع بحرية تامة في العمل.
              </p>
            </div>
            <Link href="/auth/signup">
              <Button 
                size="lg" 
                className="w-fit rounded-2xl h-16 px-12 text-xl font-black gap-4 bg-[#1D1D1F] text-white hover:bg-[#1D1D1F]/90 shadow-xl transition-all active:scale-95"
              >
                سجل ككابتن الآن
                <ArrowLeft className="w-6 h-6" />
              </Button>
            </Link>
          </div>

          <div className="bg-[#FBFBFD] rounded-[4rem] p-16 flex flex-col justify-between hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.05)] transition-all duration-700 group border border-[#D2D2D7]/40">
            <div className="text-right space-y-8">
              <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mb-10 mr-0 ml-auto transition-all group-hover:scale-110 group-hover:rotate-3">
                <Store className="w-10 h-10" />
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-[#1D1D1F] tracking-tight">انضم كمزود خدمة</h3>
              <p className="text-xl text-[#86868B] font-bold leading-relaxed mb-10">
                حوّل عملك إلى منصة رقمية متكاملة. Tatx هو بوابتك للوصول لآلاف العملاء الجدد في المملكة.
              </p>
            </div>
            <Link href="/auth/signup">
              <Button 
                size="lg" 
                className="w-fit rounded-2xl h-16 px-12 text-xl font-black gap-4 bg-white text-[#1D1D1F] border-2 border-[#D2D2D7] hover:bg-[#F5F5F7] shadow-lg transition-all active:scale-95"
              >
                سجل متجرك الآن
                <ArrowLeft className="w-6 h-6" />
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
