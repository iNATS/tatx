"use client";

import Link from 'next/link';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export function Navbar() {
  const navLinks = [
    { name: 'الرئيسية', href: '#hero' },
    { name: 'خدماتنا', href: '#services' },
    { name: 'مشاوير تاتكس', href: '#taxi' },
    { name: 'تحميل التطبيق', href: '#download' },
    { name: 'كن شريكاً', href: '#partners' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-2xl border-b border-[#D2D2D7]/30 h-20 md:h-24">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        
        {/* Navigation Links - Left Side (Desktop) */}
        <div className="flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-sm font-black text-[#1D1D1F] hover:text-primary transition-colors hidden lg:block"
            >
              {link.name}
            </Link>
          ))}
          {/* Mobile Profile Icon */}
          <div className="flex items-center gap-3 lg:hidden">
            <Link href="/profile">
              <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 hover:bg-[#F5F5F7] shadow-none">
                <User className="w-5 h-5 text-[#1D1D1F]" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Brand Logo - Right Side */}
        <Link href="/" className="flex items-center gap-3 group">
          <span className="text-2xl md:text-3xl font-black tracking-tight text-primary">
            Tatx
          </span>
          <div className="relative w-10 h-10 md:w-12 md:h-12 overflow-hidden rounded-xl bg-white shadow-sm border border-[#D2D2D7]/30 flex items-center justify-center p-1.5 transition-transform group-hover:scale-105">
            <Image 
              src="https://app.tatx.com/assets/?unstable_path=.%2Fassets/logo.png" 
              alt="Tatx Brand Logo" 
              width={48} 
              height={48} 
              className="object-contain"
            />
          </div>
        </Link>

      </div>
    </nav>
  );
}
