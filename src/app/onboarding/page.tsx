'use client';

import { useRouter } from 'next/navigation';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/utils/storage';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Handshake, Users } from 'lucide-react';

export default function SocialContract() {
  const router = useRouter();
  const { t } = useTranslation();
  const [_, setOnboardingComplete] = useLocalStorage(STORAGE_KEYS.ONBOARDING_COMPLETE, false);

  const handleContinue = () => {
    router.push('/onboarding/contacts');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] gap-10 p-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="bg-primary/10 p-6 rounded-full">
          <Handshake className="w-16 h-16 text-primary" />
        </div>
        <h1 className="text-4xl font-black text-foreground/90 leading-tight">BuildIndia</h1>
      </div>

      <Card className="border-none shadow-2xl bg-white p-6 max-w-sm rounded-[2rem]">
        <CardContent className="p-0 flex flex-col gap-4 text-lg font-medium text-foreground/70">
          <div className="flex gap-4 items-start">
            <div className="mt-1 bg-blue-100 p-1 rounded-md"><Users size={20} className="text-blue-600" /></div>
            <p>{t('social_contract_1')}</p>
          </div>
          <div className="flex gap-4 items-start">
            <div className="mt-1 bg-rose-100 p-1 rounded-md"><Heart size={20} className="text-rose-600" /></div>
            <p>{t('social_contract_2')}</p>
          </div>
          <p className="text-primary font-bold italic">{t('social_contract_3')}</p>
          <p className="text-sm text-muted-foreground">{t('social_contract_4')}</p>
        </CardContent>
      </Card>
      
      <Button 
        onClick={handleContinue} 
        size="lg"
        className="w-full max-w-sm h-14 text-xl font-bold rounded-2xl shadow-lg hover:scale-[1.02] transition-transform"
      >
        {t('continue')}
      </Button>
    </div>
  );
}
