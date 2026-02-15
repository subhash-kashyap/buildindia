'use client';

import { useRouter } from 'next/navigation';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/utils/storage';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Handshake, Users, ShieldCheck } from 'lucide-react';

export default function SocialContract() {
  const router = useRouter();
  const { t } = useTranslation();
  const [_, setOnboardingComplete] = useLocalStorage(STORAGE_KEYS.ONBOARDING_COMPLETE, false);

  const handleContinue = () => {
    router.push('/onboarding/contacts');
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-[85vh] py-8 px-6 animate-in fade-in duration-1000 overflow-y-auto">
      <div className="flex flex-col items-center gap-6 text-center w-full mt-4">
        <div className="bg-secondary/40 p-8 rounded-[2.5rem] border border-black/[0.03] shadow-premium">
          <Handshake className="w-16 h-16 text-primary" strokeWidth={1} />
        </div>
        
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-foreground tracking-tighter italic">Tight Knit</h1>
          <p className="text-muted-foreground font-bold text-base tracking-tight opacity-60">Help your friends when they are low.</p>
        </div>
      </div>

      <div className="w-full max-w-sm space-y-6 mt-8">
        <Card className="border-none shadow-premium bg-white/30 backdrop-blur-md p-7 rounded-[2.25rem] border border-black/[0.02]">
          <CardContent className="p-0 flex flex-col gap-6">
            <div className="flex gap-4 items-start">
              <div className="bg-secondary/50 p-2.5 rounded-xl text-primary border border-black/[0.03]">
                <Users size={20} strokeWidth={1} />
              </div>
              <div className="space-y-0.5">
                <p className="font-black text-foreground leading-snug tracking-tight">Private Circle</p>
                <p className="text-xs text-muted-foreground font-bold leading-relaxed opacity-60">Only people you invite can see your pulses.</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="bg-secondary/50 p-2.5 rounded-xl text-primary border border-black/[0.03]">
                <Heart size={20} strokeWidth={1} />
              </div>
              <div className="space-y-0.5">
                <p className="font-black text-foreground leading-snug tracking-tight">Radical Kindess</p>
                <p className="text-xs text-muted-foreground font-bold leading-relaxed opacity-60">Every response is human-first and supportive.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="bg-secondary/50 p-2.5 rounded-xl text-primary border border-black/[0.03]">
                <ShieldCheck size={20} strokeWidth={1} />
              </div>
              <div className="space-y-0.5">
                <p className="font-black text-foreground leading-snug tracking-tight">Secure Space</p>
                <p className="text-xs text-muted-foreground font-bold leading-relaxed opacity-60">Pseudo-anonymous for maximum safety.</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-4 pb-8">
          <p className="text-[10px] text-muted-foreground/40 font-bold text-center italic tracking-tight px-4 uppercase">By continuing, you agree to build a safer world.</p>
          <Button 
            onClick={handleContinue} 
            className="w-full h-16 text-lg font-black rounded-[1.75rem] shadow-premium hover:shadow-premium-lg active:scale-[0.98] premium-transition bg-primary text-white"
          >
            {t('continue')}
          </Button>
        </div>
      </div>
    </div>
  );
}
