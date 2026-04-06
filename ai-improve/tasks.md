# Tasks

## Completed

- [x] **REFACTOR-1**: Extract shared `Word` interface to `src/types/index.ts`
- [x] **REFACTOR-2**: Deduplicate nouns.ts (168 unique entries, down from ~207)
- [x] **REFACTOR-3**: Deduplicate verbs.ts (223 unique entries, down from ~252); removed "cuando" (not a verb)
- [x] **REFACTOR-4**: Fix input validation in Index.tsx — clamp to [0, max]
- [x] **REFACTOR-5**: Improve button labels — "Show Answer" / "Got it" / "Missed it"
- [x] **REFACTOR-6**: Rewrite TestContainer.tsx with `useCallback` (no stale closure issues)
- [x] **UI-1**: Add self-graded score tracking with running correct/incorrect count and percentage
- [x] **UI-2**: Persist word count settings to localStorage
- [x] **UI-3**: Add aria-label to SpeakerButton
- [x] **UI-4**: Word category badge on card — colour-coded Noun / Verb / Other badge in card top-right
- [x] **UI-5**: Reset score button — appears in score bar when total > 0; resets score to zero
- [x] **TEST-1**: Add Vitest dev dependency; write data integrity tests (no duplicates, non-empty fields, cross-list uniqueness) in `src/__tests__/data-integrity.test.ts`
- [x] **TEST-2**: Unit tests for word selection logic (pickRandom, buildWordPool) in `src/__tests__/word-selection.test.ts`
- [x] **POLISH-1**: Updated README.md — correct word counts (168 nouns, 223 verbs, 50 other), mentions category badge, reset button, and `npm test`
- [x] **POLISH-2**: Cleaned up App.css — removed unused Vite boilerplate styles

## Pending

_(No remaining tasks. Polish phase complete.)_
