import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { RootStackNavigationProp } from '../../navigation/types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../contexts/ThemeContext';

const AdminDashboardScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const { isDarkMode } = useTheme();

  // Dummy data for demonstration
  const stats = {
    totalUsers: 150,
    totalMessOwners: 12,
    activeMesses: 8,
    totalRevenue: 50000,
  };

  return (
    <ScrollView className="flex-1 bg-gray-100 dark:bg-gray-900">
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#111827' : '#F3F4F6'}
      />
      <View className="p-4">
        {/* Welcome Banner */}
        <View
          className="bg-blue-600 rounded-lg shadow-md p-6 mb-6 \
            flex-row items-center justify-between dark:bg-blue-800"
        >
          <View>
            <Text className="text-2xl font-bold text-white mb-1">Welcome, Admin!</Text>
            <Text className="text-blue-100 text-base">Manage your platform efficiently</Text>
          </View>
          <Image
            source={{ uri: 'https://ui-avatars.com/api/?name=Admin&background=DBEAFE&color=1D4ED8' }}
            className="w-16 h-16 rounded-full border-2 border-white"
          />
        </View>

        {/* Stats Grid */}
        <View className="flex-row flex-wrap justify-between mb-6">
          {Object.entries(stats).map(([key, value]) => (
            <View
              key={key}
              className="w-[48%] bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-4 \
                items-center justify-center"
            >
              <Text className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                {key === 'totalUsers'
                  ? 'Total Users'
                  : key === 'totalMessOwners'
                  ? 'Mess Owners'
                  : key === 'activeMesses'
                  ? 'Active Messes'
                  : 'Total Revenue'}
              </Text>
              <Text className="text-3xl font-extrabold text-gray-900 dark:text-white">
                {key === 'totalRevenue' ? `₹${value}` : value}
              </Text>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</Text>
        <View className="space-y-4 mb-6">
          <TouchableOpacity
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex-row items-center \
              justify-between"
            onPress={() => navigation.navigate('Users')}
          >
            <View className="flex-row items-center">
              <Icon name="account-group" size={24} color="#3B82F6" />
              <Text className="ml-4 text-lg text-gray-800 dark:text-white font-medium">
                Manage Users
              </Text>
            </View>
            <Icon name="arrow-right" size={20} color={isDarkMode ? '#9CA3AF' : '#6B7280'} />
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex-row items-center \
              justify-between"
            onPress={() => navigation.navigate('Messes')}
          >
            <View className="flex-row items-center">
              <Icon name="store" size={24} color="#3B82F6" />
              <Text className="ml-4 text-lg text-gray-800 dark:text-white font-medium">
                Manage Messes
              </Text>
            </View>
            <Icon name="arrow-right" size={20} color={isDarkMode ? '#9CA3AF' : '#6B7280'} />
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex-row items-center \
              justify-between"
            onPress={() => navigation.navigate('Reports')}
          >
            <View className="flex-row items-center">
              <Icon name="chart-bar" size={24} color="#3B82F6" />
              <Text className="ml-4 text-lg text-gray-800 dark:text-white font-medium">
                View Reports
              </Text>
            </View>
            <Icon name="arrow-right" size={20} color={isDarkMode ? '#9CA3AF' : '#6B7280'} />
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex-row items-center \
              justify-between"
            onPress={() => navigation.navigate('Settings')}
          >
            <View className="flex-row items-center">
              <Icon name="cog" size={24} color="#3B82F6" />
              <Text className="ml-4 text-lg text-gray-800 dark:text-white font-medium">
                Platform Settings
              </Text>
            </View>
            <Icon name="arrow-right" size={20} color={isDarkMode ? '#9CA3AF' : '#6B7280'} />
          </TouchableOpacity>
        </View>

        {/* Recent Activity */}
        <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Recent Activity
        </Text>
        <View className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <View className="space-y-4">
            <View className="flex-row items-center">
              <View
                className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-700 items-center justify-center"
              >
                <Icon name="account-plus" size={18} color="#10B981" />
              </View>
              <Text className="ml-3 text-gray-700 dark:text-gray-300 flex-1">
                New mess owner registered
              </Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400">2h ago</Text>
            </View>
            <View className="flex-row items-center">
              <View
                className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-700 items-center justify-center"
              >
                <Icon name="store-plus" size={18} color="#3B82F6" />
              </View>
              <Text className="ml-3 text-gray-700 dark:text-gray-300 flex-1">
                New mess added to platform
              </Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400">5h ago</Text>
            </View>
            <View className="flex-row items-center">
              <View
                className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-700 items-center justify-center"
              >
                <Icon name="alert-circle" size={18} color="#F59E0B" />
              </View>
              <Text className="ml-3 text-gray-700 dark:text-gray-300 flex-1">
                New support ticket received
              </Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400">1d ago</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AdminDashboardScreen; 