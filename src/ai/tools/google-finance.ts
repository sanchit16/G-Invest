'use server';

/**
 * @fileOverview A Genkit tool for fetching stock prices.
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
