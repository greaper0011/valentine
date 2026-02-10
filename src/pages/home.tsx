import { useState, useEffect } from "react";
import { messages, VALENTINE_DATE } from "@/lib/data";
import CountdownCard from "@/components/CountdownCard";
import ValentineProposal from "@/components/ValentineProposal";
import bgImage from "@/assets/images/romantic-bg.png";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function Home() {
  // Mock Date State for Testing
  const [currentDate, setCurrentDate] = useState(new Date());
  const [devMode, setDevMode] = useState(false); // Hidden feature to test logic
  const [isValentine, setIsValentine] = useState(false);

  useEffect(() => {
    // Check if it's the 14th (or later)
    const checkDate = () => {
      const today = currentDate;
      const valDay = new Date(VALENTINE_DATE + "T00:00:00");
      
      // Simple date comparison
      if (today >= valDay) {
        setIsValentine(true);
      } else {
        setIsValentine(false);
      }
    };
    checkDate();
  }, [currentDate]);

  // Dev Tool: Fast forward time
  const toggleValentineMode = (checked: boolean) => {
    if (checked) {
      setCurrentDate(new Date(VALENTINE_DATE + "T00:00:01"));
    } else {
      setCurrentDate(new Date()); // Reset to real now
    }
  };

  if (isValentine) {
    return (
      <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center">
        {/* Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 opacity-20"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background/80 z-0" />
        
        {/* Content */}
        <div className="relative z-10 w-full">
           <ValentineProposal />
        </div>

        {/* Dev Toggle */}
        <div className="fixed bottom-4 right-4 z-50 opacity-20 hover:opacity-100 transition-opacity bg-white/80 p-2 rounded-lg">
          <div className="flex items-center space-x-2">
            <Switch id="dev-mode" checked={isValentine} onCheckedChange={toggleValentineMode} />
            <Label htmlFor="dev-mode" className="text-xs">Dev: Toggle 14th</Label>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden bg-background">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 opacity-15 fixed"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-5xl">
        <header className="text-center mb-16 space-y-4">
          <h1 className="text-5xl md:text-7xl font-display text-accent drop-shadow-sm">
            Counting Down to You
          </h1>
          <p className="text-xl text-muted-foreground font-sans max-w-2xl mx-auto">
            Every day closer to Valentine's Day is another day I'm grateful for you.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
          {messages.map((msg, index) => {
            const msgDate = new Date(msg.date + "T00:00:00");
            const isLocked = currentDate < msgDate;
            const isToday = currentDate.toDateString() === msgDate.toDateString();

            return (
              <CountdownCard 
                key={msg.date}
                message={msg}
                isLocked={isLocked}
                isToday={isToday}
                index={index}
              />
            );
          })}
        </div>
        
        <footer className="mt-20 text-center text-muted-foreground/60 text-sm font-sans">
          Made with ❤️ just for you.
        </footer>
      </div>

      {/* Dev Toggle */}
      <div className="fixed bottom-4 right-4 z-50 opacity-20 hover:opacity-100 transition-opacity bg-white/80 p-2 rounded-lg">
        <div className="flex items-center space-x-2">
          <Switch id="dev-mode" checked={isValentine} onCheckedChange={toggleValentineMode} />
          <Label htmlFor="dev-mode" className="text-xs">Dev: Toggle 14th</Label>
        </div>
      </div>
    </div>
  );
}
