import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api, { authService } from '../services/api';
import { LoadingContext } from './LoadingContext';
import { RouteProp } from '@react-navigation/native';

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

interface UserContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: { name: string; email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  verifyOTP: (email: string, otp: string) => Promise<void>;
  resetPassword: (email: string, otp: string, password: string) => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const loadingContext = useContext(LoadingContext);
  const setIsLoading = loadingContext?.setIsLoading ?? (() => {});

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setLoading(true);
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        console.log('Attempting to fetch profile with token:', storedToken.substring(0, 10) + '...');
        const response = await authService.getProfile();
        if (response?.success && response?.data) {
          setUser(response.data);
        } else {
          console.warn('Profile response:', response);
          throw new Error(response?.message || 'Invalid profile response');
        }
      } else {
        setUser(null);
        setToken(null);
        delete api.defaults.headers.common['Authorization'];
      }
    } catch (err: any) {
      console.error('Authentication check failed:', {
        error: err,
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        config: {
          url: err.config?.url,
          baseURL: err.config?.baseURL,
          headers: err.config?.headers
        }
      });
      setUser(null);
      setToken(null);
      delete api.defaults.headers.common['Authorization'];
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.login(email, password);
      if (!response || !response.token || !response.user) {
        throw new Error('Invalid response from server');
      }

      await AsyncStorage.setItem('token', response.token);
      await AsyncStorage.setItem('user', JSON.stringify(response.user));
      setToken(response.token);
      setUser(response.user);
      api.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Login failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: { name: string; email: string; password: string }) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.register(userData);
      if (!response || !response.token || !response.user) {
        throw new Error('Invalid response from server');
      }

      await AsyncStorage.setItem('token', response.token);
      await AsyncStorage.setItem('user', JSON.stringify(response.user));
      setToken(response.token);
      setUser(response.user);
      api.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;
    } catch (err: any) {
      setError(err.message || 'Registration failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      setUser(null);
      setToken(null);
      delete api.defaults.headers.common['Authorization'];
    } catch (err: any) {
      setError(err.message || 'Logout failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.forgotPassword(email);
    } catch (err: any) {
      setError(err.message || 'Forgot password request failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async (email: string, otp: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.verifyOTP(email, otp);
    } catch (err: any) {
      setError(err.message || 'OTP verification failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string, otp: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.resetPassword({ email, otp, password });
    } catch (err: any) {
      setError(err.message || 'Password reset failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (userData: Partial<User>) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.updateUser(userData);
      if (response && response.data) {
        setUser(response.data);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err: any) {
      setError(err.message || 'User update failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        login,
        register,
        logout,
        checkAuth,
        forgotPassword,
        verifyOTP,
        resetPassword,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 