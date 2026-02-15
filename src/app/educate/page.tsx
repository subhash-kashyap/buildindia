'use client';

import { useRouter } from 'next/navigation';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Users, Heart, BookOpen, Clock, ChevronRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function EducatePage() {
  const router = useRouter();
  const { t } = useTranslation();

  const modules = [
    {
      title: 'Active Listening',
      slug: 'active-listening',
      description: 'Master the core skills of peer support.',
      icon: Users,
      color: 'text-primary',
      bg: 'bg-primary/5',
      duration: '5 min',
      category: 'Foundation'
    },
    {
      title: 'Emotional Validation',
      slug: 'emotional-validation',
      description: 'Learn to make others feel heard and understood.',
      icon: Heart,
      color: 'text-rose-500',
      bg: 'bg-rose-50',
      duration: '7 min',
      category: 'Deep Empahy'
    },
    {
      title: 'De-escalation Basics',
      slug: 'de-escalation',
      description: 'How to handle intense emotional moments.',
      icon: GraduationCap,
      color: 'text-amber-500',
      bg: 'bg-amber-50',
      duration: '10 min',
      category: 'Crisis Support'
    }
  ];

  return (
    <div className="flex flex-col gap-10 pb-24 animate-in fade-in duration-1000">
      <div className="flex flex-col gap-2 py-4">
        <h1 className="text-4xl font-black tracking-tighter text-foreground italic">Academy</h1>
        <p className="text-muted-foreground font-bold text-base tracking-tight opacity-60">Sharpen your tools of empathy.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {modules.map((m) => {
          const Icon = m.icon;
          return (
            <Card 
              key={m.slug}
              className="border-none shadow-premium bg-white/60 backdrop-blur-sm hover:shadow-premium-lg premium-transition cursor-pointer group rounded-[2.5rem] overflow-hidden border border-black/[0.03]"
              onClick={() => router.push(`/educate/${m.slug}`)}
            >
              <div className="h-3 bg-primary/10 group-hover:bg-primary/20 premium-transition" />
              <CardContent className="p-8 flex items-center justify-between gap-8">
                <div className="flex-1 space-y-5">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-primary/5 text-primary border-none font-black px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest shadow-none">
                      {m.category}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <h2 className="text-2xl font-black text-foreground tracking-tight leading-tight italic group-hover:text-primary premium-transition">
                      {m.title}
                    </h2>
                    <p className="text-sm text-muted-foreground font-bold leading-relaxed max-w-[90%] opacity-80">
                      {m.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 italic">
                    <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {m.duration}</div>
                    <div className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> 1 Lesson</div>
                  </div>
                </div>
                
                <div className="bg-secondary/50 p-4 rounded-2xl group-hover:translate-x-1 group-hover:bg-primary/10 group-hover:text-primary premium-transition shadow-sm">
                  <ChevronRight size={28} strokeWidth={2.5} className="text-muted-foreground/30" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="border-none shadow-premium bg-primary text-white p-10 rounded-[3rem] relative overflow-hidden group hover:scale-[1.01] premium-transition">
        <div className="relative z-10 space-y-6">
          <div className="bg-white/20 p-4 rounded-[1.75rem] w-fit backdrop-blur-md border border-white/20 shadow-sm group-hover:rotate-6 premium-transition">
            <Sparkles className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-black tracking-tighter italic">Premium Academy</h2>
            <p className="text-white/70 font-bold text-base leading-snug tracking-tight">Advanced psychological tools for mental health builders.</p>
          </div>
          <Badge className="bg-white/20 text-white border-white/20 font-black px-5 py-2 rounded-full text-[10px] uppercase tracking-widest">Available Soon</Badge>
        </div>
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-[80px]" />
      </Card>
    </div>
  );
}
