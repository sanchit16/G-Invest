
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const historyData = {
    '1D': [
        { name: '9am', value: 178.50 }, { name: '10am', value: 179.00 }, { name: '11am', value: 179.20 },
        { name: '12pm', value: 179.80 }, { name: '1pm', value: 179.40 }, { name: '2pm', value: 179.63 },
    ],
    '1W': [
        { name: 'Mon', value: 175.20 }, { name: 'Tue', value: 176.80 }, { name: 'Wed', value: 178.10 },
        { name: 'Thu', value: 177.50 }, { name: 'Fri', value: 179.63 },
    ],
    '1M': [
        { name: 'W1', value: 170.10 }, { name: 'W2', value: 172.50 }, { name: 'W3', value: 175.80 },
        { name: 'W4', value: 179.63 },
    ],
    '1Y': [
        { name: 'Jan', value: 130.00 }, { name: 'Mar', value: 150.50 }, { name: 'Jun', value: 165.20 },
        { name: 'Sep', value: 175.80 }, { name: 'Dec', value: 179.63 },
    ],
     '5Y': [
        { name: '2020', value: 60.00 }, { name: '2021', value: 90.50 }, { name: '2022', value: 120.20 },
        { name: '2023', value: 150.80 }, { name: '2024', value: 179.63 },
    ],
}

const tradeReasons = [
    { id: 'news', label: 'Based on recent news' },
    { id: 'analysis', label: 'Based on technical analysis' },
    { id: 'long-term', label: 'Long-term investment strategy' },
    { id: 'short-term', label: 'Short-term speculation' },
];

export default function StockDetail() {
  const [timeRange, setTimeRange] = useState<'1D' | '1W' | '1M' | '1Y' | '5Y'>('1D');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogStep, setDialogStep] = useState(1);
  const [tradeType, setTradeType] = useState<'Buy' | 'Sell'>('Buy');
  const [shares, setShares] = useState(0);
  const [tradeReason, setTradeReason] = useState('');
  const [riskValue, setRiskValue] = useState(0);
  const { toast } = useToast();

  const currentPrice = 179.63;
  const estimatedCost = shares * currentPrice;

  const handleTradeClick = (type: 'Buy' | 'Sell') => {
    setTradeType(type);
    setDialogStep(1);
    setShares(0);
    setTradeReason('');
    setDialogOpen(true);
  };

  const handleNextStep = () => {
    if (dialogStep === 1 && !tradeReason) {
        toast({ title: 'Please select a reason.', variant: 'destructive' });
        return;
    }
    if (dialogStep === 2 && shares <= 0) {
        toast({ title: 'Please enter a valid number of shares.', variant: 'destructive' });
        return;
    }
    if (dialogStep === 2) {
        // Generate random risk value between 5 and 70
        setRiskValue(Math.floor(Math.random() * (70 - 5 + 1)) + 5);
    }
    setDialogStep(prev => prev + 1);
  };

  const handleConfirmTrade = () => {
    toast({
        title: 'Trade Confirmed!',
        description: `You have successfully ${tradeType === 'Buy' ? 'purchased' : 'sold'} ${shares} shares of GOOGL.`,
    });
    setDialogOpen(false);
  }

  const handleCloseDialog = () => {
    setDialogOpen(false);
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Alphabet Inc. (GOOGL)</CardTitle>
          <CardDescription>
            <span className="text-3xl font-bold text-foreground">$179.63</span>
            <span className="ml-2 text-base font-semibold text-secondary">+2.13 (+1.20%)</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={historyData[timeRange]}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }} />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={['dataMin - 5', 'dataMax + 5']} />
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fill="url(#colorUv)" />
                </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-2 mt-4">
            {(['1D', '1W', '1M', '1Y', '5Y'] as const).map(range => (
              <Button
                key={range}
                variant={timeRange === range ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeRange(range)}
              >
                {range}
              </Button>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-muted-foreground">Market Cap:</span> <span className="font-semibold">2.21T</span></div>
                <div><span className="text-muted-foreground">P/E Ratio:</span> <span className="font-semibold">27.19</span></div>
                <div><span className="text-muted-foreground">Volume:</span> <span className="font-semibold">18.45M</span></div>
                <div><span className="text-muted-foreground">Dividend Yield:</span> <span className="font-semibold">0.45%</span></div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <Button variant="secondary" onClick={() => handleTradeClick('Buy')}>Buy</Button>
            <Button variant="destructive" onClick={() => handleTradeClick('Sell')}>Sell</Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent onInteractOutside={(e) => e.preventDefault()}>
          {dialogStep === 1 && (
            <>
              <DialogHeader>
                <DialogTitle>Why are you making this {tradeType.toLowerCase()} trade?</DialogTitle>
                <DialogDescription>
                  Understanding your motives is the first step to smart investing.
                </DialogDescription>
              </DialogHeader>
              <RadioGroup value={tradeReason} onValueChange={setTradeReason} className="py-4 space-y-2">
                {tradeReasons.map(reason => (
                    <div key={reason.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={reason.id} id={reason.id} />
                        <Label htmlFor={reason.id}>{reason.label}</Label>
                    </div>
                ))}
              </RadioGroup>
              <DialogFooter>
                <Button variant="outline" onClick={handleCloseDialog}>Cancel</Button>
                <Button onClick={handleNextStep}>Next</Button>
              </DialogFooter>
            </>
          )}

          {dialogStep === 2 && (
             <>
                <DialogHeader>
                    <DialogTitle>{tradeType} GOOGL</DialogTitle>
                    <DialogDescription>
                    Enter the number of shares you'd like to {tradeType.toLowerCase()}.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-2">
                    <Label htmlFor="shares">Number of Shares</Label>
                    <Input
                    id="shares"
                    type="number"
                    value={shares || ''}
                    onChange={(e) => setShares(Number(e.target.value))}
                    min="0"
                    />
                    <p className="text-lg font-bold">
                    Estimated {tradeType === 'Buy' ? 'Cost' : 'Credit'}: ${estimatedCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleNextStep}>Next</Button>
                </DialogFooter>
            </>
          )}

          {dialogStep === 3 && (
            <>
                <DialogHeader>
                    <DialogTitle>Risk Assessment</DialogTitle>
                </DialogHeader>
                <div className="py-4 text-center">
                    <p className="text-lg">Your risk value for this trade is:</p>
                    <p className="text-5xl font-bold my-4 text-primary">{riskValue}%</p>
                    <p className="text-muted-foreground">Would you like to proceed?</p>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleConfirmTrade}>Confirm Trade</Button>
                </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

    