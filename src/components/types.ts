import {TextStyle, ViewStyle} from 'react-native/types';

export type CustomTextProps = {
  children?: any;
  extraStyles?: ViewStyle | TextStyle;
};

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
  placeholder: string;
  maxLength?: number;
  extraStyles?: ViewStyle | TextStyle;
  autoFocus?: boolean;
  setIsInputEmpty?: React.Dispatch<React.SetStateAction<boolean>>;
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
