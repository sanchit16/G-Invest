'use server';

/**
 * @fileOverview AI agent that provides explanations for financial concepts.
 *
 * - financialConceptSearch - A function that allows searching for financial concepts and receiving AI-generated explanations.
 * - FinancialConceptSearchInput - The input type for the financialConceptSearch function.
 * - FinancialConceptSearchOutput - The return type for the financialConceptSearch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FinancialConceptSearchInputSchema = z.object({
  concept: z.string().describe('The financial concept to search for.'),
});
export type FinancialConceptSearchInput = z.infer<typeof FinancialConceptSearchInputSchema>;

const FinancialConceptSearchOutputSchema = z.object({
  explanation: z.string().describe('An explanation of the financial concept.'),
});
export type FinancialConceptSearchOutput = z.infer<typeof FinancialConceptSearchOutputSchema>;

export async function financialConceptSearch(input: FinancialConceptSearchInput): Promise<FinancialConceptSearchOutput> {
  return financialConceptSearchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'financialConceptSearchPrompt',
  input: {schema: FinancialConceptSearchInputSchema},
  output: {schema: FinancialConceptSearchOutputSchema},
  prompt: `You are a financial expert. Explain the following financial concept in a clear and concise manner:

Concept: {{{concept}}}

Explanation: `,
});

const financialConceptSearchFlow = ai.defineFlow(
  {
    name: 'financialConceptSearchFlow',
    inputSchema: FinancialConceptSearchInputSchema,
    outputSchema: FinancialConceptSearchOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
