"use client";

import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Store, 
  CheckCircle2, 
  AlertCircle,
  TrendingUp,
  Star
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { PROVIDERS, CATEGORIES } from '@/lib/data';
import Image from 'next/image';

export default function AdminVendorsPage() {
  const stats = [
    { label: 'إجمالي الموردين', value: PROVIDERS.length.toString(), icon: Store, color: 'text-primary' },
    { label: 'نشط حالياً', value: '5', icon: CheckCircle2, color: 'text-green-500' },
    { label: 'طلبات الانضمام', value: '3', icon: AlertCircle, color: 'text-orange-500' },
    { label: 'متوسط التقييم', value: '4.8', icon: Star, color: 'text-yellow-400' },
  ];

  const getCategoryName = (id: string) => {
    return CATEGORIES.find(c => c.id === id)?.name || id;
  };

  return (
    <div className="flex bg-[#F8F9FA] min-h-screen" dir="rtl">
      <PortalSidebar role="admin" title="Admin" />
      
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-end md:items-center gap-6 mb-12">
          <div className="text-right">
            <h1 className="text-4xl font-black mb-2">إدارة الموردين</h1>
            <p className="text-muted-foreground font-bold">تحكم في جميع الشركاء والمتاجر المسجلة في المنصة.</p>
          </div>
          <Button className="h-14 px-8 rounded-2xl bg-primary text-white font-black text-lg gap-3 shadow-xl">
             إضافة مورد جديد
             <Plus className="w-6 h-6" />
          </Button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <Card key={i} className="border-none shadow-sm rounded-3xl bg-white">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center">
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <span className="text-[10px] font-black text-green-500 flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full">
                    +4% <TrendingUp className="w-3 h-3" />
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground font-bold mb-1">{stat.label}</p>
                  <h3 className="text-3xl font-black">{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters and Table */}
        <Card className="border-none shadow-sm rounded-[2rem] bg-white overflow-hidden">
          <CardHeader className="p-8 border-b bg-white">
            <div className="flex flex-col md:flex-row-reverse justify-between items-center gap-4">
              <CardTitle className="text-xl font-black">قائمة الموردين</CardTitle>
              <div className="flex items-center gap-3 w-full md:w-auto flex-row-reverse">
                <div className="relative flex-1 md:w-80">
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="بحث عن مورد..." 
                    className="pr-10 h-12 rounded-xl bg-secondary/50 border-none shadow-none text-right font-bold focus-visible:ring-primary"
                  />
                </div>
                <Button variant="outline" className="h-12 rounded-xl border-2 gap-2 font-bold shadow-none">
                  تصفية
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table dir="rtl">
              <TableHeader className="bg-secondary/30">
                <TableRow className="border-none hover:bg-transparent">
                  <TableHead className="text-right font-black py-6">المورد</TableHead>
                  <TableHead className="text-right font-black">التصنيف</TableHead>
                  <TableHead className="text-right font-black">التقييم</TableHead>
                  <TableHead className="text-right font-black">الحالة</TableHead>
                  <TableHead className="text-left font-black">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {PROVIDERS.map((provider) => (
                  <TableRow key={provider.id} className="border-b border-secondary/50 hover:bg-secondary/10 transition-colors">
                    <TableCell className="py-6">
                      <div className="flex items-center gap-4 flex-row-reverse text-right">
                        <div className="relative w-12 h-12 rounded-2xl overflow-hidden border-2 border-white shadow-sm shrink-0">
                          <Image src={provider.image} alt={provider.name} fill className="object-cover" />
                        </div>
                        <div>
                          <h4 className="font-black text-base">{provider.name}</h4>
                          <p className="text-[11px] text-muted-foreground font-bold line-clamp-1 max-w-[200px]">{provider.description}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-black bg-primary/5 text-primary border-none px-3 py-1">
                        {getCategoryName(provider.category)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 flex-row-reverse">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-black text-sm">{provider.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-600 border-none font-black px-4 py-1.5 rounded-full text-[10px] shadow-none">
                        نشط
                      </Badge>
                    </TableCell>
                    <TableCell className="text-left">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="rounded-full shadow-none">
                            <MoreVertical className="w-5 h-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="rounded-2xl border-none shadow-2xl p-2 font-black text-right min-w-[150px]" dir="rtl">
                          <DropdownMenuItem className="rounded-xl cursor-pointer py-3 hover:bg-secondary">عرض الملف</DropdownMenuItem>
                          <DropdownMenuItem className="rounded-xl cursor-pointer py-3 hover:bg-secondary">تعديل البيانات</DropdownMenuItem>
                          <DropdownMenuItem className="rounded-xl cursor-pointer py-3 hover:bg-secondary text-orange-500">إيقاف مؤقت</DropdownMenuItem>
                          <DropdownMenuItem className="rounded-xl cursor-pointer py-3 hover:bg-destructive/10 text-destructive">حذف المورد</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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