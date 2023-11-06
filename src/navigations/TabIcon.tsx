import React from 'react';
import Icons from 'react-native-vector-icons/Entypo';
import {globalColors} from '../utils/globalColors';

export const TabIcon: React.FC<{
  props: {
    focused: boolean;
    color: string;
    size: number;
  };
  name: string;
}> = props => {
  const tintColor = props.props.focused
    ? globalColors.button_active
    : globalColors.button_inactive;
  return (
    <>
      <Icons name={props.name} size={20} color={tintColor} />
    </>
  );
};
