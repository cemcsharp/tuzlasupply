"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function parseRfqFileWithAi(fileBase64: string, mimeType: string) {
  try {
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
      1. name: Ürünün adı veya tam açıklaması (Örn: "750 LT. 10 BAR GENLEŞME TANKI")
      2. quantity: Miktarı (Sadece sayı olarak, örn: 1)
      3. unit: Birimi (Örn: "Adet", "Kg", "Litre", "Metre" - Eğer dökümanda yoksa veya emin değilsen "Adet" kullan)

      Yanıtı SADECE şu formatta bir JSON dizisi olarak döndür: 
      [{"name": "...", "quantity": 1, "unit": "..."}]
      
      Eğer döküman boşsa veya ürün bulamazsan boş dizi [] döndür.
      Başka hiçbir metin veya açıklama ekleme.
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
    
    console.log("AI RAW RESPONSE:", text);

    try {
      const items = JSON.parse(text);
      return { success: true, items };
    } catch (parseError) {
      // Fallback: If JSON output wasn't perfect, try cleaning it
      const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();
      try {
        const items = JSON.parse(cleanedText);
        return { success: true, items };
      } catch (e) {
        return { success: false, error: "Liste formatı çözülemedi." };
      }
    }
  } catch (error: any) {
    console.error("AI ACTION ERROR:", error);
    return { success: false, error: "AI servis hatası: " + error.message };
  }
}
