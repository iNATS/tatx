"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { User, Store, Truck, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function SignupPage() {
  const router = useRouter();
  const [role, setRole] = useState('customer');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'admin') router.push('/admin');
    else if (role === 'vendor') router.push('/vendor');
    else if (role === 'driver') router.push('/delivery');
    else router.push('/profile');
  };

  return (
    <div className="min-h-screen bg-[#F5F2F0] flex items-center justify-center p-4 font-body" dir="rtl">
      <Card className="w-full max-w-2xl border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
        <div className="grid grid-cols-1 md:grid-cols-5 h-full">
          <div className="md:col-span-2 bg-primary p-8 text-white flex flex-col justify-between items-end text-right">
            <div>
              <div className="relative w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-xl p-2">
                <Image 
                  src="https://app.tatx.com/assets/?unstable_path=.%2Fassets/logo.png" 
                  alt="Tatx Brand Logo" 
                  width={40} 
                  height={40} 
                  className="object-contain"
                  data-ai-hint="tatx logo"
                />
              </div>
              <h2 className="text-3xl font-black mb-4">انضم إلى عائلة Tatx</h2>
              <p className="text-white/80 font-bold text-sm leading-relaxed">كن جزءاً من أسرع منصة خدمات نمواً في المملكة.</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-black bg-black/20 p-3 rounded-xl">
              <ShieldCheck className="w-4 h-4" />
              <span>بياناتك محمية ومشفرة بالكامل</span>
            </div>
          </div>
          
          <CardContent className="md:col-span-3 p-8">
            <CardHeader className="p-0 mb-8 text-right">
              <CardTitle className="text-2xl font-black">إنشاء حساب جديد</CardTitle>
              <CardDescription className="font-bold">اختر نوع الحساب الذي ترغب في إنشائه</CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
              <RadioGroup defaultValue="customer" onValueChange={setRole} className="grid grid-cols-3 gap-3">
                <Label htmlFor="customer" className="cursor-pointer">
                  <RadioGroupItem value="customer" id="customer" className="sr-only" />
                  <div className="flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5 hover:bg-secondary">
                    <User className="w-6 h-6 text-muted-foreground" />
                    <span className="text-[10px] font-black">عميل</span>
                  </div>
                </Label>
                <Label htmlFor="vendor" className="cursor-pointer">
                  <RadioGroupItem value="vendor" id="vendor" className="sr-only" />
                  <div className="flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5 hover:bg-secondary">
                    <Store className="w-6 h-6 text-muted-foreground" />
                    <span className="text-[10px] font-black">مزود خدمة</span>
                  </div>
                </Label>
                <Label htmlFor="driver" className="cursor-pointer">
                  <RadioGroupItem value="driver" id="driver" className="sr-only" />
                  <div className="flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5 hover:bg-secondary">
                    <Truck className="w-6 h-6 text-muted-foreground" />
                    <span className="text-[10px] font-black">مندوب</span>
                  </div>
                </Label>
              </RadioGroup>

              <div className="space-y-4 text-right">
                <div className="space-y-2">
                  <Label className="font-black">الاسم الكامل</Label>
                  <Input placeholder="أدخل اسمك بالكامل" className="rounded-xl border-none bg-secondary h-12 shadow-none font-bold text-right" required />
                </div>
                <div className="space-y-2">
                  <Label className="font-black">رقم الجوال</Label>
                  <Input placeholder="+966 5XX XXX XXX" className="rounded-xl border-none bg-secondary h-12 shadow-none font-bold text-right" required />
                </div>
                <div className="space-y-2">
                  <Label className="font-black">كلمة المرور</Label>
                  <Input type="password" placeholder="••••••••" className="rounded-xl border-none bg-secondary h-12 shadow-none font-bold text-right" required />
                </div>
              </div>

              <Button type="submit" className="w-full h-14 rounded-xl bg-primary hover:bg-primary/90 text-white font-black text-lg gap-3 shadow-xl flex-row-reverse">
                تسجيل الحساب
                <ArrowRight className="w-5 h-5" />
              </Button>

              <p className="text-center text-xs text-muted-foreground font-bold">
                لديك حساب بالفعل؟ <Link href="/auth/login" className="text-primary hover:underline">تسجيل الدخول</Link>
              </p>
            </form>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
