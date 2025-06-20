import React, { useState, useCallback } from 'react';
import { View, Text, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { styled } from 'nativewind';
import { AdminTabParamList } from '../../navigation/MainNavigator';
import Icon from 'react-native-vector-icons/MaterialIcons';
import authService from '../../services/authService';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);

type AdminManagementScreenNavigationProp = BottomTabNavigationProp<AdminTabParamList, 'AdminManagement'>;

export const AdminManagementScreen = () => {
  const navigation = useNavigation<AdminManagementScreenNavigationProp>();
  const [newAdmin, setNewAdmin] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};
    if (!newAdmin.fullName) {
      newErrors.fullName = 'Full name is required';
    }
    if (!newAdmin.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(newAdmin.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!newAdmin.password) {
      newErrors.password = 'Password is required';
    } else if (newAdmin.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!newAdmin.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm password';
    } else if (newAdmin.password !== newAdmin.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [newAdmin]);

  const handleCreateAdmin = useCallback(async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await authService.createAdmin({
        ...newAdmin,
        role: 'project_admin',
      });
      Alert.alert('Success', 'New admin account created successfully!');
      setNewAdmin({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to create admin account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [newAdmin, validateForm]);

  return (
    <StyledScrollView className="flex-1 bg-white dark:bg-gray-900">
      <StyledView className="p-6">
        <StyledView className="items-center mb-8">
          <Icon name="admin-panel-settings" size={64} color="#3B82F6" />
          <StyledText className="text-2xl font-bold text-gray-900 dark:text-white mt-4">
            Create New Admin
          </StyledText>
          <StyledText className="text-gray-600 dark:text-gray-400 text-center mt-2">
            Create a new admin account to help manage the platform
          </StyledText>
        </StyledView>

        <StyledView className="space-y-4">
          <Input
            label="Full Name"
            value={newAdmin.fullName}
            onChangeText={(text) => setNewAdmin(prev => ({ ...prev, fullName: text }))}
            error={errors.fullName}
            placeholder="Enter admin's full name"
          />

          <Input
            label="Email"
            value={newAdmin.email}
            onChangeText={(text) => setNewAdmin(prev => ({ ...prev, email: text }))}
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
            placeholder="Enter admin's email"
          />

          <Input
            label="Password"
            value={newAdmin.password}
            onChangeText={(text) => setNewAdmin(prev => ({ ...prev, password: text }))}
            secureTextEntry
            error={errors.password}
            placeholder="Create a password"
          />

          <Input
            label="Confirm Password"
            value={newAdmin.confirmPassword}
            onChangeText={(text) => setNewAdmin(prev => ({ ...prev, confirmPassword: text }))}
            secureTextEntry
            error={errors.confirmPassword}
            placeholder="Confirm the password"
          />

          <Button
            title={isLoading ? 'Creating Admin...' : 'Create Admin Account'}
            onPress={handleCreateAdmin}
            disabled={isLoading}
          />
        </StyledView>
      </StyledView>
    </StyledScrollView>
  );
}; 