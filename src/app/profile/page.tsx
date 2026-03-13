"use client";

import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, CreditCard, Bell, Heart, ChevronLeft } from 'lucide-react';
import Image from 'next/image';

export default function CustomerProfilePage() {
  const addresses = [
    { id: 1, label: 'المنزل', detail: 'حي الملقا، شارع الأمير محمد، الرياض' },
    { id: 2, label: 'المكتب', detail: 'مركز الملك عبدالله المالي، الرياض' },
  ];

  return (
    <div className="flex bg-[#F8F9FA] min-h-screen" dir="rtl">
      <PortalSidebar role="customer" title="Profile" />
      
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="mb-12 text-right">
          <h1 className="text-4xl font-black mb-2">حسابي الشخصي</h1>
          <p className="text-muted-foreground font-bold">إدارة تفضيلاتك وعناوينك المفضلة.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1 space-y-8">
            <Card className="border-none shadow-sm rounded-[2.5rem] bg-white p-10 text-center overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-32 bg-primary/5 -z-0" />
              <div className="relative z-10 space-y-6">
                <div className="relative w-32 h-32 mx-auto rounded-[2rem] overflow-hidden border-8 border-white shadow-2xl">
                   <Image src="https://picsum.photos/seed/customer-1/200/200" alt="User" fill className="object-cover" />
                </div>
                <div>
                   <h3 className="text-2xl font-black">فهد العتيبي</h3>
                   <p className="text-sm font-bold text-muted-foreground">+966 50 XXX XXXX</p>
                </div>
                <div className="flex gap-3 justify-center">
                   <Badge className="bg-primary text-white border-none font-black px-4 py-1.5 rounded-xl">عضو بلاتيني</Badge>
                </div>
                <Button variant="outline" className="w-full rounded-2xl h-12 font-black border-2 border-primary/20 text-primary shadow-none">تعديل الملف الشخصي</Button>
              </div>
            </Card>

            <div className="space-y-4">
               {[
                 { label: 'المتاجر المفضلة', icon: Heart, count: '12' },
                 { icon: Bell, label: 'التنبيهات', count: '5' },
                 { icon: CreditCard, label: 'طرق الدفع', count: '2' },
               ].map((item, i) => (
                 <div key={i} className="bg-white p-6 rounded-[1.5rem] shadow-sm flex items-center justify-between flex-row-reverse hover:translate-x-[-8px] transition-all cursor-pointer">
                    <div className="flex items-center gap-4 flex-row-reverse">
                       <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center text-primary">
                          <item.icon className="w-5 h-5" />
                       </div>
                       <span className="font-black text-base">{item.label}</span>
                    </div>
                    <Badge className="bg-secondary text-muted-foreground border-none font-black px-3 py-1">{item.count}</Badge>
                 </div>
               ))}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-10">
            <Card className="border-none shadow-sm rounded-[2rem] bg-white overflow-hidden">
               <CardHeader className="p-8 border-b flex flex-row items-center justify-between">
                  <Button variant="ghost" className="font-black text-primary gap-2 flex-row-reverse shadow-none">
                    إضافة عنوان جديد
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <CardTitle className="text-xl font-black">عناوين التوصيل</CardTitle>
               </CardHeader>
               <CardContent className="p-8 space-y-6">
                  {addresses.map((addr) => (
                    <div key={addr.id} className="p-6 rounded-3xl border-2 border-secondary hover:border-primary/20 transition-all flex items-center justify-between flex-row-reverse">
                       <div className="flex items-center gap-5 flex-row-reverse text-right">
                          <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                             <MapPin className="w-7 h-7" />
                          </div>
                          <div>
                             <h4 className="font-black text-lg mb-1">{addr.label}</h4>
                             <p className="text-sm text-muted-foreground font-bold">{addr.detail}</p>
                          </div>
                       </div>
                    </div>
                  ))}
               </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}