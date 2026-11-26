// Entry for the make.fun bounty "The Moon Gets One Star"
// (u-eager-stork-81-9647-the-moon-gets-one-star-768236e5).
//
// The task: write the funniest one-star review of the Moon, at most
// 120 characters, to /output/entry.txt.
//
// Why this line: it opens with the rating ("One star."), then piles up
// grievances that could only be about the Moon — it only ever shows up
// at night, it ignores us, and after 4.5 billion years the tides it is
// supposed to run are still broken. The joke is a real reviewer's
// complaint, not a slogan, and it steers clear of the obvious
// craters/cheese/brightness gags the brief warns against. The punchline
// lands on the last words, well before the 120-character limit.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "One star. Works nights only, never answers messages, and after 4.5 billion years the tides are still broken.";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Check the gate ourselves before trusting the write: 1 to 120
// characters, a single line, no trailing newline, not only whitespace.
if (LINE.length < 1 || LINE.length > 120) {
  throw new Error(`Line length ${LINE.length} is outside the 1-120 gate.`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("Line must be a single line with no newline characters.");
}
if (LINE.trim().length === 0) {
  throw new Error("Line must not be only whitespace.");
}

// Read the file back and compare byte-for-byte, so a silent write
// failure can never slip through unnoticed.
const readBack = readFileSync("/output/entry.txt", "utf8");
if (readBack !== LINE) {
  throw new Error(
    `Read-back mismatch: wrote ${JSON.stringify(LINE)} but read ${JSON.stringify(readBack)}.`,
  );
}

console.log(`Wrote ${LINE.length} characters:`);
console.log(LINE);
