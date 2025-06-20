import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../contexts/ThemeContext';

const OverviewScreen = () => {
  const { isDarkMode } = useTheme();

  const stats = [
    {
      title: 'Today\'s Orders',
      value: '156',
      icon: 'clipboard-list',
      color: '#2563EB',
    },
    {
      title: 'Total Revenue',
      value: '₹15,600',
      icon: 'currency-inr',
      color: '#059669',
    },
    {
      title: 'Active Users',
      value: '45',
      icon: 'account-group',
      color: '#7C3AED',
    },
    {
      title: 'Menu Items',
      value: '24',
      icon: 'food-variant',
      color: '#D97706',
    },
  ];

  const recentOrders = [
    {
      id: '1',
      user: 'John Doe',
      items: ['Breakfast Combo', 'Lunch Special'],
      amount: '₹250',
      status: 'completed',
      time: '10:30 AM',
    },
    {
      id: '2',
      user: 'Jane Smith',
      items: ['Dinner Plate'],
      amount: '₹150',
      status: 'pending',
      time: '11:45 AM',
    },
    {
      id: '3',
      user: 'Mike Johnson',
      items: ['Lunch Special', 'Extra Roti'],
      amount: '₹200',
      status: 'preparing',
      time: '12:15 PM',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 dark:text-green-400';
      case 'pending':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'preparing':
        return 'text-blue-600 dark:text-blue-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
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
        <View className="m-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <Text className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Mess Overview
          </Text>
          <Text className="text-base text-gray-600 dark:text-gray-300">
            Welcome back! Here's your mess summary
          </Text>
        </View>

        {/* Stats Grid */}
        <View className="mx-4 mb-4">
          <View className="flex-row flex-wrap justify-between">
            {stats.map((stat) => (
              <View
                key={stat.title}
                className="w-[48%] mb-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
              >
                <View
                  className="w-12 h-12 rounded-full items-center justify-center mb-3"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <Icon name={stat.icon} size={24} color={stat.color} />
                </View>
                <Text className="text-sm text-gray-500 dark:text-gray-400">
                  {stat.title}
                </Text>
                <Text className="text-xl font-bold text-gray-800 dark:text-white">
                  {stat.value}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Orders */}
        <View className="mx-4 mb-4">
          <Text className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
            Recent Orders
          </Text>
          {recentOrders.map((order) => (
            <View
              key={order.id}
              className="mb-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
            >
              <View className="flex-row justify-between items-start mb-2">
                <View>
                  <Text className="text-base font-medium text-gray-800 dark:text-white">
                    {order.user}
                  </Text>
                  <Text className="text-sm text-gray-500 dark:text-gray-400">
                    {order.time}
                  </Text>
                </View>
                <View className="items-end">
                  <Text className="text-lg font-bold text-gray-800 dark:text-white">
                    {order.amount}
                  </Text>
                  <Text className={getStatusColor(order.status)}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Text>
                </View>
              </View>
              <View className="flex-row flex-wrap">
                {order.items.map((item, index) => (
                  <Text
                    key={index}
                    className="text-sm text-gray-600 dark:text-gray-300 mr-2"
                  >
                    • {item}
                  </Text>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View className="mx-4 mb-4">
          <Text className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
            Quick Actions
          </Text>
          <View className="flex-row flex-wrap justify-between">
            <TouchableOpacity className="w-[48%] mb-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <View className="flex-row items-center">
                <Icon
                  name="food-variant"
                  size={24}
                  color={isDarkMode ? '#60A5FA' : '#2563EB'}
                  className="mr-3"
                />
                <Text className="text-base font-medium text-gray-800 dark:text-white">
                  Update Menu
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="w-[48%] mb-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <View className="flex-row items-center">
                <Icon
                  name="clipboard-list"
                  size={24}
                  color={isDarkMode ? '#60A5FA' : '#2563EB'}
                  className="mr-3"
                />
                <Text className="text-base font-medium text-gray-800 dark:text-white">
                  View Orders
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="w-[48%] mb-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <View className="flex-row items-center">
                <Icon
                  name="chart-bar"
                  size={24}
                  color={isDarkMode ? '#60A5FA' : '#2563EB'}
                  className="mr-3"
                />
                <Text className="text-base font-medium text-gray-800 dark:text-white">
                  View Reports
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="w-[48%] mb-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <View className="flex-row items-center">
                <Icon
                  name="account-group"
                  size={24}
                  color={isDarkMode ? '#60A5FA' : '#2563EB'}
                  className="mr-3"
                />
                <Text className="text-base font-medium text-gray-800 dark:text-white">
                  Manage Staff
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OverviewScreen; 