"use client";

import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Truck, Star, CheckCircle2, MapPin } from 'lucide-react';

const DRIVERS = [
  { id: 1, name: 'خالد العتيبي', orders: 156, rating: 4.9, status: 'متصل', city: 'الرياض' },
  { id: 2, name: 'محمد القحطاني', orders: 89, rating: 4.7, status: 'في مهمة', city: 'جدة' },
  { id: 3, name: 'ياسر القحطاني', orders: 234, rating: 5.0, status: 'غير متصل', city: 'الدمام' },
];

export default function AdminDriversPage() {
  return (
    <div className="flex bg-[#F8F9FA] min-h-screen" dir="rtl">
      <PortalSidebar role="admin" title="Admin" />
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-end mb-12">
          <div className="text-right">
            <h1 className="text-4xl font-black mb-2">إدارة المناديب</h1>
            <p className="text-muted-foreground font-bold">مراقبة أداء مناديب التوصيل والطلبات النشطة.</p>
          </div>
        </header>

        <Card className="border-none shadow-sm rounded-[2rem] overflow-hidden bg-white">
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-secondary/30">
                <TableRow>
                  <TableHead className="text-right py-6 font-black">المندوب</TableHead>
                  <TableHead className="text-right font-black">المدينة</TableHead>
                  <TableHead className="text-right font-black">إجمالي الطلبات</TableHead>
                  <TableHead className="text-right font-black">التقييم</TableHead>
                  <TableHead className="text-right font-black">الحالة</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {DRIVERS.map((driver) => (
                  <TableRow key={driver.id} className="hover:bg-secondary/10 transition-colors">
                    <TableCell className="py-6 font-black">{driver.name}</TableCell>
                    <TableCell className="font-bold flex items-center gap-2 justify-end">
                      {driver.city} <MapPin className="w-4 h-4 text-muted-foreground" />
                    </TableCell>
                    <TableCell className="font-bold">{driver.orders}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 justify-end">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-black">{driver.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={
                        driver.status === 'متصل' ? 'bg-green-100 text-green-600' : 
                        driver.status === 'في مهمة' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                      }>
                        {driver.status}
                      </Badge>
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