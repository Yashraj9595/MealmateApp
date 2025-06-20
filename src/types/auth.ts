export type UserRole = 'user' | 'mess_owner' | 'project_admin';

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  email: string;
  otp: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
} 

// Temporary test credentials
export const TEST_CREDENTIALS = {
  user: {
    email: 'user@test.com',
    password: 'password123',
    role: 'user' as UserRole,
  },
  mess_owner: {
    email: 'mess@test.com',
    password: 'password123',
    role: 'mess_owner' as UserRole,
  },
  project_admin: {
    email: 'admin@test.com',
    password: 'password123',
    role: 'project_admin' as UserRole,
  },
}; 