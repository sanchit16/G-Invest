// A personalized financial lesson AI agent.
//
// - aiFinancialTutor - A function that provides personalized financial lessons.
// - AiFinancialTutorInput - The input type for the aiFinancialTutor function.
// - AiFinancialTutorOutput - The return type for the aiFinancialTutor function.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiFinancialTutorInputSchema = z.object({
  topic: z.string().describe('The topic or book to base the financial lessons on.'),
});
export type AiFinancialTutorInput = z.infer<typeof AiFinancialTutorInputSchema>;

const LessonSchema = z.object({
  title: z.string().describe('The title of the lesson.'),
  content: z.string().describe('The detailed content of the lesson.'),
  duration: z.string().describe('The estimated time to complete the lesson (e.g., "42min", "1hr 18min").'),
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
  prompt: `You are an AI financial tutor. Your task is to generate a curriculum of bite-sized financial lessons.
    
    {{#if topic}}
    Base the lessons on the core principles of: {{{topic}}}.
    {{else}}
    Base the lessons on general, fundamental principles of investing for beginners.
    {{/if}}

    Create a list of 5-7 lessons. Each lesson should have a clear title, a detailed content body, and an estimated duration for completion.
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
