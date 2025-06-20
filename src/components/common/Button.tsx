import React, { memo } from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';
import { styled } from 'nativewind';

const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary';
}

export const Button = memo(({ title, variant = 'primary', ...props }: ButtonProps) => {
  const bgColor = variant === 'primary' ? 'bg-primary' : 'bg-secondary';
  
  return (
    <StyledTouchableOpacity
      className={`px-4 py-2 rounded-lg ${bgColor}`}
      {...props}
    >
      <StyledText className="text-white font-semibold text-center">{title}</StyledText>
    </StyledTouchableOpacity>
  );
}); 