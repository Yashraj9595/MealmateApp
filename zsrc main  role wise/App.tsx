import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './contexts/ThemeContext';
import { CartProvider } from './contexts/CartContext';
import AppNavigator from './navigation/AppNavigator';

const App = () => {
  return (
    <ThemeProvider>
      <CartProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </CartProvider>
    </ThemeProvider>
  );
};

export default App; 