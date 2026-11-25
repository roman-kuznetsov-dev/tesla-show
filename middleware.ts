import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySession } from '@/lib/auth';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Защищаем все роуты /admin, кроме /admin/login
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const token = req.cookies.get('admin_session')?.value;
    
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }

    const session = await verifySession(token);
    if (!session) {
      // Токен невалидный или просрочен — удаляем куку и редирект
      const response = NextResponse.redirect(new URL('/admin/login', req.url));
      response.cookies.delete('admin_session');
      return response;
    }
  }

  return NextResponse.next();
}

// Применяем middleware только к /admin роутам
export const config = {
  matcher: ['/admin/:path*'],
};