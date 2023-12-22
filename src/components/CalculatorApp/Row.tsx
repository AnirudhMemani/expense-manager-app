import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {CustomText} from '../CustomText';
import {globalColors} from '../../utils/globalColors';
import {ViewStyle, TextStyle, StyleProp} from 'react-native/types';

export interface IRowCellProps {
  label: string;
  onPress: () => void;
  backgroundColor: string;
  activeOpacity?: number;
}

interface IRowProps {
  props: IRowCellProps[];
  extraStyles?: StyleProp<ViewStyle | TextStyle>;
}

export const Row: React.FC<IRowProps> = ({props, extraStyles}) => {
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
    flexDirection: 'row',
  },
  cellStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellContentStyles: {
    fontSize: 24,
    color: globalColors.white,
  },
});
