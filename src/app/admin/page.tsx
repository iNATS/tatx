"use client";

import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  Truck, 
  ArrowUpRight, 
  Store,
  DollarSign,
  MoreHorizontal,
  ChevronLeft
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { Button } from '@/components/ui/button';

const data = [
  { name: 'يناير', sales: 4000, orders: 2400 },
  { name: 'فبراير', sales: 3000, orders: 1398 },
  { name: 'مارس', sales: 2000, orders: 9800 },
  { name: 'أبريل', sales: 2780, orders: 3908 },
  { name: 'مايو', sales: 1890, orders: 4800 },
  { name: 'يونيو', sales: 2390, orders: 3800 },
];

const categoryData = [
  { name: 'مطاعم', value: 400, color: '#E27E36' },
  { name: 'سوبر ماركت', value: 300, color: '#3B82F6' },
  { name: 'صيدلية', value: 200, color: '#10B981' },
  { name: 'خدمات', value: 100, color: '#F59E0B' },
];

const recentOrders = [
  { id: '#TX-9005', customer: 'أحمد العتيبي', vendor: 'مطعم قصر المندي', total: '142 ر.س', status: 'جاري التوصيل' },
  { id: '#TX-9004', customer: 'سارة خالد', vendor: 'تاتكس ماركت', total: '85 ر.س', status: 'مكتمل' },
  { id: '#TX-9003', customer: 'محمد فهد', vendor: 'صيدلية تاتكس', total: '120 ر.س', status: 'تحت التحضير' },
  { id: '#TX-9002', customer: 'هيا السبيعي', vendor: 'مطعم شاورما هوس', total: '45 ر.س', status: 'مكتمل' },
];

const topVendors = [
  { name: 'مطعم قصر المندي', sales: '45,200 ر.س', orders: 120, rating: 4.9 },
  { name: 'تاتكس ماركت', sales: '38,100 ر.س', orders: 450, rating: 4.7 },
  { name: 'صيدلية تاتكس', sales: '22,400 ر.س', orders: 89, rating: 4.8 },
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
      
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-end mb-12">
          <div className="text-right">
            <h1 className="text-4xl font-black mb-2">لوحة التحكم المركزية</h1>
            <p className="text-muted-foreground font-bold">أهلاً بك مجدداً، مدير تاتكس.</p>
          </div>
        </header>

        {/* Stats Grid */}
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

        {/* First Row Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="border-none shadow-sm rounded-[2rem] p-8 bg-white">
            <CardHeader className="p-0 mb-8 text-right">
              <CardTitle className="text-xl font-black">تحليل المبيعات</CardTitle>
            </CardHeader>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                  <Area type="monotone" dataKey="sales" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorSales)" strokeWidth={4} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="border-none shadow-sm rounded-[2rem] p-8 bg-white">
            <CardHeader className="p-0 mb-8 text-right">
              <CardTitle className="text-xl font-black">معدل الطلبات</CardTitle>
            </CardHeader>
            <div className="h-[350px] w-full">
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

        {/* Second Row: Table and Pie Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="lg:col-span-2 border-none shadow-sm rounded-[2rem] overflow-hidden bg-white">
            <CardHeader className="p-8 border-b flex flex-row items-center justify-between">
              <Button variant="ghost" className="font-black text-primary gap-2 flex-row-reverse shadow-none">
                عرض كل الطلبات
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <CardTitle className="text-xl font-black">آخر الطلبات</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-secondary/30">
                  <TableRow>
                    <TableHead className="text-right py-6 font-black">رقم الطلب</TableHead>
                    <TableHead className="text-right font-black">العميل</TableHead>
                    <TableHead className="text-right font-black">المورد</TableHead>
                    <TableHead className="text-right font-black">الإجمالي</TableHead>
                    <TableHead className="text-right font-black">الحالة</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id} className="hover:bg-secondary/10 transition-colors">
                      <TableCell className="py-6 font-black">{order.id}</TableCell>
                      <TableCell className="font-bold">{order.customer}</TableCell>
                      <TableCell className="font-bold">{order.vendor}</TableCell>
                      <TableCell className="font-black text-primary">{order.total}</TableCell>
                      <TableCell>
                        <Badge className={
                          order.status === 'مكتمل' ? 'bg-green-100 text-green-600' : 
                          order.status === 'جاري التوصيل' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'
                        }>
                          {order.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="lg:col-span-1 border-none shadow-sm rounded-[2rem] p-8 bg-white">
            <CardHeader className="p-0 mb-8 text-right">
              <CardTitle className="text-xl font-black">توزيع الفئات</CardTitle>
            </CardHeader>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-3 mt-4">
                {categoryData.map((item, i) => (
                  <div key={i} className="flex justify-between items-center flex-row-reverse">
                    <div className="flex items-center gap-2 flex-row-reverse">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm font-bold">{item.name}</span>
                    </div>
                    <span className="text-sm font-black">{item.value} طلب</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Third Row: Top Vendors */}
        <Card className="border-none shadow-sm rounded-[2rem] overflow-hidden bg-white mb-12">
          <CardHeader className="p-8 border-b text-right">
            <CardTitle className="text-xl font-black">الموردين الأكثر مبيعاً</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-secondary/30">
                <TableRow>
                  <TableHead className="text-right py-6 font-black">المورد</TableHead>
                  <TableHead className="text-right font-black">إجمالي المبيعات</TableHead>
                  <TableHead className="text-right font-black">الطلبات</TableHead>
                  <TableHead className="text-right font-black">التقييم العام</TableHead>
                  <TableHead className="text-left font-black">إجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topVendors.map((vendor, i) => (
                  <TableRow key={i} className="hover:bg-secondary/10 transition-colors">
                    <TableCell className="py-6 font-black">{vendor.name}</TableCell>
                    <TableCell className="font-black text-green-500">{vendor.sales}</TableCell>
                    <TableCell className="font-bold">{vendor.orders}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 justify-end">
                        <span className="font-black">{vendor.rating}</span>
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      </div>
                    </TableCell>
                    <TableCell className="text-left">
                      <Button variant="ghost" size="icon"><MoreHorizontal className="w-5 h-5" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
