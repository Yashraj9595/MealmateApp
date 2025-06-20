import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';
import { useUser } from '../contexts/UserContext';
import type { RootStackParamList } from './types';

// Import auth screens
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import VerifyOTPScreen from '../screens/auth/VerifyOTPScreen';
import ResetPasswordScreen from '../screens/auth/ResetPasswordScreen';

// Import user screens
import UserDashboardScreen from '../screens/user/UserDashboardScreen';

// Import mess owner screens
import MessOwnerDashboardScreen from '../screens/mess-owner/MessOwnerDashboardScreen';

// Import admin screens
import AdminDashboardScreen from '../screens/admin/AdminDashboardScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { isDarkMode } = useTheme();
  const { user, loading } = useUser();

  if (loading) {
    return null; // Or a loading screen
  }

  return (
    <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
          contentStyle: {
            backgroundColor: isDarkMode ? '#111827' : '#F9FAFB',
          },
      }}
    >
      {!user ? (
          // Auth Stack
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
            />
          <Stack.Screen name="VerifyOTP" component={VerifyOTPScreen} />
            <Stack.Screen
              name="ResetPassword"
              component={ResetPasswordScreen}
            />
        </>
      ) : (
          // Role-based Stacks
          <>
            {user.role === 'user' && (
              <Stack.Screen
                name="UserDashboard"
                component={UserDashboardScreen}
              />
            )}
            {user.role === 'mess_owner' && (
              <Stack.Screen
                name="MessOwnerDashboard"
                component={MessOwnerDashboardScreen}
              />
            )}
            {user.role === 'admin' && (
              <Stack.Screen
                name="AdminDashboard"
                component={AdminDashboardScreen}
              />
            )}
        </>
      )}
    </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;