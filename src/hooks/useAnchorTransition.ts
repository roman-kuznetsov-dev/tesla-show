'use client';

import { useCallback } from 'react';
import { flushSync } from 'react-dom';

declare global {
  interface Document {
    startViewTransition?: (callback: () => void) => { finished: Promise<void> };
  }
}

export function useAnchorTransition() {
  return useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string, onClose?: () => void) => {
      if (!href.startsWith('#')) return;

      const targetId = href.slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();

      const performScroll = () => {
        // Если передана функция закрытия (например, для бургера) — закрываем меню синхронно
        if (onClose) {
          flushSync(() => {
            onClose();
          });
        }
        target.scrollIntoView({ behavior: 'instant' });
      };

      if (document.startViewTransition) {
        document.startViewTransition(performScroll);
      } else {
        // Fallback для браузеров без View Transitions
        if (onClose) onClose();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    },
    []
  );
}