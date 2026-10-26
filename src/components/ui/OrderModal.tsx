'use client';

import { useEffect } from 'react';
import { X, Phone, MessageCircle } from 'lucide-react';
import ContactForm from '@/components/sections/ContactForm';
import { contacts } from '@/data/contacts';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function OrderModal({ isOpen, onClose }: Props) {
  const leadsEnabled = process.env.NEXT_PUBLIC_ENABLE_LEADS === 'true';

  // Блокировка скролла
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

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-end md:items-center justify-center transition-all duration-300 ${
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      aria-hidden={!isOpen}
    >
      {/* Затемнение */}
      <div
        className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Панель модалки */}
      <div
        className={`relative w-full md:w-[800px] bg-gradient-to-b from-surface to-[#1a1a2e] rounded-t-3xl md:rounded-3xl p-6 md:p-8 transition-all duration-300 ease-out max-h-[90vh] overflow-y-auto ${
          isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
      >
        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
          aria-label="Закрыть"
        >
          <X size={20} />
        </button>

        <h2 className="font-heading text-2xl font-bold mb-6 text-center">
          Заказать <span className="text-primary">шоу</span>
        </h2>

        {/* Локально — форма. В проде — контакты */}
        {leadsEnabled ? (
          <ContactForm />
        ) : (
          <div className="space-y-4 py-8 flex flex-col justify-center min-h-[50vh]">
            {/* Телефон */}
            <a
              href={contacts.phone.href}
              className="group flex items-center gap-4 bg-background/50 border border-white/10 rounded-2xl p-5 md:p-6 transition-all duration-300 hover:border-primary/40 hover:bg-background/80"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 transition-colors group-hover:bg-primary/20">
                <Phone size={22} strokeWidth={1.75} aria-hidden="true" />
              </div>
              <div>
                <p className="text-muted text-xs uppercase tracking-widest mb-1">Позвонить</p>
                <p className="font-heading text-lg md:text-xl font-bold">{contacts.phone.display}</p>
              </div>
            </a>

            {/* ВКонтакте */}
            <a
              href={contacts.vk.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 bg-background/50 border border-white/10 rounded-2xl p-5 md:p-6 transition-all duration-300 hover:border-primary/40 hover:bg-background/80"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 transition-colors group-hover:bg-primary/20">
                <MessageCircle size={22} strokeWidth={1.75} aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="text-muted text-xs uppercase tracking-widest mb-1">Написать</p>
                <p className="font-heading text-lg md:text-xl font-bold break-all">{contacts.vk.display}</p>
              </div>
            </a>

            <p className="text-muted text-xs text-center mt-4">
              Нажмите на контакт, чтобы связаться с нами
            </p>
          </div>
        )}
      </div>
    </div>
  );
}