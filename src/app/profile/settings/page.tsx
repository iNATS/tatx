"use client";

import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Shield, Bell, Save, Lock } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

export default function ProfileSettingsPage() {
  return (
    <div className="flex bg-[#F8F9FA] min-h-screen" dir="rtl">
      <PortalSidebar role="customer" title="Profile" />
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-end mb-12">
          <div className="text-right">
            <h1 className="text-4xl font-black mb-2">الإعدادات</h1>
            <p className="text-muted-foreground font-bold">تحديث بياناتك الشخصية وتغيير كلمة المرور.</p>
          </div>
          <Button className="rounded-2xl h-14 px-8 font-black gap-2 shadow-lg">
            <Save className="w-5 h-5" />
            حفظ التغييرات
          </Button>
        </header>

        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="border-none shadow-sm rounded-[2.5rem] p-8 bg-white">
            <CardTitle className="text-xl font-black mb-8 text-right flex items-center gap-3 justify-end">
              البيانات الشخصية <User className="w-6 h-6 text-primary" />
            </CardTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 text-right">
                <Label className="font-black">الاسم الكامل</Label>
                <Input defaultValue="فهد العتيبي" className="rounded-xl border-none bg-secondary/50 h-12 font-bold text-right" />
              </div>
              <div className="space-y-2 text-right">
                <Label className="font-black">رقم الجوال</Label>
                <Input defaultValue="+966 50 XXX XXXX" className="rounded-xl border-none bg-secondary/50 h-12 font-bold text-right" />
              </div>
              <div className="space-y-2 text-right md:col-span-2">
                <Label className="font-black">البريد الإلكتروني</Label>
                <Input defaultValue="fahad@example.com" className="rounded-xl border-none bg-secondary/50 h-12 font-bold text-right" />
              </div>
            </div>
          </Card>

          <Card className="border-none shadow-sm rounded-[2.5rem] p-8 bg-white">
            <CardTitle className="text-xl font-black mb-8 text-right flex items-center gap-3 justify-end">
              الأمان <Lock className="w-6 h-6 text-primary" />
            </CardTitle>
            <div className="space-y-6">
              <div className="flex items-center justify-between flex-row-reverse p-4 bg-secondary/30 rounded-2xl">
                <div className="text-right">
                  <span className="font-black block">توثيق الحساب (2FA)</span>
                  <span className="text-xs text-muted-foreground font-bold">زيادة أمان حسابك عبر التحقق بخطوتين</span>
                </div>
                <Switch />
              </div>
              <Button variant="outline" className="w-full h-12 rounded-xl border-2 font-black shadow-none">تغيير كلمة المرور</Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}