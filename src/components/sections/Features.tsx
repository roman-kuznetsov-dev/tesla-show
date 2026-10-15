'use client';

import { useInView } from '@/hooks/useInView';
import { features } from '@/data/features';

export default function Features() {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section
      id="features"
      ref={ref}
      className={`relative py-20 md:py-32 reveal ${
        inView ? 'reveal--visible' : ''
      }`}
    >
      {/* Подсветка в углу — голубой градиент */}
      <div
        className="pointer-events-none absolute -top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 relative">
        {/* Метка */}
        <p className="text-primary font-semibold tracking-widest text-sm uppercase text-center mb-4">
          Что входит
        </p>

        {/* Заголовок */}
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-center max-w-3xl mx-auto mb-16">
          Мы не просто покажем опыты. Мы дадим вам{' '}
          <span className="text-primary">возможность</span>:
        </h2>

        {/* Карточки */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 reveal-stagger ${
            inView ? 'reveal--visible' : ''
          }`}
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative bg-gradient-to-b from-surface to-[#1a1a2e] border border-white/5 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-[0_0_40px_rgba(0,217,255,0.15)]"
              >
                {/* Иконка */}
                <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/20">
                  <Icon size={28} strokeWidth={1.75} aria-hidden="true" />
                </div>

                {/* Заголовок */}
                <h3 className="font-heading text-xl font-bold mb-3">
                  {feature.title}
                </h3>

                {/* Описание */}
                <p className="text-muted text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}