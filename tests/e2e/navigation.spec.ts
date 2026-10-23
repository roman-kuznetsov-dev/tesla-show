import { test, expect } from '@playwright/test';

test('навигация по якорям: клик по «О шоу» скроллит к секции', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('navigation').getByRole('link', { name: 'О шоу' }).click();

  const aboutSection = page.locator('#about');
  await expect(aboutSection).toBeInViewport();
});

test('навигация по якорям: клик по «Отзывы» скроллит к секции', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('navigation').getByRole('link', { name: 'Отзывы' }).click();

  const reviewsSection = page.locator('#reviews');
  await expect(reviewsSection).toBeInViewport();
});

test('мобильное меню: открывается и закрывается', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');

  const burger = page.getByRole('button', { name: /открыть меню/i });
  await expect(burger).toBeVisible();

  await burger.click();

  // Ссылки в мобильном меню — ищем только видимые
  const mobileLink = page.getByRole('link', { name: 'О шоу' }).filter({ visible: true });
  await expect(mobileLink).toBeVisible();
  await mobileLink.click();

  // Меню закрылось
  await expect(page.getByRole('button', { name: /открыть меню/i })).toBeVisible();
});

test('контакты: телефон и ВК — кликабельные ссылки', async ({ page }) => {
  await page.goto('/#contact');

  // Телефон — tel:
  const phoneLink = page.locator('a[href^="tel:"]').first();
  await expect(phoneLink).toBeVisible();
  await expect(phoneLink).toHaveAttribute('href', /^tel:\+7/);

  // ВК — vk.ru (или vk.com)
  const vkLink = page.locator('a[href*="vk."]').first();
  await expect(vkLink).toBeVisible();
  await expect(vkLink).toHaveAttribute('href', /vk\./);
});