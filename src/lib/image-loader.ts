'use client';

type LoaderProps = {
  src: string;
  width: number;
  quality?: number;
};

export default function imageLoader({ src, width, quality }: LoaderProps): string {
  // Внешние ссылки (если будут) не трогаем
  if (src.startsWith('http')) {
    return src;
  }

  // Формируем URL к нашему API-роуту
  const params = new URLSearchParams({
    src,
    w: width.toString(),
  });

  if (quality) {
    params.set('q', quality.toString());
  }

  return `/api/image?${params.toString()}`;
}