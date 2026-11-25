import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createSession } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Укажите email и пароль' }, { status: 400 });
    }

    const admin = await prisma.adminUser.findUnique({ where: { email } });

    if (!admin) {
      return NextResponse.json({ error: 'Неверный email или пароль' }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, admin.passwordHash);
    if (!isValid) {
      return NextResponse.json({ error: 'Неверный email или пароль' }, { status: 401 });
    }

    const token = await createSession({ sub: admin.id, email: admin.email });

    const response = NextResponse.json({ ok: true });
    
    response.cookies.set({
      name: 'admin_session',
      value: token,
      httpOnly: true, // 👈 ЗАЩИТА ОТ XSS (JS не может украсть токен)
      secure: process.env.NODE_ENV === 'production', // 👈 true на проде (HTTPS), false локально
      sameSite: 'lax', // 👈 Защита от CSRF
      maxAge: 60 * 60 * 24 * 7, // 7 дней
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('[Admin Login] Ошибка:', error);
    return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 });
  }
}