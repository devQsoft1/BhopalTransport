//----------imports

// react
import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import COLORS from "../constants/Colors";

// style

// context

// common
import CustomText from "./CustomText";
import { _fontName } from "../assets/fonts/font";

//---------- main components

const CustomButton = (props) => {

  //---------- state, veriable, context and hooks

  //---------- Main View



  return (
    <TouchableOpacity
      onPress={() => {
        props?.onPress && props?.onPress()
      }}
      style={{
        ...props.style,
        // paddingVertical: props?.paddingVertical ? props.paddingVertical : 7,
        height: 50,
        // paddingHorizontal: props?.paddingHorizontal ? props?.paddingHorizontal : 5,
        backgroundColor: props?.backgroundColor ? props?.backgroundColor : COLORS.DARKGRAY,
        borderRadius: props?.borderRadius ? props?.borderRadius : 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: props?.width ? props?.width : '100%',
        borderColor: props?.borderColor ? props?.borderColor : '#42AEEC',
        borderWidth: props?.borderColor ? 1 : 0,

      }}
    >
      <CustomText
        style={{
          color: props?.color ? props?.color : '#fff',
          fontSize: props?.fontSize ? props?.fontSize : 25,
          textAlign: 'center',
        }}
        font={_fontName.InterBold_700}

        text={props?.title}
      />

    </TouchableOpacity>
  );

};

//---------- export component

export default CustomButton;

