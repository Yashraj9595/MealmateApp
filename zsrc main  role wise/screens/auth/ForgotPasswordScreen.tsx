import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useUser } from '../../contexts/UserContext';
import { useLoading } from '../../contexts/LoadingContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const ForgotPasswordScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const { forgotPassword } = useUser();
  const { setIsLoading } = useLoading();

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }

    try {
      setIsLoading(true);
      await forgotPassword(email);
      Alert.alert(
        'Success',
        'Password reset instructions have been sent to your email',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ]
      );
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to send reset instructions');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          className="px-6 py-8"
        >
          <View className="flex-1 justify-center">
            <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Forgot Password
            </Text>

            <Text className="text-gray-600 dark:text-gray-400 mb-6">
              Enter your email address and we'll send you instructions to reset
              your password.
            </Text>

            <View className="space-y-4">
              <View>
                <Text className="text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </Text>
                <TextInput
                  className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white p-4 rounded-lg"
                  placeholder="Enter your email"
                  placeholderTextColor="#9CA3AF"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <TouchableOpacity
                onPress={handleForgotPassword}
                className="bg-blue-600 p-4 rounded-lg mt-6"
              >
                <Text className="text-white text-center font-semibold text-lg">
                  Send Reset Instructions
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.goBack()}
                className="mt-4"
              >
                <Text className="text-blue-600 dark:text-blue-400 text-center">
                  Back to Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen; 