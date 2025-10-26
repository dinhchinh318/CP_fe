import { config } from '../config';
export interface AiResponse {
  reply: string;
  error?: string;
}

export async function sendToAI(message: string): Promise<AiResponse> {
  try {
    const res = await fetch(`${config.API_URL}/api/ai/`, {
    //                      ↑ Backtick (phím ~ bên trái số 1)
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Không có phản hồi từ AI");
    }

    return { reply: data.reply };
  } catch (err: any) {
    console.error('AI API Error:', err);
    return { reply: "", error: err.message };
  }
}
