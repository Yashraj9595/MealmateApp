import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { RootStackNavigationProp } from '../navigation/types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [activeMessTab, setActiveMessTab] = useState<'our_mess' | 'posted_mess'>('our_mess');
  const [isEnrolled, setIsEnrolled] = useState(true);

  // Dummy data for demonstration
  const attendanceData = {
    attended: 2,
    total: 90,
    leaves: 1,
  };

  const upcomingMeals = [
    { date: 'Today', day: 'Mon', meals: ['Lunch'] },
    { date: 'Tomorrow', day: 'Tue', meals: ['Breakfast', 'Dinner'] },
    { date: '2024-07-28', day: 'Wed', meals: ['Lunch', 'Dinner'] },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-slate-900">
      {/* Mess Tabs */}
      <View className="flex-row border-b border-gray-200 dark:border-gray-700">
        <TouchableOpacity
          className={`flex-1 py-3 px-4 items-center justify-center ${
            activeMessTab === 'our_mess' ? 'border-b-2 border-sky-500' : ''
          }`}
          onPress={() => setActiveMessTab('our_mess')}
        >
          <Text
            className={`text-center font-medium ${
              activeMessTab === 'our_mess'
                ? 'text-sky-600 dark:text-sky-400'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            Our Mess
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-1 py-3 px-4 items-center justify-center ${
            activeMessTab === 'posted_mess' ? 'border-b-2 border-sky-500' : ''
          }`}
          onPress={() => setActiveMessTab('posted_mess')}
        >
          <Text
            className={`text-center font-medium ${
              activeMessTab === 'posted_mess'
                ? 'text-sky-600 dark:text-sky-400'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            Posted Mess by Owners
          </Text>
        </TouchableOpacity>
      </View>

      {activeMessTab === 'our_mess' ? (
        <View className="p-4">
          {/* Welcome Banner */}
          <View className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-lg shadow-md p-6 mb-4">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-xl font-semibold text-white mb-2">Welcome back, John!</Text>
                <Text className="text-sky-100 text-sm">Your current plan: Gold Membership</Text>
              </View>
              <Image
                source={{ uri: 'https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff' }}
                className="w-12 h-12 rounded-full border-2 border-white"
              />
            </View>
          </View>

          {/* Quick Actions */}
          <View className="space-y-4">
            <TouchableOpacity
              className="bg-white dark:bg-slate-800 p-4 rounded-lg flex-row items-center"
              onPress={() => navigation.navigate('Booking')}
            >
              <Icon name="calendar-check" size={24} color="#2563EB" />
              <Text className="ml-4 text-slate-900 dark:text-white font-medium">
                Book Meals
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-white dark:bg-slate-800 p-4 rounded-lg flex-row items-center"
              onPress={() => navigation.navigate('Leave')}
            >
              <Icon name="calendar-remove" size={24} color="#2563EB" />
              <Text className="ml-4 text-slate-900 dark:text-white font-medium">
                Apply for Leave
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-white dark:bg-slate-800 p-4 rounded-lg flex-row items-center"
              onPress={() => navigation.navigate('Plan')}
            >
              <Icon name="star" size={24} color="#2563EB" />
              <Text className="ml-4 text-slate-900 dark:text-white font-medium">
                View Plans
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-white dark:bg-slate-800 p-4 rounded-lg flex-row items-center"
              onPress={() => navigation.navigate('Bills')}
            >
              <Icon name="cash" size={24} color="#2563EB" />
              <Text className="ml-4 text-slate-900 dark:text-white font-medium">
                View Bills
              </Text>
            </TouchableOpacity>
          </View>

          {/* Attendance Summary */}
          <View className="mt-6 bg-white dark:bg-slate-800 p-4 rounded-lg">
            <Text className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Attendance Summary
            </Text>
            <View className="flex-row justify-between items-center">
              <View className="items-center">
                <Text className="text-2xl font-bold text-gray-800 dark:text-white">
                  {attendanceData.attended}/{attendanceData.total}
                </Text>
                <Text className="text-sm text-gray-500 dark:text-gray-400">Meals</Text>
              </View>
              <View className="items-center">
                <Text className="text-2xl font-bold text-gray-800 dark:text-white">
                  {attendanceData.leaves}
                </Text>
                <Text className="text-sm text-gray-500 dark:text-gray-400">Leaves</Text>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View className="p-4">
          <Text className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Posted Mess Listings
          </Text>
          <Text className="text-gray-600 dark:text-gray-400">
            Browse through mess listings posted by owners in your area.
          </Text>
          {/* Add mess listings here */}
        </View>
      )}
    </ScrollView>
  );
};

export default HomeScreen; 