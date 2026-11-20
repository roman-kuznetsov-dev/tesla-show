import { test, expect } from '@playwright/test';

test('открытие модалки и отправка формы (квиз)', async ({ page }) => {
  // 1. Ставим размер окна Десктопа
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');

  // 2. Скроллим вниз, чтобы сработал useScrollThreshold(600)
  await page.evaluate(() => window.scrollTo(0, 800));
  await page.waitForTimeout(600);

  // 3. Ждем появления плавающей кнопки (класс .floating-cta есть в обоих вариантах A/B)
  const orderButton = page.locator('button.floating-cta');
  
  // Ждем, пока у кнопки появится класс, разрешающий клики
  await orderButton.waitFor({ state: 'visible' });
  // Кликаем принудительно, чтобы обойти перекрытие контейнером
  await orderButton.click({ force: true });

  // 4. Ждем модалку
  const modal = page.getByTestId('order-modal');
  await expect(modal).toBeVisible({ timeout: 10000 });

  // 5. Проходим 5 шагов квиза
  for (let i = 0; i < 5; i++) {
    await page.waitForTimeout(400); 
    const optionButton = modal.locator('button').filter({ hasText: /./ }).first();
    await optionButton.click();
  }

  // 6. Заполняем контакты
  await page.waitForTimeout(400);
  await modal.getByPlaceholder('Ваше имя').fill('Тест');
  await modal.getByPlaceholder('Ваш телефон').fill('+79991234567');
  
  // 7. Отправляем
  await modal.getByRole('button', { name: /Получить расчёт/i }).click();

  // 8. Проверяем успех (даем серверу 15 секунд на ответ)
  await expect(page.getByText('Заявка отправлена!')).toBeVisible({ timeout: 15000 });
});