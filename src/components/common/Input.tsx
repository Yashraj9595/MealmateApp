import React, { memo } from 'react';
import { TextInput, Text, View, TextInputProps } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
  rightIcon?: React.ReactNode;
}

export const Input = memo(({ label, error, rightIcon, ...props }: InputProps) => {
  const borderColor = error ? 'border-red-500' : 'border-gray-300';
  
  return (
    <StyledView className="mb-4">
      <StyledText className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</StyledText>
      <StyledView className="relative">
        <StyledTextInput
          className={`border rounded-lg px-4 py-2 ${borderColor} text-gray-900 dark:text-white`}
        placeholderTextColor="#9CA3AF"
        {...props}
      />
        {rightIcon && (
          <StyledView className="absolute right-3 top-2">
            {rightIcon}
          </StyledView>
        )}
      </StyledView>
      {error && <StyledText className="text-red-500 text-sm mt-1">{error}</StyledText>}
    </StyledView>
  );
}); 