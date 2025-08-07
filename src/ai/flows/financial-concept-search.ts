
'use server';

/**
 * @fileOverview AI agent that provides explanations for financial concepts based on a given context.
 *
 * - financialConceptSearch - A function that allows searching for financial concepts and receiving AI-generated explanations.
 * - FinancialConceptSearchInput - The input type for the financialConceptSearch function.
 * - FinancialConceptSearchOutput - The return type for the financialConceptSearch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FinancialConceptSearchInputSchema = z.object({
  concept: z.string().describe('The financial concept to search for.'),
  context: z.string().describe('The knowledge base text the AI should use to find the explanation.'),
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
  prompt: `You are a financial expert. Explain the following financial concept in a clear and concise manner, using *only* the provided context below. If the answer is not found in the context, state that you cannot answer the question with the provided information.

Context:
---
{{{context}}}
---

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
