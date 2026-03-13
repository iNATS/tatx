"use client";

import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Package, CheckCircle, ChevronLeft } from 'lucide-react';

const HISTORY = [
  { id: '#TX-8200', date: '2024-03-10', fare: '18 ر.س', distance: '5.2 كم', status: 'مكتمل' },
  { id: '#TX-8195', date: '2024-03-09', fare: '22 ر.س', distance: '7.1 كم', status: 'مكتمل' },
  { id: '#TX-8180', date: '2024-03-09', fare: '15 ر.س', distance: '3.4 كم', status: 'مكتمل' },
];

export default function DeliveryHistoryPage() {
  return (
    <div className="flex bg-[#F8F9FA] min-h-screen" dir="rtl">
      <PortalSidebar role="driver" title="Driver" />
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="mb-12 text-right">
          <h1 className="text-4xl font-black mb-2">سجل الرحلات</h1>
          <p className="text-muted-foreground font-bold">استعراض كافة الرحلات والطلبات التي قمت بإتمامها.</p>
        </header>

        <div className="space-y-4">
          {HISTORY.map((item) => (
            <Card key={item.id} className="border-none shadow-sm rounded-3xl bg-white p-6 hover:translate-x-[-8px] transition-all cursor-pointer group">
              <div className="flex items-center justify-between flex-row-reverse">
                <div className="flex items-center gap-6 flex-row-reverse text-right">
                  <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <Package className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-lg">{item.id}</h4>
                    <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>{item.date}</span>
                      <span className="mx-1">•</span>
                      <span>{item.distance}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-8 flex-row-reverse">
                  <div className="text-right">
                    <span className="block font-black text-xl">{item.fare}</span>
                    <Badge className="bg-green-100 text-green-600 border-none font-black text-[10px] px-2 py-0.5">
                      <CheckCircle className="w-3 h-3 ml-1 inline" /> {item.status}
                    </Badge>
                  </div>
                  <ChevronLeft className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}