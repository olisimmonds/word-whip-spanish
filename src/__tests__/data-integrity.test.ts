import { describe, it, expect } from "vitest";
import { nouns } from "@/data/nouns";
import { verbs } from "@/data/verbs";
import { otherWords } from "@/data/otherWords";
import type { Word } from "@/types";

// ─── Helpers ────────────────────────────────────────────────────────────────

const findDuplicateSpanish = (words: Word[]): string[] => {
  const seen = new Set<string>();
  const dupes: string[] = [];
  for (const { spanish } of words) {
    const key = spanish.toLowerCase().trim();
    if (seen.has(key)) dupes.push(spanish);
    else seen.add(key);
  }
  return dupes;
};

const findEmptyFields = (words: Word[]): { index: number; field: string }[] => {
  const issues: { index: number; field: string }[] = [];
  words.forEach(({ spanish, english }, i) => {
    if (!spanish || !spanish.trim()) issues.push({ index: i, field: "spanish" });
    if (!english || !english.trim()) issues.push({ index: i, field: "english" });
  });
  return issues;
};

// ─── Nouns ───────────────────────────────────────────────────────────────────

describe("nouns.ts", () => {
  it("has entries", () => {
    expect(nouns.length).toBeGreaterThan(0);
  });

  it("has no duplicate Spanish words", () => {
    const dupes = findDuplicateSpanish(nouns);
    expect(dupes, `Duplicate nouns found: ${dupes.join(", ")}`).toHaveLength(0);
  });

  it("has no empty spanish or english fields", () => {
    const issues = findEmptyFields(nouns);
    expect(issues, `Empty fields in nouns: ${JSON.stringify(issues)}`).toHaveLength(0);
  });

  it("all entries are plain objects with spanish and english strings", () => {
    for (const word of nouns) {
      expect(word).toHaveProperty("spanish");
      expect(word).toHaveProperty("english");
      expect(typeof word.spanish).toBe("string");
      expect(typeof word.english).toBe("string");
    }
  });
});

// ─── Verbs ───────────────────────────────────────────────────────────────────

describe("verbs.ts", () => {
  it("has entries", () => {
    expect(verbs.length).toBeGreaterThan(0);
  });

  it("has no duplicate Spanish words", () => {
    const dupes = findDuplicateSpanish(verbs);
    expect(dupes, `Duplicate verbs found: ${dupes.join(", ")}`).toHaveLength(0);
  });

  it("has no empty spanish or english fields", () => {
    const issues = findEmptyFields(verbs);
    expect(issues, `Empty fields in verbs: ${JSON.stringify(issues)}`).toHaveLength(0);
  });

  it("all entries are plain objects with spanish and english strings", () => {
    for (const word of verbs) {
      expect(word).toHaveProperty("spanish");
      expect(word).toHaveProperty("english");
      expect(typeof word.spanish).toBe("string");
      expect(typeof word.english).toBe("string");
    }
  });
});

// ─── Other words ─────────────────────────────────────────────────────────────

describe("otherWords.ts", () => {
  it("has entries", () => {
    expect(otherWords.length).toBeGreaterThan(0);
  });

  it("has no duplicate Spanish words", () => {
    const dupes = findDuplicateSpanish(otherWords);
    expect(dupes, `Duplicate other words found: ${dupes.join(", ")}`).toHaveLength(0);
  });

  it("has no empty spanish or english fields", () => {
    const issues = findEmptyFields(otherWords);
    expect(issues, `Empty fields in otherWords: ${JSON.stringify(issues)}`).toHaveLength(0);
  });

  it("all entries are plain objects with spanish and english strings", () => {
    for (const word of otherWords) {
      expect(word).toHaveProperty("spanish");
      expect(word).toHaveProperty("english");
      expect(typeof word.spanish).toBe("string");
      expect(typeof word.english).toBe("string");
    }
  });
});

// ─── Cross-list uniqueness ────────────────────────────────────────────────────

describe("cross-list uniqueness", () => {
  it("nouns and verbs share no Spanish words", () => {
    const nounSet = new Set(nouns.map((w) => w.spanish.toLowerCase().trim()));
    const overlap = verbs
      .map((w) => w.spanish.toLowerCase().trim())
      .filter((s) => nounSet.has(s));
    expect(overlap, `Words appear in both nouns and verbs: ${overlap.join(", ")}`).toHaveLength(0);
  });
});
