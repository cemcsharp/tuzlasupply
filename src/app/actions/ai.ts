"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

// API Anahtarını al
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function parseRfqFileWithAi(fileBase64: string, mimeType: string) {
  try {
    // Model ismi olarak en stabil olanı seçiyoruz
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    const prompt = `
      Sen profesyonel bir endüstriyel tedarik ve denizcilik uzmanısın.
      Ekli dökümanı (resim veya PDF) analiz et.
      Dökümandaki tüm ürün, hizmet veya malzemeleri ayıkla.
      
      Her kalem için şunları belirle:
      1. name: Ürünün adı veya tam açıklaması
      2. quantity: Miktarı (Sadece sayı olarak)
      3. unit: Birimi (Örn: "Adet", "Kg", "Litre", "Metre" - Varsayılan: "Adet")

      Yanıtı SADECE şu formatta bir JSON dizisi olarak döndür: 
      [{"name": "...", "quantity": 1, "unit": "..."}]
      
      Başka hiçbir metin ekleme.
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
    const text = response.text().trim();
    
    try {
      const items = JSON.parse(text);
      return { success: true, items };
    } catch (parseError) {
      const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();
      const items = JSON.parse(cleanedText);
      return { success: true, items };
    }
  } catch (error: any) {
    console.error("AI ACTION ERROR:", error);
    // Eğer 1.5-flash bulunamazsa bir alt modeli (pro-vision) deneyebiliriz veya hata döneriz
    return { success: false, error: "Model erişim hatası: " + error.message };
  }
}
