"use client";

import { usePathname } from 'next/navigation';
import { Footer } from './Footer';
import { AppDownloadCTA } from './AppDownloadCTA';
import { PartnerCTA } from './PartnerCTA';

/**
 * @fileOverview Client-side wrapper to conditionally render global UI elements
 * like Footer and CTAs based on the current route.
 */
export function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Hide footer and CTAs for portal and auth pages
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
