'use client';

import { useEffect, useState } from 'react';

declare global {
    interface Window {
        ym?: (id: number, action: string, ...args: unknown[]) => void;
    }
}

type Variant = 'A' | 'B';

/**
 * Простой A/B-тест: случайно выбирает вариант, сохраняет в localStorage.
 * Возвращает текущий вариант и функцию для трекинга клика.
 */
export function useABTest(testName: string, variants: Variant[] = ['A', 'B']) {
  const [variant, setVariant] = useState<Variant | null>(null);

  useEffect(() => {
    const storageKey = `ab_${testName}`;
    const stored = localStorage.getItem(storageKey) as Variant | null;

    if (stored && variants.includes(stored)) {
      setVariant(stored);
    } else {
      const random = variants[Math.floor(Math.random() * variants.length)];
      localStorage.setItem(storageKey, random);
      setVariant(random);
    }
  }, [testName, variants]);

  const trackClick = () => {
    if (!variant) return;
    // Отправляем событие в Яндекс.Метрику
    if (typeof window !== 'undefined' && window.ym) {
      window.ym(Number(process.env.NEXT_PUBLIC_YM_ID), 'reachGoal', `ab_${testName}_${variant}`);
    }
  };

  return { variant, trackClick };
}