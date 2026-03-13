"use client";

import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, Plus, Apple, Trash2, CheckCircle2 } from 'lucide-react';

export default function ProfilePaymentsPage() {
  return (
    <div className="flex bg-[#F8F9FA] min-h-screen" dir="rtl">
      <PortalSidebar role="customer" title="Profile" />
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-end mb-12">
          <div className="text-right">
            <h1 className="text-4xl font-black mb-2">طرق الدفع</h1>
            <p className="text-muted-foreground font-bold">إدارة بطاقاتك البنكية ووسائل الدفع المفضلة.</p>
          </div>
          <Button className="rounded-2xl h-14 px-8 font-black gap-2 shadow-lg">
            <Plus className="w-5 h-5" />
            إضافة بطاقة
          </Button>
        </header>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-none shadow-xl rounded-[2.5rem] bg-black text-white p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -z-0" />
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="flex justify-between items-start flex-row-reverse">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-8" />
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <div className="mt-12">
                <span className="text-xs font-bold opacity-60">رقم البطاقة</span>
                <p className="text-2xl font-black tracking-widest mt-1">•••• •••• •••• 4242</p>
              </div>
              <div className="flex justify-between items-end mt-8 flex-row-reverse">
                <div className="text-right">
                  <span className="text-[10px] font-bold opacity-60">تاريخ الانتهاء</span>
                  <p className="font-black">12/26</p>
                </div>
                <Button variant="ghost" className="text-red-400 hover:text-red-500 hover:bg-white/10 p-2 rounded-xl">
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </Card>

          <Card className="border-none shadow-sm rounded-[2.5rem] bg-white p-10 flex flex-col items-center justify-center border-2 border-dashed border-secondary hover:border-primary/20 transition-all cursor-pointer">
             <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
                <Apple className="w-8 h-8 text-black" />
             </div>
             <h4 className="font-black text-xl">Apple Pay</h4>
             <p className="text-sm text-muted-foreground font-bold mt-2 text-center">قم بتفعيل الدفع السريع بلمسة واحدة</p>
             <Button variant="outline" className="mt-6 rounded-xl border-2 font-black">ربط الحساب</Button>
          </Card>
        </div>
      </main>
    </div>
  );
}