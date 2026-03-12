import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tatx Admin Dashboard',
  description: 'Admin dashboard for Tatx platform - Manage rides, orders, users, and analytics',
  keywords: ['tatx', 'admin', 'dashboard', 'rides', 'delivery', 'super-app'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
