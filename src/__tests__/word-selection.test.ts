import { describe, it, expect } from "vitest";
import { nouns } from "@/data/nouns";
import { verbs } from "@/data/verbs";
import { otherWords } from "@/data/otherWords";
import type { Word } from "@/types";
import { pickRandom } from "@/lib/utils";

// ─── buildWordPool utility (mirrors TestContainer logic) ─────────────────────

const buildWordPool = (nounCount: number, verbCount: number, otherCount: number): Word[] => [
  ...nouns.slice(0, nounCount),
  ...verbs.slice(0, verbCount),
  ...otherWords.slice(0, otherCount),
];

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("pickRandom", () => {
  it("always returns an element from the array", () => {
    const arr = [1, 2, 3, 4, 5];
    for (let i = 0; i < 100; i++) {
      expect(arr).toContain(pickRandom(arr));
    }
  });

  it("returns the only element when array has one item", () => {
    expect(pickRandom(["solo"])).toBe("solo");
  });

  it("returns a defined value from a real word list", () => {
    const word = pickRandom(nouns);
    expect(word).toBeDefined();
    expect(word.spanish).toBeTruthy();
  });
});

describe("buildWordPool", () => {
  it("returns empty array when all counts are 0", () => {
    expect(buildWordPool(0, 0, 0)).toHaveLength(0);
  });

  it("returns exactly nounCount words when only nouns requested", () => {
    const pool = buildWordPool(10, 0, 0);
    expect(pool).toHaveLength(10);
    expect(pool.every((w) => nouns.some((n) => n.spanish === w.spanish))).toBe(true);
  });

  it("returns combined total of all categories", () => {
    const pool = buildWordPool(5, 5, 5);
    expect(pool).toHaveLength(15);
  });

  it("clamps to available data when count exceeds list size", () => {
    const pool = buildWordPool(9999, 0, 0);
    expect(pool).toHaveLength(nouns.length);
  });

  it("pool words all have spanish and english fields", () => {
    const pool = buildWordPool(10, 10, 10);
    for (const word of pool) {
      expect(word.spanish).toBeTruthy();
      expect(word.english).toBeTruthy();
    }
  });
});
