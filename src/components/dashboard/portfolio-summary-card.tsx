
'use client';

import { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '../ui/skeleton';

const initialPortfolio = {
  totalValue: 116281.24,
  investedValue: 16281.24,
  remainingBalance: 100000.00,
  todaysGain: 2130.43,
  todaysGainPercent: 1.86,
};

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
                Total Portfolio Value
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

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Total Portfolio Value
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">${portfolio.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        <div className="flex items-center text-sm mt-1">
          <span className="text-secondary-foreground font-semibold flex items-center mr-2">
            <TrendingUp className="h-4 w-4 mr-1 text-secondary" />
            +${portfolio.todaysGain.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <span className="text-muted-foreground">(+{portfolio.todaysGainPercent.toFixed(2)}% today)</span>
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <p className="text-sm text-muted-foreground">Invested</p>
                <p className="text-xl font-semibold">${portfolio.investedValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div>
                <p className="text-sm text-muted-foreground">Remaining Balance</p>
                <p className="text-xl font-semibold">${portfolio.remainingBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
