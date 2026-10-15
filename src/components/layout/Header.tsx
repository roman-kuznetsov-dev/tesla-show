'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const NAV = [
  { href: '#about', label: 'О шоу' },
  { href: '#features', label: 'Что входит' },
  { href: '#gallery', label: 'Галерея' },
  { href: '#reviews', label: 'Отзывы' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Контакты' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
      <nav className="container mx-auto flex items-center h-16 px-4 gap-4">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src="/images/logo.png"
            alt="Тесла шоу Без ПРОводов"
            width={40}
            height={40}
            className="w-10 h-10 object-contain"
            priority
          />
          <span className="font-heading font-bold text-sm md:text-base leading-tight">
            Тесла шоу
            <br />
            <span className="text-primary">Без ПРОводов</span>
          </span>
        </Link>

        <ul className="hidden lg:flex gap-6 ml-auto items-center">
          {NAV.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="tel:+79990000000"
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
          <span className="block h-0.5 w-6 bg-text" />
          <span className="block h-0.5 w-6 bg-text" />
          <span className="block h-0.5 w-6 bg-text" />
        </button>
      </nav>

      {isOpen && (
        <div className="lg:hidden bg-surface border-t border-white/10 px-4 py-4">
          <ul className="flex flex-col gap-4">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-lg hover:text-primary"
                >
                  {item.label}
                </a>
              </li>
            ))}
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
      )}
    </header>
  );
}