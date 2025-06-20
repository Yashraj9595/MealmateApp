// src/components/CustomTabBar.tsx
import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { styled } from 'nativewind';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const StyledView = styled(View);
const StyledPressable = styled(Pressable);
const StyledText = styled(Text);

const icons: Record<string, string> = {
  Dashboard: 'home',
  MessHub: 'restaurant',
  Booking: 'event',
  Bills: 'receipt',
  Plan: 'calendar-today',
  Leave: 'logout',
  Overview: 'analytics',
  Menu: 'restaurant-menu',
  Analytics: 'assessment',
  Settings: 'settings',
  Messes: 'restaurant',
  Reports: 'assessment',
  AdminManagement: 'admin-panel-settings',
  Profile: 'person',
  Search: 'search',
  Chat: 'chat',
  Games: 'sports-esports',
};

export const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  return (
    <StyledView className="flex-row justify-center items-center bg-white mx-4 my-2 rounded-2xl p-2 shadow-lg">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <StyledPressable
            key={route.key}
            onPress={onPress}
            className={`flex-row items-center mx-1 px-2 h-12 rounded-xl transition-all duration-200 ${
              isFocused ? 'bg-gray-200 w-32' : 'bg-transparent w-12'
            }`}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
          >
            <MaterialIcons
              name={icons[route.name] || 'circle'}
              size={28}
              color={isFocused ? '#000' : '#222'}
            />
            {isFocused && typeof label === 'string' && (
              <StyledText className="ml-2 text-sm font-medium text-black">{label}</StyledText>
            )}
          </StyledPressable>
        );
      })}
    </StyledView>
  );
};