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
      category: 'Deep Empathy'
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
    <div className="flex flex-col gap-10 pb-32 animate-in fade-in duration-1000">
      <div className="flex flex-col gap-1 py-4">
        <h1 className="text-4xl font-black tracking-tighter text-foreground italic">Academy</h1>
        <p className="text-muted-foreground font-bold text-sm tracking-tight opacity-40">Sharpen your tools of empathy.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {modules.map((m) => {
          return (
            <Card 
              key={m.slug}
              className="border-none shadow-premium bg-white/40 backdrop-blur-sm hover:translate-y-[-2px] premium-transition cursor-pointer group rounded-[2.25rem] overflow-hidden border border-black/[0.02]"
              onClick={() => router.push(`/educate/${m.slug}`)}
            >
              <div className="h-2 bg-primary/10 group-hover:bg-primary/20 premium-transition" />
              <CardContent className="p-7 flex items-center justify-between gap-6">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-primary/5 text-primary border-none font-black px-3 py-1 rounded-full text-[9px] uppercase tracking-widest shadow-none">
                      {m.category}
                    </Badge>
                  </div>
                  
                  <div className="space-y-1">
                    <h2 className="text-2xl font-black text-foreground tracking-tight leading-tight italic group-hover:text-primary premium-transition">
                      {m.title}
                    </h2>
                    <p className="text-xs text-muted-foreground font-bold leading-relaxed opacity-60">
                      {m.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-muted-foreground/30 italic">
                    <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" strokeWidth={1.5} /> {m.duration}</div>
                    <div className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" strokeWidth={1.5} /> 1 Lesson</div>
                  </div>
                </div>
                
                <div className="bg-secondary/40 p-3 rounded-2xl group-hover:bg-primary/5 group-hover:text-primary premium-transition shadow-sm">
                  <ChevronRight size={24} strokeWidth={2.5} className="text-muted-foreground/20" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
