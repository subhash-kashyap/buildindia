'use client';

import { useRouter, useParams } from 'next/navigation';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, BookOpen, CheckCircle2, PlayCircle, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const MODULE_DATA: any = {
  'validation': {
    title: 'The Art of Validation',
    lesson: "Validation doesn't mean you agree with someone's actions. It means you acknowledge their feelings are real and make sense within their context. Instead of giving advice, try: 'I hear you, and it makes sense why you feel that way.'",
    takeaways: [
      "Acknowledge before advising.",
      "Use 'I sense you feel...' instead of 'You are...'",
      "Listen for the underlying emotion, not just the words."
    ],
    prompts: [
      "Someone says they are lonely.",
      "A friend feels overwhelmed by work.",
      "A peer is sad but doesn't know why."
    ]
  }
};

export default function ModuleDetail() {
  const router = useRouter();
  const { slug } = useParams();
  const { t } = useTranslation();
  const data = MODULE_DATA[slug as string] || MODULE_DATA['validation'];

  return (
    <div className="flex flex-col gap-6 p-4 pt-6 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-24">
      {/* Fixed Header with back button */}
      <div className="flex items-center gap-4 py-2 border-b border-muted-foreground/10 mb-4 bg-white/50 backdrop-blur-md sticky top-0 z-10 -mx-4 px-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-xl font-black text-foreground/90 truncate">{data.title}</h1>
        </div>
      </div>

      <Card className="border-none shadow-lg bg-white overflow-hidden rounded-[2rem]">
        <div className="h-48 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center p-12 overflow-hidden relative">
          <BookOpen className="w-24 h-24 text-white/20 absolute -right-4 -bottom-4" />
          <p className="text-white text-lg font-medium text-center relative z-10 leading-relaxed italic">
            "{data.lesson}"
          </p>
        </div>
        <CardContent className="p-8 space-y-8">
          <div className="space-y-4">
            <h3 className="text-xl font-black flex items-center gap-2">
              <CheckCircle2 className="text-primary w-5 h-5" />
              Key Takeaways
            </h3>
            <ul className="space-y-3">
              {data.takeaways.map((item: string, i: number) => (
                <li key={i} className="flex gap-3 text-muted-foreground font-medium text-sm leading-snug">
                  <span className="w-5 h-5 bg-blue-50 text-primary flex items-center justify-center rounded-full text-[10px] shrink-0 font-bold">{i+1}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <Separator className="opacity-50" />

          <div className="space-y-4">
            <h3 className="text-xl font-black flex items-center gap-2">
              <Sparkles className="text-amber-500 w-5 h-5" />
              {t('practice_with_ai')}
            </h3>
            <p className="text-sm text-muted-foreground leading-normal">
              Put these skills to use in a safe environment. The AI will provide coaching as you go.
            </p>
            <Button 
              className="w-full h-12 rounded-xl text-lg font-bold shadow-md bg-amber-500 hover:bg-amber-600 text-white"
              onClick={() => router.push(`/chat?type=sandbox&slug=${slug}`)}
            >
              <PlayCircle className="w-5 h-5 mr-2" />
              {t('start')} Sandbox
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="h-8" />
    </div>
  );
}

