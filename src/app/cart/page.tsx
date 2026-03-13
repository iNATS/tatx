"use client";

import { Navbar } from '@/components/layout/Navbar';
import { useCart } from '@/store/use-cart';
import Image from 'next/image';
import { Trash2, Plus, Minus, ArrowRight, ShoppingCart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { PROVIDERS } from '@/lib/data';

export default function CartPage() {
  const { cart, updateQuantity, removeItem, total } = useCart();

  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center" dir="rtl">
          <div className="w-32 h-32 bg-secondary rounded-full flex items-center justify-center mb-8">
            <ShoppingCart className="w-16 h-16 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-black mb-4">سلتك فارغة</h1>
          <p className="text-muted-foreground text-lg mb-8 max-w-md">
            يبدو أنك لم تضف أي شيء إلى سلتك بعد. تصفح أفضل الخدمات لدينا وجد ما تحتاجه!
          </p>
          <Link href="/">
            <Button size="lg" className="rounded-full px-12 font-black bg-primary text-white shadow-none border-none">
              استكشف الخدمات
            </Button>
          </Link>
        </main>
      </>
    );
  }

  const deliveryFee = 15;
  const serviceTax = total * 0.05;
  const grandTotal = total + deliveryFee + serviceTax;

  const handleShareOrder = () => {
    if (typeof window === 'undefined') return;
    
    // تشفير بيانات السلة في رابط
    const cartData = JSON.stringify(cart);
    const encodedCart = btoa(unescape(encodeURIComponent(cartData)));
    const shareUrl = `${window.location.origin}/checkout?shared_cart=${encodedCart}`;
    
    const message = `أهلاً، لقد قمت بتجهيز طلبي على تاتكس (Tatx). هل يمكنك إكمال الدفع بدلاً عني؟\n\nرابط الطلب: ${shareUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white py-12" dir="rtl">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-black mb-12 text-right">طلبك الحالي</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => (
                <Card key={item.id} className="overflow-hidden border-none shadow-none bg-secondary/20 rounded-2xl">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex gap-6 flex-row-reverse">
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between text-right">
                        <div className="flex justify-between items-start flex-row-reverse">
                          <div>
                            <h3 className="text-xl font-black mb-1">{item.name}</h3>
                            <p className="text-sm text-muted-foreground font-bold">
                              {PROVIDERS.find(p => p.id === item.restaurantId)?.name || 'تاتكس'}
                            </p>
                          </div>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                        
                        <div className="flex justify-between items-center mt-4 flex-row-reverse">
                          <div className="flex items-center gap-4 bg-white rounded-full px-3 py-1 border shadow-none">
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              className="h-8 w-8 rounded-full text-primary shadow-none"
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="font-black">{item.quantity}</span>
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              className="h-8 w-8 rounded-full text-primary shadow-none"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                          <span className="text-xl font-black text-primary">
                            {(item.price * item.quantity).toFixed(2)} ر.س
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24 border-none shadow-none bg-white rounded-3xl overflow-hidden border-t-8 border-primary ring-1 ring-border">
                <CardContent className="p-8 text-right">
                  <h3 className="text-2xl font-black mb-8">ملخص الطلب</h3>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-muted-foreground font-bold flex-row-reverse">
                      <span>المجموع الفرعي</span>
                      <span>{total.toFixed(2)} ر.س</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground font-bold flex-row-reverse">
                      <span>رسوم التوصيل</span>
                      <span>{deliveryFee.toFixed(2)} ر.س</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground font-bold flex-row-reverse">
                      <span>ضريبة الخدمة (5%)</span>
                      <span>{serviceTax.toFixed(2)} ر.س</span>
                    </div>
                    <Separator className="my-6 shadow-none" />
                    <div className="flex justify-between text-2xl font-black flex-row-reverse">
                      <span>الإجمالي</span>
                      <span className="text-primary">{grandTotal.toFixed(2)} ر.س</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Link href="/checkout">
                      <Button className="w-full h-14 rounded-2xl text-xl font-black gap-2 group shadow-none flex-row-reverse bg-primary hover:bg-primary/90">
                        متابعة الدفع
                        <ArrowRight className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                      </Button>
                    </Link>

                    <Button 
                      onClick={handleShareOrder}
                      variant="outline"
                      className="w-full h-14 rounded-2xl text-lg font-black gap-2 border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all shadow-none flex-row-reverse"
                    >
                      <Share2 className="w-5 h-5" />
                      إرسال للدفع (واتساب)
                    </Button>
                  </div>

                  <p className="text-center text-xs text-muted-foreground mt-6 font-bold">
                    بمتابعتك أنت توافق على الشروط والأحكام الخاصة بنا
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
