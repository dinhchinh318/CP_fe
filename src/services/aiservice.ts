// import { config } from '../config';
// export interface AiResponse {
//   reply: string;
//   error?: string;
// }

// export async function sendToAI(message: string): Promise<AiResponse> {
//   try {
//     const res = await fetch("https://cp-be.onrender.com/api/ai", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ message }),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       throw new Error(data.error || "Không có phản hồi từ AI");
//     }

//     return { reply: data.reply };
//   } catch (err: any) {
//     console.error('AI API Error:', err);
//     return { reply: "", error: err.message };
//   }
// }

import api from './api'; // Import axios instance bạn đã tạo

export interface AiResponse {
  reply: string;
  error?: string;
}

export async function sendToAI(message: string): Promise<AiResponse> {
  try {
    // Dùng axios instance thay vì fetch
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