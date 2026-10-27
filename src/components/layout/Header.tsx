'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useScrollThreshold } from '@/hooks/useScrollThreshold';
import { useActiveSection } from '@/hooks/useActiveSection';
import MobileMenu from './MobileMenu';
import { useAnchorTransition } from '@/hooks/useAnchorTransition';

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
  const handleAnchorClick = useAnchorTransition();

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
      className={`fixed top-0 left-0 right-0 z-[150] transition-all duration-300 ${scrolled || isOpen
        ? 'bg-background/95 backdrop-blur-md shadow-lg'
        : 'bg-gradient-to-b from-background/80 to-transparent'
        }`}
    >
      <nav className="container mx-auto flex items-center h-16 px-4 gap-4 relative z-50">
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
                  onClick={(e) => handleAnchorClick(e, item.href)}
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
          className="lg:hidden ml-auto relative z-10 flex flex-col justify-center items-center w-10 h-10 gap-[6px]"
          aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={isOpen}
        >
          <span
            className={`block h-[2px] w-5 bg-text transition-transform duration-300 ${isOpen ? 'translate-y-[8px] rotate-45' : ''
              }`}
          />
          <span
            className={`block h-[2px] w-5 bg-text transition-transform duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'
              }`}
          />
          <span
            className={`block h-[2px] w-5 bg-text transition-transform duration-300 ${isOpen ? '-translate-y-[8px] -rotate-45' : ''
              }`}
          />
        </button>
      </nav>

      <MobileMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        nav={NAV}
        activeSection={activeSection}
      />          
      
    </header>
  );
}