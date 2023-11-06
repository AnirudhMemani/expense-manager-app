import {TextStyle, ViewStyle} from 'react-native/types';

export type CustomTextProps = {
  children?: React.ReactNode;
  extraStyles?: ViewStyle | TextStyle;
};
