import { createGoogle } from 'ai-sdk-provider-gemini-cli';
import { generateObject } from 'ai';
import { FullResponseSchema } from './schema';

const MOCK_API_ENDPOINT = '/api/generate-graph';

const gemini = createGoogle({
  baseURL: MOCK_API_ENDPOINT,
  apiKey: 'mock-api-key-for-development',
});

export async function generateGraphFromText(text: string) {
  const prompt = `
    Based on the following text extracted from a document, please generate a knowledge graph.
    - Identify the key concepts and their relationships.
    - Create a step-by-step learning roadmap with 3-5 steps.
    - Structure the output as a valid JSON object conforming to the provided schema.

    Extracted text (first 4000 characters):
    ---
    ${text.substring(0, 4000)}
    ---
  `;

  const { object } = await generateObject({
    model: gemini('gemini-2.5-flash-lite-preview-06-17'),
    schema: FullResponseSchema,
    prompt,
  });

  return object;
}
