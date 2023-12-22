import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Row} from './Row';
import {useAppDispatch} from '../../redux/hooks';
import {globalColors} from '../../utils/globalColors';
import {CALCULATOR_OPERATORS} from './constants';
import CalculatorOperationsUtils from './calculation-operation';

export const ControlPanel = () => {
  const dispatch = useAppDispatch();
  const arr = [
    {
      label: 'C',
      onPress: () =>
        dispatch(
          CalculatorOperationsUtils.performOperation(
            CALCULATOR_OPERATORS.CLEAR,
          ),
        ),
      backgroundColor: globalColors.gray,
    },
    {
      label: '<=',
      onPress: () =>
        dispatch(
          CalculatorOperationsUtils.performOperation(
            CALCULATOR_OPERATORS.BACKSPACE,
          ),
        ),
      backgroundColor: globalColors.gray,
    },
    {
      label: '%',
      onPress: () =>
        dispatch(
          CalculatorOperationsUtils.performOperation(
            CALCULATOR_OPERATORS.PERCENTAGE,
          ),
        ),
      backgroundColor: globalColors.gray,
    },
  ];

  return (
    <>
      <Row props={arr} />
    </>
  );
};

const styles = StyleSheet.create({});
