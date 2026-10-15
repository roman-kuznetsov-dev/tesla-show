'use client';

import { useInView } from '@/hooks/useInView';

const ITEMS = [
  'Вспышки молний перед Вами',
  'Не оставляющая равнодушными музыка',
  'Яркие огни ламп, которые загораются силой мысли',
];

export default function About() {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section
      id="about"
      ref={ref}
      className={`relative py-20 md:py-32 overflow-hidden reveal ${
        inView ? 'reveal--visible' : ''
      }`}
    >
      {/* Подсветка в углу — фиолетовый градиент */}
      <div
        className="pointer-events-none absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-secondary/20 blur-[120px]"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* Метка */}
          <p className="text-primary font-semibold tracking-widest text-sm uppercase mb-4">
            О программе
          </p>

          {/* Заголовок */}
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-12">
            Это не просто шоу — это{' '}
            <span className="text-primary">живой диалог с электричеством</span>
          </h2>

          {/* Список — поочерёдное появление */}
          <ul
            className={`space-y-6 text-lg md:text-2xl text-left md:text-center reveal-stagger ${
              inView ? 'reveal--visible' : ''
            }`}
          >
            {ITEMS.map((item) => (
              <li key={item} className="flex items-center gap-4 md:justify-center">
                <span className="text-2xl md:text-3xl shrink-0" aria-hidden="true">
                  ⚡
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}