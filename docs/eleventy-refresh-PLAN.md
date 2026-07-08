# Direct Interiors North West — Premium Refresh Plan

**Project:** Modernise (not redesign) directinteriorsnw.com.
**Approach:** The repo was empty, so the site is rebuilt as an Eleventy static site that faithfully
reproduces the live Duda site's structure, palette, photography and copy, with the brief's
improvements applied. All photography and genuine copy were crawled from the live site
(30 pages fetched 2026-07-08).

---

## TODO(client) — decisions needed before launch

| # | Question | Default used in build |
|---|----------|----------------------|
| 1 | **Established date**: About says "established in 2000", Home hero says "Est 2002". Which is right? | `2002` (single constant in `src/_data/site.js`) |
| 2 | **Testimonial attribution**: the "Dividing offices up…" quote is credited to *Mr B Jones, Chester Business Park* on 4 pages but *AURA Leisure and Libraries* on Glass Partitions. Who said it? | Mr B Jones (majority usage). Single source: `src/_data/testimonials.json` |
| 3 | **Address form**: contact blocks said "Garden City, Flintshire", footer said "Garden City, Deeside". | Standardised: **96 Welsh Road, Garden City, Deeside, Flintshire CH5 2HX** |
| 4 | **Accreditations** (CHAS / SafeContractor / Constructionline?) for About trust strip | Only CSCS (already claimed on Sub Services) is shown |
| 5 | **Opening hours** for footer + Contact page | Omitted (marked in code with `TODO(client)`) |
| 6 | **Company registration number** for footer | Omitted (marked in code with `TODO(client)`) |
| 7 | **Privacy policy legal review**: notice is dated 18 Jan 2021 and lists suppliers (Minster, SIG, Galaxy, CCF). Substance not rewritten — only the wrong email, broken links and stray "[ ]" tick boxes fixed. | Text preserved at `/privacy-policy` |
| 8 | **Ceilings Direct product links**: their store uses hash-routed category URLs that can't be mapped to product names from outside. | All six Shop cards link to `https://www.ceilings-direct.com/store` |
| 9 | **Form endpoint**: Duda's internal form handler can't be reused outside Duda. | Configurable constant in `src/_data/site.js` (`formEndpoint`) + progressive-enhancement JS |
| 10 | **"Sub Services" rename**: proposed on-page H1 "Supporting Trades — All In-House" (URL & nav label unchanged) | Applied on page only |
| 11 | **Geo coordinates** for LocalBusiness schema need verifying | Omitted from JSON-LD until confirmed |

---

## Brand tokens (sampled from live site — unchanged)

| Token | Value | Source |
|-------|-------|--------|
| Accent blue | `#3bb5e6` | `.our-btns a` background, selected-nav colour, CTA band background (`rgba(59,181,230,1)`) |
| Charcoal | `#595959` | Logo background (pixel-sampled from `logo-cd2.png`) |
| Logo red | `#ff0000` | Logo lettering ("Direct Shopfitting & Interiors") — used only in the logo, not as a UI colour |
| Body text | `#333333` / `#666666` | Live stylesheet |
| Light section bg | `#f7f7f7` / `#faf9f9` | Live stylesheet |
| White | `#ffffff` | |
| Typeface | **Source Sans Pro** 400/600/700 (self-hosted) | Live stylesheet (`font-family:'Source Sans Pro'`) |

**Contrast adjustments (WCAG AA), documented per §1 hard rules (ratios computed, not eyeballed):**
- Brand blue `#3bb5e6` vs white = **2.35:1** → fails AA even for large text. It is therefore kept
  only where it never carries text against white: decorative accents, borders, quote marks, and
  as large display colour on dark charcoal (`#3bb5e6` on `#333` = 5.38:1 ✓).
- New derived token `--color-accent-strong: #1978a5` — the same hue darkened until white text
  passes: white on `#1978a5` = **4.92:1** ✓, and `#1978a5` link text on white = 4.92:1 ✓ /
  on `#f7f7f7` = 4.59:1 ✓. Used for: primary buttons, CTA band background, text links.
  (Before: `#3bb5e6` / After: `#1978a5` — this is the only adjusted colour on the site.)
- Charcoal `#595959` with white text = 7.00:1 ✓ (footer). Body `#333` = 12.63:1 ✓,
  muted `#666` = 5.74:1 ✓. Hero/photo text always sits on a dark scrim.
- Second derived token `--color-accent-on-dark: #9cdcf4` — brand blue lightened for
  small text on the charcoal footer/brand-statement (`#3bb5e6` on `#595959` = 2.98:1
  ✗ → `#9cdcf4` = 4.66:1 ✓). Used only on dark surfaces.

---

## Sitemap & redirects

**Kept URLs (18 pages):** `/`, `/interior-fit-outs-and-refurbishments`, `/suspended-ceilings`,
`/partition-walls-drylining`, `/glass-partitions`, `/hygienic-wall-cladding`,
`/washroom-refurbishments`, `/bespoke-designs`, `/sub-services`, `/about-us`, `/our-work`,
7 case-study slugs, `/contact-us`, `/terms-and-conditions`, `/cookies-policy`.

