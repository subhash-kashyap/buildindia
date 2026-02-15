'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, MessageCircle, BookOpen, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Chat', href: '/chat', icon: MessageCircle },
    { label: 'Educate', href: '/educate', icon: BookOpen },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-[400px] h-16 glass flex justify-around items-center px-6 z-50 rounded-3xl shadow-premium border border-white/20">
      {navItems.map((item) => {
        const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
        const Icon = item.icon;
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "relative flex flex-col items-center gap-1 p-2 premium-transition",
              isActive ? "text-primary" : "text-muted-foreground/60 hover:text-foreground/80"
            )}
          >
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            {isActive && (
              <span className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
