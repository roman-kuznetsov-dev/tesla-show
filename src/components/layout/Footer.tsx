import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-white/10 py-12 mt-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo.png"
                alt="Тесла шоу Без ПРОводов"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />
              <span className="font-heading font-bold text-sm leading-tight">
                Тесла шоу
                <br />
                <span className="text-primary">Без ПРОводов</span>
              </span>
            </Link>
            <p className="text-muted text-sm">
              Электрическое шоу, от которого захватывает дух!
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <a
                  href="tel:+79061744325"
                  className="hover:text-primary transition-colors"
                >
                  +7 906 174-43-25
                </a>
              </li>
              <li>
                <a
                  href="mailto:roman.kuznetsov2026@mail.ru"
                  className="hover:text-primary transition-colors"
                >
                  roman.kuznetsov2026@mail.ru
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Соцсети</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Telegram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  ВКонтакте
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-muted">
          © {new Date().getFullYear()} Тесла шоу Без ПРОводов. Все права защищены.
        </div>
      </div>
    </footer>
  );
}