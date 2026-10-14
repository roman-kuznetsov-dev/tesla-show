import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
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
  title: 'Тесла шоу Без ПРОводов — электрическое шоу на праздник',
  description:
    'Захватывающее Тесла-шоу с молниями для свадеб, корпоративов и дней рождения. 500 000 вольт, музыка, свет и восторг гостей.',
  openGraph: {
    title: 'Тесла шоу Без ПРОводов',
    description: 'Электрическое шоу с молниями на ваш праздник',
    type: 'website',
    locale: 'ru_RU',
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
        {children}
      </body>
    </html>
  );
}