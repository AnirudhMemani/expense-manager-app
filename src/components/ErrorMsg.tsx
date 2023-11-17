import {StyleSheet} from 'react-native';
import {TextStyle, ViewStyle, StyleProp} from 'react-native/types';
import React from 'react';
import {CustomText} from './CustomText';
import {globalColors} from '../utils/globalColors';
import {IErrorMsgProps} from './types';

export const ErrorMsg: React.FC<IErrorMsgProps> = ({message, extraStyles}) => {
  return (
    <>
      <CustomText extraStyles={[styles.errorMsg, extraStyles]}>
        {message}
      </CustomText>
    </>
  );
};

const styles = StyleSheet.create({
  errorMsg: {
    color: globalColors.red,
    paddingHorizontal: 65,
  },
});
