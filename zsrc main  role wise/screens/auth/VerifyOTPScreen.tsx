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
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { VerifyOTPScreenProps, RootStackParamList } from '../../navigation/types';
import { authService } from '../../services/api';
import { useLoading } from '../../contexts/LoadingContext';
import { RootStackNavigationProp } from '../../navigation/types';

const VerifyOTPScreen = () => {
  const [otp, setOtp] = useState('');
  const [errors, setErrors] = useState<{ otp?: string }>({});
  const navigation = useNavigation<RootStackNavigationProp>();
  const route = useRoute<RouteProp<RootStackParamList, 'VerifyOTP'>>();
  const isDarkMode = useColorScheme() === 'dark';
  const { setIsLoading } = useLoading();
  const email = route.params.email;
  const isResetPassword = route.params.isResetPassword || false;

  const validateForm = () => {
    const newErrors: { otp?: string } = {};
    let isValid = true;

    if (!otp) {
      newErrors.otp = 'OTP is required';
      isValid = false;
    } else if (otp.length !== 6) {
      newErrors.otp = 'OTP must be 6 digits';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleVerifyOTP = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);
      await authService.verifyOTP(email, otp);
      
      if (isResetPassword) {
        navigation.navigate('ResetPassword', { email, otp });
      } else {
        navigation.navigate('Login');
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to verify OTP';
      Alert.alert('Error', message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!email) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 dark:bg-slate-900">
        <Text className="text-slate-900 dark:text-white">Invalid verification link</Text>
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
              Verify OTP
            </Text>
            <Text className="mt-2 text-base text-slate-600 dark:text-slate-400 text-center">
              Enter the 6-digit code sent to your email
            </Text>
          </View>

          {/* Form */}
          <View className="space-y-4">
            {/* OTP Input */}
            <View>
              <Text className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                OTP Code
              </Text>
              <TextInput
                className={`w-full px-4 py-3 bg-white dark:bg-slate-800 border rounded-lg text-slate-900 dark:text-white ${
                  errors.otp 
                    ? 'border-red-500' 
                    : 'border-slate-200 dark:border-slate-700'
                }`}
                placeholder="Enter 6-digit code"
                placeholderTextColor={isDarkMode ? '#94A3B8' : '#64748B'}
                value={otp}
                onChangeText={(text) => {
                  setOtp(text);
                  setErrors({ ...errors, otp: undefined });
                }}
                keyboardType="number-pad"
                maxLength={6}
              />
              {errors.otp && (
                <Text className="text-red-500 text-sm mt-1">{errors.otp}</Text>
              )}
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              className="w-full bg-primary dark:bg-primary-dark py-3 rounded-lg items-center mt-4"
              onPress={handleVerifyOTP}
            >
              <Text className="text-white font-semibold text-base">
                Verify OTP
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

export default VerifyOTPScreen; 