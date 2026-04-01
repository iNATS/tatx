
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-[#D2D2D7]/30 pt-20 pb-12" dir="rtl">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-3 group">
              <span className="text-3xl font-black text-[#1D1D1F]">
                Tatx
              </span>
              <div className="relative w-10 h-10 overflow-hidden rounded-xl bg-white border border-[#D2D2D7]/30 flex items-center justify-center p-1.5">
                <Image 
                  src="https://picsum.photos/seed/tatx-logo/200/200" 
                  alt="Tatx Logo" 
                  width={32} 
                  height={32} 
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-[#86868B] font-bold leading-relaxed text-lg">
              رفيقك اليومي في المملكة. خدمات متكاملة صُممت لتجعل حياتك أسهل وأكثر ذكاءً.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, idx) => (
                <button key={idx} className="w-10 h-10 rounded-full bg-[#F5F5F7] flex items-center justify-center text-[#1D1D1F] hover:bg-[#E8E8ED] transition-all shadow-none border-none">
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-black mb-8 text-[#1D1D1F]">الخدمات</h4>
            <ul className="space-y-4 font-bold text-[#86868B]">
              <li><Link href="#" className="hover:text-primary transition-colors">المطاعم</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">التاكسي</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">السوبر ماركت</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">الشاليهات والقاعات</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-black mb-8 text-[#1D1D1F]">الشركة</h4>
            <ul className="space-y-4 font-bold text-[#86868B]">
              <li><Link href="#" className="hover:text-primary transition-colors">من نحن</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">الشروط والأحكام</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">سياسة الخصوصية</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">انضم كشريك</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-black mb-8 text-[#1D1D1F]">تواصل معنا</h4>
            <ul className="space-y-6 font-bold text-[#86868B]">
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#F5F5F7] rounded-full flex items-center justify-center text-primary">
                  <Phone className="w-5 h-5" />
                </div>
                <span>9200 Tatx</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#F5F5F7] rounded-full flex items-center justify-center text-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <span>info@tatx.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-[#D2D2D7]/30 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[#86868B] font-bold text-sm">
            © {new Date().getFullYear()} Tatx. صنع بكل حب في المملكة.
          </p>
          <div className="flex gap-8 text-sm font-bold text-[#86868B]">
            <Link href="#" className="hover:text-[#1D1D1F]">سياسة الكوكيز</Link>
            <Link href="#" className="hover:text-[#1D1D1F]">إمكانية الوصول</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
