import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TBottomTabNavigationProps} from './types';
import Home from '../screens/Home/Home';
import {BOTTOM_NAV_ICONS, BOTTOM_NAV_SCREENS} from './constants';
import Analysis from '../screens/Analysis/Analysis';
import Accounts from '../screens/Accounts/Accounts';
import More from '../screens/More/More';
import {globalColors} from '../utils/globalColors';
import Icons from 'react-native-vector-icons/Ionicons';
import {TabIcon} from './TabIcon';

const BottomNavigation: React.FC = () => {
  const BottomTab = createBottomTabNavigator<TBottomTabNavigationProps>();
  return (
    <BottomTab.Navigator
      initialRouteName={BOTTOM_NAV_SCREENS.HOME}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: globalColors.button_active,
        tabBarInactiveTintColor: globalColors.button_inactive,
        tabBarInactiveBackgroundColor: globalColors.tab_bg_color,
        tabBarActiveBackgroundColor: globalColors.tab_bg_color,
      }}>
      <BottomTab.Screen
        name={BOTTOM_NAV_SCREENS.HOME}
        component={Home}
        options={{
          tabBarIcon: props => (
            <TabIcon props={props} name={BOTTOM_NAV_ICONS.HOME} />
          ),
        }}
      />
      <BottomTab.Screen
        name={BOTTOM_NAV_SCREENS.ANALYSIS}
        component={Analysis}
        options={{
          tabBarIcon: props => (
            <TabIcon props={props} name={BOTTOM_NAV_ICONS.ANALYSIS} />
          ),
        }}
      />
      <BottomTab.Screen
        name={BOTTOM_NAV_SCREENS.ACCOUNTS}
        component={Accounts}
        options={{
          tabBarIcon: props => (
            <TabIcon props={props} name={BOTTOM_NAV_ICONS.ACCOUNTS} />
          ),
        }}
      />
      <BottomTab.Screen
        name={BOTTOM_NAV_SCREENS.MORE}
        component={More}
        options={{
          tabBarIcon: props => (
            <TabIcon props={props} name={BOTTOM_NAV_ICONS.MORE} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomNavigation;
