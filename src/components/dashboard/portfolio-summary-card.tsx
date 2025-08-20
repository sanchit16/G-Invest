
import { TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function PortfolioSummaryCard() {
  const totalValue = 116281.24;
  const investedValue = 16281.24;
  const remainingBalance = 100000.00;
  const todaysGain = 2130.43;
  const todaysGainPercent = 1.86;

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Total Portfolio Value
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        <div className="flex items-center text-sm mt-1">
          <span className="text-secondary-foreground font-semibold flex items-center mr-2">
            <TrendingUp className="h-4 w-4 mr-1 text-secondary" />
            +${todaysGain.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <span className="text-muted-foreground">(+{todaysGainPercent.toFixed(2)}% today)</span>
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <p className="text-sm text-muted-foreground">Invested</p>
                <p className="text-xl font-semibold">${investedValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div>
                <p className="text-sm text-muted-foreground">Remaining Balance</p>
                <p className="text-xl font-semibold">${remainingBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
