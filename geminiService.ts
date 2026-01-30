
import { GoogleGenAI } from "@google/genai";

// Fixed: Initializing GoogleGenAI with named parameter and direct process.env.API_KEY reference
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getLuviaResponse = async (prompt: string, context: 'marketing' | 'client' | 'provider' | 'marketplace' = 'marketing') => {
  const systemInstructions = {
    marketing: "You are Luvia, a scientific hygiene and property maintenance AI assistant. Explain the 70/30 escrow model, scientific ATP testing, and eco-friendly products. Be professional, authoritative, and clinical.",
    client: "You are the Luvia Concierge. Help the property owner manage their bookings, understand their maintenance alerts, and explain how to release escrow funds.",
    provider: "You are the Luvia Field Engine Guide. Help providers understand SOP requirements, photo evidence protocols, and payment cycles.",
    marketplace: "You are the Luvia Sustainability Assistant. Explain the science behind products, carbon offsets, and the 'deliver with next cleaning' feature."
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: systemInstructions[context],
        temperature: 0.7,
      },
    });
    // Correctly accessing .text property of GenerateContentResponse
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm experiencing a technical sync issue. Please contact LUVIA support directly at +234 902 286 1230.";
  }
};
