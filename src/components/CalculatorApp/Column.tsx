import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {CustomText} from '../CustomText';
import {globalColors} from '../../utils/globalColors';
import {ViewStyle, TextStyle, StyleProp} from 'react-native/types';

interface IColumnCellProps {
  label: string;
  onPress: () => void;
  backgroundColor: string;
  activeOpacity?: number;
}

interface IColumnProps {
  props: IColumnCellProps[];
  extraStyles?: StyleProp<ViewStyle | TextStyle>;
}

export const Column: React.FC<IColumnProps> = ({props, extraStyles}) => {
  return (
    <View style={styles.container}>
      {props.map((_, index) => {
        const activeOpacity = _.activeOpacity ?? 0.5;
        return (
          <TouchableOpacity
            key={_.label}
            activeOpacity={activeOpacity}
            onPress={_.onPress}
            style={[
              styles.cellStyles,
              {backgroundColor: _.backgroundColor},
              extraStyles,
            ]}>
            <CustomText extraStyles={styles.cellContentStyles}>
              {_.label}
            </CustomText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  cellStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellContentStyles: {
    fontSize: 24,
    color: globalColors.white,
    textAlign: 'center',
  },
});
