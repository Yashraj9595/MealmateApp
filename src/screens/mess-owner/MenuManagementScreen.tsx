import React from 'react';
import { View, Text } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

export const MenuManagementScreen = () => {
  return (
    <StyledView className="flex-1 bg-white dark:bg-gray-900 p-6">
      <StyledText className="text-2xl font-bold text-gray-900 dark:text-white">
        Menu Management
      </StyledText>
    </StyledView>
  );
};
