import { test, expect } from '@playwright/test';

test.describe('Session and route protection', () => {
  test('guests are redirected and the intended route is preserved', async ({ page }) => {
    await page.goto('/app');
    await expect(page).toHaveURL(/\/login\?next=%2Fapp/);
    await expect(page.getByRole('heading', { name: 'Welcome back' })).toBeVisible();
  });
  test('login and registration switch without losing the destination', async ({ page }) => {
    await page.goto('/login?next=%2Fpaths');
    await page.getByRole('link', { name: 'Create a free account' }).click();
    await expect(page).toHaveURL(/\/register\?next=%2Fpaths/);
    await expect(page.getByRole('heading', { name: 'Become an AI builder' })).toBeVisible();
    await page.getByRole('link', { name: 'Sign in instead' }).click();
    await expect(page.getByRole('heading', { name: 'Welcome back' })).toBeVisible();
  });
  test('the API denies anonymous learning data and writes without CSRF', async ({ request }) => {
    const protectedResponse = await request.get('/api/v1/learning/paths');
    expect(protectedResponse.status()).toBe(401);
    const missingCsrf = await request.post('/api/v1/auth/login', {
      data: { email: 'anonymous@example.test', password: 'not-a-real-credential-2026' },
    });
    expect(missingCsrf.status()).toBe(403);
  });
  test('a misleading external return URL is not accepted', async ({ page }) => {
    await page.goto('/login?next=%2F%2Fevil.example');
    await expect(page.getByRole('heading', { name: 'Welcome back' })).toBeVisible();
    await page.getByRole('link', { name: 'Create a free account' }).click();
    await expect(page).toHaveURL(/\/register(?:\?|$)/);
    expect(new URL(page.url()).searchParams.get('next')).not.toBe('//evil.example');
  });
});
