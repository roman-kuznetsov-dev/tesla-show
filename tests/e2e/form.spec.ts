import { test, expect } from '@playwright/test';

test('открытие модалки и отправка формы (квиз)', async ({ page }) => {
  // 1. Десктопный размер окна
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');

  // 2. Скролл, чтобы появилась плавающая кнопка
  await page.evaluate(() => window.scrollTo(0, 800));
  await page.waitForTimeout(600);

  // 3. Клик по плавающей кнопке
  const orderButton = page.locator('button.floating-cta');
  await orderButton.waitFor({ state: 'visible' });
  await orderButton.click({ force: true });

  // 4. Ждем модалку
  const modal = page.getByTestId('order-modal');
  await expect(modal).toBeVisible({ timeout: 10000 });

  // 5. Проходим 5 шагов квиза.
  //    ВАЖНО: кликаем именно по кнопкам вариантов, а не по первой попавшейся (чтобы не попасть в крестик).
  //    Кнопки вариантов ответов имеют класс "w-full text-left p-4 ..."
  const optionButtons = modal.locator('button:has-text(""), button[class*="text-left"]');
  for (let i = 0; i < 5; i++) {
    // Ждем появления хотя бы одной кнопки с классом text-left (это варианты)
    await modal.locator('button[class*="text-left"]').first().waitFor({ state: 'visible', timeout: 5000 });
    await modal.locator('button[class*="text-left"]').first().click();
    await page.waitForTimeout(400);
  }

  // 6. Заполняем контакты
  await page.waitForTimeout(400);
  const nameInput = modal.getByPlaceholder('Ваше имя');
  const phoneInput = modal.getByPlaceholder('Ваш телефон');
  
  await nameInput.fill('Тест');
  await phoneInput.fill('+79991234567');

  // 7. Ждем, пока кнопка отправки станет активной, и кликаем
  const submitButton = modal.getByRole('button', { name: /Получить расчёт/i });
  await expect(submitButton).toBeEnabled({ timeout: 5000 });
  await submitButton.click();

  // 8. Ловим ответ API через network
  const apiResponse = await page.waitForResponse(
    (response) => response.url().includes('/api/leads') && response.request().method() === 'POST',
    { timeout: 15000 }
  );

  // Если сервер вернул ошибку — сразу падаем с её текстом
  expect(apiResponse.status()).toBe(200);

  // 9. Проверяем успех
  await expect(page.getByText('Заявка отправлена!')).toBeVisible({ timeout: 10000 });
});