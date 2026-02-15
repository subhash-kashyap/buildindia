'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, MessageCircle, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function BottomNav() {
  const pathname = usePathname();

  // Hide on onboarding, auth, and specific chat pages
  const isExcluded = pathname.startsWith('/onboarding') || pathname.startsWith('/sign-') || pathname.split('/').length > 2;
  if (isExcluded) return null;

  const navItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Chat', href: '/chat', icon: MessageCircle },
    { label: 'Educate', href: '/educate', icon: BookOpen },
  ];

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-4rem)] max-w-[380px] h-16 glass flex justify-around items-center px-6 z-50 rounded-[2rem] shadow-premium border border-black/5 animate-in slide-in-from-bottom-5 duration-700">
      {navItems.map((item) => {
        const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
        const Icon = item.icon;
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "relative flex flex-col items-center gap-1 p-2 premium-transition",
              isActive ? "text-primary" : "text-muted-foreground/40 hover:text-foreground/80"
            )}
          >
            <Icon size={22} strokeWidth={isActive ? 2 : 1.5} />
            {isActive && (
              <span className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
