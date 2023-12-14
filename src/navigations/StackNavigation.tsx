import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {STACK_SCREENS} from './constants';
import Splash from '../screens/Login/Splash';
import Login from '../screens/Login/Login';
import {RootStackNavigationProps} from './types';
import BottomNavigation from './BottomNavigation';
import Expense from '../screens/AddTransaction/Expense';
import Income from '../screens/AddTransaction/Income';
import Transfer from '../screens/AddTransaction/Transfer';
import {ShowCamera} from '../components/ShowCamera';
import {ShowPhoto} from '../components/ShowPhoto';

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
      <Stack.Screen name={STACK_SCREENS.EXPENSE} component={Expense} />
      <Stack.Screen name={STACK_SCREENS.INCOME} component={Income} />
      <Stack.Screen name={STACK_SCREENS.TRANSFER} component={Transfer} />
      <Stack.Screen name={STACK_SCREENS.OPEN_CAMERA} component={ShowCamera} />
      <Stack.Screen name={STACK_SCREENS.SHOW_PHOTO} component={ShowPhoto} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
