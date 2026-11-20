import { test, expect } from '@playwright/test';

test('открытие модалки и отправка формы (квиз)', async ({ page }) => {
  // 1. Ставим размер окна Десктопа
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');

  // 2. Прокручиваем страницу вниз, чтобы плавающая кнопка появилась
  await page.evaluate(() => window.scrollBy(0, 800));
  await page.waitForTimeout(500); 

  // 3. Ищем кнопку и кликаем с force: true (игнорируя перекрывающие блоки)
  const orderButton = page.getByRole('button', { name: 'Заказать шоу' });
  await orderButton.click({ force: true });

  // 4. Ждем, пока модалка появится
  const modal = page.getByTestId('order-modal');
  await expect(modal).toBeVisible();

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

  // 8. Проверяем успех
  await expect(page.getByText('Заявка отправлена!')).toBeVisible();
});