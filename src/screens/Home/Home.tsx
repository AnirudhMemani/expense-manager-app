import {
  Image,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
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
  dateFormatter,
  logoutAndNavigateToLogin,
} from '../../utils/constants';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {setLoadingStatus} from '../../redux/reducers/income-slice';
import {Loader} from '../../components/Loader';
import {globalStyles} from '../../utils/globalStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Floater} from '../../components/Floater';
import {globalColors} from '../../utils/globalColors';
import {Transactions} from '../../components/Transactions';
import firestore from '@react-native-firebase/firestore';

const Home: React.FC<{
  navigation: NativeStackNavigationProp<any, any>;
}> = ({navigation}) => {
  // <-- Context API -->
  const {commonMargin} = useGlobalContext();

  // <-- Redux -->
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.login.userInfo);

  // <-- Variables -->
  const dateObject = new Date();
  const hours = dateObject.getHours();
  const localeDate = dateFormatter(dateObject);
  const name = user.name;
  const pfp = user.photo ?? anonymouse_pfp;
  const balance = '20,000';
  const dummyData = [
    {
      amount: 100,
      note: 'Lorem ipsum dolor placeat quam ab nam, dolores nulla asperiores fugiat, quos rem eum vitae labore! Dolores animi tenetur deleniti totam, et quasi non incidunt!',
      date: localeDate,
      payment_mode: 1,
    },
    {
      amount: 500,
      note: 'cookies',
      date: localeDate,
      payment_mode: 2,
    },
    {
      amount: 1000,
      note: 'Lorem ipsum dolor placeat quam ab nam, dolores nulla asperiores fugiat, quos rem eum vitae labore! Dolores animi tenetur deleniti totam, et quasi non incidunt!',
      date: localeDate,
      payment_mode: 3,
    },
    {
      amount: 10,
      note: 'chips',
      date: localeDate,
      payment_mode: 4,
    },
  ];

  // <-- useStates -->
  const [greeting, setGreeting] = useState<string>();

  useEffect(() => {
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

  const testFireStore = async () => {
    const data = await firestore().collection('users').get();
    printLogs('User data:', data.docs[0].data().email);
  };

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
    <ScrollView
      style={globalStyles.container}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="on-drag">
      <View
        style={{
          flex: 1,
          marginHorizontal: commonMargin,
        }}>
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
          <CustomText extraStyles={{fontWeight: '600', fontSize: 18}}>
            This month
          </CustomText>
          <TouchableWithoutFeedback>
            <Ionicons name="search-sharp" size={25} color="#dcb85d" />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.floaterContainer}>
          {Floater(
            'rgba(208, 102, 122, 1)',
            'arrow-up-outline',
            COMMON_MSG.SPENDING,
            10.1,
          )}
          {Floater('#437746', 'arrow-down-outline', COMMON_MSG.INCOME)}
        </View>
        <View style={[globalStyles.alignCenter, {paddingVertical: 20}]}>
          <CustomText extraStyles={styles.balance_floater}>
            Balance{' '}
            {
              <MaterialCommunityIcon
                name="fast-forward"
                size={15}
                color="rgba(248, 248, 255, 0.8)"
              />
            }{' '}
            ₹{balance}
          </CustomText>
        </View>
        <View style={styles.search_container}>
          <CustomText extraStyles={{fontSize: 18}}>
            Recent transactions
          </CustomText>
          <TouchableWithoutFeedback>
            <CustomText extraStyles={{color: globalColors.button_active}}>
              See all
            </CustomText>
          </TouchableWithoutFeedback>
        </View>
        <Transactions data={dummyData} isScrollable={false} />
        <TouchableOpacity
          onPress={testFireStore}
          style={[styles.balance_floater, {marginVertical: 20}]}>
          <CustomText>Call FireStore</CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={logout}
          style={[styles.balance_floater, {marginVertical: 20}]}>
          <CustomText>Logout</CustomText>
        </TouchableOpacity>
      </View>
      <Loader />
    </ScrollView>
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
    marginVertical: 17,
  },
  floaterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balance_floater: {
    fontSize: 16,
    textAlign: 'center',
    borderRadius: 50,
    backgroundColor: globalColors.cards_bg,
    paddingVertical: 6,
    paddingHorizontal: 20,
    color: 'rgba(248, 248, 255, 0.8)',
  },
});

export default Home;
