# Public discovery, SEO and service health

The public React marketing site remains maintained from **one** source: `apps/web/src/features/marketing/content/site-content.ts`. This drives page text, article content, FAQ entries, pricing text and the dismissible alert banner. The Node post-build script reads that same TS file and creates public-route HTML with readable text in the initial HTML (not solely in client JavaScript), correct canonical metadata, structured data and sitemap entries. Private routes are not included in the sitemap and default to a runtime `noindex` policy. React replaces the static HTML when the client app loads.

## Publishing

1. Configure `PUBLIC_SITE_URL=https://www.your-domain.example` in the build environment (no path/trailing slash).
2. Build the web application with pnpm. Inspect `/`, `/pricing`, `/faq`, `/blog` and all `/blog/:slug` responses with `curl` to verify per-route HTML and canonicals. Check `sitemap.xml`, `robots.txt`, `llms.txt`, `llms-full.txt`.
3. Register the correct sitemap with Google Search Console and verify indexing/robots behavior. The `llms` files are an emerging convention and do **not** guarantee LLM indexing.
4. Test social preview metadata and canonical on the deployed domain, then keep static content and advertised pricing in sync with backend price.

## Uptime and status

`/health/live` reports whether the API process answers; `/health/ready` returns 503 when required database/cache dependencies are not ready. Public `/status` calls these endpoints live and explicitly says it cannot prove historical availability. For an independent **public incident status page**, create a Better Stack Uptime monitor for the web homepage and API `/health/ready`, and a Better Stack status page for those monitors. Better Stack is available through Vercel Connect if the web app is hosted on Vercel; see https://vercel.com/connect/better-stack and https://betterstack.com/status-page. Alternatively use Upptime in a separate GitHub repository. Set `VITE_STATUS_PAGE_URL=https://status.your-domain.example` at web build time. This external page remains available when the app goes down.

Do **not** publish a fake 100% uptime figure or mark services operational based solely on the app being served. Add alerts to real on-call contacts and test outages independently.
