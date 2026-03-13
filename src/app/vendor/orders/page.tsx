"use client";

import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Clock, CheckCircle2, User } from 'lucide-react';

const ORDERS = [
  { id: '#TX-9001', customer: 'عبدالله محمد', items: 'نصف حبة مندي، بيبسي', status: 'جديد', total: '41 ر.س', time: 'منذ دقيقة' },
  { id: '#TX-9002', customer: 'نورة علي', items: '2x مندي لحم', status: 'تحت التحضير', total: '150 ر.س', time: 'منذ 15 دقيقة' },
];

export default function VendorOrdersPage() {
  return (
    <div className="flex bg-[#F8F9FA] min-h-screen" dir="rtl">
      <PortalSidebar role="vendor" title="Vendor" />
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="mb-12 text-right">
          <h1 className="text-4xl font-black mb-2">الطلبات الواردة</h1>
          <p className="text-muted-foreground font-bold">متابعة وتجهيز طلبات العملاء في الوقت الفعلي.</p>
        </header>

        <div className="space-y-6">
          {ORDERS.map((order) => (
            <Card key={order.id} className="border-none shadow-sm rounded-[2rem] bg-white overflow-hidden">
              <div className="p-8 flex flex-col md:flex-row-reverse justify-between items-center gap-6">
                <div className="flex items-center gap-6 flex-row-reverse text-right flex-1">
                  <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center text-primary">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black flex items-center gap-2 justify-end">
                      {order.id}
                      <Badge className={order.status === 'جديد' ? 'bg-primary text-white' : 'bg-blue-100 text-blue-600'}>
                        {order.status}
                      </Badge>
                    </h3>
                    <p className="text-muted-foreground font-bold">{order.items}</p>
                    <div className="flex items-center gap-2 text-xs font-bold mt-2 justify-end">
                      <span>{order.customer}</span>
                      <User className="w-3 h-3" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-8 flex-row-reverse">
                  <div className="text-right">
                    <span className="block font-black text-2xl">{order.total}</span>
                    <span className="block text-xs text-muted-foreground font-bold">{order.time}</span>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" className="rounded-xl font-black border-2 px-6 h-12">رفض</Button>
                    <Button className="rounded-xl font-black px-8 h-12">قبول وتجهيز</Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}