
"use client";

import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MapPin, Clock, CreditCard, Star, ChevronLeft, Car, Package } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import { Taxis } from '@/lib/data';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';

// Dynamically import Map component to avoid SSR issues with Leaflet
const TaxiMap = dynamic(() => import('@/components/taxi/TaxiMap'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-secondary animate-pulse flex items-center justify-center font-bold">جاري تحميل الخريطة...</div>
});

export default function TaxiUberPage() {
  const [pickup, setPickup] = useState('موقعي الحالي');
  const [destination, setDestination] = useState('');
  const [selectedType, setSelectedType] = useState(Taxis[0].id);

  const selectedCar = Taxis.find(t => t.id === selectedType);
  const estimatedPrice = destination ? (selectedCar?.price || 1) * 20 : 0;

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white relative overflow-hidden flex flex-col h-[calc(100vh-64px)]" dir="rtl">
        
        {/* Real Map Component */}
        <div className="absolute inset-0 z-0">
          <TaxiMap pickup={pickup} destination={destination} />
        </div>

        {/* Search Header */}
        <div className="relative z-10 p-4">
          <Card className="max-w-md mx-auto border-none shadow-none bg-white rounded-3xl p-4 ring-1 ring-border">
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute right-3 top-3 w-2.5 h-2.5 rounded-full bg-blue-500 border-2 border-white" />
                <div className="absolute right-4 top-6 w-[1px] h-6 bg-gray-200" />
                <Input 
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="pr-10 h-12 bg-secondary/30 border-none rounded-xl font-bold shadow-none focus-visible:ring-primary"
                  placeholder="من أين؟"
                />
              </div>
              <div className="relative">
                <div className="absolute right-3 top-3 w-2.5 h-2.5 rounded-sm bg-black border-2 border-white" />
                <Input 
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="pr-10 h-12 bg-secondary/30 border-none rounded-xl font-bold shadow-none focus-visible:ring-primary"
                  placeholder="إلى أين؟"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Bottom Booking Interface */}
        <div className="mt-auto relative z-10">
          <Card className="max-w-2xl mx-auto border-none shadow-none bg-white rounded-t-[2.5rem] p-6 lg:p-8 ring-1 ring-border">
            {destination ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-2">
                   <h3 className="text-xl font-black">اختر نوع الرحلة</h3>
                   <Button variant="ghost" className="text-sm font-bold text-primary p-0 h-auto hover:bg-transparent">عرض المسار</Button>
                </div>
                
                <div className="space-y-2 max-h-64 overflow-y-auto no-scrollbar">
                  {Taxis.map((taxi) => (
                    <div 
                      key={taxi.id}
                      onClick={() => setSelectedType(taxi.id)}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all border-2",
                        selectedType === taxi.id ? "border-primary bg-primary/5" : "border-transparent hover:bg-secondary/30"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-12">
                          <Image src={taxi.image} alt={taxi.name} fill className="object-contain" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-black text-lg">{taxi.name}</span>
                            {taxi.id === 'eco' && <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-[10px] font-black">الأوفر</span>}
                          </div>
                          <span className="text-xs text-muted-foreground font-bold">{taxi.time} • وصول سريع</span>
                        </div>
                      </div>
                      <div className="text-left">
                        <div className="font-black text-lg">{estimatedPrice > 0 ? (estimatedPrice * taxi.price).toFixed(0) : 0} ر.س</div>
                        <span className="text-[10px] text-muted-foreground line-through">{(estimatedPrice * taxi.price * 1.2).toFixed(0)} ر.س</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between bg-secondary/20 p-4 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <span className="block font-black text-sm">بطاقة مدى / ائتمان</span>
                      <span className="text-[10px] text-muted-foreground">تاتكس تضمن لك رحلة آمنة</span>
                    </div>
                  </div>
                  <ChevronLeft className="w-4 h-4 text-muted-foreground" />
                </div>

                <Button className="w-full h-16 rounded-2xl text-xl font-black bg-primary text-white shadow-none border-none">
                  طلب {selectedCar?.name} الآن
                </Button>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black">اذهب إلى أي مكان</h3>
                  <Button variant="secondary" className="rounded-full shadow-none font-black px-6 bg-secondary text-foreground">حجز مسبق</Button>
                </div>
                
                {/* Uber-style Selection Grid with Icons */}
                <div className="grid grid-cols-2 gap-4">
                  <button className="bg-secondary/30 p-6 rounded-3xl flex flex-col items-start gap-4 cursor-pointer hover:bg-secondary/50 transition-all text-right group border-none shadow-none outline-none">
                     <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105">
                        <Car className="w-8 h-8 text-black" />
                     </div>
                     <div className="space-y-1">
                        <span className="block font-black text-lg">سيارة تاتكس</span>
                        <span className="block text-xs text-muted-foreground font-bold">مشاوير يومية مريحة</span>
                     </div>
                  </button>
                  <button className="bg-secondary/30 p-6 rounded-3xl flex flex-col items-start gap-4 cursor-pointer hover:bg-secondary/50 transition-all text-right group border-none shadow-none outline-none">
                     <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105">
                        <Package className="w-8 h-8 text-black" />
                     </div>
                     <div className="space-y-1">
                        <span className="block font-black text-lg">تاتكس طرود</span>
                        <span className="block text-xs text-muted-foreground font-bold">توصيل سريع وأمان</span>
                     </div>
                  </button>
                </div>

                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-4 p-2 border-b border-secondary">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    <div className="flex-1">
                      <span className="block font-black text-sm">المنزل</span>
                      <span className="text-xs text-muted-foreground">حي الملقا، الرياض</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-2">
                    <Star className="w-5 h-5 text-muted-foreground" />
                    <div className="flex-1">
                      <span className="block font-black text-sm">المكتب</span>
                      <span className="text-xs text-muted-foreground">مركز الملك عبدالله المالي</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </main>
    </>
  );
}
