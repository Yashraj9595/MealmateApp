import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type SettingsItem =
  | {
      id: string;
      label: string;
      description: string;
      type: 'switch';
    }
  | {
      id: string;
      label: string;
      description: string;
      type: 'link';
      icon: string;
      onPress?: () => void;
    };

const SettingsScreen = () => {
  const { isDarkMode } = useTheme();
  const [settings, setSettings] = useState({
    maintenanceMode: false,
    allowNewRegistrations: true,
    allowMessRegistrations: true,
    enableNotifications: true,
    enableEmailNotifications: true,
    enableSMSNotifications: false,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            // Handle logout
          },
        },
      ],
      { cancelable: true }
    );
  };

  const settingsSections: { title: string; items: SettingsItem[] }[] = [
    {
      title: 'System Settings',
      items: [
        {
          id: 'maintenanceMode',
          label: 'Maintenance Mode',
          description: 'Enable maintenance mode to restrict access',
          type: 'switch',
        },
        {
          id: 'allowNewRegistrations',
          label: 'Allow New User Registrations',
          description: 'Enable or disable new user registrations',
          type: 'switch',
        },
        {
          id: 'allowMessRegistrations',
          label: 'Allow New Mess Registrations',
          description: 'Enable or disable new mess registrations',
          type: 'switch',
        },
      ],
    },
    {
      title: 'Notification Settings',
      items: [
        {
          id: 'enableNotifications',
          label: 'Push Notifications',
          description: 'Enable or disable push notifications',
          type: 'switch',
        },
        {
          id: 'enableEmailNotifications',
          label: 'Email Notifications',
          description: 'Enable or disable email notifications',
          type: 'switch',
        },
        {
          id: 'enableSMSNotifications',
          label: 'SMS Notifications',
          description: 'Enable or disable SMS notifications',
          type: 'switch',
        },
      ],
    },
    {
      title: 'Account',
      items: [
        {
          id: 'profile',
          label: 'Edit Profile',
          description: 'Update your admin profile information',
          type: 'link',
          icon: 'account-edit',
        },
        {
          id: 'password',
          label: 'Change Password',
          description: 'Update your account password',
          type: 'link',
          icon: 'lock',
        },
        {
          id: 'logout',
          label: 'Logout',
          description: 'Sign out of your account',
          type: 'link',
          icon: 'logout',
          onPress: handleLogout,
        },
      ],
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
        <View
          className="p-4 bg-white dark:bg-gray-800"
        >
          <Text
            className="text-2xl font-bold text-gray-900 dark:text-white"
          >
            Settings
          </Text>
        </View>

        {/* Settings Sections */}
        {settingsSections.map((section) => (
          <View key={section.title} className="mb-6">
            <Text
              className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400"
            >
              {section.title}
            </Text>
            <View
              className="bg-white dark:bg-gray-800"
            >
              {section.items.map((item) => (
                <View
                  key={item.id}
                  className="flex-row items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700"
                >
                  <View className="flex-1 mr-4">
                    <Text
                      className="text-base font-medium text-gray-900 dark:text-white"
                    >
                      {item.label}
                    </Text>
                    <Text
                      className="text-sm mt-1 text-gray-600 dark:text-gray-400"
                    >
                      {item.description}
                    </Text>
                  </View>
                  {item.type === 'switch' ? (
                    <Switch
                      value={settings[item.id as keyof typeof settings]}
                      onValueChange={() =>
                        toggleSetting(item.id as keyof typeof settings)
                      }
                      trackColor={{
                        false: isDarkMode ? '#374151' : '#E5E7EB',
                        true: '#3B82F6',
                      }}
                      thumbColor={
                        settings[item.id as keyof typeof settings]
                          ? '#FFFFFF'
                          : isDarkMode
                          ? '#9CA3AF'
                          : '#F3F4F6'
                      }
                    />
                  ) : (
                    <TouchableOpacity
                      onPress={item.onPress}
                      className="p-2"
                    >
                      <Icon
                        name={item.icon || 'chevron-right'}
                        size={24}
                        color={isDarkMode ? '#9CA3AF' : '#6B7280'}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen; 