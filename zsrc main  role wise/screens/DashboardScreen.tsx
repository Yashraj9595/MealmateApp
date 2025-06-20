import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  useColorScheme,
  Alert,
} from 'react-native';
import { useUser } from '../contexts/UserContext';
import { useLoading } from '../contexts/LoadingContext';
import { authService } from '../services/api';
import { useTheme } from '../contexts/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DashboardScreen = () => {
  const { isDarkMode } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const { user, logout } = useUser();
  const { setIsLoading } = useLoading();

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await authService.getProfile();
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to refresh data';
      Alert.alert('Error', message);
    } finally {
      setRefreshing(false);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await logout();
    } catch (error) {
      Alert.alert('Error', 'Failed to logout');
    } finally {
      setIsLoading(false);
    }
  };

  const stats = [
    {
      title: 'Wallet Balance',
      value: '₹1,500',
      icon: 'account-balance-wallet',
    },
    {
      title: 'Meals This Week',
      value: '12',
      icon: 'restaurant',
    },
    {
      title: 'Points Earned',
      value: '250',
      icon: 'stars',
    },
  ];

  const recentTransactions = [
    {
      id: '1',
      type: 'credit',
      amount: '₹500',
      description: 'Added to wallet',
      date: 'Today, 2:30 PM',
    },
    {
      id: '2',
      type: 'debit',
      amount: '₹150',
      description: 'Lunch at Mess',
      date: 'Today, 1:00 PM',
    },
    {
      id: '3',
      type: 'debit',
      amount: '₹100',
      description: 'Breakfast',
      date: 'Yesterday, 8:30 AM',
    },
  ];

  if (!user) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 dark:bg-slate-900">
        <Text className="text-slate-900 dark:text-white">Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-slate-900">
      <View className="bg-white dark:bg-slate-800 p-4 shadow-sm">
        <Text className="text-2xl font-bold text-slate-900 dark:text-white">
          Dashboard
        </Text>
      </View>

      <View className="p-4">
        {/* Stats Cards */}
        <View className="flex-row flex-wrap gap-4 mb-6">
          {stats.map((stat) => (
            <View
              key={stat.title}
              className="flex-1 min-w-[150px] bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm"
            >
              <Icon
                name={stat.icon}
                size={24}
                color={isDarkMode ? '#94A3B8' : '#64748B'}
                className="mb-2"
              />
              <Text className="text-sm text-slate-600 dark:text-slate-400">
                {stat.title}
              </Text>
              <Text className="text-xl font-bold text-slate-900 dark:text-white">
                {stat.value}
              </Text>
            </View>
          ))}
        </View>

        {/* Recent Transactions */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Recent Transactions
          </Text>
          {recentTransactions.map((transaction) => (
            <View
              key={transaction.id}
              className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm mb-3"
            >
              <View className="flex-row justify-between items-center">
                <View>
                  <Text className="text-slate-900 dark:text-white font-medium">
                    {transaction.description}
                  </Text>
                  <Text className="text-sm text-slate-600 dark:text-slate-400">
                    {transaction.date}
                  </Text>
                </View>
                <Text
                  className={`font-semibold ${
                    transaction.type === 'credit'
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {transaction.type === 'credit' ? '+' : '-'}
                  {transaction.amount}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View>
          <Text className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Quick Actions
          </Text>
          <View className="flex-row flex-wrap gap-4">
            <TouchableOpacity className="flex-1 min-w-[150px] bg-primary dark:bg-primary-dark p-4 rounded-lg items-center">
              <Icon name="add" size={24} color="#FFFFFF" className="mb-2" />
              <Text className="text-white font-semibold">Add Money</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 min-w-[150px] bg-white dark:bg-slate-800 p-4 rounded-lg items-center border border-slate-200 dark:border-slate-700">
              <Icon
                name="history"
                size={24}
                color={isDarkMode ? '#94A3B8' : '#64748B'}
                className="mb-2"
              />
              <Text className="text-slate-900 dark:text-white font-semibold">
                View History
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default DashboardScreen;
