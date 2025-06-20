import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../contexts/ThemeContext';

interface MessSettings {
  name: string;
  address: string;
  phone: string;
  email: string;
  openingTime: string;
  closingTime: string;
  isOpen: boolean;
  autoAcceptOrders: boolean;
  allowPreOrders: boolean;
  maxPreOrderDays: number;
  minOrderAmount: string;
}

const SettingsScreen = () => {
  const { isDarkMode } = useTheme();
  const [settings, setSettings] = useState<MessSettings>({
    name: 'My Mess',
    address: '123 Main Street, City',
    phone: '+91 9876543210',
    email: 'mymess@example.com',
    openingTime: '07:00',
    closingTime: '22:00',
    isOpen: true,
    autoAcceptOrders: false,
    allowPreOrders: true,
    maxPreOrderDays: 7,
    minOrderAmount: '100',
  });

  const handleSaveSettings = () => {
    Alert.alert(
      'Save Settings',
      'Are you sure you want to save these changes?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Save',
          onPress: () => {
            // TODO: Implement save settings logic
          },
        },
      ]
    );
  };

  const handleToggleSwitch = (key: keyof MessSettings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleTextChange = (key: keyof MessSettings, value: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#111827' : '#F9FAFB'}
      />
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="m-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <Text className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Mess Settings
          </Text>
          <Text className="text-base text-gray-600 dark:text-gray-300">
            Manage your mess settings and preferences
          </Text>
        </View>

        {/* Basic Information */}
        <View className="mx-4 mb-4">
          <Text className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
            Basic Information
          </Text>
          <View className="space-y-4">
            <View>
              <Text className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Mess Name
              </Text>
              <TextInput
                value={settings.name}
                onChangeText={(value) => handleTextChange('name', value)}
                className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white"
                placeholder="Enter mess name"
                placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
              />
            </View>
            <View>
              <Text className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Address
              </Text>
              <TextInput
                value={settings.address}
                onChangeText={(value) => handleTextChange('address', value)}
                className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white"
                placeholder="Enter mess address"
                placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
                multiline
              />
            </View>
            <View>
              <Text className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Phone Number
              </Text>
              <TextInput
                value={settings.phone}
                onChangeText={(value) => handleTextChange('phone', value)}
                className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white"
                placeholder="Enter phone number"
                placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
                keyboardType="phone-pad"
              />
            </View>
            <View>
              <Text className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Email
              </Text>
              <TextInput
                value={settings.email}
                onChangeText={(value) => handleTextChange('email', value)}
                className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white"
                placeholder="Enter email address"
                placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
                keyboardType="email-address"
              />
            </View>
          </View>
        </View>

        {/* Operating Hours */}
        <View className="mx-4 mb-4">
          <Text className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
            Operating Hours
          </Text>
          <View className="space-y-4">
            <View className="flex-row space-x-4">
              <View className="flex-1">
                <Text className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Opening Time
                </Text>
                <TextInput
                  value={settings.openingTime}
                  onChangeText={(value) => handleTextChange('openingTime', value)}
                  className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white"
                  placeholder="HH:MM"
                  placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
                />
              </View>
              <View className="flex-1">
                <Text className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Closing Time
                </Text>
                <TextInput
                  value={settings.closingTime}
                  onChangeText={(value) => handleTextChange('closingTime', value)}
                  className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white"
                  placeholder="HH:MM"
                  placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
                />
              </View>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-800 dark:text-white">Mess is Open</Text>
              <Switch
                value={settings.isOpen}
                onValueChange={() => handleToggleSwitch('isOpen')}
                trackColor={{ false: '#D1D5DB', true: '#60A5FA' }}
                thumbColor={settings.isOpen ? '#2563EB' : '#9CA3AF'}
              />
            </View>
          </View>
        </View>

        {/* Order Settings */}
        <View className="mx-4 mb-4">
          <Text className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
            Order Settings
          </Text>
          <View className="space-y-4">
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-800 dark:text-white">
                Auto-Accept Orders
              </Text>
              <Switch
                value={settings.autoAcceptOrders}
                onValueChange={() => handleToggleSwitch('autoAcceptOrders')}
                trackColor={{ false: '#D1D5DB', true: '#60A5FA' }}
                thumbColor={settings.autoAcceptOrders ? '#2563EB' : '#9CA3AF'}
              />
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-800 dark:text-white">
                Allow Pre-Orders
              </Text>
              <Switch
                value={settings.allowPreOrders}
                onValueChange={() => handleToggleSwitch('allowPreOrders')}
                trackColor={{ false: '#D1D5DB', true: '#60A5FA' }}
                thumbColor={settings.allowPreOrders ? '#2563EB' : '#9CA3AF'}
              />
            </View>
            {settings.allowPreOrders && (
              <View>
                <Text className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Maximum Pre-Order Days
                </Text>
                <TextInput
                  value={settings.maxPreOrderDays.toString()}
                  onChangeText={(value) =>
                    handleTextChange('maxPreOrderDays', value)
                  }
                  className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white"
                  placeholder="Enter number of days"
                  placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
                  keyboardType="number-pad"
                />
              </View>
            )}
            <View>
              <Text className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Minimum Order Amount (₹)
              </Text>
              <TextInput
                value={settings.minOrderAmount}
                onChangeText={(value) => handleTextChange('minOrderAmount', value)}
                className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white"
                placeholder="Enter minimum amount"
                placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
                keyboardType="number-pad"
              />
            </View>
          </View>
        </View>

        {/* Save Button */}
        <View className="m-4">
          <TouchableOpacity
            onPress={handleSaveSettings}
            className="p-4 bg-blue-500 dark:bg-blue-600 rounded-xl shadow"
          >
            <Text className="text-white text-center font-bold text-lg">
              Save Settings
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen; 