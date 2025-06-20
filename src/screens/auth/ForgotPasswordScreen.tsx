import React, { useState, useCallback, memo } from 'react';
import { View, Text, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import authService from '../../services/authService';
import { styled } from 'nativewind';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useColorScheme } from 'react-native';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);

type ForgotPasswordScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'ForgotPassword'>;

export const ForgotPasswordScreen = memo(() => {
  const navigation = useNavigation<ForgotPasswordScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const isDarkMode = useColorScheme() === 'dark';

  const validateEmail = useCallback(() => {
    if (!email) {
      setError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email format');
      return false;
    }
    setError('');
    return true;
  }, [email]);

  const handleSendOTP = useCallback(async () => {
    if (!validateEmail()) return;

    setIsLoading(true);
    try {
      await authService.forgotPassword({ email });
      Alert.alert(
        'Success',
        'OTP has been sent to your email. Please check your inbox.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('VerifyOTP', { email, isResetPassword: true }),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [email, validateEmail, navigation]);

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
            <Icon name="lock-reset" size={64} color={isDarkMode ? '#fff' : '#000'} />
            <StyledText className="text-3xl font-bold text-gray-900 dark:text-white mt-4">
              Forgot Password
            </StyledText>
            <StyledText className="text-gray-600 dark:text-gray-400 text-center mt-2">
        Enter your email address and we'll send you a code to reset your password.
            </StyledText>
          </StyledView>

          {/* Form */}
          <StyledView className="space-y-4">
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        error={error}
              placeholder="Enter your email"
      />

      <Button
              title={isLoading ? 'Sending...' : 'Send Reset Code'}
        onPress={handleSendOTP}
        disabled={isLoading}
      />

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