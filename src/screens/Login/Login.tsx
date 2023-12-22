import {StyleSheet, View, TouchableOpacity, Image, Button} from 'react-native';
import React, {useEffect} from 'react';
import {globalStyles} from '../../utils/globalStyles';
import {CustomText} from '../../components/CustomText';
import {useGlobalContext} from '../../components/ContextProvider';
import {globalColors} from '../../utils/globalColors';
import {TLoginProps, TSigninResProps} from './types';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {SimpleAlert} from '../../utils/alert-utils';
import {LOGIN_MSG} from './constants';
import {printLogs} from '../../utils/log-utils';
import {EncryptedStorageUtils} from '../../utils/encrypted-storage-utils';
import {STACK_SCREENS} from '../../navigations/constants';
import {useAppDispatch} from '../../redux/hooks';
import {setLoadingStatus} from '../../redux/reducers/income-slice';
import {Loader} from '../../components/Loader';
import {setSigninResp} from '../../redux/reducers/login-slice';

const Login: React.FC<TLoginProps> = ({navigation}) => {
  const {commonMargin, commonSpace} = useGlobalContext();
  const dispatch = useAppDispatch();

  const googleSignAuthentication = async () => {
    const TAG = googleSignAuthentication.name;
    try {
      dispatch(setLoadingStatus(true));
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const userData: TSigninResProps = await GoogleSignin.signIn();
      const isLoggedIn = await EncryptedStorageUtils.setSigninRes(userData);
      dispatch(setSigninResp(userData));
      const googleCredential = auth.GoogleAuthProvider.credential(
        userData.idToken,
      );
      auth().signInWithCredential(googleCredential);
      if (isLoggedIn) {
        navigation.reset({
          index: 0,
          routes: [{name: STACK_SCREENS.BOTTOM_NAVIGATION}],
        });
      }
    } catch (error: any) {
      if (error.code === statusCodes.IN_PROGRESS) {
        SimpleAlert('', LOGIN_MSG.IN_PROGRESS);
      } else if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // User cancelled the login flow
      } else if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // The user has not signed into google yet
      } else {
        printLogs(TAG, '| failed with error:', error);
        SimpleAlert('', LOGIN_MSG.ERR);
      }
    } finally {
      dispatch(setLoadingStatus(false));
    }
  };

  const guestSignin = async () => {
    const TAG = guestSignin.name;
    try {
      dispatch(setLoadingStatus(true));
      const anonymouseUser = await auth().signInAnonymously();
      printLogs(TAG, '| successful:', anonymouseUser);
      navigation.reset({
        index: 0,
        routes: [{name: STACK_SCREENS.BOTTOM_NAVIGATION}],
      });
    } catch (error) {
      printLogs(TAG, '| failed with error:', error);
      SimpleAlert('', LOGIN_MSG.ERR);
    } finally {
      dispatch(setLoadingStatus(false));
    }
  };

  return (
    <View
      style={[
        globalStyles.container,
        {backgroundColor: globalColors.header_blue},
      ]}>
      <View style={[styles.contentContainer, {margin: commonMargin}]}>
        <CustomText
          extraStyles={{
            fontSize: 35,
            textAlign: 'left',
            paddingVertical: 35,
            fontWeight: '500',
          }}>
          Welcome!
        </CustomText>
        <CustomText extraStyles={{fontSize: 20, paddingBottom: 5}}>
          Manage your expenses
        </CustomText>
        <CustomText extraStyles={{fontSize: 25, fontWeight: '800'}}>
          seamlessly & intuitively
        </CustomText>
      </View>
      <View
        style={[
          styles.buttonsContainer,
          {
            marginHorizontal: commonMargin,
            marginBottom: commonMargin,
          },
        ]}>
        <TouchableOpacity
          activeOpacity={1}
          style={[
            styles.button,
            {
              padding: commonSpace,
              marginVertical: commonSpace,
              borderWidth: 1,
              borderColor: globalColors.header_blue,
              shadowColor: globalColors.cyan,
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.5,
              shadowRadius: 2,
              elevation: 6,
            },
          ]}
          onPress={googleSignAuthentication}>
          <Image
            source={require('../../assets/icons/em.google.png')}
            style={styles.logoStyles}
          />
          <CustomText extraStyles={{color: 'black', fontSize: 20}}>
            Sign in with Google
          </CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={[
            styles.button,
            {
              backgroundColor: globalColors.guest_btn_bg_blue,
              borderWidth: 1,
              borderColor: globalColors.cyan,
              padding: commonSpace,
              marginVertical: commonSpace,
              shadowColor: globalColors.cyan,
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.5,
              shadowRadius: 12,
              elevation: 6,
            },
          ]}
          onPress={guestSignin}>
          <CustomText extraStyles={{color: 'white', fontSize: 20}}>
            Login as Guest
          </CustomText>
        </TouchableOpacity>
      </View>
      <Loader />
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 3,
    justifyContent: 'flex-end',
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  logoStyles: {
    height: 25,
    width: 25,
    marginRight: 15,
  },
  button: {
    flexDirection: 'row',
    ...globalStyles.alignCenter,
    borderRadius: 50,
    backgroundColor: 'white',
  },
});

export default Login;
