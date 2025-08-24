import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

declare global {
  // eslint-disable-next-line no-var
  var __ai: ReturnType<typeof genkit> | undefined;
}

export const ai =
  global.__ai ||
  genkit({
    plugins: [googleAI()],
    model: 'googleai/gemini-2.0-flash',
  });

if (process.env.NODE_ENV !== 'production') {
  global.__ai = ai;
}
