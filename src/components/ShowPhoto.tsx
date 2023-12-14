import {StyleSheet, Image, View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {globalStyles} from '../utils/globalStyles';
import {printLogs} from '../utils/log-utils';

export const ShowPhoto: React.FC<{
  navigation: NativeStackNavigationProp<any, any>;
  route: RouteProp<any, any>;
}> = ({navigation, route}) => {
  const photo = route.params?.imageUri;
  useEffect(() => {
    printLogs('ShowPhoto rendered\n\n\n ____PATH____ ', photo);
  }, []);

  return (
    <View style={globalStyles.container}>
      <Image style={styles.imageStyles} source={{uri: photo}} />
    </View>
  );
};

const styles = StyleSheet.create({
  imageStyles: {
    flex: 1,
    width: '100%',
    objectFit: 'contain',
  },
});
