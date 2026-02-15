'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/utils/storage';
import { useTranslation } from '@/hooks/useTranslation';
import PsychEdCard from '@/components/PsychEdCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  AlertCircle, 
  ChevronRight, 
  Globe, 
  Sparkles,
  MoreVertical
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

export default function Home() {
  const router = useRouter();
  const { t, lang } = useTranslation();
  const [user, setUser] = useLocalStorage<any>(STORAGE_KEYS.USER, { language: 'en', name: 'Anonymous' });
  const [activeRequests, setActiveRequests] = useLocalStorage<any[]>('buildindia_low_requests', []);

  // Seed data if empty
  useEffect(() => {
    if (activeRequests.length === 0) {
      setActiveRequests([
        {
          id: 'seed-1',
          timestamp: new Date().toISOString(),
          intensity: 65,
          user_name: 'Friend'
        }
      ]);
    }
  }, []);

  const hasRequests = activeRequests.length > 0;

  const changeLanguage = (newLang: string) => {
    setUser({ ...user, language: newLang });
    window.location.reload(); 
  };

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'Hindi' },
    { code: 'ta', label: 'Tamil' },
    { code: 'bn', label: 'Bengali' },
  ];

  return (
    <div className="flex flex-col gap-10 pb-24 animate-in fade-in duration-1000">
      {/* Zen Header */}
      <header className="flex items-center justify-between py-6">
        <div className="flex flex-col">
          <h1 className="text-4xl font-black tracking-tighter text-foreground italic">
            Hey
          </h1>
        </div>
        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full bg-white/40 shadow-premium border border-black/5 hover:bg-white/80 w-10 h-10">
                <Globe className="w-5 h-5 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-[1.75rem] p-3 shadow-premium-lg border-white/20">
              <DropdownMenuLabel className="px-3 pb-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Language</DropdownMenuLabel>
              {languages.map((l) => (
                <DropdownMenuItem 
                  key={l.code} 
                  onClick={() => changeLanguage(l.code)}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-4 py-3 premium-transition mb-1 last:mb-0 cursor-pointer", 
                    lang === l.code ? "bg-primary text-white font-black" : "hover:bg-secondary font-bold"
                  )}
                >
                  {l.label}
                  {lang === l.code && <Sparkles className="w-4 h-4 fill-white/20" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Direct Settings Navigation */}
          <Button 
            variant="ghost" 
            size="icon"
            className="rounded-full bg-white/40 shadow-premium border border-black/5 hover:bg-white/80 w-10 h-10"
            onClick={() => router.push('/settings')}
          >
            <MoreVertical className="w-5 h-5 text-muted-foreground" />
          </Button>
        </div>
      </header>

      {/* 1. Education Content (PsychEd) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="font-black text-2xl text-foreground tracking-tighter italic">Daily Growth</h3>
        </div>
        <PsychEdCard
          category="Psychology"
          title="The Art of Validation"
          actionableSentence="Next time someone shares a struggle, try saying 'I hear you, and it makes sense why you feel that way.'"
        />
      </div>

      {/* 2. Active Pulse (Others needing help) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <h3 className="font-black text-2xl text-foreground tracking-tighter italic">Active Pulse</h3>
          </div>
          <Badge className="bg-primary/5 text-primary border-none font-black px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest">
            {activeRequests.length} Live
          </Badge>
        </div>
        
        {hasRequests && (
          <Card className="border-none shadow-premium bg-white/50 backdrop-blur-md border border-black/[0.03] overflow-hidden premium-transition hover:scale-[1.01] rounded-[2.5rem]">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="bg-rose-50 p-4 rounded-2xl text-rose-500 border border-rose-100/50 shadow-sm relative">
                  <AlertCircle className="w-6 h-6" strokeWidth={2.5} />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full border-2 border-white animate-pulse" />
                </div>
                <div className="space-y-0.5">
                  <p className="font-black text-lg text-foreground tracking-tight leading-none">{t('someone_low')}</p>
                  <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest opacity-60">Empathy requested</p>
                </div>
              </div>
              <Button 
                size="sm" 
                className="rounded-full px-7 bg-primary hover:bg-primary/95 text-white font-black shadow-lg premium-transition h-10"
                onClick={() => router.push(`/chat/${activeRequests[0].id}`)}
              >
                {t('respond')}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* 3. Feeling Low (User needs help) */}
      <Card className="group relative overflow-hidden border-none shadow-premium bg-white/80 p-10 rounded-[3rem] border border-black/[0.03] premium-transition hover:shadow-premium-lg">
        <div className="relative z-10 flex flex-col gap-10">
          <div className="bg-primary/5 w-fit p-6 rounded-[2.25rem] border border-primary/10 group-hover:scale-110 premium-transition shadow-sm">
            <Heart className="w-12 h-12 text-primary" strokeWidth={2.5} />
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-black leading-tight tracking-tighter text-foreground italic">
              {t('how_feeling')}
            </h2>
            <p className="text-muted-foreground font-bold text-lg max-w-[90%] leading-snug tracking-tight">Need a secure space to talk? Your circle and AI coach are ready.</p>
          </div>
          <Button 
            onClick={() => router.push('/feeling-low')}
            className="w-full bg-primary text-white hover:bg-primary/95 font-black h-16 text-2xl rounded-[2rem] shadow-premium hover:translate-y-[-4px] premium-transition"
          >
            {t('feeling_low')}
            <ChevronRight className="w-6 h-6 ml-1 group-hover:translate-x-1 premium-transition" strokeWidth={2.5} />
          </Button>
        </div>
      </Card>
    </div>
  );
}
