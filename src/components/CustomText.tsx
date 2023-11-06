import {StyleSheet, Text, View} from 'react-native';
import React, {Children} from 'react';
import {CustomTextProps} from './types';

export const CustomText: React.FC<CustomTextProps> = ({
  children,
  extraStyles,
}) => {
  return (
    <>
      <Text style={[styles.customTextStyles, extraStyles]}>{children}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  customTextStyles: {
    fontSize: 18,
    color: 'white',
  },
});
