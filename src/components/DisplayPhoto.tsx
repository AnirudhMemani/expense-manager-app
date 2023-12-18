import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {globalStyles} from '../utils/globalStyles';
import {RouteProp} from '@react-navigation/native';
import {RootStackNavigationProps} from '../navigations/types';
import {STACK_SCREENS} from '../navigations/constants';
import {printLogs} from '../utils/log-utils';
import {TabIcon, VectorIcons} from '../navigations/TabIcon';
import {globalColors} from '../utils/globalColors';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useAppSelector} from '../redux/hooks';

export const DisplayPhoto: React.FC<{
  navigation: NativeStackNavigationProp<
    RootStackNavigationProps,
    STACK_SCREENS.DISPLAY_PHOTO
  >;
}> = ({navigation}) => {
  const imageUri = useAppSelector(state => state.transaction.displayImageUri);
  printLogs('imageUri:', imageUri);
  return (
    <View style={[globalStyles.container, globalStyles.alignCenter]}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => navigation.goBack()}
        style={styles.closeImage}>
        <TabIcon
          name="close"
          props={{focused: false}}
          type={VectorIcons.MaterialIcons}
          size={25}
          color={globalColors.black}
        />
      </TouchableOpacity>
      <Image
        source={{uri: imageUri}}
        style={styles.imageStyles}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageStyles: {
    height: '80%',
    width: '100%',
  },
  closeImage: {
    position: 'absolute',
    top: 30,
    right: 20,
    padding: 5,
    backgroundColor: globalColors.white,
    borderRadius: 50,
  },
});
