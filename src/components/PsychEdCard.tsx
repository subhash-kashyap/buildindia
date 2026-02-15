'use client';

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb } from 'lucide-react';

interface PsychEdCardProps {
  title: string;
  actionableSentence: string;
  category?: string;
}

export default function PsychEdCard({ title, actionableSentence, category = "Daily Growth" }: PsychEdCardProps) {
  return (
    <Card className="border-none shadow-lg bg-gradient-to-br from-indigo-50 to-purple-50 hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge variant="secondary" className="bg-white/80 text-primary font-semibold">
            {category}
          </Badge>
          <Lightbulb className="w-5 h-5 text-yellow-500" />
        </div>
        <CardTitle className="text-xl font-bold text-foreground/80 mt-2">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed italic">
          &quot;{actionableSentence}&quot;
        </p>
      </CardContent>
    </Card>
  );
}

