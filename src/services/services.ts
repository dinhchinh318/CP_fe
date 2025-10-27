import api from './api';
import { AuthResponse, RegisterData, LoginData, Question, TestAnswer, TestResult, Career } from '../types';

export const authService = {
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },
};

export const questionService = {
  getQuestions: async (): Promise<Question[]> => {
    const response = await api.get('/questions');
    return response.data;
  },

  createQuestion: async (data: {
    content: string;
    category: 'R' | 'I' | 'A' | 'S' | 'E' | 'C';
  }): Promise<Question> => {
    const response = await api.post('/questions', data);
    return response.data.question;
  },
  
  deleteQuestion: async (id: string): Promise<void> => {
    const token = localStorage.getItem("token");

    await api.delete(`/questions/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

};


export const testService = {
  submitTest: async (userId: string, answers: TestAnswer[]): Promise<{ message: string; result: TestResult }> => {
    const response = await api.post('/test/submit', { userId, answers });
    return response.data;
  },

  getResultById: async (resultId: string): Promise<TestResult> => {
    const response = await api.get(`/test/${resultId}`);
    return response.data;
}
};

export const careerService = {
  getCareersByCode: async (code: string): Promise<Career[]> => {
    const response = await api.get(`/careers/${code}`);
    return response.data;
  },
};

