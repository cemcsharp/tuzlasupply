"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function parseRfqFileWithAi(fileBase64: string, mimeType: string) {
  // Denenecek model isimleri
  const modelsToTry = ["gemini-1.5-flash", "gemini-1.5-flash-latest", "gemini-1.5-pro"];
  let lastError = "";

  for (const modelName of modelsToTry) {
    try {
      console.log(`Trying AI model: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });

      const prompt = `
        Analyze this document and extract a list of items.
        Return ONLY a JSON array of objects with keys: "name", "quantity", "unit".
        Example: [{"name": "Steel Bolt", "quantity": 10, "unit": "Pcs"}]
        Language: Turkish.
      `;

      const result = await model.generateContent([
        {
          inlineData: {
            data: fileBase64,
            mimeType: mimeType
          }
        },
        prompt
      ]);

      const response = await result.response;
      const text = response.text().trim().replace(/```json/g, "").replace(/```/g, "");
      
      try {
        const items = JSON.parse(text);
        return { success: true, items };
      } catch (e) {
        // If JSON fails, maybe it's still text, try again with simpler parsing or just return the items if found
        console.error("AI JSON Parse Error, retrying with different model...");
        continue;
      }
    } catch (error: any) {
      console.error(`Error with model ${modelName}:`, error.message);
      lastError = error.message;
      continue; // Denemeye devam et
    }
  }

  return { success: false, error: "Tüm modeller denendi fakat sonuç alınamadı: " + lastError };
}
