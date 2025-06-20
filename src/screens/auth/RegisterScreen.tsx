import React, { useState, useCallback, memo } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import authService from '../../services/authService';
import { RegisterCredentials, UserRole } from '../../types/auth';
import { styled } from 'nativewind';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import Icon from 'react-native-vector-icons/MaterialIcons';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);

type RegisterScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Register'>;

const RoleCard = memo(({ role, isSelected, onPress }: { role: UserRole; isSelected: boolean; onPress: () => void }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'user':
        return 'person';
      case 'mess_owner':
        return 'restaurant';
      default:
        return 'person';
    }
  };

  const getRoleDescription = (role: UserRole) => {
    switch (role) {
      case 'user':
        return 'Access mess menus and place orders';
      case 'mess_owner':
        return 'Manage your mess and handle orders';
      default:
        return '';
    }
  };

  return (
    <StyledTouchableOpacity
      onPress={onPress}
      className={`p-4 rounded-xl border-2 mb-4 ${
        isSelected
          ? 'border-primary bg-primary/5 dark:bg-primary/10'
          : 'border-gray-200 dark:border-gray-700'
      }`}
    >
      <StyledView className="flex-row items-center">
        <StyledView
          className={`w-12 h-12 rounded-full items-center justify-center mr-4 ${
            isSelected ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          <Icon
            name={getRoleIcon(role)}
            size={24}
            color={isSelected ? '#fff' : isDarkMode ? '#9CA3AF' : '#4B5563'}
          />
        </StyledView>
        <StyledView className="flex-1">
          <StyledText
            className={`text-lg font-semibold ${
              isSelected
                ? 'text-primary dark:text-primary-dark'
                : 'text-gray-900 dark:text-white'
            }`}
          >
            {role.replace('_', ' ').toUpperCase()}
          </StyledText>
          <StyledText className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {getRoleDescription(role)}
          </StyledText>
        </StyledView>
        {isSelected && (
          <Icon
            name="check-circle"
            size={24}
            color={isDarkMode ? '#60A5FA' : '#3B82F6'}
          />
        )}
      </StyledView>
    </StyledTouchableOpacity>
  );
});

export const RegisterScreen = memo(() => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const [credentials, setCredentials] = useState<RegisterCredentials>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
  });
  const [errors, setErrors] = useState<Partial<RegisterCredentials>>({});
  const [isLoading, setIsLoading] = useState(false);
  const isDarkMode = useColorScheme() === 'dark';

  const validateForm = useCallback(() => {
    const newErrors: Partial<RegisterCredentials> = {};
    if (!credentials.fullName) {
      newErrors.fullName = 'Full name is required';
    }
    if (!credentials.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!credentials.password) {
      newErrors.password = 'Password is required';
    } else if (credentials.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!credentials.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (credentials.password !== credentials.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [credentials]);

  const handleRegister = useCallback(async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await authService.register(credentials);
      Alert.alert('Success', 'Registration successful! Please login.');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [credentials, validateForm, navigation]);

  const handleFullNameChange = useCallback((text: string) => {
    setCredentials(prev => ({ ...prev, fullName: text }));
  }, []);

  const handleEmailChange = useCallback((text: string) => {
    setCredentials(prev => ({ ...prev, email: text }));
  }, []);

  const handlePasswordChange = useCallback((text: string) => {
    setCredentials(prev => ({ ...prev, password: text }));
  }, []);

  const handleConfirmPasswordChange = useCallback((text: string) => {
    setCredentials(prev => ({ ...prev, confirmPassword: text }));
  }, []);

  const roles: UserRole[] = ['user', 'mess_owner'];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white dark:bg-gray-900"
    >
      <StyledScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="px-6 py-8"
      >
        <StyledView className="flex-1">
          {/* Header */}
          <StyledView className="items-center">
            <Icon name="person-add" size={64} color={isDarkMode ? '#fff' : '#000'} />
            <StyledText className="text-3xl font-bold text-gray-900 dark:text-white mt-4">
              Create Account
            </StyledText>
            <StyledText className="text-gray-600 dark:text-gray-400 text-center mt-2">
              Choose your role and fill in your details to get started
            </StyledText>
          </StyledView>

          {/* Role Selection */}
          <StyledView>
            <StyledText className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Select Your Role
            </StyledText>
            {roles.map((role) => (
              <RoleCard
                key={role}
                role={role}
                isSelected={credentials.role === role}
                onPress={() => setCredentials(prev => ({ ...prev, role }))}
              />
            ))}
          </StyledView>

          {/* Registration Form */}
          <StyledView className="mt-6">
            <Input
              label="Full Name"
              value={credentials.fullName}
              onChangeText={handleFullNameChange}
              error={errors.fullName}
              placeholder="Enter your full name"
            />

            <Input
              label="Email"
              value={credentials.email}
              onChangeText={handleEmailChange}
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
              placeholder="Enter your email"
            />

            <Input
              label="Password"
              value={credentials.password}
              onChangeText={handlePasswordChange}
              secureTextEntry
              error={errors.password}
              placeholder="Create a password"
            />

            <Input
              label="Confirm Password"
              value={credentials.confirmPassword}
              onChangeText={handleConfirmPasswordChange}
              secureTextEntry
              error={errors.confirmPassword}
              placeholder="Confirm your password"
            />

            <Button
              title={isLoading ? 'Creating Account...' : 'Create Account'}
              onPress={handleRegister}
              disabled={isLoading}
            />

            <StyledView className="flex-row justify-center mt-4">
              <StyledText className="text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
              </StyledText>
              <StyledTouchableOpacity onPress={() => navigation.navigate('Login')}>
                <StyledText className="text-primary dark:text-primary-dark font-semibold">
                  Sign in
                </StyledText>
              </StyledTouchableOpacity>
            </StyledView>
          </StyledView>
        </StyledView>
      </StyledScrollView>
    </KeyboardAvoidingView>
  );
}); 