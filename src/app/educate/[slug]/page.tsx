'use client';

import { useRouter } from 'next/navigation';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, BookOpen, Clock, ChevronRight, Sparkles, PlayCircle, GraduationCap } from 'lucide-react';

export default function EducateDetail() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-10 pb-24 animate-in fade-in duration-1000">
      <header className="flex items-center gap-6 py-6 sticky top-0 z-20 bg-background/80 backdrop-blur-md">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => router.back()} 
          className="rounded-full bg-white/40 shadow-premium border border-black/5 hover:bg-white/80 w-10 h-10"
        >
          <ArrowLeft className="w-5 h-5 text-muted-foreground" strokeWidth={2.5} />
        </Button>
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-foreground italic">Lesson Detail</h1>
          <p className="text-muted-foreground font-bold text-xs tracking-tight opacity-40">Psychology Series</p>
        </div>
      </header>

      <div className="space-y-10">
        <Card className="border-none shadow-premium-lg bg-white/80 p-10 rounded-[3rem] border border-black/[0.03] overflow-hidden group relative">
          <div className="relative z-10 space-y-10">
            <div className="flex justify-between items-start">
              <Badge className="bg-primary/5 text-primary border-none font-black px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest">Core Module</Badge>
              <div className="bg-secondary/60 p-4 rounded-[1.75rem] text-primary border border-black/5 shadow-sm group-hover:scale-110 premium-transition">
                <PlayCircle className="w-8 h-8" strokeWidth={1.5} />
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-4xl font-black leading-tight tracking-tighter italic text-foreground">Active Listening & Presence</h2>
              <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-50 italic">
                <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 5 Min Read</div>
                <div className="flex items-center gap-1.5"><GraduationCap className="w-4 h-4" /> Builder Lab</div>
              </div>
            </div>

            <div className="prose prose-slate max-w-none space-y-6">
              <p className="text-lg text-muted-foreground font-bold leading-relaxed opacity-80 italic">
                &quot;The most basic and powerful way to connect to another person is to listen. Just listen.&quot;
              </p>
              <div className="space-y-4 pt-4 border-t border-black/5">
                <p className="font-black text-xl text-foreground tracking-tight italic">Key Takeaways:</p>
                <ul className="space-y-4">
                  {[
                    "Listen without the intent to reply.",
                    "Validate emotions before offering solutions.",
                    "Your presence is often more valuable than your advice."
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-4 text-base font-bold text-muted-foreground/80 leading-snug">
                       <span className="bg-primary/10 text-primary p-1 rounded-md text-[10px] mt-1 shrink-0 px-2 leading-none">0{idx+1}</span>
                       {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-primary/5 rounded-full blur-[60px]" />
        </Card>

        <Card className="border-none shadow-premium bg-white/50 backdrop-blur-md p-8 rounded-[2.5rem] border border-black/[0.03] group hover:bg-white/80 transition-all cursor-pointer">
          <CardContent className="p-0 flex items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="bg-secondary/80 p-4 rounded-2xl text-primary border border-black/5 shadow-sm group-hover:rotate-6 premium-transition">
                <Sparkles className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <div className="space-y-1">
                <p className="font-black text-xl text-foreground tracking-tight italic">AI Coaching Sandbox</p>
                <p className="text-sm text-muted-foreground font-bold leading-none">Practice your peer support skills</p>
              </div>
            </div>
            <Button size="icon" className="rounded-2xl h-11 w-11 shadow-md bg-primary hover:bg-primary/95 text-white active:scale-95 premium-transition">
              <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
