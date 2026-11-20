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
      // Формируем красивый текст с ответами (если они есть)
      let answersText = '';
      if (lead.quizAnswers && lead.quizAnswers.length > 0) {
        answersText = '\n<b>Ответы квиза:</b>\n' + lead.quizAnswers
          .map((ans) => `• ${ans.questionId}: ${ans.answer}`)
          .join('\n');
      }

      const telegramText = `
<b>🎉 Новая заявка на Тесла-шоу!</b>

<b>Имя:</b> ${lead.name}
<b>Телефон:</b> ${lead.phone}
${lead.date ? `<b>Дата:</b> ${lead.date}\n` : ''}${lead.eventType ? `<b>Тип события:</b> ${lead.eventType}\n` : ''}${answersText}
<b>ID заявки:</b> ${lead.id}
      `.trim();

      // Отправляем в Telegram (не блокируя ответ клиенту)
      sendTelegramMessage({ text: telegramText }).catch((err) =>
        console.error('[API /leads] Ошибка Telegram:', err)
      );
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
      include: {
        quizAnswers: true, // 👈 Теперь подтягиваем ответы квиза
      },
    });
    return NextResponse.json({ ok: true, count: leads.length, leads });
  } catch (error) {
    console.error('API /leads GET: ошибка', error);
    return NextResponse.json({ error: 'Ошибка чтения' }, { status: 500 });
  }
}