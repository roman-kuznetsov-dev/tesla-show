'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useAnchorTransition } from '@/hooks/useAnchorTransition';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  nav: { href: string; label: string }[];
  activeSection: string;
};

export default function MobileMenu({ isOpen, onClose, nav, activeSection }: Props) {
  const [mounted, setMounted] = useState(false);
  const handleAnchorClick = useAnchorTransition();

  // Рендерим портал только после монтирования на клиенте
  useEffect(() => {
    setMounted(true);
  }, []);

  // Блокировка скролла страницы
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  // Закрытие по Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-[100] lg:hidden transition-all duration-300 ${
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      {/* Затемнение фона */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Панель меню — начинается под шапкой */}
      <div
        className={`absolute top-16 left-0 right-0 bottom-0 bg-black/95 border-t border-white/10 overflow-y-auto transition-all duration-300 ease-out ${
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
        }`}
      >
        <ul className="flex flex-col gap-4 px-4 py-6">
          {nav.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => handleAnchorClick(e, item.href, onClose)}
                  className={`block text-lg transition-colors ${
                    isActive ? 'text-primary font-semibold' : 'hover:text-primary'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
          <li>
            <a
              href="tel:+79061744325"
              className="block bg-primary text-background text-center py-3 rounded-full font-semibold mt-4"
            >
              Позвонить
            </a>
          </li>
        </ul>
      </div>
    </div>,
    document.body
  );
}