'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating quizzes on financial topics.
 *
 * - generateQuiz - A function that generates a quiz based on a financial topic.
 * - AiQuizGeneratorInput - The input type for the generateQuiz function.
 * - AiQuizGeneratorOutput - The output type for the generateQuiz function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiQuizGeneratorInputSchema = z.object({
  topic: z.string().describe('The financial topic for which to generate the quiz.'),
});
export type AiQuizGeneratorInput = z.infer<typeof AiQuizGeneratorInputSchema>;

const AiQuizGeneratorOutputSchema = z.object({
  quiz: z.string().describe('The generated quiz questions and answers.'),
});
export type AiQuizGeneratorOutput = z.infer<typeof AiQuizGeneratorOutputSchema>;

export async function generateQuiz(input: AiQuizGeneratorInput): Promise<AiQuizGeneratorOutput> {
  return generateQuizFlow(input);
}

const quizPrompt = ai.definePrompt({
  name: 'quizPrompt',
  input: {schema: AiQuizGeneratorInputSchema},
  output: {schema: AiQuizGeneratorOutputSchema},
  prompt: `You are a financial education expert. Generate a quiz on the following topic: {{{topic}}}. The quiz should include multiple choice questions and their corresponding answers. Format the quiz in plain text.`, 
});

const generateQuizFlow = ai.defineFlow(
  {
    name: 'generateQuizFlow',
    inputSchema: AiQuizGeneratorInputSchema,
    outputSchema: AiQuizGeneratorOutputSchema,
  },
  async input => {
    const {output} = await quizPrompt(input);
    return output!;
  }
);
