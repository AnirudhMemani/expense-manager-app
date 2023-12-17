import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CustomTextProps} from './types';
import {APP_SETTINGS} from '../utils/app-settings';

export const CustomText: React.FC<CustomTextProps> = ({
  children,
  extraStyles,
}) => {
  return (
    <>
      <Text
        style={[styles.customTextStyles, extraStyles]}
        maxFontSizeMultiplier={APP_SETTINGS.MAX_FONT_SIZE_MULTIPLIER}
        numberOfLines={APP_SETTINGS.NUMBER_OF_LINES}
        ellipsizeMode={'tail'}>
        {children}
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  customTextStyles: {
    fontSize: 16,
    color: 'white',
  },
});
