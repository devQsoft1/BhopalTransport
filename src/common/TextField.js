import {View, Text, TextInput, StyleSheet, Platform} from 'react-native';

import React from 'react';
import {_fontName} from '../assets/fonts/font';
import COLORS from '../constants/Colors';

export default function TextField({
  props,
  onFocus,
  onBlur,
  label,
  editable = true,
  placeholder,
  labelStyle = {},
  style = {},
  secureTextEntry = false,
  keyboardType,
  autoComplete,
  value,
  onChangeText,
  maxLength,
  textRef,
}) {
  let [isFocused, setIsFocused] = React.useState();

  return (
    <View style={[styles.wrap, {...style}]}>
      <TextInput
        onPressIn={() => props?.onPress && props?.onPress()}
        editable={editable}
        keyboardType={keyboardType ? keyboardType : 'default'}
        ref={textRef}
        value={value}
        onBlur={() => {
          setIsFocused(false);
          onBlur && onBlur();
        }}
        onFocus={() => {
          setIsFocused(true);
          onFocus && onFocus();
        }}
        style={styles.inputBox}
        placeholder={placeholder}
        placeholderTextColor={'#949292'} //ffffff96
        onChangeText={text => {
          onChangeText && onChangeText(text);
        }}
        maxLength={maxLength}
        autoComplete={autoComplete ? autoComplete : 'off'}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}

/* styles for input field */
const styles = StyleSheet.create({
  wrap: {
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  activeField: {
    borderBottomColor: 'red',
  },
  inputBox: {
    fontSize: 15,
    lineHeight: 18.15,
    color: COLORS.TEXTGRAY,
    height: 45,
    paddingHorizontal: 20,
    fontFamily: _fontName.InterBold_700,
  },
});
