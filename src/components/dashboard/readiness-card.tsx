
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
  let readinessDescription = '';

  if (score >= 80) {
    readinessDescription = 'Excellent! You have an expert understanding of the market.';
  } else if (score >= 60) {
    readinessDescription = 'Great! You have a strong understanding of core concepts.';
  } else if (score >= 40) {
    readinessDescription = 'Good! You are building a solid foundation of knowledge.';
  } else {
    readinessDescription = 'You are just getting started. Keep learning!';
  }


  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <CardHeader className="items-center pb-2">
        <div className="flex items-center justify-between w-full">
            <CardTitle className="text-sm font-medium">Market Readiness</CardTitle>
            <Target className="h-5 w-5 text-muted-foreground" />
        </div>
        <CardDescription className="text-xs">Your investment knowledge score.</CardDescription>
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
         <div className="text-4xl font-bold -mt-[8.5rem]">{score}%</div>
         <p className="text-xs text-muted-foreground mt-[7rem] px-4 text-center">{readinessDescription}</p>
      </CardContent>
    </Card>
  );
}
