'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating quizzes on financial topics.
 *
 * - generateQuiz - A function that generates a quiz based on a financial topic.
 * - AiQuizGeneratorInput - The input type for the generateQuiz function.
 * - AiQuizGeneratorOutput - The output type for the generateQuiz function.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/googleai';
import {z} from 'genkit';

const AiQuizGeneratorInputSchema = z.object({
  topic: z.string().describe('The financial topic for which to generate the quiz.'),
});
export type AiQuizGeneratorInput = z.infer<typeof AiQuizGeneratorInputSchema>;

const QuestionSchema = z.object({
  questionText: z.string().describe('The text of the quiz question.'),
  options: z.array(z.string()).describe('A list of four multiple-choice options.'),
  correctAnswer: z.string().describe('The correct answer from the list of options.'),
  explanation: z.string().describe('A brief explanation of why the answer is correct.'),
});

const AiQuizGeneratorOutputSchema = z.object({
  quizTitle: z.string().describe('A creative and relevant title for the quiz.'),
  questions: z.array(QuestionSchema).describe('A list of 3-5 quiz questions.'),
});
export type AiQuizGeneratorOutput = z.infer<typeof AiQuizGeneratorOutputSchema>;

export async function generateQuiz(input: AiQuizGeneratorInput): Promise<AiQuizGeneratorOutput> {
  return generateQuizFlow(input);
}

const quizPrompt = ai.definePrompt({
  name: 'quizPrompt',
  input: {schema: AiQuizGeneratorInputSchema},
  output: {schema: AiQuizGeneratorOutputSchema},
  tools: [googleAI.googleSearch],
  model: 'googleai/gemini-1.5-flash',
  prompt: `You are a financial education expert. Your task is to generate a short, engaging quiz.
  
  First, use the provided search tool to find information on the following topic: {{{topic}}}.
  
  Based on your search results, generate a quiz with 3-5 multiple choice questions. For each question, provide four options, one correct answer, and a brief explanation for the correct answer.`,
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
