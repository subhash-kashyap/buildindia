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
    <div className="flex flex-col gap-10 p-6 pt-10 animate-in fade-in duration-1000 pb-32">
      <div className="flex items-center gap-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full bg-white/40 shadow-premium border border-black/5 hover:bg-white/80 w-10 h-10">
          <ArrowLeft className="w-5 h-5 text-muted-foreground" strokeWidth={2.5} />
        </Button>
        <div className="space-y-0.5">
          <h1 className="text-3xl font-black text-foreground tracking-tighter italic">{t('how_feeling')}</h1>
          <p className="text-muted-foreground font-bold text-sm tracking-tight opacity-60">Reflection is the first step.</p>
        </div>
      </div>

      <Card className="border-none shadow-premium bg-white/40 backdrop-blur-md p-10 rounded-[3rem] space-y-12 border border-black/[0.03]">
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <Label className="text-lg font-black tracking-tight text-foreground/80">Self-Assessment</Label>
            <span className={cn(
               "text-sm font-black px-4 py-1.5 rounded-full shadow-sm premium-transition",
               intensity < 33 ? "bg-secondary text-primary border border-black/5" :
               intensity < 66 ? "bg-secondary text-primary border border-black/5" : "bg-primary text-white"
            )}>
              {getIntensityLabel(intensity)}
            </span>
          </div>
          
          <div className="px-2">
            <Slider 
              value={[intensity]} 
              onValueChange={(vals) => setIntensity(vals[0])} 
              max={100} 
              step={1} 
              className="py-6"
            />
            <div className="flex justify-between mt-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-40">
                <span>Steady</span>
                <span>Heavy</span>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <h3 className="text-xl font-black text-foreground/80 truncate tracking-tight italic">Support Route</h3>
          
          <div className="flex flex-col gap-4">
            <div 
              className={cn(
                "group flex items-center justify-between p-5 rounded-[2rem] border transition-all cursor-pointer shadow-sm",
                options.circle ? "border-primary/20 bg-primary/5" : "border-black/[0.03] bg-white/40 opacity-70"
              )}
              onClick={() => setOptions({ ...options, circle: !options.circle })}
            >
              <div className="flex items-center gap-4">
                <div className={cn("p-2.5 rounded-xl transition-all", options.circle ? "bg-primary text-white" : "bg-secondary text-muted-foreground")}>
                  <Users className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div>
                  <Label className="text-base font-black cursor-pointer leading-none">{t('notify_circle')}</Label>
                  <p className="text-[10px] text-muted-foreground/60 font-bold mt-1 uppercase tracking-tighter">Trusted Circle</p>
                </div>
              </div>
              <Switch checked={options.circle} onCheckedChange={(val) => setOptions({...options, circle: val})} />
            </div>

            <div 
              className={cn(
                "group flex items-center justify-between p-5 rounded-[2rem] border transition-all cursor-pointer shadow-sm",
                options.ai ? "border-primary/20 bg-primary/5" : "border-black/[0.03] bg-white/40 opacity-70"
              )}
              onClick={() => setOptions({ ...options, ai: !options.ai })}
            >
              <div className="flex items-center gap-4">
                <div className={cn("p-2.5 rounded-xl transition-all", options.ai ? "bg-primary text-white" : "bg-secondary text-muted-foreground")}>
                  <Sparkles className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div>
                  <Label className="text-base font-black cursor-pointer leading-none">{t('talk_ai')}</Label>
                  <p className="text-[10px] text-muted-foreground/60 font-bold mt-1 uppercase tracking-tighter">AI Coach</p>
                </div>
              </div>
              <Switch checked={options.ai} onCheckedChange={(val) => setOptions({...options, ai: val})} />
            </div>
          </div>
        </div>
      </Card>

      <div className="flex flex-col gap-6 text-center">
        <div className="flex items-center gap-4 text-muted-foreground/60 bg-white/30 backdrop-blur-sm p-4 border border-black/[0.03] shadow-sm rounded-2xl text-left">
          <AlertCircle size={18} strokeWidth={1.5} />
          <p className="text-xs font-bold leading-relaxed">{t('estimate_msg')}</p>
        </div>
        
        <Button 
          onClick={handleStart} 
          className="w-full h-16 text-2xl font-black rounded-[2rem] shadow-premium bg-primary hover:bg-primary/95 text-white active:scale-[0.98] premium-transition"
        >
          {t('start')}
          <Send className="w-6 h-6 ml-3" strokeWidth={2} />
        </Button>
      </div>
    </div>
  );
}
