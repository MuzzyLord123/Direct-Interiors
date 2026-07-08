# Redirect map

Every URL that existed on the live Duda site either still resolves at the same
slug or 301-redirects per the table below. The map ships in two forms:

1. **Platform config** — `_redirects` at the output root (Netlify format,
   generated from `src/_data/redirects.json` at build time). The `301!` flag
   forces the redirect ahead of the static stub files.
2. **Static fallback stubs** — for hosts without redirect support, each legacy
   URL is built as a tiny `noindex` page with `<meta http-equiv="refresh">` and
   a `rel="canonical"` pointing at the destination.

If the final host is not Netlify, translate `src/_data/redirects.json` into the
host's own config (Apache `.htaccess`, nginx, Cloudflare rules…) — the stubs
alone are a fallback, not a substitute for real 301s.

| From | To | Type | Why |
|------|----|------|-----|
| `/how-can-we-help` | `/contact-us?enquiry=general` | 301 | One of four byte-identical copies of the contact form, consolidated (brief §3.6) |
| `/no-obligation-consultation` | `/contact-us?enquiry=consultation` | 301 | As above |
| `/get-a-quote` | `/contact-us?enquiry=quote` | 301 | As above |
| `/tenders` | `/contact-us?enquiry=tender` | 301 | As above |
| `/gdpr` | `/privacy-policy` | 301 | Single canonical privacy URL (brief §3.8) |
| `/gdpr---level-1` | `/privacy-policy` | 301 | Was already a 404 on the live site; linked from the old form consent text |
| `/gdpr---level-2` | `/privacy-policy` | 301 | Long-form notice now lives at the canonical URL |
| `/example-case-study-for-copying` | `/our-work` | 301 | Leftover Duda template page (lorem ipsum) that was live and in the sitemap |
| `/servicesbbeea1bd` | `/solutions` | 301 | Leftover Duda template page (lorem ipsum) that was live and in the sitemap |

The `?enquiry=` parameter pre-selects the matching option in the consolidated
contact form's "What do you need?" select (progressive enhancement — without
JS the form still works, defaulting to "A free quote").

All other live URLs (`/`, the seven solution pages, `/sub-services`,
`/about-us`, `/our-work`, the seven case studies, `/contact-us`,
`/terms-and-conditions`, `/cookies-policy`) are unchanged. New URLs:
`/solutions` (hub for the previously dead "Solutions" nav parent) and
`/privacy-policy` (canonical privacy notice).
