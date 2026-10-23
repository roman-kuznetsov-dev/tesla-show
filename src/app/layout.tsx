import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingCTA from '@/components/ui/FloatingCTA';
import ScrollToTop from '@/components/ui/ScrollToTop';
import ReadingProgress from '@/components/ui/ReadingProgress';
import YandexMetrika from '@/components/ui/YandexMetrika';
import './globals.css';
import '@fontsource/unbounded/400.css';
import '@fontsource/unbounded/700.css';
import '@fontsource/unbounded/900.css';

const manrope = Manrope({
  variable: '--font-body',
  subsets: ['cyrillic', 'latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'Тесла шоу Без ПРОводов — электрическое шоу на праздник',
  description: 'Захватывающее Тесла-шоу с молниями. Музыка, свет и восторг гостей.',
  openGraph: {
    title: 'Тесла шоу Без ПРОводов',
    description: 'Электрическое шоу с молниями на ваш праздник',
    type: 'website',
    locale: 'ru_RU',
    url: '/',
    siteName: 'Тесла шоу Без ПРОводов',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Тесла шоу Без ПРОводов',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Тесла шоу Без ПРОводов',
    description: 'Электрическое шоу с молниями на ваш праздник',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={` ${manrope.variable} antialiased`}>
        <Header />
        <ReadingProgress />
        <main className="pt-16">{children}</main>
        <Footer />
        <FloatingCTA />
        <ScrollToTop />
        {process.env.NEXT_PUBLIC_YM_ID && process.env.NODE_ENV !=='development' && (
          <YandexMetrika id={process.env.NEXT_PUBLIC_YM_ID} />
        )}
      </body>
    </html>
  );
}