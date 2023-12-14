import {View} from 'react-native';
import React from 'react';
import {globalStyles} from '../../utils/globalStyles';
import {NewTransaction} from '../../components/NewTransaction';
import {TAddExpensesProps} from './types';

const Expense: React.FC<TAddExpensesProps> = ({navigation}) => {
  return (
    <View style={globalStyles.container}>
      <NewTransaction navigation={navigation} />
    </View>
  );
};

export default Expense;
