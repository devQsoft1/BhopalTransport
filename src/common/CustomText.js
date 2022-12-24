import React, { useContext } from "react";
import { StyleSheet, Text } from "react-native";
import { _fontName } from "../assets/fonts/font";
import { TEXTGRAY } from "../constants/Colors";


const CustomText = (props) => {

  const { numberOfLines, text, text2, style, font } = props;


  return (
    <>
      <Text numberOfLines={numberOfLines} style={[{ color: TEXTGRAY, fontFamily: font ? font : _fontName.InterMedium_500 }, style,]}>
        {text}
      </Text>
    </>


  );
};

export default CustomText;

