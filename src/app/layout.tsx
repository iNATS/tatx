import type {Metadata} from 'next';
import './globals.css';
import {Toaster} from '@/components/ui/toaster';
import {ClientLayoutWrapper} from '@/components/layout/ClientLayoutWrapper';
import {MobileBottomNav} from '@/components/layout/MobileBottomNav';

export const metadata: Metadata = {
  title: 'تاتكس | Tatx - كل ما تحتاجه في مكان واحد',
  description: 'خدمات التوصيل، التاكسي، القاعات، الشاليهات، وأكثر. تاتكس رفيقك اليومي.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Cairo:wght@400;600;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col pb-16 md:pb-0" style={{ fontFamily: "'Cairo', sans-serif" }}>
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
        <MobileBottomNav />
        <Toaster />
      </body>
    </html>
  );
}
