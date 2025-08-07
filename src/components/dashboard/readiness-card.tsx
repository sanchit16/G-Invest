"use client";

import { Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { RadialBar, RadialBarChart } from 'recharts';

const chartData = [{ name: 'Readiness', value: 75, fill: 'var(--color-primary)' }];

export default function ReadinessCard() {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Market Readiness Score</CardTitle>
        <Target className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent className="flex-1 flex flex-col items-center justify-center">
        <ChartContainer
          config={{}}
          className="mx-auto aspect-square h-full max-h-[200px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={-270}
            endAngle={90}
            innerRadius={90}
            outerRadius={110}
            barSize={20}
          >
            <RadialBar dataKey="value" background={{ fill: 'hsla(var(--muted))' }} cornerRadius={10} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
          </RadialBarChart>
        </ChartContainer>
         <div className="text-3xl font-bold -mt-20">75/100</div>
         <p className="text-xs text-muted-foreground mt-16">Ready to invest!</p>
      </CardContent>
    </Card>
  );
}
