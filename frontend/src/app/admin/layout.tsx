import NavBar from '@/widgets/NavBar';
import SideBar from '@/widgets/SideBar';
import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
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
