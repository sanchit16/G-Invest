
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
      <h2 className="text-lg font-bold mb-3">{title}</h2>
      <div className="space-y-2">
        {stocks.map((stock) => (
          <Card key={stock.ticker} className="hover:bg-muted/50 cursor-pointer">
            <CardContent className="p-2 flex justify-between items-center">
              <div>
                <p className="font-bold text-sm">
                  {stock.ticker}
                  <span className="text-xs text-muted-foreground font-normal ml-2 truncate">{stock.name}</span>
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-sm">${stock.price.toFixed(2)}</p>
                <p className={cn(
                  'text-xs font-semibold',
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
