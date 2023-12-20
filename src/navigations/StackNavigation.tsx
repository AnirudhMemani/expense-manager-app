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
import {DisplayPhoto} from '../components/DisplayPhoto';
import TopNavigation from './TopNavigation';
import {globalColors} from '../utils/globalColors';

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
      <Stack.Screen
        name={STACK_SCREENS.DISPLAY_PHOTO}
        component={DisplayPhoto}
      />
      <Stack.Screen
        name={STACK_SCREENS.ADD_TRANSACTIONS}
        component={TopNavigation}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: globalColors.header_blue,
          },
          headerTintColor: globalColors.white,
          headerTitle: 'Add transaction',
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
