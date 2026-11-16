import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendTelegramMessage } from '@/lib/telegram';
import { leadSchema } from '@/lib/validations/lead';
import { createLead } from '@/lib/leads/service';

export async function POST(req: Request) {
  // Проверяем флаг (в проде заявки могут быть отключены)
  if (process.env.NEXT_PUBLIC_ENABLE_LEADS !== 'true') {
    return NextResponse.json(
      { error: 'Функционал заявок временно недоступен' },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();

    // Валидация через Zod
    const parsed = leadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Ошибка валидации', details: parsed.error.format() },
        { status: 400 }
      );
    }

    // Создаем заявку через сервис
    const { lead, isDuplicate } = await createLead(parsed.data);

    // Если это дубль — не отправляем в Telegram повторно
    if (!isDuplicate) {
      const telegramText = `
<b>🎉 Новая заявка на Тесла-шоу!</b>

<b>Имя:</b> ${lead.name}
<b>Телефон:</b> ${lead.phone}
${lead.date ? `<b>Дата:</b> ${lead.date}\n` : ''}${lead.eventType ? `<b>Тип события:</b> ${lead.eventType}\n` : ''}${lead.message ? `<b>Комментарий:</b> ${lead.message}\n` : ''}
<b>ID заявки:</b> ${lead.id}
      `.trim();

      await sendTelegramMessage({ text: telegramText });
    }

    return NextResponse.json({
      ok: true,
      id: lead.id,
      isDuplicate,
    });
  } catch (error) {
    console.error('API /leads: ошибка', error);
    return NextResponse.json(
      { error: 'Что-то пошло не так. Попробуйте позже.' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return NextResponse.json({ error: 'ADMIN_PASSWORD не задан' }, { status: 500 });
  }

  const authHeader = req.headers.get('authorization');
  const url = new URL(req.url);
  const fromQuery = url.searchParams.get('password');
  const provided = authHeader?.replace('Bearer ', '').trim() || fromQuery;

  if (provided !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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