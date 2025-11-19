import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const HelpTooltip = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="p-2 rounded-full hover:bg-secondary transition-colors">
            <HelpCircle className="w-6 h-6 text-muted-foreground" />
          </button>
        </TooltipTrigger>
        <TooltipContent className="max-w-sm p-4">
          <p className="text-sm leading-relaxed">
            <strong>How it works:</strong> Select how many words from each category to practice. 
            The app will randomly test you in two ways:
            <br /><br />
            <strong>Listening Test:</strong> Click the speaker icon to hear a Spanish word. Try to understand it, 
            then press Next to see the answer.
            <br /><br />
            <strong>Speaking Test:</strong> Read the English word and say the Spanish translation aloud. 
            Press Next to hear and see the correct answer.
            <br /><br />
            This is self-graded - be honest with yourself!
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
