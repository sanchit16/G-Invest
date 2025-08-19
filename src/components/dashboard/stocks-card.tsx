
'use client';

import { useState, useEffect } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Slider } from '../ui/slider';
import { AlertTriangle } from 'lucide-react';

type StockData = {
  ticker: string;
  name: string;
  price: number;
  change: number;
  value: number;
  changeType: 'increase' | 'decrease';
  history: {
    day: { month: string; value: number }[];
    week: { month: string; value: number }[];
    month: { month: string; value: number }[];
    year: { month: string; value: number }[];
  };
};

const stocksData: StockData[] = [
  {
    ticker: 'GOOG',
    name: 'Alphabet',
    price: 175.43,
    change: 1.25,
    value: 25061.44,
    changeType: 'increase',
    history: {
      day: [
        { month: '10am', value: 174.5 },
        { month: '11am', value: 175.0 },
        { month: '12pm', value: 175.2 },
        { month: '1pm', value: 175.8 },
        { month: '2pm', value: 175.43 },
      ],
      week: [
        { month: 'Mon', value: 170 },
        { month: 'Tue', value: 172 },
        { month: 'Wed', value: 171 },
        { month: 'Thu', value: 174 },
        { month: 'Fri', value: 175.43 },
      ],
      month: [
        { month: 'W1', value: 165 },
        { month: 'W2', value: 168 },
        { month: 'W3', value: 172 },
        { month: 'W4', value: 175.43 },
      ],
      year: [
        { month: 'Jan', value: 140 },
        { month: 'Mar', value: 155 },
        { month: 'Jun', value: 165 },
        { month: 'Sep', value: 170 },
        { month: 'Dec', value: 175.43 },
      ],
    },
  },
  {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    price: 214.29,
    change: -0.78,
    value: 18428.99,
    changeType: 'decrease',
    history: {
      day: [
        { month: '10am', value: 215.1 },
        { month: '11am', value: 214.8 },
        { month: '12pm', value: 214.5 },
        { month: '1pm', value: 214.2 },
        { month: '2pm', value: 214.29 },
      ],
      week: [
        { month: 'Mon', value: 218 },
        { month: 'Tue', value: 216 },
        { month: 'Wed', value: 217 },
        { month: 'Thu', value: 215 },
        { month: 'Fri', value: 214.29 },
      ],
      month: [
        { month: 'W1', value: 220 },
        { month: 'W2', value: 215 },
        { month: 'W3', value: 212 },
        { month: 'W4', value: 214.29 },
      ],
      year: [
        { month: 'Jan', value: 180 },
        { month: 'Mar', value: 190 },
        { month: 'Jun', value: 205 },
        { month: 'Sep', value: 210 },
        { month: 'Dec', value: 214.29 },
      ],
    },
  },
  {
    ticker: 'TSLA',
    name: 'Tesla Inc',
    price: 183.01,
    change: 2.51,
    value: 15190.12,
    changeType: 'increase',
    history: {
      day: [
        { month: '10am', value: 180.5 },
        { month: '11am', value: 181.2 },
        { month: '12pm', value: 182.5 },
        { month: '1pm', value: 183.1 },
        { month: '2pm', value: 183.01 },
      ],
      week: [
        { month: 'Mon', value: 178 },
        { month: 'Tue', value: 180 },
        { month: 'Wed', value: 179 },
        { month: 'Thu', value: 182 },
        { month: 'Fri', value: 183.01 },
      ],
      month: [
        { month: 'W1', value: 175 },
        { month: 'W2', value: 182 },
        { month: 'W3', value: 181 },
        { month: 'W4', value: 183.01 },
      ],
      year: [
        { month: 'Jan', value: 150 },
        { month: 'Mar', value: 160 },
        { month: 'Jun', value: 175 },
        { month: 'Sep', value: 180 },
        { month: 'Dec', value: 183.01 },
      ],
    },
  },
  {
    ticker: 'AMZN',
    name: 'Amazon.com',
    price: 189.08,
    change: 0.99,
    value: 12345.67,
    changeType: 'increase',
    history: {
      day: [
        { month: '10am', value: 188.0 },
        { month: '11am', value: 188.5 },
        { month: '12pm', value: 189.2 },
        { month: '1pm', value: 189.0 },
        { month: '2pm', value: 189.08 },
      ],
      week: [
        { month: 'Mon', value: 185 },
        { month: 'Tue', value: 186 },
        { month: 'Wed', value: 188 },
        { month: 'Thu', value: 187 },
        { month: 'Fri', value: 189.08 },
      ],
      month: [
        { month: 'W1', value: 180 },
        { month: 'W2', value: 185 },
        { month: 'W3', value: 188 },
        { month: 'W4', value: 189.08 },
      ],
      year: [
        { month: 'Jan', value: 160 },
        { month: 'Mar', value: 170 },
        { month: 'Jun', value: 180 },
        { month: 'Sep', value: 185 },
        { month: 'Dec', value: 189.08 },
      ],
    },
  },
  {
    ticker: 'ADBE',
    name: 'Adobe Inc.',
    price: 527.31,
    change: -1.45,
    value: 11234.56,
    changeType: 'decrease',
    history: {
      day: [{ month: '10am', value: 530.00 }, { month: '11am', value: 528.50 }, { month: '12pm', value: 527.80 }, { month: '1pm', value: 527.10 }, { month: '2pm', value: 527.31 }],
      week: [{ month: 'Mon', value: 535.00 }, { month: 'Tue', value: 532.10 }, { month: 'Wed', value: 530.00 }, { month: 'Thu', value: 528.90 }, { month: 'Fri', value: 527.31 }],
      month: [{ month: 'W1', value: 540.00 }, { month: 'W2', value: 535.00 }, { month: 'W3', value: 532.00 }, { month: 'W4', value: 527.31 }],
      year: [{ month: 'Jan', value: 480.00 }, { month: 'Mar', value: 500.00 }, { month: 'Jun', value: 515.00 }, { month: 'Sep', value: 525.00 }, { month: 'Dec', value: 527.31 }],
    },
  },
  {
    ticker: 'MSFT',
    name: 'Microsoft',
    price: 447.67,
    change: 0.55,
    value: 32098.78,
    changeType: 'increase',
    history: {
      day: [{ month: '10am', value: 445.00 }, { month: '11am', value: 446.50 }, { month: '12pm', value: 447.00 }, { month: '1pm', value: 447.80 }, { month: '2pm', value: 447.67 }],
      week: [{ month: 'Mon', value: 440.00 }, { month: 'Tue', value: 442.00 }, { month: 'Wed', value: 445.00 }, { month: 'Thu', value: 446.00 }, { month: 'Fri', value: 447.67 }],
      month: [{ month: 'W1', value: 430.00 }, { month: 'W2', value: 435.00 }, { month: 'W3', value: 440.00 }, { month: 'W4', value: 447.67 }],
      year: [{ month: 'Jan', value: 380.00 }, { month: 'Mar', value: 400.00 }, { month: 'Jun', value: 420.00 }, { month: 'Sep', value: 435.00 }, { month: 'Dec', value: 447.67 }],
    },
  },
  {
    ticker: 'NKE',
    name: 'Nike',
    price: 94.75,
    change: -0.21,
    value: 8765.43,
    changeType: 'decrease',
    history: {
      day: [{ month: '10am', value: 95.00 }, { month: '11am', value: 94.80 }, { month: '12pm', value: 94.70 }, { month: '1pm', value: 94.60 }, { month: '2pm', value: 94.75 }],
      week: [{ month: 'Mon', value: 96.00 }, { month: 'Tue', value: 95.50 }, { month: 'Wed', value: 95.00 }, { month: 'Thu', value: 94.80 }, { month: 'Fri', value: 94.75 }],
      month: [{ month: 'W1', value: 98.00 }, { month: 'W2', value: 96.00 }, { month: 'W3', value: 95.50 }, { month: 'W4', value: 94.75 }],
      year: [{ month: 'Jan', value: 105.00 }, { month: 'Mar', value: 100.00 }, { month: 'Jun', value: 98.00 }, { month: 'Sep', value: 96.00 }, { month: 'Dec', value: 94.75 }],
    },
  },
  {
    ticker: 'BA',
    name: 'Boeing',
    price: 177.38,
    change: 1.12,
    value: 7890.12,
    changeType: 'increase',
    history: {
      day: [{ month: '10am', value: 175.00 }, { month: '11am', value: 176.50 }, { month: '12pm', value: 177.00 }, { month: '1pm', value: 177.50 }, { month: '2pm', value: 177.38 }],
      week: [{ month: 'Mon', value: 170.00 }, { month: 'Tue', value: 172.00 }, { month: 'Wed', value: 174.00 }, { month: 'Thu', value: 176.00 }, { month: 'Fri', value: 177.38 }],
      month: [{ month: 'W1', value: 165.00 }, { month: 'W2', value: 170.00 }, { month: 'W3', value: 175.00 }, { month: 'W4', value: 177.38 }],
      year: [{ month: 'Jan', value: 200.00 }, { month: 'Mar', value: 190.00 }, { month: 'Jun', value: 180.00 }, { month: 'Sep', value: 175.00 }, { month: 'Dec', value: 177.38 }],
    },
  },
  {
    ticker: 'NOW',
    name: 'ServiceNow',
    price: 742.25,
    change: 2.30,
    value: 15432.10,
    changeType: 'increase',
    history: {
      day: [{ month: '10am', value: 735.00 }, { month: '11am', value: 738.00 }, { month: '12pm', value: 740.00 }, { month: '1pm', value: 741.50 }, { month: '2pm', value: 742.25 }],
      week: [{ month: 'Mon', value: 720.00 }, { month: 'Tue', value: 725.00 }, { month: 'Wed', value: 730.00 }, { month: 'Thu', value: 738.00 }, { month: 'Fri', value: 742.25 }],
      month: [{ month: 'W1', value: 700.00 }, { month: 'W2', value: 715.00 }, { month: 'W3', value: 730.00 }, { month: 'W4', value: 742.25 }],
      year: [{ month: 'Jan', value: 600.00 }, { month: 'Mar', value: 650.00 }, { month: 'Jun', value: 680.00 }, { month: 'Sep', value: 710.00 }, { month: 'Dec', value: 742.25 }],
    },
  },
  {
    ticker: 'NVDA',
    name: 'Nvidia',
    price: 135.58,
    change: 3.50,
    value: 45012.34,
    changeType: 'increase',
    history: {
      day: [{ month: '10am', value: 131.00 }, { month: '11am', value: 132.50 }, { month: '12pm', value: 134.00 }, { month: '1pm', value: 135.00 }, { month: '2pm', value: 135.58 }],
      week: [{ month: 'Mon', value: 125.00 }, { month: 'Tue', value: 128.00 }, { month: 'Wed', value: 130.00 }, { month: 'Thu', value: 133.00 }, { month: 'Fri', value: 135.58 }],
      month: [{ month: 'W1', value: 115.00 }, { month: 'W2', value: 120.00 }, { month: 'W3', value: 128.00 }, { month: 'W4', value: 135.58 }],
      year: [{ month: 'Jan', value: 80.00 }, { month: 'Mar', value: 95.00 }, { month: 'Jun', value: 110.00 }, { month: 'Sep', value: 125.00 }, { month: 'Dec', value: 135.58 }],
    },
  },
];

