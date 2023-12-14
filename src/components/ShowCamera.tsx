import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useRef} from 'react';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {Loader} from './Loader';
import {globalColors} from '../utils/globalColors';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {printLogs} from '../utils/log-utils';
import {STACK_SCREENS} from '../navigations/constants';

export const ShowCamera: React.FC<{
  navigation: NativeStackNavigationProp<any, any>;
}> = ({navigation}) => {
  const device = useCameraDevices();
  const backCamera = device.back;
  const camera = useRef<Camera>(null);

  const capturePhoto = async () => {
    try {
      const photo = await camera.current?.takePhoto({
        enableAutoStabilization: true,
        flash: 'auto',
        qualityPrioritization: 'quality',
      });
      printLogs('Captured photo path:', photo);
      navigation.navigate(STACK_SCREENS.SHOW_PHOTO, {
        imageUri: `file:/${photo?.path}`,
      });
    } catch (error) {
      printLogs('Error capturing photo:', error);
    }
  };

  if (backCamera == null) return <Loader />;
  return (
    <>
      <Camera
        ref={camera}
        device={backCamera}
        isActive={true}
        fps={30}
        hdr={true}
        photo={true}
        style={StyleSheet.absoluteFill}
      />
      <TouchableOpacity
        activeOpacity={1}
        style={styles.clickPhotoButton}
        onPress={capturePhoto}
      />
    </>
  );
};

const styles = StyleSheet.create({
  clickPhotoButton: {
    backgroundColor: globalColors.red,
    width: 64,
    height: 64,
    borderRadius: 32,
    position: 'absolute',
    bottom: 60,
    alignSelf: 'center',
  },
});
