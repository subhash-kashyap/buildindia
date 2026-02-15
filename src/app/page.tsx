'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/utils/storage';
import { useTranslation } from '@/hooks/useTranslation';
import { generateRandomName } from '@/lib/names';
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
  const [messages, setMessages] = useLocalStorage<any[]>(STORAGE_KEYS.MESSAGES, []);
  const [conversations, setConversations] = useLocalStorage<any[]>(STORAGE_KEYS.CONVERSATIONS, []);

  // Seed data if empty
  useEffect(() => {
    if (activeRequests.length === 0) {
      setActiveRequests([
        {
          id: 'seed-1',
          timestamp: new Date().toISOString(),
          intensity: 65,
          user_name: generateRandomName()
        }
      ]);
    }

    if (conversations.length === 0) {
      const seedConvId = 'seed-conv-1';
      setConversations([
        {
          id: seedConvId,
          type: 'human',
          status: 'active',
          initialIntensity: 50,
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          lastMessage: "I'm here for you.",
        }
      ]);
      
      setMessages([
        {
          id: 'seed-msg-1',
          conversation_id: seedConvId,
          content: "Hey, I've been feeling a bit overwhelmed lately.",
          sender_type: 'user',
          timestamp: new Date(Date.now() - 3500000).toISOString(),
        },
        {
          id: 'seed-msg-2',
          conversation_id: seedConvId,
          content: "I'm here for you. Do you want to talk about it?",
          sender_type: 'other',
          timestamp: new Date(Date.now() - 3400000).toISOString(),
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
    <div className="flex flex-col gap-8 pb-32 animate-in fade-in duration-1000">
      {/* Zen Header */}
      <header className="flex items-center justify-between py-4">
        <div className="flex flex-col">
          <h1 className="text-3xl font-black tracking-tighter text-foreground italic">
            Hey
          </h1>
          <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/60 mt-1">Tight Knit</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full bg-white/30 shadow-sm border border-black/[0.03] hover:bg-white/60 w-9 h-9">
                <Globe className="w-4 h-4 text-muted-foreground/60" strokeWidth={1.5} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44 rounded-[1.5rem] p-2 shadow-premium-lg border-white/20">
              <DropdownMenuLabel className="px-3 pb-2 text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">Language</DropdownMenuLabel>
              {languages.map((l) => (
                <DropdownMenuItem 
                  key={l.code} 
                  onClick={() => changeLanguage(l.code)}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-3 py-2.5 premium-transition mb-1 last:mb-0 cursor-pointer text-sm", 
                    lang === l.code ? "bg-primary text-white font-bold" : "hover:bg-secondary font-medium"
                  )}
                >
                  {l.label}
                  {lang === l.code && <Sparkles className="w-3.5 h-3.5 fill-white/20" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Direct Settings Navigation */}
          <Button 
            variant="ghost" 
            size="icon"
            className="rounded-full bg-white/30 shadow-sm border border-black/[0.03] hover:bg-white/60 w-9 h-9"
            onClick={() => router.push('/settings')}
          >
            <MoreVertical className="w-4 h-4 text-muted-foreground/60" strokeWidth={1.5} />
          </Button>
        </div>
      </header>

      {/* 1. Education Content (PsychEd) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-black text-xl text-foreground tracking-tighter italic opacity-80">Daily Insight</h3>
        </div>
        <PsychEdCard
          category="Psychology"
          title="The Power of Silence"
          actionableSentence="Sometimes the best support is just being there without saying a word."
        />
      </div>

      {/* 2. Active Pulse (Others needing help) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-black text-xl text-foreground tracking-tighter italic opacity-80">Active Pulse</h3>
          {hasRequests && (
            <Badge className="bg-primary/5 text-primary border-none font-black px-3 py-1 rounded-full text-[9px] uppercase tracking-widest shadow-none">
              {activeRequests.length} Live
            </Badge>
          )}
        </div>
        
        {hasRequests && (
          <Card className="border-none shadow-premium bg-white/40 backdrop-blur-md border border-black/[0.02] overflow-hidden premium-transition hover:translate-y-[-2px] rounded-[2rem]">
            <CardContent className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-primary/5 p-3 rounded-2xl text-primary border border-black/[0.03] shadow-sm relative">
                  <AlertCircle className="w-5 h-5" strokeWidth={1.5} />
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-primary rounded-full border-2 border-white animate-pulse" />
                </div>
                <div className="space-y-0.5">
                  <p className="font-black text-base text-foreground tracking-tight leading-none">
                    {activeRequests[0].user_name}
                  </p>
                  <p className="text-[10px] text-muted-foreground/60 font-bold uppercase tracking-widest italic">needs your support</p>
                </div>
              </div>
              <Button 
                size="sm" 
                className="rounded-full px-6 bg-primary hover:bg-primary/95 text-white font-black shadow-md h-9 text-xs"
                onClick={() => router.push(`/chat/${activeRequests[0].id}`)}
              >
                {t('respond')}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* 3. Feeling Low (User needs help) */}
      <Card className="group relative overflow-hidden border-none shadow-premium bg-white/40 backdrop-blur-sm p-10 rounded-[2.75rem] border border-black/[0.02] premium-transition hover:bg-white/60">
        <div className="relative z-10 flex flex-col gap-10">
          <div className="bg-secondary/60 w-fit p-5 rounded-[2rem] border border-black/[0.03] group-hover:scale-105 premium-transition shadow-sm">
            <Heart className="w-10 h-10 text-primary opacity-60" strokeWidth={1} />
          </div>
          <div className="space-y-3">
            <h2 className="text-4xl font-black leading-tight tracking-tighter text-foreground italic">
              {t('how_feeling')}
            </h2>
            <p className="text-muted-foreground/60 font-bold text-base max-w-[85%] leading-snug tracking-tight">Need a space to talk? Your tight-knit circle is here.</p>
          </div>
          <Button 
            onClick={() => router.push('/feeling-low')}
            className="w-full bg-primary text-white hover:bg-primary/95 font-black h-14 text-xl rounded-[1.75rem] shadow-premium hover:translate-y-[-2px] active:scale-[0.98] premium-transition"
          >
            {t('feeling_low')}
            <ChevronRight className="w-5 h-5 ml-1 opacity-50" strokeWidth={2} />
          </Button>
        </div>
      </Card>
    </div>
  );
}
