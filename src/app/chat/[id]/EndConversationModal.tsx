'use client';

import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Sparkles, Heart } from 'lucide-react';
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
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-500">
      <Card className="w-full max-w-[390px] rounded-t-[2.5rem] border-none shadow-2xl bg-white pb-10 animate-in slide-in-from-bottom-full duration-700">
        <CardHeader className="text-center pt-8">
          <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-2">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-black">{t('how_feel_now')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8 px-8">
          <div className="space-y-4">
             <div className="flex justify-between font-bold text-muted-foreground text-sm">
                <span>Calmer</span>
                <span className={cn(moodDelta > 0 ? "text-emerald-500" : "text-muted-foreground")}>
                  {moodDelta > 0 ? `+${moodDelta}% Improvement` : "Same"}
                </span>
                <span>Anxious</span>
             </div>
             <Slider 
               value={[currentIntensity]} 
               onValueChange={(vals) => setCurrentIntensity(vals[0])} 
               max={100} 
               step={1} 
               className="py-4"
             />
          </div>

          <div className="space-y-3">
            <Label className="text-lg font-bold">{t('what_helped')}</Label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-primary/20 min-h-[100px] resize-none"
              placeholder="E.g. They really listened to me..."
            />
          </div>
        </CardContent>
        <CardFooter className="px-8">
          <Button 
            onClick={() => onComplete(moodDelta, feedback)} 
            className="w-full h-14 rounded-2xl text-xl font-bold shadow-lg"
          >
            {t('complete')}
            <Heart className="w-5 h-5 ml-2 fill-current" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

