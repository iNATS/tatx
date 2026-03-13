"use client";

import { Car, Store, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function PartnerCTA() {
  return (
    <section className="bg-zinc-50 pb-16 md:pb-24" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Driver Registration Card */}
          <div className="bg-white border border-zinc-200 rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="text-right">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8 mr-0 ml-auto">
                <Car className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-black text-zinc-900 mb-4">انضم ككابتن تاتكس</h3>
              <p className="text-lg text-zinc-600 font-bold mb-8 leading-relaxed">
                هل تملك سيارة وترغب في زيادة دخلك؟ انضم إلى فريق كباتن تاتكس واستمتع بساعات عمل مرنة ودعم مستمر.
              </p>
            </div>
            <Link href="/register/driver">
              <Button 
                size="lg" 
                className="w-full md:w-fit rounded-2xl h-14 px-10 text-lg font-black gap-3 flex-row-reverse bg-zinc-900 text-white hover:bg-zinc-800 shadow-none border-none"
              >
                سجل الآن ككابتن
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
          </div>

          {/* Vendor Registration Card */}
          <div className="bg-white border border-zinc-200 rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="text-right">
              <div className="w-16 h-16 bg-[#E27E36]/10 rounded-2xl flex items-center justify-center text-[#E27E36] mb-8 mr-0 ml-auto">
                <Store className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-black text-zinc-900 mb-4">انضم كمزود خدمة</h3>
              <p className="text-lg text-zinc-600 font-bold mb-8 leading-relaxed">
                سواء كنت تملك مطعماً، سوبر ماركت، أو تقدم خدمات صيانة؛ تاتكس هو بوابتك للوصول لآلاف العملاء يومياً.
              </p>
            </div>
            <Link href="/register/vendor">
              <Button 
                size="lg" 
                variant="outline"
                className="w-full md:w-fit rounded-2xl h-14 px-10 text-lg font-black gap-3 flex-row-reverse border-2 border-zinc-900 text-zinc-900 hover:bg-zinc-50 shadow-none"
              >
                سجل متجرك الآن
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
