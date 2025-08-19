'use server';

/**
 * @fileOverview A conversational AI agent for answering stock market questions,
 * capable of fetching real-time stock prices using a tool.
 *
 * - stockMarketChat - A function that handles the conversation.
 * - StockMarketChatInput - The input type for the function.
 * - StockMarketChatOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { getStockPrice } from '@/ai/tools/google-finance';
import { z } from 'genkit';

const StockMarketChatInputSchema = z.object({
  message: z.string().describe('The user\'s message or question.'),
});
export type StockMarketChatInput = z.infer<typeof StockMarketChatInputSchema>;

const StockMarketChatOutputSchema = z.object({
  answer: z.string().describe('The AI-generated answer to the user\'s question.'),
});
export type StockMarketChatOutput = z.infer<typeof StockMarketChatOutputSchema>;

export async function stockMarketChat(input: StockMarketChatInput): Promise<StockMarketChatOutput> {
  return stockMarketChatFlow(input);
}

const marketChatPrompt = ai.definePrompt({
  name: 'marketChatPrompt',
  tools: [getStockPrice],
  input: { schema: StockMarketChatInputSchema },
  output: { schema: StockMarketChatOutputSchema },
  prompt: `You are a helpful stock market assistant. Answer the user's question.
  If the user asks for the price of a specific stock, use the getStockPrice tool to provide the most current data.
  
  Question: {{{message}}}
  `,
});

const stockMarketChatFlow = ai.defineFlow(
  {
    name: 'stockMarketChatFlow',
    inputSchema: StockMarketChatInputSchema,
    outputSchema: StockMarketChatOutputSchema,
  },
  async (input) => {
    const { output } = await marketChatPrompt(input);
    if (!output) {
      throw new Error('AI failed to generate a response.');
    }
    return output;
  }
);
