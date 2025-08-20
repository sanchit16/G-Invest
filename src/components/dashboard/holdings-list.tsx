
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const initialHoldings = [
  { ticker: 'GOOGL', name: 'Alphabet Inc.', shares: 10, price: 179.63 },
  { ticker: 'AAPL', name: 'Apple Inc', shares: 25, price: 214.29 },
  { ticker: 'TSLA', name: 'Tesla Inc', shares: 15, price: 184.88 },
  { ticker: 'AMZN', name: 'Amazon.com, Inc.', shares: 5, price: 189.08 },
  { ticker: 'NVDA', name: 'NVIDIA Corp', shares: 40, price: 135.58 },
];

export type Holding = {
    ticker: string;
    name: string;
    shares: number;
    price: number;
};

export default function HoldingsList() {
    const [holdings, setHoldings] = useState<Holding[]>(initialHoldings);

    const updateHoldings = () => {
        const storedHoldings = localStorage.getItem('g-invest-holdings');
        if (storedHoldings) {
            setHoldings(JSON.parse(storedHoldings));
        }
    };

    useEffect(() => {
        updateHoldings();
        // Listen for storage changes to update the UI
        window.addEventListener('storage', updateHoldings);
        return () => {
            window.removeEventListener('storage', updateHoldings);
        };
    }, []);


  return (
    <Card>
      <CardHeader>
        <CardTitle>My Holdings</CardTitle>
        <CardDescription>A list of all stocks you currently own in your virtual portfolio.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {holdings.length === 0 ? (
            <p className="text-center text-muted-foreground">You do not own any stocks yet.</p>
          ) : (
            holdings.map(stock => (
                <Card key={stock.ticker} className="hover:bg-muted/50 cursor-pointer">
                <CardContent className="p-4 grid grid-cols-2 md:grid-cols-4 items-center gap-4">
                    <div>
                    <p className="font-bold text-lg">{stock.ticker}</p>
                    <p className="text-sm text-muted-foreground">{stock.shares} Shares</p>
                    </div>
                    <div className="text-right md:text-left">
                    <p className="text-sm text-muted-foreground">Market Price</p>
                    <p className="font-semibold">${stock.price.toFixed(2)}</p>
                    </div>
                    <div className="text-left md:text-right col-span-2 md:col-span-1">
                    <p className="text-sm text-muted-foreground">Total Value</p>
                    <p className="font-semibold">${(stock.shares * stock.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                </CardContent>
                </Card>>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
