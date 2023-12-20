import {StyleSheet, View, Pressable, TouchableOpacity} from 'react-native';
import React from 'react';
import {globalColors} from '../../utils/globalColors';
import {
  BottomTabBarButtonProps,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import {BOTTOM_NAV_SCREENS, STACK_SCREENS} from '../../navigations/constants';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const BTabButton = (
  props: BottomTabBarButtonProps,
  navigation: NativeStackNavigationProp<any, any>,
) => {
  const {children, onPress} = props;
  return (
    <Pressable
      style={styles.container}
      onPress={() => navigation.navigate(STACK_SCREENS.ADD_TRANSACTIONS)}>
      <View style={styles.button}>{children}</View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    bottom: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: globalColors.yellow,
  },
});

export default BTabButton;
