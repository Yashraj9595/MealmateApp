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

const MessesScreen = () => {
  const { isDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  // Mock data - replace with actual API call
  const messes = [
    {
      id: '1',
      name: 'Delicious Mess',
      owner: 'Jane Smith',
      location: 'Downtown',
      status: 'active',
      members: 45,
      rating: 4.5,
    },
    {
      id: '2',
      name: 'Home Kitchen',
      owner: 'Mike Johnson',
      location: 'Uptown',
      status: 'pending',
      members: 0,
      rating: 0,
    },
    {
      id: '3',
      name: 'Tasty Bites',
      owner: 'Sarah Wilson',
      location: 'Westside',
      status: 'suspended',
      members: 30,
      rating: 4.2,
    },
  ];

  const statuses = [
    { id: 'all', label: 'All' },
    { id: 'active', label: 'Active' },
    { id: 'pending', label: 'Pending' },
    { id: 'suspended', label: 'Suspended' },
  ];

  const filteredMesses = messes.filter((mess) => {
    const matchesSearch =
      mess.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mess.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mess.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || !selectedStatus || mess.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-500';
      case 'pending':
        return 'text-yellow-500';
      case 'suspended':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#111827' : '#F9FAFB'}
      />
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="p-4 bg-white dark:bg-gray-800">
          <Text
            className="text-2xl font-bold mb-4 text-gray-900 dark:text-white"
          >
            Mess Management
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
              placeholder="Search messes..."
              placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Status Filter */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-4"
          >
            {statuses.map((status) => (
              <TouchableOpacity
                key={status.id}
                onPress={() => setSelectedStatus(status.id === 'all' ? null : status.id)}
                className={`mr-2 px-4 py-2 rounded-full ${
                  selectedStatus === status.id || (!selectedStatus && status.id === 'all')
                    ? 'bg-blue-500 dark:bg-blue-600'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <Text
                  className={`${
                    selectedStatus === status.id || (!selectedStatus && status.id === 'all')
                      ? 'text-white'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {status.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Mess List */}
        <View className="p-4">
          {filteredMesses.map((mess) => (
            <View
              key={mess.id}
              className="mb-4 p-4 rounded-lg bg-white dark:bg-gray-800"
            >
              <View className="flex-row justify-between items-start mb-2">
                <View>
                  <Text
                    className="text-lg font-semibold text-gray-900 dark:text-white"
                  >
                    {mess.name}
                  </Text>
                  <Text
                    className="text-gray-600 dark:text-gray-400"
                  >
                    {mess.location}
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <Text
                    className={`mr-2 ${getStatusColor(mess.status)}`}
                  >
                    {mess.status}
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
                  className="text-gray-600 dark:text-gray-400"
                >
                  Owner: {mess.owner}
                </Text>
                <View className="flex-row items-center">
                  <Icon
                    name="account-group"
                    size={16}
                    color={isDarkMode ? '#9CA3AF' : '#6B7280'}
                  />
                  <Text
                    className="ml-1 text-gray-600 dark:text-gray-400"
                  >
                    {mess.members}
                  </Text>
                  {mess.rating > 0 && (
                    <>
                      <Icon
                        name="star"
                        size={16}
                        color="#F59E0B"
                        className="ml-2"
                      />
                      <Text
                        className="ml-1 text-gray-600 dark:text-gray-400"
                      >
                        {mess.rating}
                      </Text>
                    </>
                  )}
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MessesScreen; 