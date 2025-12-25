
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisColor, AnalysisResult } from "../types";

const cleanJsonResponse = (text: string): string => {
  let cleaned = text.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?/, "").replace(/```$/, "");
  }
  return cleaned.trim();
};

export const analyzeEthicalContent = async (userPrompt: string): Promise<AnalysisResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ parts: [{ text: `Kullanıcı şu görseli oluşturmak istiyor: "${userPrompt}"` }] }],
      config: {
        systemInstruction: `Sen çocuklar için bilge bir Yapay Zeka Etiği Öğretmenisin. 
        Görevin, çocukların hayal ettiği görselleri analiz etmek ve şu kurallara göre değerlendirmektir:

        KRİTİK KURAL (MİLLİ DEĞERLER): 
        Atatürk, Fatih Sultan Mehmet gibi milli ve tarihi şahsiyetlerin 'süper kahraman kostümü', 'Marvel karakteri' veya 'gerçek dışı/komik' hallerde gösterilmesi KABUL EDİLEMEZ. Bu, tarihsel gerçekliğe ve kültürel mirasımıza saygısızlıktır.
        Bu durumda:
        - color: "RED"
        - title: "Kültürel Değerlerimize Saygı! 🛡️"
        - explanation: "Atatürk ve diğer tarihi kahramanlarımızı gerçek halleriyle korumalıyız. Onları bir film karakteri gibi göstermek, tarihimize ve kültürel değerlerimize uygun değildir. Lütfen onları aslına uygun şekilde hayal et."

        GENEL KURALLAR:
        1. Güvenli ve etik içerikler: GREEN.
        2. Hafif riskli veya kafa karıştırıcı: YELLOW.
        3. Şiddet, korku, saygısızlık: RED.
        
        Yanıtını çocukların anlayacağı, teşvik edici ama kuralcı bir dille sadece JSON formatında ver.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            color: {
              type: Type.STRING,
              enum: ["GREEN", "YELLOW", "RED"],
            },
            title: {
              type: Type.STRING,
            },
            explanation: {
              type: Type.STRING,
            }
          },
          required: ["color", "title", "explanation"]
        }
      }
    });

    const rawText = response.text;
    if (!rawText) throw new Error("Yapay zeka yanıt vermedi.");
    
    const cleanedJson = cleanJsonResponse(rawText);
    return JSON.parse(cleanedJson);

  } catch (error: any) {
    console.error("Ethical Analysis Error:", error);
    // Spesifik olarak Atatürk ve milli değerler engellemesini manuel olarak da garantiye alalım (fallback)
    const p = userPrompt.toLowerCase();
    if (p.includes("atatürk") && (p.includes("marvel") || p.includes("süper kahraman") || p.includes("kostüm"))) {
        return {
            color: AnalysisColor.RED,
            title: "Kültürel Değerlerimize Saygı! 🛡️",
            explanation: "Atatürk'ü bir film karakteri gibi göstermek, tarihi değerlerimizi koruma prensibimize aykırıdır. Onu her zaman gerçek ve asil haliyle anmalıyız."
        };
    }
    throw error;
  }
};

export const generateSafeImage = async (prompt: string): Promise<string | null> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    if (response.candidates && response.candidates[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
        }
      }
    }
    return null;
  } catch (error: any) {
    console.error("Image Generation Error:", error);
    throw error;
  }
};
