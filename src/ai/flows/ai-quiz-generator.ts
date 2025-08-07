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
  output: {schema: AiQuizGeneratorOutputSchema}, // This line was missing and is the critical fix.
  prompt: `You are a financial education expert. Your task is to generate a short, engaging quiz on {{{topic}}}.
  
  Generate a quiz with 3-5 multiple choice questions. For each question, provide four options, one correct answer, and a brief explanation for the correct answer. Use your internal knowledge to create the questions.`,
});

const generateQuizFlow = ai.defineFlow(
  {
    name: 'generateQuizFlow',
    inputSchema: AiQuizGeneratorInputSchema,
    outputSchema: AiQuizGeneratorOutputSchema,
  },
  async input => {
    const {output} = await quizPrompt(input);
    if (!output) {
      throw new Error('AI failed to generate quiz output.');
    }
    return output;
  }
);
