import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.fifa.com/fifaplus/en/home');
  const cookiePopup = page.locator('button[id="onetrust-accept-btn-handler"]');
  const popupClose = page.locator('div[class*="closeIcon"]');
  await page.waitForTimeout(5000);
  if (await cookiePopup.isVisible()) {
    await cookiePopup.click();
  }
  if (await popupClose.isVisible()) {
    await popupClose.click();
  }
});

test('Should see title on the homepage', async ({ page }) => {
  await expect(page).toHaveTitle(/.*FIFA/);
});

test('Should see menu hamburger', async ({ page }) => {
  const menu = page.locator('div[class*="global-menu-top-nav_burgerBtn"]');
  await expect(menu).toBeVisible();
});

// check for multiple elements - the anchor tags for nav top bar
test('Should see top nav bar and text', async ({ page }) => {
  const expectedLinks = [
    'TOURNAMENTS',
    'WATCH ON FIFA+',
    'PLAY',
    'LIVE',
    'SHOP',
    'INSIDE FIFA',
  ];
  const navLinks = page.locator(
    'div[class*="global-menu-top-nav_group__label"]'
  );

  await expect(navLinks.first()).toBeVisible();
  expect(await navLinks.allInnerTexts()).toEqual(expectedLinks);
});

test('Should navigate to news page after clicking on news link', async ({
  page,
}) => {
  const newsLink = page.locator(
    'a[href*="https://www.fifa.com/fifaplus/en/news"]'
  );
  await newsLink.click();
  await expect(page).toHaveURL(/.*news/);
  const headline = page.locator('h1[class*="gridTitle"]');
  await expect(headline.first()).toContainText('TOP STORIES');
});
