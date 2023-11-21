import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {CustomText} from './CustomText';
import {IChipsProps} from './types';
import {TabIcon, VectorIcons} from '../navigations/TabIcon';
import {globalColors} from '../utils/globalColors';

export const CustomChips: React.FC<IChipsProps> = ({tag, backgroundColor}) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setIsSelected(prev => !prev)}
        style={[
          styles.container,
          {
            backgroundColor: isSelected
              ? backgroundColor
              : globalColors.chip_bg,
          },
        ]}>
        <TabIcon
          name="check"
          type={VectorIcons.Feather}
          size={15}
          props={{focused: false}}
          color={isSelected ? backgroundColor : globalColors.black}
          extraStyles={[
            styles.icon,
            {
              backgroundColor: isSelected
                ? globalColors.white
                : globalColors.black,
            },
          ]}
        />
        <CustomText extraStyles={styles.tag}>{tag}</CustomText>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingStart: 10,
    paddingEnd: 15,
    borderRadius: 50,
    margin: 5,
  },
  tag: {
    fontSize: 14,
  },
  icon: {
    alignSelf: 'center',
    padding: 1,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 7,
  },
});
