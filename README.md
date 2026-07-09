# Direct Interiors North West — marketing site

A premium, static-rendered marketing site for Direct Interiors North West Ltd, a commercial
interior fit-out contractor. Built with **Vite + React + TypeScript + Tailwind + Framer Motion**.
Pure front-of-house: no backend, no auth, no database. All content lives in typed data files.

```bash
npm install
npm run dev        # local dev server (http://localhost:5173)
npm run build      # typecheck → vite build → prerender every route to static HTML + sitemap
npm run preview    # serve the built dist/
npm run check      # QA gates: placeholder grep + link/img/heading/meta checks (run after build)
npm run verify     # build + check
npm run images     # regenerate responsive image variants + manifest from image-masters/
```

## Where the content lives (edit these, not the components)

All copy and structured content is in **`src/data/`** — components are purely presentational:

| File | Contents |
|------|----------|
| `site.ts` | Company facts: name, phone, email, address, **`EST_YEAR`**, `formEndpoint`, sister brand, nav, the 11 trades. **Single source of truth.** |
| `solutions.ts` | The 7 solutions: scope breakdowns, benefit panels, related projects, FAQs, per-page SEO. |
| `projects.ts` | The 7 case studies: story, scope, gallery, meta, related solutions, SEO. |
| `testimonials.ts` | Real testimonials (one attribution each). |
| `sectors.ts`, `areas.ts` | Sector tiles and the 6 area pages. |
| `imageManifest.ts` | **Auto-generated** — do not hand-edit. Run `npm run images`. |

## Common edits

- **Swap the form endpoint:** set `formEndpoint` in `src/data/site.ts` to your Web3Forms/Formspree/
  serverless URL. Until it's set, the enquiry form validates fully then shows a "call us" fallback
  instead of posting to a dead URL. The form POSTs JSON `{name, company, email, phone, premises,
  needs, timescale, description, preferredContact, consent, source}`.
- **Change the accent colour:** edit the `brass` tokens in `tailwind.config.ts` (`brass.DEFAULT`,
  `brass.light`, `brass.text`) — the whole site re-skins from there. `--color-accent-on-dark`
  equivalents live in the same file.
- **Confirmed date:** everything derives from `EST_YEAR` in `site.ts` (currently 2002 — see TODO below).
- **Add a project / solution / area:** add an entry to the relevant data file, then also add its slug
  to `scripts/routes.mjs` (so it's prerendered + in the sitemap) and, for projects, to `_redirects` if
  an old URL should point at it.

## Images

Real project photography lives in `image-masters/` (sourced from the client's existing site).
`npm run images` generates AVIF/WebP/JPEG variants at 4 widths into `public/img/` plus a blur-up
manifest. Components use `<OptimizedImage src="<master-filename-without-ext>" alt="…" />` — never a
raw `<img>`. Zero-CLS (intrinsic dimensions reserved) with warm blur placeholders.

> **TODO(client):** confirm licensing/ownership of the sector-tile imagery
> (`*-sector.jpg`) and replace any generic shots with owned project photography where preferred.

## Rendering & SEO (browser-free SSG)

`npm run build` = `tsc --noEmit` → `vite build` (client) → `vite build --ssr` (server bundle) →
`node scripts/prerender-ssg.mjs`. The SSG script imports the SSR bundle and renders every route in
`scripts/routes.mjs` with `react-dom/server` `renderToString` + `StaticRouter`, injecting the HTML,
the `<head>` tags from react-helmet-async, and the inlined critical CSS into the template — writing
`dist/<route>/index.html`. **No headless browser is used**, so the build runs in plain Node on
Vercel/CI. Every route serves real HTML with a unique title, meta description, canonical, Open Graph
image and JSON-LD (LocalBusiness sitewide + BreadcrumbList/Service on detail pages), plus
`dist/sitemap.xml`.

Motion components render "settled" (visible, no entrance animation) during SSR (`typeof window ===
'undefined'`) and for reduced-motion users, so the static HTML is never captured at `opacity:0`. The
client renders fresh with `createRoot` (we don't hydrate — a browser-rendered Framer-Motion tree
can't be hydrated cleanly; the prerendered HTML is for crawlers/no-JS).

## Shop (Stripe checkout)

An on-site shop lives at `/shop` (catalogue + filters), `/shop/:slug` (product), `/cart`, and
`/shop/success` · `/shop/cancelled`. Products are the **real Ceilings Direct catalogue** (54 items —
prices in GBP, SKUs, descriptions, images) in `src/data/shop.ts`, scraped from their Ecwid store.
Refresh it any time with `npm run scrape-shop` (then `npm run images && npm run build`).

Checkout uses **Stripe Checkout** via a Vercel serverless function, `api/checkout.js`. It validates
prices **server-side** from `api/products.json` (generated from `shop.ts` at build time — client
amounts are ignored) and creates a hosted Checkout Session. Stripe Checkout gives you **card, Apple
Pay, Google Pay, Klarna and Link** automatically once you enable them in the Stripe dashboard.

**To make checkout live** (`TODO(client)`):
1. Create a Stripe account and, in Vercel → Settings → Environment Variables, set
   **`STRIPE_SECRET_KEY`** (`sk_test_…` to trial, `sk_live_…` for real payments). Redeploy.
   Until it's set, the basket shows a "call us to order" fallback instead of a dead checkout.
2. In the Stripe dashboard, enable the payment methods you want (card, wallets, Klarna, Link).
3. **VAT** — prices are stored exactly as shown on ceilings-direct.com and treated as the final,
   VAT-inclusive charge (`site.shop.pricesIncludeVat`). For proper VAT on invoices, enable **Stripe
   Tax**. If your prices are actually ex-VAT, set `pricesIncludeVat: false` and add VAT in `api/checkout.js`.
4. **Delivery** — `api/checkout.js` offers free Deeside collection + a flat £15 UK delivery
   (placeholder). Confirm your real rates.
5. Consider a Stripe **webhook** (`checkout.session.completed`) for order fulfilment/emails.

Cart state is client-side (localStorage), SSR-safe (server renders an empty basket).

## Deploying to Vercel

`vercel.json` sets `buildCommand: npm run build`, `outputDirectory: dist`, the legacy-URL redirects,
and immutable cache headers for `/assets`, `/fonts`, `/img`. Push the repo and import it in Vercel —
no extra config, no Playwright/Chromium in the build. Vercel serves the prerendered per-route HTML
directly, `dist/404.html` for unknown paths, and gzip/brotli-compresses at the edge automatically.

`public/_redirects` (Netlify format) is also included for Netlify/other hosts; `vercel.json` is the
source of truth on Vercel. See `docs/BUILD-CONTRACT.md` for the component/design system and
`docs/redirects-reference.md` for the original URL map. `scripts/compress.mjs` +
`scripts/serve-compressed.mjs` are local-only tools (brotli precompress + a compression-aware static
server) for representative local Lighthouse runs — not needed on Vercel.

## TODO(client) — confirm before launch
`npm run check` prints the full list scraped from the code. Key items:
- **Est. year:** 2000 (old About page) vs 2002 (brand line) — set `EST_YEAR`.
- **Form endpoint**, opening hours, company registration & VAT numbers, social profiles.
- **Testimonial attribution:** the "natural light / glass partitions" quote is credited to both
  Mr B Jones and AURA on the old site — confirm the true author (we use Mr B Jones).
- **Accreditations & team photos** for the About page (only add verified badges).
- **Legal review** of the privacy/terms/cookies pages (standard templates, not bespoke advice).
