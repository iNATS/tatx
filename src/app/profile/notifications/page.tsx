"use client";

import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { Card } from '@/components/ui/card';
import { Bell, ShoppingBag, CreditCard, Gift, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NOTIFICATIONS = [
  { id: 1, type: 'order', title: 'تم تأكيد طلبك!', desc: 'طلبك رقم #TX-8291 قيد التحضير الآن.', time: 'منذ 5 دقائق', icon: ShoppingBag, color: 'text-primary bg-primary/10' },
  { id: 2, type: 'offer', title: 'كوبون خصم جديد 🎁', desc: 'استخدم كود TATX20 للحصول على خصم 20% على طلبك القادم.', time: 'منذ ساعتين', icon: Gift, color: 'text-orange-500 bg-orange-50' },
  { id: 3, type: 'payment', title: 'نجاح عملية الدفع', desc: 'تم استلام مبلغ 142.00 ر.س بنجاح.', time: 'أمس', icon: CreditCard, color: 'text-green-500 bg-green-50' },
];

export default function ProfileNotificationsPage() {
  return (
    <div className="flex bg-[#F8F9FA] min-h-screen" dir="rtl">
      <PortalSidebar role="customer" title="Profile" />
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="mb-12 text-right">
          <h1 className="text-4xl font-black mb-2">التنبيهات</h1>
          <p className="text-muted-foreground font-bold">كل ما هو جديد بخصوص طلباتك وعروضنا الحصرية.</p>
        </header>

        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex justify-between items-center mb-6 flex-row-reverse">
             <Button variant="ghost" className="font-black text-primary shadow-none">تحديد الكل كمقروء</Button>
             <h3 className="font-black text-lg">الأحدث</h3>
          </div>
          
          {NOTIFICATIONS.map((notif) => (
            <Card key={notif.id} className="border-none shadow-sm rounded-3xl bg-white p-6 hover:bg-secondary/20 transition-all cursor-pointer group">
              <div className="flex items-center justify-between flex-row-reverse">
                <div className="flex items-center gap-5 flex-row-reverse text-right">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${notif.color}`}>
                    <notif.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-black text-lg">{notif.title}</h4>
                    <p className="text-sm text-muted-foreground font-bold">{notif.desc}</p>
                    <span className="text-[10px] text-primary font-black mt-2 block">{notif.time}</span>
                  </div>
                </div>
                <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}