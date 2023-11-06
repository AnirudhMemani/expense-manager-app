import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

export const Floater = (
  backgroundColor: string,
  icon: string,
  title: string,
  amount?: number,
) => {
  const TAG = Floater.name;
  const isAmount = amount ?? 0;
  return (
    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
      <Icon name={icon} size={25} color="white" style={[styles.icon]} />
      <View>
        <Text style={styles.textStyle}>{title}</Text>
        <Text
          style={{
            fontWeight: '800',
            fontSize: 16,
            color: 'white',
          }}>{`₹${isAmount.toFixed(2)}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: 170,
    padding: 8,
    borderWidth: 1,
    borderRadius: 50,
    alignItems: 'center',
  },
  icon: {
    backgroundColor: 'rgba(248, 248, 255, 0.3)',
    padding: 10,
    borderRadius: 50,
    marginRight: 15,
  },
  textStyle: {
    color: 'rgba(248, 248, 255, 0.3)',
  },
});
