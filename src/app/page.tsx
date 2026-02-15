'use client';

import { useRouter } from 'next/navigation';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/utils/storage';
import { useTranslation } from '@/hooks/useTranslation';
import PsychEdCard from '@/components/PsychEdCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageSquare, AlertCircle, ChevronRight, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Home() {
  const router = useRouter();
  const { t } = useTranslation();
  const [activeRequests] = useLocalStorage<any[]>('buildindia_low_requests', []);
  const [user] = useLocalStorage<any>(STORAGE_KEYS.USER, {});

  const hasRequests = activeRequests.length > 0;

  return (
    <div className="flex flex-col gap-8 pb-10 animate-in fade-in duration-700">
      {/* Header / Greeting */}
      <header className="pt-4 px-2">
        <h1 className="text-3xl font-extrabold text-foreground/90 tracking-tight">
          Hello, Anonymous
        </h1>
        <p className="text-muted-foreground font-medium">You are making a difference today.</p>
      </header>

      {/* State B: Support Notification */}
      {hasRequests && (
        <Card className="border-none shadow-md bg-rose-50 border-l-4 border-rose-400 animate-bounce-subtle">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-rose-100 p-2 rounded-full">
                <AlertCircle className="w-5 h-5 text-rose-500" />
              </div>
              <div>
                <p className="font-bold text-rose-900 leading-tight">{t('someone_low')}</p>
                <p className="text-sm text-rose-700/80">Needs a kind word</p>
              </div>
            </div>
            <Button 
              size="sm" 
              className="bg-rose-500 hover:bg-rose-600 text-white shadow-sm"
              onClick={() => router.push(`/chat/${activeRequests[0].id}`)}
            >
              {t('respond')}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Main CTA */}
      <Card className="relative overflow-hidden border-none shadow-xl bg-gradient-to-br from-blue-500 to-indigo-600 p-8 text-white">
        <div className="relative z-10 flex flex-col gap-4">
          <div className="bg-white/20 w-fit p-3 rounded-2xl backdrop-blur-md">
            <Heart className="w-8 h-8 fill-white/20" />
          </div>
          <h2 className="text-2xl font-bold leading-tight">
            How&apos;s your mood right now?
          </h2>
          <Button 
            onClick={() => router.push('/feeling-low')}
            className="w-full bg-white text-blue-600 hover:bg-blue-50 font-bold h-12 text-lg shadow-lg"
          >
            {t('feeling_low')}
          </Button>
        </div>
        {/* Abstract background elements */}
        <div className="absolute top-[-20%] right-[-10%] w-48 h-48 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-10%] w-32 h-32 bg-indigo-400/20 rounded-full blur-2xl" />
      </Card>

      {/* Home Feed Content */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-bold text-lg text-foreground/80">Support Feed</h3>
          <Badge variant="outline" className="text-muted-foreground border-muted-foreground/20">3 Active</Badge>
        </div>

        <PsychEdCard
          category="Psychology"
          title="Emotional Validation"
          actionableSentence="Next time someone shares a struggle, try saying 'I hear you, and it makes sense why you feel that way.'"
        />

        <Card className="bg-emerald-50 border-none shadow-sm cursor-pointer hover:bg-emerald-100/80 transition-colors">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-white p-2 rounded-xl shadow-sm text-emerald-600">
              <UserPlus className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-emerald-900">Invite trusted others</p>
              <p className="text-sm text-emerald-700/80">Strengthen your support net</p>
            </div>
            <ChevronRight className="text-emerald-400" />
          </CardContent>
        </Card>

        <Card className="bg-amber-50 border-none shadow-sm cursor-pointer hover:bg-amber-100/80 transition-colors">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-white p-2 rounded-xl shadow-sm text-amber-600">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-amber-900 font-hindi">सीखें: संवेदनशील बातचीत</p>
              <p className="text-sm text-amber-700/80">Learn active listening skills</p>
            </div>
            <ChevronRight className="text-amber-400" />
          </CardContent>
        </Card>
      </div>

      <div className="h-4" />
    </div>
  );
}
