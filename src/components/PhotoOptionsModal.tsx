import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Modal,
} from 'react-native';
import React from 'react';
import {CustomText} from './CustomText';
import {TabIcon, VectorIcons} from '../navigations/TabIcon';
import {globalColors} from '../utils/globalColors';
import {globalStyles} from '../utils/globalStyles';
import {IPhotoOptionsModalProps} from './types';

export const PhotoOptionsModal: React.FC<IPhotoOptionsModalProps> = ({
  onPressOptionOne,
  onPressOptionTwo,
  setIsPhotoOptionsVisible,
  isPhotoOptionsVisible,
}) => {
  const {height} = Dimensions.get('window');
  const modalHeight = Math.round(height * (13 / 100));

  return (
    <Modal
      visible={isPhotoOptionsVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setIsPhotoOptionsVisible(false)}>
      <TouchableOpacity
        style={{flex: 1, backgroundColor: globalColors.transparent}}
        activeOpacity={1}
        onPress={() => setIsPhotoOptionsVisible(false)}>
        <View />
      </TouchableOpacity>
      <View
        style={[
          styles.photoSelectionModel,
          {
            height: modalHeight,
          },
        ]}>
        <TouchableOpacity
          style={styles.photoSelectionOptions}
          onPress={onPressOptionOne}
          activeOpacity={0.5}>
          <TabIcon
            name="camera-plus"
            size={30}
            type={VectorIcons.MaterialCommunityIcons}
            color={globalColors.white}
            props={{focused: false}}
          />
          <CustomText extraStyles={styles.photoSelectionOptionsText}>
            Take Photo
          </CustomText>
        </TouchableOpacity>
        <Text style={styles.divider}>|</Text>
        <TouchableOpacity
          style={styles.photoSelectionOptions}
          onPress={onPressOptionTwo}
          activeOpacity={0.5}>
          <TabIcon
            name="insert-photo"
            size={30}
            type={VectorIcons.MaterialIcons}
            color={globalColors.white}
            props={{focused: false}}
          />
          <CustomText extraStyles={styles.photoSelectionOptionsText}>
            Choose From Gallery
          </CustomText>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  photoSelectionModel: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: globalColors.cards_bg,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    zIndex: 99,
  },
  photoSelectionOptions: {
    flex: 1,
    ...globalStyles.alignCenter,
  },
  photoSelectionOptionsText: {
    textAlign: 'center',
    color: globalColors.white,
    paddingTop: 5,
  },
  divider: {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 50,
    color: globalColors.inherit_darker,
    fontWeight: '100',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: globalColors.semi_transparent,
  },
});
