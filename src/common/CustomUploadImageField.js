import React from "react";
import { StyleSheet, View } from "react-native";
import { _fontName } from "../assets/fonts/font";
import COLORS from "../constants/Colors";
import CustomText from "./CustomText";


const CustomUploadImageField = ({ lebel }) => {

    return (
        <View style={styles.imageBox}>
            <CustomText
                text={lebel}
                style={{
                    color: COLORS.LIGHTGRAY,
                    fontSize: 15,
                }}
                font={_fontName.InterBold_700}
            />
            <View style={styles.dashed}>
                <CustomText
                    text={'Drop files or click to upload'}
                    style={{
                        color: '#D9D9D9',
                        fontSize: 15,
                        textAlign: "center",
                    }}
                    font={_fontName.InterBold_700}
                />
            </View>
        </View>

    )
}

export default CustomUploadImageField;

const styles = StyleSheet.create({
    imageBox: {
        alignSelf: "flex-start",
        marginTop: 25,
        width: "100%"
    },
    dashed: {
        borderStyle: 'dashed',
        borderRadius: 20,
        borderWidth: 2,
        height: 45,
        borderColor: "#D9D9D9",
        marginTop: 2,
        justifyContent: "center",

    }

})
