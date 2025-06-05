'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx'; 

export default function SideBar() {
  const pathname = usePathname();

  const links = [
    { href: '/admin', label: 'Главная' },
    { href: '/admin/products', label: 'Товары' },
    { href: '/admin/categories', label: 'Категории' },
    { href: '/admin/users', label: 'Пользователи' },
    { href: '/admin/banners', label: 'Баннеры' },
    { href: '/admin/profile', label: 'Профиль' },
  ];

  return (
    <aside
      style={{
        backgroundColor: '#ECF4F6',
        padding: '1rem',
        width: '280px',
        minHeight: 'calc(100vh - 64px)',
      }}
    >
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                'px-4 py-2 rounded-lg text-base font-medium border border-[#d9edf2]',
                isActive
                  ? 'bg-[#15A8E3] text-white'
                  : 'text-[#333] hover:bg-[#d9edf2]'
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