**New pages:** `/solutions` (hub — gives the nav parent a real destination), `/privacy-policy`
(canonical privacy URL), custom 404.

**301 redirects** (committed in `_redirects` + documented in `redirects.md`; every legacy URL also
gets a static meta-refresh + canonical stub as fallback for hosts without redirect support):

| From | To |
|------|----|
| `/how-can-we-help` | `/contact-us?enquiry=general` |
| `/no-obligation-consultation` | `/contact-us?enquiry=consultation` |
| `/get-a-quote` | `/contact-us?enquiry=quote` |
| `/tenders` | `/contact-us?enquiry=tender` |
| `/gdpr` | `/privacy-policy` |
| `/gdpr---level-1` | `/privacy-policy` (was already a 404 on the live site) |
| `/gdpr---level-2` | `/privacy-policy` |
| `/example-case-study-for-copying` | `/our-work` (leftover Duda template page, live & indexed) |
| `/servicesbbeea1bd` | `/solutions` (leftover lorem-ipsum template page, live & indexed) |

> The two junk template pages above were discovered during the crawl — they are in the live
> sitemap.xml and full of lorem ipsum, so they redirect rather than 404.

---

## Page-by-page changes

### Global (every page) — Priority: CRITICAL/HIGH
- Purge all Duda placeholders: "Slide title", "Molorpe riusto…", "Write your caption here",
  "Button", "City skyline / Photo By: John Doe" etc. CI grep (`scripts/check-placeholders.sh`)
  fails the build if any return.
- Header: right-sized logos with `srcset` (was 1920px assets in 120px slots); phone number now
  `tel:+441244810222` (was wrapped in `mailto:`!); separate email link; Ceilings Direct reduced
  to one labelled utility link; "Solutions" nav links to real `/solutions` hub; sticky header;
  accessible mobile menu (button + `aria-expanded` + Escape + focus management); "Get a free
  quote" button in header.
- CTA band: rendered once per page (was twice), as links-styled-as-cards in
  `<nav aria-label="Enquiries">`, 3 actions max, all pointing at consolidated `/contact-us`
  destinations. Fixed the case-study bug where "No obligation consultation" linked to `/our-work`.
- Testimonials: `<blockquote>` + `<cite>`, proper quotes, single data file, varied per page.
- Footer: dynamic year (was hard-coded 2021), standardised address, "Areas we cover" line,
  4-column layout, canonical privacy link, "Share by:" residue and BOM/zero-width chars removed.
- Forms: one shared component; visible labels; autocomplete; inline validation via
  `aria-describedby`; `role="status"` announcements; consent checkbox links the privacy policy.
- SEO: unique titles + meta descriptions (service + geography), one `<h1>` per page, canonicals,
  OG/Twitter images, LocalBusiness + BreadcrumbList JSON-LD, XML sitemap, robots.txt.
- A11y: alt text everywhere, skip link, landmarks, `:focus-visible`, `lang="en-GB"`,
  reduced-motion gating, 44px targets.
- Performance: AVIF/WebP + JPEG `srcset` via sharp, explicit dimensions, lazy loading below fold,
  `fetchpriority="high"` hero preload, self-hosted font with `font-display: swap`, JS < 15KB.

### `/` Home — CRITICAL
Narrative order preserved. 6-slide placeholder carousel → single static hero (slider01 photo,
real headline + Est-2002 line, "Get a free quote" + "View our work"). Services grid: 7 consistent
whole-card links (was: placeholder "Button" labels, one card without a button). Sector tiles:
real images restored (all 8 exist on the CDN despite empty `src` on the live page), dead buttons
removed, rendered as a static credibility strip. Shop cards: all six linked to Ceilings Direct
store (`rel="noopener"`, new tab) + context sentence. De-duplicated the twice-rendered contact
blocks; pull-quote restyled as a brand statement (not `<h2>`). "Trusted by" strip (Welsh
Government, Demon Tweeks, AURA, Bell Meadow) added as low-key text.

### Solutions template (7 pages) — CRITICAL/HIGH
Placeholder hero slider → static hero with page H1 + breadcrumb (BreadcrumbList schema).
Body rhythm: intro → two-column checklist → supporting copy → photo → testimonial → CTA band →
Related projects (2–3 case-study cards) → Other solutions links. "T -"/"E-" contact fragments →
shared contact strip. Duplicate CTA bands removed.
- Interior Fit-Outs: related = Demon Tweeks, Doc Fictoria, Bell Meadow.
- Suspended Ceilings: services list → checklist; related = Butchers Dyserth, Demon Tweeks.
- Partition Walls: British Gypsum / Siniat / Knauf as text-only "systems we install" strip;
  related = Westrock, Doc Fictoria.
- Glass Partitions: fixed "includeintegral blinds", bullet spacing; related = Westrock,
  Matthew Arnold, Bell Meadow; testimonial attribution resolved (→ Matthew Arnold receptionist
  quote used here to avoid repeating the Jones quote).
- Hygienic Wall Cladding: Advantages + Suitable Locations as checklists; Golden Fish & Chips
  testimonial kept; related = Butchers Dyserth, Padeswood & Buckley.
