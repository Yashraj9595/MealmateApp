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

type ResetPasswordScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'ResetPassword'>;

export const ResetPasswordScreen = memo(() => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});
  const navigation = useNavigation<ResetPasswordScreenNavigationProp>();
  const route = useRoute();
  const isDarkMode = useColorScheme() === 'dark';
  const [isLoading, setIsLoading] = useState(false);
  const { email, otp } = route.params as { email: string; otp: string };

  const validateForm = useCallback(() => {
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
  }, [password, confirmPassword]);

  const handleResetPassword = useCallback(async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await authService.resetPassword({ email, otp, password });
      Alert.alert(
        'Success',
        'Your password has been reset successfully',
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [email, otp, password, validateForm, navigation]);

  const toggleShowPassword = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  if (!email || !otp) {
    return (
      <StyledView className="flex-1 items-center justify-center bg-white dark:bg-gray-900">
        <Icon name="error-outline" size={64} color={isDarkMode ? '#fff' : '#000'} />
        <StyledText className="text-gray-900 dark:text-white text-lg mt-4">
          Invalid reset link
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
            <Icon name="lock-reset" size={64} color={isDarkMode ? '#fff' : '#000'} />
            <StyledText className="text-3xl font-bold text-gray-900 dark:text-white mt-4">
              Reset Password
            </StyledText>
            <StyledText className="text-gray-600 dark:text-gray-400 text-center mt-2">
              Enter your new password below
            </StyledText>
          </StyledView>

          {/* Form */}
          <StyledView className="space-y-4">
      <Input
        label="New Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              error={errors.password}
              placeholder="Enter new password"
              rightIcon={
                <TouchableOpacity onPress={toggleShowPassword}>
                  <Icon
                    name={showPassword ? 'visibility-off' : 'visibility'}
                    size={24}
                    color={isDarkMode ? '#9CA3AF' : '#6B7280'}
                  />
                </TouchableOpacity>
              }
      />

      <Input
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showPassword}
        error={errors.confirmPassword}
              placeholder="Confirm new password"
      />

      <Button
              title={isLoading ? 'Resetting Password...' : 'Reset Password'}
        onPress={handleResetPassword}
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