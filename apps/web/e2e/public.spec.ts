import {test,expect} from '@playwright/test';

test.describe('Public site',()=>{
  test('home page and free-learning signup journey remain public',async({page})=>{
    await page.goto('/');
    await expect(page.getByText('Now learn to build with AI.')).toBeVisible();
    await page.getByRole('link',{name:/start learning for free/i}).first().click();
    await expect(page).toHaveURL(/\/register(?:\?|$)/);
    await expect(page.getByRole('heading',{name:'Become an AI builder'})).toBeVisible();
    await expect(page.getByLabel('Email address')).toBeVisible();
  });
  test('pricing information and FAQs are accessible without login',async({page})=>{
    await page.goto('/pricing');
    await expect(page.getByRole('heading',{name:/Start free\. Go deeper/i})).toBeVisible();
    await expect(page.getByText('₹499')).toBeVisible();
    await page.goto('/faq');
    await page.getByText('Do I need to know Python before I start?').click();
    await expect(page.getByText(/AI Foundations starts/)).toBeVisible();
  });
  test('journal articles render as public content',async({page})=>{
    await page.goto('/blog');
    await page.getByRole('link',{name:/Why software developers should learn AI/}).first().click();
    await expect(page.getByText('Practice beats memorization')).toBeVisible();
  });
});
