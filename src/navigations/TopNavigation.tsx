import React from 'react';
import {TOP_NAV_SCREENS} from './constants';
import {TTopTabNavigationProps} from './types';
import Expense from '../screens/AddTransaction/Expense';
import Income from '../screens/AddTransaction/Income';
import Transfer from '../screens/AddTransaction/Transfer';
import {TabBar} from '../components/TabBar';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {globalColors} from '../utils/globalColors';

const TOP_TAB = createMaterialTopTabNavigator<TTopTabNavigationProps>();

const TopNavigation = () => {
  return (
    <TOP_TAB.Navigator
      initialRouteName={TOP_NAV_SCREENS.EXPENSE}
      screenOptions={{
        animationEnabled: false,
      }}
      tabBar={props => <TabBar {...props} />}>
      <TOP_TAB.Screen name={TOP_NAV_SCREENS.EXPENSE} component={Expense} />
      <TOP_TAB.Screen name={TOP_NAV_SCREENS.INCOME} component={Income} />
      <TOP_TAB.Screen name={TOP_NAV_SCREENS.TRANSFER} component={Transfer} />
    </TOP_TAB.Navigator>
  );
};

export default TopNavigation;
