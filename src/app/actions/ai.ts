"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function parseRfqFileWithAi(fileBase64: string, mimeType: string) {
  const modelsToTry = ["gemini-flash-latest", "gemini-1.5-flash", "gemini-1.5-pro"];
  let lastError = "";

  for (const modelName of modelsToTry) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });

      const prompt = `
        Sen çok titiz bir endüstriyel tedarik uzmanısın. Ekli dökümanda bir tablo/liste var.
        
        GÖREVİN:
        1. Listedeki HER BİR satırı ayrı bir ürün olarak ayıkla.
        2. Kırmızı başlıklar (Örn: GRİ SU POMPALARI için) altında listelenen maddeleri, başlıkla ilişkilendirerek ama AYRI SATIRLAR olarak yaz.
        3. Örnek: "750 LT. 10 BAR GENLEŞME TANKI", "KL01ACD-Kit mechanical seal", "RULMAN KİT" gibi her şeyi tek tek al.
        4. Miktarları ve birimleri (Adet, Kg vb.) yan sütunlardan oku.

        YANIT FORMATI:
        Sadece şu JSON formatında bir dizi döndür:
        [{"name": "Tam Ürün Açıklaması", "quantity": 1, "unit": "Adet"}]
        
        HİÇBİR açıklama yapma, sadece JSON döndür. Listenin tamamını çıkardığından emin ol.
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
        if (items.length > 0) return { success: true, items };
        continue;
      } catch (e) {
        continue;
      }
    } catch (error: any) {
      lastError = error.message;
      continue;
    }
  }

  return { success: false, error: "Liste okuma başarısız: " + lastError };
}
