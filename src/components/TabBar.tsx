import {StyleSheet, View} from 'react-native';
import React from 'react';
import {TabButton} from './TabButton';
import {globalColors} from '../utils/globalColors';
import {MaterialTopTabBarProps} from '@react-navigation/material-top-tabs';
import {printLogs} from '../utils/log-utils';

export const TabBar = (props: MaterialTopTabBarProps) => {
  const {state, descriptors, navigation, layout, position, jumpTo} = props;

  const onPress = (routeName: string) => {
    const isCurrentTab = routeName === state.routes[state.index].name;
    printLogs('isCurrentTab:', isCurrentTab);
    if (!isCurrentTab) {
      navigation.navigate(routeName);
    }
  };

  return (
    <View style={styles.tabBar}>
      <View style={styles.tabBar_content}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          printLogs('options:', options);
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          return (
            <TabButton
              key={route.key}
              title={label.toString()}
              onPress={() => onPress(route.name)}
              isActive={index === state.index}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: globalColors.black,
  },
  tabBar_content: {
    flex: 1,
    backgroundColor: globalColors.cards_bg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 15,
  },
});
