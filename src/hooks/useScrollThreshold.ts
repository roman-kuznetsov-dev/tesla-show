'use client';

import { useEffect, useState } from 'react';

/**
 * Возвращает true, когда scrollY >= threshold.
 * Слушает scroll через requestAnimationFrame для производительности.
 */
export function useScrollThreshold(threshold = 20) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let rafId: number;

    const updateScrolled = () => {
      setScrolled(window.scrollY >= threshold);
      rafId = 0;
    };

    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(updateScrolled);
    };

    // Проверяем сразу при монтировании (например, если страница открыта с якорем)
    updateScrolled();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [threshold]);

  return scrolled;
}