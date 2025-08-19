"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot, BookOpen, HelpCircle, LayoutDashboard, DollarSign, Search, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/lessons', icon: BookOpen, label: 'AI Tutor' },
  { href: '/quizzes', icon: HelpCircle, label: 'Quizzes' },
  { href: '/search', icon: Search, label: 'Concept Search' },
  { href: '/market-chat', icon: MessageSquare, label: 'Market Chat' },
];

export default function Sidebar() {
  const pathname = usePathname();

  // Redirect root to dashboard
  const getHref = (href: string) => (href === '/' ? '/dashboard' : href);
  const checkActive = (href: string) => {
      if (href === '/dashboard' && pathname === '/') return true;
      return pathname === href;
  }

  return (
    <aside className="hidden md:flex md:flex-col md:w-64 bg-card border-r shrink-0">
      <div className="flex flex-col h-full">
        <div className="p-4 border-b">
          <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg text-primary">
            <DollarSign className="h-7 w-7 stroke-[2.5]" />
            <span>G-Invest</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Button
              key={item.label}
              variant={checkActive(item.href) ? 'default' : 'ghost'}
              className="w-full justify-start gap-3 text-base"
              asChild
            >
              <Link href={getHref(item.href)}>
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>
        <div className="p-4 border-t mt-auto">
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                    <Bot className="h-8 w-8 text-primary" />
                </div>
                <div>
                    <p className="font-semibold">AI Features by</p>
                    <p className="text-sm text-muted-foreground">Google AI</p>
                </div>
            </div>
        </div>
      </div>
    </aside>
  );
}
