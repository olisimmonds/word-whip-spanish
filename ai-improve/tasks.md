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

## Pending

- [ ] **TEST-1**: Add Vitest dev dependency and write data integrity tests (no duplicates, all entries have non-empty spanish/english fields)
- [ ] **TEST-2**: Unit tests for word selection utility (pickRandom coverage)
- [ ] **POLISH-1**: Update README.md — replace "x most common" with actual counts (168 nouns, 223 verbs, 50 other words)
- [ ] **POLISH-2**: Clean up App.css (remove unused default Vite styles)
- [ ] **UI-4**: Show word category badge on the card (Noun / Verb / Other) so users can see what type they're being tested on
- [ ] **UI-5**: Add a reset score button
