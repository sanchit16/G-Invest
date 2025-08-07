// A personalized financial lesson AI agent.
//
// - aiFinancialTutor - A function that provides personalized financial lessons.
// - AiFinancialTutorInput - The input type for the aiFinancialTutor function.
// - AiFinancialTutorOutput - The return type for the aiFinancialTutor function.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiFinancialTutorInputSchema = z.object({
  skillLevel: z
    .string()
    .describe("The user's current skill level in financial literacy."),
  learningGoal: z
    .string()
    .describe('The specific financial concept the user wants to learn about.'),
});
export type AiFinancialTutorInput = z.infer<typeof AiFinancialTutorInputSchema>;

const AiFinancialTutorOutputSchema = z.object({
  lesson: z
    .string()
    .describe('A personalized financial lesson based on the user input.'),
});
export type AiFinancialTutorOutput = z.infer<typeof AiFinancialTutorOutputSchema>;

export async function aiFinancialTutor(input: AiFinancialTutorInput): Promise<AiFinancialTutorOutput> {
  return aiFinancialTutorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiFinancialTutorPrompt',
  input: {schema: AiFinancialTutorInputSchema},
  output: {schema: AiFinancialTutorOutputSchema},
  prompt: `You are an AI financial tutor that provides personalized,
    bite-sized financial lessons based on the user's current progress and skill level.

    Skill Level: {{{skillLevel}}}
    Learning Goal: {{{learningGoal}}}

    Provide a lesson that is tailored to the user's needs, and present the information in a way that is easy to understand.
    `, // Removed unnecessary line break here
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
