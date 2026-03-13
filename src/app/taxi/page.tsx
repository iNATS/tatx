"use client";

import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MapPin, Navigation, Search, Clock, ShieldCheck, CreditCard, Star, ChevronLeft, Map as MapIcon, Car, Package } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import { Taxis } from '@/lib/data';
import { cn } from '@/lib/utils';

export default function TaxiUberPage() {
  const [pickup, setPickup] = useState('موقعي الحالي');
  const [destination, setDestination] = useState('');
  const [selectedType, setSelectedType] = useState(Taxis[0].id);
  const [step, setStep] = useState<'details' | 'confirm'>('details');

  const selectedCar = Taxis.find(t => t.id === selectedType);
  const estimatedPrice = destination ? (selectedCar?.price || 1) * 20 : 0;

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white relative overflow-hidden flex flex-col h-[calc(100vh-64px)]" dir="rtl">
        {/* Map Background (Simulated) */}
        <div className="absolute inset-0 bg-[#f0f0f0] z-0">
          <div className="absolute inset-0 opacity-40">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                  <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#999" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          
          {/* Simulated Car Markers */}
          <div className="absolute top-1/3 left-1/4 animate-bounce">
            <MapPin className="w-8 h-8 text-primary fill-primary" />
          </div>
          <div className="absolute bottom-1/4 right-1/3 opacity-50">
             <div className="w-6 h-10 bg-black rounded-sm rotate-45" />
          </div>
          <div className="absolute top-1/2 right-1/4 opacity-50">
             <div className="w-6 h-10 bg-primary rounded-sm -rotate-12" />
          </div>
        </div>

        {/* Search Header */}
        <div className="relative z-10 p-4">
          <Card className="max-w-md mx-auto border-none shadow-none bg-white rounded-3xl p-4">
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute right-3 top-3 w-2 h-2 rounded-full bg-blue-500" />
                <div className="absolute right-4 top-5 w-[1px] h-6 bg-gray-300" />
                <Input 
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="pr-10 h-12 bg-secondary/50 border-none rounded-xl font-bold shadow-none"
                  placeholder="من أين؟"
                />
              </div>
              <div className="relative">
                <div className="absolute right-3 top-3 w-2 h-2 rounded-sm bg-black" />
                <Input 
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="pr-10 h-12 bg-secondary/50 border-none rounded-xl font-bold shadow-none"
                  placeholder="إلى أين؟"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Bottom Booking Interface */}
        <div className="mt-auto relative z-10">
          <Card className="max-w-2xl mx-auto border-none shadow-none bg-white rounded-t-[3rem] p-6 lg:p-8">
            {destination ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-2">
                   <h3 className="text-xl font-black">اختر نوع الرحلة</h3>
                   <span className="text-sm font-bold text-muted-foreground">عرض المسار</span>
                </div>
                
                <div className="space-y-2 max-h-64 overflow-y-auto no-scrollbar">
                  {Taxis.map((taxi) => (
                    <div 
                      key={taxi.id}
                      onClick={() => setSelectedType(taxi.id)}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all border-2",
                        selectedType === taxi.id ? "border-primary bg-primary/5" : "border-transparent hover:bg-secondary/50"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-12">
                          <Image src={taxi.image} alt={taxi.name} fill className="object-contain" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-black text-lg">{taxi.name}</span>
                            <span className="bg-secondary px-2 py-0.5 rounded text-[10px] font-bold">الأفضل</span>
                          </div>
                          <span className="text-xs text-muted-foreground font-bold">{taxi.time} • مريح جداً</span>
                        </div>
                      </div>
                      <div className="text-left">
                        <div className="font-black text-lg">{estimatedPrice > 0 ? (estimatedPrice * taxi.price).toFixed(0) : 0} ر.س</div>
                        <span className="text-[10px] text-muted-foreground line-through">{(estimatedPrice * taxi.price * 1.2).toFixed(0)} ر.س</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between bg-secondary/30 p-4 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <span className="block font-black text-sm">كاش / محفظة تاتكس</span>
                      <span className="text-[10px] text-muted-foreground">اضغط لتغيير وسيلة الدفع</span>
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
                  <Button variant="secondary" className="rounded-full shadow-none font-black px-6">حجز مسبق</Button>
                </div>
                
                {/* Redesigned Selection Grid (Uber Style with Icons) */}
                <div className="grid grid-cols-2 gap-4">
                  <button className="bg-secondary/40 p-6 rounded-3xl flex flex-col items-start gap-4 cursor-pointer hover:bg-secondary/60 transition-all text-right group border-none shadow-none outline-none">
                     <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105">
                        <Car className="w-8 h-8 text-black" />
                     </div>
                     <div className="space-y-1">
                        <span className="block font-black text-lg">سيارة تاتكس</span>
                        <span className="block text-xs text-muted-foreground font-bold">مشاوير يومية مريحة</span>
                     </div>
                  </button>
                  <button className="bg-secondary/40 p-6 rounded-3xl flex flex-col items-start gap-4 cursor-pointer hover:bg-secondary/60 transition-all text-right group border-none shadow-none outline-none">
                     <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105">
                        <Package className="w-8 h-8 text-black" />
                     </div>
                     <div className="space-y-1">
                        <span className="block font-black text-lg">تاتكس طرود</span>
                        <span className="block text-xs text-muted-foreground font-bold">توصيل سريع وأمان</span>
                     </div>
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-2 border-b">
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
