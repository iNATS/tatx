"use client";

import Link from 'next/link';
import Image from 'next/image';

export function Navbar() {
  const brandLogo = "https://images.sftcdn.net/images/t_app-icon-m/p/75df1bdf-499a-4260-9ba0-8aca15b79912/238198743/tatx-ttks-logo";
  
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
        </div>

        {/* Brand Logo - Right Side */}
        <Link href="/" className="flex items-center gap-3 group">
          <span className="text-2xl md:text-3xl font-black tracking-tight text-primary">
            Tatx
          </span>
          <div className="relative w-10 h-10 md:w-12 md:h-12 overflow-hidden rounded-xl bg-white shadow-sm border border-[#D2D2D7]/30 flex items-center justify-center p-1.5 transition-transform group-hover:scale-105">
            <Image 
              src={brandLogo}
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
