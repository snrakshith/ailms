import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { siteContent } from '../../apps/web/src/features/marketing/content/site-content.ts';
const root = resolve(fileURLToPath(new URL('../..', import.meta.url)));
const dist = join(root, 'apps/web/dist');
const urlRaw = process.env.PUBLIC_SITE_URL || 'http://localhost:5173';
const siteUrl = new URL(urlRaw).origin;
if (
  process.env.SEO_REQUIRE_SITE_URL === '1' &&
  (!process.env.PUBLIC_SITE_URL || new URL(process.env.PUBLIC_SITE_URL).hostname === 'localhost')
)
  throw new Error(
    'PUBLIC_SITE_URL is required and must be a public domain for a production SEO build',
  );
if (!process.env.PUBLIC_SITE_URL)
  console.warn(
    'SEO: PUBLIC_SITE_URL not set. Using localhost for a development-only sitemap; replace for production.',
  );
const clean = (x) =>
  String(x).replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  );
const xml = (x) => clean(x);
const absolute = (path) => new URL(path, siteUrl).href;
const articlePaths = siteContent.articles.map((a) => `/blog/${a.slug}`);
const routes = ['/', '/pricing', '/faq', '/blog', ...articlePaths];
const base = await readFile(join(dist, 'index.html'), 'utf8');
const entity = (type, props) =>
  JSON.stringify({ '@context': 'https://schema.org', '@type': type, ...props }).replace(
    /</g,
    '\\u003c',
  );
