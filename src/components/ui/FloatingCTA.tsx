'use client';

import { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';
import { useScrollThreshold } from '@/hooks/useScrollThreshold';

export default function FloatingCTA() {
  const scrolledPastHero = useScrollThreshold(600); // после Hero (~600px)
  const [contactsInView, setContactsInView] = useState(false);

  // Следим за секцией #contact
  useEffect(() => {
    const contactSection = document.getElementById('contact');
    if (!contactSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setContactsInView(entry.isIntersecting);
      },
      { threshold: 0.3, rootMargin: '0px 0px -100px 0px' }
    );

    observer.observe(contactSection);
    return () => observer.disconnect();
  }, []);

  const visible = scrolledPastHero && !contactsInView;

  return (
    <a
      href="#contact"
      aria-label="Заказать шоу"
      className={`fixed z-40 bottom-6 right-4 md:bottom-8 md:right-8 flex items-center justify-center md:gap-2 bg-primary text-background rounded-full font-semibold shadow-lg transition-all duration-300 hover:bg-primary/90 hover:scale-105 floating-cta w-14 h-14 md:w-auto md:px-6 md:py-4 ${
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <Zap size={22} fill="currentColor" aria-hidden="true" className="md:w-[18px] md:h-[18px]" />
      <span className="hidden md:inline">Заказать шоу</span>
    </a>
  );
}