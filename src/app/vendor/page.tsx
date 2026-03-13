
"use client";

import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Package, 
  ShoppingBag, 
  CreditCard, 
  Star, 
  Plus, 
  ChevronLeft,
  Search,
  CheckCircle2,
  Clock,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

export default function VendorDashboard() {
  const recentOrders = [
    { id: '#TX-8291', customer: 'محمد القحطاني', total: '142.00 ر.س', status: 'جاري التوصيل', time: 'منذ 5 دقائق' },
    { id: '#TX-8285', customer: 'سارة العتيبي', total: '85.50 ر.س', status: 'تحت التحضير', time: 'منذ 12 دقيقة' },
    { id: '#TX-8270', customer: 'خالد محمد', total: '210.00 ر.س', status: 'تم التسليم', time: 'منذ ساعة' },
  ];

  return (
    <div className="flex bg-[#F8F9FA] min-h-screen" dir="rtl">
      <PortalSidebar role="vendor" title="Vendor" />
      
      <main className="flex-1 p-10">
        <header className="flex flex-col md:flex-row justify-between items-end md:items-center gap-6 mb-12">
          <div className="text-right">
            <h1 className="text-4xl font-black mb-2">لوحة إدارة المتجر</h1>
            <p className="text-muted-foreground font-bold">أهلاً بك، مطعم قصر المندي.</p>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
             <Button className="flex-1 md:flex-none h-14 px-8 rounded-2xl bg-primary text-white font-black text-lg gap-3 shadow-xl">
                إضافة صنف جديد
                <Plus className="w-6 h-6" />
             </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'طلبات اليوم', value: '24', icon: ShoppingBag, color: 'text-primary' },
            { label: 'الأرباح المحققة', value: '1,250 ر.س', icon: CreditCard, color: 'text-green-500' },
            { label: 'الأصناف المفعلة', value: '15', icon: Package, color: 'text-blue-500' },
            { label: 'تقييم المتجر', value: '4.8', icon: Star, color: 'text-yellow-400' },
          ].map((stat, i) => (
            <Card key={i} className="border-none shadow-sm rounded-3xl bg-white">
              <CardContent className="p-6 text-right">
                <stat.icon className={`w-8 h-8 ${stat.color} mb-4 mr-0 ml-auto`} />
                <p className="text-sm text-muted-foreground font-bold mb-1">{stat.label}</p>
                <h3 className="text-3xl font-black">{stat.value}</h3>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-none shadow-sm rounded-[2rem] bg-white overflow-hidden">
              <CardHeader className="p-8 border-b flex flex-row items-center justify-between">
                <Button variant="ghost" className="font-black text-primary gap-2 flex-row-reverse shadow-none">
                  عرض الكل
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <CardTitle className="text-xl font-black">الطلبات الأخيرة</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {recentOrders.map((order, i) => (
                    <div key={i} className="p-8 flex items-center justify-between group hover:bg-secondary/50 transition-all">
                      <div className="flex items-center gap-4 flex-row-reverse">
                         <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                            <ShoppingBag className="w-6 h-6" />
                         </div>
                         <div className="text-right">
                            <h4 className="font-black text-base">{order.id}</h4>
                            <p className="text-sm text-muted-foreground font-bold">{order.customer}</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-10 flex-row-reverse">
                         <div className="text-right hidden sm:block">
                            <span className="block text-sm font-black">{order.total}</span>
                            <span className="block text-xs text-muted-foreground font-bold">{order.time}</span>
                         </div>
                         <Badge variant="secondary" className={cn(
                           "px-4 py-1.5 rounded-full font-black text-xs",
                           order.status === 'تم التسليم' ? "bg-green-100 text-green-600" : "bg-primary/10 text-primary"
                         )}>
                            {order.status}
                         </Badge>
                         <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:translate-x-[-4px] transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="border-none shadow-sm rounded-[2rem] bg-white p-8">
              <CardTitle className="text-xl font-black mb-8 text-right">ساعة الذروة</CardTitle>
              <div className="space-y-6">
                 <div className="bg-primary/5 p-6 rounded-3xl text-right">
                    <div className="flex items-center gap-3 justify-end mb-2">
                       <span className="font-black text-primary">نشاط مرتفع</span>
                       <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-sm font-bold text-muted-foreground">توقع زيادة في الطلبات خلال الـ 60 دقيقة القادمة.</p>
                 </div>
                 <Button className="w-full h-14 rounded-2xl bg-black text-white font-black shadow-none border-none">إدارة المنيو السريع</Button>
              </div>
            </Card>

            <Card className="border-none shadow-sm rounded-[2rem] bg-primary p-8 text-white">
              <div className="text-right space-y-4">
                 <Star className="w-10 h-10 fill-white/20 text-white/20 mb-4" />
                 <h3 className="text-2xl font-black">أنت مورد ذهبي!</h3>
                 <p className="text-sm font-bold text-white/80 leading-relaxed">حافظ على أدائك العالي لتحصل على ميزات تسويقية إضافية من تاتكس.</p>
                 <Button className="w-full bg-white text-primary rounded-2xl font-black h-12 shadow-none border-none">عرض المزايا</Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

import { cn } from '@/lib/utils';