const desc = {
  '/': [siteContent.hero.title + ' ' + siteContent.hero.accent, siteContent.hero.description],
  '/pricing': [siteContent.pricing.title, siteContent.pricing.description],
  '/faq': ['Frequently asked questions', siteContent.faqs[0].answer],
  '/blog': [siteContent.journal.title, siteContent.journal.description],
};
function content(path) {
  if (path === '/')
    return `<main><header><h1>${clean(siteContent.hero.title)} ${clean(siteContent.hero.accent)}</h1><p>${clean(siteContent.hero.description)}</p></header><section><h2>${clean(siteContent.steps.title)}</h2>${siteContent.steps.items.map((i) => `<article><h3>${clean(i.title)}</h3><p>${clean(i.description)}</p></article>`).join('')}</section><section><h2>${clean(siteContent.paths.title)}</h2>${siteContent.paths.items.map((i) => `<article><h3>${clean(i.title)}</h3><p>${clean(i.description)}</p></article>`).join('')}</section><a href="/register">Start for free</a></main>`;
  if (path === '/pricing')
    return `<main><h1>${clean(siteContent.pricing.title)}</h1><p>${clean(siteContent.pricing.description)}</p>${siteContent.pricing.plans.map((i) => `<section><h2>${clean(i.name)} — ${clean(i.price)}</h2><p>${clean(i.description)}</p><ul>${i.features.map((f) => `<li>${clean(f)}</li>`).join('')}</ul></section>`).join('')}</main>`;
  if (path === '/faq')
    return `<main><h1>Frequently asked questions</h1>${siteContent.faqs.map((i) => `<section><h2>${clean(i.question)}</h2><p>${clean(i.answer)}</p></section>`).join('')}</main>`;
  if (path === '/blog')
    return `<main><h1>${clean(siteContent.journal.title)}</h1><p>${clean(siteContent.journal.description)}</p>${siteContent.articles.map((a) => `<article><h2><a href="/blog/${clean(a.slug)}">${clean(a.title)}</a></h2><p>${clean(a.description)}</p></article>`).join('')}</main>`;
  const article = siteContent.articles.find((a) => path === `/blog/${a.slug}`);
  if (!article) throw new Error(`Unknown route: ${path}`);
  return `<main><article><h1>${clean(article.title)}</h1><p>${clean(article.description)}</p><p>${clean(article.published)} · ${clean(article.author)}</p>${article.sections.map((s) => `<section><h2>${clean(s.heading)}</h2>${s.paragraphs.map((x) => `<p>${clean(x)}</p>`).join('')}</section>`).join('')}<a href="/blog">More articles</a></article></main>`;
}
for (const path of routes) {
  const article = siteContent.articles.find((a) => path === `/blog/${a.slug}`);
  const [title, description] = article ? [article.title, article.description] : desc[path];
  const canonical = absolute(path);
  const structured = article
    ? entity('BlogPosting', {
        headline: article.title,
        description: article.description,
        datePublished: article.published,
        author: { '@type': 'Organization', name: article.author },
        mainEntityOfPage: canonical,
      })
    : path === '/faq'
      ? entity('FAQPage', {
          mainEntity: siteContent.faqs.map((i) => ({
            '@type': 'Question',
            name: i.question,
            acceptedAnswer: { '@type': 'Answer', text: i.answer },
          })),
        })
      : entity('WebPage', {
          name: title,
          description,
          url: canonical,
          isPartOf: { '@type': 'WebSite', name: 'AI Quest', url: siteUrl },
        });
  const head = `<title>${clean(title)} · AI Quest</title><meta name="description" content="${clean(description)}"><link rel="canonical" href="${clean(canonical)}"><meta name="robots" content="index,follow"><meta property="og:type" content="${article ? 'article' : 'website'}"><meta property="og:title" content="${clean(title)}"><meta property="og:description" content="${clean(description)}"><meta property="og:url" content="${clean(canonical)}"><meta name="twitter:card" content="summary"><script type="application/ld+json">${structured}</script>`;
  // Replace the original default metadata rather than produce conflicting canonical/descriptions.
  const html = base
    .replace(/<title>[^<]*<\/title>/, '')
    .replace(/<meta name="description"[^>]*>/, '')
    .replace(/<meta name="robots"[^>]*>/, '')
    .replace(/<meta property="og:title"[^>]*>/, '')
    .replace(/<meta property="og:description"[^>]*>/, '')
    .replace('</head>', `${head}</head>`)
    .replace('<div id="root"></div>', `<div id="root">${content(path)}</div>`);
  const directory = join(dist, path === '/' ? '' : path.slice(1));
  await mkdir(directory, { recursive: true });
  await writeFile(join(directory, 'index.html'), html);
}
const robots = `User-agent: *
Allow: /
Disallow: /app
Disallow: /learn/
Disallow: /onboarding
Disallow: /settings
Disallow: /billing
Disallow: /referrals
Disallow: /portfolio
Disallow: /review
Disallow: /login
Disallow: /register
Sitemap: ${absolute('/sitemap.xml')}
`;
await writeFile(join(dist, 'robots.txt'), robots);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((path) => `<url><loc>${xml(absolute(path))}</loc>${path.startsWith('/blog/') ? `<lastmod>${siteContent.articles.find((a) => path.endsWith(a.slug)).published}</lastmod>` : ''}</url>`).join('\n')}
</urlset>`;
await writeFile(join(dist, 'sitemap.xml'), sitemap);
const llms = [
  '# AI Quest',
  '> From developer to AI builder. Interactive AI, machine learning and generative AI learning paths.',
  '',
  '## Learning',
  ['AI Foundations', 'Machine Learning', 'Generative AI'].join(' · '),
  '',
  '## Resources',
  `- [Homepage](${absolute('/')})`,
  `- [Pricing](${absolute('/pricing')})`,
  `- [FAQs](${absolute('/faq')})`,
  `- [Blog](${absolute('/blog')})`,
  ...siteContent.articles.map((a) => `- [${a.title}](${absolute(`/blog/${a.slug}`)})`),
];
await writeFile(join(dist, 'llms.txt'), llms.join('\n') + '\n');
await writeFile(
  join(dist, 'llms-full.txt'),
  [
    ...llms,
    '',
    '## Frequently asked questions',
    ...siteContent.faqs.map((f) => `### ${f.question}\n${f.answer}`),
    '',
    '## Articles',
    ...siteContent.articles.flatMap((a) => [
      `# ${a.title}`,
      a.description,
      ...a.sections.flatMap((s) => [`## ${s.heading}`, ...s.paragraphs]),
    ]),
  ].join('\n\n'),
);
console.log(
  `SEO: generated ${routes.length} prerendered pages, robots.txt, sitemap.xml and llms files for ${siteUrl}`,
);
