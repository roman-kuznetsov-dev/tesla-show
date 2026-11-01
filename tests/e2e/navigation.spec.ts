import { test, expect } from '@playwright/test';

test('навигация по якорям: клик по «О шоу» скроллит к секции', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('navigation').getByRole('link', { name: 'О шоу' }).click();
  await expect(page.locator('#about')).toBeInViewport();
});

test('навигация по якорям: клик по «Отзывы» скроллит к секции', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('navigation').getByRole('link', { name: 'Отзывы' }).click();
  await expect(page.locator('#reviews')).toBeInViewport();
});

test('мобильное меню: открывается и закрывается по клику на фон', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');

  await page.getByRole('button', { name: /открыть меню/i }).click();
  
  const menu = page.getByTestId('mobile-menu');
  
  // Проверяем, что меню появилось (opacity = 1)
  await expect(menu).toHaveCSS('opacity', '1');

  // Вызываем клик напрямую через DOM
  await page.getByTestId('mobile-menu-overlay').dispatchEvent('click');

  // Ждем, пока opacity станет 0 (значит, меню закрывается)
  await expect(menu).toHaveCSS('opacity', '0');
});

test('контакты: телефон и ВК — кликабельные ссылки', async ({ page }) => {
  await page.goto('/#contact');
  
  const phoneLink = page.locator('a[href^="tel:"]').first();
  await expect(phoneLink).toBeVisible();
  await expect(phoneLink).toHaveAttribute('href', /^tel:\+7/);

  const vkLink = page.locator('a[href*="vk."]').first();
  await expect(vkLink).toBeVisible();
  await expect(vkLink).toHaveAttribute('href', /vk\./);
});