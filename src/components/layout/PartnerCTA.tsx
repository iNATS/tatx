"use client";

import { Car, Store, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function PartnerCTA() {
  return (
    <section className="bg-background pb-16 md:pb-28" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Driver Registration Card - MD3 Tonal Surface */}
          <div className="bg-white border border-border rounded-[3rem] p-10 md:p-14 flex flex-col justify-between hover:shadow-xl hover:md-elevation-2 transition-all duration-500 group">
            <div className="text-right">
              <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mb-10 mr-0 ml-auto transition-transform group-hover:rotate-12">
                <Car className="w-8 h-8" />
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-foreground mb-6 tracking-tight">انضم ككابتن تاتكس</h3>
              <p className="text-lg text-muted-foreground font-bold mb-10 leading-relaxed">
                هل تملك سيارة وترغب في زيادة دخلك؟ انضم إلى فريق كباتن تاتكس واستمتع بساعات عمل مرنة ودعم مستمر.
              </p>
            </div>
            <Link href="/register/driver">
              <Button 
                size="lg" 
                className="w-full md:w-fit rounded-2xl h-16 px-12 text-xl font-black gap-3 flex-row-reverse bg-foreground text-background hover:bg-foreground/90 shadow-xl border-none transition-all active:scale-95"
              >
                سجل الآن ككابتن
                <ArrowLeft className="w-6 h-6" />
              </Button>
            </Link>
          </div>

          {/* Vendor Registration Card - MD3 Tonal Surface */}
          <div className="bg-white border border-border rounded-[3rem] p-10 md:p-14 flex flex-col justify-between hover:shadow-xl hover:md-elevation-2 transition-all duration-500 group">
            <div className="text-right">
              <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mb-10 mr-0 ml-auto transition-transform group-hover:rotate-12">
                <Store className="w-8 h-8" />
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-foreground mb-6 tracking-tight">انضم كمزود خدمة</h3>
              <p className="text-lg text-muted-foreground font-bold mb-10 leading-relaxed">
                سواء كنت تملك مطعماً، سوبر ماركت، أو تقدم خدمات صيانة؛ تاتكس هو بوابتك للوصول لآلاف العملاء يومياً.
              </p>
            </div>
            <Link href="/register/vendor">
              <Button 
                size="lg" 
                variant="outline"
                className="w-full md:w-fit rounded-2xl h-16 px-12 text-xl font-black gap-3 flex-row-reverse border-2 border-foreground text-foreground hover:bg-secondary shadow-xl transition-all active:scale-95"
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