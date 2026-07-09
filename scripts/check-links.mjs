// Build gate over dist/: no broken internal links, no dead/empty hrefs, every
// <img> has a non-empty alt, and exactly one <h1> per page.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { indexableRoutes, extraRoutes } from "./routes.mjs";

const DIST = "dist";
const valid = new Set([...indexableRoutes, ...extraRoutes]);

function walk(dir, acc = []) {
  for (const e of readdirSync(dir)) {
    const full = join(dir, e);
    if (statSync(full).isDirectory()) walk(full, acc);
    else if (full.endsWith(".html")) acc.push(full);
  }
  return acc;
}

let problems = 0;
const flag = (file, msg) => {
  console.error(`✗ ${file.replace(DIST, "") || "/"}: ${msg}`);
  problems++;
};

for (const file of walk(DIST)) {
  const html = readFileSync(file, "utf8");
  const rel = file.replace(/\\/g, "/").replace(DIST, "").replace(/\/index\.html$/, "") || "/";

  // links
  for (const m of html.matchAll(/<a\b[^>]*?href="([^"]*)"[^>]*>/gi)) {
    const href = m[1];
    if (href === "" || href === "#") flag(rel, `empty/placeholder href`);
    else if (href.startsWith("/")) {
      const path = href.split("#")[0].split("?")[0].replace(/\/$/, "") || "/";
      if (!valid.has(path)) flag(rel, `internal link to non-canonical route: ${href}`);
    }
  }

  // images
  for (const m of html.matchAll(/<img\b[^>]*>/gi)) {
    const tag = m[0];
    const alt = tag.match(/\balt="([^"]*)"/);
    if (!alt) flag(rel, `<img> without alt: ${tag.slice(0, 80)}`);
    // decorative blur placeholders legitimately use alt="" — allow empty only when aria-hidden
    if (alt && alt[1] === "" && !/aria-hidden="true"/.test(tag)) {
      flag(rel, `<img> with empty alt and not aria-hidden: ${tag.slice(0, 80)}`);
    }
  }

  // exactly one h1
  const h1s = (html.match(/<h1[\s>]/gi) || []).length;
  if (h1s !== 1) flag(rel, `expected exactly one <h1>, found ${h1s}`);

  // title + description present (Helmet adds a data-rh attribute in SSR output)
  if (!/<title[^>]*>[^<]{5,}<\/title>/.test(html)) flag(rel, "missing/short <title>");
  if (!/<meta[^>]+name="description"[^>]+content="[^"]{20,}"/.test(html)) flag(rel, "missing/short meta description");
}

if (problems) {
  console.error(`\ncheck-links: FAILED with ${problems} issue(s).`);
  process.exit(1);
}
console.log(`check-links: OK — ${walk(DIST).length} pages, links/images/headings/meta all valid.`);
