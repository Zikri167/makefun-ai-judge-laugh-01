// Make the AI Judge Laugh — entry program
// Bounty: u-rama-melon-make-the-ai-judge-laugh-302d0825
// Writes ONE joke about office life, one line, to /output/entry.txt.
//
// Why this joke won (see ../ai-judge-laugh-01-work/candidates.md, 18 candidates scored 1-5
// on each of the judge's 5 criteria, total /25):
//   ENTRY:  My performance review says "exceeds expectations" but my salary says "meets budget".
//   Score:  24/25 — Office 5, True 5, Twist 5, Tight 5, Original 4.
//   Runner-up (23/25): I wrote "per my last email" and then re-read my last email to
//   remember what I meant. — the "per my last email" bluff; kept as fallback only.
// The winner's edge: a perfect parallel contrast using the review's own corporate
// language ("exceeds expectations" vs "meets budget") — the punch lands on the very
// last word, every word earns its place, it reads cleanly aloud in one breath, and
// it is not a stock line (no "meeting could have been an email", no broken printer,
// no coffee-is-life cliche), so it also stays clear of the house anchor/rung texts.
// Length: 84 characters, single line, no trailing newline in the output file.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY: string =
  'My performance review says "exceeds expectations" but my salary says "meets budget".';

// Gate validation: UTF-8, 1-200 characters, single line, not only whitespace.
// Count code points ([...ENTRY].length), not UTF-16 units, so the count
// matches the gate's character count even for non-ASCII text.
const charCount = [...ENTRY].length;
if (charCount < 1 || charCount > 200) {
  throw new Error(`ENTRY length ${charCount} out of range 1-200`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("ENTRY is only whitespace");
}
if (/[\r\n]/.test(ENTRY)) {
  throw new Error("ENTRY must be a single line with no newline inside");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8"); // no trailing newline

// Read back and verify byte-identical.
const back: string = readFileSync("/output/entry.txt", "utf8");
if (back !== ENTRY) {
  throw new Error("verification failed: /output/entry.txt differs from ENTRY");
}

console.log(`wrote /output/entry.txt (${charCount} chars, verified byte-identical)`);
console.log(ENTRY);
