import Link from 'next/link';
import { Zap } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
      {/* Подсветка */}
      <div
        className="pointer-events-none absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-secondary/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative container mx-auto px-4 text-center">
        {/* 404 */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="font-heading text-7xl md:text-9xl font-black text-primary">
            4
          </span>
          <Zap
            size={80}
            className="text-primary animate-pulse"
            fill="currentColor"
            aria-hidden="true"
          />
          <span className="font-heading text-7xl md:text-9xl font-black text-primary">
            4
          </span>
        </div>

        <h1 className="font-heading text-2xl md:text-4xl font-bold mb-4">
          Страница не найдена
        </h1>
        <p className="text-muted text-lg mb-10 max-w-md mx-auto">
          Похоже, эта страница ушла в другое измерение. Но шоу продолжается!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-primary text-background px-8 py-4 rounded-full font-semibold hover:bg-primary/90 transition-all hover:scale-105"
          >
            На главную
          </Link>
          <Link
            href="/#contact"
            className="border border-white/20 px-8 py-4 rounded-full font-semibold hover:bg-white/5 transition-all"
          >
            Связаться с нами
          </Link>
        </div>
      </div>
    </div>
  );
}