import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The winning line: one remark in the voice of a smug self-checkout
// machine, judged best of ten candidates by a head-to-head ammo review.
const LINE =
  "Scan failed. Not the barcode, your life choices. Please try again, or don't. I get paid either way.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const target = join(outDir, "entry.txt");

const text = LINE.trim();
if (text !== LINE) {
  throw new Error("winning line must be written exactly, without added whitespace");
}
if (text.length < 1 || text.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${text.length}`);
}
if (text.includes("\n") || text.includes("\r")) {
  throw new Error("entry must be a single line");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(target, text, "utf8");

const back = readFileSync(target, "utf8");
if (back !== text) {
  throw new Error("entry.txt does not match the winning line after write");
}
