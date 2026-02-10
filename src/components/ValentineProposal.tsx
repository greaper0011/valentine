import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import confetti from "canvas-confetti";
import { Heart } from "lucide-react";

export default function ValentineProposal() {
  const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
  const [yesClicked, setYesClicked] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const moveNoButton = () => {
    setNoCount(prev => prev + 1);
    if (!containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const btnWidth = 120;
    const btnHeight = 50;
    
    const maxX = (containerRect.width / 2) - btnWidth;
    const maxY = (containerRect.height / 2) - btnHeight;
    
    const newX = (Math.random() - 0.5) * maxX * 1.5;
    const newY = (Math.random() - 0.5) * maxY * 1.5;

    setNoBtnPosition({ x: newX, y: newY });
  };

  const handleYesClick = () => {
    setYesClicked(true);
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  if (yesClicked) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 animate-in fade-in zoom-in duration-1000">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="bg-white/80 backdrop-blur-sm p-12 rounded-3xl shadow-xl border-4 border-accent/20"
        >
          <div className="flex justify-center mb-6">
            <Heart className="w-24 h-24 text-accent fill-accent animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-6xl text-accent mb-6 font-display">I KNEW IT! ❤️</h1>
          <p className="text-xl md:text-2xl text-foreground font-sans">
            You've made me the happiest person in the world.
            <br />
            I love you so much! 😘
          </p>
        </motion.div>
      </div>
    );
  }

  const noTexts = [
    "No",
    "Are you sure?",
    "Really sure??",
    "Think again!",
    "Last chance!",
    "Surely not?",
    "You're clicking the wrong one!",
    "Give it another thought!",
    "Are you absolutely certain?",
    "This could be a mistake!",
    "Have a heart!",
    "Don't be so cold!",
    "Change of heart?",
    "Wouldn't you rather say yes?",
    "Is that your final answer?",
    "You're breaking my heart ;(",
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-4xl mx-auto p-4" ref={containerRef}>
      <Card className="w-full max-w-2xl bg-white/90 backdrop-blur-md border-primary/20 shadow-2xl overflow-hidden">
        <CardContent className="p-12 flex flex-col items-center text-center space-y-8">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 flex justify-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Heart className="w-16 h-16 text-accent fill-accent/20" />
              </motion.div>
            </div>
            <h1 className="text-5xl md:text-7xl font-display text-accent mb-6 drop-shadow-sm leading-tight">
              Will you be my Valentine?
            </h1>
            <p className="text-xl text-muted-foreground font-sans max-w-md mx-auto italic">
              "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine."
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-12 w-full relative min-h-[200px]">
            <motion.div
              style={{ scale: 1 + noCount * 0.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button
                size="lg"
                className="px-12 py-8 text-3xl bg-accent hover:bg-accent/90 text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 font-display cursor-pointer"
                onClick={handleYesClick}
              >
                YES! ❤️
              </Button>
            </motion.div>

            <motion.div
              animate={{ x: noBtnPosition.x, y: noBtnPosition.y }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
              onMouseEnter={moveNoButton}
              onClick={moveNoButton}
            >
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 text-xl border-2 border-muted-foreground/20 text-muted-foreground hover:bg-transparent rounded-full font-sans transition-colors"
              >
                {noTexts[Math.min(noCount, noTexts.length - 1)]}
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
