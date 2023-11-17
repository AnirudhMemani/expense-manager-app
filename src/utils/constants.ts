import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {STACK_SCREENS} from '../navigations/constants';
import {EncryptedStorageUtils} from './encrypted-storage-utils';
import {printLogs} from './log-utils';
import auth from '@react-native-firebase/auth';
import {CalendarDate} from 'react-native-paper-dates/lib/typescript/Date/Calendar';

export enum COMMON_MSG {
  YES = 'Yes',
  NO = 'No',
  CANCEL = 'Cancel',
  OK = 'Ok',
  EMPTY = '',
  NOTAVAILABLE = 'N/A',
  SPENDING = 'Spending',
  INCOME = 'Income',
  NOT_SPECIFIED = 'Not specified',
}

export enum ERROR_MESSAGE {
  EMPTY_TEXT_INPUT = "Amount can't be empty!",
  TRANSACTION_AMT_EXCEEDED = 'Amount must be less than 10000000000',
  NOTE_LIMIT_EXCEEDED = 'Note must not exceed 500 characters!',
}

export const logoutAndNavigateToLogin = async (
  navigation: NativeStackNavigationProp<any, any>,
) => {
  const TAG = logoutAndNavigateToLogin.name;
  try {
    await EncryptedStorageUtils.clearEncryptedStorage();
    await GoogleSignin.signOut();
    await auth().signOut();
    printLogs(TAG, '| successful');
    navigation.reset({
      index: 0,
      routes: [{name: STACK_SCREENS.LOGIN}],
    });
  } catch (error) {
    printLogs('There was an error while trying to ' + TAG + ':', error);
    navigation.reset({
      index: 0,
      routes: [{name: STACK_SCREENS.LOGIN}],
    });
  }
};

export const anonymouse_pfp =
  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

export const dateFormatter = (
  date: Date | CalendarDate,
  yearFormatType?: '2-digit' | 'numeric' | undefined,
) => {
  const formater = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: yearFormatType ?? '2-digit',
  });
  return formater.format(date);
};
