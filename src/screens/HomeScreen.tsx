import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { Button } from '../components/common/Button';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

export const HomeScreen = memo(() => {
  return (
    <StyledView className="flex-1 p-4">
      <StyledText className="text-2xl font-bold text-text mb-4">Home Screen</StyledText>
      <Button title="Get Started" onPress={() => {}} />
    </StyledView>
  );
}); 