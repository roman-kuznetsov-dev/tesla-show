'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleLogout = async () => {
    // Удаляем куку через API (создадим его ниже) или просто очищаем через JS
    document.cookie = 'admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-background text-white">
      <header className="bg-surface border-b border-white/10 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Админка Tesla Show</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-muted hover:text-white transition-colors"
        >
          <LogOut size={16} /> Выйти
        </button>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}