'use server';
/**
 * @fileOverview A flow for changing a person's entire outfit in a photo.
 *
 * - changeEntireOutfit - A function that handles the outfit replacement process.
 * - ChangeEntireOutfitInput - The input type for the changeEntireOutfit function.
 * - ChangeEntireOutfitOutput - The return type for the changeEntireOutfit function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChangeEntireOutfitInputSchema = z.object({
  photo1DataUri: z
    .string()
    .describe(
      "A photo of a person, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  photo2DataUri: z
    .string()
    .describe(
      "A photo of an outfit, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ChangeEntireOutfitInput = z.infer<typeof ChangeEntireOutfitInputSchema>;

const ChangeEntireOutfitOutputSchema = z.object({
  editedPhotoDataUri: z
    .string()
    .describe('The edited photo with the new outfit, as a data URI.'),
});
export type ChangeEntireOutfitOutput = z.infer<typeof ChangeEntireOutfitOutputSchema>;

export async function changeEntireOutfit(
  input: ChangeEntireOutfitInput
): Promise<ChangeEntireOutfitOutput> {
  return changeEntireOutfitFlow(input);
}

const changeEntireOutfitFlow = ai.defineFlow(
  {
    name: 'changeEntireOutfitFlow',
    inputSchema: ChangeEntireOutfitInputSchema,
    outputSchema: ChangeEntireOutfitOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: [
        {media: {url: input.photo1DataUri}},
        {
          text: 'generate an image of this character wearing the following outfit: ',
        },
        {media: {url: input.photo2DataUri}},
      ],
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });
    
    if (!media?.url) {
        throw new Error('Image generation failed to return a valid data URI.');
    }

    return {editedPhotoDataUri: media.url};
  }
);
