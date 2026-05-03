"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function chatWithAi(message: string, history: any[] = [], sessionId?: string) {
  // Sizin anahtarınızda çalışan kesin modeller
  const modelsToTry = ["gemini-flash-latest", "gemini-1.5-flash", "gemini-1.5-pro"];
  let lastError = "";

  const systemContext = "Sen Tuzla Supply asistanı Tuzla AI'sın. Profesyonel ve yardımsever ol. ";

  for (const modelName of modelsToTry) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });

      const chat = model.startChat({
        history: history,
      });

      // Sistem bağlamını her mesajın başına ekleyerek garantiliyoruz
      const result = await chat.sendMessage(systemContext + message);
      const response = await result.response;
      return { success: true, text: response.text() };
    } catch (error: any) {
      lastError = error.message;
      console.error(`Chat Error (${modelName}):`, lastError);
      continue;
    }
  }

  return { success: false, error: "Teknik Hata: " + lastError };
}
