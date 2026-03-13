"use client";

import { Navbar } from '@/components/layout/Navbar';
import { CategorySlider } from '@/components/home/CategorySlider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Clock, Heart, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FEATURED_ITEMS, PROVIDERS, CATEGORIES } from '@/lib/data';

export default function Home() {
  const popularProviders = PROVIDERS.filter(p => p.isPopular);

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white">
        {/* Hero Section */}
        <section className="relative h-[450px] flex items-center overflow-hidden">
          <Image 
            src="https://picsum.photos/seed/tatx-hero/1200/600"
            alt="تاتكس - كل احتياجاتك"
            fill
            className="object-cover brightness-[0.5]"
            priority
          />
          <div className="container mx-auto px-4 relative z-10 text-white">
            <div className="max-w-2xl animate-in slide-in-from-right duration-700 text-right">
              <Badge className="mb-4 bg-primary text-white border-none font-black px-6 py-2 text-sm rounded-full shadow-none">
                منصة تاتكس الشاملة
              </Badge>
              <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                كل احتياجاتك <br />
                <span className="text-primary italic">من منصة واحدة.</span>
              </h1>
              <p className="text-xl mb-10 text-gray-200 font-medium">
                تاتكس تبيع لك كل شيء: طعام، مستلزمات منزلية، أدوية، وحجز مناسباتك بضمانتنا.
              </p>
              <div className="flex gap-4 justify-start flex-row-reverse">
                <Button size="lg" className="rounded-full px-10 text-xl font-black bg-primary hover:bg-primary/90 h-14 shadow-none">
                  ابدأ التسوق
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-10 text-xl font-black bg-white/10 backdrop-blur text-white border-white/40 hover:bg-white/20 h-14 shadow-none">
                  اكتشف الخدمات
                </Button>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          {/* Categories Slider */}
          <div className="mb-16">
            <h2 className="text-3xl font-black mb-2 text-right">الأقسام</h2>
            <p className="text-muted-foreground text-right mb-4">ما الذي تبحث عنه اليوم؟</p>
            <CategorySlider />
          </div>

          {/* 1. Featured Items Section */}
          <section className="mb-20">
            <div className="flex items-center justify-between mb-8 flex-row">
              <Button variant="link" className="text-primary font-black text-lg p-0 shadow-none">عرض الكل</Button>
              <h2 className="text-3xl font-black text-right">عروض تاتكس المميزة</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {FEATURED_ITEMS.map((item) => (
                <Card key={item.id} className="overflow-hidden group border-none bg-secondary/30 rounded-3xl shadow-none">
                  <div className="relative h-56">
                    <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute top-4 right-4">
                      <Button size="icon" className="rounded-full bg-white/90 text-primary hover:bg-white shadow-none">
                        <Heart className="w-5 h-5" />
                      </Button>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <Badge className="bg-primary text-white font-black px-3 py-1 text-lg shadow-none">
                        {item.price} ر.س
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6 text-right">
                    <h3 className="text-2xl font-black mb-2 group-hover:text-primary transition-colors">{item.name}</h3>
                    <p className="text-muted-foreground text-sm mb-6 line-clamp-2">{item.description}</p>
                    <Link href={`/provider/${item.providerId}`}>
                      <Button className="w-full rounded-2xl font-black text-lg py-6 bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all shadow-none">
                        تسوق الآن
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 2. Platform Services Sections */}
          {CATEGORIES.map((cat) => {
            const provider = PROVIDERS.find(p => p.category === cat.id);
            if (!provider) return null;
            return (
              <section key={cat.id} className="mb-20">
                <div className="flex items-center justify-between mb-8 flex-row border-r-4 border-primary pr-4">
                  <Link href={`/provider/${provider.id}`}>
                    <Button variant="ghost" className="text-primary font-black gap-2 flex-row-reverse p-0 hover:bg-transparent shadow-none">
                      اكتشف المزيد
                      <ArrowLeft className="w-5 h-5" />
                    </Button>
                  </Link>
                  <h2 className="text-3xl font-black text-right">{cat.name}</h2>
                </div>
                <Card className="group border-none shadow-none hover:bg-secondary/20 transition-all rounded-3xl p-6 bg-secondary/10">
                  <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
                    <div className="relative w-full md:w-64 h-64 rounded-3xl overflow-hidden flex-shrink-0">
                      <Image src={provider.image} alt={provider.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 text-right py-2">
                      <h3 className="text-4xl font-black mb-4">{provider.name}</h3>
                      <p className="text-xl text-muted-foreground mb-8">{provider.description}</p>
                      <div className="flex items-center gap-8 flex-row-reverse text-lg font-bold text-primary">
                         <span className="flex items-center gap-2"><Star className="w-6 h-6 fill-primary" /> {provider.rating} تقييم المنصة</span>
                         <span className="text-muted-foreground">|</span>
                         <span>{provider.deliveryTime || 'خدمة فورية'}</span>
                      </div>
                      <Link href={`/provider/${provider.id}`}>
                        <Button className="mt-8 px-12 py-6 rounded-2xl text-xl font-black shadow-none">
                          عرض المنتجات
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </section>
            );
          })}
        </div>

        {/* App Promo */}
        <section className="bg-primary/5 py-24 border-y border-primary/10">
          <div className="container mx-auto px-4 flex flex-col md:flex-row-reverse items-center gap-16">
            <div className="flex-1 text-right">
              <h2 className="text-5xl font-black mb-8">كل ما تحتاجه في جيبك</h2>
              <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
                حمل تطبيق تاتكس الآن وتمتع بتجربة شراء مباشرة من المنصة مع ضمان الجودة وسرعة التوصيل.
              </p>
              <div className="flex gap-4 justify-end">
                <div className="w-48 h-16 bg-black rounded-2xl flex items-center justify-center cursor-pointer hover:opacity-80 transition-all">
                  <span className="text-white text-lg font-black">App Store</span>
                </div>
                <div className="w-48 h-16 bg-black rounded-2xl flex items-center justify-center cursor-pointer hover:opacity-80 transition-all">
                  <span className="text-white text-lg font-black">Google Play</span>
                </div>
              </div>
            </div>
            <div className="flex-1 relative h-[600px] w-full max-w-md">
              <div className="absolute inset-0 bg-primary/20 rounded-[4rem] rotate-6 scale-95" />
              <div className="absolute inset-0 bg-white rounded-[4rem] overflow-hidden border-[12px] border-black">
                <Image 
                  src="https://picsum.photos/seed/tatx-phone-app/400/800"
                  alt="Tatx App"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t py-20 text-right">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-8 justify-end">
                <span className="text-3xl font-black">تاتكس<span className="text-primary">Tatx</span></span>
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-black text-2xl">T</div>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed">
                تاتكس هي منصة البيع المباشر الأسرع في المملكة. نحن لا نجمع المتاجر فقط، بل نبيع لك الجودة مباشرة.
              </p>
            </div>
            <div>
              <h4 className="font-black text-xl mb-8">اكتشف تاتكس</h4>
              <ul className="space-y-4 text-muted-foreground font-bold">
                <li>سوبر ماركت تاتكس</li>
                <li>مطاعم تاتكس</li>
                <li>تاكسي تاتكس</li>
                <li>صيدلية تاتكس</li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-xl mb-8">الشركة</h4>
              <ul className="space-y-4 text-muted-foreground font-bold">
                <li>عن تاتكس</li>
                <li>سياسة الجودة</li>
                <li>سياسة الخصوصية</li>
                <li>الشروط والأحكام</li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-xl mb-8">الدعم</h4>
              <ul className="space-y-4 text-muted-foreground font-bold">
                <li>البريد: care@tatx.com</li>
                <li>الرقم الموحد: 92000000</li>
                <li>الرياض، المملكة العربية السعودية</li>
              </ul>
            </div>
          </div>
          <div className="pt-10 border-t flex flex-col md:flex-row-reverse justify-between items-center gap-6 font-bold text-muted-foreground">
            <p>© 2024 تاتكس Tatx. جميع الحقوق محفوظة للمنصة.</p>
            <div className="flex gap-8">
              <span className="hover:text-primary transition-colors cursor-pointer">X</span>
              <span className="hover:text-primary transition-colors cursor-pointer">Instagram</span>
              <span className="hover:text-primary transition-colors cursor-pointer">TikTok</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
