"use client";

import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, ArrowUpRight, ArrowDownRight, CreditCard, History } from 'lucide-react';

const TRANSACTIONS = [
  { id: 1, type: 'تحويل رصيد', amount: '-250.00 ر.س', date: 'منذ يوم', status: 'مكتمل' },
  { id: 2, type: 'أرباح رحلة #TX-8200', amount: '+18.00 ر.س', date: 'أمس', status: 'مكتمل' },
  { id: 3, type: 'أرباح رحلة #TX-8195', amount: '+22.00 ر.س', date: 'أمس', status: 'مكتمل' },
];

export default function DeliveryWalletPage() {
  return (
    <div className="flex bg-[#F8F9FA] min-h-screen" dir="rtl">
      <PortalSidebar role="driver" title="Driver" />
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="mb-12 text-right">
          <h1 className="text-4xl font-black mb-2">المحفظة المالية</h1>
          <p className="text-muted-foreground font-bold">إدارة أرباحك، سحب الرصيد، وسجل المعاملات.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="lg:col-span-1 border-none shadow-xl rounded-[2.5rem] bg-black text-white p-10 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 to-transparent -z-0" />
            <div className="relative z-10 space-y-8">
              <div className="flex justify-between items-center flex-row-reverse">
                <CreditCard className="w-10 h-10 text-primary" />
                <span className="font-bold opacity-60">تاتكس كاش</span>
              </div>
              <div>
                <span className="block text-sm font-bold opacity-60">إجمالي الرصيد</span>
                <h2 className="text-5xl font-black mt-1">452.12 <span className="text-xl text-primary">ر.س</span></h2>
              </div>
              <Button className="w-full h-14 rounded-2xl bg-primary text-white font-black text-lg border-none hover:bg-primary/90">سحب الرصيد</Button>
            </div>
          </Card>

          <Card className="lg:col-span-2 border-none shadow-sm rounded-[2.5rem] bg-white p-8">
            <div className="flex items-center gap-3 justify-end mb-8">
              <h3 className="text-xl font-black">المعاملات الأخيرة</h3>
              <History className="w-6 h-6 text-primary" />
            </div>
            <div className="space-y-6">
              {TRANSACTIONS.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between flex-row-reverse border-b border-secondary pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-4 flex-row-reverse text-right">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.amount.startsWith('-') ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'}`}>
                      {tx.amount.startsWith('-') ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                    </div>
                    <div>
                      <span className="block font-black text-sm">{tx.type}</span>
                      <span className="text-xs text-muted-foreground font-bold">{tx.date}</span>
                    </div>
                  </div>
                  <span className={`font-black ${tx.amount.startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>{tx.amount}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}