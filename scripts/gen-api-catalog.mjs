// Emit api/products.json (id -> {name, pricePence, sku, image}) from shop.ts so
// the serverless checkout function can validate prices SERVER-SIDE and never
// trust amounts sent by the client. Runs as part of `npm run build`.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const ts = readFileSync("src/data/shop.ts", "utf8");
const m = ts.match(/shopProducts:\s*ShopProduct\[\]\s*=\s*(\[[\s\S]*?\]);\n/);
if (!m) {
  console.error("gen-api-catalog: could not parse shopProducts from src/data/shop.ts");
  process.exit(1);
}
const products = JSON.parse(m[1]);
const catalog = {};
for (const p of products) {
  catalog[String(p.id)] = { name: p.name, pricePence: p.pricePence, sku: p.sku, image: p.image, inStock: p.inStock };
}
mkdirSync("api", { recursive: true });
writeFileSync("api/products.json", JSON.stringify(catalog, null, 0));
console.log(`gen-api-catalog: wrote api/products.json (${Object.keys(catalog).length} products)`);
