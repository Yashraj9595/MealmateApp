import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { useCart } from '../contexts/CartContext';

const categories = [
  { id: 'all', name: 'All' },
  { id: 'main', name: 'Main Course' },
  { id: 'starters', name: 'Starters' },
  { id: 'desserts', name: 'Desserts' },
  { id: 'beverages', name: 'Beverages' },
];

  const menuItems = [
    {
    id: 1,
    name: 'Paneer Butter Masala',
    category: 'main',
    price: 120,
    description: 'Cottage cheese cubes in a rich, creamy tomato-based gravy',
    image: 'https://example.com/paneer-butter-masala.jpg',
    rating: 4.5,
    isVeg: true,
    isSpicy: false,
    },
    {
    id: 2,
    name: 'Chicken Biryani',
    category: 'main',
    price: 150,
    description: 'Fragrant basmati rice cooked with tender chicken and aromatic spices',
    image: 'https://example.com/chicken-biryani.jpg',
    rating: 4.8,
    isVeg: false,
    isSpicy: true,
    },
    {
    id: 3,
    name: 'Gulab Jamun',
    category: 'desserts',
    price: 60,
    description: 'Soft milk solids balls soaked in sugar syrup',
    image: 'https://example.com/gulab-jamun.jpg',
    rating: 4.3,
    isVeg: true,
    isSpicy: false,
    },
  ];

const MenuScreen = () => {
  const { isDarkMode } = useTheme();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { items, addItem } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredItems = selectedCategory === 'all'
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#111827' : '#F9FAFB'}
      />
      
      {/* Header */}
      <View className="p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="mr-4"
          >
            <Icon
              name="arrow-left"
              size={24}
              color={isDarkMode ? '#60A5FA' : '#2563EB'}
            />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-gray-800 dark:text-white">
            Menu
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Cart')}
            className="relative"
          >
            <Icon
              name="cart-outline"
              size={24}
              color={isDarkMode ? '#60A5FA' : '#2563EB'}
            />
            {items.length > 0 && (
              <View className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
                <Text className="text-white text-xs font-bold">
                  {items.length}
        </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            onPress={() => setSelectedCategory(category.id)}
            className={`px-4 py-3 ${
              selectedCategory === category.id
                ? 'border-b-2 border-blue-500'
                : ''
            }`}
          >
            <Text
              className={`font-medium ${
                selectedCategory === category.id
                  ? 'text-blue-500'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Menu Items */}
      <ScrollView className="flex-1 p-4">
        {filteredItems.map((item) => (
          <View
            key={item.id}
            className="mb-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
          >
                <Image
                  source={{ uri: item.image }}
              className="w-full h-48"
              defaultSource={require('../assets/placeholder-food.png')}
                />
            <View className="p-4">
              <View className="flex-row justify-between items-start">
                <View className="flex-1">
                  <Text className="text-xl font-bold text-gray-800 dark:text-white">
                  {item.name}
                </Text>
                  <Text className="text-gray-600 dark:text-gray-400 mt-1">
                  {item.description}
                </Text>
                </View>
                <View className="flex-row items-center ml-4">
                  <Icon
                    name="star"
                    size={16}
                    color="#F59E0B"
                    className="mr-1"
                  />
                  <Text className="text-gray-800 dark:text-white font-medium">
                    {item.rating}
                  </Text>
                </View>
              </View>
              <View className="flex-row items-center mt-2">
                {item.isVeg && (
                  <View className="bg-green-100 dark:bg-green-900 px-2 py-1 rounded-full mr-2">
                    <Text className="text-green-800 dark:text-green-200 text-xs font-medium">
                      Veg
                    </Text>
                  </View>
                )}
                {item.isSpicy && (
                  <View className="bg-red-100 dark:bg-red-900 px-2 py-1 rounded-full">
                    <Text className="text-red-800 dark:text-red-200 text-xs font-medium">
                      Spicy
                    </Text>
                  </View>
                )}
              </View>
              <View className="flex-row justify-between items-center mt-4">
                <Text className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  ₹{item.price}
                </Text>
                <TouchableOpacity
                  onPress={() => addItem(item)}
                  className="bg-blue-500 dark:bg-blue-600 px-4 py-2 rounded-lg"
                >
                  <Text className="text-white font-medium">Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
    </ScrollView>
    </SafeAreaView>
  );
};

export default MenuScreen; 