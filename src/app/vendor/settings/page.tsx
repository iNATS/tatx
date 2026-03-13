"use client";

import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Store, Save, Clock, MapPin, Camera } from 'lucide-react';

export default function VendorSettingsPage() {
  return (
    <div className="flex bg-[#F8F9FA] min-h-screen" dir="rtl">
      <PortalSidebar role="vendor" title="Vendor" />
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-end mb-12">
          <div className="text-right">
            <h1 className="text-4xl font-black mb-2">إعدادات المتجر</h1>
            <p className="text-muted-foreground font-bold">تحديث معلومات متجرك، ساعات العمل، والتفضيلات.</p>
          </div>
          <Button className="rounded-2xl h-14 px-8 font-black gap-2 shadow-lg">
            <Save className="w-5 h-5" />
            حفظ البيانات
          </Button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-none shadow-sm rounded-[2rem] p-8 bg-white">
              <CardTitle className="text-xl font-black mb-8 text-right flex items-center gap-3 justify-end">
                المعلومات الأساسية <Store className="w-6 h-6 text-primary" />
              </CardTitle>
              <div className="space-y-6">
                <div className="space-y-2 text-right">
                  <Label className="font-black">اسم المتجر</Label>
                  <Input defaultValue="مطعم قصر المندي" className="rounded-xl border-none bg-secondary/50 h-12 font-bold text-right" />
                </div>
                <div className="space-y-2 text-right">
                  <Label className="font-black">وصف المتجر</Label>
                  <Input defaultValue="أجود أنواع اللحوم والمندي الشعبي الأصيل" className="rounded-xl border-none bg-secondary/50 h-12 font-bold text-right" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 text-right">
                    <Label className="font-black">رقم التواصل</Label>
                    <Input defaultValue="+966 50 XXX XXXX" className="rounded-xl border-none bg-secondary/50 h-12 font-bold text-right" />
                  </div>
                  <div className="space-y-2 text-right">
                    <Label className="font-black">الحد الأدنى للطلب (ر.س)</Label>
                    <Input defaultValue="30" className="rounded-xl border-none bg-secondary/50 h-12 font-bold text-right" />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="border-none shadow-sm rounded-[2rem] p-8 bg-white">
              <CardTitle className="text-xl font-black mb-8 text-right flex items-center gap-3 justify-end">
                حالة المتجر <Clock className="w-6 h-6 text-primary" />
              </CardTitle>
              <div className="flex items-center justify-between flex-row-reverse p-6 bg-secondary/30 rounded-3xl">
                <div className="text-right">
                  <span className="font-black block text-lg">قبول الطلبات</span>
                  <span className="text-sm text-muted-foreground font-bold">عند الإغلاق، لن يتمكن العملاء من الطلب.</span>
                </div>
                <Switch defaultChecked />
              </div>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="border-none shadow-sm rounded-[2rem] p-8 bg-white text-center">
              <div className="relative w-40 h-40 mx-auto rounded-[2rem] overflow-hidden group mb-6">
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10 cursor-pointer">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <img src="https://picsum.photos/seed/mandi-logo/200/200" alt="Logo" className="w-full h-full object-cover" />
              </div>
              <h4 className="font-black text-lg">شعار المتجر</h4>
              <p className="text-xs text-muted-foreground font-bold mt-2">يفضل استخدام صورة مربعة (500x500)</p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}