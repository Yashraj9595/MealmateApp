import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../contexts/ThemeContext';
import HomeScreen from '../../screens/dashboard/HomeScreen';
import MenuScreen from '../../screens/dashboard/MenuScreen';
import BillsScreen from '../../screens/dashboard/BillsScreen';
import MessHubScreen from '../../screens/dashboard/MessHubScreen';
import LeaveScreen from '../../screens/dashboard/LeaveScreen';
import PlanScreen from '../../screens/dashboard/PlanScreen';

import type { UserTabParamList } from '../../navigation/types';

const Tab = createBottomTabNavigator<UserTabParamList>();

const UserDashboardScreen = () => {
  const { isDarkMode } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
          borderTopColor: isDarkMode ? '#374151' : '#E5E7EB',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: isDarkMode ? '#9CA3AF' : '#6B7280',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="food" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Bills"
        component={BillsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="receipt" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MessHub"
        component={MessHubScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="forum" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Leave"
        component={LeaveScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar-remove" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Plan"
        component={PlanScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar-check" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default UserDashboardScreen; 