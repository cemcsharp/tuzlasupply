"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function parseRfqFileWithAi(fileBase64: string, mimeType: string) {
  // Sizin CURL komutunuzda çalışan 'gemini-flash-latest' ismini en başa aldım
  const modelsToTry = ["gemini-flash-latest", "gemini-1.5-flash", "gemini-1.5-flash-latest", "gemini-pro-vision"];
  let lastError = "";

  for (const modelName of modelsToTry) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });

      const prompt = `
        Sen bir tedarik uzmanısın. Ekli dökümandaki ürünleri bul.
        Yanıtı SADECE şu formatta bir JSON dizisi olarak ver:
        [{"name": "Ürün Adı", "quantity": 1, "unit": "Adet"}]
        Dil: Türkçe.
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
        continue;
      }
    } catch (error: any) {
      lastError = error.message;
      continue;
    }
  }

  return { success: false, error: "Model erişilemedi (CURL'deki ismi denedim): " + lastError };
}
