import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {globalStyles} from '../../utils/globalStyles';
import {NewTransaction} from '../../components/NewTransaction';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const Transfer: React.FC<{navigation: NativeStackNavigationProp<any, any>}> = ({
  navigation,
}) => {
  return (
    <View style={[globalStyles.container, globalStyles.alignCenter]}>
      <NewTransaction navigation={navigation} />
    </View>
  );
};

export default Transfer;

const styles = StyleSheet.create({});
