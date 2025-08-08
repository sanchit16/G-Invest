
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Target } from 'lucide-react';

const score = 75;

export default function ReadinessCard() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className="hover:shadow-lg transition-shadow duration-300 flex flex-col">
            <CardHeader className="items-center pb-2">
                <CardTitle className="flex items-center gap-2 text-sm font-medium whitespace-nowrap">
                  <Target className="h-5 w-5 text-muted-foreground" />
                  Market Readiness
                </CardTitle>
              <CardDescription className="text-xs">Your investment knowledge score.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col items-center justify-center pt-2">
              <div className="flex flex-row items-baseline justify-center gap-1">
                <span className="text-4xl font-bold">{score}</span>
                <span className="text-xl font-bold text-muted-foreground">/100</span>
              </div>
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent>
          <div className="p-2">
            <p className="font-bold mb-2">Readiness Guide</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
               <li><span className="font-semibold" style={{color: 'hsl(var(--secondary))'}}>80-100:</span> Expert</li>
              <li><span className="font-semibold" style={{color: 'hsl(var(--chart-3))'}}>60-79:</span> Strong</li>
              <li><span className="font-semibold" style={{color: 'hsl(var(--chart-5))'}}>40-59:</span> Building</li>
              <li><span className="font-semibold" style={{color: 'hsl(var(--destructive))'}}>0-39:</span> Getting Started</li>
            </ul>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
