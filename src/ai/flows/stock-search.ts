'use server';
/**
 * @fileOverview A flow for searching stocks using a tool.
 *
 * - stockSearch - A function that handles the stock search process.
 * - StockSearchInput - The input type for the stockSearch function.
 * - StockSearchOutput - The return type for the stockSearch function.
 */

import { ai } from '@/ai/genkit';
import { searchStocks } from '@/ai/tools/google-finance';
import { z } from 'genkit';

const StockSearchInputSchema = z.object({
  query: z.string().describe("The user's search query for a stock."),
});
export type StockSearchInput = z.infer<typeof StockSearchInputSchema>;

const StockInfoSchema = z.object({
  ticker: z.string(),
  name: z.string(),
  price: z.number(),
  change: z.string(),
  changeType: z.enum(['increase', 'decrease']),
});

const StockSearchOutputSchema = z.object({
  results: z.array(StockInfoSchema).describe('A list of matching stocks.'),
});
export type StockSearchOutput = z.infer<typeof StockSearchOutputSchema>;

export async function stockSearch(input: StockSearchInput): Promise<StockSearchOutput> {
  return stockSearchFlow(input);
}

const stockSearchFlow = ai.defineFlow(
  {
    name: 'stockSearchFlow',
    inputSchema: StockSearchInputSchema,
    outputSchema: StockSearchOutputSchema,
  },
  async (input) => {
    // Directly call the tool to get structured data
    const searchResult = await searchStocks(input);
    return searchResult;
  }
);
