"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import * as XLSX from "xlsx";
import mammoth from "mammoth";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function parseRfqFileWithAi(fileBase64: string, mimeType: string) {
  const modelsToTry = ["gemini-1.5-flash", "gemini-flash-latest"];
  let lastError = "";

  try {
    let aiInput: any;
    let extractedText = "";

    // 1. EXCEL DESTEĞİ
    if (mimeType.includes("spreadsheet") || mimeType.includes("excel")) {
      const buffer = Buffer.from(fileBase64, "base64");
      const workbook = XLSX.read(buffer, { type: "buffer" });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      extractedText = `Excel İçeriği:\n${JSON.stringify(jsonData, null, 2)}`;
    } 
    // 2. WORD DESTEĞİ
    else if (mimeType.includes("wordprocessingml") || mimeType.includes("msword")) {
      const buffer = Buffer.from(fileBase64, "base64");
      const result = await mammoth.extractRawText({ buffer });
      extractedText = `Word İçeriği:\n${result.value}`;
    }

    // AI INPUT HAZIRLIĞI
    if (extractedText) {
      aiInput = [
        `Analiz et ve ürün listesini ayıkla:\n${extractedText}\n\n` +
        `Yanıtı SADECE JSON dizi olarak ver: [{"name": "...", "quantity": 1, "unit": "..."}]`
      ];
    } else {
      // Resim veya PDF
      aiInput = [
        {
          inlineData: {
            data: fileBase64,
            mimeType: mimeType
          }
        },
        `Analyze this and extract all items. Return ONLY JSON array: [{"name": "...", "quantity": 1, "unit": "..."}]`
      ];
    }

    for (const modelName of modelsToTry) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(aiInput);
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
  } catch (globalError: any) {
    return { success: false, error: "Dosya işleme hatası: " + globalError.message };
  }
}
