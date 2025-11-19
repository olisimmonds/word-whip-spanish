import { Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SpeakerButtonProps {
  text: string;
  size?: "default" | "lg";
}

export const SpeakerButton = ({ text, size = "default" }: SpeakerButtonProps) => {
  const speak = () => {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-ES"; // Spanish pronunciation
    utterance.rate = 0.9; // Slightly slower for learning
    utterance.pitch = 1;
    utterance.volume = 1;

    window.speechSynthesis.speak(utterance);
  };

  return (
    <Button
      onClick={speak}
      size={size === "lg" ? "lg" : "default"}
      className={`${
        size === "lg" ? "w-32 h-32" : "w-20 h-20"
      } rounded-full bg-primary hover:bg-primary/90 transition-all hover:scale-105`}
    >
      <Volume2 className={size === "lg" ? "w-16 h-16" : "w-10 h-10"} />
    </Button>
  );
};
