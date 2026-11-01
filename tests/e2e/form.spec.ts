import { test, expect } from '@playwright/test';

test('открытие модалки и отправка формы', async ({ page }) => {
  await page.route('**/api/leads', async (route) => {
    await route.fulfill({ 
      status: 200, 
      contentType: 'application/json', 
      body: JSON.stringify({ ok: true }) 
    });
  });

  await page.goto('/');
  await page.evaluate(() => window.scrollTo(0, 1000));
  
  await page.locator('button.floating-cta').click();

  const modal = page.getByTestId('order-modal');
  await expect(modal).toBeVisible();

  await modal.getByTestId('form-name').fill('Тест');
  await modal.getByTestId('form-phone').fill('+79991234567');
  await modal.getByTestId('submit-lead').click();

  await expect(modal.getByText('Спасибо за заявку!')).toBeVisible();
});

test('закрытие модалки по клику на фон', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => window.scrollTo(0, 1000));
  
  await page.locator('button.floating-cta').click();

  const modal = page.getByTestId('order-modal');
  await expect(modal).toBeVisible();

  // Вызываем клик напрямую через DOM
  await page.getByTestId('order-modal-overlay').dispatchEvent('click');

  // Модалка полностью удалится из DOM через 300мс (isRendered = false)
  await expect(modal).toHaveCount(0);
});