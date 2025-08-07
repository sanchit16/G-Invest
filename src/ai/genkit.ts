import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [
    googleAI({
      apiVersion: 'v1beta',
      googleSearch: true,
    }),
  ],
  model: 'googleai/gemini-2.0-flash',
});
