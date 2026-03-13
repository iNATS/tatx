"use client";

import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Star, ThumbsUp, TrendingUp, Award, User } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function DeliveryRatingPage() {
  const ratingsBreakdown = [
    { stars: 5, count: 120 },
    { stars: 4, count: 25 },
    { stars: 3, count: 8 },
    { stars: 2, count: 2 },
    { stars: 1, count: 1 },
  ];

  return (
    <div className="flex bg-[#F8F9FA] min-h-screen" dir="rtl">
      <PortalSidebar role="driver" title="Driver" />
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="mb-12 text-right">
          <h1 className="text-4xl font-black mb-2">تقييم المندوب</h1>
          <p className="text-muted-foreground font-bold">تحليل رضا العملاء ومستوى الخدمة التي تقدمها.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="lg:col-span-1 p-10 text-center rounded-[2.5rem] border-none shadow-sm bg-white">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
              <Award className="w-12 h-12" />
            </div>
            <h2 className="text-6xl font-black text-primary mb-2">4.92</h2>
            <p className="text-lg font-bold text-muted-foreground mb-6">المستوى الماسي</p>
            <div className="flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-6 h-6 fill-yellow-400 text-yellow-400" />)}
            </div>
          </Card>

          <Card className="lg:col-span-2 p-10 rounded-[2.5rem] border-none shadow-sm bg-white">
            <h3 className="text-xl font-black mb-8 text-right">تفاصيل النجوم</h3>
            <div className="space-y-4">
              {ratingsBreakdown.map((r) => (
                <div key={r.stars} className="flex items-center gap-4 flex-row-reverse">
                  <span className="w-12 text-right font-black text-sm">{r.stars} نجوم</span>
                  <Progress value={(r.count / 156) * 100} className="h-3 flex-1" />
                  <span className="w-12 text-left font-bold text-muted-foreground text-sm">{r.count}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-8 rounded-3xl border-none shadow-sm bg-green-50 text-green-700">
             <div className="flex items-center gap-4 flex-row-reverse text-right">
                <ThumbsUp className="w-8 h-8" />
                <div>
                   <h4 className="font-black text-lg">أبرز التعليقات الإيجابية</h4>
                   <p className="font-bold opacity-80 mt-1">"وصول سريع جداً وأدب في التعامل، شكراً لك."</p>
                </div>
             </div>
          </Card>
          <Card className="p-8 rounded-3xl border-none shadow-sm bg-blue-50 text-blue-700">
             <div className="flex items-center gap-4 flex-row-reverse text-right">
                <TrendingUp className="w-8 h-8" />
                <div>
                   <h4 className="font-black text-lg">هدف الأسبوع</h4>
                   <p className="font-bold opacity-80 mt-1">أتمم 10 طلبات إضافية للحفاظ على المستوى الماسي.</p>
                </div>
             </div>
          </Card>
        </div>
      </main>
    </div>
  );
}