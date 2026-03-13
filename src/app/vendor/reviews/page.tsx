"use client";

import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, MessageSquare, User, Reply } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const REVIEWS = [
  { id: 1, user: 'فهد القحطاني', rating: 5, comment: 'الأكل جداً لذيذ والتغليف ممتاز، شكراً لكم!', date: 'منذ يومين' },
  { id: 2, user: 'نورة السبيعي', rating: 4, comment: 'وصل الطلب حار ولذيذ، لكن تأخر قليلاً عن الموعد.', date: 'منذ أسبوع' },
  { id: 3, user: 'سلطان محمد', rating: 5, comment: 'أفضل مندي في الرياض بلا منازع.', date: 'منذ أسبوعين' },
];

export default function VendorReviewsPage() {
  return (
    <div className="flex bg-[#F8F9FA] min-h-screen" dir="rtl">
      <PortalSidebar role="vendor" title="Vendor" />
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="mb-12 text-right">
          <h1 className="text-4xl font-black mb-2">تقييمات العملاء</h1>
          <p className="text-muted-foreground font-bold">استمع لآراء عملائك وحسن من جودة خدمتك.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="p-8 text-center rounded-3xl border-none shadow-sm bg-white">
            <h2 className="text-5xl font-black text-primary">4.8</h2>
            <div className="flex justify-center gap-1 my-3">
              {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
            </div>
            <p className="text-sm font-bold text-muted-foreground">متوسط التقييم العام</p>
          </Card>
          <Card className="p-8 text-center rounded-3xl border-none shadow-sm bg-white col-span-3 flex items-center justify-around">
            <div className="text-center">
              <span className="block text-3xl font-black">156</span>
              <span className="text-xs font-bold text-muted-foreground">إجمالي المراجعات</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl font-black text-green-500">92%</span>
              <span className="text-xs font-bold text-muted-foreground">عملاء راضون جداً</span>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          {REVIEWS.map((review) => (
            <Card key={review.id} className="border-none shadow-sm rounded-[2rem] bg-white p-8">
              <div className="flex justify-between items-start flex-row-reverse mb-6">
                <div className="flex items-center gap-4 flex-row-reverse text-right">
                  <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center text-muted-foreground">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-lg">{review.user}</h4>
                    <span className="text-xs text-muted-foreground font-bold">{review.date}</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
                  ))}
                </div>
              </div>
              <p className="text-right text-lg font-bold text-muted-foreground leading-relaxed mb-6">"{review.comment}"</p>
              <div className="flex justify-end">
                <Button variant="ghost" className="rounded-xl font-black text-primary gap-2 h-10 shadow-none">
                  الرد على التقييم
                  <Reply className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}