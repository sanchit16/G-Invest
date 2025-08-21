
'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '../ui/skeleton';
import { cn } from '@/lib/utils';

const initialPortfolio = {
  totalValue: 116281.24,
  investedValue: 16281.24,
  remainingBalance: 100000.00,
  todaysGain: 2130.43,
  todaysGainPercent: 1.86,
};

const INITIAL_CAPITAL = 116281.24; // Based on initial invested + remaining

export default function PortfolioSummaryCard() {
  const [portfolio, setPortfolio] = useState(initialPortfolio);
  const [loading, setLoading] = useState(true);

  const updatePortfolio = () => {
    const storedPortfolio = localStorage.getItem('g-invest-portfolio');
    if (storedPortfolio) {
      setPortfolio(JSON.parse(storedPortfolio));
    }
    setLoading(false);
  };

  useEffect(() => {
    updatePortfolio();
    // Listen for storage changes to update the UI if a trade happens in another tab
    window.addEventListener('storage', updatePortfolio);
    return () => {
      window.removeEventListener('storage', updatePortfolio);
    };
  }, []);

  if (loading) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Portfolio Value (Virtual)
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Skeleton className="h-10 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-4" />
                <Separator className="my-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Skeleton className="h-4 w-1/4 mb-2" />
                        <Skeleton className="h-8 w-1/2" />
                    </div>
                    <div>
                        <Skeleton className="h-4 w-1/3 mb-2" />
                        <Skeleton className="h-8 w-1/2" />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
  }

  const totalValue = portfolio?.totalValue || 0;
  const todaysGain = portfolio?.todaysGain || 0;
  const todaysGainPercent = portfolio?.todaysGainPercent || 0;
  const investedValue = portfolio?.investedValue || 0;
  const remainingBalance = portfolio?.remainingBalance || 0;

  const totalProfitLoss = totalValue - INITIAL_CAPITAL;
  const totalProfitLossPercent = INITIAL_CAPITAL > 0 ? (totalProfitLoss / INITIAL_CAPITAL) * 100 : 0;
  const isProfit = totalProfitLoss >= 0;

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Total Portfolio Value (Virtual)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        <div className="flex items-center text-sm mt-1 flex-wrap gap-x-4">
          <div className="flex items-center text-sm">
            <span className={cn(
                "font-semibold flex items-center mr-2",
                isProfit ? 'text-secondary' : 'text-destructive'
            )}>
              {isProfit ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
              {isProfit ? '+' : ''}${totalProfitLoss.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="text-muted-foreground">({isProfit ? '+' : ''}{totalProfitLossPercent.toFixed(2)}% all time)</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-secondary font-semibold flex items-center mr-2">
              <TrendingUp className="h-4 w-4 mr-1" />
              +${todaysGain.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="text-muted-foreground">(+{todaysGainPercent.toFixed(2)}% today)</span>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <p className="text-sm text-muted-foreground">Invested Funds (Virtual)</p>
                <p className="text-xl font-semibold">${investedValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div>
                <p className="text-sm text-muted-foreground">Remaining Balance (Virtual)</p>
                <p className="text-xl font-semibold">${remainingBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
