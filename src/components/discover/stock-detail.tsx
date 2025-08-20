
'use client';

import { useState, useMemo, useEffect } from 'react';
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
import type { Stock } from '@/app/discover/page';
import { cn } from '@/lib/utils';
import type { Holding } from '@/components/dashboard/holdings-list';

type HistoryData = {
  '1D': { name: string; value: number }[];
  '1W': { name: string; value: number }[];
  '1M': { name: string; value: number }[];
  '1Y': { name: string; value: number }[];
  '5Y': { name: string; value: number }[];
};

const generateHistoryData = (basePrice: number): HistoryData => {
  const generateData = (points: number, period: 'hours' | 'days' | 'weeks' | 'years', timeLabels: string[]) => {
    let price = basePrice * (0.8 + Math.random() * 0.4); // Start at a variation of the base price
    return timeLabels.map(label => {
      const fluctuation = price * (Math.random() - 0.49) * 0.1; // Smaller, more frequent changes
      price += fluctuation;
      return { name: label, value: parseFloat(price.toFixed(2)) };
    });
  };

  return {
    '1D': generateData(6, 'hours', ['9am', '10am', '11am', '12pm', '1pm', '2pm']),
    '1W': generateData(5, 'days', ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']),
    '1M': generateData(4, 'weeks', ['W1', 'W2', 'W3', 'W4']),
    '1Y': generateData(5, 'years', ['Jan', 'Mar', 'Jun', 'Sep', 'Dec']),
    '5Y': generateData(5, 'years', ['2020', '2021', '2022', '2023', '2024']),
  };
};


const tradeReasons = [
    { id: 'news', label: 'Based on recent news' },
    { id: 'analysis', label: 'Based on technical analysis' },
    { id: 'long-term', label: 'Long-term investment strategy' },
    { id: 'short-term', label: 'Short-term speculation' },
];

const initialPortfolio = {
  totalValue: 116281.24,
  investedValue: 16281.24,
  remainingBalance: 100000.00,
  todaysGain: 2130.43,
  todaysGainPercent: 1.86,
};
const initialHoldings: Holding[] = [
    { ticker: 'GOOGL', name: 'Alphabet Inc.', shares: 10, price: 179.63, purchasePrice: 175.20 },
    { ticker: 'AAPL', name: 'Apple Inc', shares: 25, price: 214.29, purchasePrice: 220.15 },
    { ticker: 'TSLA', name: 'Tesla Inc', shares: 15, price: 184.88, purchasePrice: 190.10 },
    { ticker: 'AMZN', name: 'Amazon.com, Inc.', shares: 5, price: 189.08, purchasePrice: 182.40 },
    { ticker: 'NVDA', name: 'NVIDIA Corp', shares: 40, price: 135.58, purchasePrice: 125.80 },
];

export default function StockDetail({ stock }: { stock: Stock }) {
  const [timeRange, setTimeRange] = useState<'1D' | '1W' | '1M' | '1Y' | '5Y'>('1D');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogStep, setDialogStep] = useState(1);
  const [tradeType, setTradeType] = useState<'Buy' | 'Sell'>('Buy');
  const [shares, setShares] = useState(0);
  const [tradeReason, setTradeReason] = useState('');
  const [riskValue, setRiskValue] = useState(0);
  const { toast } = useToast();
  
  const historyData = useMemo(() => generateHistoryData(stock.price), [stock]);

  const estimatedCost = shares * stock.price;

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
    // --- Portfolio Update Logic ---
    const portfolioStr = localStorage.getItem('g-invest-portfolio') || JSON.stringify(initialPortfolio);
    const holdingsStr = localStorage.getItem('g-invest-holdings') || JSON.stringify(initialHoldings);
    let portfolio = JSON.parse(portfolioStr);
    let holdings: Holding[] = JSON.parse(holdingsStr);

    const tradeValue = shares * stock.price;
    const existingHoldingIndex = holdings.findIndex(h => h.ticker === stock.ticker);

    if (tradeType === 'Buy') {
        if (portfolio.remainingBalance < tradeValue) {
            toast({ title: 'Insufficient Funds', description: 'You do not have enough balance to make this purchase.', variant: 'destructive' });
            return;
        }
        portfolio.remainingBalance -= tradeValue;
        if (existingHoldingIndex > -1) {
            const existingHolding = holdings[existingHoldingIndex];
            const currentTotalValue = existingHolding.shares * existingHolding.purchasePrice;
            const newTotalValue = currentTotalValue + tradeValue;
            const newTotalShares = existingHolding.shares + shares;
            existingHolding.purchasePrice = newTotalValue / newTotalShares;
            existingHolding.shares = newTotalShares;
        } else {
            holdings.push({ ticker: stock.ticker, name: stock.name, shares: shares, price: stock.price, purchasePrice: stock.price });
        }
    } else { // Sell
        if (existingHoldingIndex === -1 || holdings[existingHoldingIndex].shares < shares) {
            toast({ title: 'Insufficient Shares', description: 'You do not own enough shares to sell.', variant: 'destructive' });
            return;
        }
        portfolio.remainingBalance += tradeValue;
        holdings[existingHoldingIndex].shares -= shares;
        if (holdings[existingHoldingIndex].shares === 0) {
            holdings.splice(existingHoldingIndex, 1);
        }
    }
    
    // Update current price for all holdings to reflect market changes
    holdings.forEach(h => {
        if (h.ticker === stock.ticker) {
            h.price = stock.price;
        } else {
            // In a real app, you'd fetch current prices for all holdings.
            // For now, we'll just simulate a small random change.
            h.price *= (1 + (Math.random() - 0.5) * 0.02);
        }
    });

    portfolio.investedValue = holdings.reduce((acc, h) => acc + (h.shares * h.purchasePrice), 0);
    const currentMarketValue = holdings.reduce((acc, h) => acc + (h.shares * h.price), 0);
    portfolio.totalValue = currentMarketValue + portfolio.remainingBalance;

    localStorage.setItem('g-invest-portfolio', JSON.stringify(portfolio));
    localStorage.setItem('g-invest-holdings', JSON.stringify(holdings));
    // Dispatch a storage event to notify other components/tabs
    window.dispatchEvent(new Event('storage'));


    toast({
        title: 'Trade Confirmed!',
        description: `You have successfully ${tradeType === 'Buy' ? 'purchased' : 'sold'} ${shares} shares of ${stock.ticker}.`,
    });
    setDialogOpen(false);
  }

  const handleCloseDialog = () => {
    setDialogOpen(false);
  }

  // Effect to initialize localStorage if it's empty
  useEffect(() => {
    if (!localStorage.getItem('g-invest-portfolio')) {
      localStorage.setItem('g-invest-portfolio', JSON.stringify(initialPortfolio));
    }
    if (!localStorage.getItem('g-invest-holdings')) {
      localStorage.setItem('g-invest-holdings', JSON.stringify(initialHoldings));
    }
  }, []);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{stock.name} ({stock.ticker})</CardTitle>
          <CardDescription>
            <span className="text-3xl font-bold text-foreground">${stock.price.toFixed(2)}</span>
            <span className={cn(
                "ml-2 text-base font-semibold",
                stock.changeType === 'increase' ? 'text-secondary' : 'text-destructive'
            )}>
                {stock.change}
            </span>
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
                    <DialogTitle>{tradeType} {stock.ticker}</DialogTitle>
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
