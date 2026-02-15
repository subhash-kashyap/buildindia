'use client';

import { useRouter } from 'next/navigation';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, PlayCircle, BookCheck, Star, ChevronRight } from 'lucide-react';

const MODULES = [
  {
    slug: 'validation',
    title: 'The Art of Validation',
    description: 'Learn to make people feel heard without needing to agree.',
    level: 'Beginner',
    time: '5 min'
  },
  {
    slug: 'active-listening',
    title: 'Active Listening',
    description: 'Practical tools to reflect and summarize during a conversation.',
    level: 'Intermediate',
    time: '8 min'
  },
  {
    slug: 'boundaries',
    title: 'Healthy Boundaries',
    description: 'How to support others without draining yourself.',
    level: 'Intermediate',
    time: '6 min'
  }
];

export default function EducateList() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-6 p-4 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-foreground/90">{t('educate')}</h1>
        <p className="text-muted-foreground font-medium italic">Master the skills of peer support.</p>
      </div>

      <div className="flex flex-col gap-4">
        {MODULES.map((module) => (
          <Card 
            key={module.slug} 
            onClick={() => router.push(`/educate/${module.slug}`)}
            className="border-none shadow-sm hover:shadow-md transition-all cursor-pointer bg-white group"
          >
            <CardContent className="p-0 overflow-hidden">
               <div className="h-2 bg-gradient-to-r from-blue-100 to-indigo-100 group-hover:from-blue-200 group-hover:to-indigo-200" />
               <div className="p-5 flex items-center justify-between">
                 <div className="flex-1">
                   <div className="flex items-center gap-2 mb-2">
                     <Badge variant="secondary" className="bg-blue-50 text-blue-600 font-bold">{module.level}</Badge>
                     <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{module.time}</span>
                   </div>
                   <h2 className="text-xl font-black text-foreground/90 mb-1">{module.title}</h2>
                   <p className="text-sm text-muted-foreground leading-snug">{module.description}</p>
                 </div>
                 <ChevronRight size={24} className="text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
               </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-amber-50 border-none shadow-none mt-4">
        <CardContent className="p-6 flex flex-col gap-4">
           <div className="bg-white p-3 rounded-2xl w-fit shadow-sm text-amber-500">
             <Star className="fill-current w-6 h-6" />
           </div>
           <div>
             <h3 className="text-lg font-black text-amber-900">Premium Content</h3>
             <p className="text-sm text-amber-800/70">Certificate courses and expert-led webinars coming soon.</p>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}

