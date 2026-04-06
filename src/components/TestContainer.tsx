import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SpeakerButton } from "./SpeakerButton";
import { WordDisplay } from "./WordDisplay";
import { nouns } from "@/data/nouns";
import { verbs } from "@/data/verbs";
import { otherWords } from "@/data/otherWords";
import type { TaggedWord } from "@/types";
import { CheckCircle, XCircle, RotateCcw } from "lucide-react";

interface TestContainerProps {
  nounCount: number;
  verbCount: number;
  otherWordCount: number;
}

type TestType = "listening" | "speaking";
type TestState = "question" | "answer";

interface Score {
  correct: number;
  incorrect: number;
}

const pickRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const CATEGORY_LABELS: Record<TaggedWord["category"], string> = {
  noun: "Noun",
  verb: "Verb",
  other: "Other",
};

const CATEGORY_STYLES: Record<TaggedWord["category"], string> = {
  noun: "bg-blue-100 text-blue-700 border-blue-200",
  verb: "bg-purple-100 text-purple-700 border-purple-200",
  other: "bg-amber-100 text-amber-700 border-amber-200",
};

export const TestContainer = ({ nounCount, verbCount, otherWordCount }: TestContainerProps) => {
  const buildWordPool = useCallback((): TaggedWord[] => {
    return [
      ...nouns.slice(0, nounCount).map((w) => ({ ...w, category: "noun" as const })),
      ...verbs.slice(0, verbCount).map((w) => ({ ...w, category: "verb" as const })),
      ...otherWords.slice(0, otherWordCount).map((w) => ({ ...w, category: "other" as const })),
    ];
  }, [nounCount, verbCount, otherWordCount]);

  const newTest = useCallback((): { word: TaggedWord; testType: TestType } => {
    const pool = buildWordPool();
    const word: TaggedWord =
      pool.length > 0
        ? pickRandom(pool)
        : { spanish: "Hola", english: "Hello", category: "other" };
    const testType: TestType = Math.random() < 0.5 ? "listening" : "speaking";
    return { word, testType };
  }, [buildWordPool]);

  const [{ word: currentWord, testType }, setTest] = useState(() => newTest());
  const [testState, setTestState] = useState<TestState>("question");
  const [score, setScore] = useState<Score>({ correct: 0, incorrect: 0 });

  const startNewTest = useCallback(() => {
    setTest(newTest());
    setTestState("question");
  }, [newTest]);

  const handleReveal = () => {
    setTestState("answer");
  };

  const handleGrade = (correct: boolean) => {
    setScore((prev) => ({
      correct: prev.correct + (correct ? 1 : 0),
      incorrect: prev.incorrect + (correct ? 0 : 1),
    }));
    startNewTest();
  };

  const handleResetScore = () => {
    setScore({ correct: 0, incorrect: 0 });
  };

  const isQuestion = testState === "question";
  const backgroundColor = isQuestion ? "bg-question" : "bg-answer";
  const total = score.correct + score.incorrect;

  return (
    <div className="flex flex-col items-center justify-center flex-1 py-12">
      {/* Score bar */}
      <div className="flex items-center gap-4 mb-6 text-sm font-medium min-h-[28px]">
        {total > 0 ? (
          <>
            <span className="flex items-center gap-1 text-green-600">
              <CheckCircle className="w-4 h-4" />
              {score.correct}
            </span>
            <span className="text-muted-foreground">|</span>
            <span className="flex items-center gap-1 text-red-500">
              <XCircle className="w-4 h-4" />
              {score.incorrect}
            </span>
            <span className="text-muted-foreground text-xs">
              ({Math.round((score.correct / total) * 100)}%)
            </span>
            <button
              onClick={handleResetScore}
              className="ml-2 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Reset score"
              title="Reset score"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          </>
        ) : null}
      </div>

      <div
        className={`${backgroundColor} rounded-3xl p-8 md:p-12 w-full max-w-2xl min-h-[400px] flex flex-col items-center justify-center space-y-8 transition-colors duration-300 shadow-lg relative`}
      >
        {/* Category badge */}
        <div className="absolute top-4 right-4">
          <Badge
            variant="outline"
            className={`text-xs font-medium ${CATEGORY_STYLES[currentWord.category]}`}
          >
            {CATEGORY_LABELS[currentWord.category]}
          </Badge>
        </div>

        {testType === "listening" ? (
          // Listening Test: hear Spanish, guess the meaning
          <>
            {isQuestion ? (
              <div className="flex flex-col items-center space-y-6">
                <p className="text-lg text-muted-foreground mb-4">Listen to the Spanish word:</p>
                <SpeakerButton text={currentWord.spanish} size="lg" />
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-6">
                <p className="text-lg text-muted-foreground mb-4">Correct answer:</p>
                <WordDisplay
                  word={currentWord.spanish}
                  translation={currentWord.english}
                  isAnswer={true}
                />
                <SpeakerButton text={currentWord.spanish} size="default" />
              </div>
            )}
          </>
        ) : (
          // Speaking Test: see English, say the Spanish
          <>
            {isQuestion ? (
              <div className="flex flex-col items-center space-y-6">
                <p className="text-lg text-muted-foreground mb-4">Say this word in Spanish:</p>
                <WordDisplay word={currentWord.english} />
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-6">
                <p className="text-lg text-muted-foreground mb-4">Correct answer:</p>
                <WordDisplay
                  word={currentWord.spanish}
                  translation={currentWord.english}
                  isAnswer={true}
                />
                <SpeakerButton text={currentWord.spanish} size="default" />
              </div>
            )}
          </>
        )}
      </div>

      {isQuestion ? (
        <Button
          onClick={handleReveal}
          size="lg"
          className="mt-8 px-12 py-6 text-lg shadow-md w-[80%] max-w-[640px]"
        >
          Show Answer
        </Button>
      ) : (
        <div className="mt-8 flex gap-4 w-[80%] max-w-[640px]">
          <Button
            onClick={() => handleGrade(true)}
            size="lg"
            className="flex-1 py-6 text-lg shadow-md bg-green-600 hover:bg-green-700 text-white"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Got it
          </Button>
          <Button
            onClick={() => handleGrade(false)}
            size="lg"
            variant="outline"
            className="flex-1 py-6 text-lg shadow-md border-red-400 text-red-500 hover:bg-red-50"
          >
            <XCircle className="w-5 h-5 mr-2" />
            Missed it
          </Button>
        </div>
      )}
    </div>
  );
};
