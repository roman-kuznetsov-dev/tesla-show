'use client';

import { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';
import { useScrollThreshold } from '@/hooks/useScrollThreshold';
import { useABTest } from '@/hooks/useABTest';
import OrderModal from './OrderModal';

const CTA_TEXT = {
  A: 'Заказать шоу',
  B: 'Узнать стоимость',
};

export default function FloatingCTA() {
  const scrolledPastHero = useScrollThreshold(600);
  const [contactsInView, setContactsInView] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { variant, trackClick } = useABTest('cta_text');

  useEffect(() => {
    const contactSection = document.getElementById('contact');
    if (!contactSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => setContactsInView(entry.isIntersecting),
      { threshold: 0.3, rootMargin: '0px 0px -100px 0px' }
    );

    observer.observe(contactSection);
    return () => observer.disconnect();
  }, []);

  const visible = scrolledPastHero && !contactsInView;

  if (!variant) return null;

  const text = CTA_TEXT[variant];

  return (
    <>
      <button
        onClick={() => {
          trackClick();
          setIsModalOpen(true);
        }}
        aria-label={text}
        className={`fixed z-40 bottom-6 right-4 md:bottom-8 md:right-8 flex items-center justify-center md:gap-2 bg-primary text-background rounded-full font-semibold shadow-lg transition-all duration-300 hover:bg-primary/90 hover:scale-105 floating-cta w-14 h-14 md:w-auto md:h-auto md:px-6 md:py-4 ${
          visible
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <Zap size={22} fill="currentColor" aria-hidden="true" className="md:w-[18px] md:h-[18px]" />
        <span className="hidden md:inline">{text}</span>
      </button>

      <OrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}