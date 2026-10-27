import { NextResponse } from 'next/server';
import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const ALLOWED_WIDTHS = [640, 828, 1080, 1200, 1920];
// В режиме разработки и standalone кэш лучше хранить в корне проекта
const CACHE_DIR = path.join(process.cwd(), 'data', 'cache', 'images');

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const src = searchParams.get('src');
  const w = Number(searchParams.get('w'));
  const q = Number(searchParams.get('q')) || 80;

  // Логируем, что приходит от Next.js
  console.log('IMAGE ROUTE REQUEST:', { src, w, q });

  if (!src) {
    return new NextResponse('Forbidden: No source', { status: 403 });
  }
  if (!ALLOWED_WIDTHS.includes(w)) {
    return new NextResponse(`Bad Request: Invalid width ${w}`, { status: 400 });
  }

  const safeSrcName = src.replace(/^\//, '').replace(/\//g, '_');
  const cacheFilename = `${safeSrcName}_w${w}_q${q}.webp`;
  const cachePath = path.join(CACHE_DIR, cacheFilename);

  try {
    const cached = await fs.readFile(cachePath);
    return new NextResponse(cached, {
      headers: {
        'Content-Type': 'image/webp',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch {
    // Кэша нет, продолжаем
  }

  try {
    // Убираем лишние слеши в начале пути, если они есть
    const cleanSrc = src.replace(/^\/+/, '');
    
    // В Next.js файлы из public лежат прямо в корне проекта (в standalone они копируются в корень)
    // Но в dev-режиме они в папке public. Попробуем найти их.
    const publicPath = path.join(process.cwd(), 'public', cleanSrc);
    
    let originalBuffer;
    try {
      originalBuffer = await fs.readFile(publicPath);
    } catch (e) {
      console.error('FILE NOT FOUND AT:', publicPath);
      throw new Error('File not found');
    }

    const optimizedBuffer = await sharp(originalBuffer, {
      limitInputPixels: 10000 * 10000,
    })
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: q })
      .toBuffer();

    await fs.mkdir(CACHE_DIR, { recursive: true });
    await fs.writeFile(cachePath, optimizedBuffer);

    return new NextResponse(optimizedBuffer, {
      headers: {
        'Content-Type': 'image/webp',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error: any) {
    console.error('IMAGE OPTIMIZATION ERROR:', error.message);
    return new NextResponse('Internal Server Error: ' + error.message, { status: 500 });
  }
}