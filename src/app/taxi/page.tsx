
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
import dynamic from 'dynamic';

// Dynamically import Map component to avoid SSR issues with Leaflet
const TaxiMap = dynamic(() => import('@/components/taxi/TaxiMap'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-secondary animate-pulse flex items-center justify-center font-bold">جاري تحميل الخريطة...</div>
});

export default function TaxiUberPage() {
  const [pickup, setPickup] = useState('موقعي الحالي');
  const [destination, setDestination] = useState('');
  const [selectedType, setSelectedType] = useState(Taxis[0].id);
  const [serviceMode, setServiceMode] = useState<'ride' | 'parcel'>('ride');

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
          <Card className="max-w-md mx-auto border-none shadow-none bg-white rounded-3xl p-3 ring-1 ring-border">
            <div className="space-y-3">
              <div className="relative">
                <div className="absolute right-3 top-3 w-2.5 h-2.5 rounded-full bg-blue-500 border-2 border-white" />
                <div className="absolute right-4 top-6 w-[1px] h-6 bg-gray-200" />
                <Input 
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="pr-10 h-10 bg-secondary/30 border-none rounded-xl font-bold shadow-none focus-visible:ring-primary"
                  placeholder="من أين؟"
                />
              </div>
              <div className="relative">
                <div className="absolute right-3 top-3 w-2.5 h-2.5 rounded-sm bg-black border-2 border-white" />
                <Input 
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="pr-10 h-10 bg-secondary/30 border-none rounded-xl font-bold shadow-none focus-visible:ring-primary"
                  placeholder="إلى أين؟"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Bottom Booking Interface */}
        <div className="mt-auto relative z-10">
          <Card className="max-w-md mx-auto border-none shadow-none bg-white rounded-t-3xl p-5 ring-1 ring-border">
            {destination ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                   <h3 className="text-lg font-black">اختر نوع الرحلة</h3>
                   <Button variant="ghost" className="text-xs font-bold text-primary p-0 h-auto hover:bg-transparent shadow-none">عرض المسار</Button>
                </div>
                
                <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar">
                  {Taxis.map((taxi) => (
                    <div 
                      key={taxi.id}
                      onClick={() => setSelectedType(taxi.id)}
                      className={cn(
                        "flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border-2",
                        selectedType === taxi.id ? "border-primary bg-primary/5" : "border-transparent hover:bg-secondary/30"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-10">
                          <Image src={taxi.image} alt={taxi.name} fill className="object-contain" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-black text-base">{taxi.name}</span>
                            {taxi.id === 'eco' && <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded text-[8px] font-black">الأوفر</span>}
                          </div>
                          <span className="text-[10px] text-muted-foreground font-bold">{taxi.time} • وصول سريع</span>
                        </div>
                      </div>
                      <div className="text-left text-sm">
                        <div className="font-black">{estimatedPrice > 0 ? (estimatedPrice * taxi.price).toFixed(0) : 0} ر.س</div>
                        <span className="text-[9px] text-muted-foreground line-through">{(estimatedPrice * taxi.price * 1.2).toFixed(0)} ر.س</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between bg-secondary/20 p-3 rounded-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <span className="block font-black text-xs">بطاقة مدى / ائتمان</span>
                    </div>
                  </div>
                  <ChevronLeft className="w-3 h-3 text-muted-foreground" />
                </div>

                <Button className="w-full h-12 rounded-xl text-lg font-black bg-primary text-white shadow-none border-none">
                  طلب {selectedCar?.name} الآن
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black">اذهب إلى أي مكان</h3>
                  <Button variant="secondary" className="rounded-full shadow-none font-black px-4 py-1 h-8 bg-secondary text-foreground text-xs">حجز مسبق</Button>
                </div>
                
                {/* Uber-style Selection Grid with Icons */}
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setServiceMode('ride')}
                    className={cn(
                      "p-4 rounded-2xl flex flex-col items-start gap-2 cursor-pointer transition-all text-right group border-2 outline-none shadow-none",
                      serviceMode === 'ride' 
                        ? "bg-primary/5 border-primary" 
                        : "bg-secondary/30 border-transparent hover:bg-secondary/50"
                    )}
                  >
                     <div className={cn(
                       "w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105",
                       serviceMode === 'ride' ? "bg-primary text-white" : "bg-white text-black"
                     )}>
                        <Car className="w-6 h-6" />
                     </div>
                     <div className="space-y-0.5">
                        <span className={cn("block font-black text-base", serviceMode === 'ride' && "text-primary")}>سيارة تاتكس</span>
                        <span className="block text-[10px] text-muted-foreground font-bold">مشاوير يومية مريحة</span>
                     </div>
                  </button>
                  <button 
                    onClick={() => setServiceMode('parcel')}
                    className={cn(
                      "p-4 rounded-2xl flex flex-col items-start gap-2 cursor-pointer transition-all text-right group border-2 outline-none shadow-none",
                      serviceMode === 'parcel' 
                        ? "bg-primary/5 border-primary" 
                        : "bg-secondary/30 border-transparent hover:bg-secondary/50"
                    )}
                  >
                     <div className={cn(
                       "w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105",
                       serviceMode === 'parcel' ? "bg-primary text-white" : "bg-white text-black"
                     )}>
                        <Package className="w-6 h-6" />
                     </div>
                     <div className="space-y-0.5">
                        <span className={cn("block font-black text-base", serviceMode === 'parcel' && "text-primary")}>تاتكس طرود</span>
                        <span className="block text-[10px] text-muted-foreground font-bold">توصيل سريع وأمان</span>
                     </div>
                  </button>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-3 p-1.5 border-b border-secondary">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <div className="flex-1">
                      <span className="block font-black text-xs">المنزل</span>
                      <span className="text-[10px] text-muted-foreground">حي الملقا، الرياض</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-1.5">
                    <Star className="w-4 h-4 text-muted-foreground" />
                    <div className="flex-1">
                      <span className="block font-black text-xs">المكتب</span>
                      <span className="text-[10px] text-muted-foreground">مركز الملك عبدالله المالي</span>
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

import dynamic from 'next/dynamic';
