
"use client";

import { useState } from 'react';
import Header from '@/components/header';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import TickerBanner from '@/components/discover/ticker-banner';
import StockCategoryList from '@/components/discover/stock-category-list';
import StockDetail from '@/components/discover/stock-detail';

const topMovers = [
  { ticker: 'TSLA', name: 'Tesla Inc', price: 184.88, change: '+5.76%', changeType: 'increase' as const },
  { ticker: 'NVDA', name: 'NVIDIA Corp', price: 135.58, change: '+3.50%', changeType: 'increase' as const },
  { ticker: 'AAPL', name: 'Apple Inc', price: 214.29, change: '-1.04%', changeType: 'decrease' as const },
];

const popularETFs = [
  { ticker: 'SPY', name: 'SPDR S&P 500 ETF Trust', price: 544.83, change: '+0.21%', changeType: 'increase' as const },
  { ticker: 'IVV', name: 'iShares CORE S&P 500 ETF', price: 546.79, change: '+0.22%', changeType: 'increase' as const },
  { ticker: 'VTI', name: 'Vanguard Total Stock Market ETF', price: 267.84, change: '+0.25%', changeType: 'increase' as const },
];

const mostFollowed = [
    { ticker: 'AMZN', name: 'Amazon.com, Inc.', price: 189.08, change: '+1.60%', changeType: 'increase' as const },
    { ticker: 'GOOGL', name: 'Alphabet Inc.', price: 179.22, change: '+1.89%', changeType: 'increase' as const },
    { ticker: 'MSFT', name: 'Microsoft Corporation', price: 449.78, change: '+0.92%', changeType: 'increase' as const },
];

export type Stock = {
  ticker: string;
  name: string;
  price: number;
  change: string;
  changeType: 'increase' | 'decrease';
};

export default function DiscoverPage() {
  const [selectedStock, setSelectedStock] = useState<Stock | null>(mostFollowed[1]);

  const handleStockSelect = (stock: Stock) => {
    setSelectedStock(stock);
  };

  return (
    <div className="flex flex-1 flex-col bg-slate-50/50 dark:bg-slate-900/50">
      <Header title="Discover" />
      <main className="flex-1 p-4 md:p-6 space-y-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search by company name or ticker..."
            className="pl-10 text-base"
          />
        </div>

        <TickerBanner />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StockCategoryList title="Top Movers Today" stocks={topMovers} onStockSelect={handleStockSelect} />
            <StockCategoryList title="Popular ETFs" stocks={popularETFs} onStockSelect={handleStockSelect} />
            <StockCategoryList title="Most Followed on G-Invest" stocks={mostFollowed} onStockSelect={handleStockSelect} />
        </div>

        <div>
            {selectedStock && <StockDetail stock={selectedStock} />}
        </div>

      </main>
    </div>
  );
}
