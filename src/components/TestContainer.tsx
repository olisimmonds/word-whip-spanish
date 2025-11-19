import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SpeakerButton } from "./SpeakerButton";
import { WordDisplay } from "./WordDisplay";
import { nouns } from "@/data/nouns";
import { verbs } from "@/data/verbs";
import { otherWords } from "@/data/otherWords";
import type { Word } from "@/data/nouns";

interface TestContainerProps {
  nounCount: number;
  verbCount: number;
  otherWordCount: number;
}

type TestType = "listening" | "speaking";
type TestState = "question" | "answer";

export const TestContainer = ({ nounCount, verbCount, otherWordCount }: TestContainerProps) => {
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [testType, setTestType] = useState<TestType>("listening");
  const [testState, setTestState] = useState<TestState>("question");

  const getRandomWord = (): Word => {
    const availableNouns = nouns.slice(0, nounCount);
    const availableVerbs = verbs.slice(0, verbCount);
    const availableOtherWords = otherWords.slice(0, otherWordCount);

    const allWords = [...availableNouns, ...availableVerbs, ...availableOtherWords];
    const randomIndex = Math.floor(Math.random() * allWords.length);
    return allWords[randomIndex];
  };

  const startNewTest = () => {
    const word = getRandomWord();
    const type: TestType = Math.random() < 0.5 ? "listening" : "speaking";
    
    setCurrentWord(word);
    setTestType(type);
    setTestState("question");
  };

  useEffect(() => {
    startNewTest();
  }, [nounCount, verbCount, otherWordCount]);

  const handleNext = () => {
    if (testState === "question") {
      setTestState("answer");
    } else {
      startNewTest();
    }
  };

  if (!currentWord) return null;

  const isQuestion = testState === "question";
  const backgroundColor = isQuestion ? "bg-question" : "bg-answer";

  return (
    <div className="flex flex-col items-center justify-center flex-1 py-12">
      <div className={`${backgroundColor} rounded-3xl p-12 w-full max-w-2xl min-h-[400px] flex flex-col items-center justify-center space-y-8 transition-colors duration-300`}>
        {testType === "listening" ? (
          // Listening Test
          <>
            {isQuestion ? (
              <div className="flex flex-col items-center space-y-6">
                <p className="text-lg text-muted-foreground mb-4">Listen to the Spanish word:</p>
                <SpeakerButton text={currentWord.spanish} size="lg" />
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-6">
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
          // Speaking Test
          <>
            {isQuestion ? (
              <div className="flex flex-col items-center space-y-6">
                <p className="text-lg text-muted-foreground mb-4">Say this word in Spanish:</p>
                <WordDisplay word={currentWord.english} />
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-6">
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

      <Button
        onClick={handleNext}
        size="lg"
        className="mt-8 px-12 py-6 text-lg"
      >
        Next
      </Button>
    </div>
  );
};
