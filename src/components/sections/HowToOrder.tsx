'use client';

import { useInView } from '@/hooks/useInView';
import { stepsDev, stepsProd } from '@/data/steps';

export default function HowToOrder() {
  const { ref, inView } = useInView<HTMLElement>();
  const leadsEnabled = process.env.NEXT_PUBLIC_ENABLE_LEADS === 'true';
  const steps = leadsEnabled ? stepsDev : stepsProd;

  return (
    <section
      ref={ref}
      className={`relative py-20 md:py-32 overflow-hidden reveal ${
        inView ? 'reveal--visible' : ''
      }`}
    >
      {/* Подсветка — слева сверху */}
      <div
        className="pointer-events-none absolute -top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-secondary/15 blur-[120px]"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 relative">
        {/* Метка */}
        <p className="text-primary font-semibold tracking-widest text-sm uppercase text-center mb-4">
          Как заказать
        </p>

        {/* Заголовок */}
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-center max-w-3xl mx-auto mb-12 md:mb-16">
          Как мы <span className="text-primary">работаем</span>
        </h2>

        {/* Шаги */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 reveal-stagger ${
            inView ? 'reveal--visible' : ''
          }`}
        >
          {steps.map((step) => (
            <div
              key={step.number}
              className="group relative bg-gradient-to-b from-surface to-[#1a1a2e] border border-white/5 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_40px_rgba(0,217,255,0.1)]"
            >
              {/* Номер */}
              <div className="font-heading font-black text-5xl md:text-6xl text-primary/30 mb-6 transition-all duration-300 group-hover:text-primary group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_rgba(0,217,255,0.5)]">
                {step.number}
              </div>

              {/* Заголовок */}
              <h3 className="font-heading text-lg md:text-xl font-bold mb-3">
                {step.title}
              </h3>

              {/* Описание */}
              <p className="text-muted text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}