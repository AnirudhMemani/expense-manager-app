import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {IRowCellProps, Row} from './Row';
import {globalColors} from '../../utils/globalColors';
import {printLogs} from '../../utils/log-utils';
import CalculatorOperationsUtils from './calculation-operation';
import {useAppDispatch} from '../../redux/hooks';

export const NumbersPanel = () => {
  const [firstRow, setFirstRow] = useState<IRowCellProps[]>([]);
  const [secondRow, setSecondRow] = useState<IRowCellProps[]>([]);
  const [thirdRow, setThirdRow] = useState<IRowCellProps[]>([]);
  const [fourthRow, setFourthRow] = useState<IRowCellProps[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    let fourth = [
      {
        label: '',
        onPress: () => {},
        backgroundColor: globalColors.cards_bg,
        activeOpacity: 1,
      },
      {
        label: '0',
        onPress: () => {
          dispatch(CalculatorOperationsUtils.updateNumber('0'));
        },
        backgroundColor: globalColors.cards_bg,
      },
      {
        label: '.',
        onPress: () => {
          dispatch(CalculatorOperationsUtils.updateNumber('.'));
        },
        backgroundColor: globalColors.cards_bg,
      },
    ];

    let first = [];
    let second = [];
    let third = [];

    for (let i = 1; i <= 9; i++) {
      if (i <= 3) {
        third.push({
          label: `${i}`,
          onPress: () => {
            dispatch(CalculatorOperationsUtils.updateNumber(JSON.stringify(i)));
          },
          backgroundColor: globalColors.cards_bg,
        });
      } else if (i <= 6) {
        second.push({
          label: `${i}`,
          onPress: () => {
            dispatch(CalculatorOperationsUtils.updateNumber(JSON.stringify(i)));
          },
          backgroundColor: globalColors.cards_bg,
        });
      } else {
        first.push({
          label: `${i}`,
          onPress: () => {
            dispatch(CalculatorOperationsUtils.updateNumber(JSON.stringify(i)));
          },
          backgroundColor: globalColors.cards_bg,
        });
      }
    }

    setFirstRow(first);
    setSecondRow(second);
    setThirdRow(third);
    setFourthRow(fourth);
  }, []);

  return (
    <>
      {firstRow.length > 0 && <Row props={firstRow} />}
      {secondRow.length > 0 && <Row props={secondRow} />}
      {thirdRow.length > 0 && <Row props={thirdRow} />}
      {fourthRow.length > 0 && <Row props={fourthRow} />}
    </>
  );
};
