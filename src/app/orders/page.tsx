
"use client";

import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, Truck, ChefHat, CheckCircle, MapPin } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function OrdersPage() {
  const steps = [
    { label: 'Confirmed', icon: Package, done: true },
    { label: 'Preparing', icon: ChefHat, done: true },
    { label: 'On the way', icon: Truck, done: false },
    { label: 'Delivered', icon: CheckCircle, done: false },
  ];

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-4xl font-black mb-2">Track Order</h1>
              <p className="text-muted-foreground font-medium">Order #FF-4921-93</p>
            </div>
            <Badge variant="primary" className="text-lg px-4 py-1">Preparing</Badge>
          </div>

          <Card className="border-none shadow-xl overflow-hidden mb-8">
            <CardContent className="p-0">
              {/* Fake Map */}
              <div className="h-[400px] bg-secondary relative">
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                   <MapPin className="w-64 h-64" />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                   <div className="relative">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shadow-2xl animate-pulse">
                         <Truck className="w-6 h-6" />
                      </div>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white px-3 py-1 rounded-full text-xs font-black shadow-lg">
                        15 mins away
                      </div>
                   </div>
                </div>
              </div>

              {/* Status Bar */}
              <div className="p-8 bg-white">
                <div className="relative mb-12">
                   <Progress value={45} className="h-2" />
                   <div className="absolute top-0 left-0 w-full flex justify-between -translate-y-1/2">
                      {steps.map((step, idx) => {
                        const Icon = step.icon;
                        return (
                          <div key={idx} className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                              step.done ? 'bg-primary text-white scale-110 shadow-lg' : 'bg-secondary text-muted-foreground'
                            }`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <span className={`text-xs font-bold mt-2 ${step.done ? 'text-primary' : 'text-muted-foreground'}`}>
                              {step.label}
                            </span>
                          </div>
                        );
                      })}
                   </div>
                </div>

                <div className="flex items-center gap-4 bg-secondary/50 p-4 rounded-2xl">
                  <div className="w-16 h-16 bg-white rounded-xl overflow-hidden relative border">
                    <Image 
                      src="https://picsum.photos/seed/chef/100/100" 
                      alt="Driver" 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold">Ahmed Al-Qahtani</h4>
                    <p className="text-sm text-muted-foreground">Your FeastFast Hero</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:opacity-90">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                    </button>
                    <button className="w-10 h-10 bg-white border text-primary rounded-full flex items-center justify-center shadow-md hover:bg-secondary">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold mb-6">Order Details</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center font-bold text-primary">2x</div>
                    <div>
                      <h5 className="font-bold">The Classic Beast</h5>
                      <p className="text-xs text-muted-foreground">Extra sauce, no onions</p>
                    </div>
                  </div>
                  <span className="font-bold">25.98 SAR</span>
                </div>
                <div className="flex justify-between items-center pt-4">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-black text-2xl text-primary">40.98 SAR</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}

import Image from 'next/image';
