"use client";

import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Edit3, Trash2, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

const ITEMS = [
  { id: 1, name: 'مندي دجاج نصف حبة', price: 38, category: 'مندي', stock: 'متوفر', image: 'https://picsum.photos/seed/mandi1/100/100' },
  { id: 2, name: 'مندي لحم نفر', price: 75, category: 'مندي', stock: 'متوفر', image: 'https://picsum.photos/seed/mandi2/100/100' },
  { id: 3, name: 'كنافة بالقشطة', price: 15, category: 'حلويات', stock: 'نفذت', image: 'https://picsum.photos/seed/kunafa/100/100' },
];

export default function VendorItemsPage() {
  return (
    <div className="flex bg-[#F8F9FA] min-h-screen" dir="rtl">
      <PortalSidebar role="vendor" title="Vendor" />
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-end mb-12">
          <div className="text-right">
            <h1 className="text-4xl font-black mb-2">إدارة المنيو</h1>
            <p className="text-muted-foreground font-bold">أضف، عدل، أو احذف منتجات متجرك.</p>
          </div>
          <Button className="rounded-2xl h-14 px-8 font-black gap-2">
            <Plus className="w-5 h-5" />
            إضافة صنف جديد
          </Button>
        </header>

        <Card className="border-none shadow-sm rounded-[2rem] bg-white p-8 mb-8">
          <div className="relative max-w-md mr-0 ml-auto">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="بحث في المنتجات..." className="pr-10 h-12 rounded-xl bg-secondary/50 border-none text-right font-bold" />
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ITEMS.map((item) => (
            <Card key={item.id} className="border-none shadow-sm rounded-3xl bg-white overflow-hidden group">
              <div className="relative h-48">
                <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-black ${
                  item.stock === 'متوفر' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                }`}>
                  {item.stock}
                </div>
              </div>
              <CardContent className="p-6 text-right">
                <h3 className="text-xl font-black mb-1">{item.name}</h3>
                <p className="text-primary font-black text-lg mb-6">{item.price} ر.س</p>
                <div className="flex gap-2">
                  <Button variant="secondary" className="flex-1 rounded-xl h-11 font-black gap-2">
                    <Edit3 className="w-4 h-4" /> تعديل
                  </Button>
                  <Button variant="ghost" className="rounded-xl h-11 w-11 p-0 text-red-500 hover:bg-red-50 hover:text-red-600">
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}