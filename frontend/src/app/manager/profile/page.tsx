'use client';

import { useUserStore } from '@/features/Users/model/store';
import { useEffect } from 'react';

export default function ProfilePage() {
  const { fetchProfile, profile } = useUserStore();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (!profile) {
    return <p className="p-4 text-gray-500">Загрузка профиля...</p>;
  }

  return (
    <div className="w-full mx-auto p-6 bg-white shadow-md rounded-xl mt-6">
      <h1 className="text-2xl font-bold mb-6">Профиль админа</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <ProfileField label="Имя" value={profile.firstName} />
        <ProfileField label="Фамилия" value={profile.lastName} />
        <ProfileField label="Логин" value={profile.login} />
        <ProfileField label="Email" value={profile.email} />
        <ProfileField label="Телефон" value={profile.phone} />
        <ProfileField label="Роль" value={profile.role} />
      </div>
    </div>
  );
}

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium">{value || '-'}</span>
    </div>
  );
}
