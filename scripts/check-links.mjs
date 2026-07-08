// QA gate (brief §13): scan built HTML for broken internal links, dead "#"
// hrefs, empty hrefs, and images missing src/alt/width/height.
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";

const DIST = resolve(process.argv[2] || "_site");
const htmlFiles = [];
(function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full);
    else if (entry.endsWith(".html")) htmlFiles.push(full);
  }
})(DIST);

let failures = 0;
const fail = (file, msg) => {
  console.error(`${file.replace(DIST, "")}: ${msg}`);
  failures++;
};

// Redirect stub targets may carry query strings; internal pages resolve to dirs.
const internalExists = (href) => {
  const clean = href.split("#")[0].split("?")[0];
  if (clean === "" || clean === "/") return true;
  const candidates = [
    join(DIST, clean),
    join(DIST, clean, "index.html"),
    join(DIST, clean.replace(/\/$/, "") + ".html"),
  ];
  return candidates.some((c) => existsSync(c));
};

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const isStub = /http-equiv="refresh"/.test(html);

  for (const m of html.matchAll(/<a\b[^>]*>/g)) {
    const tag = m[0];
    const href = (tag.match(/href="([^"]*)"/) || [])[1];
    if (href === undefined) fail(file, `link without href: ${tag}`);
    else if (href === "" || href === "#") fail(file, `dead href="${href}"`);
    else if (href.startsWith("/") && !internalExists(href)) fail(file, `broken internal link: ${href}`);
  }

  if (isStub) continue; // stubs have no imagery
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    const tag = m[0];
    const src = (tag.match(/src="([^"]*)"/) || [])[1];
    if (!src) fail(file, `img with missing/empty src: ${tag.slice(0, 120)}`);
    else if (src.startsWith("/") && !existsSync(join(DIST, src.split("?")[0]))) fail(file, `img src not found: ${src}`);
    if (!/alt="/.test(tag)) fail(file, `img missing alt: ${tag.slice(0, 120)}`);
    if (!/width="/.test(tag) || !/height="/.test(tag)) fail(file, `img missing dimensions: ${tag.slice(0, 120)}`);
  }

  // Exactly one <h1> per page
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) fail(file, `expected exactly one <h1>, found ${h1s}`);
}

if (failures) {
  console.error(`\ncheck-links: FAILED with ${failures} issue(s) across ${htmlFiles.length} pages`);
  process.exit(1);
}
console.log(`check-links: OK — ${htmlFiles.length} pages, no broken links, all images have src/alt/dimensions, one h1 per page`);
