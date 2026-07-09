// Refresh the shop catalogue from the live Ceilings Direct (Ecwid) store.
// Pulls products (names, GBP prices, SKUs, descriptions) from the Ecwid
// storefront API, scrapes each product image, downloads the images, and writes
// src/data/shop.ts. Afterwards run `npm run images` then `npm run build`.
//
//   node scripts/scrape-shop.mjs
//
// Requires playwright (devDependency). Ecwid store id: 54801063.
import { writeFileSync, mkdirSync, existsSync, statSync } from "node:fs";
import { execSync } from "node:child_process";
import { chromium } from "playwright";

const STORE = "54801063";
const API = `https://eu-fra4-storefront-api.ecwid.com/storefront/api/v1/${STORE}/catalog`;
const HEADERS = { "Content-Type": "application/json", Origin: "https://www.ceilings-direct.com", Referer: "https://www.ceilings-direct.com/store", "User-Agent": "Mozilla/5.0" };
const TOP = [
  { id: 106484706, name: "Ceiling Tiles" },
  { id: 106523729, name: "Ceiling Grid" },
  { id: 106484707, name: "Metal Framing Ceiling Products" },
  { id: 106536228, name: "Metal Stud & Track" },
  { id: 106495173, name: "Plasterboards" },
  { id: 106495174, name: "Partitioning Systems" },
];

const collectProducts = (j) => {
  const out = [];
  (function r(x) { if (Array.isArray(x)) x.forEach(r); else if (x && typeof x === "object") { if (x.identifier?.productId && x.name && x.defaultOptionsOverrides) out.push(x); for (const v of Object.values(x)) r(v); } })(j);
  return out;
};

async function fetchCategory(catId) {
  const out = [];
  let offset = 0;
  for (;;) {
    const body = JSON.stringify({ categoryViewMode: "EXPANDED", parentCategoryId: catId, pagination: { offset, limit: 100 }, urlParams: { urlType: "CLEAN_URL", baseUrl: "/store", isCleanUrls: true } });
    const res = await fetch(API, { method: "POST", headers: HEADERS, body });
    const prods = collectProducts(await res.json());
    out.push(...prods);
    if (prods.length < 100) break;
    offset += 100;
  }
  return out;
}

console.log("1/4 fetching catalogue…");
const seen = new Set();
const raw = [];
for (const t of TOP) {
  for (const p of await fetchCategory(t.id)) {
    const id = p.identifier.productId;
    if (seen.has(id)) continue;
    seen.add(id);
    raw.push({
      id, name: p.name, category: t.name,
      price: p.defaultOptionsOverrides?.pricesOverrides?.basePrice ?? null,
      sku: p.defaultOptionsOverrides?.variationOverrides?.sku ?? "",
      soldOut: !!p.defaultOptionsOverrides?.variationOverrides?.isSoldOut,
      shippingRequired: p.defaultOptionsOverrides?.variationOverrides?.isShippingRequired !== false,
      description: (p.description || "").replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim(),
    });
  }
}
console.log(`   ${raw.length} products`);

console.log("2/4 scraping product images…");
const browser = await chromium.launch();
for (const p of raw) {
  const page = await browser.newPage();
  try {
    await page.goto(`https://www.ceilings-direct.com/store#!/x/p/${p.id}`, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForFunction(() => Array.from(document.querySelectorAll("img")).some((i) => /d2j6dbq0eux0bg\.cloudfront\.net\/images\/54801063\//.test(i.currentSrc || i.src)), { timeout: 20000 }).catch(() => {});
    p.imageUrl = await page.evaluate(() => (Array.from(document.querySelectorAll("img")).map((i) => i.currentSrc || i.src).filter((s) => /d2j6dbq0eux0bg\.cloudfront\.net\/images\/54801063\//.test(s))[0] || null));
  } catch { /* skip */ } finally { await page.close(); }
}
await browser.close();

console.log("3/4 downloading images…");
mkdirSync("image-masters", { recursive: true });
for (const p of raw) {
  if (!p.imageUrl) continue;
  const f = `image-masters/shop-${p.id}.jpg`;
  try { execSync(`curl -s -o "${f}" "${p.imageUrl}"`); if (!existsSync(f) || statSync(f).size < 1000) p.imageUrl = null; } catch { p.imageUrl = null; }
}

console.log("4/4 writing src/data/shop.ts…");
const slugify = (s) => s.toLowerCase().replace(/\*[^*]*\*/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 70);
const used = new Set();
const uniqueSlug = (name, id) => { let base = slugify(name) || `product-${id}`, s = base, n = 2; while (used.has(s)) s = `${base}-${n++}`; used.add(s); return s; };
const parseSpecs = (d) => { const specs = []; const re = /([A-Z][A-Za-z /()]{2,30}?)\s*[-–]\s*([^-–]{1,60}?)(?=(?:\s+[A-Z][A-Za-z /()]{2,30}?\s*[-–])|$)/g; let m; while ((m = re.exec(d)) && specs.length < 8) { const k = m[1].trim(), v = m[2].trim(); if (k && v && v.length < 60) specs.push({ k, v }); } return specs; };
const clean = (d) => (d || "").replace(/CONTACT US FOR BULK BUYING DISCOUNT\.?/i, "").replace(/Details:\s*01244[^]*$/i, "").replace(/\s+/g, " ").trim();
const ORDER = ["Ceiling Tiles", "Ceiling Grid", "Metal Framing Ceiling Products", "Metal Stud & Track"];
const products = raw
  .filter((p) => p.price != null && p.imageUrl && existsSync(`image-masters/shop-${p.id}.jpg`))
  .map((p) => { const desc = clean(p.description); return { id: String(p.id), slug: uniqueSlug(p.name, p.id), name: p.name.replace(/\s*\*SOLD INDIVIDUALLY\*/i, " (sold individually)").trim(), sku: p.sku, price: Math.round(p.price * 100) / 100, pricePence: Math.round(p.price * 100), category: p.category, image: `shop-${p.id}`, description: desc, specs: parseSpecs(desc), inStock: !p.soldOut, shippingRequired: p.shippingRequired }; })
  .sort((a, b) => ORDER.indexOf(a.category) - ORDER.indexOf(b.category) || a.name.localeCompare(b.name));
const categories = ORDER.filter((c) => products.some((p) => p.category === c)).map((name) => ({ name, slug: slugify(name), count: products.filter((p) => p.category === name).length }));

const out = `// AUTO-GENERATED by scripts/scrape-shop.mjs from the live Ceilings Direct store.
// After regenerating, run: npm run images && npm run build
export interface ShopProduct { id: string; slug: string; name: string; sku: string; price: number; pricePence: number; category: string; image: string; description: string; specs: { k: string; v: string }[]; inStock: boolean; shippingRequired: boolean }
export interface ShopCategory { name: string; slug: string; count: number }
export const shopCategories: ShopCategory[] = ${JSON.stringify(categories, null, 2)};
export const shopProducts: ShopProduct[] = ${JSON.stringify(products, null, 1)};
export const getProductBySlug = (slug: string): ShopProduct | undefined => shopProducts.find((p) => p.slug === slug);
export const productsInCategory = (categorySlug: string): ShopProduct[] => shopProducts.filter((p) => shopCategories.find((c) => c.slug === categorySlug)?.name === p.category);
`;
writeFileSync("src/data/shop.ts", out);
console.log(`done: ${products.length} products, ${categories.length} categories. Now run: npm run images && npm run build`);
