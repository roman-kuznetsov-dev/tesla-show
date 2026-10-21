'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

type FormState = {
  name: string;
  phone: string;
  date: string;
  eventType: string;
  message: string;
};

const INITIAL_STATE: FormState = {
  name: '',
  phone: '',
  date: '',
  eventType: '',
  message: '',
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};

    const nameTrimmed = form.name.trim();

    if (nameTrimmed.length < 2) {
      newErrors.name = 'Имя должно быть не короче 2 символов';
    } else if (!/^[а-яёА-ЯЁa-zA-Z\s-]+$/.test(nameTrimmed)) {
      newErrors.name = 'Имя может содержать только буквы, пробелы и дефис';
    }

    const phoneDigits = form.phone.replace(/\D/g, '');

    if (phoneDigits.length < 10) {
      newErrors.phone = 'Телефон должен содержать минимум 10 цифр';
    } else if (phoneDigits.length > 15) {
      newErrors.phone = 'Телефон слишком длинный (максимум 15 цифр)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!validate()) return;

    setStatus('loading');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ошибка отправки');
      }

      setStatus('success');
      setForm(INITIAL_STATE);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Что-то пошло не так');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-gradient-to-b from-surface to-[#1a1a2e] border border-primary/30 rounded-2xl p-8 md:p-12 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_40px_rgba(0,217,255,0.15)]">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
          <span className="text-3xl">✅</span>
        </div>
        <h3 className="font-heading text-2xl font-bold mb-3">Спасибо за заявку!</h3>
        <p className="text-muted mb-6">Мы свяжемся с вами в ближайшее время.</p>
        <button
          onClick={() => setStatus('idle')}
          className="text-primary hover:text-primary/80 transition-colors text-sm"
        >
          Отправить ещё одну заявку
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-b from-surface to-[#1a1a2e] border border-white/5 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_0_40px_rgba(0,217,255,0.1)]"
    >
      <div className="space-y-5">
        {/* Имя */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Имя <span className="text-primary">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className={`w-full bg-background/50 border rounded-xl px-4 py-3 text-text placeholder:text-muted/50 focus:outline-none focus:border-primary/50 transition-colors ${
              errors.name ? 'border-red-500/50' : 'border-white/10'
            }`}
            placeholder="Как вас зовут"
            disabled={status === 'loading'}
          />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Телефон */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
            Телефон <span className="text-primary">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            maxLength={18}
            value={form.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className={`w-full bg-background/50 border rounded-xl px-4 py-3 text-text placeholder:text-muted/50 focus:outline-none focus:border-primary/50 transition-colors ${
              errors.phone ? 'border-red-500/50' : 'border-white/10'
            }`}
            placeholder="+7 999 000-00-00"
            disabled={status === 'loading'}
          />
          {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
        </div>

        {/* Дата */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium mb-2">
            Дата события
          </label>
          <input
            id="date"
            type="date"
            value={form.date}
            onChange={(e) => handleChange('date', e.target.value)}
            className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-text focus:outline-none focus:border-primary/50 transition-colors"
            disabled={status === 'loading'}
          />
        </div>

        {/* Тип события */}
        <div>
          <label htmlFor="eventType" className="block text-sm font-medium mb-2">
            Тип события
          </label>
          <select
            id="eventType"
            value={form.eventType}
            onChange={(e) => handleChange('eventType', e.target.value)}
            className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-text focus:outline-none focus:border-primary/50 transition-colors"
            disabled={status === 'loading'}
          >
            <option value="">Выберите</option>
            <option value="Свадьба">Свадьба</option>
            <option value="Корпоратив">Корпоратив</option>
            <option value="День рождения">День рождения</option>
            <option value="Другое">Другое</option>
          </select>
        </div>

        {/* Комментарий */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Комментарий
          </label>
          <textarea
            id="message"
            value={form.message}
            onChange={(e) => handleChange('message', e.target.value)}
            rows={3}
            className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-text placeholder:text-muted/50 focus:outline-none focus:border-primary/50 transition-colors resize-none"
            placeholder="Расскажите о вашем празднике"
            disabled={status === 'loading'}
          />
        </div>

        {/* Ошибка */}
        {status === 'error' && (
          <p className="text-red-400 text-sm text-center">{errorMessage}</p>
        )}

        {/* Кнопка */}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-primary text-background px-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(0,217,255,0.4)] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? (
            <>Отправляем...</>
          ) : (
            <>
              <Send size={18} aria-hidden="true" />
              Отправить заявку
            </>
          )}
        </button>
      </div>
    </form>
  );
}