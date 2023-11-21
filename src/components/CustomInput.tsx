import {StyleSheet, Keyboard, TextInput} from 'react-native';
import React, {useState, useEffect} from 'react';
import {TCustomTextInputProps} from './types';
import {globalStyles} from '../utils/globalStyles';
import {globalColors} from '../utils/globalColors';
import {APP_SETTINGS} from '../utils/app-settings';

export const CustomInput: React.FC<TCustomTextInputProps> = ({
  reference,
  placeholder,
  maxLength,
  autoFocus,
  keyboardType,
  returnKeyType,
  setIsInputEmpty,
  placeholderTintColor,
  multiline,
  numberOfLines,
  setIsExceededCharLimit,
  defaultValue,
  extraStyles,
}) => {
  const [inputText, setInputText] = useState<string | undefined>(defaultValue);
  const [occupiedLinesHeight, setOccupiedLinesHeight] = useState<
    number | undefined
  >(30);

  const default_max_height = 9 * 19 + 30;

  const maxHeight = numberOfLines
    ? (numberOfLines - 1) * 19 + 30
    : default_max_height;

  useEffect(() => {
    if (setIsInputEmpty) {
      if (inputText) {
        setIsInputEmpty(false);
      } else {
        setIsInputEmpty(true);
      }
    }
  }, [inputText]);

  return (
    <>
      <TextInput
        ref={reference}
        placeholder={placeholder}
        maxLength={maxLength && maxLength + 1}
        style={[
          globalStyles.container,
          styles.inputStyles,
          {maxHeight: occupiedLinesHeight},
          extraStyles,
        ]}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        cursorColor={globalColors.yellow}
        placeholderTextColor={placeholderTintColor ?? globalColors.gray}
        autoFocus={autoFocus}
        maxFontSizeMultiplier={APP_SETTINGS.MAX_FONT_SIZE_MULTIPLIER}
        onChangeText={text => {
          const numericInput = text.replace(/^0+|[^0-9]/g, '');
          if (maxLength) {
            if (text.length > maxLength) {
              setIsExceededCharLimit && setIsExceededCharLimit(true);
              Keyboard.dismiss();
            } else {
              setIsExceededCharLimit && setIsExceededCharLimit(false);
              keyboardType == 'numeric'
                ? setInputText(numericInput)
                : setInputText(text);
            }
          } else {
            keyboardType == 'numeric'
              ? setInputText(numericInput)
              : setInputText(text);
          }
        }}
        value={inputText}
        onContentSizeChange={props => {
          if (props.nativeEvent.contentSize.height <= maxHeight) {
            setOccupiedLinesHeight(props.nativeEvent.contentSize.height);
          }
        }}
        multiline={multiline}
        scrollEnabled={true}
        numberOfLines={numberOfLines}
        defaultValue={inputText}
      />
    </>
  );
};

const styles = StyleSheet.create({
  inputStyles: {
    fontSize: 20,
    paddingHorizontal: 30,
    paddingVertical: 5,
    textAlignVertical: 'top',
  },
});
