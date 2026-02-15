'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/utils/storage';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Send, 
  ArrowLeft, 
  Sparkles, 
  Loader2, 
  AlertTriangle, 
  Heart,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
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

  useEffect(() => {
    if (chatMessages.length > 0 && chatMessages[chatMessages.length - 1].sender_type === 'user' && !isResponding) {
      const timer = setTimeout(() => {
        handleIncomingResponse();
      }, 3000);
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
      const response = await fetch('/api/chat/classify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, language: lang }),
      });
      const data = await response.json();

      if (data.tone === 'Dismissive' || data.tone === 'Aggressive' || data.safety_flag) {
        setSuggestions(data.suggestions || ["I hear you, tell me more.", "I'm here for you.", "It makes sense that you feel this way."]);
        setClassifierFlagged(true);
        setInputText(text);
        return;
      }

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
    <div className="flex flex-col h-[100vh] fixed inset-0 max-w-[430px] mx-auto bg-background">
      {/* Zen Header */}
      <header className="glass h-20 flex items-center justify-between px-6 z-30 shrink-0 shadow-sm">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full bg-white/40 shadow-premium border border-black/5 w-10 h-10">
            <ArrowLeft className="w-5 h-5 text-muted-foreground" strokeWidth={2.5} />
          </Button>
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border border-black/5 shadow-sm">
              <AvatarFallback className="bg-secondary text-primary font-black text-xs">S</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-black text-base leading-none tracking-tight italic">Support Circle</p>
              <div className="flex items-center gap-1.5 mt-1 opacity-60">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="text-[9px] text-muted-foreground uppercase tracking-widest font-black">Encrypted</span>
              </div>
            </div>
          </div>
        </div>
        <Button 
          variant="ghost" 
          className="rounded-full font-black text-primary/60 hover:text-primary hover:bg-white/60 bg-white/30 px-4 py-2 text-[10px] uppercase tracking-wider border border-black/5 shadow-sm" 
          onClick={() => setShowEndModal(true)}
        >
          {t('end')}
        </Button>
      </header>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-6 flex flex-col gap-6 pb-40 pt-10 bg-white/20"
      >
        <div className="flex flex-col items-center gap-2 my-8 opacity-60">
           <div className="bg-white/80 px-4 py-1.5 rounded-full border border-black/[0.03]">
             <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">{new Date(currentConv.createdAt).toLocaleDateString()}</span>
           </div>
        </div>

        {chatMessages.map((m, idx) => (
          <div 
            key={m.id} 
            className={cn(
              "flex flex-col max-w-[85%] animate-in fade-in duration-500",
              m.sender_type === 'user' ? "self-end items-end" : "self-start items-start"
            )}
          >
            <div className={cn(
              "px-5 py-4 text-base font-bold leading-relaxed border shadow-sm",
              m.sender_type === 'user' 
                ? "bg-primary text-white rounded-[1.75rem] rounded-tr-none border-primary/5 shadow-premium" 
                : "bg-white text-foreground rounded-[1.75rem] rounded-tl-none border-black/5 shadow-premium"
            )}>
              {m.content}
            </div>
            <span className="text-[9px] font-black text-muted-foreground/30 mt-1.5 uppercase tracking-tighter px-1">
              {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        ))}

        {isResponding && (
          <div className="bg-white/60 px-5 py-3 rounded-full w-fit self-start border border-black/[0.03] shadow-premium flex items-center gap-3">
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/20 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-primary/20 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-primary/20 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="text-[9px] font-black text-muted-foreground/60 uppercase tracking-widest mt-0.5 whitespace-nowrap">Typing...</span>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] p-6 pb-12 bg-background/95 backdrop-blur-xl border-t border-black/[0.03] z-40">
        <div className="flex flex-col gap-3">
          {isClassifying && (
            <div className="flex items-center gap-2 mb-1 px-1 text-primary/40 animate-pulse">
              <Sparkles className="w-4 h-4" />
              <span className="text-[9px] font-black uppercase tracking-widest italic">{t('checking_appropriateness')}</span>
            </div>
          )}

          <div className="flex items-center gap-3 bg-white/80 border border-black/5 p-2 pl-5 rounded-[2rem] shadow-premium-lg focus-within:ring-2 focus-within:ring-primary/10">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Be kind..."
              rows={1}
              className="flex-1 bg-transparent border-none focus:ring-0 text-base py-2.5 resize-none max-h-32 font-bold text-foreground placeholder:text-muted-foreground/30"
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
              className="rounded-2xl h-11 w-11 shrink-0 shadow-lg bg-primary hover:bg-primary/95 text-white active:scale-95 premium-transition"
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim() || isClassifying}
            >
              <Send className="w-5 h-5" strokeWidth={2} />
            </Button>
          </div>
        </div>
      </div>

      {/* Suggestion Sheet */}
      <Sheet open={classifierFlagged} onOpenChange={setClassifierFlagged}>
        <SheetContent side="bottom" className="rounded-t-[3rem] border-none shadow-2xl p-10 pb-16 bg-white">
          <SheetHeader className="items-center text-center space-y-4">
            <div className="bg-secondary p-5 rounded-[2rem] border border-black/5 shadow-sm">
               <AlertTriangle className="w-10 h-10 text-primary" strokeWidth={1.5} />
            </div>
            <div className="space-y-2">
              <SheetTitle className="text-3xl font-black tracking-tight italic">{t('need_help_responding')}</SheetTitle>
              <SheetDescription className="text-lg font-bold text-muted-foreground/60 max-w-xs mx-auto leading-relaxed">
                Try a more emotionally validating tone for your peer.
              </SheetDescription>
            </div>
          </SheetHeader>
          <div className="grid grid-cols-1 gap-4 mt-10">
            {suggestions.map((s, i) => (
              <Button 
                key={i} 
                variant="outline" 
                className="justify-start text-left h-auto py-5 px-7 rounded-[1.75rem] border border-black/5 hover:border-primary/20 hover:bg-primary/5 premium-transition text-base font-bold shadow-sm"
                onClick={() => handleApplySuggestion(s)}
              >
                <div className="flex items-center gap-4">
                  <div className="bg-primary/5 p-1.5 rounded-lg"><CheckCircle2 className="w-4 h-4 text-primary" /></div>
                  <span className="leading-tight">{s}</span>
                </div>
              </Button>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {/* Crisis Modal */}
      {showCrisisModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-md animate-in fade-in duration-500">
           <Card className="border-none shadow-premium-lg bg-white max-w-sm rounded-[3rem] p-8 text-center border border-black/5">
              <div className="mx-auto bg-secondary p-6 rounded-[2rem] w-fit mb-6 border border-black/5 shadow-sm">
                <Heart className="w-12 h-12 text-primary fill-primary/5" strokeWidth={1.5} />
              </div>
              <h2 className="text-3xl font-black text-foreground mb-3 tracking-tighter italic">{t('you_are_not_alone')}</h2>
              <p className="text-muted-foreground font-bold mb-8 leading-relaxed opacity-60">
                {t('crisis_desc')}
              </p>
              <div className="space-y-4 mb-10">
                <div className="bg-secondary/40 p-5 rounded-[1.75rem] border border-black/5 shadow-sm">
                  <p className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-widest mb-1">Vandrevala Foundation</p>
                  <p className="text-xl font-black text-foreground tracking-tight italic">1860 2662 345</p>
                </div>
              </div>
              <Button onClick={() => setShowCrisisModal(false)} className="w-full h-16 rounded-[2rem] text-xl font-black shadow-lg bg-primary hover:bg-primary/95 text-white">
                {t('i_understand')}
              </Button>
           </Card>
        </div>
      )}

      {showEndModal && (
        <EndConversationModal 
          initialIntensity={currentConv.initialIntensity}
          onComplete={(moodDelta, feedback) => {
            setConversations(conversations.filter(c => c.id !== id));
            router.push('/chat');
          }}
        />
      )}
    </div>
  );
}
