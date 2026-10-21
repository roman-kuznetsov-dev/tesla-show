'use client';

import { Phone, MessageCircle, ArrowUpRight } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { contacts } from '@/data/contacts';
import  ContactForm from './ContactForm';

export default function Contacts() {
  const { ref, inView } = useInView<HTMLElement>();
  const leadsEnabled = process.env.NEXT_PUBLIC_ENABLE_LEADS === 'true';

  return (
    <section
      id="contact"
      ref={ref}
      className={`relative py-20 md:py-32 overflow-hidden reveal ${
        inView ? 'reveal--visible' : ''
      }`}
    >
      <div
        className="pointer-events-none absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-secondary/15 blur-[120px]"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 relative">
        <p className="text-primary font-semibold tracking-widest text-sm uppercase text-center mb-4">
          Контакты
        </p>

        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-center max-w-3xl mx-auto mb-12 md:mb-16">
          Свяжитесь <span className="text-primary">с нами</span>
        </h2>

        <div className={`grid grid-cols-1 gap-8 max-w-5xl mx-auto ${leadsEnabled ? 'lg:grid-cols-2' : 'max-w-2xl'}`}>
          {/* Левая колонка — форма (если включена) */}
          {leadsEnabled && (
            <div>
              <ContactForm />
            </div>
          )}

          {/* Правая колонка — контакты */}
          <div className={`space-y-6 reveal-stagger ${inView ? 'reveal--visible' : ''}`}>
            {/* Телефон */}
            <a
              href={contacts.phone.href}
              className="group relative block bg-gradient-to-b from-surface to-[#1a1a2e] border border-white/5 rounded-2xl p-8 md:p-10 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_40px_rgba(0,217,255,0.15)] hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center transition-colors duration-300 group-hover:bg-primary/20">
                  <Phone size={26} strokeWidth={1.75} aria-hidden="true" />
                </div>
                <ArrowUpRight
                  size={22}
                  className="text-muted transition-all duration-300 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1"
                  aria-hidden="true"
                />
              </div>
              <p className="text-muted text-sm uppercase tracking-widest mb-2">Позвонить</p>
              <p className="font-heading text-xl md:text-2xl font-bold">{contacts.phone.display}</p>
            </a>

            {/* ВКонтакте */}
            <a
              href={contacts.vk.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block bg-gradient-to-b from-surface to-[#1a1a2e] border border-white/5 rounded-2xl p-8 md:p-10 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_40px_rgba(0,217,255,0.15)] hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center transition-colors duration-300 group-hover:bg-primary/20">
                  <MessageCircle size={26} strokeWidth={1.75} aria-hidden="true" />
                </div>
                <ArrowUpRight
                  size={22}
                  className="text-muted transition-all duration-300 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1"
                  aria-hidden="true"
                />
              </div>
              <p className="text-muted text-sm uppercase tracking-widest mb-2">Написать</p>
              <p className="font-heading text-xl md:text-2xl font-bold">{contacts.vk.display}</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}