import {Image, StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CustomText} from '../../components/CustomText';
import {useGlobalContext} from '../../components/ContextProvider';
import {printLogs} from '../../utils/log-utils';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {STACK_SCREENS} from '../../navigations/constants';
import {AlertWithTwoActionableOptions} from '../../utils/alert-utils';
import {LOGIN_MSG} from '../Login/constants';
import {
  anonymouse_pfp,
  COMMON_MSG,
  logoutAndNavigateToLogin,
} from '../../utils/constants';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {setLoadingStatus} from '../../redux/reducers/income-slice';
import {Loader} from '../../components/Loader';
import {globalStyles} from '../../utils/globalStyles';
import Icons from 'react-native-vector-icons/Ionicons';
import {Floater} from '../../components/Floater';

const Home: React.FC<{
  navigation: NativeStackNavigationProp<any, any>;
}> = ({navigation}) => {
  // <-- Context API -->
  const {commonMargin} = useGlobalContext();

  // <-- Redux -->
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.login.userInfo);

  // <-- Variables -->
  const date = new Date();
  const hours = date.getHours();
  const name = user.name;
  const pfp = user.photo ? user.photo : anonymouse_pfp;

  // <-- useStates -->
  const [greeting, setGreeting] = useState<string>();

  useEffect(() => {
    console.log(hours);
    if (hours >= 6 && hours < 12) {
      setGreeting('Good Morning');
    } else if (hours >= 12 && hours < 17) {
      setGreeting('Good Afternoon');
    } else if (hours >= 17 && hours <= 23) {
      setGreeting('Good Evening');
    } else {
      setGreeting('Hello');
    }
  }, [hours]);

  // <-- Logout testing -->
  const logout = async () => {
    try {
      dispatch(setLoadingStatus(true));
      AlertWithTwoActionableOptions(
        '',
        LOGIN_MSG.USER_LOGOUT,
        COMMON_MSG.YES,
        COMMON_MSG.NO,
        true,
        async executeAction => {
          if (executeAction) {
            await logoutAndNavigateToLogin(navigation);
          }
        },
      );
    } catch (error) {
      printLogs(
        'There was an error while trying to logout. The error is as follows:',
        error,
      );
      navigation.reset({
        index: 0,
        routes: [{name: STACK_SCREENS.LOGIN}],
      });
    } finally {
      dispatch(setLoadingStatus(false));
    }
  };

  // <-- Activity -->
  return (
    <View style={globalStyles.container}>
      <View style={{marginHorizontal: commonMargin}}>
        <View style={styles.search_container}>
          <View>
            <CustomText>{greeting}</CustomText>
            <CustomText extraStyles={{fontSize: 20}}>{name}</CustomText>
          </View>
          <View>
            <Image source={{uri: pfp}} style={styles.pfp} />
          </View>
        </View>
        <View style={styles.search_container}>
          <CustomText extraStyles={{fontWeight: '600'}}>This month</CustomText>
          <TouchableWithoutFeedback>
            <Icons name="search-sharp" size={25} color="#dcb85d" />
          </TouchableWithoutFeedback>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {Floater(
            'rgba(208, 102, 122, 1)',
            'arrow-up-outline',
            COMMON_MSG.SPENDING,
            10.12,
          )}
          {Floater('#437746', 'arrow-down-outline', COMMON_MSG.INCOME)}
        </View>
      </View>
      <Loader />
    </View>
  );
};

// <-- Styles -->
const styles = StyleSheet.create({
  pfp: {
    height: 45,
    width: 45,
    borderRadius: 50,
    ...globalStyles.alignCenter,
  },
  search_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
});

export default Home;
