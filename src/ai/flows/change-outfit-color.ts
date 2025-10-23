'use server';
/**
 * @fileOverview AI agent that changes the color of a person's outfit in a photo.
 *
 * - changeOutfitColor - A function that handles the outfit color change process.
 * - ChangeOutfitColorInput - The input type for the changeOutfitColor function.
 * - ChangeOutfitColorOutput - The return type for the changeOutfitColor function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChangeOutfitColorInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a person, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  color: z.string().describe('The desired color for the outfit (e.g., #RRGGBB).'),
});
export type ChangeOutfitColorInput = z.infer<typeof ChangeOutfitColorInputSchema>;

const ChangeOutfitColorOutputSchema = z.object({
  modifiedPhotoDataUri: z
    .string()
    .describe('The modified photo with the outfit color changed, as a data URI.'),
});
export type ChangeOutfitColorOutput = z.infer<typeof ChangeOutfitColorOutputSchema>;

export async function changeOutfitColor(
  input: ChangeOutfitColorInput
): Promise<ChangeOutfitColorOutput> {
  return changeOutfitColorFlow(input);
}

const changeOutfitColorFlow = ai.defineFlow(
  {
    name: 'changeOutfitColorFlow',
    inputSchema: ChangeOutfitColorInputSchema,
    outputSchema: ChangeOutfitColorOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: [
        {media: {url: input.photoDataUri}},
        {text: `Change the outfit color to ${input.color}`},
      ],
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (!media?.url) {
        throw new Error('Image generation failed to return a valid data URI.');
    }

    return {modifiedPhotoDataUri: media.url};
  }
);
