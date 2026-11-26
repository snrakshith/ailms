import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import {
  siteContent,
  articleBySlug,
} from '../../apps/web/src/features/marketing/content/site-content.ts';
assert.equal(siteContent.pricing.plans.length, 2, 'Expected free and paid plans');
assert.equal(siteContent.pricing.plans[0].price, '₹0');
assert.ok(siteContent.paths.items.some((p) => p.type === 'Free'));
assert.ok(siteContent.faqs.length >= 6);
assert.ok(siteContent.articles.length >= 3);
const slugs = siteContent.articles.map((article) => article.slug);
assert.equal(new Set(slugs).size, slugs.length, 'Blog slugs must be unique');
for (const article of siteContent.articles) {
  assert.equal(articleBySlug(article.slug), article);
  assert.ok(article.sections.length >= 2, 'Blog must be a full article');
  for (const section of article.sections) assert.ok(section.paragraphs.length > 0);
  for (const source of article.sources ?? [])
    assert.ok(source.url.startsWith('https://'), 'Sources must be HTTPS');
}
for (const link of siteContent.nav)
  assert.ok(link.href.startsWith('/'), 'Navigation should remain local');
assert.ok(
  siteContent.pricing.footnote.includes('confirmed by the server'),
  'Marketing prices must not be authoritative',
);
const apiEnv = await readFile('apps/api/src/config/env.ts', 'utf8');
const defaultPaise = Number(apiEnv.match(/GENAI_PASS_PRICE_PAISE:[^\n]+default\((\d+)\)/)?.[1]);
const advertisedPaise = Number(siteContent.pricing.plans[1].price.replace(/[^0-9]/g, '')) * 100;
assert.equal(
  advertisedPaise,
  defaultPaise,
  'Public marketing reference price must equal backend default. Update both before launch.',
);
console.log(
  'PASS: public content, prices, navigation, unique article slugs and editorial structure',
);
