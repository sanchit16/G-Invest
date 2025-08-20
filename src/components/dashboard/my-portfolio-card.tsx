import { Briefcase } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const portfolioData = [
  {
    ticker: 'GOOG',
    name: 'Alphabet',
    price: 175.43,
    change: 1.25,
    value: 25061.44,
    changeType: 'increase',
  },
  {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    price: 214.29,
    change: -0.78,
    value: 18428.99,
    changeType: 'decrease',
  },
  {
    ticker: 'TSLA',
    name: 'Tesla Inc',
    price: 183.01,
    change: 2.51,
    value: 15190.12,
    changeType: 'increase',
  },
  {
    ticker: 'AMZN',
    name: 'Amazon.com',
    price: 189.08,
    change: 0.99,
    value: 12345.67,
    changeType: 'increase',
  },
  {
    ticker: 'NVDA',
    name: 'Nvidia',
    price: 135.58,
    change: 3.50,
    value: 45012.34,
    changeType: 'increase',
  },
];

export default function MyPortfolioCard() {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-muted-foreground" />
            My Portfolio
        </CardTitle>
        <CardDescription>A summary of your top virtual stock holdings.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ticker</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Change</TableHead>
              <TableHead className="text-right">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {portfolioData.map((stock) => (
              <TableRow key={stock.ticker}>
                <TableCell>
                  <div className="font-medium">{stock.ticker}</div>
                  <div className="text-xs text-muted-foreground">{stock.name}</div>
                </TableCell>
                <TableCell>${stock.price.toFixed(2)}</TableCell>
                <TableCell
                  className={`text-right font-medium ${
                    stock.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {stock.changeType === 'increase' ? '+' : ''}
                  {stock.change.toFixed(2)}%
                </TableCell>
                <TableCell className="text-right">${stock.value.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
