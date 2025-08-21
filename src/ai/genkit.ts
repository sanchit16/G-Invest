
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [
    googleAI({
      apiVersion: 'v1beta',
      // This is a temporary solution for the prototype environment.
      // In a real application, you would use a backend to securely manage API keys.
      apiKey: () => (window as any).__GEMINI_API_KEY || process.env.GEMINI_API_KEY,
    }),
  ],
  model: 'googleai/gemini-2.0-flash',
});
