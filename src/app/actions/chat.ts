"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "@/lib/prisma";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function chatWithAi(message: string, history: any[] = [], sessionId?: string) {
  const modelsToTry = ["gemini-1.5-flash", "gemini-1.5-flash-latest", "gemini-2.0-flash-exp"];
  let lastError = "";

  const systemContext = "Sen Tuzla Supply asistanı Tuzla AI'sın. Profesyonel ve yardımsever ol. ";

  // 1. Kullanıcı Mesajını Kaydet (Arka Planda)
  prisma.chatLog.create({
    data: {
      message: message,
      role: "user",
      sessionId: sessionId || "global"
    }
  }).catch(e => console.error("Log Error (User):", e.message));

  for (const modelName of modelsToTry) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });

      const chat = model.startChat({
        history: history,
      });

      const result = await chat.sendMessage(systemContext + message);
      const response = await result.response;
      const aiText = response.text();

      // 2. Asistan Yanıtını Kaydet (Arka Planda)
      prisma.chatLog.create({
        data: {
          message: aiText,
          role: "assistant",
          sessionId: sessionId || "global"
        }
      }).catch(e => console.error("Log Error (AI):", e.message));

      return { success: true, text: aiText };
    } catch (error: any) {
      lastError = error.message;
      console.error(`Chat Error (${modelName}):`, lastError);
      continue;
    }
  }

  return { success: false, error: "Teknik Hata: " + lastError };
}

export async function saveChatLead(data: { name: string, email: string, phone?: string, sessionId: string }) {
  try {
    const lead = await prisma.chatLead.create({
      data: data
    });
    return { success: true, lead };
  } catch (error: any) {
    console.error("SAVE LEAD ERROR:", error.message);
    return { success: false, error: error.message };
  }
}
