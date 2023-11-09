import {Image, View} from 'react-native';
import React, {useEffect} from 'react';
import {globalStyles} from '../../utils/globalStyles';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {STACK_SCREENS} from '../../navigations/constants';
import {EncryptedStorageUtils} from '../../utils/encrypted-storage-utils';
import {printLogs} from '../../utils/log-utils';
import {COMMON_MSG} from '../../utils/constants';
import {globalColors} from '../../utils/globalColors';

const Splash: React.FC<{
  navigation: NativeStackNavigationProp<any>;
}> = ({navigation}) => {
  useEffect(() => {
    getInitialRoute();
  }, []);

  const getInitialRoute = async () => {
    const IsLoggedIn = await EncryptedStorageUtils.getSigninRes();
    const initialRoute = IsLoggedIn
      ? STACK_SCREENS.BOTTOM_NAVIGATION
      : STACK_SCREENS.LOGIN;
    setTimeout(() => {
      printLogs(
        'Is user logged in:',
        IsLoggedIn ? COMMON_MSG.YES : COMMON_MSG.NO,
      );
      navigation.replace(initialRoute);
    }, 1500);
  };

  return (
    <View style={[globalStyles.container, globalStyles.alignCenter]}>
      <Image source={require('../../assets/Images/em_splash.png')} />
    </View>
  );
};

export default Splash;
