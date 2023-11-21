import React from 'react';
import {View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Foundation from 'react-native-vector-icons/Foundation';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import fontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {CustomText} from '../components/CustomText';
import {globalColors} from '../utils/globalColors';
import {TextStyle, ViewStyle} from 'react-native/types';
import {StyleProp} from 'react-native/types';

export const VectorIcons = {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
  Feather,
  FontAwesome,
  FontAwesome5,
  AntDesign,
  Entypo,
  SimpleLineIcons,
  Octicons,
  Foundation,
  EvilIcons,
  fontAwesome6,
};

export const TabIcon: React.FC<{
  props: {
    focused: boolean;
  };
  name: string;
  type: Function;
  label?: string;
  size?: number;
  color?: string;
  extraStyles?: StyleProp<ViewStyle | TextStyle>;
}> = props => {
  const ICON_SIZE = props.size ?? 25;

  const tintColor = props.color
    ? props.color
    : props.props.focused
    ? globalColors.button_active
    : globalColors.button_inactive;

  const Icons = props.type;

  return (
    <>
      {props.extraStyles ? (
        <View style={props.extraStyles}>
          <Icons name={props.name} size={ICON_SIZE} color={tintColor} />
        </View>
      ) : (
        <Icons name={props.name} size={ICON_SIZE} color={tintColor} />
      )}
      {props.label && (
        <CustomText extraStyles={{color: tintColor, fontSize: 16}}>
          {props.label}
        </CustomText>
      )}
    </>
  );
};
