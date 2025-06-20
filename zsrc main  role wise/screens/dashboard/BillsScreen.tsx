import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StatusBar,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LineChart } from 'react-native-chart-kit';
import type { ChartConfig } from 'react-native-chart-kit/dist/HelperTypes';
import { useTheme } from '../../contexts/ThemeContext';
import { moneyService } from '../../services/api';

interface Bill {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  type: 'mess' | 'hostel' | 'other';
}

const BillsScreen = () => {
  const { isDarkMode } = useTheme();
  const { width } = Dimensions.get('window');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'paid' | 'pending' | 'overdue'>('all');
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        setLoading(true);
        const response = await moneyService.getTransactions();
        if (response.data) {
          // Assuming the backend returns an array of bills matching the Bill interface
          setBills(response.data.transactions || []);
        } else {
          setError(response.message || 'Failed to fetch bills.');
        }
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch bills.');
        console.error('Failed to fetch bills:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, []);

  // Hardcoded chart data and recent bills are removed as they should be fetched dynamically.
  // You will need to implement API calls for these if you want them to be dynamic.
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [2100, 1950, 2300, 2400, 2200, 2200],
        color: (opacity = 1) => isDarkMode ? `rgba(147, 197, 253, ${opacity})` : `rgba(59, 130, 246, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig: ChartConfig = {
    backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
    backgroundGradientFrom: isDarkMode ? '#1F2937' : '#FFFFFF',
    backgroundGradientTo: isDarkMode ? '#1F2937' : '#FFFFFF',
    color: (opacity = 1) => isDarkMode ? `rgba(147, 197, 253, ${opacity})` : `rgba(59, 130, 246, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    decimalPlaces: 0,
    propsForLabels: {
      fontSize: 12,
      fill: isDarkMode ? '#D1D5DB' : '#4B5563',
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: isDarkMode ? '#60A5FA' : '#2563EB',
    },
  };

  if (loading) {
    return (
      <SafeAreaView className={`flex-1 items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Text className={isDarkMode ? 'text-white' : 'text-gray-900'}>Loading bills...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className={`flex-1 items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Text className={isDarkMode ? 'text-red-500' : 'text-red-700'}>Error: {error}</Text>
      </SafeAreaView>
    );
  }

  const getStatusColor = (status: Bill['status']) => {
    switch (status) {
      case 'paid':
        return 'text-green-600 dark:text-green-400';
      case 'pending':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'overdue':
        return 'text-red-600 dark:text-red-400';
    }
  };

  const getStatusIcon = (status: Bill['status']) => {
    switch (status) {
      case 'paid':
        return 'check-circle';
      case 'pending':
        return 'clock-outline';
      case 'overdue':
        return 'alert-circle';
    }
  };

  const getTypeIcon = (type: Bill['type']) => {
    switch (type) {
      case 'mess':
        return 'food';
      case 'hostel':
        return 'home';
      case 'other':
        return 'dots-horizontal';
    }
  };

  const filteredBills = bills.filter((bill) => {
    const matchesSearch = bill.description
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === 'all' || bill.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const totalAmount = filteredBills.reduce((sum, bill) => sum + bill.amount, 0);

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#111827' : '#F9FAFB'}
      />
      <ScrollView className="flex-1">
        {/* Search Bar */}
        <View className="m-4">
          <View className="flex-row items-center bg-white dark:bg-gray-800 rounded-xl shadow-sm p-2">
            <Icon
              name="magnify"
              size={24}
              color={isDarkMode ? '#9CA3AF' : '#6B7280'}
              className="ml-2"
            />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search bills..."
              placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
              className="flex-1 ml-2 text-base text-gray-700 dark:text-gray-200"
            />
          </View>
        </View>

        {/* Filter Buttons */}
        <View className="mx-4 mb-4">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {(['all', 'paid', 'pending', 'overdue'] as const).map((filter) => (
              <TouchableOpacity
                key={filter}
                onPress={() => setSelectedFilter(filter)}
                className={`mr-2 px-4 py-2 rounded-full border ${
                  selectedFilter === filter
                    ? 'bg-blue-500 dark:bg-blue-600 border-blue-500 dark:border-blue-600'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                }`}
              >
                <Text
                  className={`text-sm font-medium ${
                    selectedFilter === filter
                      ? 'text-white'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Summary Card */}
        <View className="mx-4 mb-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <Text className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Summary
          </Text>
          <View className="flex-row justify-between mb-4">
            <View>
              <Text className="text-sm text-gray-500 dark:text-gray-400">
                Total Bills
              </Text>
              <Text className="text-xl font-bold text-gray-800 dark:text-white">
                {filteredBills.length}
              </Text>
            </View>
            <View>
              <Text className="text-sm text-gray-500 dark:text-gray-400">
                Total Amount
              </Text>
              <Text className="text-xl font-bold text-blue-600 dark:text-blue-400">
                ₹{totalAmount}
              </Text>
            </View>
          </View>
          <View className="flex-row justify-between">
            <View className="flex-row items-center">
              <Icon name="check-circle" size={16} color="#059669" />
              <Text className="text-sm text-gray-600 dark:text-gray-300 ml-1">
                {bills.filter((b) => b.status === 'paid').length} Paid
              </Text>
            </View>
            <View className="flex-row items-center">
              <Icon name="clock-outline" size={16} color="#D97706" />
              <Text className="text-sm text-gray-600 dark:text-gray-300 ml-1">
                {bills.filter((b) => b.status === 'pending').length} Pending
              </Text>
            </View>
            <View className="flex-row items-center">
              <Icon name="alert-circle" size={16} color="#DC2626" />
              <Text className="text-sm text-gray-600 dark:text-gray-300 ml-1">
                {bills.filter((b) => b.status === 'overdue').length} Overdue
              </Text>
            </View>
          </View>
        </View>

        {/* Chart */}
        <View className="mx-4 mb-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <Text className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Spending Overview
          </Text>
          <LineChart
            data={chartData}
            width={width - 48} // from 24px padding on each side
            height={220}
            chartConfig={chartConfig}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>

        {/* Bill List */}
        <View className="mx-4 mb-4">
          <Text className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
            All Bills
          </Text>
          {filteredBills.length > 0 ? (filteredBills.map((bill) => (
            <TouchableOpacity
              key={bill.id}
              className="mb-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm flex-row items-center justify-between"
            >
              <View className="flex-row items-center">
                <View
                  className={`w-10 h-10 rounded-full items-center justify-center mr-4 ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}
                >
                  <Icon
                    name={getTypeIcon(bill.type)}
                    size={24}
                    color={isDarkMode ? '#9CA3AF' : '#6B7280'}
                  />
                </View>
                <View>
                  <Text className={`text-base font-medium ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {bill.description}
                  </Text>
                  <Text className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {bill.date}
                  </Text>
                </View>
              </View>
              <View className="items-end">
                <Text className={`text-lg font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  ₹{bill.amount}
                </Text>
                <View className="flex-row items-center mt-1">
                  <Icon name={getStatusIcon(bill.status)} size={16} className={`mr-1 ${getStatusColor(bill.status)}`} />
                  <Text className={`text-sm ${getStatusColor(bill.status)}`}>
                    {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))) : (
            <Text className="text-gray-500 dark:text-gray-400">No bills found.</Text>
          )}
        </View>

        {/* Recent Bills (optional - if you want to keep this section) */}
        {/* <View className="mx-4 mb-4">
          <Text className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
            Recent Bills
          </Text>
          {recentBills.map((bill) => (
            <View
              key={bill.id}
              className="mb-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
            >
              <Text className="text-base font-medium text-gray-800 dark:text-white">
                {bill.month}
              </Text>
              <Text className="text-sm text-gray-600 dark:text-gray-300">
                Amount: ₹{bill.amount}
              </Text>
              <Text className="text-sm text-gray-600 dark:text-gray-300">
                Status: {bill.status}
              </Text>
              {bill.status === 'Due' ? (
                <Text className="text-sm text-red-500">Due Date: {bill.dueDate}</Text>
              ) : (
                <Text className="text-sm text-green-500">Paid On: {bill.paidOn}</Text>
              )}
            </View>
          ))}
        </View> */}

      </ScrollView>
    </SafeAreaView>
  );
};

export default BillsScreen;