"use client";

import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, Download, Calendar, ArrowUpRight } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const salesData = [
  { name: 'السبت', sales: 400 },
  { name: 'الأحد', sales: 700 },
  { name: 'الاثنين', sales: 600 },
  { name: 'الثلاثاء', sales: 800 },
  { name: 'الأربعاء', sales: 1200 },
  { name: 'الخميس', sales: 1500 },
  { name: 'الجمعة', sales: 1800 },
];

export default function VendorEarningsPage() {
  return (
    <div className="flex bg-[#F8F9FA] min-h-screen" dir="rtl">
      <PortalSidebar role="vendor" title="Vendor" />
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-end mb-12">
          <div className="text-right">
            <h1 className="text-4xl font-black mb-2">المبيعات والأرباح</h1>
            <p className="text-muted-foreground font-bold">تقارير مالية مفصلة عن أداء متجرك.</p>
          </div>
          <Button variant="outline" className="rounded-2xl h-14 px-8 font-black gap-2 border-2">
            <Download className="w-5 h-5" />
            تصدير التقرير
          </Button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="border-none shadow-sm rounded-3xl bg-black text-white p-8">
            <div className="flex justify-between items-center mb-6">
              <span className="text-primary font-black bg-primary/10 px-3 py-1 rounded-full text-xs">متاح للسحب</span>
              <DollarSign className="w-8 h-8 text-primary" />
            </div>
            <p className="font-bold opacity-60">رصيدك الحالي</p>
            <h2 className="text-5xl font-black mt-2">4,820.50 <span className="text-xl">ر.س</span></h2>
            <Button className="w-full mt-8 rounded-2xl h-12 font-black bg-primary text-white border-none">سحب الرصيد الآن</Button>
          </Card>

          <Card className="border-none shadow-sm rounded-3xl bg-white p-8">
            <div className="flex justify-between items-center mb-6">
              <span className="text-green-500 font-black bg-green-50 px-3 py-1 rounded-full text-xs">+12% هذا الأسبوع</span>
              <Calendar className="w-8 h-8 text-primary" />
            </div>
            <p className="font-bold text-muted-foreground">إجمالي مبيعات الشهر</p>
            <h2 className="text-5xl font-black mt-2">12,450.00 <span className="text-xl">ر.س</span></h2>
          </Card>
        </div>

        <Card className="border-none shadow-sm rounded-[2rem] p-8 bg-white h-[400px]">
          <CardTitle className="text-xl font-black mb-8 text-right">تحليل المبيعات الأسبوعي</CardTitle>
          <ResponsiveContainer width="100%" height="80%">
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </main>
    </div>
  );
}