import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const UsersScreen = () => {
  const { isDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  // Mock data - replace with actual API call
  const users = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user',
      status: 'active',
      joinedDate: '2024-01-15',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'mess_owner',
      status: 'active',
      joinedDate: '2024-01-10',
    },
    {
      id: '3',
      name: 'Bob Johnson',
      email: 'bob@example.com',
      role: 'user',
      status: 'inactive',
      joinedDate: '2024-01-05',
    },
  ];

  const roles = [
    { id: 'all', label: 'All' },
    { id: 'user', label: 'Users' },
    { id: 'mess_owner', label: 'Mess Owners' },
    { id: 'admin', label: 'Admins' },
  ];

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'all' || !selectedRole || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-500';
      case 'inactive':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'text-purple-500';
      case 'mess_owner':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <SafeAreaView
      className="flex-1 bg-gray-50 dark:bg-gray-900"
    >
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
            className="text-2xl font-bold mb-4 text-gray-900 dark:text-white"
          >
            User Management
          </Text>

          {/* Search Bar */}
          <View
            className="flex-row items-center mb-4 p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
          >
            <Icon
              name="magnify"
              size={20}
              color={isDarkMode ? '#9CA3AF' : '#6B7280'}
            />
            <TextInput
              className="flex-1 ml-2 text-gray-900 dark:text-white"
              placeholder="Search users..."
              placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Role Filter */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-4"
          >
            {roles.map((role) => (
              <TouchableOpacity
                key={role.id}
                onPress={() => setSelectedRole(role.id === 'all' ? null : role.id)}
                className={`mr-2 px-4 py-2 rounded-full ${
                  selectedRole === role.id || (!selectedRole && role.id === 'all')
                    ? 'bg-blue-500 dark:bg-blue-600'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <Text
                  className={`${
                    selectedRole === role.id || (!selectedRole && role.id === 'all')
                      ? 'text-white'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {role.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* User List */}
        <View className="p-4">
          {filteredUsers.map((user) => (
            <View
              key={user.id}
              className="mb-4 p-4 rounded-lg bg-white dark:bg-gray-800"
            >
              <View className="flex-row justify-between items-start mb-2">
                <View>
                  <Text
                    className="text-lg font-semibold text-gray-900 dark:text-white"
                  >
                    {user.name}
                  </Text>
                  <Text
                    className="text-gray-600 dark:text-gray-400"
                  >
                    {user.email}
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <Text
                    className={`mr-2 ${getStatusColor(user.status)}`}
                  >
                    {user.status}
                  </Text>
                  <TouchableOpacity>
                    <Icon
                      name="dots-vertical"
                      size={20}
                      color={isDarkMode ? '#9CA3AF' : '#6B7280'}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View className="flex-row justify-between items-center">
                <Text
                  className={`${
                    getRoleColor(user.role)
                  }`}
                >
                  {user.role.replace('_', ' ')}
                </Text>
                <Text
                  className="text-gray-600 dark:text-gray-400"
                >
                  Joined {user.joinedDate}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UsersScreen; 