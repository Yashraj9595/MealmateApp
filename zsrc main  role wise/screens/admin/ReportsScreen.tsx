import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ReportsScreen = () => {
  const { isDarkMode } = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  // Mock data - replace with actual API call
  const stats = {
    totalUsers: 1250,
    activeUsers: 980,
    totalMesses: 45,
    activeMesses: 38,
    totalOrders: 5678,
    totalRevenue: 567800,
    averageRating: 4.3,
  };

  const periods = [
    { id: 'day', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'year', label: 'This Year' },
  ];

  const recentActivities = [
    {
      id: '1',
      type: 'new_user',
      description: 'New user registered',
      timestamp: '2 hours ago',
    },
    {
      id: '2',
      type: 'new_mess',
      description: 'New mess registered',
      timestamp: '5 hours ago',
    },
    {
      id: '3',
      type: 'order',
      description: 'New order placed',
      timestamp: '1 day ago',
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'new_user':
        return 'account-plus';
      case 'new_mess':
        return 'store-plus';
      case 'order':
        return 'cart-plus';
      default:
        return 'information';
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#111827' : '#F9FAFB'}
      />
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="p-4 bg-white dark:bg-gray-800">
          <Text className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            System Reports
          </Text>

          {/* Period Selector */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-4"
          >
            {periods.map((period) => (
              <TouchableOpacity
                key={period.id}
                onPress={() => setSelectedPeriod(period.id)}
                className={`mr-2 px-4 py-2 rounded-full ${
                  selectedPeriod === period.id
                    ? 'bg-blue-500 dark:bg-blue-600'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <Text
                  className={`${
                    selectedPeriod === period.id
                      ? 'text-white'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {period.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Stats Grid */}
        <View className="p-4">
          <View className="flex-row flex-wrap justify-between">
            <View className="w-[48%] p-4 rounded-lg mb-4 bg-white dark:bg-gray-800">
              <Text className="text-sm text-gray-600 dark:text-gray-400">
                Total Users
              </Text>
              <Text className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
                {stats.totalUsers}
              </Text>
              <Text className="text-sm mt-1 text-gray-600 dark:text-gray-400">
                {stats.activeUsers} active
              </Text>
            </View>

            <View className="w-[48%] p-4 rounded-lg mb-4 bg-white dark:bg-gray-800">
              <Text className="text-sm text-gray-600 dark:text-gray-400">
                Total Messes
              </Text>
              <Text className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
                {stats.totalMesses}
              </Text>
              <Text className="text-sm mt-1 text-gray-600 dark:text-gray-400">
                {stats.activeMesses} active
              </Text>
            </View>

            <View className="w-[48%] p-4 rounded-lg mb-4 bg-white dark:bg-gray-800">
              <Text className="text-sm text-gray-600 dark:text-gray-400">
                Total Orders
              </Text>
              <Text className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
                {stats.totalOrders}
              </Text>
              <Text className="text-sm mt-1 text-gray-600 dark:text-gray-400">
                ₹{stats.totalRevenue.toLocaleString()}
              </Text>
            </View>

            <View className="w-[48%] p-4 rounded-lg mb-4 bg-white dark:bg-gray-800">
              <Text className="text-sm text-gray-600 dark:text-gray-400">
                Average Rating
              </Text>
              <Text className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
                {stats.averageRating}
              </Text>
              <View className="flex-row mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Icon
                    key={star}
                    name={star <= Math.floor(stats.averageRating) ? 'star' : 'star-outline'}
                    size={16}
                    color="#F59E0B"
                  />
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Recent Activities */}
        <View className="p-4">
          <Text className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Recent Activities
          </Text>
          {recentActivities.map((activity) => (
            <View
              key={activity.id}
              className="flex-row items-center p-4 rounded-lg mb-4 bg-white dark:bg-gray-800"
            >
              <View className="w-10 h-10 rounded-full items-center justify-center mr-4 bg-gray-100 dark:bg-gray-700">
                <Icon
                  name={getActivityIcon(activity.type)}
                  size={20}
                  color={isDarkMode ? '#9CA3AF' : '#6B7280'}
                />
              </View>
              <View className="flex-1">
                <Text className="text-gray-900 dark:text-white">
                  {activity.description}
                </Text>
                <Text className="text-sm mt-1 text-gray-600 dark:text-gray-400">
                  {activity.timestamp}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReportsScreen; 