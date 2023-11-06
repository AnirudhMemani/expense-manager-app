import {View} from 'react-native';
import React from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {globalStyles} from '../utils/globalStyles';
import {useAppSelector} from '../redux/hooks';

export const Loader = () => {
  const active = useAppSelector(state => state.income.loader);
  return (
    <>
      {active && (
        <View
          style={[
            globalStyles.container,
            globalStyles.absoluteStyle,
            globalStyles.alignCenter,
            {backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 5},
          ]}>
          <ActivityIndicator />
        </View>
      )}
    </>
  );
};

export const testLoader = () => {
  return (
    <View
      style={[
        globalStyles.container,
        globalStyles.absoluteStyle,
        globalStyles.alignCenter,
        {backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 5},
      ]}>
      <ActivityIndicator />
    </View>
  );
};
