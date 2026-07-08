// Build gate: fail if any template placeholder / lorem / content-truth
// red-flag string reaches the built HTML. Prints a TODO(client) checklist
// (from source) without failing.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const DIST = "dist";
const FAIL_PATTERNS = [
  "Slide title",
  "Write your caption here",
  "John Doe",
  "Molorpe",
  ">Button<",
  "Lorem ipsum",
  "lorem ipsum",
  "Photo By:",
  "your-name-here",
];

function walk(dir, ext, acc = []) {
  for (const e of readdirSync(dir)) {
    const full = join(dir, e);
    if (statSync(full).isDirectory()) walk(full, ext, acc);
    else if (full.endsWith(ext)) acc.push(full);
  }
  return acc;
}

let failed = false;
const htmlFiles = walk(DIST, ".html");
for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  for (const p of FAIL_PATTERNS) {
    if (html.includes(p)) {
      console.error(`✗ placeholder "${p}" found in ${file.replace(DIST, "")}`);
      failed = true;
    }
  }
}

// TODO(client) checklist from source (non-failing)
const srcFiles = walk("src", ".ts").concat(walk("src", ".tsx"));
const todos = new Set();
for (const f of srcFiles) {
  const txt = readFileSync(f, "utf8");
  const re = /TODO\(client\):?\s*([^\n*}]+)/g;
  let m;
  while ((m = re.exec(txt))) todos.add(m[1].trim().replace(/\s+/g, " ").slice(0, 120));
}

if (failed) {
  console.error("\ncheck-placeholders: FAILED");
  process.exit(1);
}
console.log(`check-placeholders: OK — ${htmlFiles.length} HTML files clean.`);
console.log(`\nTODO(client) launch checklist (${todos.size}):`);
[...todos].forEach((t) => console.log("  • " + t));
