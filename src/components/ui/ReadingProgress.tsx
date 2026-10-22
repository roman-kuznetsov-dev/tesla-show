'use client';

import { useScrollProgress } from '@/hooks/useScrollProgress';

export default function ReadingProgress() {
  const progress = useScrollProgress();

  return (
    <div
      className="fixed top-16 left-0 right-0 z-40 h-[3px] bg-transparent"
      aria-hidden="true"
    >
      <div
        className="h-full bg-primary/60 transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}