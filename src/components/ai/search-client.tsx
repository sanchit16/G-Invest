
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Search, Bot, Sparkles, AlertTriangle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { financialConceptSearch, type FinancialConceptSearchOutput } from '@/ai/flows/financial-concept-search';
import { Skeleton } from '../ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

const formSchema = z.object({
  concept: z.string().min(2, 'Concept must be at least 2 characters.'),
});

type FormValues = z.infer<typeof formSchema>;

const fullTextContext = `What Is the Stock Market? The stock market is a broad term for the network of exchanges, brokerages, and over-the-counter venues where investors buy and sell shares in publicly traded companies. Though people sometimes use "stock market" to refer to the New York Stock Exchange (NYSE) or the Nasdaq, these exchanges are components of a wider global marketplace. In the United States, the Securities and Exchange Commission regulates companies that want to sell shares to the public. Businesses must register with the SEC and publish periodic disclosures and financial statements. Key Takeaways Companies issue shares on the stock market to raise capital and expand their business. The Securities Exchange Act of 1934 was created to govern securities transactions on the secondary market. Investors may buy shares to receive dividends, vote in corporate elections, or sell shares at a higher price. The stock market plays a crucial role in modern economies by enabling money to move between investors and companies. How the Stock Market Works When people refer to the stock market, they often refer to a specific exchange, like the New York Stock Exchange. But the stock market is a larger system of exchanges, brokerages, and over-the-counter markets: Anywhere you can buy part of a company is part of the stock market. In this vast, complex network of trading activities, shares of companies are bought and sold, protected by laws against fraud and other unfair trading practices. The stock market plays a crucial role in modern economies by enabling money to move between investors and companies. People purchase stocks for a lot of reasons. Some hold onto shares, looking for income from dividends. Others look for low-priced stocks that are likely to gain value, so that they can sell at a profit. Still, others might be interested in having a say in how particular companies are run. That’s because you can vote at shareholder meetings based on the number of shares you own. Owning shares gives you the right to part of the company's profits, often paid as dividends, and sometimes the right to vote on company matters. Sometimes the best way to see how something works is to look at its parts. In that light, let's review the major elements of the stock market, from the companies selling shares to stocks to exchanges to the indexes that give us a snapshot of the stock market's health: What Are Public Companies? Not all companies can offer stock to the public. In the U.S., only companies that are registered with the SEC can sell their shares on a public exchange like the NYSE or Nasdaq. These companies must meet stringent regulations and financial disclosure laws. The traditional route to going public is via an initial public offering (IPO). The primary market consists of those who buy their shares directly from the company, such as early investors, company insiders, and, for companies going public, financial underwriters. It also includes private placements, where a company sells its shares directly to investors without going through the registration process. Once a company goes public, its stock can be traded in the secondary market via exchanges or "over the counter." Stocks: Buying and Selling Shares When you buy a stock or a share, you're getting a piece of that company. The price of a stock changes based on the demand for shares from new investors who want to buy, or the supply of shares from existing investors who want to sell. What Is a Stock Exchange? Once a company goes public, its shares can be traded freely on the stock market. Most trading occurs on stock exchanges. Stock exchanges are organized and regulated "places" (today it's mostly virtual) where stocks and other securities are bought and sold. They play a crucial role in the financial system by providing a platform for companies to raise money by selling their stocks and bonds to the public. The NYSE and Nasdaq are prime examples. Each exchange has its own internal rules, and investors follow different national and local laws. A major benefit of trading on stock exchanges is liquidity, the ability to buy or sell stocks relatively easily. Over-the-Counter Market Stocks can also be traded "over the counter" (OTC). These OTC markets are where you buy or sell stocks directly with another investor, typically without the same level of regulation or public scrutiny. This type of trading is commonly used for smaller, less liquid companies that may not meet the stringent listing requirements of the stock exchanges. Other Assets Sold on the Stock Market In addition to common stocks, many other assets are traded on stock exchanges and OTC. These are also considered part of the "stock market": American depositary receipts (ADRs), Derivatives, Funds (Mutual Funds, ETFs), Preferred stocks, and Real estate investment trusts (REITs). Investors and Traders Those in the stock market include institutional investors (like pension funds) and retail investors (individuals). Generally speaking, investors approach the market from a long-term perspective, aiming to build wealth steadily. Traders, for their part, take a more short-term approach, aiming to capitalize on market volatility. Role of Brokers Brokers act as a go-between for investors and the securities markets. They can be full-service brokers who provide detailed financial advice or discount brokers who provide a more hands-off experience. Online brokerage firms have become increasingly popular. Regulators In the U.S., the main regulator is the Securities and Exchange Commission (SEC). The SEC's mission is to protect investors, maintain fair markets, and facilitate capital formation. It enforces laws against market manipulation and insider trading. The Financial Industry Regulatory Authority (FINRA) oversees brokerage firms. How Stock Prices Are Determined Stock prices are determined by supply and demand. The factors that influence prices fall into two main types: fundamental (based on company performance) and technical (based on market sentiment and chart analysis). High stock prices can indicate a company's success. When a stock price drops, it signifies a decrease in the market value of that stock. Market Indexes Indexes like the Dow Jones Industrial Average (DJIA) or S&P 500 give a snapshot of the market's health. They are used as benchmarks to compare the performance of individual stocks and portfolios. Roles of the Stock Market The stock market fills several roles: Corporate governance, Economic indicator, Investment opportunities, Liquidity, Raising capital, and Resource allocation.`;

export default function SearchClient() {
  const [result, setResult] = useState<FinancialConceptSearchOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      concept: '',
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setResult(null);
    setError(null);
    try {
      const searchResult = await financialConceptSearch({
        concept: values.concept,
        context: fullTextContext
      });
      setResult(searchResult);
    } catch (e: any)
      {
      console.error(e);
      if (e.message?.includes('SERVICE_DISABLED')) {
        setError('The Concept Search is being set up. This can take a few minutes. Please try again shortly.');
      } else if (e.message?.includes('API_KEY_SERVICE_BLOCKED')) {
        setError('The request is blocked. Please check your API key restrictions in the Google Cloud Console and ensure the "Generative Language API" is allowed.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-6 w-6" />
            Search Financial Concepts
          </CardTitle>
          <CardDescription>
            Enter a financial term or concept you want to understand better.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-4">
              <FormField
                control={form.control}
                name="concept"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="sr-only">Concept</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., '401(k)', 'Index Fund', 'Capital Gains'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Searching...' : 'Search'}
                <Sparkles className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Bot className="h-6 w-6 animate-pulse" />
              AI is searching...
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </CardContent>
        </Card>
      )}

      {error && (
         <Alert variant="destructive" className="mt-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Action Required</AlertTitle>
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
      )}

      {result && !isLoading && !error && (
        <Card className="mt-6 animate-in fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Bot className="h-6 w-6" />
              Explanation for "{form.getValues('concept')}"
            </CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p className="whitespace-pre-wrap">{result.explanation}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

    