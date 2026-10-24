'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    ym?: (id: number, action: string, ...args: unknown[]) => void;
  }
}

type Props = {
  id: string;
};

export default function YandexMetrika({ id }: Props) {
  useEffect(() => {
    // Инициализация Метрики
    const initYm = () => {
      const w = window as unknown as Record<string, unknown>;
      const ymQueue = function (...args: unknown[]) {
        (ymQueue as unknown as { a: unknown[] }).a =
          (ymQueue as unknown as { a: unknown[] }).a || [];
        (ymQueue as unknown as { a: unknown[] }).a.push(args);
      };
      (ymQueue as unknown as { l: number }).l = Date.now();
      w.ym = w.ym || ymQueue;

      const scriptSrc = 'https://mc.yandex.ru/metrika/tag.js';
      const exists = Array.from(document.scripts).some(
        (s) => s.src === scriptSrc
      );
      if (!exists) {
        const script = document.createElement('script');
        script.async = true;
        script.src = scriptSrc;
        document.head.appendChild(script);
      }

      window.ym?.(Number(id), 'init', {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
      });
    };

    initYm();
  }, [id]);

  return (
    <noscript>
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://mc.yandex.ru/watch/${id}`}
          style={{ position: 'absolute', left: '-9999px' }}
          alt=""
        />
      </div>
    </noscript>
  );
}