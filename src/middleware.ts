import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Выводим в терминал, чтобы точно знать, что middleware работает
  console.log('--- MIDDLEWARE START ---');
  console.log('Path:', pathname);
  console.log('Cookie:', req.cookies.get('admin_session')?.value ? 'YES' : 'NO');

  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const token = req.cookies.get('admin_session')?.value;
    
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};