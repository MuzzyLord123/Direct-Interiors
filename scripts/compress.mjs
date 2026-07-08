// Pre-compress text assets to .gz and .br. Most hosts (Netlify/Vercel/CF)
// compress automatically; this is for hosts/servers that serve precompressed
// files (and makes local Lighthouse reflect production transfer sizes).
import { readdirSync, statSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { gzipSync, brotliCompressSync, constants } from "node:zlib";

const DIST = "dist";
const exts = /\.(html|js|css|svg|json|xml|txt|webmanifest)$/;
let n = 0;

function walk(dir) {
  for (const e of readdirSync(dir)) {
    const full = join(dir, e);
    if (statSync(full).isDirectory()) walk(full);
    else if (exts.test(full)) {
      const buf = readFileSync(full);
      if (buf.length < 1024) continue;
      writeFileSync(full + ".gz", gzipSync(buf, { level: 9 }));
      writeFileSync(full + ".br", brotliCompressSync(buf, { params: { [constants.BROTLI_PARAM_QUALITY]: 11 } }));
      n++;
    }
  }
}
walk(DIST);
console.log(`compress: wrote .gz + .br for ${n} files`);
