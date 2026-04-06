/**
 * Represents a Spanish/English word pair used throughout the app.
 */
export interface Word {
  spanish: string;
  english: string;
}

/**
 * The category a word belongs to.
 */
export type WordCategory = "noun" | "verb" | "other";

/**
 * A Word annotated with its category, used internally during test sessions.
 */
export interface TaggedWord extends Word {
  category: WordCategory;
}
