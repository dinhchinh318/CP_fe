export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface Question {
  _id: string;
  content: string;
  category: 'R' | 'I' | 'A' | 'S' | 'E' | 'C';
}

export interface Career {
  _id: string;
  name: string;
  code: string;
  description?: string;
  skills?: string[];
}

export interface TestAnswer {
  questionId: string;
  score: number;
}

export interface TestResult {
  _id: string;
  userId: string;
  riasecCode: string;
  details: {
    R: number;
    I: number;
    A: number;
    S: number;
    E: number;
    C: number;
  };
  createdAt: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

