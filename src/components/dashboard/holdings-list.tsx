
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const holdings = [
  { ticker: 'GOOGL', shares: 10, price: 179.63, value: 1796.30 },
  { ticker: 'AAPL', shares: 25, price: 214.29, value: 5357.25 },
  { ticker: 'TSLA', shares: 15, price: 184.88, value: 2773.20 },
  { ticker: 'AMZN', shares: 5, price: 189.08, value: 945.40 },
  { ticker: 'NVDA', shares: 40, price: 135.58, value: 5423.20 },
];

export default function HoldingsList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Holdings</CardTitle>
        <CardDescription>A list of all stocks you currently own in your virtual portfolio.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {holdings.map(stock => (
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
                   <p className="font-semibold">${stock.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
