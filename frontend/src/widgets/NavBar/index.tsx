'use client';

import React, { useState, useRef, useEffect } from 'react';
import { User } from 'lucide-react';
import { useAuthStore } from '@/features/Auth/model/store';
import { useRouter } from 'next/navigation';

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/auth/login');
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav style={{
      backgroundColor: '#15A8E3',
      color: '#fff',
      padding: '17px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'relative'
    }}>
      <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Админ-панель</div>
      <div
        onClick={() => setOpen(!open)}
        className='flex items-center justify-center p-2 border border-white rounded-full cursor-pointer relative'
        ref={menuRef}
      >
        <User size={24} />
        <div
          className={`absolute right-0 top-[50px] w-40 bg-white text-black rounded-md shadow-lg z-10 transition-all duration-200 ease-in-out ${
            open ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
          }`}
        >
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 hover:rounded-md"
          >
            Выйти
          </button>
        </div>
      </div>
    </nav>
  );
}
