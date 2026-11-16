import { prisma } from '@/lib/prisma';
import { LeadInput } from '@/lib/validations/lead';

export async function createLead(data: LeadInput) {
  // 1. Проверка на идемпотентность (защита от дублей)
  const existingLead = await prisma.lead.findUnique({
    where: { idempotencyKey: data.idempotencyKey },
  });

  if (existingLead) {
    // Если заявка с таким ключом уже есть — просто возвращаем её
    // (это защищает от двойного клика или повторной отправки)
    return { lead: existingLead, isDuplicate: true };
  }

  // 2. Создаем заявку в транзакции
  const lead = await prisma.lead.create({
    data: {
      name: data.name,
      phone: data.phone,
      date: data.date || null,
      eventType: data.eventType || null,
      message: data.message || null,
      idempotencyKey: data.idempotencyKey,
      status: 'new',
    },
  });

  return { lead, isDuplicate: false };
}