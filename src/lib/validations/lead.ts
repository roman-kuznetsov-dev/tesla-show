import { z } from 'zod';

export const leadSchema = z.object({
  name: z
    .string()
    .min(2, 'Имя должно быть не короче 2 символов')
    .max(50, 'Имя слишком длинное')
    .regex(/^[а-яёА-ЯЁa-zA-Z\s-]+$/, 'Имя может содержать только буквы, пробелы и дефис'),
  phone: z
    .string()
    .min(10, 'Телефон должен содержать минимум 10 цифр')
    .max(18, 'Телефон слишком длинный'),
  date: z.string().optional().or(z.literal('')),
  eventType: z.string().optional().or(z.literal('')),
  message: z.string().max(500, 'Комментарий слишком длинный').optional().or(z.literal('')),
  idempotencyKey: z.string().min(10, 'Слишком короткий idempotencyKey').max(100),
});

export type LeadInput = z.infer<typeof leadSchema>;