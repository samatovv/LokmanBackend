'use client';

import './globals.css';
import { ReactNode } from 'react';
import Header from "@/widgets/Header";
import LinkHeader from "@/widgets/LinkHeader";
import Footer from '@/widgets/Footer';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const isAdmin = ['/admin', '/auth'].some(path => pathname.startsWith(path));
  return (
    <html lang="ru">
      <body className={!isAdmin ? 'pt-[110px] md:pt-[185px]' : ''}>
        {!isAdmin && (
          <>
            <Header />
            <div className='hidden md:block'>
              <LinkHeader />
            </div>
          </>
        )}
        {children}
        {!isAdmin && <Footer />}
      </body>
    </html>
  );
}
