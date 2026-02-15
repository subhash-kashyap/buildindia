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
import { Separator } from '@/components/ui/separator';
import { SignOutButton } from '@clerk/nextjs';
import { Globe, Bell, Shield, LogOut, Trash2, Zap } from 'lucide-react';

export default function SettingsPage() {
  const router = useRouter();
  const { t, lang } = useTranslation();
  const [user, setUser] = useLocalStorage<any>(STORAGE_KEYS.USER, { language: 'en' });
  const [activeRequests, setActiveRequests] = useLocalStorage<any[]>('buildindia_low_requests', []);

  const handleLanguageChange = (value: string) => {
    setUser({ ...user, language: value });
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
    };
    setActiveRequests([...activeRequests, newRequest]);
    alert("Support request triggered (Simulated)");
  };

  return (
    <div className="flex flex-col gap-6 max-w-md mx-auto p-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-3xl font-extrabold tracking-tight text-foreground/90">{t('settings')}</h1>

      <Card className="border-none shadow-md bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            <CardTitle>{t('language')}</CardTitle>
          </div>
          <CardDescription>Choose your preferred language for the app.</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={lang} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
              <SelectItem value="ta">தமிழ் (Tamil)</SelectItem>
              <SelectItem value="bn">বাংলা (Bengali)</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card className="border-none shadow-md bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            <CardTitle>{t('notifications')}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="peer-notifications">Peer Support Alerts</Label>
            <Switch id="peer-notifications" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="system-notifications">System Updates</Label>
            <Switch id="system-notifications" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-md bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            <CardTitle>Prototype Tools</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="w-full justify-start gap-2 h-11" onClick={handleTriggerSupport}>
            <Zap className="w-4 h-4" />
            Trigger Demo Support Request
          </Button>
        </CardContent>
      </Card>

      <Card className="border-none shadow-md bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <CardTitle>{t('privacy_info')}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Your conversations are private and pseudo-anonymous. We do not share your identity within your contact circle.
          </p>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-3 mt-4">
        <Button variant="destructive" className="w-full justify-start gap-2 h-11" onClick={handleResetData}>
          <Trash2 className="w-4 h-4" />
          {t('reset_data')}
        </Button>
        
        <SignOutButton>
          <Button variant="secondary" className="w-full justify-start gap-2 h-11">
            <LogOut className="w-4 h-4" />
            {t('logout')}
          </Button>
        </SignOutButton>
      </div>
    </div>
  );
}
