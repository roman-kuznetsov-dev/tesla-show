import { describe, it, expect } from 'vitest';
import imageLoader from '@/lib/image-loader';

describe('imageLoader', () => {
  it('возвращает URL нашего API для локальных картинок', () => {
    const result = imageLoader({ src: '/images/gallery/01.jpg', width: 640 });
    expect(result).toBe('/api/image?src=%2Fimages%2Fgallery%2F01.jpg&w=640');
  });

  it('добавляет параметр качества, если он передан', () => {
    const result = imageLoader({ src: '/images/gallery/01.jpg', width: 1080, quality: 80 });
    expect(result).toContain('q=80');
  });

  it('оставляет внешние ссылки без изменений', () => {
    const externalUrl = 'https://example.com/image.jpg';
    const result = imageLoader({ src: externalUrl, width: 640 });
    expect(result).toBe(externalUrl);
  });
});