import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../contexts/ThemeContext';

interface Order {
  id: string;
  userName: string;
  items: {
    name: string;
    quantity: number;
    price: string;
  }[];
  totalAmount: string;
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  timestamp: string;
}

const OrdersScreen = () => {
  const { isDarkMode } = useTheme();
  const [selectedStatus, setSelectedStatus] = useState<Order['status']>('pending');

  const orders: Order[] = [
    {
      id: '1',
      userName: 'John Doe',
      items: [
        { name: 'Breakfast Combo', quantity: 1, price: '₹150' },
        { name: 'Coffee', quantity: 2, price: '₹40' },
      ],
      totalAmount: '₹230',
      status: 'pending',
      timestamp: '2024-03-20 08:30 AM',
    },
    {
      id: '2',
      userName: 'Jane Smith',
      items: [
        { name: 'Lunch Special', quantity: 1, price: '₹200' },
      ],
      totalAmount: '₹200',
      status: 'preparing',
      timestamp: '2024-03-20 12:15 PM',
    },
    {
      id: '3',
      userName: 'Mike Johnson',
      items: [
        { name: 'Dinner Plate', quantity: 2, price: '₹250' },
        { name: 'Soft Drink', quantity: 2, price: '₹30' },
      ],
      totalAmount: '₹560',
      status: 'ready',
      timestamp: '2024-03-20 07:45 PM',
    },
  ];

  const filteredOrders = orders.filter((order) => order.status === selectedStatus);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400';
      case 'preparing':
        return 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400';
      case 'ready':
        return 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400';
      case 'completed':
        return 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400';
      case 'cancelled':
        return 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400';
      default:
        return 'bg-gray-100 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400';
    }
  };

  const handleUpdateStatus = (orderId: string, newStatus: Order['status']) => {
    Alert.alert(
      'Update Order Status',
      'Are you sure you want to update the order status?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Update',
          onPress: () => {
            // TODO: Implement status update logic
          },
        },
      ]
    );
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
            Orders
          </Text>
          <Text className="text-base text-gray-600 dark:text-gray-300">
            Manage and track customer orders
          </Text>
        </View>

        {/* Status Filter */}
        <View className="mx-4 mb-4">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {(['pending', 'preparing', 'ready', 'completed', 'cancelled'] as const).map(
              (status) => (
                <TouchableOpacity
                  key={status}
                  onPress={() => setSelectedStatus(status)}
                  className={`mr-2 px-4 py-2 rounded-full border ${
                    selectedStatus === status
                      ? 'bg-blue-500 dark:bg-blue-600 border-blue-500 dark:border-blue-600'
                      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <Text
                    className={`text-sm font-medium ${
                      selectedStatus === status
                        ? 'text-white'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Text>
                </TouchableOpacity>
              )
            )}
          </ScrollView>
        </View>

        {/* Orders List */}
        <View className="mx-4 mb-4">
          {filteredOrders.map((order) => (
            <View
              key={order.id}
              className="mb-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
            >
              <View className="flex-row justify-between items-start mb-2">
                <View>
                  <Text className="text-lg font-semibold text-gray-800 dark:text-white">
                    {order.userName}
                  </Text>
                  <Text className="text-sm text-gray-500 dark:text-gray-400">
                    {order.timestamp}
                  </Text>
                </View>
                <Text className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {order.totalAmount}
                </Text>
              </View>

              {/* Order Items */}
              <View className="mb-3">
                {order.items.map((item, index) => (
                  <View
                    key={index}
                    className="flex-row justify-between items-center py-1"
                  >
                    <Text className="text-gray-600 dark:text-gray-300">
                      {item.quantity}x {item.name}
                    </Text>
                    <Text className="text-gray-600 dark:text-gray-300">
                      {item.price}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Status and Actions */}
              <View className="flex-row justify-between items-center">
                <View className={`px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                  <Text className="text-sm font-medium">
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Text>
                </View>
                <View className="flex-row space-x-2">
                  {order.status === 'pending' && (
                    <TouchableOpacity
                      onPress={() => handleUpdateStatus(order.id, 'preparing')}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 rounded-full"
                    >
                      <Text className="text-sm text-blue-600 dark:text-blue-400">
                        Start Preparing
                      </Text>
                    </TouchableOpacity>
                  )}
                  {order.status === 'preparing' && (
                    <TouchableOpacity
                      onPress={() => handleUpdateStatus(order.id, 'ready')}
                      className="px-3 py-1 bg-purple-100 dark:bg-purple-900/20 rounded-full"
                    >
                      <Text className="text-sm text-purple-600 dark:text-purple-400">
                        Mark Ready
                      </Text>
                    </TouchableOpacity>
                  )}
                  {order.status === 'ready' && (
                    <TouchableOpacity
                      onPress={() => handleUpdateStatus(order.id, 'completed')}
                      className="px-3 py-1 bg-green-100 dark:bg-green-900/20 rounded-full"
                    >
                      <Text className="text-sm text-green-600 dark:text-green-400">
                        Complete
                      </Text>
                    </TouchableOpacity>
                  )}
                  {order.status !== 'completed' && order.status !== 'cancelled' && (
                    <TouchableOpacity
                      onPress={() => handleUpdateStatus(order.id, 'cancelled')}
                      className="px-3 py-1 bg-red-100 dark:bg-red-900/20 rounded-full"
                    >
                      <Text className="text-sm text-red-600 dark:text-red-400">
                        Cancel
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrdersScreen; 