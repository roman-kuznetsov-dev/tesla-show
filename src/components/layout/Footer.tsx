import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-white/10 py-12 mt-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Логотип и слоган */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12 shrink-0 drop-shadow-[0_0_15px_rgba(0,217,255,0.6)]">
                <Image
                  src="/images/logo.png"
                  alt="Тесла шоу Без ПРОводов"
                  fill
                  className="object-contain [mask-image:radial-gradient(circle,black_45%,transparent_70%)]"
                />
              </div>
              <span className="font-heading font-bold text-sm leading-tight flex flex-col">
                <span>Тесла шоу</span>
                <span className="text-primary tracking-wide">Без ПРОводов</span>
              </span>
            </Link>
            <p className="text-muted text-sm">
              Электрическое шоу, от которого захватывает дух!
            </p>
          </div>

          {/* Контакты */}
          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <a href="tel:+79061744325" className="hover:text-primary transition-colors">
                  +7 906 174-43-25
                </a>
              </li>
            </ul>
          </div>

          {/* Соцсети */}
          <div>
            <h4 className="font-semibold mb-4">Соцсети</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <a href="https://vk.ru/bez.provodov.show"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="hover:text-primary transition-colors">
                  ВКонтакте
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Копирайт */}
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-muted">
          © {new Date().getFullYear()} Тесла шоу Без ПРОводов
        </div>
      </div>
    </footer>
  );
}