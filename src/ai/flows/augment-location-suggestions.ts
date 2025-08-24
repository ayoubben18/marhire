'use server';

/**
 * @fileOverview A Genkit flow to augment location suggestions with nearby locations if the initial search returns no results.
 *
 * - augmentLocationSuggestions - A function that augments location suggestions based on the user's input.
 * - AugmentLocationSuggestionsInput - The input type for the augmentLocationSuggestions function.
 * - AugmentLocationSuggestionsOutput - The return type for the augmentLocationSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AugmentLocationSuggestionsInputSchema = z.object({
  location: z
    .string()
    .describe('The user-specified location to search for nearby locations.'),
  originalSuggestions: z.array(z.string()).describe('The list of original location suggestions from the database.'),
});
export type AugmentLocationSuggestionsInput = z.infer<
  typeof AugmentLocationSuggestionsInputSchema
>;

const AugmentLocationSuggestionsOutputSchema = z.array(z.string()).describe('The augmented list of location suggestions.');
export type AugmentLocationSuggestionsOutput = z.infer<
  typeof AugmentLocationSuggestionsOutputSchema
>;

export async function augmentLocationSuggestions(
  input: AugmentLocationSuggestionsInput
): Promise<AugmentLocationSuggestionsOutput> {
  return augmentLocationSuggestionsFlow(input);
}

const augmentLocationSuggestionsPrompt = ai.definePrompt({
  name: 'augmentLocationSuggestionsPrompt',
  input: {schema: AugmentLocationSuggestionsInputSchema},
  output: {schema: AugmentLocationSuggestionsOutputSchema},
  prompt: `You are a helpful assistant designed to suggest nearby locations.

The user is searching for rentals in a specific location: {{{location}}}.

The application has already performed a database search for this location and returned the following suggestions: {{#if originalSuggestions}}{{{originalSuggestions}}}{{else}}none{{/if}}.

If the database search returned no results, suggest three nearby locations that the user might be interested in, basing your suggestions on the original location.
If there were results from the database search, return the original list of suggestions.

Output ONLY a JSON array of strings. Each string should be a location suggestion.
`,
});

const augmentLocationSuggestionsFlow = ai.defineFlow(
  {
    name: 'augmentLocationSuggestionsFlow',
    inputSchema: AugmentLocationSuggestionsInputSchema,
    outputSchema: AugmentLocationSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await augmentLocationSuggestionsPrompt(input);
    return output!;
  }
);
