import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, addDays } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../contexts/ThemeContext';

const BookingScreen = () => {
  const { isDarkMode } = useTheme();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedMeals, setSelectedMeals] = useState<string[]>([]);

  const meals = [
    {
      id: 'breakfast',
      name: 'Breakfast',
      time: '7:30 AM - 9:30 AM',
      price: '₹60',
      icon: 'coffee',
      items: ['Poha', 'Upma', 'Tea/Coffee', 'Bread & Butter']
    },
    {
      id: 'lunch',
      name: 'Lunch',
      time: '12:30 PM - 2:30 PM',
      price: '₹100',
      icon: 'food',
      items: ['Rice', 'Dal', 'Roti', 'Sabzi', 'Salad']
    },
    {
      id: 'dinner',
      name: 'Dinner',
      time: '7:30 PM - 9:30 PM',
      price: '₹100',
      icon: 'food-variant',
      items: ['Rice', 'Dal', 'Roti', 'Sabzi', 'Sweet']
    },
  ];

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const toggleMealSelection = (mealId: string) => {
    setSelectedMeals((prev) =>
      prev.includes(mealId)
        ? prev.filter((id) => id !== mealId)
        : [...prev, mealId]
    );
  };

  const totalAmount = selectedMeals.reduce((sum, mealId) => {
    const meal = meals.find((m) => m.id === mealId);
    return sum + (meal ? parseInt(meal.price.replace('₹', '')) : 0);
  }, 0);

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#111827' : '#F9FAFB'}
      />
      <ScrollView className="flex-1">
        {/* Date Selection */}
        <View className="m-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <Text className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
            Select Date
          </Text>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            className="flex-row items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
          >
            <View className="flex-row items-center">
              <Icon
                name="calendar"
                size={24}
                color={isDarkMode ? '#60A5FA' : '#2563EB'}
                className="mr-3"
              />
              <Text className="text-base font-medium text-gray-700 dark:text-gray-200">
                {format(selectedDate, 'EEEE, MMMM d, yyyy')}
              </Text>
            </View>
            <Icon
              name="chevron-right"
              size={24}
              color={isDarkMode ? '#9CA3AF' : '#6B7280'}
            />
          </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleDateChange}
            minimumDate={new Date()}
            maximumDate={addDays(new Date(), 7)}
          />
        )}

        {/* Meal Selection */}
        <View className="mx-4 mb-4">
          <Text className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
            Available Meals
          </Text>
          {meals.map((meal) => (
            <TouchableOpacity
              key={meal.id}
              onPress={() => toggleMealSelection(meal.id)}
              className="mb-4"
            >
              <View
                className={`p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border-2 
                  ${selectedMeals.includes(meal.id)
                    ? 'border-blue-500 dark:border-blue-400'
                    : 'border-transparent'
                  }`}
              >
                <View className="flex-row items-start justify-between mb-3">
                  <View className="flex-row items-center flex-1">
                    <View
                      className={`w-10 h-10 rounded-full items-center justify-center mr-3
                        ${selectedMeals.includes(meal.id)
                          ? 'bg-blue-100 dark:bg-blue-900'
                          : 'bg-gray-100 dark:bg-gray-700'
                        }`}
                    >
                      <Icon
                        name={meal.icon}
                        size={24}
                        color={
                          selectedMeals.includes(meal.id)
                            ? isDarkMode ? '#60A5FA' : '#2563EB'
                            : isDarkMode ? '#9CA3AF' : '#6B7280'
                        }
                      />
                    </View>
                    <View className="flex-1">
                      <Text className="text-lg font-semibold text-gray-800 dark:text-white">
                        {meal.name}
                      </Text>
                      <Text className="text-sm text-gray-500 dark:text-gray-400">
                        {meal.time}
                      </Text>
                    </View>
                    <Text className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {meal.price}
                    </Text>
                  </View>
                </View>
                <View className="pl-13">
                  <Text className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Today's Menu:
                  </Text>
                  <View className="flex-row flex-wrap">
                    {meal.items.map((item, index) => (
                      <Text
                        key={index}
                        className="text-sm text-gray-600 dark:text-gray-300 mr-2"
                      >
                        • {item}
                      </Text>
                    ))}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Summary */}
        {selectedMeals.length > 0 && (
          <View className="mx-4 mb-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <Text className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
              Order Summary
            </Text>
            {selectedMeals.map((mealId) => {
              const meal = meals.find((m) => m.id === mealId);
              return (
                <View
                  key={mealId}
                  className="flex-row justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700"
                >
                  <View className="flex-row items-center">
                    <Icon
                      name={meal?.icon || 'food'}
                      size={20}
                      color={isDarkMode ? '#60A5FA' : '#2563EB'}
                      className="mr-2"
                    />
                    <Text className="text-base text-gray-700 dark:text-gray-300">
                      {meal?.name}
                    </Text>
                  </View>
                  <Text className="text-base font-medium text-gray-700 dark:text-gray-300">
                    {meal?.price}
                  </Text>
                </View>
              );
            })}
            <View className="flex-row justify-between items-center mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
              <Text className="text-lg font-semibold text-gray-800 dark:text-white">
                Total Amount
              </Text>
              <Text className="text-xl font-bold text-blue-600 dark:text-blue-400">
                ₹{totalAmount}
              </Text>
            </View>
          </View>
        )}

        {/* Book Button */}
        <View className="m-4">
          <TouchableOpacity
            disabled={selectedMeals.length === 0}
            className={`p-4 rounded-xl shadow ${
              selectedMeals.length > 0
                ? 'bg-blue-500 dark:bg-blue-600'
                : 'bg-gray-300 dark:bg-gray-700'
            }`}
          >
            <Text className="text-white text-center font-bold text-lg">
              {selectedMeals.length > 0 ? `Book Meals • ₹${totalAmount}` : 'Select Meals to Continue'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookingScreen; 