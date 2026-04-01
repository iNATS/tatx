
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight, Key, Mail } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('admin')) router.push('/admin');
    else if (email.includes('vendor')) router.push('/vendor');
    else if (email.includes('driver')) router.push('/delivery');
    else router.push('/profile');
  };

  return (
    <div className="min-h-screen bg-[#F5F2F0] flex items-center justify-center p-4 font-body" dir="rtl">
      <Card className="w-full max-w-md border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
        <CardHeader className="bg-primary p-10 text-white text-right">
          <div className="relative w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-xl mr-0 ml-auto p-2">
            <Image 
              src="https://app.tatx.com/assets/?unstable_path=.%2Fassets/logo.png" 
              alt="Tatx Brand Logo" 
              width={40} 
              height={40} 
              className="object-contain"
              data-ai-hint="tatx logo"
            />
          </div>
          <CardTitle className="text-3xl font-black mb-2">مرحباً بعودتك</CardTitle>
          <CardDescription className="text-white/80 font-bold">قم بتسجيل الدخول لمتابعة أعمالك في Tatx</CardDescription>
        </CardHeader>
        
        <CardContent className="p-10">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4 text-right">
              <div className="space-y-2">
                <Label className="font-black flex items-center gap-2 justify-end">البريد الإلكتروني <Mail className="w-4 h-4 text-primary" /></Label>
                <Input 
                  type="email" 
                  placeholder="name@tatx.com" 
                  className="rounded-xl border-none bg-secondary h-12 shadow-none font-bold text-right" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center mb-1">
                  <Link href="#" className="text-xs text-primary font-bold hover:underline">نسيت كلمة المرور؟</Link>
                  <Label className="font-black flex items-center gap-2 justify-end">كلمة المرور <Key className="w-4 h-4 text-primary" /></Label>
                </div>
                <Input type="password" placeholder="••••••••" className="rounded-xl border-none bg-secondary h-12 shadow-none font-bold text-right" required />
              </div>
            </div>

            <Button type="submit" className="w-full h-14 rounded-xl bg-primary hover:bg-primary/90 text-white font-black text-lg gap-3 shadow-xl flex-row-reverse">
              دخول
              <ArrowRight className="w-5 h-5" />
            </Button>

            <div className="text-center space-y-4">
              <p className="text-xs text-muted-foreground font-bold">
                ليس لديك حساب؟ <Link href="/auth/signup" className="text-primary hover:underline">إنشاء حساب جديد</Link>
              </p>
              <div className="pt-4 border-t border-secondary">
                <p className="text-[10px] text-muted-foreground font-bold">تلميح للمعاينة: استخدم "admin" أو "vendor" أو "driver" في البريد للدخول المباشر</p>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
