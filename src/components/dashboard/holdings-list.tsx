
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';

const initialHoldings: Holding[] = [
  { ticker: 'GOOGL', name: 'Alphabet Inc.', shares: 10, price: 179.63, purchasePrice: 175.20 },
  { ticker: 'AAPL', name: 'Apple Inc', shares: 25, price: 214.29, purchasePrice: 205.50 },
  { ticker: 'TSLA', name: 'Tesla Inc', shares: 15, price: 184.88, purchasePrice: 190.10 },
  { ticker: 'AMZN', name: 'Amazon.com, Inc.', shares: 5, price: 189.08, purchasePrice: 182.40 },
  { ticker: 'NVDA', name: 'NVIDIA Corp', shares: 40, price: 135.58, purchasePrice: 120.80 },
];

export type Holding = {
    ticker: string;
    name: string;
    shares: number;
    price: number; // Current market price
    purchasePrice: number; // Average purchase price
};

export default function HoldingsList() {
    const [holdings, setHoldings] = useState<Holding[]>([]);

    const updateHoldings = () => {
        const storedHoldings = localStorage.getItem('g-invest-holdings');
        if (storedHoldings) {
            setHoldings(JSON.parse(storedHoldings));
        } else {
            setHoldings(initialHoldings);
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
        {holdings.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">You do not own any stocks yet.</p>
        ) : (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Asset</TableHead>
                        <TableHead className="text-right">Market Value</TableHead>
                        <TableHead className="text-right">Avg. Price</TableHead>
                        <TableHead className="text-right">Total Value</TableHead>
                        <TableHead className="text-right">P/L</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {holdings.map(stock => {
                        const totalValue = stock.shares * stock.price;
                        const totalCost = stock.shares * stock.purchasePrice;
                        const profitLoss = totalValue - totalCost;
                        const profitLossPercent = totalCost > 0 ? (profitLoss / totalCost) * 100 : 0;
                        const isProfit = profitLoss >= 0;

                        return (
                            <TableRow key={stock.ticker}>
                                <TableCell>
                                    <div className="font-bold">{stock.ticker}</div>
                                    <div className="text-sm text-muted-foreground">{stock.shares} Shares</div>
                                </TableCell>
                                <TableCell className="text-right font-medium">
                                    ${stock.price.toFixed(2)}
                                </TableCell>
                                <TableCell className="text-right">
                                    ${stock.purchasePrice.toFixed(2)}
                                </TableCell>
                                <TableCell className="text-right font-bold">
                                    ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </TableCell>
                                <TableCell className={cn(
                                    "text-right font-semibold",
                                    isProfit ? 'text-secondary' : 'text-destructive'
                                )}>
                                    <div>{isProfit ? '+' : ''}${profitLoss.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                                    <div className="text-xs">({isProfit ? '+' : ''}{profitLossPercent.toFixed(2)}%)</div>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        )}
      </CardContent>
    </Card>
  );
}
