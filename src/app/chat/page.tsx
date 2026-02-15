'use client';

import { useRouter } from 'next/navigation';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/utils/storage';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, ChevronRight, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ChatList() {
  const router = useRouter();
  const { t } = useTranslation();
  const [conversations] = useLocalStorage<any[]>(STORAGE_KEYS.CONVERSATIONS, []);

  return (
    <div className="flex flex-col gap-6 p-4 animate-in fade-in slide-in-from-right-4 duration-500">
      <h1 className="text-3xl font-black text-foreground/90">{t('chats')}</h1>

      {conversations.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center gap-4 opacity-50">
          <div className="bg-muted p-6 rounded-full">
            <MessageSquare size={48} className="text-muted-foreground" />
          </div>
          <p className="text-lg font-medium">{t('no_active_convs')}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {conversations.map((conv) => (
            <Card 
              key={conv.id} 
              onClick={() => router.push(`/chat/${conv.id}`)}
              className="border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white"
            >
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-400">
                  <User size={28} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center bg-">
                    <p className="font-bold text-lg text-foreground/90">{t('someone')}</p>
                    <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                      {new Date(conv.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-muted-foreground truncate text-sm">
                    {conv.lastMessage || "Click to start chatting..."}
                  </p>
                </div>
                <ChevronRight size={20} className="text-muted-foreground/30" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

