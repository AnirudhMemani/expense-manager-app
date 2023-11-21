import {TextInput} from 'react-native';
import {LegacyRef} from 'react';
import {TextStyle, ViewStyle} from 'react-native/types';
import {StyleProp} from 'react-native/types';

export type CustomTextProps = {
  children?: any;
  extraStyles?: StyleProp<ViewStyle | TextStyle>;
};

export interface IErrorMsgProps {
  extraStyles?: StyleProp<ViewStyle | TextStyle>;
  message: string;
}

export interface ITransactionRecordsProps {
  amount: number;
  note?: string;
  date: string;
  payment_mode: number;
}

export interface ITransactionProps {
  data: ITransactionRecordsProps[];
  isScrollable?: boolean;
}

export type TCustomTextInputProps = {
  reference?: LegacyRef<TextInput>;
  placeholder: string;
  maxLength?: number;
  extraStyles?: ViewStyle | TextStyle;
  autoFocus?: boolean;
  setIsInputEmpty?: React.Dispatch<React.SetStateAction<boolean>>;
  placeholderTintColor?: string;
  multiline?: boolean;
  numberOfLines?: number;
  setIsExceededCharLimit?: React.Dispatch<React.SetStateAction<boolean>>;
  defaultValue?: string;
  keyboardType?:
    | 'default'
    | 'numeric'
    | 'email-address'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'number-pad'
    | 'phone-pad'
    | 'name-phone-pad'
    | 'decimal-pad'
    | 'twitter'
    | 'web-search'
    | 'visible-password';
  returnKeyType?:
    | 'default'
    | 'go'
    | 'google'
    | 'join'
    | 'next'
    | 'route'
    | 'search'
    | 'send'
    | 'yahoo'
    | 'done'
    | 'emergency-call';
};

export interface IChipsProps {
  tag: string;
  backgroundColor: string;
}
