import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../contexts/ThemeContext';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: 'breakfast' | 'lunch' | 'dinner';
  isAvailable: boolean;
}

const MenuManagementScreen = () => {
  const { isDarkMode } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<MenuItem['category']>('breakfast');
  const [searchQuery, setSearchQuery] = useState('');

  const menuItems: MenuItem[] = [
    {
      id: '1',
      name: 'Breakfast Combo',
      description: 'Eggs, toast, and coffee',
      price: '₹150',
      category: 'breakfast',
      isAvailable: true,
    },
    {
      id: '2',
      name: 'Lunch Special',
      description: 'Rice, dal, sabzi, and roti',
      price: '₹200',
      category: 'lunch',
      isAvailable: true,
    },
    {
      id: '3',
      name: 'Dinner Plate',
      description: 'Full thali with dessert',
      price: '₹250',
      category: 'dinner',
      isAvailable: true,
    },
  ];

  const filteredItems = menuItems.filter(
    (item) =>
      item.category === selectedCategory &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleAvailability = (itemId: string) => {
    Alert.alert(
      'Toggle Availability',
      'Are you sure you want to change the availability of this item?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => {
            // TODO: Implement availability toggle logic
          },
        },
      ]
    );
  };

  const handleEditItem = (itemId: string) => {
    // TODO: Implement edit item logic
  };

  const handleDeleteItem = (itemId: string) => {
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this item?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // TODO: Implement delete item logic
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
            Menu Management
          </Text>
          <Text className="text-base text-gray-600 dark:text-gray-300">
            Manage your mess menu items
          </Text>
        </View>

        {/* Search Bar */}
        <View className="mx-4 mb-4">
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
              placeholder="Search menu items..."
              placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
              className="flex-1 ml-2 text-base text-gray-700 dark:text-gray-200"
            />
          </View>
        </View>

        {/* Category Filter */}
        <View className="mx-4 mb-4">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {(['breakfast', 'lunch', 'dinner'] as const).map((category) => (
              <TouchableOpacity
                key={category}
                onPress={() => setSelectedCategory(category)}
                className={`mr-2 px-4 py-2 rounded-full border ${
                  selectedCategory === category
                    ? 'bg-blue-500 dark:bg-blue-600 border-blue-500 dark:border-blue-600'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                }`}
              >
                <Text
                  className={`text-sm font-medium ${
                    selectedCategory === category
                      ? 'text-white'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Menu Items */}
        <View className="mx-4 mb-4">
          {filteredItems.map((item) => (
            <View
              key={item.id}
              className="mb-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
            >
              <View className="flex-row justify-between items-start mb-2">
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-gray-800 dark:text-white">
                    {item.name}
                  </Text>
                  <Text className="text-sm text-gray-500 dark:text-gray-400">
                    {item.description}
                  </Text>
                </View>
                <Text className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {item.price}
                </Text>
              </View>
              <View className="flex-row justify-end space-x-2">
                <TouchableOpacity
                  onPress={() => handleToggleAvailability(item.id)}
                  className={`px-3 py-1 rounded-full ${
                    item.isAvailable
                      ? 'bg-green-100 dark:bg-green-900/20'
                      : 'bg-red-100 dark:bg-red-900/20'
                  }`}
                >
                  <Text
                    className={`text-sm ${
                      item.isAvailable
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {item.isAvailable ? 'Available' : 'Unavailable'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleEditItem(item.id)}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 rounded-full"
                >
                  <Text className="text-sm text-blue-600 dark:text-blue-400">
                    Edit
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDeleteItem(item.id)}
                  className="px-3 py-1 bg-red-100 dark:bg-red-900/20 rounded-full"
                >
                  <Text className="text-sm text-red-600 dark:text-red-400">
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Add New Item Button */}
        <View className="m-4">
          <TouchableOpacity className="p-4 bg-blue-500 dark:bg-blue-600 rounded-xl shadow">
            <Text className="text-white text-center font-bold text-lg">
              Add New Item
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MenuManagementScreen; 