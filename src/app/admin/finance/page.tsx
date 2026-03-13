"use client";

import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, ArrowUpRight, ArrowDownRight, CreditCard, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const financeData = [
  { name: 'الأحد', revenue: 12000 },
  { name: 'الاثنين', revenue: 15000 },
  { name: 'الثلاثاء', revenue: 18000 },
  { name: 'الأربعاء', revenue: 14000 },
  { name: 'الخميس', revenue: 22000 },
  { name: 'الجمعة', revenue: 28000 },
  { name: 'السبت', revenue: 25000 },
];

export default function AdminFinancePage() {
  return (
    <div className="flex bg-[#F8F9FA] min-h-screen" dir="rtl">
      <PortalSidebar role="admin" title="Admin" />
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="mb-12 text-right">
          <h1 className="text-4xl font-black mb-2">التقارير المالية</h1>
          <p className="text-muted-foreground font-bold">تحليل الإيرادات، المدفوعات، والأرباح الصافية للمنصة.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="border-none shadow-sm rounded-3xl bg-primary text-white p-8">
            <DollarSign className="w-10 h-10 mb-4" />
            <p className="font-bold opacity-80">إجمالي الدخل (أسبوعي)</p>
            <h2 className="text-4xl font-black mt-2">145,200 ر.س</h2>
          </Card>
          <Card className="border-none shadow-sm rounded-3xl bg-white p-8">
            <CreditCard className="w-10 h-10 text-primary mb-4" />
            <p className="font-bold text-muted-foreground">المدفوعات للموردين</p>
            <h2 className="text-4xl font-black mt-2">98,400 ر.س</h2>
          </Card>
          <Card className="border-none shadow-sm rounded-3xl bg-white p-8">
            <TrendingUp className="w-10 h-10 text-green-500 mb-4" />
            <p className="font-bold text-muted-foreground">صافي الربح</p>
            <h2 className="text-4xl font-black mt-2 text-green-500">46,800 ر.س</h2>
          </Card>
        </div>

        <Card className="border-none shadow-sm rounded-[2rem] p-8 bg-white h-[450px]">
          <CardTitle className="text-xl font-black mb-8 text-right">مخطط الإيرادات الأسبوعي</CardTitle>
          <ResponsiveContainer width="100%" height="80%">
            <AreaChart data={financeData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
              <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.1} strokeWidth={4} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </main>
    </div>
  );
}