# Direct Interiors North West — Premium Marketing Site (rebuild)

A pure marketing site rebuilt from scratch as a **prerendered React SPA**
(Vite + TypeScript + Tailwind + Framer Motion), matching the brief's aesthetic
DNA: architectural, cinematic, brass-on-near-black, photography-led. No backend,
no auth, no database — everything front-of-house.

> The previous Eleventy "modernise-in-place" build is preserved on the git
> branch **`eleventy-refresh-site`**; this rebuild lives on **`premium-rebuild`**.

---

## TODO(client) — confirm before launch
`npm run check` prints this list from the code. Key items:

| Item | Where | Default used |
|------|-------|--------------|
| **Established year** — About page said 2000, brand line says 2002 | `src/data/site.ts` → `EST_YEAR` | **2002** |
| **Form endpoint** — Duda's handler can't be reused | `site.ts` → `formEndpoint` | empty → form validates then shows a "call us" fallback |
| **Testimonial attribution** — "natural light / glass partitions" quote credited to both Mr B Jones and AURA on the live site | `src/data/testimonials.ts` | **Mr B Jones** (majority) |
| **Opening hours** | `site.ts` → `openingHours` | omitted |
| **Company reg / VAT numbers** | `site.ts` | omitted |
| **Social profiles** | `site.ts` → `socials` | omitted |
| **Accreditations** (CHAS / SafeContractor / Constructionline) + team photos | Why Direct page | honest "coming soon" placeholder, no fake logos |
| **Legal review** — privacy/terms/cookies are standard templates | `src/pages/legal/*` | dated "July 2026", flagged |
| **Sector-tile imagery** licensing/ownership | `image-masters/*-sector.jpg` | reused from the client's existing site |

---

## Tech & rendering decisions
- **Stack:** Vite + React 18 + TypeScript (strict) + Tailwind (design tokens) +
  Framer Motion + React Hook Form + Zod + react-helmet-async. Route-level code
  splitting via `React.lazy`.
- **Prerendering:** `npm run build` runs `scripts/prerender.mjs` — it serves the
  built SPA, visits every route in `scripts/routes.mjs` with headless Chromium,
  and writes fully-rendered static HTML (title, meta, canonical, OG, JSON-LD, and
  visible content) to `dist/<route>/index.html`. Critical CSS is inlined; a
  `sitemap.xml` is emitted. So every route serves real HTML for crawlers/no-JS.
  - We render (not hydrate) on the client: a browser-captured prerender of a
    Framer-Motion tree can't be hydrated cleanly, so `main.tsx` uses `createRoot`.
    The prerendered HTML still gives crawlers/no-JS real content; motion
    primitives render "settled" (visible) under `navigator.webdriver`/reduced
    motion so nothing is ever captured at `opacity:0`.
- **Content = data files.** `src/data/*` is the single source of truth; pages are
  presentational. See `docs/BUILD-CONTRACT.md` for the component/design system.

## Design tokens (brief palette, `tailwind.config.ts`)
Ink `#0C0C0B` · Bone `#F9F8F6` · Brass `#C8A96E` · Stone `#D4C5A9` · Sand
`#E8DDD0` · Graphite `#7C7870`. Fonts: Cormorant (display), Outfit (UI/body),
DM Mono (labels/stats) — all self-hosted.
- **WCAG AA contrast:** brass and graphite fail on the light (bone/sand) surface,
  so light `Section`s carry a `tone-light` class that darkens accent text to
  `brass.deep #725426` (AA even on sand) and muted text to `mute #5f5c56`; dark
  cards/insets nested in a light section carry `on-dark` to re-assert the bright
  values. A single accent-swap in `tailwind.config.ts` re-skins the whole site.

