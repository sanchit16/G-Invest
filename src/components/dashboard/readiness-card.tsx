
"use client";

import { Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { RadialBar, RadialBarChart } from 'recharts';

const chartData = [{ name: 'Readiness', value: 75, fill: 'var(--color-primary)' }];

export default function ReadinessCard() {
  const score = chartData[0].value;
  let readinessLevel = '';
  let readinessDescription = '';

  if (score >= 80) {
    readinessLevel = 'Post-Graduate';
    readinessDescription = 'Ready for advanced strategies.';
  } else if (score >= 50) {
    readinessLevel = 'Graduate';
    readinessDescription = 'Ready for basic investing.';
  } else {
    readinessLevel = 'Undergraduate';
    readinessDescription = 'Keep learning the basics.';
  }


  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <CardHeader className="space-y-0 pb-2">
        <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">Market Readiness</CardTitle>
            <Target className="h-5 w-5 text-muted-foreground" />
        </div>
        <CardDescription>Your investment knowledge level.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col items-center justify-center pt-2">
        <ChartContainer
          config={{}}
          className="mx-auto aspect-square h-full max-h-[160px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={-270}
            endAngle={90}
            innerRadius={70}
            outerRadius={80}
            barSize={12}
          >
            <RadialBar dataKey="value" background={{ fill: 'hsla(var(--muted))' }} cornerRadius={10} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
          </RadialBarChart>
        </ChartContainer>
         <div className="text-3xl font-bold -mt-[7.5rem]">{readinessLevel}</div>
         <p className="text-xs text-muted-foreground mt-[6.5rem]">{readinessDescription}</p>
      </CardContent>
    </Card>
  );
}
