import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  useColorScheme,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { authService } from '../../services/api';
import { useLoading } from '../../contexts/LoadingContext';
import type { RootStackParamList } from '../../navigation/types';

type ResetPasswordScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ResetPassword'>;

const ResetPasswordScreen = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});
  const navigation = useNavigation<ResetPasswordScreenNavigationProp>();
  const route = useRoute();
  const isDarkMode = useColorScheme() === 'dark';
  const { setIsLoading } = useLoading();
  const token = (route.params as any)?.token;

  const validateForm = () => {
    const newErrors: { password?: string; confirmPassword?: string } = {};
    let isValid = true;

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleResetPassword = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);
      await authService.resetPassword({ email: '', otp: token, password });
      Alert.alert(
        'Success',
        'Your password has been reset successfully',
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
      );
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to reset password';
      Alert.alert('Error', message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 dark:bg-slate-900">
        <Text className="text-slate-900 dark:text-white">Invalid reset link</Text>
        <TouchableOpacity
          className="mt-4"
          onPress={() => navigation.navigate('Login')}
        >
          <Text className="text-primary dark:text-primary-dark">Back to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-gray-50 dark:bg-slate-900"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 48 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="space-y-8">
          {/* Header */}
          <View className="items-center">
            <Text className="text-4xl font-bold text-primary dark:text-primary-dark">
              Reset Password
            </Text>
            <Text className="mt-2 text-base text-slate-600 dark:text-slate-400 text-center">
              Enter your new password
            </Text>
          </View>

          {/* Form */}
          <View className="space-y-4">
            {/* New Password Input */}
            <View>
              <Text className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                New Password
              </Text>
              <View className="relative">
                <TextInput
                  className={`w-full px-4 py-3 bg-white dark:bg-slate-800 border rounded-lg text-slate-900 dark:text-white pr-12 ${
                    errors.password 
                      ? 'border-red-500' 
                      : 'border-slate-200 dark:border-slate-700'
                  }`}
                  placeholder="Enter new password"
                  placeholderTextColor={isDarkMode ? '#94A3B8' : '#64748B'}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    setErrors({ ...errors, password: undefined });
                  }}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  className="absolute right-3 top-3"
                  onPress={() => setShowPassword(!showPassword)}
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

            {/* Confirm Password Input */}
            <View>
              <Text className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Confirm Password
              </Text>
              <View className="relative">
                <TextInput
                  className={`w-full px-4 py-3 bg-white dark:bg-slate-800 border rounded-lg text-slate-900 dark:text-white pr-12 ${
                    errors.confirmPassword 
                      ? 'border-red-500' 
                      : 'border-slate-200 dark:border-slate-700'
                  }`}
                  placeholder="Confirm new password"
                  placeholderTextColor={isDarkMode ? '#94A3B8' : '#64748B'}
                  value={confirmPassword}
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                    setErrors({ ...errors, confirmPassword: undefined });
                  }}
                  secureTextEntry={!showPassword}
                />
              </View>
              {errors.confirmPassword && (
                <Text className="text-red-500 text-sm mt-1">{errors.confirmPassword}</Text>
              )}
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              className="w-full bg-primary dark:bg-primary-dark py-3 rounded-lg items-center mt-4"
              onPress={handleResetPassword}
            >
              <Text className="text-white font-semibold text-base">
                Reset Password
              </Text>
            </TouchableOpacity>

            {/* Back to Login */}
            <TouchableOpacity
              className="items-center mt-4"
              onPress={() => navigation.navigate('Login')}
            >
              <Text className="text-primary dark:text-primary-dark">
                Back to Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ResetPasswordScreen; 