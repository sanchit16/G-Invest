
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type Stock = {
  ticker: string;
  name: string;
  price: number;
  change: string;
  changeType: 'increase' | 'decrease';
};

type StockCategoryListProps = {
  title: string;
  stocks: Stock[];
  className?: string;
};

export default function StockCategoryList({ title, stocks, className }: StockCategoryListProps) {
  return (
    <div className={className}>
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="space-y-3">
        {stocks.map((stock) => (
          <Card key={stock.ticker} className="hover:bg-muted/50 cursor-pointer">
            <CardContent className="p-3 flex justify-between items-center">
              <div>
                <p className="font-bold">{stock.ticker}</p>
                <p className="text-sm text-muted-foreground truncate max-w-40">{stock.name}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">${stock.price.toFixed(2)}</p>
                <p className={cn(
                  'text-sm font-semibold',
                  stock.changeType === 'increase' ? 'text-secondary' : 'text-destructive'
                )}>
                  {stock.change}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
