'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, ChevronRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface PsychEdCardProps {
  title: string;
  actionableSentence: string;
  category?: string;
}

export default function PsychEdCard({ title, actionableSentence, category = "Daily Growth" }: PsychEdCardProps) {
  return (
    <Card className="border-none shadow-premium bg-white/60 backdrop-blur-sm hover:shadow-premium-lg premium-transition cursor-pointer group rounded-[2.5rem] overflow-hidden border border-white/20">
      {/* Soft Top Stripe */}
      <div className="h-3 bg-primary/10 group-hover:bg-primary/20 premium-transition" />
      
      <CardContent className="p-7 flex items-center justify-between gap-6">
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-3">
            <Badge className="bg-primary/5 text-primary border-none font-black px-4 py-1 rounded-full text-[10px] uppercase tracking-widest shadow-none">
              {category}
            </Badge>
            <div className="flex items-center gap-1.5 text-muted-foreground/60 font-black text-[10px] uppercase tracking-widest">
              <Sparkles className="w-3 h-3" />
              Mindful Tip
            </div>
          </div>
          
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-foreground tracking-tight leading-tight italic group-hover:text-primary premium-transition">
              {title}
            </h2>
            <p className="text-sm text-muted-foreground font-bold leading-relaxed">
              &quot;{actionableSentence}&quot;
            </p>
          </div>
        </div>
        
        <div className="bg-secondary/50 p-3 rounded-2xl group-hover:translate-x-1 group-hover:bg-primary/10 group-hover:text-primary premium-transition">
          <ChevronRight size={24} strokeWidth={2.5} className="text-muted-foreground/30" />
        </div>
      </CardContent>
    </Card>
  );
}
