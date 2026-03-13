
"use client";

import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Truck, 
  MapPin, 
  Navigation, 
  CheckCircle2, 
  Clock, 
  Phone,
  DollarSign,
  Zap,
  ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

export default function DeliveryDashboard() {
  const availableOrders = [
    { id: '#8291', vendor: 'مطعم قصر المندي', distance: '1.2 كم', fare: '15 ر.س', type: 'طعام' },
    { id: '#8292', vendor: 'سوبر ماركت تاتكس', distance: '2.5 كم', fare: '22 ر.س', type: 'بقالة' },
  ];

  return (
    <div className="flex bg-[#F8F9FA] min-h-screen" dir="rtl">
      <PortalSidebar role="driver" title="Driver" />
      
      <main className="flex-1 p-10">
        <header className="flex flex-col md:flex-row justify-between items-end md:items-center gap-6 mb-12">
          <div className="text-right">
            <h1 className="text-4xl font-black mb-2">تطبيق المندوب</h1>
            <p className="text-muted-foreground font-bold">أهلاً بك يا بطل، أحمد القحطاني.</p>
          </div>
          <div className="flex gap-4">
             <div className="bg-green-500 text-white px-6 py-3 rounded-2xl font-black flex items-center gap-3 shadow-lg shadow-green-500/20">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                متصل الآن
             </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Active Order Card */}
            <Card className="border-none shadow-xl rounded-[2.5rem] bg-white overflow-hidden ring-4 ring-primary/10">
              <div className="p-8 bg-primary text-white flex justify-between items-center">
                 <Badge className="bg-white/20 text-white border-none font-black px-4 py-2 rounded-xl">طلب نشط حالياً</Badge>
                 <span className="font-black text-xl">#TX-8290</span>
              </div>
              <CardContent className="p-8 space-y-8">
                 <div className="flex items-center gap-6 flex-row-reverse text-right">
                    <div className="w-16 h-16 bg-secondary rounded-[1.5rem] flex items-center justify-center text-primary">
                       <MapPin className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                       <span className="text-xs text-muted-foreground font-bold block mb-1">الوجهة القادمة</span>
                       <h3 className="text-xl font-black">حي الملقا، شارع الأمير محمد</h3>
                    </div>
                    <Button size="icon" className="w-14 h-14 rounded-2xl bg-primary text-white shadow-lg">
                       <Navigation className="w-6 h-6" />
                    </Button>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div className="bg-secondary/50 p-6 rounded-3xl text-right">
                       <span className="block text-xs text-muted-foreground font-bold mb-1">المسافة المتبقية</span>
                       <span className="text-lg font-black">800 متر</span>
                    </div>
                    <div className="bg-secondary/50 p-6 rounded-3xl text-right">
                       <span className="block text-xs text-muted-foreground font-bold mb-1">الوقت المتوقع</span>
                       <span className="text-lg font-black">4 دقائق</span>
                    </div>
                 </div>

                 <Button className="w-full h-16 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-black text-xl gap-3 shadow-xl shadow-green-500/20">
                    <CheckCircle2 className="w-6 h-6" />
                    تم الوصول والتسليم
                 </Button>
              </CardContent>
            </Card>

            <div className="space-y-6">
               <h3 className="text-2xl font-black text-right">الطلبات المتاحة حولك</h3>
               {availableOrders.map((order) => (
                 <Card key={order.id} className="border-none shadow-sm rounded-3xl bg-white p-6 hover:shadow-md transition-all">
                    <div className="flex items-center justify-between flex-row-reverse">
                       <div className="flex items-center gap-4 flex-row-reverse">
                          <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                             <Truck className="w-6 h-6" />
                          </div>
                          <div className="text-right">
                             <h4 className="font-black text-lg">{order.vendor}</h4>
                             <p className="text-sm text-muted-foreground font-bold">يبعد عنك {order.distance}</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-6">
                          <div className="text-left">
                             <span className="block font-black text-primary text-lg">{order.fare}</span>
                             <span className="block text-xs text-muted-foreground font-bold">أجرة التوصيل</span>
                          </div>
                          <Button className="rounded-2xl h-12 px-8 font-black bg-black text-white">قبول</Button>
                       </div>
                    </div>
                 </Card>
               ))}
            </div>
          </div>

          <div className="space-y-8">
            <Card className="border-none shadow-sm rounded-[2rem] bg-white p-8">
              <div className="text-center space-y-4">
                 <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white shadow-xl">
                    <Image src="https://picsum.photos/seed/driver-1/200/200" alt="أحمد" fill className="object-cover" />
                 </div>
                 <div>
                    <h3 className="text-xl font-black">أحمد القحطاني</h3>
                    <p className="text-sm font-bold text-muted-foreground">كابتن فضي • 4.9 تقييم</p>
                 </div>
                 <div className="flex gap-2 justify-center">
                    <Badge className="bg-primary/10 text-primary border-none font-black px-3 py-1">50 طلب اليوم</Badge>
                 </div>
              </div>
            </Card>

            <Card className="border-none shadow-sm rounded-[2rem] bg-black text-white p-8">
               <div className="text-right space-y-6">
                  <div className="flex justify-between items-center flex-row-reverse">
                     <DollarSign className="w-8 h-8 text-primary" />
                     <h4 className="font-black text-lg text-white/60">محفظتك اليوم</h4>
                  </div>
                  <h2 className="text-5xl font-black">345.50 <span className="text-lg text-primary">ر.س</span></h2>
                  <Button variant="outline" className="w-full border-white/20 text-white rounded-2xl font-black h-12 hover:bg-white/10 shadow-none">سحب الرصيد</Button>
               </div>
            </Card>

            <Card className="border-none shadow-sm rounded-[2rem] bg-white p-8 overflow-hidden">
               <CardContent className="p-0 text-right">
                  <div className="flex items-center justify-between mb-6 flex-row-reverse">
                     <h3 className="font-black text-lg">خريطة الحرارة</h3>
                     <Zap className="w-5 h-5 text-orange-500" />
                  </div>
                  <div className="aspect-square bg-secondary rounded-3xl relative overflow-hidden mb-4">
                     <div className="absolute inset-0 flex items-center justify-center opacity-20">
                        <MapPin className="w-32 h-32" />
                     </div>
                     <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-transparent" />
                  </div>
                  <p className="text-xs text-muted-foreground font-bold">المناطق الملونة بالأحمر تشهد طلباً مرتفعاً الآن.</p>
               </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
