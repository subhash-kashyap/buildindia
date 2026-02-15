'use client';

import { useEffect, useState } from 'react';

export default function Hydrated({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  return <>{children}</>;
}
