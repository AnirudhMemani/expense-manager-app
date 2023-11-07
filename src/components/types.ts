import {TextStyle, ViewStyle} from 'react-native/types';

export type CustomTextProps = {
  children?: React.ReactNode;
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
}
