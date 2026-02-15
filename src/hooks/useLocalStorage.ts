'use client';

import { useState, useEffect } from 'react';
import { getFromStorage, saveToStorage } from '@/utils/storage';

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(() => {
    return getFromStorage(key, defaultValue);
  });

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        setValue(JSON.parse(e.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  const setLocalStorageValue = (newValue: T) => {
    setValue(newValue);
    saveToStorage(key, newValue);
  };

  return [value, setLocalStorageValue] as const;
}
