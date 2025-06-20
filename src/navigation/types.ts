import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type UserTabParamList = {
  Home: undefined;
  Menu: undefined;
  Bills: undefined;
  MessHub: undefined;
  Leave: undefined;
  Plan: undefined;
};

export type DashboardStackScreenProps<T extends keyof UserTabParamList> = 
  BottomTabScreenProps<UserTabParamList, T>; 