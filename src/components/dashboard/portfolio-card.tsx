import { DollarSign, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PortfolioCard() {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Virtual Portfolio Value</CardTitle>
        <DollarSign className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">$125,832.64</div>
        <div className="flex items-center text-xs text-muted-foreground">
          <span className="text-secondary-foreground font-semibold flex items-center mr-2">
            <TrendingUp className="h-4 w-4 mr-1 text-secondary" />
            +$2,130.43
          </span>
          <span>(+1.72% today)</span>
        </div>
      </CardContent>
    </Card>
  );
}
