import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendTelegramMessage } from '@/lib/telegram';

type LeadBody = {
  name: string;
  phone: string;
  date?: string;
  eventType?: string;
  message?: string;
};

export async function POST(req: Request) {
  // Проверяем, включён ли функционал (флаг из .env)
  if (process.env.NEXT_PUBLIC_ENABLE_LEADS !== 'true') {
    return NextResponse.json(
      { error: 'Функционал заявок временно недоступен' },
      { status: 503 }
    );
  }

  try {
    const body: LeadBody = await req.json();

    // Валидация
    if (!body.name || body.name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Имя должно быть не короче 2 символов' },
        { status: 400 }
      );
    }

    if (!body.phone || body.phone.trim().length < 10) {
      return NextResponse.json(
        { error: 'Телефон должен быть не короче 10 символов' },
        { status: 400 }
      );
    }

    // Сохраняем в БД
    const lead = await prisma.lead.create({
      data: {
        name: body.name.trim(),
        phone: body.phone.trim(),
        date: body.date || null,
        eventType: body.eventType || null,
        message: body.message || null,
      },
    });

    // Отправляем в Telegram
    const telegramText = `
<b>🎉 Новая заявка на Тесла-шоу!</b>

<b>Имя:</b> ${lead.name}
<b>Телефон:</b> ${lead.phone}
${lead.date ? `<b>Дата:</b> ${lead.date}\n` : ''}${lead.eventType ? `<b>Тип события:</b> ${lead.eventType}\n` : ''}${lead.message ? `<b>Комментарий:</b> ${lead.message}\n` : ''}
<b>ID заявки:</b> ${lead.id}
    `.trim();

    await sendTelegramMessage({ text: telegramText });

    return NextResponse.json({ ok: true, id: lead.id });
  } catch (error) {
    console.error('API /leads: ошибка', error);
    return NextResponse.json(
      { error: 'Что-то пошло не так. Попробуйте позже.' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  // Проверка пароля (работает всегда, даже если форма выключена)
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    return NextResponse.json(
      { error: 'ADMIN_PASSWORD не задан в .env' },
      { status: 500 }
    );
  }

  const authHeader = req.headers.get('authorization');
  const provided = authHeader?.replace('Bearer ', '').trim();

  if (provided !== expected) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  // Дальше — существующая логика
  if (process.env.NEXT_PUBLIC_ENABLE_LEADS !== 'true') {
    return NextResponse.json({ error: 'Функционал отключён' }, { status: 503 });
  }

  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ ok: true, count: leads.length, leads });
  } catch (error) {
    console.error('API /leads GET: ошибка', error);
    return NextResponse.json({ error: 'Ошибка чтения' }, { status: 500 });
  }
}