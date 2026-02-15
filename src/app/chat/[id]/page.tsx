'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/utils/storage';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { Send, ArrowLeft, MoreVertical, Sparkles, Loader2, Info, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import EndConversationModal from './EndConversationModal';

export default function ChatScreen() {
  const router = useRouter();
  const { id } = useParams();
  const { t, lang } = useTranslation();
  
  const [conversations, setConversations] = useLocalStorage<any[]>(STORAGE_KEYS.CONVERSATIONS, []);
  const [messages, setMessages] = useLocalStorage<any[]>(STORAGE_KEYS.MESSAGES, []);
  const [inputText, setInputText] = useState('');
  
  const [showEndModal, setShowEndModal] = useState(false);
  const [showCrisisModal, setShowCrisisModal] = useState(false);
  const [isClassifying, setIsClassifying] = useState(false);
  const [classifierFlagged, setClassifierFlagged] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isResponding, setIsResponding] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  const currentConv = useMemo(() => conversations.find((c) => c.id === id), [conversations, id]);
  const chatMessages = useMemo(() => messages.filter((m) => m.conversation_id === id), [messages, id]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages, isResponding]);

  // Handle missing friend/AI responses
  useEffect(() => {
    if (chatMessages.length > 0 && chatMessages[chatMessages.length - 1].sender_type === 'user' && !isResponding) {
      const timer = setTimeout(() => {
        handleIncomingResponse();
      }, 3000); // 3 second delay for response
      return () => clearTimeout(timer);
    }
  }, [chatMessages]);

  const handleIncomingResponse = async () => {
    if (isResponding) return;
    setIsResponding(true);

    try {
      const response = await fetch('/api/chat/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: chatMessages,
          intensity: currentConv?.initialIntensity || 50,
          language: lang,
        }),
      });
      const data = await response.json();
      
      const newMessage = {
        id: Date.now().toString(),
        conversation_id: id,
        content: data.content,
        sender_type: 'other',
        timestamp: new Date().toISOString(),
      };

      setMessages([...messages, newMessage]);
      setConversations(conversations.map(c => c.id === id ? { ...c, lastMessage: data.content } : c));
      
      if (data.escalation_required) {
        setShowCrisisModal(true);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsResponding(false);
    }
  };

  const handleSendMessage = async (textOverride?: string) => {
    const text = textOverride || inputText;
    if (!text.trim()) return;

    setIsClassifying(true);
    setInputText('');

    try {
      // Step 1: Classify appropriateness
      const response = await fetch('/api/chat/classify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, language: lang }),
      });
      const data = await response.json();

      if (data.tone === 'Dismissive' || data.tone === 'Aggressive' || data.safety_flag) {
        setSuggestions(data.suggestions || ["I hear you, tell me more.", "I'm here for you.", "It makes sense that you feel this way."]);
        setClassifierFlagged(true);
        // Temporarily put text back so they don't lose it if they close sheet
        setInputText(text);
        return;
      }

      // Step 2: Send if okay
      const newMessage = {
        id: Date.now().toString(),
        conversation_id: id,
        content: text,
        sender_type: 'user',
        timestamp: new Date().toISOString(),
      };

      setMessages([...messages, newMessage]);
      setConversations(conversations.map(c => c.id === id ? { ...c, lastMessage: text } : c));
      setClassifierFlagged(false);
    } catch (e) {
      console.error(e);
    } finally {
      setIsClassifying(false);
    }
  };

  const handleApplySuggestion = (suggestion: string) => {
    setClassifierFlagged(false);
    setInputText(suggestion);
  };

  if (!currentConv) return null;

  return (
    <div className="flex flex-col h-[100vh] fixed inset-0 max-w-[390px] mx-auto bg-slate-50">
      {/* Header */}
      <header className="glass h-16 flex items-center justify-between px-4 z-10 shrink-0">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <p className="font-bold text-lg leading-none">{t('someone')}</p>
            <div className="flex items-center gap-1 mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">In Circle</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setShowEndModal(true)}>
             <Badge variant="outline" className="text-rose-500 border-rose-200 bg-rose-50 px-2 py-0.5">{t('end')}</Badge>
          </Button>
        </div>
      </header>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 pb-32 pt-6"
      >
        <div className="flex flex-col items-center gap-2 my-4 opacity-40">
           <Separator className="w-24" />
           <span className="text-[10px] font-bold uppercase tracking-widest">{new Date(currentConv.createdAt).toLocaleDateString()}</span>
           <Separator className="w-24" />
        </div>

        {chatMessages.map((m, idx) => (
          <div 
            key={m.id} 
            className={cn(
              "flex flex-col max-w-[85%] animate-in fade-in slide-in-from-bottom-2 duration-300",
              m.sender_type === 'user' ? "self-end items-end" : "self-start items-start"
            )}
          >
            <div className={cn(
              "px-4 py-3 rounded-[1.25rem] text-sm shadow-sm",
              m.sender_type === 'user' 
                ? "bg-primary text-white rounded-tr-none" 
                : "bg-white text-foreground rounded-tl-none border border-black/5"
            )}>
              {m.content}
            </div>
          </div>
        ))}

        {isResponding && (
          <div className="bg-white/50 px-4 py-2 rounded-full w-fit self-start border border-black/5 text-[10px] font-bold text-muted-foreground flex items-center gap-2">
            <Loader2 className="w-3 h-3 animate-spin" />
            SOMEONE IS TYPING...
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] p-4 pt-1 bg-white/80 backdrop-blur-md border-t border-muted/50 z-20">
        {isClassifying && (
          <div className="flex items-center gap-2 mb-2 px-1 text-primary animate-pulse">
            <Sparkles className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-tighter">{t('checking_appropriateness')}</span>
          </div>
        )}

        <div className="flex items-center gap-2 bg-slate-100/80 p-1.5 rounded-2xl shadow-inner border border-black/5">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message..."
            rows={1}
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 px-3 resize-none max-h-32 font-medium"
            disabled={isClassifying}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button 
            size="icon" 
            className="rounded-xl h-10 w-10 shrink-0 shadow-lg"
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim() || isClassifying}
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Suggestion Sheet */}
      <Sheet open={classifierFlagged} onOpenChange={setClassifierFlagged}>
        <SheetContent side="bottom" className="rounded-t-[2rem] border-none shadow-2xl p-8 pb-12">
          <SheetHeader className="items-center text-center">
            <div className="bg-amber-100 p-3 rounded-full mb-2">
               <AlertTriangle className="w-8 h-8 text-amber-600" />
            </div>
            <SheetTitle className="text-2xl font-black">{t('need_help_responding')}</SheetTitle>
            <SheetDescription className="text-base font-medium">
              Your message might feel dismissive to someone in distress. Try one of these emotionally validated alternatives:
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-3 mt-8">
            {suggestions.map((s, i) => (
              <Button 
                key={i} 
                variant="outline" 
                className="justify-start text-left h-auto py-4 px-6 rounded-2xl border-2 hover:border-primary hover:bg-primary/5 transition-all text-sm font-bold"
                onClick={() => handleApplySuggestion(s)}
              >
                {s}
              </Button>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {/* Crisis Modal */}
      {showCrisisModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
           <Card className="border-none shadow-2xl bg-white max-w-sm rounded-[2rem] p-6 text-center">
              <div className="mx-auto bg-rose-100 p-4 rounded-full w-fit mb-4">
                <Heart className="w-10 h-10 text-rose-500 fill-rose-500/20" />
              </div>
              <h2 className="text-2xl font-black text-rose-600 mb-2">{t('you_are_not_alone')}</h2>
              <p className="text-muted-foreground font-medium mb-6">
                {t('crisis_desc')}
              </p>
              <div className="space-y-3 mb-8">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Vandrevala Foundation</p>
                  <p className="text-lg font-black text-foreground">1860 2662 345</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">iCall</p>
                  <p className="text-lg font-black text-foreground">9152987821</p>
                </div>
              </div>
              <Button onClick={() => setShowCrisisModal(false)} className="w-full h-12 rounded-xl text-lg font-bold">
                {t('i_understand')}
              </Button>
           </Card>
        </div>
      )}

      {showEndModal && (
        <EndConversationModal 
          initialIntensity={currentConv.initialIntensity}
          onComplete={(moodDelta, feedback) => {
            // Logic to end conversation
            setConversations(conversations.filter(c => c.id !== id));
            router.push('/chat');
          }}
        />
      )}
    </div>
  );
}

