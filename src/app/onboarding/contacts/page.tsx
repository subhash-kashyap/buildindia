'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/utils/storage';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, CheckCircle2, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

const MOCK_CONTACTS = [
  { id: '1', name: 'Alok Singh', phone: '9876543210' },
  { id: '2', name: 'Priya Verma', phone: '9988776655' },
  { id: '3', name: 'Rahul Rao', phone: '9122334455' },
  { id: '4', name: 'Sneha Kapur', phone: '9998887776' },
  { id: '5', name: 'Vikram Seth', phone: '8877665544' },
];

export default function ContactImport() {
  const router = useRouter();
  const { t } = useTranslation();
  const [user, setUser] = useLocalStorage<any>(STORAGE_KEYS.USER, {});
  const [_, setOnboardingComplete] = useLocalStorage(STORAGE_KEYS.ONBOARDING_COMPLETE, false);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string[]>([]);

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

  return (
    <div className="flex flex-col gap-6 p-4 animate-in fade-in slide-in-from-right-4 duration-500 pb-24">
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-foreground/90">{t('pick_circle')}</h1>
        <p className="text-muted-foreground leading-snug">{t('circle_desc')}</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input 
          placeholder={t('search_contacts')} 
          value={search}
          onChange={(e: any) => setSearch(e.target.value)}
          className="pl-10 h-12 bg-white rounded-xl border-none shadow-sm"
        />
      </div>

      <div className="flex flex-col gap-3">
        {filtered.map((contact) => (
          <Card 
            key={contact.id} 
            onClick={() => toggleContact(contact.id)}
            className={cn(
              "border-none shadow-sm cursor-pointer transition-all duration-200 hover:scale-[1.01]",
              selected.includes(contact.id) ? "bg-primary/5 ring-2 ring-primary" : "bg-white"
            )}
          >
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg",
                  selected.includes(contact.id) ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                )}>
                  {contact.name[0]}
                </div>
                <div>
                  <p className="font-bold text-foreground/90">{contact.name}</p>
                  <p className="text-sm text-muted-foreground">{contact.phone}</p>
                </div>
              </div>
              {selected.includes(contact.id) ? (
                <CheckCircle2 className="text-primary w-6 h-6" />
              ) : (
                <Circle className="text-muted-foreground/30 w-6 h-6" />
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] p-4 bg-white/80 backdrop-blur-md border-t border-muted/50 z-50">
        <Button 
          onClick={handleFinish} 
          disabled={selected.length === 0}
          className="w-full h-14 text-xl font-bold rounded-2xl shadow-lg"
        >
          {t('continue')} ({selected.length})
        </Button>
      </div>
    </div>
  );
}
