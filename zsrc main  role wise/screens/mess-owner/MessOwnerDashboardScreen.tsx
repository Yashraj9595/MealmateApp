import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { RootStackNavigationProp } from '../../navigation/types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MessOwnerDashboardScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [stats] = useState({
    totalCustomers: 150,
    activeBookings: 45,
    todayRevenue: 8500,
    pendingOrders: 12
  });

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      <ScrollView className="flex-1">
        <View className="p-4">
          {/* Welcome Banner */}
          <View className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-md p-6 mb-4">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-xl font-semibold text-white mb-2">Welcome, Mess Owner!</Text>
                <Text className="text-blue-100 text-sm">Manage your mess operations</Text>
              </View>
              <Image
                source={{ uri: 'https://ui-avatars.com/api/?name=Mess+Owner&background=0D8ABC&color=fff' }}
                className="w-12 h-12 rounded-full border-2 border-white"
              />
            </View>
          </View>

          {/* Stats Grid */}
          <View className="grid grid-cols-2 gap-4 mb-6">
            <View className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <Text className="text-sm text-gray-500 dark:text-gray-400">Total Customers</Text>
              <Text className="text-2xl font-bold text-gray-800 dark:text-white">{stats.totalCustomers}</Text>
            </View>
            <View className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <Text className="text-sm text-gray-500 dark:text-gray-400">Active Bookings</Text>
              <Text className="text-2xl font-bold text-gray-800 dark:text-white">{stats.activeBookings}</Text>
            </View>
            <View className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <Text className="text-sm text-gray-500 dark:text-gray-400">Today's Revenue</Text>
              <Text className="text-2xl font-bold text-gray-800 dark:text-white">₹{stats.todayRevenue}</Text>
            </View>
            <View className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <Text className="text-sm text-gray-500 dark:text-gray-400">Pending Orders</Text>
              <Text className="text-2xl font-bold text-gray-800 dark:text-white">{stats.pendingOrders}</Text>
            </View>
          </View>

          {/* Quick Actions */}
          <View className="space-y-4">
            <TouchableOpacity
              className="bg-white dark:bg-gray-800 p-4 rounded-lg flex-row items-center"
              onPress={() => navigation.navigate('MenuManagement')}
            >
              <Icon name="food" size={24} color="#2563EB" />
              <Text className="ml-4 text-gray-900 dark:text-white font-medium">
                Manage Menu
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-white dark:bg-gray-800 p-4 rounded-lg flex-row items-center"
              onPress={() => navigation.navigate('Orders')}
            >
              <Icon name="cart" size={24} color="#2563EB" />
              <Text className="ml-4 text-gray-900 dark:text-white font-medium">
                View Orders
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-white dark:bg-gray-800 p-4 rounded-lg flex-row items-center"
              onPress={() => navigation.navigate('Analytics')}
            >
              <Icon name="chart-bar" size={24} color="#2563EB" />
              <Text className="ml-4 text-gray-900 dark:text-white font-medium">
                View Analytics
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-white dark:bg-gray-800 p-4 rounded-lg flex-row items-center"
              onPress={() => navigation.navigate('Settings')}
            >
              <Icon name="cog" size={24} color="#2563EB" />
              <Text className="ml-4 text-gray-900 dark:text-white font-medium">
                Mess Settings
              </Text>
            </TouchableOpacity>
          </View>

          {/* Recent Activity */}
          <View className="mt-6 bg-white dark:bg-gray-800 p-4 rounded-lg">
            <Text className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Recent Activity
            </Text>
            <View className="space-y-4">
              <View className="flex-row items-center">
                <Icon name="account-plus" size={20} color="#10B981" />
                <Text className="ml-2 text-gray-600 dark:text-gray-300">
                  New customer registered
                </Text>
              </View>
              <View className="flex-row items-center">
                <Icon name="cart-plus" size={20} color="#3B82F6" />
                <Text className="ml-2 text-gray-600 dark:text-gray-300">
                  New meal booking received
                </Text>
              </View>
              <View className="flex-row items-center">
                <Icon name="alert-circle" size={20} color="#F59E0B" />
                <Text className="ml-2 text-gray-600 dark:text-gray-300">
                  New review received
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default MessOwnerDashboardScreen; 