const tradeReasons = {
  buy: [
    { id: 'buy-undervalued', label: 'The stock appears undervalued (low P/E ratio).', correct: true },
    { id: 'buy-growth', label: 'Strong company growth potential.', correct: true },
    { id: 'buy-hype', label: 'Everyone is talking about it, so it must go up.', correct: false },
    { id: 'buy-dip', label: 'Buying the dip after a market overreaction.', correct: true },
  ],
  sell: [
    { id: 'sell-overvalued', label: 'The stock appears overvalued (high P/E ratio).', correct: true },
    { id: 'sell-profit', label: 'Taking profits after reaching a target price.', correct: true },
    { id: 'sell-panic', label: 'The market is crashing, selling everything!', correct: false },
    { id: 'sell-fundamentals', label: 'Company fundamentals have weakened.', correct: true },
  ],
};

export default function StocksCard() {
  const [selectedStock, setSelectedStock] = useState<StockData>(stocksData[0]);
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'year'>('day');
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tradeStep, setTradeStep] = useState<'reason' | 'amount' | 'risk' | null>(null);
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [tradeVolume, setTradeVolume] = useState([50]);
  const [riskValue, setRiskValue] = useState(0);

  const { toast } = useToast();

  const handleTradeClick = (type: 'buy' | 'sell', stock: StockData) => {
    setSelectedStock(stock);
    setTradeType(type);
    setSelectedReason(null);
    setTradeVolume([50]);
    setTradeStep('reason');
    setDialogOpen(true);
  };

  const handleReasonSubmit = () => {
    if (!selectedReason) {
      toast({
        title: 'Selection Required',
        description: 'Please select a reason for your trade.',
        variant: 'destructive',
      });
      return;
    }
    setTradeStep('amount');
  };

  const handleAmountSubmit = () => {
    // Generate random risk value between 5 and 70
    const randomRisk = Math.floor(Math.random() * (70 - 5 + 1)) + 5;
    setRiskValue(randomRisk);
    setTradeStep('risk');
  };

  const handleConfirmTrade = () => {
    const reason = tradeReasons[tradeType].find((r) => r.id === selectedReason);
    
    if (reason?.correct) {
      toast({
        title: 'Trade Successful!',
        description: 'Your virtual portfolio has been updated. You earned 50 points!',
      });
    } else {
      toast({
        title: 'Trade Acknowledged',
        description: 'That might not be the best reason. Consider reviewing the lessons on market analysis.',
        variant: 'destructive',
      });
    }
    setDialogOpen(false);
    setTradeStep(null);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setTradeStep(null);
  }

  const chartData = selectedStock.history[timeRange];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{selectedStock.name} ({selectedStock.ticker})</CardTitle>
        <div className="flex justify-between items-center">
        <CardDescription>
          Interactive stock performance chart.
        </CardDescription>
          <div className="flex items-center gap-2">
            {(['day', 'week', 'month', 'year'] as const).map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeRange(range)}
                className="capitalize"
              >
                {range}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-60">
          <ChartContainer config={{}}>
            <AreaChart
              data={chartData}
              margin={{ top: 5, right: 20, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="fillColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis domain={['dataMin - 5', 'dataMax + 5']} hide />
              <ChartTooltip
                cursor={{ stroke: 'hsl(var(--border))', strokeWidth: 2, strokeDasharray: '3 3' }}
                content={<ChartTooltipContent indicator="line" />}
              />
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
                <TableRow
                  key={stock.ticker}
                  onClick={() => setSelectedStock(stock)}
                  className={cn(
                    'cursor-pointer',
                    selectedStock.ticker === stock.ticker && 'bg-muted/50'
                  )}
                >
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
                    <Button variant="outline" size="sm" className="mr-2" onClick={(e) => { e.stopPropagation(); handleTradeClick('buy', stock)}}>
                      Buy
                    </Button>
                    <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); handleTradeClick('sell', stock)}}>
                      Sell
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent onInteractOutside={(e) => e.preventDefault()}>
          {tradeStep === 'reason' && (
            <>
              <DialogHeader>
                <DialogTitle>Why are you making this <span className="capitalize">{tradeType}</span> trade?</DialogTitle>
                <DialogDescription>
                  Select the reason that best fits your investment strategy. This helps you practice making informed decisions.
                </DialogDescription>
              </DialogHeader>
              <RadioGroup onValueChange={setSelectedReason} value={selectedReason ?? undefined} className="space-y-2 my-4">
                {tradeReasons[tradeType].map((reason) => (
                  <div key={reason.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={reason.id} id={reason.id} />
                    <Label htmlFor={reason.id}>{reason.label}</Label>
                  </div>
                ))}
              </RadioGroup>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={closeDialog}>
                  Cancel
                </Button>
                <Button onClick={handleReasonSubmit}>Next</Button>
              </DialogFooter>
            </>
          )}
          {tradeStep === 'amount' && (
             <>
                <DialogHeader>
                    <DialogTitle>Select Volume/Amount</DialogTitle>
                    <DialogDescription>
                        Choose the number of shares you wish to {tradeType}.
                    </DialogDescription>
                </DialogHeader>
                <div className="my-4">
                    <div className="flex justify-between mb-2">
                        <span>Shares:</span>
                        <span className="font-bold">{tradeVolume[0]}</span>
                    </div>
                     <Slider
                        defaultValue={tradeVolume}
                        max={100}
                        step={1}
                        onValueChange={setTradeVolume}
                    />
                     <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>1</span>
                        <span>100</span>
                    </div>
                    <div className="mt-4 text-center">
                        <p className="font-bold text-lg">
                            Estimated Cost: ${(tradeVolume[0] * selectedStock.price).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                        </p>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setTradeStep('reason')}>
                        Back
                    </Button>
                    <Button onClick={handleAmountSubmit}>Next</Button>
                </DialogFooter>
             </>
          )}
          {tradeStep === 'risk' && (
            <>
                 <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-6 w-6 text-destructive" />
                        Confirm Your Trade
                    </DialogTitle>
                    <DialogDescription>
                        Please review the details of your trade before confirming.
                    </DialogDescription>
                </DialogHeader>
                <div className="my-4 space-y-2">
                   <p><strong>Action:</strong> <span className="capitalize">{tradeType}</span> {tradeVolume[0]} shares of {selectedStock.ticker}</p>
                   <p><strong>Estimated Value:</strong> ${(tradeVolume[0] * selectedStock.price).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                   <p className="font-bold text-destructive">Your risk value for this trade is {riskValue}%.</p>
                   <p>Would you like to proceed?</p>
                </div>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={closeDialog}>
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmTrade}>Confirm Trade</Button>
                </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}
