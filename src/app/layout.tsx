import type { Metadata } from 'next';
import { Unbounded, Manrope } from 'next/font/google';
import './globals.css';

const unbounded = Unbounded({
  variable: '--font-heading',
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '700', '900'],
  display: 'swap',
});

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
      <body className={`${unbounded.variable} ${manrope.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}