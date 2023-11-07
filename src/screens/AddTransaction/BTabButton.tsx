import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import React from 'react';
import {globalColors} from '../../utils/globalColors';
import {BottomTabBarButtonProps} from '@react-navigation/bottom-tabs';

const BTabButton = (props: BottomTabBarButtonProps) => {
  const {children, onPress} = props;
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      onPress={onPress}>
      <View style={styles.button}>{children}</View>
    </TouchableOpacity>
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
