import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {globalStyles} from '../../utils/globalStyles';
import {STACK_SCREENS} from '../../navigations/constants';
import {CustomText} from '../../components/CustomText';
import {RootStackNavigationProps} from '../../navigations/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {globalColors} from '../../utils/globalColors';

const Income: React.FC<{
  navigation: NativeStackNavigationProp<
    RootStackNavigationProps,
    STACK_SCREENS.EXPENSE
  >;
}> = ({navigation}) => {
  return (
    <View style={[globalStyles.container, globalStyles.alignCenter]}>
      <Text>Income</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate(STACK_SCREENS.EXPENSE)}
        style={styles.date}>
        <CustomText>Back Button visible</CustomText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  date: {
    padding: 15,
    marginTop: 25,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: globalColors.inherit,
  },
});

export default Income;
