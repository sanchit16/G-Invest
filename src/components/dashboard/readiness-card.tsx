
"use client";

import { Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { RadialBar, RadialBarChart } from 'recharts';

const chartData = [{ name: 'Readiness', value: 75 }];

export default function ReadinessCard() {
  const score = chartData[0].value;
  let readinessDescription = '';
  let scoreColor = '';

  if (score >= 80) {
    readinessDescription = 'Excellent! You have an expert understanding of the market.';
    scoreColor = 'hsl(var(--secondary))'; // Green
  } else if (score >= 60) {
    readinessDescription = 'Great! You have a strong understanding of core concepts.';
    scoreColor = 'hsl(var(--chart-3))'; // Amber
  } else if (score >= 40) {
    readinessDescription = 'Good! You are building a solid foundation of knowledge.';
    scoreColor = 'hsl(var(--chart-5))'; // Yellow
  } else {
    readinessDescription = 'You are just getting started. Keep learning!';
    scoreColor = 'hsl(var(--destructive))'; // Red
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
                <Target className="h-5 w-5 text-muted-foreground" />
              </div>
              <CardDescription className="text-xs">Your investment knowledge score.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col items-center justify-center pt-2">
              <div className="relative">
                <ChartContainer
                  config={{}}
                  className="mx-auto aspect-square h-full max-h-[160px]"
                >
                  <RadialBarChart
                    data={coloredChartData}
                    startAngle={-270}
                    endAngle={90}
                    innerRadius={70}
                    outerRadius={80}
                    barSize={12}
                  >
                    <RadialBar dataKey="value" background={{ fill: 'hsla(var(--muted))' }} cornerRadius={10} />
                  </RadialBarChart>
                </ChartContainer>
                <div
                  className="absolute inset-0 flex items-center justify-center text-4xl font-bold"
                  style={{ color: scoreColor }}
                >
                  {score}%
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2 px-4 text-center">{readinessDescription}</p>
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent>
          <div className="p-2">
            <p className="font-bold mb-2">Readiness Guide</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><span className="font-semibold text-green-600">80-100%:</span> Expert</li>
              <li><span className="font-semibold text-amber-500">60-79%:</span> Strong</li>
              <li><span className="font-semibold text-yellow-500">40-59%:</span> Building</li>
              <li><span className="font-semibold text-red-600">0-39%:</span> Getting Started</li>
            </ul>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
