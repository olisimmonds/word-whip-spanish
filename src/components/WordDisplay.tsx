interface WordDisplayProps {
  word: string;
  translation?: string;
  isAnswer?: boolean;
}

export const WordDisplay = ({ word, translation, isAnswer = false }: WordDisplayProps) => {
  return (
    <div className="text-center space-y-4">
      <div className={`text-4xl font-bold ${isAnswer ? "text-primary" : "text-foreground"}`}>
        {word}
      </div>
      {translation && (
        <div className="text-2xl text-muted-foreground">
          {translation}
        </div>
      )}
    </div>
  );
};
