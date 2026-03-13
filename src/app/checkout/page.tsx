"use client";

import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCart, CartItem } from '@/store/use-cart';
import { MapPin, CreditCard, Apple, CheckCircle2, AlertCircle } from 'lucide-react';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from '@/components/ui/badge';

function CheckoutContent() {
  const { total: localTotal, clearCart } = useCart();
  const searchParams = useSearchParams();
  const [isOrdered, setIsOrdered] = useState(false);
  const [sharedCartItems, setSharedCartItems] = useState<CartItem[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    const sharedCartParam = searchParams.get('shared_cart');
    if (sharedCartParam) {
      try {
        const decodedData = decodeURIComponent(escape(atob(sharedCartParam)));
        const items = JSON.parse(decodedData);
        setSharedCartItems(items);
      } catch (e) {
        console.error("Failed to parse shared cart", e);
      }
    }
  }, [searchParams]);

  const cartToUse = sharedCartItems || [];
  const isShared = sharedCartItems !== null;
  
  const subtotal = isShared 
    ? cartToUse.reduce((sum, item) => sum + item.price * item.quantity, 0)
    : localTotal;

  const deliveryFee = 15;
  const serviceTax = subtotal * 0.05;
  const grandTotal = subtotal + deliveryFee + serviceTax;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrdered(true);
    setTimeout(() => {
      if (!isShared) clearCart();
      router.push('/orders');
    }, 2000);
  };

  if (isOrdered) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-4" dir="rtl">
        <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mb-8">
          <CheckCircle2 className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-4xl font-black mb-4">تم تأكيد طلبك!</h1>
        <p className="text-xl text-muted-foreground mb-8">
          استرخِ قليلاً، طلبك قيد التحضير الآن.
        </p>
        <p className="text-sm text-primary font-bold">
          جاري تحويلك لتتبع الطلب...
        </p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white py-12" dir="rtl">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center justify-between mb-12">
            <h1 className="text-4xl font-black text-right">إتمام الدفع</h1>
            {isShared && (
              <Badge variant="secondary" className="px-4 py-2 rounded-full font-black text-primary bg-primary/10 border-none shadow-none">
                دفع لصالح طرف آخر
              </Badge>
            )}
          </div>

          {isShared && (
            <Alert className="mb-8 border-primary/20 bg-primary/5 rounded-2xl shadow-none">
              <AlertCircle className="h-5 w-5 text-primary" />
              <AlertTitle className="font-black text-right text-primary">طلب مشارك</AlertTitle>
              <AlertDescription className="text-right font-bold opacity-80">
                أنت الآن بصدد الدفع لطلب تم تجهيزه ومشاركته معك.
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <Card className="border-none shadow-none bg-secondary/20 rounded-3xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 justify-end flex-row-reverse font-black">
                    <MapPin className="w-6 h-6 text-primary" />
                    عنوان التوصيل
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-right">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="font-bold">الاسم الأول</Label>
                      <Input id="firstName" placeholder="مثال: محمد" className="rounded-2xl border-none bg-white h-12 shadow-none text-right font-bold" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="font-bold">اسم العائلة</Label>
                      <Input id="lastName" placeholder="مثال: القحطاني" className="rounded-2xl border-none bg-white h-12 shadow-none text-right font-bold" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="street" className="font-bold">العنوان (الحي والشارع)</Label>
                    <Input id="street" placeholder="حي الملقا، شارع الأمير محمد بن سلمان" className="rounded-2xl border-none bg-white h-12 shadow-none text-right font-bold" required />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="font-bold">المدينة</Label>
                      <Input id="city" value="الرياض" disabled className="rounded-2xl border-none bg-secondary h-12 shadow-none text-right font-bold" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="font-bold">رقم الجوال</Label>
                      <Input id="phone" placeholder="+966 5XX XXX XXX" className="rounded-2xl border-none bg-white h-12 shadow-none text-right font-bold" required />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-none bg-secondary/20 rounded-3xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 justify-end flex-row-reverse font-black">
                    <CreditCard className="w-6 h-6 text-primary" />
                    طريقة الدفع
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup defaultValue="card" className="space-y-4">
                    <Label
                      htmlFor="card"
                      className="flex items-center justify-between p-6 bg-white rounded-2xl cursor-pointer hover:bg-gray-50 transition-all border-2 border-transparent [&:has([data-state=checked])]:border-primary shadow-none flex-row-reverse"
                    >
                      <div className="flex items-center gap-4 flex-row-reverse">
                        <RadioGroupItem value="card" id="card" />
                        <span className="font-black text-lg">بطاقة مدى / ائتمان</span>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-10 h-6 bg-blue-600 rounded" />
                        <div className="w-10 h-6 bg-red-500 rounded" />
                      </div>
                    </Label>
                    <Label
                      htmlFor="apple"
                      className="flex items-center justify-between p-6 bg-white rounded-2xl cursor-pointer hover:bg-gray-50 transition-all border-2 border-transparent [&:has([data-state=checked])]:border-primary shadow-none flex-row-reverse"
                    >
                      <div className="flex items-center gap-4 flex-row-reverse">
                        <RadioGroupItem value="apple" id="apple" />
                        <span className="font-black text-lg">Apple Pay</span>
                      </div>
                      <Apple className="w-8 h-8" />
                    </Label>
                    {!isShared && (
                      <Label
                        htmlFor="cash"
                        className="flex items-center justify-between p-6 bg-white rounded-2xl cursor-pointer hover:bg-gray-50 transition-all border-2 border-transparent [&:has([data-state=checked])]:border-primary shadow-none flex-row-reverse"
                      >
                        <div className="flex items-center gap-4 flex-row-reverse">
                          <RadioGroupItem value="cash" id="cash" />
                          <span className="font-black text-lg">الدفع عند الاستلام</span>
                        </div>
                      </Label>
                    )}
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24 border-none shadow-none bg-primary text-white rounded-[2.5rem]">
                <CardContent className="p-8 text-right">
                  <h3 className="text-2xl font-black mb-8">مراجعة الطلب</h3>
                  
                  <div className="space-y-6 mb-10">
                    <div className="flex justify-between items-center text-white/80 font-bold flex-row-reverse">
                      <span>عدد الأصناف</span>
                      <span>{isShared ? cartToUse.length : 'حسب السلة'}</span>
                    </div>
                    <div className="flex justify-between items-center text-white/80 font-bold flex-row-reverse">
                      <span>المجموع</span>
                      <span>{subtotal.toFixed(2)} ر.س</span>
                    </div>
                    <div className="flex justify-between items-center text-white/80 font-bold flex-row-reverse">
                      <span>التوصيل والضريبة</span>
                      <span>{(deliveryFee + serviceTax).toFixed(2)} ر.س</span>
                    </div>
                    <Separator className="bg-white/20 shadow-none" />
                    <div className="flex justify-between items-end flex-row-reverse">
                      <span className="text-lg font-bold">الإجمالي النهائي</span>
                      <span className="text-4xl font-black">{grandTotal.toFixed(2)} ر.س</span>
                    </div>
                  </div>

                  <Button 
                    type="submit"
                    className="w-full h-16 rounded-2xl text-xl font-black bg-white text-primary hover:bg-gray-100 transition-all shadow-none border-none"
                  >
                    إتمام الطلب الآن
                  </Button>

                  <p className="text-center text-xs text-white/60 mt-6 font-bold">
                    تاتكس تضمن لك جودة التوصيل والخدمة.
                  </p>
                </CardContent>
              </Card>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-black">جاري التحميل...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
