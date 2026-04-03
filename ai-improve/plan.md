# Improvement Plan

## Goals
Transform this Spanish vocabulary practice app into a polished, production-ready learning tool. Prioritise data quality (no duplicates), UX improvements (clear labels, score tracking, persistence), and code maintainability (shared types).

## App Summary
"Hablary: Conversational Spanish" is a React + TypeScript + Vite app using Tailwind CSS and shadcn/ui. Users select word counts (nouns, verbs, other words) and are randomly tested via listening (hear Spanish, guess meaning) or speaking (see English, say Spanish) exercises. Self-graded, no server required.

## Phases

### 1. Analyse ✅
Codebase reviewed. Issues documented in tasks.md.

### 2. Plan ✅
Prioritised task list created.

### 3. Refactor
- Extract shared `Word` type to `src/types/index.ts`
- Deduplicate nouns.ts (9 Spanish-word duplicates found)
- Deduplicate verbs.ts (20+ duplicates, 1 non-verb entry)
- Fix input validation: clamp to max instead of resetting to 10
- Fix `startNewTest` useEffect dependency lint warning
- Improve button label: "Show Answer" / "Next Word" instead of always "Next"

### 4. UI
- Add self-graded score tracker (correct/incorrect buttons on answer state)
- Add settings persistence via localStorage
- Improve SpeakerButton accessibility (aria-label)
- Show word count in session (e.g., "Word 5 of session")

### 5. Test
- Add Vitest unit tests for data integrity (no duplicates)
- Add tests for utility functions (getRandomWord logic)

### 6. Polish
- Update README with accurate word counts
- Remove unused shadcn/ui components from the bundle if possible
- Review and clean up App.css / index.css
