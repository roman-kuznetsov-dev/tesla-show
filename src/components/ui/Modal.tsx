'use client';

import { useEffect, useRef, type ReactNode } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  /** Заголовок для скринридеров */
  ariaLabel?: string;
};

export default function Modal({ isOpen, onClose, children, ariaLabel = 'Модальное окно' }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Закрытие по Escape + блокировка скролла body
  useEffect(() => {
    if (!isOpen) return;

    // Запоминаем элемент, который был в фокусе до открытия
    previousFocusRef.current = document.activeElement as HTMLElement;

    // Блокируем скролл body
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Обработчик Escape
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);

    // Фокус на модалку при открытии
    setTimeout(() => {
      dialogRef.current?.focus();
    }, 0);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = originalOverflow;
      // Возвращаем фокус на элемент, который был активен до открытия
      previousFocusRef.current?.focus();
    };
  }, [isOpen, onClose]);

  // Фокус-лок: Tab не должен выходить за пределы модалки
  useEffect(() => {
    if (!isOpen) return;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusable = dialog.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
    >
      {/* Затемнение фона */}
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Контент модалки */}
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="relative z-10 w-full max-w-4xl outline-none"
      >
        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm md:text-base"
          aria-label="Закрыть"
        >
          <span>Закрыть</span>
          <span className="text-2xl leading-none">×</span>
        </button>

        {children}
      </div>
    </div>
  );
}