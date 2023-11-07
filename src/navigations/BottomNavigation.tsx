import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TBottomTabNavigationProps} from './types';
import Home from '../screens/Home/Home';
import {BOTTOM_NAV_ICONS, BOTTOM_NAV_SCREENS} from './constants';
import Analysis from '../screens/Analysis/Analysis';
import Accounts from '../screens/Accounts/Accounts';
import More from '../screens/More/More';
import {globalColors} from '../utils/globalColors';
import {TabIcon, VectorIcons} from './TabIcon';
import TopNavigation from './TopNavigation';
import BTabButton from '../screens/AddTransaction/BTabButton';

const BottomNavigation: React.FC = () => {
  const BottomTab = createBottomTabNavigator<TBottomTabNavigationProps>();
  return (
    <BottomTab.Navigator
      initialRouteName={BOTTOM_NAV_SCREENS.HOME}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: globalColors.tab_bg_color,
          height: 70,
          borderColor: globalColors.tab_bg_color,
        },
      }}>
      <BottomTab.Screen
        name={BOTTOM_NAV_SCREENS.HOME}
        component={Home}
        options={{
          tabBarIcon: props => (
            <TabIcon
              props={props}
              name={BOTTOM_NAV_ICONS.HOME}
              label={BOTTOM_NAV_SCREENS.HOME}
              type={VectorIcons.Entypo}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name={BOTTOM_NAV_SCREENS.ANALYSIS}
        component={Analysis}
        options={{
          tabBarIcon: props => (
            <TabIcon
              props={props}
              name={BOTTOM_NAV_ICONS.ANALYSIS}
              label={BOTTOM_NAV_SCREENS.ANALYSIS}
              type={VectorIcons.Entypo}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name={BOTTOM_NAV_SCREENS.ADD_TRANSACTIONS}
        component={TopNavigation}
        options={{
          tabBarIcon: props => (
            <TabIcon
              props={props}
              name={BOTTOM_NAV_ICONS.ADD_TRANSACTIONS}
              size={25}
              color={'black'}
              type={VectorIcons.Feather}
            />
          ),
          tabBarButton: props => <BTabButton {...props} />,
        }}
      />
      <BottomTab.Screen
        name={BOTTOM_NAV_SCREENS.ACCOUNTS}
        component={Accounts}
        options={{
          tabBarIcon: props => (
            <TabIcon
              props={props}
              name={BOTTOM_NAV_ICONS.ACCOUNTS}
              label={BOTTOM_NAV_SCREENS.ACCOUNTS}
              type={VectorIcons.Entypo}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name={BOTTOM_NAV_SCREENS.MORE}
        component={More}
        options={{
          tabBarIcon: props => (
            <TabIcon
              props={props}
              name={BOTTOM_NAV_ICONS.MORE}
              label={BOTTOM_NAV_SCREENS.MORE}
              type={VectorIcons.Entypo}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomNavigation;
