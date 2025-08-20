'use server';

/**
 * @fileOverview A Genkit tool for fetching stock prices and searching for stocks.
 * In a real application, this would call an external API like Google Finance.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const getStockPrice = ai.defineTool(
  {
    name: 'getStockPrice',
    description: 'Returns the current market price of a stock, given its ticker symbol.',
    inputSchema: z.object({
      ticker: z.string().describe('The ticker symbol of the stock (e.g., "GOOG", "AAPL").'),
    }),
    outputSchema: z.object({
        price: z.number().describe('The current price of the stock.'),
    }),
  },
  async (input) => {
    console.log(`[getStockPrice] Fetching price for ${input.ticker}`);
    
    // In a real application, you would make an API call here.
    // For this prototype, we'll return a simulated price.
    const mockPrice = (Math.random() * 500 + 50).toFixed(2);
    
    return { price: parseFloat(mockPrice) };
  }
);

const StockInfoSchema = z.object({
    ticker: z.string().describe('The stock ticker symbol.'),
    name: z.string().describe('The name of the company.'),
    price: z.number().describe('The current market price.'),
    change: z.string().describe('The price change for the day, as a formatted string (e.g., "+1.23%").'),
    changeType: z.enum(['increase', 'decrease']).describe('Whether the price increased or decreased.'),
});

export const searchStocks = ai.defineTool(
    {
        name: 'searchStocks',
        description: 'Searches for stocks based on a query string (company name or ticker).',
        inputSchema: z.object({
            query: z.string().describe('The search query for the stock.'),
        }),
        outputSchema: z.object({
            results: z.array(StockInfoSchema).describe('A list of matching stocks.'),
        }),
    },
    async ({ query }) => {
        console.log(`[searchStocks] Searching for: ${query}`);

        // Mock data for demonstration
        const allStocks = [
            { ticker: 'TSLA', name: 'Tesla Inc', price: 184.88, change: '+5.76%', changeType: 'increase' as const },
            { ticker: 'NVDA', name: 'NVIDIA Corp', price: 135.58, change: '+3.50%', changeType: 'increase' as const },
            { ticker: 'AAPL', name: 'Apple Inc', price: 214.29, change: '-1.04%', changeType: 'decrease' as const },
            { ticker: 'SPY', name: 'SPDR S&P 500 ETF Trust', price: 544.83, change: '+0.21%', changeType: 'increase' as const },
            { ticker: 'IVV', name: 'iShares CORE S&P 500 ETF', price: 546.79, change: '+0.22%', changeType: 'increase' as const },
            { ticker: 'VTI', name: 'Vanguard Total Stock Market ETF', price: 267.84, change: '+0.25%', changeType: 'increase' as const },
            { ticker: 'AMZN', name: 'Amazon.com, Inc.', price: 189.08, change: '+1.60%', changeType: 'increase' as const },
            { ticker: 'GOOGL', name: 'Alphabet Inc.', price: 179.22, change: '+1.89%', changeType: 'increase' as const },
            { ticker: 'MSFT', name: 'Microsoft Corporation', price: 449.78, change: '+0.92%', changeType: 'increase' as const },
        ];
        
        if (!query) {
            return { results: [] };
        }

        const lowerCaseQuery = query.toLowerCase();
        const filteredStocks = allStocks.filter(
            stock => stock.name.toLowerCase().includes(lowerCaseQuery) || stock.ticker.toLowerCase().includes(lowerCaseQuery)
        );

        return { results: filteredStocks.slice(0, 5) }; // Return top 5 matches
    }
);
