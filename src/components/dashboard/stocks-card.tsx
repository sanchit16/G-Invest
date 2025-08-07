'use client';

import { TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

const chartData = [
  { month: 'January', value: 186 },
  { month: 'February', value: 305 },
  { month: 'March', value: 237 },
  { month: 'April', value: 273 },
  { month: 'May', value: 209 },
  { month: 'June', value: 214 },
];

const stocksData = [
  { ticker: 'GGL', name: 'Google', price: 175.43, change: 1.25, value: 25061.44, changeType: 'increase' },
  { ticker: 'APPL', name: 'Apple Inc.', price: 214.29, change: -0.78, value: 18428.99, changeType: 'decrease' },
  { ticker: 'TSLL', name: 'Tesla Corp', price: 183.01, change: 2.51, value: 15190.12, changeType: 'increase' },
  { ticker: 'AMZN', name: 'Amazon.com', price: 189.08, change: 0.99, value: 12345.67, changeType: 'increase' },
];

export default function StocksCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Stocks</CardTitle>
        <CardDescription>
          An overview of your simulated stock portfolio.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-48">
          <ChartContainer config={{}}>
            <AreaChart
              data={chartData}
              margin={{ left: 12, right: 12 }}
            >
              <defs>
                <linearGradient id="fillColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" hideLabel />} />
              <Area
                dataKey="value"
                type="natural"
                fill="url(#fillColor)"
                stroke="hsl(var(--primary))"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        </div>
        <div className="mt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticker</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Change</TableHead>
                <TableHead className="text-right">Value</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stocksData.map((stock) => (
                <TableRow key={stock.ticker}>
                  <TableCell>
                    <div className="font-medium">{stock.ticker}</div>
                    <div className="text-xs text-muted-foreground">{stock.name}</div>
                  </TableCell>
                  <TableCell>${stock.price.toFixed(2)}</TableCell>
                  <TableCell
                    className={`text-right font-medium ${
                      stock.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {stock.changeType === 'increase' ? '+' : ''}
                    {stock.change.toFixed(2)}%
                  </TableCell>
                  <TableCell className="text-right">${stock.value.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" className="mr-2">
                      Buy
                    </Button>
                    <Button variant="outline" size="sm">
                      Sell
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
