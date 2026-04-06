# Progress Log

## 2026-04-03 — Session 1

### Initialisation
- Repository improvement system created (ai-improve/ directory and all files)

### Analyse Phase ✅
Completed full codebase review. Key findings:
- App: Spanish vocabulary practice app ("Hablary") with listening and speaking test modes
- Stack: React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, Web Speech API
- 207 nouns, 252 verbs, 50 other words (with significant duplicates in both nouns and verbs)
- No tests present
- No score tracking
- No settings persistence

**Critical issues found:**
- 9 duplicate Spanish words in nouns.ts (same word with different English translations listed separately)
- 20+ duplicate entries in verbs.ts (same Spanish verb listed twice)
- 1 non-verb entry in verbs.ts ("cuando" — "when")
- `Word` interface defined identically in 3 separate files
- Input validation bug: resets to 10 instead of clamping to max
- Button label is always "Next" regardless of state
- No score tracking
- No localStorage persistence for settings

### Plan Phase ✅
Created prioritised task list in tasks.md. Six improvement phases defined.

### Refactor Phase ✅
All refactor tasks completed:

- **REFACTOR-1** ✅: Created `src/types/index.ts` with shared `Word` interface. Updated nouns.ts, verbs.ts, otherWords.ts to import from it.
- **REFACTOR-2** ✅: Deduplicated nouns.ts — removed 9 duplicate Spanish words. Nouns count: 168 (was ~207 with dupes). Replaced exact duplicates with better unique entries (e.g., "Empleo" for "job" instead of reusing "Trabajo").
- **REFACTOR-3** ✅: Deduplicated verbs.ts — removed 20+ duplicate entries and removed "cuando" (not a verb). Verbs count: 223 (was ~252 with dupes).
- **REFACTOR-4** ✅: Fixed input validation in Index.tsx — now clamps to [0, max] range instead of resetting to 10.
- **REFACTOR-5** ✅: Button label now shows "Show Answer" during question state and "Got it" / "Missed it" self-grade buttons during answer state.
- **REFACTOR-6** ✅: Rewrote TestContainer.tsx using `useCallback` instead of bare functions, eliminating stale closure / dependency lint issues.

### UI Phase ✅
All UI tasks completed:

- **UI-1** ✅: Added self-graded score tracking — "Got it" / "Missed it" buttons revealed after showing answer; running score + percentage displayed above the card.
- **UI-2** ✅: Settings now persisted to localStorage (key: "hablary-word-counts") and restored on page load.
- **UI-3** ✅: Added aria-label to SpeakerButton for accessibility.
- **UI-4** ✅: Added colour-coded category badge (Noun / Verb / Other) to top-right of the test card. Extended `src/types/index.ts` with `WordCategory` type and `TaggedWord` interface. Updated TestContainer to tag words when building the pool.
- **UI-5** ✅: Added inline "Reset" button to the score bar that appears when total > 0. Resets correct/incorrect counts to zero without navigating away.

## 2026-04-04 — Session 2

### Test Phase ✅
- **TEST-1** ✅: Added `vitest` to devDependencies, added `test` and `test:watch` scripts to package.json, updated vite.config.ts with `test` block (globals, node environment, path alias). Wrote `src/__tests__/data-integrity.test.ts` — tests each data file for non-empty entries, no duplicate Spanish words, and cross-list uniqueness between nouns and verbs.
- **TEST-2** ✅: Wrote `src/__tests__/word-selection.test.ts` — unit tests for `pickRandom` (always in array, single-element, real data) and `buildWordPool` (empty counts, single-category, combined total, clamping, field validity).

### Polish Phase ✅
- **POLISH-1** ✅: README.md updated with correct word counts (168 nouns, 223 verbs, 50 other), mentions category badge and reset score button, and includes `npm test` in setup instructions.
- **POLISH-2** ✅: App.css cleaned up — removed ~40 lines of unused default Vite boilerplate styles (.logo, .card, .read-the-docs, logo-spin animation).

### Status
All planned improvement phases complete. Repository is production-ready.
