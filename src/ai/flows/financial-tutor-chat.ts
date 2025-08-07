'use server';

/**
 * @fileOverview AI agent that provides answers to financial questions based on a given context.
 *
 * - financialTutorChat - A function that allows users to ask financial questions and get AI-generated answers.
 * - FinancialTutorChatInput - The input type for the financialTutorChat function.
 * - FinancialTutorChatOutput - The return type for the financialTutorChat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FinancialTutorChatInputSchema = z.object({
  question: z.string().describe('The user\'s question about a financial topic.'),
  context: z.string().describe('The knowledge base text the AI should use to answer the question.'),
});
export type FinancialTutorChatInput = z.infer<typeof FinancialTutorChatInputSchema>;

const FinancialTutorChatOutputSchema = z.object({
  answer: z.string().describe('The AI-generated answer to the user\'s question.'),
});
export type FinancialTutorChatOutput = z.infer<typeof FinancialTutorChatOutputSchema>;

export async function financialTutorChat(input: FinancialTutorChatInput): Promise<FinancialTutorChatOutput> {
  return financialTutorChatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'financialTutorChatPrompt',
  input: {schema: FinancialTutorChatInputSchema},
  output: {schema: FinancialTutorChatOutputSchema},
  prompt: `You are an AI Financial Tutor. Your role is to answer the user's question based *only* on the provided context below. Do not use any external knowledge. If the answer is not found in the context, state that you cannot answer the question with the provided information.

Context:
---
{{{context}}}
---

User Question: {{{question}}}

Answer:`,
});

const financialTutorChatFlow = ai.defineFlow(
  {
    name: 'financialTutorChatFlow',
    inputSchema: FinancialTutorChatInputSchema,
    outputSchema: FinancialTutorChatOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('AI failed to generate a response.');
    }
    return output;
  }
);
