"use client";

import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Settings, Save, Bell, Shield, Globe } from 'lucide-react';

export default function AdminSettingsPage() {
  return (
    <div className="flex bg-[#F8F9FA] min-h-screen" dir="rtl">
      <PortalSidebar role="admin" title="Admin" />
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-end mb-12">
          <div className="text-right">
            <h1 className="text-4xl font-black mb-2">إعدادات المنصة</h1>
            <p className="text-muted-foreground font-bold">التحكم في إعدادات النظام العامة والتفضيلات.</p>
          </div>
          <Button className="rounded-2xl h-14 px-8 font-black gap-2 shadow-lg">
            <Save className="w-5 h-5" />
            حفظ التغييرات
          </Button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-none shadow-sm rounded-[2rem] p-8 bg-white">
            <CardTitle className="text-xl font-black mb-8 text-right flex items-center gap-3 justify-end">
              الإعدادات العامة <Globe className="w-6 h-6 text-primary" />
            </CardTitle>
            <div className="space-y-6">
              <div className="space-y-2 text-right">
                <Label className="font-black">اسم المنصة</Label>
                <Input defaultValue="تاتكس - Tatx" className="rounded-xl border-none bg-secondary/50 h-12 font-bold text-right" />
              </div>
              <div className="space-y-2 text-right">
                <Label className="font-black">البريد الإلكتروني للنظام</Label>
                <Input defaultValue="system@tatx.com" className="rounded-xl border-none bg-secondary/50 h-12 font-bold text-right" />
              </div>
            </div>
          </Card>

          <Card className="border-none shadow-sm rounded-[2rem] p-8 bg-white">
            <CardTitle className="text-xl font-black mb-8 text-right flex items-center gap-3 justify-end">
              الأمان والتنبيهات <Shield className="w-6 h-6 text-primary" />
            </CardTitle>
            <div className="space-y-6">
              <div className="flex items-center justify-between flex-row-reverse p-4 bg-secondary/30 rounded-2xl">
                <div className="text-right">
                  <span className="font-black block">وضع الصيانة</span>
                  <span className="text-xs text-muted-foreground font-bold">إغلاق المنصة للصيانة المجدولة</span>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between flex-row-reverse p-4 bg-secondary/30 rounded-2xl">
                <div className="text-right">
                  <span className="font-black block">تنبيهات البريد</span>
                  <span className="text-xs text-muted-foreground font-bold">إرسال تقرير مالي يومي للمديرين</span>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}