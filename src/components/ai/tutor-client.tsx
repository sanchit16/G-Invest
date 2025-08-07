
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { BookOpen, CheckCircle, Bot, Sparkles, AlertTriangle } from 'lucide-react';
import { financialTutorChat } from '@/ai/flows/financial-tutor-chat';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Skeleton } from '../ui/skeleton';

const fullTextContext = `What Is the Stock Market? The stock market is a broad term for the network of exchanges, brokerages, and over-the-counter venues where investors buy and sell shares in publicly traded companies. Though people sometimes use "stock market" to refer to the New York Stock Exchange (NYSE) or the Nasdaq, these exchanges are components of a wider global marketplace. In the United States, the Securities and Exchange Commission regulates companies that want to sell shares to the public. Businesses must register with the SEC and publish periodic disclosures and financial statements. Key Takeaways Companies issue shares on the stock market to raise capital and expand their business. The Securities Exchange Act of 1934 was created to govern securities transactions on the secondary market. Investors may buy shares to receive dividends, vote in corporate elections, or sell shares at a higher price. The stock market plays a crucial role in modern economies by enabling money to move between investors and companies. How the Stock Market Works When people refer to the stock market, they often refer to a specific exchange, like the New York Stock Exchange. But the stock market is a larger system of exchanges, brokerages, and over-the-counter markets: Anywhere you can buy part of a company is part of the stock market. In this vast, complex network of trading activities, shares of companies are bought and sold, protected by laws against fraud and other unfair trading practices. The stock market plays a crucial role in modern economies by enabling money to move between investors and companies. People purchase stocks for a lot of reasons. Some hold onto shares, looking for income from dividends. Others look for low-priced stocks that are likely to gain value, so that they can sell at a profit. Still, others might be interested in having a say in how particular companies are run. That’s because you can vote at shareholder meetings based on the number of shares you own. Owning shares gives you the right to part of the company's profits, often paid as dividends, and sometimes the right to vote on company matters. Sometimes the best way to see how something works is to look at its parts. In that light, let's review the major elements of the stock market, from the companies selling shares to stocks to exchanges to the indexes that give us a snapshot of the stock market's health: What Are Public Companies? Not all companies can offer stock to the public. In the U.S., only companies that are registered with the SEC can sell their shares on a public exchange like the NYSE or Nasdaq. These companies must meet stringent regulations and financial disclosure laws. The traditional route to going public is via an initial public offering (IPO). The primary market consists of those who buy their shares directly from the company, such as early investors, company insiders, and, for companies going public, financial underwriters. It also includes private placements, where a company sells its shares directly to investors without going through the registration process. Once a company goes public, its stock can be traded in the secondary market via exchanges or "over the counter." Stocks: Buying and Selling Shares When you buy a stock or a share, you're getting a piece of that company. The price of a stock changes based on the demand for shares from new investors who want to buy, or the supply of shares from existing investors who want to sell. What Is a Stock Exchange? Once a company goes public, its shares can be traded freely on the stock market. Most trading occurs on stock exchanges. Stock exchanges are organized and regulated "places" (today it's mostly virtual) where stocks and other securities are bought and sold. They play a crucial role in the financial system by providing a platform for companies to raise money by selling their stocks and bonds to the public. The NYSE and Nasdaq are prime examples. Each exchange has its own internal rules, and investors follow different national and local laws. A major benefit of trading on stock exchanges is liquidity, the ability to buy or sell stocks relatively easily. Over-the-Counter Market Stocks can also be traded "over the counter" (OTC). These OTC markets are where you buy or sell stocks directly with another investor, typically without the same level of regulation or public scrutiny. This type of trading is commonly used for smaller, less liquid companies that may not meet the stringent listing requirements of the stock exchanges. Other Assets Sold on the Stock Market In addition to common stocks, many other assets are traded on stock exchanges and OTC. These are also considered part of the "stock market": American depositary receipts (ADRs), Derivatives, Funds (Mutual Funds, ETFs), Preferred stocks, and Real estate investment trusts (REITs). Investors and Traders Those in the stock market include institutional investors (like pension funds) and retail investors (individuals). Generally speaking, investors approach the market from a long-term perspective, aiming to build wealth steadily. Traders, for their part, take a more short-term approach, aiming to capitalize on market volatility. Role of Brokers Brokers act as a go-between for investors and the securities markets. They can be full-service brokers who provide detailed financial advice or discount brokers who provide a more hands-off experience. Online brokerage firms have become increasingly popular. Regulators In the U.S., the main regulator is the Securities and Exchange Commission (SEC). The SEC's mission is to protect investors, maintain fair markets, and facilitate capital formation. It enforces laws against market manipulation and insider trading. The Financial Industry Regulatory Authority (FINRA) oversees brokerage firms. How Stock Prices Are Determined Stock prices are determined by supply and demand. The factors that influence prices fall into two main types: fundamental (based on company performance) and technical (based on market sentiment and chart analysis). High stock prices can indicate a company's success. When a stock price drops, it signifies a decrease in the market value of that stock. Market Indexes Indexes like the Dow Jones Industrial Average (DJIA) or S&P 500 give a snapshot of the market's health. They are used as benchmarks to compare the performance of individual stocks and portfolios. Roles of the Stock Market The stock market fills several roles: Corporate governance, Economic indicator, Investment opportunities, Liquidity, Raising capital, and Resource allocation.`;

