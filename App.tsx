/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthNavigator } from './src/navigation/AuthNavigator';
import { MainNavigator } from './src/navigation/MainNavigator';
import { UserRole } from './src/types/auth';

export default function App() {
  const [userRole, setUserRole] = React.useState<UserRole | null>(null);

  return (
    <NavigationContainer>
      {userRole ? (
        <MainNavigator userRole={userRole} />
      ) : (
        <AuthNavigator onLogin={setUserRole} />
      )}
    </NavigationContainer>
  );
}