import React, { useState, useCallback, memo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  useColorScheme,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import authService from '../../services/authService';
import { styled } from 'nativewind';
import { AuthStackParamList } from '../../navigation/AuthNavigator';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);

type VerifyOTPScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'VerifyOTP'>;

export const VerifyOTPScreen = memo(() => {
  const [otp, setOtp] = useState('');
  const [errors, setErrors] = useState<{ otp?: string }>({});
  const navigation = useNavigation<VerifyOTPScreenNavigationProp>();
  const route = useRoute();
  const isDarkMode = useColorScheme() === 'dark';
  const [isLoading, setIsLoading] = useState(false);
  const { email, isResetPassword } = route.params as { email: string; isResetPassword?: boolean };

  const validateForm = useCallback(() => {
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
  }, [otp]);

  const handleVerifyOTP = useCallback(async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await authService.verifyOTP(email, otp);
      
      if (isResetPassword) {
        navigation.navigate('ResetPassword', { email, otp });
      } else {
        navigation.navigate('Login');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to verify OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [email, otp, isResetPassword, validateForm, navigation]);

  const handleResendOTP = useCallback(async () => {
    try {
      setIsLoading(true);
      await authService.forgotPassword({ email });
      Alert.alert('Success', 'A new OTP has been sent to your email.');
    } catch (error) {
      Alert.alert('Error', 'Failed to resend OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [email]);

  if (!email) {
    return (
      <StyledView className="flex-1 items-center justify-center bg-white dark:bg-gray-900">
        <Icon name="error-outline" size={64} color={isDarkMode ? '#fff' : '#000'} />
        <StyledText className="text-gray-900 dark:text-white text-lg mt-4">
          Invalid verification link
        </StyledText>
        <Button
          title="Back to Login"
          variant="secondary"
          onPress={() => navigation.navigate('Login')}
        />
      </StyledView>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white dark:bg-gray-900"
    >
      <StyledScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        className="px-6 py-8"
      >
        <StyledView className="space-y-8">
          {/* Header */}
          <StyledView className="items-center">
            <Icon name="verified-user" size={64} color={isDarkMode ? '#fff' : '#000'} />
            <StyledText className="text-3xl font-bold text-gray-900 dark:text-white mt-4">
              Verify OTP
            </StyledText>
            <StyledText className="text-gray-600 dark:text-gray-400 text-center mt-2">
              Enter the 6-digit code sent to your email
            </StyledText>
          </StyledView>

          {/* Form */}
          <StyledView className="space-y-4">
            <Input
              label="OTP Code"
              value={otp}
              onChangeText={setOtp}
              keyboardType="number-pad"
              maxLength={6}
              error={errors.otp}
              placeholder="Enter 6-digit code"
            />

            <Button
              title={isLoading ? 'Verifying...' : 'Verify OTP'}
              onPress={handleVerifyOTP}
              disabled={isLoading}
            />

            <StyledTouchableOpacity
              onPress={handleResendOTP}
              disabled={isLoading}
              className="items-center"
            >
              <StyledText className="text-primary dark:text-primary-dark">
                Didn't receive the code? Resend
              </StyledText>
            </StyledTouchableOpacity>

            <Button
              title="Back to Login"
              variant="secondary"
              onPress={() => navigation.navigate('Login')}
            />
          </StyledView>
        </StyledView>
      </StyledScrollView>
    </KeyboardAvoidingView>
  );
}); 