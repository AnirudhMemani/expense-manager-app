import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {STACK_SCREENS} from '../../navigations/constants';
import {RootStackNavigationProps} from '../../navigations/types';

export type TLoginProps = {
  navigation: NativeStackNavigationProp<
    RootStackNavigationProps,
    STACK_SCREENS.LOGIN
  >;
};

export type TUserInfoProps = {
  id: string;
  name: string | null;
  email: string;
  photo: string | null;
  familyName: string | null;
  givenName: string | null;
};

export type TSigninResProps = {
  idToken: string | null;
  scopes?: string[] | undefined;
  serverAuthCode: string | null;
  user: TUserInfoProps;
};
