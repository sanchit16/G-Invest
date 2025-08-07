"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot, BookOpen, HelpCircle, LayoutDashboard, Search, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const navItems = [
  { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/lessons', icon: BookOpen, label: 'AI Tutor' },
  { href: '/quizzes', icon: HelpCircle, label: 'Quizzes' },
  { href: '/search', icon: Search, label: 'Concept Search' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:flex-col md:w-64 bg-card border-r shrink-0">
      <div className="flex flex-col h-full">
        <div className="p-4 border-b">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary">
            <DollarSign className="h-7 w-7 stroke-[2.5]" />
            <span>G-Invest</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} legacyBehavior passHref>
              <Button
                variant={pathname === item.href ? 'default' : 'ghost'}
                className="w-full justify-start gap-3 text-base"
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Button>
            </Link>
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
