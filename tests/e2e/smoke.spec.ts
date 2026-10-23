import { test, expect } from '@playwright/test';

test('главная страница открывается и содержит заголовок', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Тесла шоу');
  await expect(page.getByRole('main').getByRole('link', { name: 'Галерея' })).toBeVisible();
});

test('секция контактов доступна', async ({ page }) => {
  await page.goto('/#contact');
  await expect(page.getByRole('heading', { name: /свяжитесь с нами/i })).toBeVisible();
});

test('404 страница работает', async ({ page }) => {
  await page.goto('/несуществующая-страница');
  await expect(page.getByRole('heading', { name: /страница не найдена/i })).toBeVisible();
});