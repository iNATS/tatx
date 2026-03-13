"use client";

import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, CheckCircle2, Navigation, ShoppingBag } from 'lucide-react';

export default function DeliveryActivePage() {
  return (
    <div className="flex bg-[#F8F9FA] min-h-screen" dir="rtl">
      <PortalSidebar role="driver" title="Driver" />
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="mb-12 text-right">
          <h1 className="text-4xl font-black mb-2">الطلب النشط</h1>
          <p className="text-muted-foreground font-bold">تفاصيل الرحلة والطلب الذي تقوم بتوصيله الآن.</p>
        </header>

        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="border-none shadow-xl rounded-[2.5rem] bg-white overflow-hidden ring-4 ring-primary/5">
            <div className="bg-primary p-8 text-white flex justify-between items-center flex-row-reverse">
              <Badge className="bg-white/20 text-white border-none font-black px-4 py-2 rounded-xl">جاري التوصيل</Badge>
              <h2 className="text-2xl font-black">#TX-9005</h2>
            </div>
            <CardContent className="p-8 space-y-10">
              <div className="space-y-8 relative pr-8">
                <div className="absolute right-3 top-2 bottom-2 w-0.5 bg-secondary border-r-2 border-dashed border-primary/30" />
                
                <div className="relative flex items-center gap-6 flex-row-reverse text-right">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white shrink-0 z-10">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-bold text-muted-foreground block mb-1">الاستلام من:</span>
                    <h4 className="font-black text-lg">مطعم قصر المندي</h4>
                    <p className="text-sm text-muted-foreground font-bold">طريق الأمير محمد بن سلمان، الرياض</p>
                  </div>
                </div>

                <div className="relative flex items-center gap-6 flex-row-reverse text-right">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white shrink-0 z-10">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-bold text-muted-foreground block mb-1">التسليم إلى:</span>
                    <h4 className="font-black text-lg">حي الملقا</h4>
                    <p className="text-sm text-muted-foreground font-bold">فيلا رقم 12، شارع العليا العام</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button className="flex-1 h-16 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-black text-xl gap-3 shadow-xl">
                  <CheckCircle2 className="w-6 h-6" />
                  تم التسليم للعميل
                </Button>
                <Button variant="secondary" size="icon" className="w-16 h-16 rounded-2xl">
                  <Phone className="w-6 h-6 text-primary" />
                </Button>
                <Button variant="secondary" size="icon" className="w-16 h-16 rounded-2xl">
                  <Navigation className="w-6 h-6 text-primary" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}