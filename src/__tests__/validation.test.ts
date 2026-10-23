import { describe, it, expect } from 'vitest';

function validateName(name: string): string | null {
  const trimmed = name.trim();
  if (trimmed.length < 2) {
    return 'Имя должно быть не короче 2 символов';
  }
  if (!/^[а-яёА-ЯЁa-zA-Z\s-]+$/.test(trimmed)) {
    return 'Имя может содержать только буквы, пробелы и дефис';
  }
  return null;
}

function validatePhone(phone: string): string | null {
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 10) {
    return 'Телефон должен содержать минимум 10 цифр';
  }
  if (digits.length > 15) {
    return 'Телефон слишком длинный (максимум 15 цифр)';
  }
  return null;
}

describe('validateName', () => {
  it('принимает корректное имя', () => {
    expect(validateName('Роман')).toBeNull();
    expect(validateName('Иван Петров')).toBeNull();
    expect(validateName('Анна-Мария')).toBeNull();
  });

  it('отклоняет короткое имя', () => {
    expect(validateName('А')).toBe('Имя должно быть не короче 2 символов');
    expect(validateName('')).toBe('Имя должно быть не короче 2 символов');
  });

  it('отклоняет имя с цифрами', () => {
    expect(validateName('Роман123')).toBe('Имя может содержать только буквы, пробелы и дефис');
  });

  it('отклоняет имя с символами', () => {
    expect(validateName('Роман@')).toBe('Имя может содержать только буквы, пробелы и дефис');
  });
});

describe('validatePhone', () => {
  it('принимает корректный телефон', () => {
    expect(validatePhone('+79991234567')).toBeNull();
    expect(validatePhone('8 999 123-45-67')).toBeNull();
  });

  it('отклоняет короткий телефон', () => {
    expect(validatePhone('+7999123')).toBe('Телефон должен содержать минимум 10 цифр');
  });

  it('отклоняет длинный телефон', () => {
    expect(validatePhone('+7999123456789012345')).toBe('Телефон слишком длинный (максимум 15 цифр)');
  });
});