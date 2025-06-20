import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MessOwnerTabParamList } from '../../navigation/MainNavigator';
import { styled } from 'nativewind';
import Icon from 'react-native-vector-icons/MaterialIcons';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

type MessOwnerDashboardScreenNavigationProp = BottomTabNavigationProp<MessOwnerTabParamList>;

export const MessOwnerDashboardScreen = () => {
  const navigation = useNavigation<MessOwnerDashboardScreenNavigationProp>();

  const handleNavigation = (screen: keyof MessOwnerTabParamList) => {
    navigation.navigate(screen);
  };

  return (
    <StyledView className="flex-1 bg-white p-4">
      <StyledText className="text-2xl font-bold mb-6">Mess Owner Dashboard</StyledText>
      
      <StyledView className="space-y-4">
        <StyledTouchableOpacity
          className="bg-indigo-100 p-4 rounded-lg flex-row items-center"
          onPress={() => handleNavigation('Overview')}
        >
          <Icon name="analytics" size={24} color="#4F46E5" />
          <StyledText className="ml-3 text-lg text-indigo-600">Overview</StyledText>
        </StyledTouchableOpacity>

        <StyledTouchableOpacity
          className="bg-indigo-100 p-4 rounded-lg flex-row items-center"
          onPress={() => handleNavigation('Menu')}
        >
          <Icon name="restaurant-menu" size={24} color="#4F46E5" />
          <StyledText className="ml-3 text-lg text-indigo-600">Menu Management</StyledText>
        </StyledTouchableOpacity>

        <StyledTouchableOpacity
          className="bg-indigo-100 p-4 rounded-lg flex-row items-center"
          onPress={() => handleNavigation('Analytics')}
        >
          <Icon name="assessment" size={24} color="#4F46E5" />
          <StyledText className="ml-3 text-lg text-indigo-600">Analytics</StyledText>
        </StyledTouchableOpacity>

        <StyledTouchableOpacity
          className="bg-indigo-100 p-4 rounded-lg flex-row items-center"
          onPress={() => handleNavigation('Settings')}
        >
          <Icon name="settings" size={24} color="#4F46E5" />
          <StyledText className="ml-3 text-lg text-indigo-600">Settings</StyledText>
        </StyledTouchableOpacity>
      </StyledView>
    </StyledView>
  );
};
