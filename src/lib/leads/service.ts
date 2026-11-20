import { prisma } from '@/lib/prisma';
import { LeadInput } from '@/lib/validations/lead';

export async function createLead(data: LeadInput) {
  // 1. Проверка на идемпотентность
  const existingLead = await prisma.lead.findUnique({
    where: { idempotencyKey: data.idempotencyKey },
    include: {
      quizAnswers: true,
    },
  });

  if (existingLead) {
    return { lead: existingLead, isDuplicate: true };
  }

  // 2. Находим или создаем квиз (шаблон), чтобы привязать ответы
  const quiz = await prisma.quiz.upsert({
    where: { slug: 'main-quiz' },
    update: {},
    create: { slug: 'main-quiz', title: 'Основной квиз' },
  });

  // 3. Создаем заявку и ответы в транзакции
  const lead = await prisma.$transaction(async (tx) => {
    return tx.lead.create({
      data: {
        name: data.name,
        phone: data.phone,
        date: data.date || null,
        eventType: data.eventType || null,
        message: data.message || null,
        idempotencyKey: data.idempotencyKey,
        status: 'new',
        
        // Если пришли ответы квиза, создаем их
        quizAnswers: data.answers ? {
          create: data.answers.map(ans => ({
            quizId: quiz.id,
            questionId: ans.questionId,
            answer: ans.answer,
          }))
        } : undefined,
      },
      include: {
        quizAnswers: true // Возвращаем ответы для Telegram
      }
    });
  });

  return { lead, isDuplicate: false };
}