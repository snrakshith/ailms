import { test, expect } from '@playwright/test';

test('new developer can register, complete a lesson, and use learning tools', async ({ page }) => {
  const email = `playwright-${crypto.randomUUID()}@example.test`;
  await page.goto('/register');
  await page.getByLabel('Full name').fill('Playwright Learner');
  await page.getByLabel('Email address').fill(email);
  await page.getByLabel('Create password').fill('this-is-a-test-passphrase-2026');
  await page.getByRole('button', { name: 'Create free account' }).click();
  await expect(page.getByText('Build on the developer you already are')).toBeVisible();
  const startJourney = page.getByRole('button', { name: 'Explore my learning journey' });
  await expect(startJourney).toBeEnabled();
  await startJourney.click({ force: true });
  await expect(page.getByText('Ready to level up?')).toBeVisible();
  await page.getByRole('link', { name: 'AI Foundations' }).first().click();
  await page.getByRole('link', { name: 'Start learning' }).click();
  await expect(page.getByRole('heading', { name: 'From rules to learning' })).toBeVisible();
  // Stable identifiers survive deterministic per-learner option ordering.
  await page.locator('[data-question-id="q1"] [data-option-id="a"]').click();
  await page.locator('[data-question-id="q2"] [data-option-id="b"]').click();
  await page.locator('[data-question-id="q3"] [data-option-id="c"]').click();
  await page.getByRole('button', { name: 'Check answers' }).click();
  await expect(page.getByText('Nice work — lesson mastered!')).toBeVisible();
  await page.getByRole('link', { name: /Next lesson/ }).click();
  await expect(page.getByRole('heading', { name: 'Data is your new API' })).toBeVisible();
  await page.goto('/review');
  await expect(page.getByText('Spaced revision')).toBeVisible();
  await page.goto('/labs');
  await expect(page.getByText('Interactive AI labs')).toBeVisible();
  await page.getByRole('button', { name: 'Model metrics' }).click();
  await expect(page.getByText('Confusion matrix simulator')).toBeVisible();
  await page.goto('/portfolio');
  await expect(page.getByText('AI project portfolio')).toBeVisible();
  // Backend revokes the session; a browser refresh must not restore access.
  await page.getByRole('button', { name: 'Sign out' }).click();
  await expect(page).toHaveURL(/\/login(?:\?|$)/);
  await page.goto('/app');
  await expect(page).toHaveURL(/\/login\?next=/);
});
