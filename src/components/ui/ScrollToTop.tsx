'use client';

import { ArrowUp } from 'lucide-react';
import { useScrollThreshold } from '@/hooks/useScrollThreshold';

export default function ScrollToTop() {
  const visible = useScrollThreshold(600);

  const handleClick = () => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Наверх"
      className={`group fixed z-40 bottom-6 left-4 md:bottom-8 md:left-8 w-14 h-14 rounded-full bg-primary text-background flex items-center justify-center shadow-lg transition-all duration-300 hover:bg-primary/90 hover:scale-105 ${
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <ArrowUp
        size={22}
        className="transition-transform duration-300 group-hover:-translate-y-1"
        aria-hidden="true"
      />
    </button>
  );
}