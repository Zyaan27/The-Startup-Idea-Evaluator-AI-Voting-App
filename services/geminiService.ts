
import { GoogleGenAI } from '@google/genai';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function generateFeedback(name: string, tagline: string, description: string): Promise<string> {
  const prompt = `
    You are "Sparky," a witty and slightly sarcastic AI startup advisor.
    Your goal is to provide a fun, fake, and brief evaluation of a startup idea.
    Keep your feedback to 2-3 concise sentences. Be encouraging but with a humorous, cynical twist.
    Do not use markdown formatting.

    Startup Name: "${name}"
    Tagline: "${tagline}"
    Description: "${description}"

    Generate your witty feedback now.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Sparky seems to be on a coffee break... Looks like you've created an idea so brilliant it broke the AI! Or maybe the server is just down. Either way, good job?";
  }
}
