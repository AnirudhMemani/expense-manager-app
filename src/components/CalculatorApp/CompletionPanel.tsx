import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {TabButton} from '../TabButton';
import {CustomText} from '../CustomText';
import {globalColors} from '../../utils/globalColors';

interface ICompletionPanelProps {
  onPressPositive: () => void;
  onPressNegative: () => void;
}

export const CompletionPanel: React.FC<ICompletionPanelProps> = ({
  onPressPositive,
  onPressNegative,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPressNegative}
        style={styles.buttonStyles}>
        <CustomText extraStyles={styles.buttonTextStyles}>Cancel</CustomText>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPressPositive}
        style={styles.buttonStyles}>
        <CustomText extraStyles={styles.buttonTextStyles}>Done</CustomText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderColor: globalColors.inherit_lighter,
  },
  buttonStyles: {
    padding: 10,
  },
  buttonTextStyles: {
    fontSize: 18,
    color: globalColors.yellow,
  },
});
