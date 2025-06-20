import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../contexts/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import type { RootStackNavigationProp } from '../../navigation/types';
import { useUser } from '../../contexts/UserContext';
import { dashboardService } from '../../services/api';

// Fallback data for when the backend is not available
const fallbackData = {
  upcomingMeals: [
    {
      id: '1',
      name: 'Breakfast',
      time: '8:00 AM',
      menu: ['Idli', 'Sambar', 'Chutney'],
    },
    {
      id: '2',
      name: 'Lunch',
      time: '1:00 PM',
      menu: ['Rice', 'Dal', 'Vegetables', 'Chapati'],
    },
  ],
  announcements: [
    {
      id: '1',
      title: 'Welcome to MealMate!',
      message: 'We are excited to have you on board.',
      date: new Date().toISOString(),
    },
  ],
  stats: {
    mealsThisWeek: 0,
    pointsEarned: 0,
  },
};

const HomeScreen = () => {
  const { isDarkMode } = useTheme();
  const navigation = useNavigation<RootStackNavigationProp>();
  const { user } = useUser();

  const [upcomingMeals, setUpcomingMeals] = useState<any[]>(fallbackData.upcomingMeals);
  const [announcements, setAnnouncements] = useState<any[]>(fallbackData.announcements);
  const [dashboardStats, setDashboardStats] = useState<any>(fallbackData.stats);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const response = await dashboardService.getDashboardData();
        if (response.data) {
          setUpcomingMeals(response.data.upcomingMeals || fallbackData.upcomingMeals);
          setAnnouncements(response.data.announcements || fallbackData.announcements);
          setDashboardStats(response.data.stats || fallbackData.stats);
        }
      } catch (error: any) {
        console.error('Failed to fetch dashboard data:', error);
        // Don't show alert for 404 errors as they're expected when backend is not running
        if (error.response?.status !== 404) {
          Alert.alert('Error', error.message || 'Failed to load dashboard data');
        }
        // Use fallback data
        setUpcomingMeals(fallbackData.upcomingMeals);
        setAnnouncements(fallbackData.announcements);
        setDashboardStats(fallbackData.stats);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const quickActions = [
    {
      id: 'book',
      title: 'Book Meal',
      icon: 'food',
      screen: 'Booking',
      color: '#2563EB',
    },
    {
      id: 'bills',
      title: 'View Bills',
      icon: 'receipt',
      screen: 'Bills',
      color: '#059669',
    },
    {
      id: 'leave',
      title: 'Apply Leave',
      icon: 'calendar',
      screen: 'Leave',
      color: '#D97706',
    },
    {
      id: 'feedback',
      title: 'Give Feedback',
      icon: 'message-text',
      screen: 'MessHub',
      color: '#7C3AED',
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#111827' : '#F9FAFB'}
      />
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="m-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <View className="flex-row items-center justify-between mb-4">
            <View>
              <Text className="text-2xl font-bold text-gray-800 dark:text-white">
                Welcome back, {user?.name || 'User'}!
              </Text>
              <Text className="text-base text-gray-600 dark:text-gray-300">
                What would you like to do today?
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Menu')}
              className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full"
            >
              <Icon
                name="bell-outline"
                size={24}
                color={isDarkMode ? '#60A5FA' : '#2563EB'}
              />
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-between">
            <View className="items-center">
              <Text className="text-sm text-gray-500 dark:text-gray-400">
                Wallet Balance
              </Text>
              <Text className="text-xl font-bold text-gray-800 dark:text-white">
                ₹{user?.balance !== undefined ? user.balance.toLocaleString() : 'N/A'}
              </Text>
            </View>
            <View className="items-center">
              <Text className="text-sm text-gray-500 dark:text-gray-400">
                Meals This Week
              </Text>
              <Text className="text-xl font-bold text-gray-800 dark:text-white">
                {dashboardStats.mealsThisWeek !== undefined ? dashboardStats.mealsThisWeek : 'N/A'}
              </Text>
            </View>
            <View className="items-center">
              <Text className="text-sm text-gray-500 dark:text-gray-400">
                Points Earned
              </Text>
              <Text className="text-xl font-bold text-gray-800 dark:text-white">
                {dashboardStats.pointsEarned !== undefined ? dashboardStats.pointsEarned : 'N/A'}
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="mx-4 mb-4">
          <Text className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
            Quick Actions
          </Text>
          <View className="flex-row flex-wrap justify-between">
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                onPress={() => navigation.navigate(action.screen as any)}
                className="w-[48%] mb-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
              >
                <View
                  className="w-12 h-12 rounded-full items-center justify-center mb-3"
                  style={{ backgroundColor: `${action.color}20` }}
                >
                  <Icon name={action.icon} size={24} color={action.color} />
                </View>
                <Text className="text-base font-medium text-gray-800 dark:text-white">
                  {action.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Today's Menu */}
        <View className="mx-4 mb-4">
          <Text className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
            Today's Menu
          </Text>
          {upcomingMeals.length > 0 ? (upcomingMeals.map((meal: any, index: number) => (
            <View
              key={meal.id || index}
              className="mb-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
            >
              <View className="flex-row justify-between items-start mb-2">
                <View>
                  <Text className="text-base font-medium text-gray-800 dark:text-white">
                    {meal.name}
                  </Text>
                  <Text className="text-sm text-gray-500 dark:text-gray-400">
                    {meal.time}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Booking')}
                  className="px-3 py-1 bg-blue-500 dark:bg-blue-600 rounded-full"
                >
                  <Text className="text-white text-sm font-medium">Book Now</Text>
                </TouchableOpacity>
              </View>
              <View className="flex-row flex-wrap">
                {meal.menu?.map((item: string, idx: number) => (
                  <Text
                    key={idx}
                    className="text-sm text-gray-600 dark:text-gray-300 mr-2"
                  >
                    • {item}
                  </Text>
                ))}
              </View>
            </View>
          ))) : (
            <Text className="text-gray-500 dark:text-gray-400">No upcoming meals found.</Text>
          )}
        </View>

        {/* Announcements */}
        <View className="mx-4 mb-4">
          <Text className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
            Announcements
          </Text>
          {announcements.length > 0 ? (announcements.map((announcement: any, index: number) => (
            <View
              key={announcement.id || index}
              className="mb-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
            >
              <Text className="text-base font-medium text-gray-800 dark:text-white mb-1">
                {announcement.title}
              </Text>
              <Text className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                {announcement.message}
              </Text>
              <Text className="text-xs text-gray-500 dark:text-gray-400">
                {announcement.date}
              </Text>
            </View>
          ))) : (
            <Text className="text-gray-500 dark:text-gray-400">No announcements found.</Text>
          )}
        </View>

        {/* View All Button */}
        <View className="m-4">
          <TouchableOpacity
            onPress={() => navigation.navigate('MessHub')}
            className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl"
          >
            <Text className="text-center text-gray-700 dark:text-gray-300 font-medium">
              View All Announcements
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen; 