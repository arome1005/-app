import { GoogleGenAI, GenerateContentResponse, Modality } from "@google/genai";

export const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface Message {
  role: 'user' | 'model';
  text: string;
  image?: string; // base64
  audio?: string; // base64
  corrections?: string;
}

export interface LLMConfig {
  provider: 'gemini' | 'ollama';
  ollamaUrl: string;
  ollamaModel: string;
  correctionIntensity: 'none' | 'standard' | 'perfectionist';
}

export const SYSTEM_INSTRUCTION = `You are a friendly and encouraging English Learning Assistant. 
Your goal is to help the user practice English through conversation.

Mode: Normal Conversation
1. Always respond in English.
2. Provide feedback based on the current Correction Intensity:
   - 'none': Do not provide any corrections unless explicitly asked.
   - 'standard': Gently correct significant grammar or vocabulary mistakes at the end of your response.
   - 'perfectionist': Provide detailed feedback on grammar, vocabulary, and natural phrasing (polishing) for every response.
3. Keep the conversation engaging and ask follow-up questions.
4. Adjust your complexity based on the user's level.

Mode: Scenario Role-play (Active when a scenario is selected)
1. You will play a specific role (e.g., Shopkeeper, Receptionist, Interviewer).
2. Help the user complete a specific task (e.g., "Buy a shirt", "Book a room").
3. Stay in character but provide learning support if the user gets stuck.
4. Conclude the scenario when the task is completed and provide a summary of their performance.

Mode: NCE 1 Translation Challenge (Active when user enables it)
1. You will provide a simple Chinese sentence related to New Concept English Book 1 topics (daily life, shopping, family, etc.).
2. Wait for the user to translate it into English.
3. Provide feedback on their translation, correct any errors, and explain the grammar point.
4. Then provide the next Chinese sentence.

General Rules:
- If the user asks for a translation or explanation in another language (like Chinese), provide it briefly but encourage returning to English.
- When providing corrections, use a clear format like: "Correction: [Corrected sentence] (Explanation)".
- If the user uploads an image, analyze it and discuss it in English. Help them describe what's in the image or use it as a topic for conversation.
- If the user uploads a file (PDF, Text, etc.), read its content and help the user with their learning based on that file.
- The user can paste images or text directly into the chat. Treat these as context for your English teaching.`;

async function callOllama(messages: any[], systemInstruction: string, config: LLMConfig, responseFormat?: 'json') {
  const url = `${config.ollamaUrl}/api/chat`;
  const ollamaMessages = [
    { role: 'system', content: systemInstruction },
    ...messages.map(m => ({
      role: m.role === 'model' ? 'assistant' : 'user',
      content: m.parts.map((p: any) => p.text || '').join('\n')
    }))
  ];

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: config.ollamaModel,
        messages: ollamaMessages,
        stream: false,
        format: responseFormat === 'json' ? 'json' : undefined
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Ollama error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.message?.content || '';
    return {
      text: content,
      candidates: [{ content: { parts: [{ text: content }] } }]
    };
  } catch (err: any) {
    if (err.name === 'TypeError' && err.message === 'Failed to fetch') {
      throw new Error('Could not connect to Ollama. Please ensure it is running and OLLAMA_ORIGINS="*" is set.');
    }
    throw err;
  }
}

export async function chatWithGemini(messages: { role: string, parts: any[] }[], llmConfig: LLMConfig, customInstruction?: string) {
  if (llmConfig.provider === 'ollama') {
    return await callOllama(messages, customInstruction || SYSTEM_INSTRUCTION, llmConfig);
  }

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: messages,
    config: {
      systemInstruction: customInstruction || SYSTEM_INSTRUCTION,
    },
  });
  return response;
}

export async function assessPronunciation(targetText: string, audioBase64: string, mimeType: string, llmConfig: LLMConfig) {
  // Note: Standard Ollama models don't support audio input. 
  // We'll fallback to Gemini for this specific multimodal task if possible, 
  // or return an error if the user strictly wants Ollama (but Ollama can't do it).
  // For now, we'll keep using Gemini for audio as it's a specialized multimodal feature.
  // If the user insists on Ollama, we'd need a multimodal model like LLaVA, but audio is still tricky.
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          parts: [
            { 
              text: `You are a professional English pronunciation coach. 
              Assess the pronunciation of the following text: "${targetText}". 
              
              Provide a rigorous and standard evaluation based on:
              1. Accuracy: Correctness of phonemes and word stress.
              2. Fluency: Smoothness, rhythm, and appropriate pausing.
              3. Prosody: Intonation, sentence stress, and emotional expression.
              
              CRITICAL RULES:
              - If there is NO SPEECH detected in the audio, or if it is only background noise, you MUST return a score of 0 and feedback stating "No speech detected. Please try again."
              - If the audio is completely unrelated to the target text, return a very low score (below 10).
              - Do NOT hallucinate a score if the audio is silent or unintelligible.
              - If the user just says "hello" or something else unrelated, it is a 0.
              
              Return the result in JSON format with:
              - "score": An integer from 0 to 100 representing the overall quality.
              - "accuracyScore": 0-100.
              - "fluencyScore": 0-100.
              - "prosodyScore": 0-100.
              - "feedback": A concise, professional, and constructive feedback string (max 150 characters) highlighting specific areas for improvement.` 
            },
            {
              inlineData: {
                mimeType,
                data: audioBase64
              }
            }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json"
      }
    });

    const result = JSON.parse(response.text || '{}');
    return {
      score: result.score || 0,
      accuracyScore: result.accuracyScore || 0,
      fluencyScore: result.fluencyScore || 0,
      prosodyScore: result.prosodyScore || 0,
      feedback: result.feedback || "Could not assess pronunciation."
    };
  } catch (error) {
    console.error("Pronunciation Assessment Error:", error);
    return { score: 0, feedback: "Error during assessment." };
  }
}

export async function generateExampleSentences(word: string, llmConfig: LLMConfig) {
  const prompt = `Generate 3 short and simple English example sentences for the word "${word}". 
  Requirements:
  1. Focus strictly on daily conversation (日常用语).
  2. Keep each sentence short and easy to practice (max 10-12 words).
  3. Ensure they are natural and common in everyday life.
  Return the result in JSON format as an array of strings named "sentences".`;

  try {
    if (llmConfig.provider === 'ollama') {
      const messages = [{ role: 'user', parts: [{ text: prompt }] }];
      const response = await callOllama(messages, "You are a helpful English teacher.", llmConfig, 'json');
      try {
        const result = JSON.parse(response.text || '{}');
        return result.sentences || [];
      } catch (parseError) {
        console.error("Ollama JSON Parse Error:", parseError, response.text);
        // Fallback: try to extract sentences if it's not perfect JSON
        const match = response.text.match(/\[.*\]/s);
        if (match) {
          try {
            const extracted = JSON.parse(match[0]);
            return Array.isArray(extracted) ? extracted : [];
          } catch { return []; }
        }
        return [];
      }
    }

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const result = JSON.parse(response.text || '{}');
    return result.sentences || [];
  } catch (error) {
    console.error("Example Sentences Generation Error:", error);
    return [];
  }
}
