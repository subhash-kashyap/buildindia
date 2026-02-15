'use client';

import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Sparkles, Heart, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EndConversationModalProps {
  initialIntensity: number;
  onComplete: (moodDelta: number, feedback: string) => void;
}

export default function EndConversationModal({ initialIntensity, onComplete }: EndConversationModalProps) {
  const { t } = useTranslation();
  const [currentIntensity, setCurrentIntensity] = useState(initialIntensity);
  const [feedback, setFeedback] = useState('');

  const moodDelta = initialIntensity - currentIntensity;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-500 p-4">
      <Card className="w-full max-w-[430px] rounded-[3rem] border-none shadow-premium-lg bg-white overflow-hidden animate-in slide-in-from-bottom-full duration-700 mb-4">
        <CardHeader className="text-center pt-10 pb-6">
          <div className="mx-auto bg-secondary p-5 rounded-[2rem] w-fit mb-4 border border-black/5 shadow-sm">
            <Sparkles className="w-10 h-10 text-primary" strokeWidth={1.5} />
          </div>
          <CardTitle className="text-3xl font-black tracking-tighter italic">{t('how_feel_now')}</CardTitle>
          <p className="text-muted-foreground font-bold pt-1 opacity-60">Reflection brings clarity.</p>
        </CardHeader>
        
        <CardContent className="space-y-10 px-10">
          <div className="space-y-6">
             <div className="flex justify-between items-center bg-secondary/40 p-5 rounded-[1.75rem] border border-black/5">
                <div className="flex flex-col">
                  <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground opacity-40">Pulse Status</span>
                  <span className="text-lg font-black text-foreground italic">
                    {currentIntensity < 30 ? "Peaceful" : currentIntensity < 60 ? "Better" : "Processing"}
                  </span>
                </div>
                <div className={cn(
                  "px-4 py-2 rounded-xl text-xs font-black shadow-sm premium-transition",
                  moodDelta > 0 ? "bg-primary text-white" : "bg-white text-muted-foreground border border-black/5 opacity-40"
                )}>
                  {moodDelta > 0 ? `+${moodDelta}% Growth` : "Neutral"}
                </div>
             </div>
             
             <div className="px-2">
               <Slider 
                 value={[currentIntensity]} 
                 onValueChange={(vals) => setCurrentIntensity(vals[0])} 
                 max={100} 
                 step={1} 
                 className="py-4"
               />
               <div className="flex justify-between mt-2 text-[9px] font-black uppercase tracking-widest text-muted-foreground opacity-30">
                  <span>Balanced</span>
                  <span>Intense</span>
               </div>
             </div>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-2">
              <Label className="text-lg font-black tracking-tight italic">{t('what_helped')}</Label>
            </div>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full bg-secondary/30 border border-black/5 rounded-[2rem] p-6 text-base font-bold focus:ring-4 focus:ring-primary/5 focus:bg-white premium-transition min-h-[140px] resize-none placeholder:text-muted-foreground/30"
              placeholder="e.g. They really listened..."
            />
          </div>
        </CardContent>

        <CardFooter className="px-10 pb-12 pt-4">
          <Button 
            onClick={() => onComplete(moodDelta, feedback)} 
            className="w-full h-16 rounded-[2rem] text-xl font-black shadow-premium active:scale-[0.98] premium-transition bg-primary text-white"
          >
            {t('complete')}
            <Heart className="w-6 h-6 ml-2 fill-white/10" strokeWidth={2} />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
