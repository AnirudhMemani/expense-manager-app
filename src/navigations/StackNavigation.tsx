import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {STACK_SCREENS} from './constants';
import Splash from '../screens/Login/Splash';
import Login from '../screens/Login/Login';
import {RootStackNavigationProps} from './types';
import BottomNavigation from './BottomNavigation';

const Stack = createNativeStackNavigator<RootStackNavigationProps>();

const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={STACK_SCREENS.SPLASH}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={STACK_SCREENS.SPLASH} component={Splash} />
      <Stack.Screen name={STACK_SCREENS.LOGIN} component={Login} />
      <Stack.Screen
        name={STACK_SCREENS.BOTTOM_NAVIGATION}
        component={BottomNavigation}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
