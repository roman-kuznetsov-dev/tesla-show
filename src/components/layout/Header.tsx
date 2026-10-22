'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useScrollThreshold } from '@/hooks/useScrollThreshold';
import { useActiveSection } from '@/hooks/useActiveSection';

const NAV = [
  { href: '#about', label: 'О шоу' },
  { href: '#features', label: 'Что входит' },
  { href: '#gallery', label: 'Галерея' },
  { href: '#reviews', label: 'Отзывы' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Контакты' },
];

const SECTION_IDS = NAV.map((item) => item.href.replace('#', ''));

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const scrolled = useScrollThreshold(20);
  const activeSection = useActiveSection(SECTION_IDS);

  // Блокировка скролла body, пока меню открыто
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

  // Автозакрытие при ресайзе на десктоп
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Закрытие по Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl transition-all duration-300 ${scrolled
        ? 'bg-background/70 shadow-[0_4px_20px_rgba(0,217,255,0.1)]'
        : 'bg-transparent'
        }`}
    >
      <nav className="container mx-auto flex items-center h-16 px-4 gap-4">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="relative w-12 h-12 md:w-14 md:h-14 shrink-0 drop-shadow-[0_0_15px_rgba(0,217,255,0.6)]">
            <Image
              src="/images/logo.png"
              alt="Тесла шоу Без ПРОводов"
              fill
              className="object-contain [mask-image:radial-gradient(circle,black_45%,transparent_70%)] drop-shadow-[0_0_12px_rgba(0,217,255,0.4)]"
              priority
            />
          </div>
          <span className="font-heading font-bold text-sm md:text-base leading-tight flex flex-col">
            <span>Тесла шоу</span>
            <span className="text-primary tracking-wide">Без ПРОводов</span>
          </span>
        </Link>

        <ul className="hidden lg:flex gap-6 ml-auto items-center">
          {NAV.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`text-sm transition-colors ${isActive
                    ? 'text-primary font-semibold'
                    : 'hover:text-primary'
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
              className="bg-primary text-background px-5 py-2 rounded-full text-sm font-semibold hover:bg-opacity-90 transition"
            >
              +7 906 174-43-25
            </a>
          </li>
        </ul>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden ml-auto flex flex-col gap-1.5 w-8 h-8 justify-center"
          aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={isOpen}
        >
          <span
            className={`block h-0.5 w-6 bg-text transition-all duration-300 ${isOpen ? 'translate-y-2 rotate-45' : ''
              }`}
          />
          <span
            className={`block h-0.5 w-6 bg-text transition-all duration-300 ${isOpen ? 'opacity-0' : ''
              }`}
          />
          <span
            className={`block h-0.5 w-6 bg-text transition-all duration-300 ${isOpen ? '-translate-y-2 -rotate-45' : ''
              }`}
          />
        </button>
      </nav>

      {/* Мобильное меню — всегда в DOM, плавно открывается/закрывается */}
      <div
        className={`lg:hidden bg-surface border-t border-white/10 overflow-hidden transition-all duration-300 ease-out ${isOpen
          ? 'max-h-[500px] opacity-100'
          : 'max-h-0 opacity-0 border-t-0'
          }`}
      >
        <ul className="flex flex-col gap-4 px-4 py-4">
          {NAV.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block text-lg transition-colors ${isActive ? 'text-primary font-semibold' : 'hover:text-primary'
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
              className="block bg-primary text-background text-center py-3 rounded-full font-semibold"
            >
              Позвонить
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}