import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../contexts/ThemeContext';

interface AnalyticsData {
  totalRevenue: string;
  totalOrders: number;
  averageOrderValue: string;
  popularItems: {
    name: string;
    orders: number;
    revenue: string;
  }[];
  dailyStats: {
    date: string;
    orders: number;
    revenue: string;
  }[];
  customerStats: {
    totalCustomers: number;
    newCustomers: number;
    returningCustomers: number;
  };
}

const AnalyticsScreen = () => {
  const { isDarkMode } = useTheme();
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week');

  const analyticsData: AnalyticsData = {
    totalRevenue: '₹45,000',
    totalOrders: 150,
    averageOrderValue: '₹300',
    popularItems: [
      { name: 'Breakfast Combo', orders: 45, revenue: '₹6,750' },
      { name: 'Lunch Special', orders: 38, revenue: '₹7,600' },
      { name: 'Dinner Plate', orders: 32, revenue: '₹8,000' },
    ],
    dailyStats: [
      { date: 'Mon', orders: 25, revenue: '₹7,500' },
      { date: 'Tue', orders: 30, revenue: '₹9,000' },
      { date: 'Wed', orders: 28, revenue: '₹8,400' },
      { date: 'Thu', orders: 32, revenue: '₹9,600' },
      { date: 'Fri', orders: 35, revenue: '₹10,500' },
    ],
    customerStats: {
      totalCustomers: 120,
      newCustomers: 15,
      returningCustomers: 105,
    },
  };

  const getTimeRangeColor = (range: typeof timeRange) => {
    return timeRange === range
      ? 'bg-blue-500 dark:bg-blue-600 border-blue-500 dark:border-blue-600'
      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700';
  };

  const getTimeRangeTextColor = (range: typeof timeRange) => {
    return timeRange === range
      ? 'text-white'
      : 'text-gray-700 dark:text-gray-300';
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
            Analytics
          </Text>
          <Text className="text-base text-gray-600 dark:text-gray-300">
            Track your mess performance
          </Text>
        </View>

        {/* Time Range Selector */}
        <View className="mx-4 mb-4">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {(['week', 'month', 'year'] as const).map((range) => (
              <TouchableOpacity
                key={range}
                onPress={() => setTimeRange(range)}
                className={`mr-2 px-4 py-2 rounded-full border ${getTimeRangeColor(
                  range
                )}`}
              >
                <Text
                  className={`text-sm font-medium ${getTimeRangeTextColor(
                    range
                  )}`}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Key Metrics */}
        <View className="mx-4 mb-4">
          <View className="grid grid-cols-2 gap-4">
            <View className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <Text className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Total Revenue
              </Text>
              <Text className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {analyticsData.totalRevenue}
              </Text>
            </View>
            <View className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <Text className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Total Orders
              </Text>
              <Text className="text-2xl font-bold text-green-600 dark:text-green-400">
                {analyticsData.totalOrders}
              </Text>
            </View>
            <View className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <Text className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Average Order Value
              </Text>
              <Text className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {analyticsData.averageOrderValue}
              </Text>
            </View>
            <View className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <Text className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Total Customers
              </Text>
              <Text className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {analyticsData.customerStats.totalCustomers}
              </Text>
            </View>
          </View>
        </View>

        {/* Popular Items */}
        <View className="mx-4 mb-4">
          <Text className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
            Popular Items
          </Text>
          <View className="space-y-3">
            {analyticsData.popularItems.map((item, index) => (
              <View
                key={index}
                className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
              >
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-lg font-semibold text-gray-800 dark:text-white">
                    {item.name}
                  </Text>
                  <Text className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {item.revenue}
                  </Text>
                </View>
                <Text className="text-sm text-gray-600 dark:text-gray-400">
                  {item.orders} orders
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Daily Stats */}
        <View className="mx-4 mb-4">
          <Text className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
            Daily Performance
          </Text>
          <View className="space-y-3">
            {analyticsData.dailyStats.map((stat, index) => (
              <View
                key={index}
                className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
              >
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-lg font-semibold text-gray-800 dark:text-white">
                    {stat.date}
                  </Text>
                  <Text className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {stat.revenue}
                  </Text>
                </View>
                <Text className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.orders} orders
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Customer Stats */}
        <View className="mx-4 mb-4">
          <Text className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
            Customer Insights
          </Text>
          <View className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <View className="flex-row justify-between items-center mb-4">
              <View>
                <Text className="text-sm text-gray-600 dark:text-gray-400">
                  New Customers
                </Text>
                <Text className="text-xl font-bold text-green-600 dark:text-green-400">
                  {analyticsData.customerStats.newCustomers}
                </Text>
              </View>
              <View>
                <Text className="text-sm text-gray-600 dark:text-gray-400">
                  Returning Customers
                </Text>
                <Text className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  {analyticsData.customerStats.returningCustomers}
                </Text>
              </View>
            </View>
            <View className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <View
                className="h-full bg-blue-500 dark:bg-blue-600"
                style={{
                  width: `${
                    (analyticsData.customerStats.returningCustomers /
                      analyticsData.customerStats.totalCustomers) *
                    100
                  }%`,
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AnalyticsScreen; 