// @ts-check
const { test, expect } = require('@playwright/test');

const SECTIONS = ['about', 'experience', 'skills', 'projects', 'education', 'research', 'contact'];

test.describe('homepage', () => {
  /** @type {string[]} */
  let consoleErrors;

  test.beforeEach(async ({ page }) => {
    consoleErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', (err) => consoleErrors.push(err.message));
  });

  test('responds with 200 and the correct title', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle('Fabrício Guidine : Sr. QA Engineer / SDET');
  });

  test('renders the primary navigation', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Primary' });
    await expect(nav).toBeVisible();
    for (const id of SECTIONS) {
      await expect(nav.locator(`a[href="#${id}"]`).first()).toHaveCount(1);
    }
  });

  test('renders every key section', async ({ page }) => {
    await page.goto('/');
    for (const id of SECTIONS) {
      await expect(page.locator(`section#${id}`)).toHaveCount(1);
    }
  });

  test('every in-page nav link resolves to an existing section', async ({ page }) => {
    await page.goto('/');
    const hrefs = await page
      .locator('nav.site-nav a[href^="#"]')
      .evaluateAll((els) => els.map((e) => e.getAttribute('href')));
    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs) {
      const id = String(href).slice(1);
      await expect(page.locator(`#${id}`)).toHaveCount(1);
    }
  });

  test('static assets load without 404s', async ({ page, request }) => {
    await page.goto('/');
    const urls = await page.evaluate(() => {
      const out = [];
      document.querySelectorAll('link[rel="stylesheet"][href], script[src], img[src]').forEach((el) => {
        const u = el.getAttribute('href') || el.getAttribute('src');
        if (u && !u.startsWith('http') && !u.startsWith('data:')) out.push(u);
      });
      return out;
    });
    expect(urls.length).toBeGreaterThan(0);
    for (const u of urls) {
      const res = await request.get(u.startsWith('/') ? u : `/${u}`);
      expect(res.status(), `${u} should resolve`).toBeLessThan(400);
    }
  });

  test('the CV PDF link resolves', async ({ page, request }) => {
    await page.goto('/');
    const href = await page.locator('a[href$=".pdf"]').first().getAttribute('href');
    expect(href).toBeTruthy();
    const res = await request.get(String(href));
    expect(res.status()).toBeLessThan(400);
  });

  test('logs no console or page errors', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    expect(consoleErrors).toEqual([]);
  });
});
