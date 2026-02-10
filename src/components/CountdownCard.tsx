import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Gift } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DailyMessage } from "@/lib/data";

interface CountdownCardProps {
  message: DailyMessage;
  isLocked: boolean;
  isToday: boolean;
  index: number;
}

export default function CountdownCard({ message, isLocked, isToday, index }: CountdownCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card 
        className={cn(
          "h-full transition-all duration-300 border-2 overflow-hidden relative group",
          isLocked 
            ? "bg-muted/50 border-muted hover:border-muted-foreground/20" 
            : "bg-white/90 border-primary/30 hover:border-primary hover:shadow-lg hover:-translate-y-1"
        )}
      >
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <span className={cn(
              "text-sm font-bold uppercase tracking-wider",
              isLocked ? "text-muted-foreground" : "text-accent"
            )}>
              {new Date(message.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
            {isLocked ? (
              <Lock className="w-4 h-4 text-muted-foreground" />
            ) : (
              <Gift className="w-4 h-4 text-accent animate-bounce" />
            )}
          </div>
          <CardTitle className={cn(
            "text-xl font-display",
            isLocked ? "text-muted-foreground blur-sm" : "text-foreground"
          )}>
            {isLocked ? "Wait for it..." : message.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={cn(
            "text-base leading-relaxed font-sans",
            isLocked ? "blur-md select-none opacity-50" : "text-muted-foreground"
          )}>
            {message.message}
          </div>
          
          {isLocked && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/10 backdrop-blur-[2px]">
              <span className="bg-white/80 px-4 py-2 rounded-full text-xs font-bold text-muted-foreground shadow-sm">
                Unlocks on {new Date(message.date).toLocaleDateString()}
              </span>
            </div>
          )}
        </CardContent>
        
        {!isLocked && (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </Card>
    </motion.div>
  );
}
