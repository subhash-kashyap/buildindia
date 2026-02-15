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
    <div className="flex flex-col gap-10 pb-32 animate-in fade-in duration-1000">
      <header className="flex items-center gap-6 py-6 sticky top-0 z-20 bg-background/80 backdrop-blur-md">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => router.back()} 
          className="rounded-full bg-white/40 shadow-premium border border-black/[0.03] hover:bg-white/80 w-10 h-10"
        >
          <ArrowLeft className="w-5 h-5 text-muted-foreground" strokeWidth={2} />
        </Button>
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-foreground italic">Course Material</h1>
          <p className="text-muted-foreground font-bold text-[10px] uppercase tracking-widest opacity-60 mt-1">Tight Knit Builder Series</p>
        </div>
      </header>

      <div className="space-y-10">
        <Card className="border-none shadow-premium bg-white/40 p-8 rounded-[2.5rem] border border-black/[0.02] overflow-hidden group relative">
          <div className="relative z-10 space-y-8">
            <div className="flex justify-between items-start">
              <Badge className="bg-primary/10 text-primary border-none font-black px-4 py-1.5 rounded-full text-[9px] uppercase tracking-widest">Active Lesson</Badge>
              <div className="bg-secondary/40 p-4 rounded-2xl text-primary border border-black/[0.03] shadow-sm group-hover:scale-110 premium-transition">
                <PlayCircle className="w-8 h-8" strokeWidth={1} />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl font-black leading-none tracking-tighter italic text-foreground">Core Presence</h2>
              <div className="flex items-center gap-6 text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 opacity-80 italic">
                <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" strokeWidth={1.5} /> 5 Min Read</div>
                <div className="flex items-center gap-1.5"><GraduationCap className="w-4 h-4" strokeWidth={1.5} /> Lab 01</div>
              </div>
            </div>

            <div className="space-y-8">
              <p className="text-lg text-muted-foreground font-bold leading-relaxed opacity-75 italic border-l-2 border-primary/20 pl-6">
                &quot;The most basic and powerful way to connect to another person is to listen. Just listen.&quot;
              </p>
              <div className="space-y-6 pt-4">
                <p className="font-black text-xl text-foreground tracking-tight italic">Key Findings:</p>
                <div className="space-y-4">
                  {[
                    "Listen without the intent to reply.",
                    "Validate emotions before offering solutions.",
                    "Your presence is often more valuable than your advice."
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-5 p-5 bg-white/40 rounded-3xl border border-black/[0.01] shadow-sm">
                       <span className="bg-primary text-white w-7 h-7 flex items-center justify-center rounded-xl text-[10px] font-black shrink-0">0{idx+1}</span>
                       <p className="text-sm font-black text-muted-foreground/80 leading-snug">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-primary/5 rounded-full blur-[60px]" />
        </Card>

        <Card className="border-none shadow-premium bg-white/40 backdrop-blur-md p-6 rounded-[2.25rem] border border-black/[0.02] group hover:bg-white/60 transition-all cursor-pointer">
          <CardContent className="p-0 flex items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="bg-secondary/40 p-4 rounded-2xl text-primary border border-black/[0.03] shadow-sm group-hover:rotate-6 premium-transition">
                <Sparkles className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <div className="space-y-0.5">
                <p className="font-black text-xl text-foreground tracking-tight italic">Practice Sandbox</p>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest opacity-60">AI-Powered Training</p>
              </div>
            </div>
            <Button size="icon" className="rounded-2xl h-12 w-12 shadow-premium bg-primary hover:bg-primary/95 text-white active:scale-95 premium-transition">
              <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
