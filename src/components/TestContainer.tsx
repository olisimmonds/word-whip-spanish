import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { SpeakerButton } from "./SpeakerButton";
import { WordDisplay } from "./WordDisplay";
import { nouns } from "@/data/nouns";
import { verbs } from "@/data/verbs";
import { otherWords } from "@/data/otherWords";
import type { Word } from "@/types";
import { CheckCircle, XCircle } from "lucide-react";

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

export const TestContainer = ({ nounCount, verbCount, otherWordCount }: TestContainerProps) => {
  const buildWordPool = useCallback(() => {
    return [
      ...nouns.slice(0, nounCount),
      ...verbs.slice(0, verbCount),
      ...otherWords.slice(0, otherWordCount),
    ];
  }, [nounCount, verbCount, otherWordCount]);

  const newTest = useCallback((): { word: Word; testType: TestType } => {
    const pool = buildWordPool();
    const word = pool.length > 0 ? pickRandom(pool) : { spanish: "Hola", english: "Hello" };
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

  const isQuestion = testState === "question";
  const backgroundColor = isQuestion ? "bg-question" : "bg-answer";
  const total = score.correct + score.incorrect;

  return (
    <div className="flex flex-col items-center justify-center flex-1 py-12">
      {/* Score bar */}
      {total > 0 && (
        <div className="flex items-center gap-4 mb-6 text-sm font-medium">
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
        </div>
      )}

      <div className={`${backgroundColor} rounded-3xl p-8 md:p-12 w-full max-w-2xl min-h-[400px] flex flex-col items-center justify-center space-y-8 transition-colors duration-300 shadow-lg`}>
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
