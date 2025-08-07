
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { RadialBar, RadialBarChart } from 'recharts';

const chartData = [{ name: 'Readiness', value: 75 }];

export default function ReadinessCard() {
  const score = chartData[0].value;
  let scoreColor = '';
  let scoreColorClass = '';

  if (score >= 80) {
    scoreColor = 'hsl(var(--secondary))';
    scoreColorClass = 'bg-secondary';
  } else if (score >= 60) {
    scoreColor = 'hsl(var(--chart-3))';
    scoreColorClass = 'bg-chart-3';
  } else if (score >= 40) {
    scoreColor = 'hsl(var(--chart-5))';
    scoreColorClass = 'bg-chart-5';
  } else {
    scoreColor = 'hsl(var(--destructive))';
    scoreColorClass = 'bg-destructive';
  }

  const coloredChartData = [{ ...chartData[0], fill: scoreColor }];

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className="hover:shadow-lg transition-shadow duration-300 flex flex-col">
            <CardHeader className="items-center pb-2">
              <div className="flex items-center justify-between w-full">
                <CardTitle className="text-sm font-medium">Market Readiness</CardTitle>
                <div className={cn("h-3 w-3 rounded-full", scoreColorClass)} />
              </div>
              <CardDescription className="text-xs">Your investment knowledge score.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col items-center justify-center pt-2">
              <div className="relative">
                <ChartContainer
                  config={{}}
                  className="mx-auto aspect-square h-full max-h-[140px]"
                >
                  <RadialBarChart
                    data={coloredChartData}
                    startAngle={-270}
                    endAngle={90}
                    innerRadius={60}
                    outerRadius={70}
                    barSize={10}
                  >
                    <RadialBar dataKey="value" background={{ fill: 'hsla(var(--muted))' }} cornerRadius={10} />
                  </RadialBarChart>
                </ChartContainer>
                <div
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <span className="text-4xl font-bold">{score}</span>
                  <span className="text-xl font-bold text-muted-foreground mt-2">/100</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2 px-4 text-center"></p>
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
