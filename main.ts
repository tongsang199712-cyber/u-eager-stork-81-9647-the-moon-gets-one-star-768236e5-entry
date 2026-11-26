// "The Moon Gets One Star" — make.fun bounty entry
// slug: u-eager-stork-81-9647-the-moon-gets-one-star-768236e5
//
// The brief asks for the funniest one-star review of the Moon in 120
// characters or fewer, written to /output/entry.txt. The judge rewards
// a grievance that could only be about the Moon, so this review stacks
// four of them, each one a documented lunar habit:
//
//   1. "Same face nightly"    — tidal locking: the Moon never turns
//      its back on us, we have seen one side for all of human history.
//   2. "disappears monthly"   — the new moon: it clocks out completely
//      for days in every cycle, no notice given.
//   3. "floods the coast"     — its one actual job is the tides, and
//      its idea of doing that job is regularly soaking the shoreline.
//   4. "drifts 4cm further away every year" — lunar recession: it is
//      measurably quitting, about 4 centimetres further out annually.
//
// The closer, "Rude.", is the whole review in miniature: after four
// billion years of this behaviour, a one-word verdict is all the
// effort the Moon has earned back. No crater, cheese or glow jokes —
// the brief calls those the obvious ones, and they are.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { Buffer } from "node:buffer";

const OUTPUT_PATH = "/output/entry.txt";
const MAX_CHARS = 120;

// The review is assembled from its grievances so the structure reads
// the way a fed-up reviewer actually writes: rating first, then the
// list of complaints, then the verdict.
const RATING = "1 star.";
const COMPLAINTS = [
  "Same face nightly",
  "disappears monthly",
  "floods the coast",
  "then drifts 4cm further away every year",
];
const VERDICT = "Rude.";

// Joined as: rating, the complaint list with "then" before the last
// item, a full stop, and the one-word verdict.
const head = COMPLAINTS.slice(0, -1).join(", ");
const tail = COMPLAINTS.at(-1)!.replace(/^then /, "");
const review = `${RATING} ${head}, then ${tail}. ${VERDICT}`;

// Gate checks, run before anything touches disk: the scorer wants
// UTF-8 text of 1..120 characters, not only whitespace. On top of
// that this program holds itself to a single line with no trailing
// newline, so the file is exactly the review and nothing else.
function assertGate(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(`review is ${chars} characters, outside 1-${MAX_CHARS}`);
  }
  if (text.trim().length === 0) {
    throw new Error("review must not be only whitespace");
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("review must be a single line");
  }
  if (text !== text.trim()) {
    throw new Error("review must not carry leading or trailing whitespace");
  }
}

assertGate(review);

mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, review, { encoding: "utf8", flag: "w" });

// Read the artifact back and compare it byte for byte with what was
// intended; a short write or an encoding surprise fails loudly here
// instead of quietly in front of the judge.
const onDisk = readFileSync(OUTPUT_PATH);
if (!onDisk.equals(Buffer.from(review, "utf8"))) {
  throw new Error(`artifact mismatch: disk holds ${JSON.stringify(onDisk.toString("utf8"))}`);
}

console.log(`entry.txt: ${[...review].length} chars, ${onDisk.length} bytes`);
console.log(review);
