'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/utils/storage';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, CheckCircle2, Circle, Users, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const MOCK_CONTACTS = [
  { id: '1', name: 'Alok Singh' },
  { id: '2', name: 'Priya Verma' },
  { id: '3', name: 'Rahul Rao' },
  { id: '4', name: 'Sneha Kapur' },
  { id: '5', name: 'Vikram Seth' },
  { id: '6', name: 'Ishaan Gupta' },
  { id: '7', name: 'Ananya Roy' },
];

export default function ContactImport() {
  const router = useRouter();
  const { t } = useTranslation();
  const [user, setUser] = useLocalStorage<any>(STORAGE_KEYS.USER, {});
  const [_, setOnboardingComplete] = useLocalStorage(STORAGE_KEYS.ONBOARDING_COMPLETE, false);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);

  const filtered = MOCK_CONTACTS.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleContact = (id: string) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleFinish = () => {
    const hashedContacts = selected.map(id => `hash_${id}`);
    setUser({ ...user, circle: hashedContacts });
    setOnboardingComplete(true);
    router.push('/');
  };

  const handleGoogleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 2000);
  };

  return (
    <div className="flex flex-col gap-8 p-6 pt-10 animate-in fade-in slide-in-from-right-4 duration-700 pb-32">
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-foreground tracking-tighter italic">Tight-Knit Circle</h1>
        <p className="text-muted-foreground font-bold text-sm tracking-tight opacity-60">Pick the friends you want to notify when you’re low.</p>
      </div>

      <div className="space-y-4">
        <Button 
          variant="outline" 
          onClick={handleGoogleSync}
          className="w-full h-14 rounded-2xl border-black/[0.03] shadow-premium bg-white/40 hover:bg-white/60 font-black flex items-center justify-center gap-3 premium-transition"
          disabled={isSyncing}
        >
          {isSyncing ? (
             <span className="flex items-center gap-2 animate-pulse"><Sparkles className="w-4 h-4" /> Syncing...</span>
          ) : (
             <>
               <Users className="w-4 h-4 text-primary" strokeWidth={1.5} />
               <span>Sync with Google Contacts</span>
             </>
          )}
        </Button>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" strokeWidth={1.5} />
          <Input 
            placeholder="Search friends..." 
            value={search}
            onChange={(e: any) => setSearch(e.target.value)}
            className="pl-11 h-12 bg-white/40 backdrop-blur-md rounded-2xl border-black/[0.03] shadow-sm font-bold text-sm"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {filtered.map((contact) => (
          <Card 
            key={contact.id} 
            onClick={() => toggleContact(contact.id)}
            className={cn(
              "border-none shadow-premium cursor-pointer premium-transition rounded-[1.75rem] overflow-hidden border border-black/[0.01]",
              selected.includes(contact.id) ? "bg-primary/5 ring-1 ring-primary/20" : "bg-white/60 hover:bg-white/80"
            )}
          >
            <CardContent className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-11 h-11 rounded-2xl flex items-center justify-center font-black text-sm premium-transition",
                  selected.includes(contact.id) ? "bg-primary text-white" : "bg-secondary text-primary/40"
                )}>
                  {contact.name[0]}
                </div>
                <div>
                  <p className="font-black text-foreground tracking-tight italic">{contact.name}</p>
                </div>
              </div>
              {selected.includes(contact.id) ? (
                <div className="bg-primary p-1 rounded-full"><CheckCircle2 className="text-white w-4 h-4" strokeWidth={2.5} /></div>
              ) : (
                <Circle className="text-muted-foreground/20 w-5 h-5" strokeWidth={1} />
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] p-6 pb-12 bg-background/95 backdrop-blur-xl border-t border-black/[0.03] z-50">
        <Button 
          onClick={handleFinish} 
          disabled={selected.length === 0}
          className="w-full h-16 text-xl font-black rounded-[2rem] shadow-premium bg-primary hover:bg-primary/95 text-white active:scale-[0.98] premium-transition"
        >
          {t('continue')} ({selected.length})
        </Button>
      </div>
    </div>
  );
}
