import { test, expect } from '@playwright/test';

test('отправка формы заявки', async ({ page }) => {
  // Мок API
  await page.route('**/api/leads', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ ok: true, id: 999 }),
    });
  });

  await page.goto('/#contact');

  const nameInput = page.getByLabel('Имя');
  await nameInput.waitFor({ state: 'visible' });

  await nameInput.fill('Тест');
  await page.getByLabel('Телефон').fill('+79991234567');

  await page.getByRole('button', { name: /отправить заявку/i }).click();

  // Проверяем success
  await expect(page.getByText('Спасибо за заявку!')).toBeVisible({ timeout: 15_000 });
});

test('валидация формы: пустое имя', async ({ page }) => {
  await page.goto('/#contact');
  await page.getByRole('button', { name: /отправить заявку/i }).click();
  await expect(page.getByText('Имя должно быть не короче 2 символов')).toBeVisible();
});