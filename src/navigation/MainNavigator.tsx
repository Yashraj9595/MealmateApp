import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { UserRole } from '../types/auth';
import { UserDashboardScreen } from '../screens/user/UserDashboardScreen';
import { MessOwnerDashboardScreen } from '../screens/mess-owner/MessOwnerDashboardScreen';
import { AdminDashboardScreen } from '../screens/admin/AdminDashboardScreen';
import MessHubScreen from '../screens/user/MessHubScreen';
import BillsScreen from '../screens/user/BillsScreen';
import LeaveScreen from '../screens/user/LeaveScreen';
import PlanScreen from '../screens/user/PlanScreen';
import BookingScreen from '../screens/user/BookingScreen';
import { OverviewScreen } from '../screens/mess-owner/OverviewScreen';
import { MenuManagementScreen } from '../screens/mess-owner/MenuManagementScreen';
import { AnalyticsScreen } from '../screens/mess-owner/AnalyticsScreen';
import { SettingsScreen as MessOwnerSettingsScreen } from '../screens/mess-owner/SettingsScreen';
import { MessesScreen } from '../screens/admin/MessesScreen';
import { ReportsScreen } from '../screens/admin/ReportsScreen';
import { SettingsScreen as AdminSettingsScreen } from '../screens/admin/SettingsScreen';
import { AdminManagementScreen } from '../screens/admin/AdminManagementScreen';
import { CustomTabBar } from '../components/CustomTabBar';

const Stack = createStackNavigator();
const UserTab = createBottomTabNavigator();
const MessOwnerTab = createBottomTabNavigator();
const AdminTab = createBottomTabNavigator();

export type UserTabParamList = {
  Dashboard: undefined;
  MessHub: undefined;
  Booking: undefined;
  Bills: undefined;
  Plan: undefined;
  Leave: undefined;
};

export type MessOwnerTabParamList = {
  Dashboard: undefined;
  Overview: undefined;
  Menu: undefined;
  Analytics: undefined;
  Settings: undefined;
};

export type AdminTabParamList = {
  Dashboard: undefined;
  Messes: undefined;
  Reports: undefined;
  AdminManagement: undefined;
  Settings: undefined;
};

interface MainNavigatorProps {
  userRole: UserRole;
}

const UserTabNavigator = () => (
  <UserTab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#4F46E5',
      tabBarInactiveTintColor: '#9CA3AF',
      tabBarStyle: {
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
      },
    }}
    tabBar={props => <CustomTabBar {...props} />}
  >
    <UserTab.Screen name="Dashboard" component={UserDashboardScreen} />
    <UserTab.Screen name="MessHub" component={MessHubScreen} />
    <UserTab.Screen name="Booking" component={BookingScreen} />
    <UserTab.Screen name="Bills" component={BillsScreen} />
    <UserTab.Screen name="Plan" component={PlanScreen} />
    <UserTab.Screen name="Leave" component={LeaveScreen} />
  </UserTab.Navigator>
);

const MessOwnerTabNavigator = () => (
  <MessOwnerTab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#4F46E5',
      tabBarInactiveTintColor: '#9CA3AF',
      tabBarStyle: {
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
      },
    }}
    tabBar={props => <CustomTabBar {...props} />}
  >
    <MessOwnerTab.Screen name="Dashboard" component={MessOwnerDashboardScreen} />
    <MessOwnerTab.Screen name="Overview" component={OverviewScreen} />
    <MessOwnerTab.Screen name="Menu" component={MenuManagementScreen} />
    <MessOwnerTab.Screen name="Analytics" component={AnalyticsScreen} />
    <MessOwnerTab.Screen name="Settings" component={MessOwnerSettingsScreen} />
  </MessOwnerTab.Navigator>
);

const AdminTabNavigator = () => (
  <AdminTab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#3B82F6',
      tabBarInactiveTintColor: '#9CA3AF',
      tabBarStyle: {
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
      },
    }}
    tabBar={props => <CustomTabBar {...props} />}
  >
    <AdminTab.Screen name="Dashboard" component={AdminDashboardScreen} />
    <AdminTab.Screen name="Messes" component={MessesScreen} />
    <AdminTab.Screen name="Reports" component={ReportsScreen} />
    <AdminTab.Screen name="AdminManagement" component={AdminManagementScreen} />
    <AdminTab.Screen name="Settings" component={AdminSettingsScreen} />
  </AdminTab.Navigator>
);

export const MainNavigator = ({ userRole }: MainNavigatorProps) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userRole === 'user' && <Stack.Screen name="UserTabs" component={UserTabNavigator} />}
      {userRole === 'mess_owner' && <Stack.Screen name="MessOwnerTabs" component={MessOwnerTabNavigator} />}
      {userRole === 'project_admin' && <Stack.Screen name="AdminTabs" component={AdminTabNavigator} />}
    </Stack.Navigator>
  );
};