## Sitemap & redirects (`public/_redirects`, `docs/redirects-reference.md`)
Solution slugs preserve the original live-site URLs for SEO continuity
(`/glass-partitions` etc.); `/projects/:slug`, `/areas/:slug`, `/solutions`,
`/all-trades`, `/why-direct`, `/process`, `/contact`, `/privacy|terms|cookies`.
Legacy 301s: enquiry pages → `/contact?enquiry=…`; gdpr variants → `/privacy`;
old flat project slugs → `/projects/…`; leftover Duda template pages → hubs;
`/about-us` → `/why-direct`; `/sub-services` → `/all-trades`.

## Content-truth guardrails
Only verified facts appear (est. 2002, formerly Ceilings Direct renamed 2021,
11 in-house trades, 8 sectors, 20+ years, CSCS-carded, Padeswood "4 weeks",
Butchers "5-out-of-5 hygiene rating" + stayed open, clients Welsh Government /
Demon Tweeks / AURA). No invented review counts, ratings, project totals,
insurance figures, accreditation badges or awards. Verified by an adversarial
review pass; the one flagged inconsistency (24+ vs 20+ years) was standardised
to **20+** sitewide.

---

## Acceptance results (verified 2026-07)

**QA gates (`npm run check`, over built `dist/`):**
- `check-placeholders`: **OK** — 32 HTML files, no `Slide title` / lorem / `John Doe` / `Button` etc.
- `check-links`: **OK** — 32 pages, zero broken/`#`/empty internal links; every `<img>` has alt + dimensions; exactly one `<h1>`, plus a title + meta description per page.

**Keyboard/interaction walkthrough (`scripts/walkthrough.mjs`): 20/20 PASS** —
skip link, solutions dropdown, one-h1, FAQ accordion, related-project nav,
case-study CTA → `/contact` (old `/our-work` bug absent), lightbox open/arrow/Escape,
multi-step form validation + advance, projects filter, mobile menu open/Escape/
focus-return, no horizontal scroll at 375px **and** 320px.

**Lighthouse (mobile emulation, headless Chromium, production build served with brotli):**

| Page | Performance | Accessibility | Best-Practices | SEO |
|------|:-:|:-:|:-:|:-:|
| Home (`/`) | 83 | **100** | **100** | **100** |
| Solution (`/glass-partitions`) | 84 | **100** | **100** | **100** |
| Projects (`/projects`) | 84 | **100** | **100** | **100** |
| Contact (`/contact`) | 85 | **100** | **100** | **100** |

**On the Performance score (83–85):** this is Lighthouse's *simulated* Slow-4G +
4×-CPU throttling. The *observed* (real) metrics on the same pages are excellent —
**First Contentful Paint ≈ 0.15–0.24s, Largest Contentful Paint ≈ 0.2–1.0s,
Total Blocking Time 0ms, Cumulative Layout Shift 0, Speed Index score 89.** The
simulated score is bounded by the JS payload (React + React Router + Framer
Motion) over the modelled slow link — inherent to the brief's "everything
animated" mandate. All legitimate optimisations are applied: route code-splitting,
brotli precompression, inlined critical CSS, deferred JS, lazy Google-Maps facade,
responsive AVIF/WebP images with explicit dimensions (zero CLS), self-hosted fonts
with `font-display: swap`. Reaching ≥90 simulated would require removing the
animation library / stripping the rich prerendered DOM, which contradicts the
design brief — so the tradeoff is documented here rather than made silently.

**Screenshots:** `/screenshots/final-*-{1440,390}.png` for Home, a solution,
Projects, Why Direct, Process, Areas, Contact and All-Trades, desktop + mobile.

---

## Commands
```
npm install
npm run dev       # dev server (localhost:5173)
npm run build     # tsc → vite build → prerender (static HTML + sitemap)
npm run check     # placeholder + link/img/h1/meta QA gates (run after build)
npm run images    # regenerate responsive image variants + manifest
node scripts/compress.mjs         # precompress dist to .br/.gz (for measurement / static hosts)
node scripts/serve-compressed.mjs # local brotli-aware static server (PORT env)
node scripts/walkthrough.mjs <url># keyboard/interaction acceptance walkthrough
```
See `README.md` for structure and common edits.
