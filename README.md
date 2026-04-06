# Spanish Practice App

A simple, self-graded Spanish language learning app that helps you practice common Spanish words through listening and speaking exercises.

I've called it [Hablary](https://word-whip-spanish.lovable.app/), give it a try.

## How It Works

The app tests you on the most common Spanish nouns, verbs, and other words (adjectives, etc.) using two types of exercises:

### Test Types

1. **Listening Test**: Click the speaker icon to hear a Spanish word pronounced with native Spanish pronunciation. Try to understand the word, then press "Show Answer" to see both the Spanish word and its English translation.

2. **Speaking Test**: See an English word and say the Spanish translation aloud to yourself. Press "Show Answer" to see and hear the correct Spanish word.

After revealing the answer, tap **Got it** if you were correct or **Missed it** if not. The app tracks your running score and percentage for the session.

### Features

- Adjustable word counts: Select how many words from each category (nouns, verbs, other words) you want to practice
- Settings are saved automatically and restored when you return
- Random test selection: The app randomly chooses both the word and test type
- Self-graded: No input required — be honest with yourself!
- Native Spanish pronunciation using Web Speech API
- Visual distinction between question and answer states
- Running score tracker (correct / incorrect / percentage) with a reset button
- Category badge on each card showing whether the word is a Noun, Verb, or Other

### Word Lists

The app includes the following unique, deduplicated word lists:

- **168 Spanish nouns** (in `src/data/nouns.ts`)
- **223 conjugated Spanish verbs and infinitives** (in `src/data/verbs.ts`)
- **50 other Spanish words** — adjectives, adverbs, and pronouns (in `src/data/otherWords.ts`)

You can edit these files to add more words or modify existing ones. Words follow the `Word` interface from `src/types/index.ts`:

```ts
interface Word {
  spanish: string;
  english: string;
}
```

## Project Setup

```sh
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test
```

## Technologies

- React + TypeScript
- Tailwind CSS
- shadcn/ui components
- Web Speech API for Spanish text-to-speech
- Vitest for unit and data integrity tests
