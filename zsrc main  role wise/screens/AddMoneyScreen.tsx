import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AddMoneyScreen = () => {
  const { isDarkMode } = useTheme();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const validateAmount = (value: string) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      return 'Please enter a valid amount';
    }
    if (numValue <= 0) {
      return 'Amount must be greater than 0';
    }
    if (numValue > 10000) {
      return 'Maximum amount is ₹10,000';
    }
    return null;
  };

  const handleAddMoney = async () => {
    const error = validateAmount(amount);
    if (error) {
      Alert.alert('Error', error);
      return;
    }

    try {
      setLoading(true);
      // TODO: Implement API call to add money
      await new Promise(resolve => setTimeout(() => resolve(undefined), 1000)); // Simulated API call
      Alert.alert('Success', 'Money added successfully!');
      setAmount('');
    } catch (error) {
      Alert.alert('Error', 'Failed to add money. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const quickAmounts = ['100', '500', '1000', '2000'];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-gray-50 dark:bg-gray-900"
    >
      <ScrollView className="flex-1">
        <View className="bg-white dark:bg-slate-800 p-4 shadow-sm">
          <Text className="text-2xl font-bold text-slate-900 dark:text-white">
            Add Money
          </Text>
        </View>

        <View className="p-4">
          <Text className="text-slate-600 dark:text-slate-400 mb-4">
            Enter the amount you want to add to your wallet
          </Text>

          <View className="mb-6">
            <Text className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Quick Amounts
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {quickAmounts.map((value) => (
                <TouchableOpacity
                  key={value}
                  className="bg-white dark:bg-slate-800 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700"
                  onPress={() => setAmount(value)}
                >
                  <Text className="text-slate-900 dark:text-white">₹{value}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View className="mb-6">
            <Text className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Custom Amount
            </Text>
            <View className="relative">
              <Text className="absolute left-4 top-3 text-slate-900 dark:text-white">
                ₹
              </Text>
              <TextInput
                className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-8 py-3 text-slate-900 dark:text-white"
                placeholder="Enter amount"
                placeholderTextColor={isDarkMode ? '#94A3B8' : '#64748B'}
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                maxLength={7}
              />
            </View>
          </View>

          <TouchableOpacity
            className="bg-primary dark:bg-primary-dark py-3 rounded-lg items-center"
            onPress={handleAddMoney}
            disabled={loading || !amount}
          >
            {loading ? (
              <Text className="text-white font-semibold">Processing...</Text>
            ) : (
              <Text className="text-white font-semibold">Add Money</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddMoneyScreen; 