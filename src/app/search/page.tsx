"use client";

import { Navbar } from '@/components/layout/Navbar';
import { Input } from '@/components/ui/input';
import { Search as SearchIcon, Star, MapPin } from 'lucide-react';
import { useState } from 'react';
import { MENU_ITEMS, PROVIDERS } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

/**
 * @fileOverview صفحة البحث المركزية في تطبيق تاتكس.
 * تتيح للمستخدم البحث عن كافة الخدمات والمنتجات المتاحة.
 */
export default function SearchPage() {
  const [query, setQuery] = useState('');

  // تصفية النتائج بناءً على نص البحث
  const results = query.length > 0 ? MENU_ITEMS.filter(item => 
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    (item.description && item.description.toLowerCase().includes(query.toLowerCase()))
  ) : [];

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white pb-24" dir="rtl">
        <div className="container mx-auto px-4 py-8">
          {/* حقل البحث العلوي */}
          <div className="relative mb-8 max-w-2xl mx-auto">
            <SearchIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              placeholder="ابحث عن وجبات، خدمات، أو أماكن..." 
              className="h-14 pr-12 rounded-[1.5rem] bg-secondary/50 border-none text-right font-black text-lg focus-visible:ring-primary shadow-none"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {/* حالة عدم وجود بحث */}
          {query.length === 0 ? (
            <div className="text-center py-20 flex flex-col items-center">
              <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mb-6">
                <SearchIcon className="w-10 h-10 text-primary/40" />
              </div>
              <h3 className="text-2xl font-black mb-2">ابدأ البحث في تاتكس</h3>
              <p className="text-muted-foreground font-bold max-w-xs">
                ابحث عن أي شيء؛ من مطعمك المفضل إلى أقرب صيدلية أو حتى حجز شاليه.
              </p>
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {results.map((item) => {
                const provider = PROVIDERS.find(p => p.id === item.providerId);
                return (
                  <Link key={item.id} href={['chalets', 'halls', 'services'].includes(item.category) ? `/item/${item.id}` : `/provider/${item.providerId}`}>
                    <Card className="overflow-hidden border-none shadow-sm bg-white rounded-[1.5rem] group hover:md-elevation-2 transition-all">
                      <div className="flex flex-row-reverse p-4 gap-4">
                        <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0 bg-secondary/30">
                          <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="flex-1 text-right flex flex-col justify-between">
                          <div>
                            <h4 className="font-black text-base line-clamp-1 group-hover:text-primary transition-colors">{item.name}</h4>
                            <p className="text-xs text-muted-foreground font-bold mb-1">{provider?.name}</p>
                          </div>
                          <div className="flex justify-between items-center flex-row-reverse">
                            <span className="font-black text-primary text-lg">{item.price} <span className="text-[10px]">ر.س</span></span>
                            <div className="flex items-center gap-1 text-[10px] font-black bg-secondary/50 px-2 py-0.5 rounded-full">
                               <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                               <span>{provider?.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl font-black text-muted-foreground">لا توجد نتائج مطابقة لـ "{query}"</p>
              <p className="text-sm font-bold text-muted-foreground/60 mt-2">حاول البحث بكلمات أبسط أو تصنيفات أخرى</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
