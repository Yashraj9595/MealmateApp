import axios, { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Types
interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'mess_owner' | 'admin';
  balance: number;
  address?: string;
  messDetails?: {
    id: string;
    description: string;
    location: string;
    rating: number;
  };
}

interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

const API_URL = Platform.select({
  android: 'http://10.0.2.2:5000/api',
  ios: 'http://localhost:5000/api',
  default: 'http://localhost:5000/api',
});

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Add request interceptor for authentication
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Handle token expiration
      await AsyncStorage.removeItem('token');
      // You might want to redirect to login here
    }
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>('/auth/login', { email, password });
      if (!response.data || !response.data.token) {
        throw new Error('Invalid response from server');
      }
      await AsyncStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  },

  register: async (userData: { name: string; email: string; password: string }): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>('/auth/register', userData);
      if (!response.data || !response.data.token) {
        throw new Error('Invalid response from server');
      }
      await AsyncStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  },

  forgotPassword: async (email: string): Promise<ApiResponse<void>> => {
    const response = await api.post<ApiResponse<void>>('/auth/forgot-password', { email });
    return response.data;
  },

  resetPassword: async (data: { email: string; otp: string; password: string }): Promise<ApiResponse<void>> => {
    const response = await api.post<ApiResponse<void>>('/auth/reset-password', data);
    return response.data;
  },

  verifyOTP: async (email: string, otp: string): Promise<ApiResponse<void>> => {
    const response = await api.post<ApiResponse<void>>('/auth/verify-otp', { email, otp });
    return response.data;
  },

  logout: async (): Promise<void> => {
    await AsyncStorage.removeItem('token');
  },

  getProfile: async (): Promise<ApiResponse<User>> => {
    const response = await api.get<ApiResponse<User>>('/auth/me');
    return response.data;
  },

  updateUser: async (userData: Partial<User>): Promise<ApiResponse<User>> => {
    const response = await api.put<ApiResponse<User>>('/auth/update', userData);
    return response.data;
  },
};

// Dashboard services
export const dashboardService = {
  getDashboardData: async () => {
    return api.get('/dashboard');
  },
};

// Money services
export const moneyService = {
  addMoney: async (amount: number) => {
    return api.post('/money/add', { amount });
  },

  getTransactions: async () => {
    return api.get('/money/transactions');
  },
};

// Mess services
export const messService = {
  getMessList: async () => {
    return api.get('/mess/list');
  },

  subscribeToMess: async (messId: string) => {
    return api.post('/mess/subscribe', { messId });
  },

  getMessMenu: async (messId: string) => {
    return api.get(`/mess/${messId}/menu`);
  },

  getMealPlans: async () => {
    return api.get('/mess/plans');
  },

  getAnnouncements: async (): Promise<ApiResponse<{ announcements: any[] }>> => {
    const response = await api.get<ApiResponse<{ announcements: any[] }>>('/mess/announcements');
    return response.data;
  },

  getFeedbacks: async (): Promise<ApiResponse<{ feedbacks: any[] }>> => {
    const response = await api.get<ApiResponse<{ feedbacks: any[] }>>('/mess/feedbacks');
    return response.data;
  },

  submitFeedback: async (data: { messId?: string; rating: number; content: string }): Promise<ApiResponse<void>> => {
    const response = await api.post<ApiResponse<void>>('/mess/feedback', data);
    return response.data;
  },
};

// Leave services
export const leaveService = {
  submitLeaveRequest: async (data: { startDate: string; endDate: string; reason: string; type: 'mess' | 'hostel' }) => {
    return api.post('/leave/request', data);
  },

  getLeaveRequests: async () => {
    return api.get('/leave/requests');
  },
};

export default api; 