import api from './api';

export interface AiResponse {
  reply: string;
  error?: string;
}

export async function sendToAI(message: string): Promise<AiResponse> {
  try {
    const response = await api.post('/api/ai', { message });
    
    return { reply: response.data.reply };
  } catch (err: any) {
    console.error('AI API Error:', err);
    
    const errorMessage = err.response?.data?.error 
      || err.message 
      || "Không có phản hồi từ AI";
    
    return { reply: "", error: errorMessage };
  }
}