type Lesson = {
    title: string;
    content: string;
    duration: string;
    completed: boolean;
};

type Curriculum = {
    beginner: Lesson[];
    intermediate: Lesson[];
    advanced: Lesson[];
}

const hardcodedCurriculum: Curriculum = {
    beginner: [
        {
            title: "What Is the Stock Market?",
            content: "The stock market is a broad term for the network of exchanges and brokers where investors buy and sell shares in publicly traded companies. It includes well-known exchanges like the NYSE and Nasdaq, as well as over-the-counter (OTC) markets. Its primary purpose is to allow companies to raise capital for expansion and to give investors the opportunity to own a piece of a company. All activities are regulated by bodies like the Securities and Exchange Commission (SEC) in the U.S. to ensure fairness and transparency.",
            duration: "5min",
            completed: true,
        },
        {
            title: "How the Stock Market Works",
            content: "The stock market operates as a complex network where shares are traded. This includes organized exchanges and OTC markets. The price of a stock is determined by the core principles of supply and demand. If more investors want to buy a stock than sell it, the price goes up. If more want to sell, the price goes down. This dynamic is influenced by company performance, economic news, and investor sentiment.",
            duration: "8min",
            completed: true,
        },
        {
            title: "Why Companies Issue Stock",
            content: "The primary reason companies 'go public' and issue stock is to raise capital. This money can be used for various purposes, such as funding research and development, expanding into new markets, paying off debt, or acquiring other companies. Selling stock allows companies to grow without taking on debt from a bank, offering a piece of ownership in exchange for funds.",
            duration: "4min",
            completed: true,
        },
    ],
    intermediate: [
        {
            title: "Key Players: Investors, Traders, and Brokers",
            content: "The market has several key players. **Investors** typically buy stocks for long-term growth and potential dividends, focusing on a company's fundamental strength. **Traders** focus on short-term price movements, buying and selling more frequently to capitalize on volatility. **Brokers** are the licensed intermediaries who execute trades on behalf of investors and traders. They can be full-service, offering advice, or discount brokers for those who manage their own trades.",
            duration: "7min",
            completed: true,
        },
        {
            title: "Market Components: Exchanges and Indexes",
            content: "Stock **exchanges** (like the NYSE) are the regulated venues where most stock trading happens, providing liquidity and price transparency. **Market indexes**, like the S&P 500 or the Dow Jones Industrial Average (DJIA), are used to gauge the overall health and performance of the market. They are a snapshot of a collection of top-performing stocks and serve as benchmarks for investment performance.",
            duration: "6min",
            completed: true,
        },
        {
            title: "How Stock Prices Are Determined",
            content: "Stock prices are determined by the collective decisions of buyers and sellers. When more people want to buy a stock than sell it, demand exceeds supply, and the price goes up. When more want to sell, supply exceeds demand, and the price goes down. This dynamic is influenced by **fundamental factors** (like company earnings and profitability) and **technical factors** (like market sentiment and historical chart patterns).",
            duration: "9min",
            completed: true,
        },
    ],
    advanced: [
        {
            title: "Understanding Different Asset Types",
            content: "Beyond common stocks, the market includes a variety of other assets. **American Depositary Receipts (ADRs)** represent shares in foreign companies. **Derivatives** like options and futures derive their value from underlying assets. **Funds** like ETFs and mutual funds hold a basket of securities. **Preferred stocks** offer fixed dividends, and **REITs** focus on real estate. Each has different characteristics and risk profiles.",
            duration: "10min",
            completed: true,
        },
        {
            title: "The Role of Regulators",
            content: "The stock market is regulated to ensure fairness and protect investors. In the U.S., the **Securities and Exchange Commission (SEC)** enforces laws against fraud and insider trading. It ensures companies provide transparent financial disclosures. The **Financial Industry Regulatory Authority (FINRA)** is a self-regulatory organization that oversees brokerage firms. These bodies work together to maintain investor confidence and market integrity.",
            duration: "8min",
            completed: false,
        },
    ]
};

