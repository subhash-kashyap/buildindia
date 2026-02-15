'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/utils/storage';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { AlertCircle, ArrowLeft, Send, Sparkles, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function FeelingLow() {
  const router = useRouter();
  const { t } = useTranslation();
  const [intensity, setIntensity] = useState(50);
  const [options, setOptions] = useState({ circle: true, ai: false });
  const [conversations, setConversations] = useLocalStorage<any[]>(STORAGE_KEYS.CONVERSATIONS, []);

  const getIntensityLabel = (val: number) => {
    if (val < 33) return t('slight');
    if (val < 66) return t('heavy');
    return t('overwhelmed');
  };

  const handleStart = () => {
    const newConvId = Date.now().toString();
    const newConv = {
      id: newConvId,
      type: options.ai ? 'ai' : 'human',
      status: 'active',
      initialIntensity: intensity,
      createdAt: new Date().toISOString(),
      lastMessage: options.ai ? "Hello. I'm here for you." : "Your circle has been notified.",
    };
    
    setConversations([newConv, ...conversations]);
    router.push(`/chat/${newConvId}`);
  };

  return (
    <div className="flex flex-col gap-8 p-4 pt-6 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-24">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full">
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-3xl font-black text-foreground/90">{t('how_feeling')}</h1>
      </div>

      <Card className="border-none shadow-xl bg-white p-8 rounded-[2rem] space-y-10">
        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <Label className="text-lg font-bold text-muted-foreground">{t('how_feeling')}</Label>
            <span className={cn(
               "text-2xl font-black px-4 py-1 rounded-full",
               intensity < 33 ? "bg-emerald-100 text-emerald-700" :
               intensity < 66 ? "bg-amber-100 text-amber-700" : "bg-rose-100 text-rose-700"
            )}>
              {getIntensityLabel(intensity)}
            </span>
          </div>
          <Slider 
            value={[intensity]} 
            onValueChange={(vals) => setIntensity(vals[0])} 
            max={100} 
            step={1} 
            className="py-4"
          />
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-bold text-foreground/80 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            {t('options')}
          </h3>
          
          <div className="space-y-4">
            <div 
              className={cn(
                "flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer",
                options.circle ? "border-primary bg-primary/5" : "border-muted bg-transparent"
              )}
              onClick={() => setOptions({ ...options, circle: !options.circle })}
            >
              <div className="flex items-center gap-4">
                <Users className={cn("w-6 h-6", options.circle ? "text-primary" : "text-muted-foreground")} />
                <Label className="text-lg font-bold cursor-pointer">{t('notify_circle')}</Label>
              </div>
              <Switch checked={options.circle} />
            </div>

            <div 
              className={cn(
                "flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer",
                options.ai ? "border-primary bg-primary/5" : "border-muted bg-transparent"
              )}
              onClick={() => setOptions({ ...options, ai: !options.ai })}
            >
              <div className="flex items-center gap-4">
                <Sparkles className={cn("w-6 h-6", options.ai ? "text-primary" : "text-muted-foreground")} />
                <Label className="text-lg font-bold cursor-pointer">{t('talk_ai')}</Label>
              </div>
              <Switch checked={options.ai} />
            </div>
          </div>
        </div>
      </Card>

      <div className="flex flex-col gap-4 text-center px-4">
        <div className="flex items-center justify-center gap-2 text-muted-foreground bg-muted/30 p-3 rounded-xl">
          <AlertCircle size={18} />
          <p className="text-sm font-medium">{t('estimate_msg')}</p>
        </div>
        <Button 
          onClick={handleStart} 
          size="lg"
          className="w-full h-14 text-xl font-bold rounded-2xl shadow-lg"
        >
          {t('start')}
          <Send className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}

