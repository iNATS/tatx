"use client";

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary/30 border-t" dir="rtl">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand & Social */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-black text-2xl">
                T
              </div>
              <span className="text-2xl font-black">
                تاتكس<span className="text-primary">Tatx</span>
              </span>
            </Link>
            <p className="text-muted-foreground font-medium leading-relaxed">
              كل احتياجاتك اليومية في مكان واحد. من خدمات التوصيل والمطاعم إلى حجز الشاليهات والقاعات. تاتكس رفيقك اليومي في المملكة.
            </p>
            <div className="flex gap-4">
              {[Twitter, Instagram, Facebook, Youtube].map((Icon, idx) => (
                <button key={idx} className="w-10 h-10 rounded-full bg-white border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all shadow-none">
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-black mb-6 border-r-4 border-primary pr-3">خدماتنا</h4>
            <ul className="space-y-4 font-bold text-muted-foreground">
              <li><Link href="/provider/rest-1" className="hover:text-primary transition-colors">مطاعم تاتكس</Link></li>
              <li><Link href="/taxi" className="hover:text-primary transition-colors">تاكسي تاتكس</Link></li>
              <li><Link href="/provider/market-tatx" className="hover:text-primary transition-colors">سوبر ماركت تاتكس</Link></li>
              <li><Link href="/provider/chalet-1" className="hover:text-primary transition-colors">شاليهات تاتكس</Link></li>
              <li><Link href="/provider/serv-1" className="hover:text-primary transition-colors">خدمات تاتكس</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xl font-black mb-6 border-r-4 border-primary pr-3">عن تاتكس</h4>
            <ul className="space-y-4 font-bold text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">من نحن</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">الشروط والأحكام</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">سياسة الخصوصية</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">انضم إلينا كمزود خدمة</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">الأسئلة الشائعة</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xl font-black mb-6 border-r-4 border-primary pr-3">تواصل معنا</h4>
            <ul className="space-y-4 font-bold text-muted-foreground">
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <span>9200 XXXXX</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <span>info@tatx.com</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span>الرياض، المملكة العربية السعودية</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-muted-foreground font-bold text-sm">
            © {new Date().getFullYear()} تاتكس Tatx. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}
