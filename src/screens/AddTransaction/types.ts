import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {STACK_SCREENS} from '../../navigations/constants';
import {RootStackNavigationProps} from '../../navigations/types';

export type TAddExpensesProps = {
  navigation: NativeStackNavigationProp<
    RootStackNavigationProps,
    STACK_SCREENS.EXPENSE
  >;
};
