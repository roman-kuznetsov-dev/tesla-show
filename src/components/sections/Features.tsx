'use client';

import Image from 'next/image';
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
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative bg-gradient-to-b from-surface to-[#1a1a2e] border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-[0_0_40px_rgba(0,217,255,0.15)]"
            >
              {/* Фото */}
              <div className="relative aspect-video overflow-hidden">
                {/* Размытый фон - та же картинка, заполняет контейнер */}
                <Image
                  src={feature.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                  aria-hidden="true"
                  className="object-cover blur-2xl scale-110 opacity-60"
                />
                {/* Чёткое фото - целиком, без обрезки */}
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"  
                  priority={index < 3}
                  className="object-contain transition-transform duration-700 group-hover:scale-105"
                />
                {/* Затемнение снизу для плавного перехода */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-transparent to-transparent" />
              </div>

              {/* Текст */}
              <div className="p-6 md:p-8">
                <h3 className="font-heading text-xl font-bold mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}