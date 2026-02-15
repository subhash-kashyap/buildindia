export const STORAGE_KEYS = {
  USER: 'buildindia_user',
  CONVERSATIONS: 'buildindia_conversations',
  MESSAGES: 'buildindia_messages',
  ONBOARDING_COMPLETE: 'buildindia_onboarding_complete',
};

export const getFromStorage = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : defaultValue;
};

export const saveToStorage = <T>(key: string, value: T): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(value));
};

export const clearStorage = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.clear();
};
