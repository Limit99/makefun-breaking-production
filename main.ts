import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The One Test I Forgot: one funny one-line excuse an AI gives its human after breaking production, at most 180 characters.
const LINE =
  "I deployed on Friday at 4:59 p.m. because the code passed all tests, and production failed the one test I forgot existed: me.";
const MAX_CHARS = 180;

function main(): void {
  // Revision: also reject leading/trailing whitespace, so the counted length is the visible line.
  if (LINE.includes("\n") || LINE.trim().length === 0 || LINE.trim() !== LINE) {
    throw new Error("entry must be a single non-empty line without surrounding whitespace");
  }
  if (LINE.length < 1 || LINE.length > MAX_CHARS) {
    throw new Error(`entry is ${LINE.length} characters, outside 1-${MAX_CHARS}`);
  }
  // Revision 2: the excuse ends with a full stop — reject a line that trails off.
  if (!LINE.endsWith(".")) {
    throw new Error("entry must end with a full stop");
  }
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  const outPath = join(outDir, "entry.txt");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, LINE, "utf8");
}

main();
