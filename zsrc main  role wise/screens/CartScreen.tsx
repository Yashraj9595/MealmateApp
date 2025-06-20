import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../contexts/CartContext';

const CartScreen = () => {
  const { isDarkMode } = useTheme();
  const navigation = useNavigation();
  const { items, removeItem, updateQuantity, getTotal } = useCart();

  const subtotal = getTotal();
  const tax = subtotal * 0.05; // 5% tax
  const deliveryFee = 40;
  const total = subtotal + tax + deliveryFee;

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#111827' : '#F9FAFB'}
      />
      
      {/* Header */}
      <View className="p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <View className="flex-row items-center">
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
            Your Cart
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1 bg-gray-50 dark:bg-slate-900">
        {/* Cart Items */}
        <View className="p-4">
          {items.map((item) => (
            <View
              key={item.id}
              className="mb-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
            >
              <View className="flex-row p-4">
                <Image
                  source={{ uri: item.image }}
                  className="w-20 h-20 rounded-lg"
                  defaultSource={require('../assets/placeholder-food.png')}
                />
                <View className="flex-1 ml-4">
                  <View className="flex-row justify-between items-start">
                    <View className="flex-1">
                      <Text className="text-lg font-semibold text-gray-800 dark:text-white">
                        {item.name}
                      </Text>
                      <Text className="text-lg font-bold text-blue-600 dark:text-blue-400 mt-1">
                        ₹{item.price}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => removeItem(item.id)}
                      className="p-2"
                    >
                      <Icon
                        name="delete-outline"
                        size={24}
                        color={isDarkMode ? '#EF4444' : '#DC2626'}
                      />
                    </TouchableOpacity>
                  </View>
                  <View className="flex-row items-center mt-2">
                    <TouchableOpacity
                      onPress={() => updateQuantity(item.id, -1)}
                      className="w-8 h-8 items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full"
                    >
                      <Icon
                        name="minus"
                        size={20}
                        color={isDarkMode ? '#60A5FA' : '#2563EB'}
                      />
                    </TouchableOpacity>
                    <Text className="mx-4 text-lg font-semibold text-gray-800 dark:text-white">
                      {item.quantity}
                    </Text>
                    <TouchableOpacity
                      onPress={() => updateQuantity(item.id, 1)}
                      className="w-8 h-8 items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full"
                    >
                      <Icon
                        name="plus"
                        size={20}
                        color={isDarkMode ? '#60A5FA' : '#2563EB'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Order Summary */}
        <View className="p-4 bg-white dark:bg-gray-800 mt-4">
          <Text className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Order Summary
          </Text>
          <View className="space-y-2">
            <View className="flex-row justify-between">
              <Text className="text-gray-600 dark:text-gray-400">Subtotal</Text>
              <Text className="text-gray-800 dark:text-white">₹{subtotal}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-600 dark:text-gray-400">Tax (5%)</Text>
              <Text className="text-gray-800 dark:text-white">₹{tax}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-600 dark:text-gray-400">Delivery Fee</Text>
              <Text className="text-gray-800 dark:text-white">₹{deliveryFee}</Text>
            </View>
            <View className="h-px bg-gray-200 dark:bg-gray-700 my-2" />
            <View className="flex-row justify-between">
              <Text className="text-lg font-semibold text-gray-800 dark:text-white">
                Total
              </Text>
              <Text className="text-lg font-bold text-blue-600 dark:text-blue-400">
                ₹{total}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Checkout Button */}
      <View className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <TouchableOpacity
          disabled={items.length === 0}
          className={`p-4 rounded-xl ${
            items.length > 0
              ? 'bg-blue-500 dark:bg-blue-600'
              : 'bg-gray-300 dark:bg-gray-700'
          }`}
        >
          <Text className="text-white text-center font-bold text-lg">
            {items.length > 0
              ? `Proceed to Checkout • ₹${total}`
              : 'Your cart is empty'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen; 