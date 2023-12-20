import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {CustomText} from './CustomText';
import {globalColors} from '../utils/globalColors';
import {StyleProp, ViewStyle, TextStyle} from 'react-native/types';

interface ITabButtonProps {
  title: string;
  isActive: boolean;
  onPress?: () => void;
  extraStyles?: StyleProp<ViewStyle | TextStyle>;
}

export const TabButton: React.FC<ITabButtonProps> = ({
  title,
  onPress,
  isActive,
  extraStyles,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button_styles,
        {
          backgroundColor: isActive
            ? globalColors.gray
            : globalColors.transparent,
        },
        extraStyles,
      ]}
      activeOpacity={1}
      onPress={onPress}>
      <CustomText>{title}</CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button_styles: {
    flex: 1,
    alignItems: 'center',
    padding: 7,
    borderRadius: 15,
  },
});
