import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Защищаем только /admin (кроме /admin/login)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const token = req.cookies.get('admin_session')?.value;
    
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }

    try {
      // 👈 Проверяем подпись токена!
      const secret = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET);
      await jwtVerify(token, secret);
    } catch {
      // Если токен подделан или просрочен — удаляем куку и на логин
      const response = NextResponse.redirect(new URL('/admin/login', req.url));
      response.cookies.delete('admin_session');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};