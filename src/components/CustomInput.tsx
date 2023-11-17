import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useState, useEffect} from 'react';
import {TCustomTextInputProps} from './types';
import {globalStyles} from '../utils/globalStyles';
import {globalColors} from '../utils/globalColors';
import {APP_SETTINGS} from '../utils/app-settings';

export const CustomInput: React.FC<TCustomTextInputProps> = ({
  placeholder,
  maxLength,
  autoFocus,
  keyboardType,
  returnKeyType,
  setIsInputEmpty,
  extraStyles,
}) => {
  const [inputText, setInputText] = useState<string>('0');

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
        placeholder={placeholder}
        maxLength={maxLength}
        style={[globalStyles.container, styles.inputStyles, extraStyles]}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        cursorColor={globalColors.yellow}
        placeholderTextColor={globalColors.gray}
        autoFocus={autoFocus}
        maxFontSizeMultiplier={APP_SETTINGS.MAX_FONT_SIZE_MULTIPLIER}
        onChangeText={text => setInputText(text)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  inputStyles: {
    fontSize: 20,
    paddingHorizontal: 30,
    paddingVertical: 5,
  },
});
