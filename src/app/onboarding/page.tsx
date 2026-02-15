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
    <div className="flex flex-col items-center justify-between min-h-[90vh] py-12 px-6 animate-in fade-in duration-1000">
      <div className="flex flex-col items-center gap-8 text-center w-full mt-8">
        <div className="bg-secondary/50 p-10 rounded-[3rem] border border-black/5 shadow-premium">
          <Handshake className="w-20 h-20 text-primary" strokeWidth={1.5} />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-5xl font-black text-foreground tracking-tighter italic">BuildIndia</h1>
          <p className="text-muted-foreground font-bold text-lg tracking-tight">Peer support, redefined.</p>
        </div>
      </div>

      <div className="w-full max-w-sm space-y-8">
        <Card className="border-none shadow-premium bg-white/40 backdrop-blur-md p-8 rounded-[2.5rem] border border-black/5">
          <CardContent className="p-0 flex flex-col gap-6">
            <div className="flex gap-5 items-start">
              <div className="bg-secondary/60 p-3 rounded-2xl text-primary border border-black/5">
                <Users size={24} strokeWidth={1.5} />
              </div>
              <div className="space-y-1">
                <p className="font-black text-foreground leading-snug tracking-tight">Private Circle</p>
                <p className="text-sm text-muted-foreground font-bold leading-relaxed">{t('social_contract_1')}</p>
              </div>
            </div>
            
            <div className="flex gap-5 items-start">
              <div className="bg-secondary/60 p-3 rounded-2xl text-primary border border-black/5">
                <Heart size={24} strokeWidth={1.5} />
              </div>
              <div className="space-y-1">
                <p className="font-black text-foreground leading-snug tracking-tight">Radical Kindess</p>
                <p className="text-sm text-muted-foreground font-bold leading-relaxed">{t('social_contract_2')}</p>
              </div>
            </div>

            <div className="flex gap-5 items-start">
              <div className="bg-secondary/60 p-3 rounded-2xl text-primary border border-black/5">
                <ShieldCheck size={24} strokeWidth={1.5} />
              </div>
              <div className="space-y-1">
                <p className="font-black text-foreground leading-snug tracking-tight">Secure Space</p>
                <p className="text-sm text-muted-foreground font-bold leading-relaxed">{t('social_contract_4')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-4">
          <p className="text-muted-foreground/60 font-bold text-sm text-center italic tracking-tight px-4">{t('social_contract_3')}</p>
          <Button 
            onClick={handleContinue} 
            className="w-full h-16 text-xl font-black rounded-[2rem] shadow-premium hover:shadow-premium-lg active:scale-[0.98] premium-transition bg-primary text-white"
          >
            {t('continue')}
          </Button>
        </div>
      </div>
    </div>
  );
}
