'use client';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/utils/storage';
import { translations } from '@/utils/translations';

export function useTranslation() {
  const [user] = useLocalStorage<{ language: string }>(STORAGE_KEYS.USER, { language: 'en' });
  const lang = (user?.language || 'en') as keyof typeof translations;
  
  const t = (key: keyof typeof translations['en']): string => {
    const dict = (translations[lang] || translations['en']);
    return (dict as Record<string, string>)[key] || translations['en'][key as keyof typeof translations['en']];
  };

  return { t, lang };
}

