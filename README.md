# Spanish Practice App

A simple, self-graded Spanish language learning app that helps you practice common Spanish words through listening and speaking exercises.

I've called it [Hablary](https://word-whip-spanish.lovable.app/), give it a try.

## How It Works

The app tests you on the most common Spanish nouns, verbs, and other words (adjectives, etc.) using two types of exercises:

### Test Types

1. **Listening Test**: Click the speaker icon to hear a Spanish word pronounced with native Spanish pronunciation. Try to understand the word, then press Next to see both the Spanish word and its English translation.

2. **Speaking Test**: See an English word and say the Spanish translation aloud to yourself. Press Next to see and hear the correct Spanish word.

### Features

- Adjustable word counts: Select how many words from each category (nouns, verbs, other words) you want to practice
- Random test selection: The app randomly chooses both the word and test type
- Self-graded: No input required - be honest with yourself!
- Native Spanish pronunciation using Web Speech API
- Visual distinction between question and answer states

### Word Lists

The app includes lists of the 10 most common:
- Spanish nouns (in `src/data/nouns.ts`)
- Conjugated Spanish verbs (in `src/data/verbs.ts`)
- Other Spanish words like adjectives (in `src/data/otherWords.ts`)

You can edit these files to add more words or modify existing ones.

## Project Setup

```sh
# Install dependencies
npm install

# Start development server
npm run dev
```

## Technologies

- React + TypeScript
- Tailwind CSS
- shadcn/ui components
- Web Speech API for Spanish text-to-speech
