
"use client";

import { useState } from 'react';
import { BookOpen } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { type AiFinancialTutorOutput } from '@/ai/flows/ai-financial-tutor';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

const hardcodedCurriculum: AiFinancialTutorOutput = {
    lessons: [
        {
            title: "What Is the Stock Market?",
            content: "The stock market is a broad term for the network of exchanges and brokers where investors buy and sell shares in publicly traded companies. It's a crucial part of modern economies, allowing companies to raise capital for expansion and giving investors the opportunity to own a piece of a company. In the U.S., the Securities and Exchange Commission (SEC) regulates these activities to ensure fairness and transparency.",
            duration: "5min"
        },
        {
            title: "How the Stock Market Works",
            content: "The stock market operates as a complex network where shares are traded. This includes organized exchanges like the NYSE and Nasdaq, as well as over-the-counter (OTC) markets for smaller companies. The price of a stock is determined by supply and demand. If more investors want to buy a stock than sell it, the price goes up. If more want to sell, the price goes down.",
            duration: "8min"
        },
        {
            title: "Key Players: Investors, Traders, and Brokers",
            content: "Investors typically buy stocks for long-term growth and potential dividends. Traders focus on short-term price movements, buying and selling more frequently to capitalize on volatility. Brokers are the intermediaries who execute trades on behalf of investors and traders. They can be full-service, offering advice, or discount brokers for those who manage their own trades.",
            duration: "7min"
        },
        {
            title: "Market Components: Exchanges and Indexes",
            content: "Stock exchanges (like the NYSE) are the regulated venues where most stock trading happens, providing liquidity and price transparency. Market indexes, like the S&P 500 or the Dow Jones Industrial Average (DJIA), are used to gauge the overall health and performance of the market. They are a snapshot of a collection of top-performing stocks.",
            duration: "6min"
        },
        {
            title: "Why Companies Issue Stock",
            content: "The primary reason companies 'go public' and issue stock is to raise capital. This money can be used for various purposes, such as funding research and development, expanding into new markets, paying off debt, or acquiring other companies. Selling stock allows companies to grow without taking on debt from a bank.",
            duration: "4min"
        }
    ]
};

export default function AITutorClient() {
  const [curriculum] = useState<AiFinancialTutorOutput>(hardcodedCurriculum);
  
  return (
    <div>
      <Card className="animate-in fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <BookOpen className="h-6 w-6" />
            Stock Market Fundamentals
          </CardTitle>
           <CardDescription>
            Expand each section below to view your lesson. This curriculum is based on fundamental stock market principles.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
              {curriculum.lessons.map((lesson, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                      <AccordionTrigger className="text-lg font-semibold hover:no-underline text-left">
                        <div className="flex-1 text-left">{lesson.title}</div>
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
        </CardContent>
      </Card>
    </div>
  );
}
