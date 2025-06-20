import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  useColorScheme,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useUser } from '../../contexts/UserContext';
import { useLoading } from '../../contexts/LoadingContext';
import type { RootStackParamList } from '../../navigation/types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '../../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const navigation = useNavigation<LoginScreenNavigationProp>();
  const isDarkMode = useColorScheme() === 'dark';
  const { login } = useUser();
  const { setIsLoading } = useLoading();

  const toggleShowPassword = () => setShowPassword(prev => !prev);
  const toggleRememberMe = () => setRememberMe(prev => !prev);

  const navigateToForgotPassword = useCallback(() => {
    navigation.navigate('ForgotPassword');
  }, [navigation]);

  const navigateToRegister = useCallback(() => {
    navigation.navigate('Register');
  }, [navigation]);

  const validateForm = useCallback(() => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) {
      newErrors.email = 'Email is required';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [email, password]);

  const handleEmailChange = useCallback((text: string) => {
    setEmail(text);
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: undefined }));
    }
  }, [errors.email]);

  const handlePasswordChange = useCallback((text: string) => {
    setPassword(text);
    if (errors.password) {
      setErrors(prev => ({ ...prev, password: undefined }));
    }
  }, [errors.password]);

  const handleLogin = useCallback(async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);
      await login(email, password);
      // After successful login, navigate to Dashboard
      // navigation.reset({
      //   index: 0,
      //   routes: [{ name: 'Dashboard' }],
      // });
    } catch (error: any) {
      let message = 'An error occurred during login';
      
      if (error.message === 'Network Error') {
        message = 'Unable to connect to the server. Please check your internet connection and try again.';
      } else if (error.response?.data?.message) {
        message = error.response.data.message;
      } else if (error.message) {
        message = error.message;
      }

      Alert.alert('Login Failed', message);
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [email, password, validateForm, setIsLoading, login, navigation]);

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 48 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="space-y-8">
            {/* Logo/Branding */}
            <View className="items-center">
              <Text className="text-4xl font-bold text-primary dark:text-primary-dark">
                MealMate
              </Text>
              <Text className="mt-2 text-base text-slate-600 dark:text-slate-400">
                Sign in to your account
              </Text>
            </View>

            {/* Login Form */}
            <View className="space-y-4">
              {/* Email Input */}
              <View>
                <Text className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Email
                </Text>
                <TextInput
                  className={`w-full px-4 py-3 bg-white dark:bg-slate-800 border rounded-lg text-slate-900 dark:text-white ${
                    errors.email ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
                  }`}
                  placeholder="Enter your email"
                  placeholderTextColor={isDarkMode ? '#94A3B8' : '#64748B'}
                  value={email}
                  onChangeText={handleEmailChange}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                />
                {errors.email && (
                  <Text className="text-red-500 text-sm mt-1">{errors.email}</Text>
                )}
              </View>

              {/* Password Input */}
              <View>
                <Text className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Password
                </Text>
                <View className="relative">
                  <TextInput
                    className={`w-full px-4 py-3 bg-white dark:bg-slate-800 border rounded-lg text-slate-900 dark:text-white pr-12 ${
                      errors.password ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
                    }`}
                    placeholder="Enter your password"
                    placeholderTextColor={isDarkMode ? '#94A3B8' : '#64748B'}
                    value={password}
                    onChangeText={handlePasswordChange}
                    secureTextEntry={!showPassword}
                    autoComplete="password"
                  />
                  <TouchableOpacity
                    className="absolute right-3 top-3"
                    onPress={toggleShowPassword}
                  >
                    <Icon
                      name={showPassword ? 'visibility-off' : 'visibility'}
                      size={24}
                      color={isDarkMode ? '#94A3B8' : '#64748B'}
                    />
                  </TouchableOpacity>
                </View>
                {errors.password && (
                  <Text className="text-red-500 text-sm mt-1">{errors.password}</Text>
                )}
              </View>

              {/* Remember Me & Forgot Password */}
              <View className="flex-row justify-between items-center">
                <TouchableOpacity
                  className="flex-row items-center"
                  onPress={toggleRememberMe}
                >
                  <View className={`w-5 h-5 border rounded mr-2 items-center justify-center ${
                    rememberMe ? 'bg-primary border-primary dark:bg-primary-dark dark:border-primary-dark' : 'border-slate-300 dark:border-slate-700'
                  }`}>
                    {rememberMe && (
                      <Icon name="check" size={16} color="#FFFFFF" />
                    )}
                  </View>
                  <Text className="text-sm text-slate-700 dark:text-slate-300">
                    Remember me
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={navigateToForgotPassword}>
                  <Text className="text-sm text-primary dark:text-primary-dark">
                    Forgot password?
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Login Button */}
              <TouchableOpacity
                className="w-full bg-primary dark:bg-primary-dark py-3 rounded-lg items-center mt-4"
                onPress={handleLogin}
              >
                <Text className="text-white font-semibold text-base">
                  Sign in
                </Text>
              </TouchableOpacity>

              {/* Register Link */}
              <View className="flex-row justify-center mt-6">
                <Text className="text-slate-600 dark:text-slate-400">
                  Don't have an account?{' '}
                </Text>
                <TouchableOpacity onPress={navigateToRegister}>
                  <Text className="text-primary dark:text-primary-dark font-semibold">
                    Sign up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen; 