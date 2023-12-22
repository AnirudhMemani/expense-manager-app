import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CustomText} from '../../components/CustomText';
import {globalStyles} from '../../utils/globalStyles';

const More = () => {
  return (
    <View style={[globalStyles.container, globalStyles.alignCenter]}>
      <CustomText>Coming Soon...</CustomText>
    </View>
  );
};

const styles = StyleSheet.create({});

export default More;
