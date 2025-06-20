import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { UserTabParamList } from '../../navigation/MainNavigator';
import { styled } from 'nativewind';
import Icon from 'react-native-vector-icons/MaterialIcons';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

type UserDashboardScreenNavigationProp = BottomTabNavigationProp<UserTabParamList>;

export const UserDashboardScreen = () => {
  const navigation = useNavigation<UserDashboardScreenNavigationProp>();

  const handleNavigation = (screen: keyof UserTabParamList) => {
    navigation.navigate(screen);
  };

  return (
    <StyledView className="flex-1 bg-white p-4">
      <StyledText className="text-2xl font-bold mb-6">Welcome to MealMate</StyledText>
      
      <StyledView className="space-y-4">
        <StyledTouchableOpacity
          className="bg-indigo-100 p-4 rounded-lg flex-row items-center"
          onPress={() => handleNavigation('MessHub')}
        >
          <Icon name="restaurant" size={24} color="#4F46E5" />
          <StyledText className="ml-3 text-lg text-indigo-600">Mess Hub</StyledText>
        </StyledTouchableOpacity>

        <StyledTouchableOpacity
          className="bg-indigo-100 p-4 rounded-lg flex-row items-center"
          onPress={() => handleNavigation('Booking')}
        >
          <Icon name="event" size={24} color="#4F46E5" />
          <StyledText className="ml-3 text-lg text-indigo-600">Book a Meal</StyledText>
        </StyledTouchableOpacity>

        <StyledTouchableOpacity
          className="bg-indigo-100 p-4 rounded-lg flex-row items-center"
          onPress={() => handleNavigation('Bills')}
        >
          <Icon name="receipt" size={24} color="#4F46E5" />
          <StyledText className="ml-3 text-lg text-indigo-600">View Bills</StyledText>
        </StyledTouchableOpacity>

        <StyledTouchableOpacity
          className="bg-indigo-100 p-4 rounded-lg flex-row items-center"
          onPress={() => handleNavigation('Plan')}
        >
          <Icon name="calendar-today" size={24} color="#4F46E5" />
          <StyledText className="ml-3 text-lg text-indigo-600">Meal Plan</StyledText>
        </StyledTouchableOpacity>
      </StyledView>
    </StyledView>
  );
};
