import {
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  PermissionsAndroid,
  Linking,
  TouchableHighlight,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {globalStyles} from '../utils/globalStyles';
import {DatePickerModal} from 'react-native-paper-dates';
import {CustomText} from '../components/CustomText';
import {CalendarDate} from 'react-native-paper-dates/lib/typescript/Date/Calendar';
import {globalColors} from '../utils/globalColors';
import {dateFormatter, ERROR_MESSAGE} from '../utils/constants';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TabIcon, VectorIcons} from '../navigations/TabIcon';
import {CustomInput} from './CustomInput';
import {useGlobalContext} from './ContextProvider';
import {ErrorMsg} from './ErrorMsg';
import {CustomChips} from './Chips';
import {ITagProps} from './types';
import {printLogs} from '../utils/log-utils';
import {Camera} from 'react-native-vision-camera';
import {AlertWithOneActionableOption} from '../utils/alert-utils';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {PhotoOptionsModal} from './PhotoOptionsModal';
import {PHOTO_BUTTON_ICON, PHOTO_BUTTON_TTILE} from './constants';
import {STACK_SCREENS} from '../navigations/constants';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {setDisplayImageUri, setTags} from '../redux/reducers/transaction-slice';

export const NewTransaction: React.FC<{
  navigation: NativeStackNavigationProp<any, any>;
}> = ({navigation}) => {
  // <-- useStates -->
  const [visible, setVisible] = useState<boolean>(false);
  const [date, setDate] = useState<string>(
    dateFormatter(new Date(), 'numeric'),
  );
  const [calendarDate, setCalendarDate] = useState<CalendarDate>();
  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const [isExceededCharLimit, setIsExceededCharLimit] = useState(false);
  const [isExceededNumericLimit, setIsExceededNumericLimit] = useState(false);
  const [tagsInputText, setTagsInputText] = useState<string>();
  const [isPhotoOptionsVisible, setIsPhotoOptionsVisible] =
    useState<boolean>(false);
  // const [displayImageUri, setDisplayImageUri] = useState<string>();
  // const [tag, setTags] = useState<ITagProps[]>([]);
  const dispatch = useAppDispatch();
  const displayImageUri = useAppSelector(
    state => state.transaction.displayImageUri,
  );
  const tag = useAppSelector(state => state.transaction.tags);

  // <-- useContext -->
  const {commonMargin} = useGlobalContext();

  // <-- tags -->
  const displayTags = () => {
    return tag.map(individualTag => {
      if (individualTag.isSelected || individualTag.isDummy) {
        return <CustomChips key={individualTag.id} tag={individualTag} />;
      }
    });
  };

  const onSubmitTag = () => {
    if (!tagsInputText?.trim()) return;
    const tagExists = tag.some(
      existingTags => existingTags.tag === tagsInputText,
    );
    if (!tagExists) {
      dispatch(
        setTags([
          ...tag,
          {id: tagsInputText, tag: tagsInputText, isSelected: true},
        ]),
      );
    }
    setTagsInputText('');
  };

  const onChangeTag = (text: string) => {
    if (text.includes(' ')) {
      onSubmitTag();
    } else {
      setTagsInputText(text.trim());
    }
  };

  // <-- Camera -->
  const openBackCamera = async () => {
    const hasCameraPermission = await Camera.getCameraPermissionStatus();
    printLogs('Permission to open camera:', hasCameraPermission);
    if (hasCameraPermission === 'not-determined') {
      const grantCameraPermission = await Camera.requestCameraPermission();
      printLogs('Did user give camera permission:', grantCameraPermission);
      if (grantCameraPermission === 'authorized') {
        setIsPhotoOptionsVisible(false);
        try {
          return await launchCamera(
            {
              mediaType: 'photo',
              cameraType: 'back',
              quality: 1,
              saveToPhotos: true,
            },
            imageObject => {
              dispatch(setDisplayImageUri(imageObject.assets?.[0].uri));
            },
          );
        } catch (error) {
          printLogs('launchCamera() error:', error);
        }
      }
    } else if (hasCameraPermission === 'authorized') {
      setIsPhotoOptionsVisible(false);
      try {
        await launchCamera(
          {
            mediaType: 'photo',
            cameraType: 'back',
            quality: 1,
          },
          imageObject => {
            dispatch(setDisplayImageUri(imageObject.assets?.[0].uri));
          },
        );
      } catch (error) {
        printLogs('launchCamera() error:', error);
      }
    } else if (hasCameraPermission === 'denied') {
      AlertWithOneActionableOption(
        'Permission Denied',
        "Please provide permission to open the camera in the app' settings!",
        'Open settings',
        true,
        openSettings => {
          if (openSettings) {
            Linking.openSettings();
          }
        },
      );
    }
  };

  const openPhotoGallery = async () => {
    try {
      const selectedPhoto = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
      });
      dispatch(setDisplayImageUri(selectedPhoto.assets?.[0].uri));
    } catch (error) {
      printLogs('launchImageLibrary() error:', error);
    }
  };

  // <-- Activity -->
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

      {/* Amount */}
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
            setIsExceededCharLimit={setIsExceededNumericLimit}
            defaultValue={'0'}
          />
          <TabIcon
            name="calculator"
            type={VectorIcons.fontAwesome6}
            props={{focused: false}}
            size={25}
            color={globalColors.inherit_light}
          />
        </View>
        {isInputEmpty && <ErrorMsg message={ERROR_MESSAGE.EMPTY_TEXT_INPUT} />}
        {isExceededNumericLimit && (
          <ErrorMsg message={ERROR_MESSAGE.TRANSACTION_AMT_EXCEEDED} />
        )}
      </View>

      {/* Category */}
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
            <CustomText extraStyles={styles.selected_text}>Others</CustomText>
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

      {/* Payment */}
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
            <CustomText extraStyles={styles.selected_text}>Binance</CustomText>
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

      {/* Other details */}
      <CustomText
        extraStyles={{
          paddingHorizontal: commonMargin,
          color: globalColors.gray,
          marginVertical: commonMargin,
        }}>
        Other Details
      </CustomText>
      <View style={[styles.input_container, {alignItems: 'flex-start'}]}>
        <TabIcon
          name="notes"
          type={VectorIcons.MaterialIcons}
          size={25}
          props={{focused: false}}
          color={globalColors.cyan}
        />
        <CustomInput
          placeholder="Write a note"
          autoFocus={false}
          returnKeyType={'default'}
          extraStyles={{fontSize: 16, color: globalColors.white}}
          placeholderTintColor={globalColors.inherit}
          numberOfLines={10}
          multiline={true}
          maxLength={500}
          setIsExceededCharLimit={setIsExceededCharLimit}
        />
      </View>
      {isExceededCharLimit && (
        <ErrorMsg
          message={ERROR_MESSAGE.NOTE_LIMIT_EXCEEDED}
          extraStyles={{fontSize: 14}}
        />
      )}

      {/* Tags */}
      <View style={[styles.input_container, {marginTop: 20}]}>
        <TabIcon
          name="hash"
          type={VectorIcons.Feather}
          size={25}
          props={{focused: false}}
          color={globalColors.cyan}
        />
        <CustomInput
          placeholder="Add tags"
          autoFocus={false}
          placeholderTintColor={globalColors.inherit}
          extraStyles={{fontSize: 16}}
          maxLength={25}
          multiline={false}
          numberOfLines={1}
          returnKeyType={'default'}
          onSubmitEditing={onSubmitTag}
          onChangeText={onChangeTag}
          value={tagsInputText}
        />
      </View>
      <View style={[styles.tags, {marginVertical: 10}]}>{displayTags()}</View>

      {/* Picture */}
      <TouchableOpacity
        activeOpacity={0.5}
        style={[styles.input_container, {marginVertical: 10}]}
        onPress={() => {
          setIsPhotoOptionsVisible(true);
        }}>
        <TabIcon
          name="insert-photo"
          type={VectorIcons.MaterialIcons}
          props={{focused: false}}
          size={25}
          color={globalColors.cyan}
        />
        <CustomText extraStyles={styles.selected_text}>
          {displayImageUri
            ? PHOTO_BUTTON_TTILE.REPLACE_PHOTOS
            : PHOTO_BUTTON_TTILE.ADD_PHOTOS}
        </CustomText>
        <TouchableOpacity
          onPress={() => dispatch(setDisplayImageUri(undefined))}
          activeOpacity={0.5}>
          <TabIcon
            name={
              displayImageUri
                ? PHOTO_BUTTON_ICON.CLOSE
                : PHOTO_BUTTON_ICON.CHEVRON
            }
            type={displayImageUri ? VectorIcons.AntDesign : VectorIcons.Entypo}
            props={{focused: false}}
            size={displayImageUri ? 20 : 25}
            color={globalColors.inherit_lighter}
          />
        </TouchableOpacity>
      </TouchableOpacity>

      {isPhotoOptionsVisible && (
        <PhotoOptionsModal
          onPressOptionOne={openBackCamera}
          onPressOptionTwo={openPhotoGallery}
          isPhotoOptionsVisible={isPhotoOptionsVisible}
          setIsPhotoOptionsVisible={setIsPhotoOptionsVisible}
        />
      )}

      {displayImageUri && (
        <View style={styles.display_image_container}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate(STACK_SCREENS.DISPLAY_PHOTO)}
            style={styles.display_image_button}>
            <Image
              source={{uri: displayImageUri}}
              style={styles.display_image}
            />
          </TouchableOpacity>
        </View>
      )}

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

// <-- Styles -->
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
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 60,
  },
  selected_text: {
    flex: 1,
    paddingHorizontal: 30,
    fontSize: 18,
  },
  display_image_container: {
    ...globalStyles.alignCenter,
    marginLeft: 65,
    marginRight: 20,
  },
  display_image_button: {
    height: 150,
    width: '100%',
  },
  display_image: {
    height: '100%',
    width: '100%',
  },
});
