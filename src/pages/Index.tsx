import { useState } from "react";
import { HelpTooltip } from "@/components/HelpTooltip";
import { TestContainer } from "@/components/TestContainer";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const Index = () => {
  const [nounCount, setNounCount] = useState(10);
  const [verbCount, setVerbCount] = useState(10);
  const [otherWordCount, setOtherWordCount] = useState(10);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">Spanish Practice</h1>
          <HelpTooltip />
        </div>
      </header>

      {/* Controls */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="space-y-3">
              <Label className="text-base font-medium">
                Nouns: <span className="text-primary font-bold">{nounCount}</span>
              </Label>
              <Slider
                value={[nounCount]}
                onValueChange={(value) => setNounCount(value[0])}
                min={1}
                max={10}
                step={1}
                className="w-full"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-base font-medium">
                Verbs: <span className="text-primary font-bold">{verbCount}</span>
              </Label>
              <Slider
                value={[verbCount]}
                onValueChange={(value) => setVerbCount(value[0])}
                min={1}
                max={10}
                step={1}
                className="w-full"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-base font-medium">
                Other Words: <span className="text-primary font-bold">{otherWordCount}</span>
              </Label>
              <Slider
                value={[otherWordCount]}
                onValueChange={(value) => setOtherWordCount(value[0])}
                min={1}
                max={10}
                step={1}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Test Area */}
      <main className="container mx-auto px-4 flex-1 flex flex-col">
        <TestContainer
          nounCount={nounCount}
          verbCount={verbCount}
          otherWordCount={otherWordCount}
        />
      </main>
    </div>
  );
};

export default Index;
