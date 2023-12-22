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
  onChangeText,
  onSubmitEditing,
  onKeyPress,
  value,
  extraStyles,
}) => {
  const [inputText, setInputText] = useState<string | undefined>(defaultValue);
  const [occupiedLinesHeight, setOccupiedLinesHeight] = useState<
    number | undefined
  >(30);

  const default_max_height = 9 * 19 + 30;
  const BASE_HEIGHT = 30;
  const SINGLE_LINE_INCREMENT = 19;

  // (numberOfLines - 1) because the BASE_HEIGHT is 30, if the number of lines is 1 then it shouldn't increment the height by SINGLE_LINE_INCREMENT of 19 since the height increments by 19 for every new line.
  const maxHeight = numberOfLines
    ? (numberOfLines - 1) * SINGLE_LINE_INCREMENT + BASE_HEIGHT
    : default_max_height;

  useEffect(() => {
    if (setIsInputEmpty) {
      if (inputText) {
        setIsInputEmpty(false);
      } else {
        setIsInputEmpty(true);
      }
    }
    if (onChangeText) {
      onChangeText(inputText ?? '');
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
        placeholderTextColor={placeholderTintColor ?? globalColors.white}
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
        value={value ?? inputText}
        onContentSizeChange={props => {
          if (props.nativeEvent.contentSize.height <= maxHeight) {
            setOccupiedLinesHeight(props.nativeEvent.contentSize.height);
          }
        }}
        onSubmitEditing={onSubmitEditing}
        multiline={multiline}
        scrollEnabled={true}
        numberOfLines={numberOfLines}
        defaultValue={defaultValue}
        onKeyPress={onKeyPress}
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
