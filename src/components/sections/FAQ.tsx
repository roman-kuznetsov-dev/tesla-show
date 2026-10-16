'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { faqItems } from '@/data/faq';

export default function FAQ() {
  const { ref, inView } = useInView<HTMLElement>();
  const [openIndex, setOpenIndex] = useState<number>(0); // первый открыт

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section
      id="faq"
      ref={ref}
      className={`relative py-20 md:py-32 overflow-hidden reveal ${
        inView ? 'reveal--visible' : ''
      }`}
    >
      {/* Подсветка — справа снизу */}
      <div
        className="pointer-events-none absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 relative">
        {/* Метка */}
        <p className="text-primary font-semibold tracking-widest text-sm uppercase text-center mb-4">
          FAQ
        </p>

        {/* Заголовок */}
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-center max-w-3xl mx-auto mb-12 md:mb-16">
          Частые <span className="text-primary">вопросы</span>
        </h2>

        {/* Аккордеон */}
        <div
          className={`max-w-3xl mx-auto space-y-4 reveal-stagger ${
            inView ? 'reveal--visible' : ''
          }`}
        >
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.question}
                className="bg-gradient-to-b from-surface to-[#1a1a2e] border border-white/5 rounded-2xl overflow-hidden transition-colors duration-300 hover:border-primary/20"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="font-heading font-bold text-base md:text-lg pr-4">
                    {item.question}
                  </span>
                  <span
                    className={`shrink-0 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-primary transition-transform duration-300 ${
                      isOpen ? 'rotate-45 border-primary/50' : ''
                    }`}
                    aria-hidden="true"
                  >
                    <Plus size={18} />
                  </span>
                </button>

                <div
                  id={`faq-answer-${index}`}
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen
                      ? 'grid-rows-[1fr] opacity-100'
                      : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 md:px-6 pb-5 md:pb-6 text-muted text-sm md:text-base leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}