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
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import authService from '../../services/authService';
import { styled } from 'nativewind';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TEST_CREDENTIALS, UserRole } from '../../types/auth';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);

type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList>;

export const LoginScreen = memo(() => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const isDarkMode = useColorScheme() === 'dark';

  const validateForm = useCallback(() => {
    if (!email) {
      setError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email format');
      return false;
    }
    if (!password) {
      setError('Password is required');
      return false;
    }
    setError('');
    return true;
  }, [email, password]);

  const handleLogin = useCallback(async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await authService.login({ email, password });
      // Navigate based on user role
      navigation.navigate('Main', { userRole: response.user.role });
    } catch (error) {
      Alert.alert('Error', 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  }, [email, password, validateForm, navigation]);

  const handleQuickAccess = useCallback((role: UserRole) => {
    const credentials = TEST_CREDENTIALS[role];
    setEmail(credentials.email);
    setPassword(credentials.password);
    // Simulate login
    navigation.navigate('Main', { userRole: role });
  }, [navigation]);

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
            <Icon name="login" size={64} color={isDarkMode ? '#fff' : '#000'} />
            <StyledText className="text-3xl font-bold text-gray-900 dark:text-white mt-4">
              Welcome Back
            </StyledText>
            <StyledText className="text-gray-600 dark:text-gray-400 text-center mt-2">
              Sign in to continue to your account
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

      <Input
        label="Password"
              value={password}
              onChangeText={setPassword}
        secureTextEntry
              error={error}
              placeholder="Enter your password"
            />

      <Button
              title={isLoading ? 'Signing in...' : 'Sign In'}
        onPress={handleLogin}
        disabled={isLoading}
      />

            <StyledTouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}
              className="items-center"
            >
              <StyledText className="text-primary dark:text-primary-dark">
                Forgot Password?
              </StyledText>
            </StyledTouchableOpacity>

            <StyledView className="flex-row justify-center mt-4">
              <StyledText className="text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
              </StyledText>
              <StyledTouchableOpacity onPress={() => navigation.navigate('Register')}>
                <StyledText className="text-primary dark:text-primary-dark font-semibold">
                  Sign up
                </StyledText>
              </StyledTouchableOpacity>
            </StyledView>

            {/* Temporary Quick Access Buttons */}
            <StyledView className="mt-8 space-y-2">
              <StyledText className="text-gray-600 dark:text-gray-400 text-center mb-2">
                Quick Access (Development Only)
              </StyledText>
              <Button
                title="Access as User"
                variant="secondary"
                onPress={() => handleQuickAccess('user')}
              />
              <Button
                title="Access as Mess Owner"
                variant="secondary"
                onPress={() => handleQuickAccess('mess_owner')}
              />
              <Button
                title="Access as Admin"
                variant="secondary"
                onPress={() => handleQuickAccess('project_admin')}
              />
            </StyledView>
          </StyledView>
        </StyledView>
      </StyledScrollView>
    </KeyboardAvoidingView>
  );
}); 