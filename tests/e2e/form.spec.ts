import { test, expect } from '@playwright/test';

test('открытие модалки и отправка формы (квиз)', async ({ page }) => {
  await page.goto('/');

  // 1. Открываем модалку (кликаем на кнопку "Заказать")
  // 👇 Убедись, что селектор правильный (может быть getByRole('button', { name: /заказать/i }) )
  await page.getByText('Заказать шоу', { exact: false }).first().click();

  // 2. Ждем, пока модалка появится
  const modal = page.getByTestId('order-modal');
  await expect(modal).toBeVisible();

  // 3. Проходим 5 шагов квиза (кликаем на первые варианты ответов)
  for (let i = 0; i < 5; i++) {
    // Ждем появления кнопок и кликаем на первую
    const firstOption = modal.locator('button').filter({ hasText: /./ }).first();
    // Небольшая пауза для анимации
    await page.waitForTimeout(400); 
    await firstOption.click();
  }

  // 4. На последнем шаге заполняем имя и телефон
  await page.waitForTimeout(400);
  await modal.getByPlaceholder('Ваше имя').fill('Тест');
  await modal.getByPlaceholder('Ваш телефон').fill('+79991234567');
  
  // 5. Отправляем
  await modal.getByRole('button', { name: /Получить расчёт/i }).click();

  // 6. Проверяем успех
  await expect(page.getByText('Заявка отправлена!')).toBeVisible();
});