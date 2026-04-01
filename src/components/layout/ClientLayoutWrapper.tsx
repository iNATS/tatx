"use client";

import { usePathname } from 'next/navigation';
import { Footer } from './Footer';
import { AppDownloadCTA } from './AppDownloadCTA';
import { PartnerCTA } from './PartnerCTA';

export function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const isPortalOrAuth = pathname.startsWith('/admin') || 
                         pathname.startsWith('/vendor') || 
                         pathname.startsWith('/delivery') || 
                         pathname.startsWith('/profile') ||
                         pathname.startsWith('/auth');

  return (
    <>
      {children}
      {!isPortalOrAuth && (
        <>
          <AppDownloadCTA />
          <PartnerCTA />
          <Footer />
        </>
      )}
    </>
  );
}
