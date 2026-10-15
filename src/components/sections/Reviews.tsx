'use client';

import { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { reviews } from '@/data/reviews';

/** Цвета для аватаров — чередуются по кругу */
const AVATAR_COLORS = [
  'bg-primary/20 text-primary',
  'bg-secondary/20 text-secondary',
  'bg-accent/20 text-accent',
];

export default function Reviews() {
  const { ref, inView } = useInView<HTMLElement>();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
  });

  
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);


  return (
    <section
      id="reviews"
      ref={ref}
      className={`relative py-20 md:py-32 overflow-hidden reveal ${
        inView ? 'reveal--visible' : ''
      }`}
    >
      {/* Подсветка в углу */}
      <div
        className="pointer-events-none absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-secondary/15 blur-[120px]"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 relative">
        {/* Метка */}
        <p className="text-primary font-semibold tracking-widest text-sm uppercase text-center mb-4">
          Отзывы
        </p>

        {/* Заголовок */}
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-center max-w-3xl mx-auto mb-12 md:mb-16">
          Что о нас <span className="text-primary">говорят</span>
        </h2>

        {/* Слайдер */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {reviews.map((review, index) => {
                const avatarColor = AVATAR_COLORS[index % AVATAR_COLORS.length];
                const initial = review.name.charAt(0).toUpperCase();

                return (
                  <div
                    key={review.name}
                    className="shrink-0 w-[85%] sm:w-[70%] md:w-[45%] lg:w-[32%]"
                  >
                    <div className="h-full bg-gradient-to-b from-surface to-[#1a1a2e] border border-white/5 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_40px_rgba(0,217,255,0.1)]">
                      {/* Аватар + имя */}
                      <div className="flex items-center gap-4 mb-5">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center font-heading font-bold text-lg shrink-0 ${avatarColor}`}
                        >
                          {initial}
                        </div>
                        <div>
                          <p className="font-heading font-bold">{review.name}</p>
                          {/* Звёзды */}
                          <div className="flex gap-1 mt-1" aria-label={`Оценка: ${review.rating} из 5`}>
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className={
                                  i < review.rating
                                    ? 'fill-accent text-accent'
                                    : 'text-muted/30'
                                }
                                aria-hidden="true"
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Текст */}
                      <p className="text-muted text-sm leading-relaxed">
                        {review.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Кнопки навигации */}
          <div className="flex justify-center gap-3 mt-8">
            <button
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-muted hover:text-primary hover:border-primary/40 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Предыдущий отзыв"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={scrollNext}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-muted hover:text-primary hover:border-primary/40 transition-colors"
              aria-label="Следующий отзыв"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}