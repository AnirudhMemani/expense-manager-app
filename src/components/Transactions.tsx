import {
  StyleSheet,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React from 'react';
import {CustomText} from './CustomText';
import {ITransactionProps, ITransactionRecordsProps} from './types';
import {globalStyles} from '../utils/globalStyles';
import {globalColors} from '../utils/globalColors';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import {COMMON_MSG} from '../utils/constants';
import {PAYMENT_METHOD} from './constants';

export const Transactions: React.FC<ITransactionProps> = ({
  data,
  isScrollable,
}) => {
  const renderItem: ListRenderItem<ITransactionRecordsProps> = ({item}) => {
    const notes = item.note ?? COMMON_MSG.NOT_SPECIFIED;
    const payment_icon =
      item.payment_mode === PAYMENT_METHOD.CASH
        ? require('../assets/icons/em_cash.png')
        : item.payment_mode === PAYMENT_METHOD.UPI
        ? require('../assets/icons/em_upi.png')
        : item.payment_mode === PAYMENT_METHOD.CARD
        ? require('../assets/icons/em_card.png')
        : require('../assets/icons/em_wallet.png');
    return (
      <TouchableOpacity activeOpacity={1} style={styles.cards}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View>
            <EntypoIcons
              name="dots-three-horizontal"
              size={25}
              style={styles.iconContainer}
              color={globalColors.cyan}
            />
          </View>
          <View>
            <CustomText>₹{item.amount.toFixed(1)}</CustomText>
            <CustomText extraStyles={styles.notes}>{notes}</CustomText>
          </View>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <CustomText extraStyles={{fontSize: 14, marginBottom: 3}}>
            {item.date}
          </CustomText>
          <Image source={payment_icon} style={styles.icon} />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={[globalStyles.container]}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={isScrollable}
        automaticallyAdjustKeyboardInsets={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cards: {
    flexDirection: 'row',
    backgroundColor: globalColors.cards_bg,
    borderRadius: 8,
    padding: 15,
    justifyContent: 'space-between',
    marginVertical: 3,
    elevation: 5,
  },
  iconContainer: {
    padding: 5,
    borderRadius: 50,
    marginRight: 20,
    backgroundColor: globalColors.inherit_darker,
    ...globalStyles.alignCenter,
  },
  icon: {
    width: 25,
    height: 25,
  },
  notes: {
    fontSize: 14,
    color: globalColors.inherit,
    maxWidth: 170,
  },
});