const LessonList = ({ lessons }: { lessons: Lesson[] }) => (
    <Accordion type="single" collapsible className="w-full">
        {lessons.map((lesson, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-lg font-semibold hover:no-underline text-left">
                    <div className="flex-1 text-left flex items-center gap-3">
                        {lesson.completed && <CheckCircle className="h-5 w-5 text-secondary" />}
                        <span>{lesson.title}</span>
                    </div>
                    <div className="text-sm font-normal text-muted-foreground ml-4 shrink-0">
                        1 lecture &bull; {lesson.duration}
                    </div>
                </AccordionTrigger>
                <AccordionContent className="prose dark:prose-invert max-w-none">
                    <p className="whitespace-pre-wrap">{lesson.content}</p>
                </AccordionContent>
            </AccordionItem>
        ))}
    </Accordion>
);

const chatFormSchema = z.object({
  question: z.string().min(10, 'Your question must be at least 10 characters.'),
});
type ChatFormValues = z.infer<typeof chatFormSchema>;

const ChatTutor = () => {
    const [conversation, setConversation] = useState<{ question: string; answer: string }[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<ChatFormValues>({
        resolver: zodResolver(chatFormSchema),
        defaultValues: {
            question: '',
        },
    });

    async function onSubmit(values: ChatFormValues) {
        setIsLoading(true);
        setError(null);
        try {
            const result = await financialTutorChat({
                question: values.question,
                context: fullTextContext,
            });
            setConversation(prev => [...prev, { question: values.question, answer: result.answer }]);
            form.reset();
        } catch (e: any) {
             console.error(e);
            if (e.message?.includes('SERVICE_DISABLED')) {
                setError('The AI Tutor Chat is being set up. This can take a few minutes. Please try again shortly.');
            } else if (e.message?.includes('API_KEY_SERVICE_BLOCKED')) {
                setError('The request is blocked. Please check your API key restrictions in the Google Cloud Console and ensure the "Generative Language API" is allowed.');
            } else {
                setError('An unexpected error occurred while chatting with the AI. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Chat with AI Tutor</CardTitle>
                <CardDescription>Ask a question about the material, and the AI will answer based on the lessons provided.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="space-y-2 max-h-64 overflow-y-auto p-2 rounded-md bg-muted/50">
                        {conversation.length === 0 && <p className="text-center text-sm text-muted-foreground">Ask a question to start the conversation.</p>}
                        {conversation.map((entry, index) => (
                            <div key={index} className="space-y-2">
                                <p className="font-semibold text-primary">You:</p>
                                <p>{entry.question}</p>
                                <p className="font-semibold text-secondary">AI Tutor:</p>
                                <p className="prose dark:prose-invert max-w-none">{entry.answer}</p>
                            </div>
                        ))}
                         {isLoading && (
                            <div className="flex items-center gap-2">
                                <Bot className="h-6 w-6 text-primary animate-pulse" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        )}
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-4">
                            <FormField
                                control={form.control}
                                name="question"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel className="sr-only">Your Question</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., 'What is an IPO?'" {...field} disabled={isLoading} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? 'Thinking...' : 'Ask'}
                                <Sparkles className="ml-2 h-4 w-4" />
                            </Button>
                        </form>
                    </Form>
                     {error && (
                        <Alert variant="destructive">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    <Alert variant="default" className="mt-4">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Disclaimer</AlertTitle>
                        <AlertDescription>
                            The answers are generated by an AI and may contain mistakes. Please verify important information.
                        </AlertDescription>
                    </Alert>
                </div>
            </CardContent>
        </Card>
    )
}

export default function AITutorClient() {
  const [curriculum] = useState<Curriculum>(hardcodedCurriculum);
  
  return (
    <div className="space-y-6">
      <Card className="animate-in fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <BookOpen className="h-6 w-6" />
            Stock Market Fundamentals
          </CardTitle>
           <CardDescription>
            Your personalized curriculum based on your progress. Select a level to view your lessons.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="beginner" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="beginner">Beginner</TabsTrigger>
                    <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>
                <TabsContent value="beginner" className="mt-4">
                    <LessonList lessons={curriculum.beginner} />
                </TabsContent>
                <TabsContent value="intermediate" className="mt-4">
                    <LessonList lessons={curriculum.intermediate} />
                </TabsContent>
                <TabsContent value="advanced" className="mt-4">
                    <LessonList lessons={curriculum.advanced} />
                </TabsContent>
            </Tabs>
        </CardContent>
      </Card>
      <ChatTutor />
    </div>
  );
}
