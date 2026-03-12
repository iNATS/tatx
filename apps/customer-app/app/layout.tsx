import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { DEMO_MODE } from '../lib/demo-config';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tatx - Customer App',
  description: 'Book rides and order food with Tatx',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {DEMO_MODE.enabled && (
          <div className="fixed top-0 left-0 right-0 z-[100]">
            {/* Demo banner will be injected here */}
          </div>
        )}
        {children}
      </body>
    </html>
  );
}
