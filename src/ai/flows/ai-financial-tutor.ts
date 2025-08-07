// A personalized financial lesson AI agent.
//
// - aiFinancialTutor - A function that provides personalized financial lessons.
// - AiFinancialTutorInput - The input type for the aiFinancialTutor function.
// - AiFinancialTutorOutput - The return type for the aiFinancialTutor function.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiFinancialTutorInputSchema = z.object({});
export type AiFinancialTutorInput = z.infer<typeof AiFinancialTutorInputSchema>;

const LessonSchema = z.object({
  title: z.string().describe('The title of the lesson.'),
  content: z.string().describe('The detailed content of the lesson.'),
});

const AiFinancialTutorOutputSchema = z.object({
  lessons: z
    .array(LessonSchema)
    .describe(
      'A list of financial lessons to form a curriculum.'
    ),
});
export type AiFinancialTutorOutput = z.infer<typeof AiFinancialTutorOutputSchema>;

export async function aiFinancialTutor(input: AiFinancialTutorInput): Promise<AiFinancialTutorOutput> {
  return aiFinancialTutorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiFinancialTutorPrompt',
  input: {schema: AiFinancialTutorInputSchema},
  output: {schema: AiFinancialTutorOutputSchema},
  prompt: `You are an AI financial tutor. Your task is to generate a curriculum of bite-sized financial lessons based on the core principles of the book "The Intelligent Investor" by Benjamin Graham.

    Create a list of 5-7 lessons that cover key concepts from the book relevant to understanding the market. Each lesson should have a clear title and a detailed content body. The content should be presented in a way that is easy for a beginner to understand.
    `,
});

const aiFinancialTutorFlow = ai.defineFlow(
  {
    name: 'aiFinancialTutorFlow',
    inputSchema: AiFinancialTutorInputSchema,
    outputSchema: AiFinancialTutorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
