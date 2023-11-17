import React, {useEffect} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {STACK_SCREENS} from './constants';

const TopNavigation: React.FC<{navigation: NativeStackNavigationProp<any>}> = ({
  navigation,
}) => {
  useEffect(() => {
    navigation.replace(STACK_SCREENS.EXPENSE);
  }, []);
  return <></>;
};

export default TopNavigation;
