'use client';

import { useEffect, useState } from 'react';

/**
 * Отслеживает, какая секция сейчас в зоне видимости.
 * Возвращает id активной секции.
 */
export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          } else {
            // Если секция вышла из зоны и была активной - сбрасываем
            setActiveSection((prev) => (prev === id ? '' : prev));
          }
        },
        {
          rootMargin: '-40% 0px -55% 0px', // секция считается активной, когда её центр в середине экрана
          threshold: 0,
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [sectionIds]);

  return activeSection;
}