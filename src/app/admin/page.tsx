
"use client";

import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  Truck, 
  ArrowUpRight, 
  Store,
  DollarSign
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

const data = [
  { name: 'يناير', sales: 4000, orders: 2400 },
  { name: 'فبراير', sales: 3000, orders: 1398 },
  { name: 'مارس', sales: 2000, orders: 9800 },
  { name: 'أبريل', sales: 2780, orders: 3908 },
  { name: 'مايو', sales: 1890, orders: 4800 },
  { name: 'يونيو', sales: 2390, orders: 3800 },
];

export default function AdminDashboard() {
  const stats = [
    { label: 'إجمالي المبيعات', value: '1.2M ر.س', icon: DollarSign, trend: '+12%', color: 'bg-green-500' },
    { label: 'الموردين النشطين', value: '450', icon: Store, trend: '+5', color: 'bg-blue-500' },
    { label: 'الطلبات الكلية', value: '12,402', icon: ShoppingBag, trend: '+18%', color: 'bg-primary' },
    { label: 'المناديب المتاحين', value: '1,200', icon: Truck, trend: '+20', color: 'bg-orange-500' },
  ];

  return (
    <div className="flex bg-[#F8F9FA] min-h-screen" dir="rtl">
      <PortalSidebar role="admin" title="Admin" />
      
      <main className="flex-1 p-10">
        <header className="flex justify-between items-end mb-12">
          <div className="text-right">
            <h1 className="text-4xl font-black mb-2">لوحة التحكم المركزية</h1>
            <p className="text-muted-foreground font-bold">أهلاً بك مجدداً، مدير تاتكس.</p>
          </div>
          <div className="flex gap-4">
             <div className="bg-white p-4 rounded-2xl shadow-sm border border-border flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div className="text-right">
                   <span className="block text-[10px] text-muted-foreground font-bold">حالة النظام</span>
                   <span className="block text-sm font-black text-green-500">مستقر</span>
                </div>
             </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <Card key={i} className="border-none shadow-sm rounded-3xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-black text-green-500 flex items-center gap-1">
                    {stat.trend} <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground font-bold mb-1">{stat.label}</p>
                  <h3 className="text-2xl font-black">{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-none shadow-sm rounded-[2rem] p-6 bg-white">
            <CardHeader className="p-0 mb-6 text-right">
              <CardTitle className="text-xl font-black">تحليل المبيعات</CardTitle>
            </CardHeader>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="border-none shadow-sm rounded-[2rem] p-6 bg-white">
            <CardHeader className="p-0 mb-6 text-right">
              <CardTitle className="text-xl font-black">معدل الطلبات</CardTitle>
            </CardHeader>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                  <Line type="monotone" dataKey="orders" stroke="hsl(var(--primary))" strokeWidth={4} dot={{ r: 6, fill: "white", strokeWidth: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
