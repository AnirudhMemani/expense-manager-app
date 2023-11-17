import {
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Pressable,
  TouchableHighlight,
} from 'react-native';
import React, {useState} from 'react';
import {globalStyles} from '../utils/globalStyles';
import {DatePickerModal} from 'react-native-paper-dates';
import {CustomText} from '../components/CustomText';
import {CalendarDate} from 'react-native-paper-dates/lib/typescript/Date/Calendar';
import {globalColors} from '../utils/globalColors';
import {dateFormatter} from '../utils/constants';
import {BOTTOM_NAV_SCREENS} from '../navigations/constants';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TabIcon, VectorIcons} from '../navigations/TabIcon';
import {CustomInput} from './CustomInput';

const NewTransaction: React.FC<{
  navigation: NativeStackNavigationProp<any, any>;
}> = ({navigation}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [date, setDate] = useState<string>(
    dateFormatter(new Date(), 'numeric'),
  );
  const [calendarDate, setCalendarDate] = useState<CalendarDate>();
  const [isInputEmpty, setIsInputEmpty] = useState(false);

  return (
    <ScrollView
      style={globalStyles.container}
      keyboardShouldPersistTaps={'handled'}>
      {/* Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity>
          <CustomText>Expense</CustomText>
        </TouchableOpacity>
        <TouchableOpacity>
          <CustomText>Income</CustomText>
        </TouchableOpacity>
        <TouchableOpacity>
          <CustomText>Transfer</CustomText>
        </TouchableOpacity>
      </View>

      {/* Date picker button */}
      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={styles.date}
        activeOpacity={0.8}>
        <TabIcon
          name="calendar"
          props={{focused: false}}
          type={VectorIcons.AntDesign}
          size={25}
        />
        <CustomText extraStyles={{paddingHorizontal: 30}}>{date}</CustomText>
      </TouchableOpacity>

      {/* First */}
      <View style={styles.content_container}>
        <CustomText extraStyles={styles.title}>Amount</CustomText>
        <View style={styles.input_container}>
          <TabIcon
            name="currency-rupee"
            type={VectorIcons.MaterialIcons}
            props={{focused: false}}
            size={25}
          />
          <CustomInput
            placeholder="0"
            maxLength={10}
            setIsInputEmpty={setIsInputEmpty}
            autoFocus={true}
            keyboardType={'numeric'}
            returnKeyType={'done'}
          />
          <TabIcon
            name="calculator"
            type={VectorIcons.fontAwesome6}
            props={{focused: false}}
            size={25}
            color={globalColors.inherit_light}
          />
        </View>
        {isInputEmpty && (
          <CustomText extraStyles={styles.errorMsg}>
            Amount can't be empty!
          </CustomText>
        )}
      </View>

      {/* Second */}
      <TouchableHighlight
        style={styles.content_container}
        touchSoundDisabled={true}>
        <View>
          <CustomText extraStyles={styles.title}>Category</CustomText>
          <View style={styles.input_container}>
            <TabIcon
              name="dots-three-horizontal"
              type={VectorIcons.Entypo}
              props={{focused: false}}
              size={25}
            />
            <CustomText
              extraStyles={{flex: 1, paddingHorizontal: 30, fontSize: 18}}>
              Others
            </CustomText>
            <TabIcon
              name="chevron-small-right"
              type={VectorIcons.Entypo}
              props={{focused: false}}
              size={25}
              color={globalColors.inherit_lighter}
            />
          </View>
        </View>
      </TouchableHighlight>

      {/* Third */}
      <TouchableHighlight
        style={styles.content_container}
        underlayColor={globalColors.inherit}
        touchSoundDisabled={true}>
        <View>
          <CustomText extraStyles={styles.title}>Payment mode</CustomText>
          <View style={styles.input_container}>
            <TabIcon
              name="wallet"
              type={VectorIcons.Entypo}
              props={{focused: false}}
              size={25}
            />
            <CustomText
              extraStyles={{flex: 1, paddingHorizontal: 30, fontSize: 18}}>
              Binance
            </CustomText>
            <TabIcon
              name="chevron-small-right"
              type={VectorIcons.Entypo}
              props={{focused: false}}
              size={25}
              color={globalColors.inherit_lighter}
            />
          </View>
        </View>
      </TouchableHighlight>

      {/* Date Picker Modal */}
      <DatePickerModal
        locale="enGB"
        mode="single"
        visible={visible}
        onDismiss={() => setVisible(false)}
        date={calendarDate}
        onConfirm={params => {
          setVisible(false);
          setCalendarDate(params.date);
          setDate(dateFormatter(params.date, 'numeric'));
        }}
        animationType="slide"
        presentationStyle="pageSheet"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: globalColors.tab_bg,
    borderRadius: 10,
    marginVertical: 20,
    padding: 7,
  },
  date: {
    flexDirection: 'row',
    padding: 15,
    borderColor: globalColors.inherit,
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    color: globalColors.gray,
    paddingHorizontal: 70,
    fontSize: 14,
  },
  errorMsg: {
    color: globalColors.red,
    paddingHorizontal: 65,
  },
  input_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  content_container: {
    paddingBottom: 15,
  },
});

export default NewTransaction;
