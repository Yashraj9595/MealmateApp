import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps, NativeStackNavigationProp } from '@react-navigation/native-stack';

// Define user roles
export type UserRole = 'user' | 'mess_owner' | 'admin';

// Define the parameter list for the main app stack and authentication stack
export type RootStackParamList = {
  // Auth Stack
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  ResetPassword: undefined;
  VerifyOTP: undefined;

  // Main Stack
  Home: undefined;
  Menu: undefined;
  Cart: undefined;
  Profile: undefined;
  Settings: undefined;

  // Dashboard Stack
  Dashboard: NavigatorScreenParams<DashboardStackParamList>;
  Bills: undefined;
  Booking: undefined;
  Leave: undefined;
  MessHub: undefined;
  Plan: undefined;

  // Admin Stack
  AdminDashboard: NavigatorScreenParams<AdminStackParamList>;
  Users: undefined;
  Messes: undefined;
  Reports: undefined;
  AdminSettings: undefined;

  // Mess Owner Stack
  MessOwnerDashboard: NavigatorScreenParams<MessOwnerStackParamList>;
  MenuManagement: undefined;
  Orders: undefined;
  Analytics: undefined;
  MessOwnerSettings: undefined;
};

export type DashboardStackParamList = {
  Home: undefined;
  Bills: undefined;
  Booking: undefined;
  Leave: undefined;
  MessHub: undefined;
  Plan: undefined;
};

export type AdminStackParamList = {
  Dashboard: undefined;
  Users: undefined;
  Messes: undefined;
  Reports: undefined;
  Settings: undefined;
};

export type MessOwnerStackParamList = {
  Dashboard: undefined;
  MenuManagement: undefined;
  Orders: undefined;
  Analytics: undefined;
  Settings: undefined;
};

// Define screen props for specific screens
export type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
export type RegisterScreenProps = NativeStackScreenProps<RootStackParamList, 'Register'>;
export type ForgotPasswordScreenProps = NativeStackScreenProps<RootStackParamList, 'ForgotPassword'>;
export type ResetPasswordScreenProps = NativeStackScreenProps<RootStackParamList, 'ResetPassword'>;
export type VerifyOTPScreenProps = NativeStackScreenProps<RootStackParamList, 'VerifyOTP'>;
export type DashboardScreenProps = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;
export type MessOwnerDashboardScreenProps = NativeStackScreenProps<RootStackParamList, 'MessOwnerDashboard'>;
export type AdminDashboardScreenProps = NativeStackScreenProps<RootStackParamList, 'AdminDashboard'>;

// Define navigation prop types
export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Define screen props types
export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;
export type DashboardStackScreenProps<T extends keyof DashboardStackParamList> = NativeStackScreenProps<DashboardStackParamList, T>;
export type AdminStackScreenProps<T extends keyof AdminStackParamList> = NativeStackScreenProps<AdminStackParamList, T>;
export type MessOwnerStackScreenProps<T extends keyof MessOwnerStackParamList> = NativeStackScreenProps<MessOwnerStackParamList, T>; 