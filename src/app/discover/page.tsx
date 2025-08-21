
"use client";

import { useState, useMemo, useCallback } from 'react';
import { Search, KeyRound } from 'lucide-react';
import debounce from 'lodash.debounce';

import Header from '@/components/header';
import { Input } from '@/components/ui/input';
import StockCategoryList from '@/components/discover/stock-category-list';
import StockDetail from '@/components/discover/stock-detail';
import { stockSearch } from '@/ai/flows/stock-search';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

const initialTopMovers = [
  { ticker: 'TSLA', name: 'Tesla Inc', price: 184.88, change: '+5.76%', changeType: 'increase' as const },
  { ticker: 'NVDA', name: 'NVIDIA Corp', price: 135.58, change: '+3.50%', changeType: 'increase' as const },
  { ticker: 'AAPL', name: 'Apple Inc', price: 214.29, change: '-1.04%', changeType: 'decrease' as const },
];

const initialPopularETFs = [
  { ticker: 'SPY', name: 'SPDR S&P 500 ETF Trust', price: 544.83, change: '+0.21%', changeType: 'increase' as const },
  { ticker: 'IVV', name: 'iShares CORE S&P 500 ETF', price: 546.79, change: '+0.22%', changeType: 'increase' as const },
  { ticker: 'VTI', name: 'Vanguard Total Stock Market ETF', price: 267.84, change: '+0.25%', changeType: 'increase' as const },
];

const initialMostFollowed = [
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
  const [selectedStock, setSelectedStock] = useState<Stock | null>(initialMostFollowed[1]);
  const [searchResults, setSearchResults] = useState<Stock[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const handleStockSelect = (stock: Stock) => {
    setSelectedStock(stock);
  };

  const performSearch = async (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    try {
      const result = await stockSearch({ query });
      setSearchResults(result.results);
    } catch (error: any) {
      console.error("Search failed:", error);
      if (error.message?.includes('API_KEY_SERVICE_BLOCKED') || error.message?.includes('API key not valid')) {
        toast({ title: 'Invalid API Key', description: 'Please check your API key and try again.', variant: 'destructive' });
      } else {
        toast({ title: 'Search Failed', description: 'An unexpected error occurred.', variant: 'destructive' });
      }
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const debouncedSearch = useMemo(() => debounce(performSearch, 300), [toast]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const displayStocks = searchQuery.length > 1;

  return (
    <div className="flex flex-1 flex-col bg-slate-50/50 dark:bg-slate-900/50">
      <Header title="Trading Playground" />
      <main className="flex-1 p-4 md:p-6 space-y-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search by company name or ticker..."
            className="pl-10 text-base"
            onChange={handleSearchChange}
            value={searchQuery}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {displayStocks ? (
            isSearching ? (
              <div className="md:col-span-3 space-y-2">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : (
              <StockCategoryList title="Search Results" stocks={searchResults} onStockSelect={handleStockSelect} className="md:col-span-3" />
            )
          ) : (
            <>
              <StockCategoryList title="Top Movers Today" stocks={initialTopMovers} onStockSelect={handleStockSelect} />
              <StockCategoryList title="Popular ETFs" stocks={initialPopularETFs} onStockSelect={handleStockSelect} />
              <StockCategoryList title="Most Followed on G-Invest" stocks={initialMostFollowed} onStockSelect={handleStockSelect} />
            </>
          )}
        </div>
        
        <div>
            {selectedStock && <StockDetail stock={selectedStock} />}
        </div>

      </main>
    </div>
  );
}
