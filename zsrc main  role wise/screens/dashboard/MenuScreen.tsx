import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useUser } from '../../contexts/UserContext';
import { messService } from '../../services/api';

const { width } = Dimensions.get('window');

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string; // Assuming image is a URL string from backend
}

const MenuScreen = () => {
  const { isDarkMode } = useTheme();
  const { user } = useUser();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenu = async () => {
      if (!user || !user.messDetails?.id) {
        setLoading(false);
        setError('User is not associated with a mess.');
        return;
      }

      try {
        setLoading(true);
        const response = await messService.getMessMenu(user.messDetails.id);
        if (response.data) {
          setMenuItems(response.data.menu || []);
        } else {
          setError(response.message || 'Failed to fetch menu.');
        }
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch menu.');
        console.error('Failed to fetch menu:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [user]);

  if (loading) {
    return (
      <SafeAreaView className={`flex-1 items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Text className={isDarkMode ? 'text-white' : 'text-gray-900'}>Loading menu...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className={`flex-1 items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Text className={isDarkMode ? 'text-red-500' : 'text-red-700'}>Error: {error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className={`flex-1 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView className="flex-1 p-4">
        <Text className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Today's Menu
        </Text>
        <View className="space-y-4">
          {menuItems.length > 0 ? (menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              className={`flex-row items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-4 ${isDarkMode ? 'border border-gray-700' : ''}`}
            >
              <Image
                source={{ uri: item.image }}
                className="w-20 h-20 rounded-lg mr-4"
              />
              <View className="flex-1">
                <Text className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {item.name}
                </Text>
                <Text className={`text-gray-600 dark:text-gray-400 mb-2`}>
                  {item.description}
                </Text>
                <Text className={`text-blue-600 dark:text-blue-400 font-bold`}>
                  {item.price}
                </Text>
              </View>
              <TouchableOpacity className="bg-blue-600 rounded-full p-2 ml-4">
                <Icon name="plus" size={20} color="white" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))) : (
            <Text className={`text-gray-500 ${isDarkMode ? 'text-gray-400' : ''}`}>No menu items available for your mess.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MenuScreen; 