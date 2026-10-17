'use client';

import { useEffect, useState } from 'react';

type Options = {
  /** Коэффициент: 0.3 = элемент двигается на 30% от scrollY */
  speed?: number;
  /** Минимальная ширина экрана для включения (px) */
  minWidth?: number;
};

export function useParallax({ speed = 0.3, minWidth = 1024 }: Options = {}) {
  const [offset, setOffset] = useState(0);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Проверяем, можно ли включить параллакс
    const checkConditions = () => {
      const isDesktop = window.matchMedia(`(min-width: ${minWidth}px)`).matches;
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setEnabled(isDesktop && !reducedMotion);
    };

    checkConditions();

    const mqlDesktop = window.matchMedia(`(min-width: ${minWidth}px)`);
    const mqlMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    mqlDesktop.addEventListener('change', checkConditions);
    mqlMotion.addEventListener('change', checkConditions);

    return () => {
      mqlDesktop.removeEventListener('change', checkConditions);
      mqlMotion.removeEventListener('change', checkConditions);
    };
  }, [minWidth]);

  useEffect(() => {
    if (!enabled) {
      setOffset(0);
      return;
    }

    let rafId: number;

    const updateOffset = () => {
      setOffset(window.scrollY * speed);
      rafId = 0;
    };

    const handleScroll = () => {
      if (rafId) return; // уже запланировано
      rafId = requestAnimationFrame(updateOffset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [enabled, speed]);

  return { offset, enabled };
}