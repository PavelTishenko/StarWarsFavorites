import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';

import ListScreen from '@/screens/ListScreen';
import DetailsScreen from '@/screens/DetailsScreen';

export const enum Screens {
  LIST = 'list',
  DETAILS = 'details',
}

export type RootStackParamList = {
  [Screens.LIST]: undefined;
  [Screens.DETAILS]: { name: string };
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const theme = useTheme();
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName={Screens.LIST}
        screenOptions={{
          headerStyle: { backgroundColor: theme.colors.primary },
          headerTitleAlign: 'center',
          headerBackTitle: 'Search',
          headerTitleStyle: { color: theme.colors.background },
        }}>
        <RootStack.Screen
          name={Screens.LIST}
          component={ListScreen}
          options={{ headerTitle: 'List' }}
        />
        <RootStack.Screen
          name={Screens.DETAILS}
          component={DetailsScreen}
          options={{ headerTitle: 'Details' }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
