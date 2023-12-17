import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  BackHandler,
  TouchableWithoutFeedback,
  Animated,
  Easing,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {CustomText} from './CustomText';
import {TabIcon, VectorIcons} from '../navigations/TabIcon';
import {globalColors} from '../utils/globalColors';
import {globalStyles} from '../utils/globalStyles';
import {IPhotoOptionsModalProps} from './types';
import {printLogs} from '../utils/log-utils';

export const PhotoOptionsModal: React.FC<IPhotoOptionsModalProps> = ({
  onPressOptionOne,
  onPressOptionTwo,
  closeModal,
}) => {
  const {height} = Dimensions.get('window');
  const modalHeight = Math.round(height * (13 / 100));

  const translateY = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [translateY]);

  const closeModalWithAnimation = () => {
    Animated.timing(translateY, {
      toValue: height,
      duration: 300,
      easing: Easing.in(Easing.ease),
      useNativeDriver: false,
    }).start(() => closeModal());
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        closeModalWithAnimation();
        return true; // Prevent default behavior (exit the app)
      },
    );

    return () => {
      backHandler.remove();
    };
  }, [closeModalWithAnimation]);

  return (
    <TouchableWithoutFeedback onPress={closeModalWithAnimation}>
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.photoSelectionModel,
            {
              height: modalHeight,
              transform: [{translateY}],
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
          <Text style={styles.divider} onPress={() => {}}>
            |
          </Text>
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
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
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
