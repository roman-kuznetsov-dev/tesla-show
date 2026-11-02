import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Features from '@/components/sections/Features';
import VideoGallery from '@/components/sections/VideoGallery';
import Reviews from '@/components/sections/Reviews';
import FAQ from '@/components/sections/FAQ';
import HowToOrder from '@/components/sections/HowToOrder';
import Contacts from '@/components/sections/Contacts';
import { JsonLd } from '@/components/ui/JsonLd';
import { faqItems } from '@/data/faq';

export default function Home() {
  // 1. Схема организации (LocalBusiness)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Тесла шоу Без ПРОВОДОВ",
    "url": "https://твой-домен.ru", // Заглушка
    "telephone": "+7 906 174-43-25",
    "description": "Электрическое Тесла-шоу для праздников.",
  };

  // 2. Схема услуги (Service)
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Тесла-шоу",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Тесла шоу Без ПРОВОДОВ"
    },
    "areaServed": "Россия",
    "serviceType": "Организация праздников"
  };

  // 3. Схема FAQ (вопрос-ответ)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />

      <Hero />
      <About />
      <Features />
      <VideoGallery />
      <Reviews />
      <FAQ />
      <HowToOrder />
      <Contacts />
    </>
  );
}