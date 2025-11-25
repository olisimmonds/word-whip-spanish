import { useState } from "react";
import { HelpTooltip } from "@/components/HelpTooltip";
import { TestContainer } from "@/components/TestContainer";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { nouns } from "@/data/nouns";
import { verbs } from "@/data/verbs";
import { otherWords } from "@/data/otherWords";

const Index = () => {
  const [nounCount, setNounCount] = useState(10);
  const [verbCount, setVerbCount] = useState(10);
  const [otherWordCount, setOtherWordCount] = useState(10);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const maxNouns = nouns.length;
  const maxVerbs = verbs.length;
  const maxOtherWords = otherWords.length;

  const handleNumberInput = (value: string, setter: (value: number) => void, max: number) => {
    if (value === "") {
      setter(0);
      return;
    }
    const num = parseInt(value);
    if (isNaN(num) || num < 0 || num > max) {
      setter(10);
    } else {
      setter(num);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col pt-16">
      {/* Header - Fixed */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold text-primary">Hablary: Conversational Spanish</h1>
          <HelpTooltip />
        </div>
      </header>

      {/* Controls - Collapsible */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4">
          <Collapsible open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full py-4 px-2 hover:opacity-80 transition-opacity">
              <span className="text-lg font-semibold text-primary whitespace-nowrap overflow-hidden text-ellipsis">Word Settings</span>
              <ChevronDown className={`h-5 w-5 flex-shrink-0 ml-2 transition-transform ${isSettingsOpen ? "rotate-180" : ""}`} />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto pb-6">
                <div className="space-y-3">
                  <Label className="text-base font-medium">
                    Nouns (max {maxNouns})
                  </Label>
                  <Input
                    type="number"
                    value={nounCount}
                    onChange={(e) => handleNumberInput(e.target.value, setNounCount, maxNouns)}
                    min={0}
                    max={maxNouns}
                    className="w-full"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-medium">
                    Verbs (max {maxVerbs})
                  </Label>
                  <Input
                    type="number"
                    value={verbCount}
                    onChange={(e) => handleNumberInput(e.target.value, setVerbCount, maxVerbs)}
                    min={0}
                    max={maxVerbs}
                    className="w-full"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-medium">
                    Other Words (max {maxOtherWords})
                  </Label>
                  <Input
                    type="number"
                    value={otherWordCount}
                    onChange={(e) => handleNumberInput(e.target.value, setOtherWordCount, maxOtherWords)}
                    min={0}
                    max={maxOtherWords}
                    className="w-full"
                  />
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
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
