import React, { createContext, useContext, useState } from 'react';
import { ActivityIndicator, View, Animated } from 'react-native';

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    if (isLoading) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [isLoading, fadeAnim]);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
      <Animated.View 
        pointerEvents={isLoading ? 'auto' : 'none'}
        style={{
          opacity: fadeAnim,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View className="bg-white dark:bg-slate-800 rounded-lg p-4">
          <ActivityIndicator size="large" color="#0EA5E9" />
        </View>
      </Animated.View>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}; 