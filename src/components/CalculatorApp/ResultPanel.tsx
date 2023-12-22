import {StyleSheet, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {CustomText} from '../CustomText';
import {globalColors} from '../../utils/globalColors';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {
  setCurrentValue,
  setOperationRecords,
} from '../../redux/reducers/transaction-slice';

// For western style comma regex: {operationRecords.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}

export const ResultPanel = () => {
  // <-- Redux -->
  const transactionAmount =
    useAppSelector(state => state.transaction.transactionAmount) || '';
  const operationRecords =
    useAppSelector(state => state.transaction.operationRecords) || '';
  const currentValue = useAppSelector(state => state.transaction.currentValue);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCurrentValue(transactionAmount));
    dispatch(setOperationRecords(''));
  }, []);

  const formatNumberWithCommas = (value: string, SkipCheck?: boolean) => {
    if (value.length > 0) {
      return value.replace(/(\d)(?=(\d\d)+\d$)/g, '$1,');
    } else {
      if (!SkipCheck) return '0';
      return '';
    }
  };

  return (
    <View style={styles.container}>
      <CustomText extraStyles={styles.computationTextStyles}>
        {`${operationRecords}${formatNumberWithCommas(currentValue)}`}
      </CustomText>
      <CustomText extraStyles={styles.totalValueTextStyles}>
        {formatNumberWithCommas(transactionAmount)}
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    alignItems: 'flex-end',
    borderBottomWidth: 0.5,
    borderBottomColor: globalColors.inherit_light,
    paddingBottom: 5,
  },
  computationTextStyles: {
    fontSize: 24,
    color: globalColors.white,
    padding: 10,
  },
  totalValueTextStyles: {
    color: globalColors.inherit_light,
    paddingHorizontal: 5,
  },
});
