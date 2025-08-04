'use client';

import NavBar from '@/widgets/NavBar';
import SideBar from '@/widgets/SideBar';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
    }
  }, []);
  
  return (
    <>
      <NavBar />
      <div style={{ display: 'flex' }}>
        <SideBar />
        <main style={{
          flexGrow: 1,
          backgroundColor: '#fff',
          padding: '2rem',
          minHeight: 'calc(100vh - 64px)',
          overflowY: 'scroll',
          maxHeight: 'calc(100vh - 64px)',
        }}>
          {children}
        </main>
      </div>
    </>
  );
}
