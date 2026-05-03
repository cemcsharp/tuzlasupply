"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "@/lib/prisma";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const SYSTEM_INSTRUCTION = `
Sen Tuzla Supply'ın resmi Yapay Zeka asistanısın. Profesyonel, yardımsever ve sektör uzmanı bir dil kullanmalısın.
Tuzla Supply; endüstriyel tedarik, denizcilik ve genel lojistik çözümleri sunan bir teknoloji şirketidir.

GÖREVLERİN:
1. Kullanıcılara Tuzla Supply hizmetleri hakkında bilgi ver.
2. Teknik soruları (pompa, vana, yedek parça vb.) bir uzman gibi yanıtla.
3. Yanıtlarını kısa, öz ve kurumsal bir dille yaz.
4. Adın: Tuzla AI.
`;

export async function chatWithAi(message: string, history: any[] = [], sessionId?: string) {
  const modelsToTry = ["gemini-flash-latest", "gemini-1.5-flash", "gemini-1.5-pro"];
  let lastError = "";

  // 1. Kullanıcı Mesajını Kaydet (ARKA PLANDA - AWAIT YOK)
  prisma.chatLog.create({
    data: {
      message: message,
      role: "user",
      sessionId: sessionId || "global"
    }
  }).catch(e => console.error("DB Log Error (User):", e.message));

  for (const modelName of modelsToTry) {
    try {
      const model = genAI.getGenerativeModel({ 
        model: modelName,
        systemInstruction: SYSTEM_INSTRUCTION 
      });

      const chat = model.startChat({
        history: history,
      });

      const result = await chat.sendMessage(message);
      const response = await result.response;
      const aiText = response.text();

      // 2. Asistan Yanıtını Kaydet (ARKA PLANDA - AWAIT YOK)
      prisma.chatLog.create({
        data: {
          message: aiText,
          role: "assistant",
          sessionId: sessionId || "global"
        }
      }).catch(e => console.error("DB Log Error (AI):", e.message));

      return { success: true, text: aiText };
    } catch (error: any) {
      console.error(`Chat Error with ${modelName}:`, error.message);
      lastError = error.message;
      continue;
    }
  }

  return { success: false, error: "Asistan şu an teknik bir bakımda: " + lastError };
}
