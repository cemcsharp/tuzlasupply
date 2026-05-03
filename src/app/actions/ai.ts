"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function parseRfqFileWithAi(fileBase64: string, mimeType: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are a professional industrial and general procurement specialist.
      Analyze the attached document (which could be an image of a list, a PDF, or an Excel screenshot).
      Extract all requested products, services, or materials.
      For each item, identify:
      1. Item Name (Description)
      2. Quantity
      3. Unit (e.g., Pcs, Kg, Meters, Liters, etc. - default to Pcs if unsure)

      Return the result ONLY as a JSON array of objects with the following keys: "name", "quantity", "unit".
      Do not include any other text or markdown formatting in your response, just the raw JSON array.
      If you cannot find any items, return an empty array [].
    `;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: fileBase64,
          mimeType: mimeType
        }
      }
    ]);

    const response = await result.response;
    const text = response.text().trim().replace(/```json/g, "").replace(/```/g, "");
    
    try {
      const items = JSON.parse(text);
      return { success: true, items };
    } catch (parseError) {
      console.error("AI JSON Parse Error:", text);
      return { success: false, error: "AI yanıtı işlenemedi." };
    }
  } catch (error: any) {
    console.error("AI ACTION ERROR:", error);
    return { success: false, error: error.message };
  }
}
