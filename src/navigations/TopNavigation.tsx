import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {TOP_NAV_SCREENS} from './constants';
import Expense from '../screens/AddTransaction/Expense';
import Income from '../screens/AddTransaction/Income';
import Transfer from '../screens/AddTransaction/Transfer';

const Tab = createMaterialTopTabNavigator();

const TopNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name={TOP_NAV_SCREENS.EXPENSE} component={Expense} />
      <Tab.Screen name={TOP_NAV_SCREENS.INCOME} component={Income} />
      <Tab.Screen name={TOP_NAV_SCREENS.TRANSFER} component={Transfer} />
    </Tab.Navigator>
  );
};

export default TopNavigation;