- Washrooms: DDA + "one stop shop" kept (quoting normalised); related = Padeswood & Buckley.
- Bespoke Designs: installations list → checklist; related = Bell Meadow, Demon Tweeks.

### `/solutions` hub — MEDIUM (new)
Card grid of all seven solutions (reuses Home services grid component).

### `/sub-services` — MEDIUM
List reordered above the referencing copy ("All the above listed…" rewritten). Trades as
two-column checklist. On-page H1 "Supporting Trades — All In-House" (URL/nav unchanged,
TODO(client) #10). Zero-width characters stripped.

### `/about-us` — CRITICAL (date) / MEDIUM
"Formally known asCeilings Direct" → "Formerly known as Ceilings Direct"; "choose theContact Us
option" → contact button; "justly proud … at present date" → "We're proud of the reputation we've
built over two decades."; Est-date constant (TODO #1); stat strip (Years / Projects / Trades
in-house); "View our work" button.

### `/our-work` — MEDIUM
Raw slug text removed from cards; whole-card links with focus states; equal-height 3/2/1 grid;
service tags; short intro paragraph; filter chips (progressive enhancement, Low priority).

### Case-study template (7 pages) — CRITICAL
Placeholder hero + John-Doe gallery purged; gallery rebuilt from the real `*-gallery01–04.jpg`
photos (discovered on the CDN) in an accessible keyboard-operable lightbox. Wrong
consultation→/our-work link fixed. Five-link action row → breadcrumb + single "Discuss a similar
project" CTA; full band moved to bottom. Project meta panel (Location / Sector / Services /
Duration only where stated — e.g. Padeswood "4 weeks"). Prev/next + related solutions.
Copy fixes per brief §6.3 (Butchers, Matthew Arnold, AURA quote).

### Legal — CRITICAL
- T&Cs: "Celings Direct Ltd's" / "Ceilings Direct Ltd" → "Direct Interiors North West Limited".
- `/privacy-policy` (new canonical): full Level-2 notice text preserved; email corrected to
  info@directinteriorsnw.com; link-less "clicking this link" sentence now links the contact form;
  literal "[ ]" tick boxes removed; malformed Galaxy Insulation link fixed; legal review flagged
  (TODO #7).
- Cookies: template fixes only. Minimal consent banner blocks GA until accepted, with
  equal-prominence decline.

---

## Priorities (work order)
1. **Critical** — placeholders purge, testimonial attribution, wrong CTA links, enquiry-page
   consolidation + 301s, T&Cs company name, privacy email/URL, Est-date constant, empty img srcs.
2. **High** — titles/descriptions, heading hierarchy, alt text, form a11y, header fixes,
   responsive images + hero de-carousel, CTA band de-dup, footer year/address, contrast scrims,
   shop links.
3. **Medium** — related links, breadcrumbs + schema, LocalBusiness + OG, /solutions hub, Our Work
   cards, meta panels + prev/next, copy corrections, sticky header, stat strip, map.
4. **Low** — filter chips, entry animations (reduced-motion-gated), testimonial variety, footer
   extras.

## Acceptance verification — results (2026-07-08)

- [x] `scripts/check-placeholders.sh` passes on the full built output
      (`check-placeholders: OK — no template placeholder strings in _site`).
- [x] `scripts/check-links.mjs`: **33 pages, zero broken/`#`/empty-href links; every
      `<img>` has src, width/height and alt; exactly one `<h1>` per page.**
- [x] Legacy URLs: `_redirects` (301, forced) + per-URL `noindex` meta-refresh stub
      fallbacks with canonicals; custom 404 page built. No orphaned URLs.
- [x] Keyboard/interaction walkthrough (`scripts/walkthrough.mjs`): **26/26 PASS** —
      skip link, dropdown disclosure (Enter/Escape), solution → related project →
      lightbox (arrows/Escape), consultation CTA regression check, `?enquiry=`
      pre-selection, inline validation + `role="status"` announcement, work filters,
      mobile menu (aria-expanded, Escape returns focus), no horizontal scroll at
      320px/375px.
- [x] Lighthouse (mobile emulation, headless Chromium 149):
      | Page | Perf | A11y | Best-Practices | SEO |
      |------|------|------|----------------|-----|
      | Home | 98 | 100 | 100 | 100 |
      | Suspended Ceilings | 99 | 100 | 100 | 100 |
      | Demon Tweeks | 99 | 100 | 100 | 100 |
      | Contact | 99 | 100 | 100 | 100 |
- [x] Before/after screenshots at 375px & 1440px for Home, Suspended Ceilings,
      Demon Tweeks and Contact committed to `/screenshots` (`before-*` = live Duda
      site, `after-*` = rebuild).
- Assets: CSS 23KB + JS 6.5KB minified (pre-gzip) — well inside the 75KB JS budget.

### Same-brand note
The live site's header is a dark charcoal band with the combined logo; the rebuild
keeps exactly that (the logo PNG's own `#595959` background blends into the header),
with the same white nav, brand-blue accents and photography-led heroes. The returning-
visitor reaction should be "sharper", not "new website".
