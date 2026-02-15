'use client';

import { useRouter } from 'next/navigation';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/utils/storage';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { SignOutButton } from '@clerk/nextjs';
import { Globe, Bell, Shield, LogOut, Trash2, Zap, UserPlus, ChevronRight } from 'lucide-react';

export default function SettingsPage() {
  const router = useRouter();
  const { t, lang } = useTranslation();
  const [user, setUser] = useLocalStorage<any>(STORAGE_KEYS.USER, { language: 'en' });
  const [activeRequests, setActiveRequests] = useLocalStorage<any[]>('buildindia_low_requests', []);

  const handleLanguageChange = (value: string) => {
    setUser({ ...user, language: value });
    window.location.reload();
  };

  const handleResetData = () => {
    if (confirm("Are you sure? This will delete all your conversations and data.")) {
      localStorage.clear();
      window.location.href = '/onboarding';
    }
  };

  const handleTriggerSupport = () => {
    const newRequest = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      intensity: 50,
      user_name: 'Friend'
    };
    setActiveRequests([...activeRequests, newRequest]);
    alert("Support request triggered (Simulated)");
  };

  return (
    <div className="flex flex-col gap-8 pb-32 animate-in fade-in duration-1000">
      <div className="flex flex-col gap-1 py-4">
        <h1 className="text-4xl font-black tracking-tighter text-foreground italic">{t('settings')}</h1>
        <p className="text-muted-foreground font-bold text-sm tracking-tight opacity-40">Preferences & Tools</p>
      </div>

      <div className="space-y-6">
        <Card className="border-none shadow-premium bg-white/40 backdrop-blur-md p-2 rounded-[2.5rem] border border-black/[0.02]">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary/5 p-2 rounded-xl text-primary border border-black/[0.03]">
                <Globe className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <CardTitle className="text-xl font-black tracking-tight italic">{t('language')}</CardTitle>
            </div>
            <CardDescription className="font-bold text-xs">Choose your preferred language.</CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={lang} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-full bg-white/60 border-none rounded-2xl h-12 shadow-sm font-bold">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-none shadow-premium-lg">
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
                <SelectItem value="ta">தமிழ் (Tamil)</SelectItem>
                <SelectItem value="bn">বাংলা (Bengali)</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card className="border-none shadow-premium bg-white/40 backdrop-blur-md p-2 rounded-[2.5rem] border border-black/[0.02]">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary/5 p-2 rounded-xl text-primary border border-black/[0.03]">
                <Bell className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <CardTitle className="text-xl font-black tracking-tight italic">{t('notifications')}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="peer-notifications" className="font-bold text-muted-foreground/80">Support Pulse Alerts</Label>
              <Switch id="peer-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="system-notifications" className="font-bold text-muted-foreground/80">Growth Insights</Label>
              <Switch id="system-notifications" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-premium bg-white/40 backdrop-blur-md p-2 rounded-[2.5rem] border border-black/[0.02]">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary/5 p-2 rounded-xl text-yellow-500 border border-black/[0.03]">
                <Zap className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <CardTitle className="text-xl font-black tracking-tight italic">Dev Sandbox</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Button 
                onClick={handleTriggerSupport}
                className="w-full h-12 rounded-2xl bg-white/60 text-foreground border border-black/[0.03] shadow-sm hover:bg-white font-black flex items-center justify-start gap-3 premium-transition"
            >
              <Zap className="w-4 h-4 text-yellow-500" strokeWidth={2} />
              Simulate Support Request
            </Button>
          </CardContent>
        </Card>

        <Card className="border-none shadow-premium bg-white/40 backdrop-blur-md p-2 rounded-[2.5rem] border border-black/[0.02]">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary/5 p-2 rounded-xl text-primary border border-black/[0.03]">
                <UserPlus className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <CardTitle className="text-xl font-black tracking-tight italic">Circle Management</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Button 
                onClick={() => alert("Invite link copied!")}
                className="w-full h-14 rounded-2xl bg-white/60 text-foreground border border-black/[0.03] shadow-sm hover:bg-white font-black flex items-center justify-between px-6 premium-transition"
            >
              <div className="flex items-center gap-3">
                <UserPlus className="w-4 h-4 text-primary" strokeWidth={1.5} />
                <span>Invite Trusted Friends</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground/30" strokeWidth={2.5} />
            </Button>
          </CardContent>
        </Card>

        <Card className="border-none shadow-premium bg-white/40 backdrop-blur-md p-2 rounded-[2.5rem] border border-black/[0.02]">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary/5 p-2 rounded-xl text-primary border border-black/[0.03]">
                <Shield className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <CardTitle className="text-xl font-black tracking-tight italic">Privacy Policy</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground font-bold leading-relaxed opacity-60">
              Tight Knit is built for security. Your pulses are only seen by people you trust. We do not store identifiable personal phone data.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4 mt-6">
        <SignOutButton>
          <Button 
            className="w-full h-14 rounded-[1.75rem] bg-secondary/60 text-primary hover:bg-secondary font-black flex items-center justify-start gap-4 px-8 premium-transition"
          >
            <LogOut className="w-4 h-4" strokeWidth={2} />
            {t('logout')}
          </Button>
        </SignOutButton>
        
        <Button 
          onClick={handleResetData}
          className="w-full h-14 rounded-[1.75rem] border border-black/[0.03] text-rose-500/60 hover:text-rose-500 hover:bg-rose-50/50 bg-transparent font-black flex items-center justify-start gap-4 px-8 premium-transition"
        >
          <Trash2 className="w-4 h-4" strokeWidth={2} />
          {t('reset_data')}
        </Button>
      </div>
    </div>
  );
}
