import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Column} from './Column';
import {globalColors} from '../../utils/globalColors';
import CalculatorOperationsUtils from './calculation-operation';
import {CALCULATOR_OPERATORS} from './constants';
import {useAppDispatch} from '../../redux/hooks';

export const OperatorSidebar = () => {
  const dispatch = useAppDispatch();
  let arr = [
    {
      label: '÷',
      onPress: () =>
        dispatch(
          CalculatorOperationsUtils.performOperation(
            CALCULATOR_OPERATORS.DIVISION,
          ),
        ),
      backgroundColor: globalColors.inherit_darker,
    },
    {
      label: 'x',
      onPress: () =>
        dispatch(
          CalculatorOperationsUtils.performOperation(
            CALCULATOR_OPERATORS.MULTIPLICATION,
          ),
        ),
      backgroundColor: globalColors.inherit_darker,
    },
    {
      label: '-',
      onPress: () =>
        dispatch(
          CalculatorOperationsUtils.performOperation(
            CALCULATOR_OPERATORS.SUBTRACTION,
          ),
        ),
      backgroundColor: globalColors.inherit_darker,
    },
    {
      label: '+',
      onPress: () =>
        dispatch(
          CalculatorOperationsUtils.performOperation(
            CALCULATOR_OPERATORS.ADDITION,
          ),
        ),
      backgroundColor: globalColors.inherit_darker,
    },
    {
      label: '=',
      onPress: () =>
        dispatch(
          CalculatorOperationsUtils.performOperation(
            CALCULATOR_OPERATORS.EQUALS,
          ),
        ),
      backgroundColor: globalColors.inherit_darker,
    },
  ];
  return (
    <>
      <Column props={arr} />
    </>
  );
};
