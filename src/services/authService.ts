import axios from 'axios';
import { LoginCredentials, RegisterCredentials, ForgotPasswordData, ResetPasswordData, User } from '../types/auth';

const API_URL = 'YOUR_API_URL'; // Replace with your actual API URL

const authService = {
  async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  },

  async register(credentials: RegisterCredentials): Promise<{ user: User; token: string }> {
    const response = await axios.post(`${API_URL}/auth/register`, credentials);
    return response.data;
  },

  async createAdmin(credentials: RegisterCredentials): Promise<void> {
    await axios.post(`${API_URL}/auth/create-admin`, credentials);
  },

  async forgotPassword(data: ForgotPasswordData): Promise<void> {
    await axios.post(`${API_URL}/auth/forgot-password`, data);
  },

  async resetPassword(data: ResetPasswordData): Promise<void> {
    await axios.post(`${API_URL}/auth/reset-password`, data);
  },

  async verifyOTP(email: string, otp: string): Promise<boolean> {
    const response = await axios.post(`${API_URL}/auth/verify-otp`, { email, otp });
    return response.data.verified;
  },

  logout(): void {
    // Clear local storage, etc.
  }
};

export default authService; 